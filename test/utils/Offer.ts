import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { getLenderSignature, getLenderSignatureEIP1271, getLenderSignatureWithIdRange } from './utils';
import { AssetOfferLoan, CollectionOfferLoan, TestSignerContract } from '../../typechain';
import { ContractTransactionResponse } from 'ethers';
import { ethers } from 'hardhat';

export interface SetOfferParams {
  loanERC20Denomination?: string;
  loanPrincipalAmount?: bigint;
  isProRata?: boolean;
  maximumRepaymentAmount?: bigint;
  nftCollateralContract?: string;
  nftCollateralId?: bigint;
  loanDuration?: bigint;
  originationFee?: bigint;
  liquidityCap?: bigint;
  allowedBorrowers?: string[];
  minId?: bigint;
  maxId?: bigint;
}

export interface SignatureParams {
  lender: SignerWithAddress;
  nonce: bigint;
  expiry: bigint;
  offerType: string;
  customSig?: string;
}

type SignatureParamsEIP1271 = SignatureParams & { signerContract: TestSignerContract };

export class Offer {
  loanERC20Denomination: string;
  loanPrincipalAmount: bigint;
  isProRata: boolean;
  maximumRepaymentAmount: bigint;
  nftCollateralContract: string;
  nftCollateralId: bigint;
  loanDuration: bigint;
  originationFee: bigint;
  liquidityCap: bigint;
  allowedBorrowers: string[];
  minId: bigint;
  maxId: bigint;

  constructor(params: SetOfferParams) {
    this.loanERC20Denomination = params.loanERC20Denomination!;
    this.loanPrincipalAmount = params.loanPrincipalAmount!;
    this.isProRata = params.isProRata!;
    this.maximumRepaymentAmount = params.maximumRepaymentAmount!;
    this.nftCollateralContract = params.nftCollateralContract!;
    this.nftCollateralId = params.nftCollateralId!;
    this.loanDuration = params.loanDuration!;
    this.originationFee = params.originationFee!;
    this.liquidityCap = params.liquidityCap!;
    this.allowedBorrowers = params.allowedBorrowers!;
    this.minId = params.minId || 0n;
    this.maxId = params.maxId || 0n;
  }

  setLoanERC20DenominationToZeroValue() {
    this.loanERC20Denomination = ethers.ZeroAddress;
  }

  setLoanPrincipalAmountToZeroValue() {
    this.loanPrincipalAmount = 0n;
  }

  setIsProRataToZeroValue() {
    this.isProRata = false;
  }

  setMaximumRepaymentAmountToZeroValue() {
    this.maximumRepaymentAmount = 0n;
  }

  setNftCollateralContractToZeroValue() {
    this.nftCollateralContract = ethers.ZeroAddress;
  }

  setNftCollateralIdToZeroValue() {
    this.nftCollateralId = 0n;
  }

  setLoanDurationToZeroValue() {
    this.loanDuration = 0n;
  }

  setOriginationFeeToZeroValue() {
    this.originationFee = 0n;
  }

  setLiquidityCapToZeroValue() {
    this.liquidityCap = 0n;
  }

  setAllowedBorrowersToZeroValue() {
    this.allowedBorrowers = [];
  }

  setMinIdToZeroValue() {
    this.minId = 0n;
  }

  setMaxIdToZeroValue() {
    this.maxId = 0n;
  }

  /**
   * @notice to assign zero values use zeroValue setters
   */
  setOffer(params: SetOfferParams) {
    this.loanERC20Denomination = params.loanERC20Denomination || this.loanERC20Denomination;
    this.loanPrincipalAmount = params.loanPrincipalAmount || this.loanPrincipalAmount;
    this.isProRata = params.isProRata || this.isProRata;
    this.maximumRepaymentAmount = params.maximumRepaymentAmount || this.maximumRepaymentAmount;
    this.nftCollateralContract = params.nftCollateralContract || this.nftCollateralContract;
    this.nftCollateralId = params.nftCollateralId || this.nftCollateralId;
    this.loanDuration = params.loanDuration || this.loanDuration;
    this.originationFee = params.originationFee || this.originationFee;
    this.liquidityCap = params.liquidityCap || this.liquidityCap;
    this.allowedBorrowers = params.allowedBorrowers || this.allowedBorrowers;
    this.minId = params.minId || this.minId;
    this.maxId = params.maxId || this.maxId;
  }

  async getSignature(sigParams: SignatureParams): Promise<string> {
    return await getLenderSignature(
      sigParams.lender,
      this.loanPrincipalAmount,
      this.isProRata,
      this.maximumRepaymentAmount,
      this.nftCollateralId,
      this.loanDuration,
      sigParams.nonce,
      this.nftCollateralContract,
      this.loanERC20Denomination,
      sigParams.expiry,
      sigParams.offerType,
      this.originationFee,
      this.liquidityCap,
      this.allowedBorrowers,
    );
  }

  async getSignatureWithIdRange(sigParams: SignatureParams): Promise<string> {
    return await getLenderSignatureWithIdRange(
      sigParams.lender,
      this.loanPrincipalAmount,
      this.isProRata,
      this.maximumRepaymentAmount,
      this.nftCollateralId,
      this.minId,
      this.maxId,
      this.loanDuration,
      sigParams.nonce,
      this.nftCollateralContract,
      this.loanERC20Denomination,
      sigParams.expiry,
      sigParams.offerType,
      this.originationFee,
      this.liquidityCap,
      this.allowedBorrowers,
    );
  }

  async getSignatureEIP1271(sigParams: SignatureParamsEIP1271): Promise<string> {
    return await getLenderSignatureEIP1271(
      sigParams.lender,
      await sigParams.signerContract.getAddress(),
      this.loanPrincipalAmount,
      this.isProRata,
      this.maximumRepaymentAmount,
      this.nftCollateralId,
      this.loanDuration,
      sigParams.nonce,
      this.nftCollateralContract,
      this.loanERC20Denomination,
      sigParams.expiry,
      sigParams.offerType,
      this.originationFee,
      this.liquidityCap,
      this.allowedBorrowers,
    );
  }

  async acceptOffer(
    nftfiLoanOffer: AssetOfferLoan,
    borrower: SignerWithAddress,
    sigParams: SignatureParams | SignatureParamsEIP1271,
  ): Promise<ContractTransactionResponse> {
    let sig;
    if (!sigParams.customSig) {
      sig = await getLenderSignature(
        sigParams.lender,
        this.loanPrincipalAmount,
        this.isProRata,
        this.maximumRepaymentAmount,
        this.nftCollateralId,
        this.loanDuration,
        sigParams.nonce,
        this.nftCollateralContract,
        this.loanERC20Denomination,
        sigParams.expiry,
        sigParams.offerType,
        this.originationFee,
        this.liquidityCap,
        this.allowedBorrowers,
      );
    } else {
      sig = sigParams.customSig;
    }

    const tx = await nftfiLoanOffer.connect(borrower).acceptOffer(
      {
        loanERC20Denomination: this.loanERC20Denomination,
        loanPrincipalAmount: this.loanPrincipalAmount,
        isProRata: this.isProRata,
        maximumRepaymentAmount: this.maximumRepaymentAmount,
        nftCollateralContract: this.nftCollateralContract,
        nftCollateralId: this.nftCollateralId,
        loanDuration: this.loanDuration,
        originationFee: this.originationFee,
        liquidityCap: this.liquidityCap,
        allowedBorrowers: this.allowedBorrowers,
      },
      {
        signer: sigParams.lender.address,
        nonce: sigParams.nonce,
        expiry: sigParams.expiry,
        signature: sig,
      },
    );
    return tx;
  }

  async acceptCollectionOffer(
    nftfiCollectionOffer: CollectionOfferLoan,
    borrower: SignerWithAddress,
    sigParams: SignatureParams,
  ): Promise<ContractTransactionResponse> {
    let sig;
    if (!sigParams.customSig) {
      sig = await getLenderSignature(
        sigParams.lender,
        this.loanPrincipalAmount,
        this.isProRata,
        this.maximumRepaymentAmount,
        0n,
        this.loanDuration,
        sigParams.nonce,
        this.nftCollateralContract,
        this.loanERC20Denomination,
        sigParams.expiry,
        sigParams.offerType,
        this.originationFee,
        this.liquidityCap,
        this.allowedBorrowers,
      );
    } else {
      sig = sigParams.customSig;
    }

    const tx = await nftfiCollectionOffer.connect(borrower).acceptCollectionOffer(
      {
        loanERC20Denomination: this.loanERC20Denomination,
        loanPrincipalAmount: this.loanPrincipalAmount,
        isProRata: this.isProRata,
        maximumRepaymentAmount: this.maximumRepaymentAmount,
        nftCollateralContract: this.nftCollateralContract,
        nftCollateralId: this.nftCollateralId,
        loanDuration: this.loanDuration,
        originationFee: this.originationFee,
        liquidityCap: this.liquidityCap,
        allowedBorrowers: this.allowedBorrowers,
      },
      {
        signer: sigParams.lender.address,
        nonce: sigParams.nonce,
        expiry: sigParams.expiry,
        signature: sig,
      },
    );
    return tx;
  }

  async acceptCollectionOfferWithIdRange(
    nftfiCollectionOffer: CollectionOfferLoan,
    borrower: SignerWithAddress,
    sigParams: SignatureParams,
  ): Promise<ContractTransactionResponse> {
    let sig;
    if (!sigParams.customSig) {
      sig = await getLenderSignatureWithIdRange(
        sigParams.lender,
        this.loanPrincipalAmount,
        this.isProRata,
        this.maximumRepaymentAmount,
        this.nftCollateralId,
        this.minId,
        this.maxId,
        this.loanDuration,
        sigParams.nonce,
        this.nftCollateralContract,
        this.loanERC20Denomination,
        sigParams.expiry,
        sigParams.offerType,
        this.originationFee,
        this.liquidityCap,
        this.allowedBorrowers,
      );
    } else {
      sig = sigParams.customSig;
    }

    const tx = await nftfiCollectionOffer.connect(borrower).acceptCollectionOfferWithIdRange(
      {
        loanERC20Denomination: this.loanERC20Denomination,
        loanPrincipalAmount: this.loanPrincipalAmount,
        isProRata: this.isProRata,
        maximumRepaymentAmount: this.maximumRepaymentAmount,
        nftCollateralContract: this.nftCollateralContract,
        nftCollateralId: this.nftCollateralId,
        loanDuration: this.loanDuration,
        originationFee: this.originationFee,
        liquidityCap: this.liquidityCap,
        allowedBorrowers: this.allowedBorrowers,
      },
      {
        minId: this.minId,
        maxId: this.maxId,
      },
      {
        signer: sigParams.lender.address,
        nonce: sigParams.nonce,
        expiry: sigParams.expiry,
        signature: sig,
      },
    );
    return tx;
  }
}
