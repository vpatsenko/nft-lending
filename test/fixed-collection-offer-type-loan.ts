import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { deployContracts, NFTfiContracts } from './utils/deploy-contracts';
import { accountFixture, AccountFixture, factorX, fixedLoan, loanData } from './utils/fixtures';
import { mintAndApproveERC20, mintAndApproveNFT } from './utils/tokens';
import {
  assertBalanceChange,
  advanceTime,
  assertTokenOwner,
  currentTime,
  daysToSeconds,
  getLenderSignature,
  restoreSnapshot,
  selectEvent,
  takeSnapshot,
} from './utils/utils';
import { Offer } from './utils/Offer';

describe('Collection Offer', function () {
  const LOAN = loanData();
  let accounts: SignerWithAddress[]; // Test accounts
  let SC: NFTfiContracts; // Smart Contracts
  let FXT: AccountFixture; // account fixtures
  let snapshot: number;
  let nft: any;
  let nft2: any;
  let nft3: any;
  let lenderBalance: bigint;
  let borrowerBalance: bigint;
  let loanId: any;
  const LOAN_FXT = fixedLoan();

  let lenderSig2: string;
  let sigExpiry: bigint;

  const offerType = ethers.encodeBytes32String('COLLECTION_OFFER_LOAN');
  let offer: Offer;

  before(async () => {
    accounts = await ethers.getSigners();
    FXT = accountFixture(accounts);
    SC = await deployContracts(FXT.nftfiOwner);

    nft = await mintAndApproveNFT(SC.nft, FXT.borrower, await SC.escrow.getAddress());
    nft2 = await mintAndApproveNFT(SC.nft, FXT.borrower, await SC.escrow.getAddress());
    nft3 = await mintAndApproveNFT(SC.nft, FXT.borrower, await SC.escrow.getAddress());
    lenderBalance = await mintAndApproveERC20(
      SC.erc20,
      FXT.lender,
      1000n * factorX,
      await SC.erc20TransferManager.getAddress(),
    );
    borrowerBalance = await mintAndApproveERC20(
      SC.erc20,
      FXT.borrower,
      500n * factorX,
      await SC.erc20TransferManager.getAddress(),
    );
    await mintAndApproveERC20(SC.erc20, FXT.anyone, 1000n * factorX, await SC.erc20TransferManager.getAddress());

    const now = await currentTime();
    sigExpiry = now + daysToSeconds(10n);

    offer = new Offer({
      loanPrincipalAmount: LOAN_FXT.principal,
      maximumRepaymentAmount: LOAN_FXT.repayment,
      nftCollateralId: nft.id,
      nftCollateralContract: await SC.nft.getAddress(),
      loanDuration: LOAN_FXT.duration,
      loanERC20Denomination: await SC.erc20.getAddress(),
      isProRata: LOAN_FXT.isProRata,
      originationFee: 0n,
      liquidityCap: LOAN_FXT.principal,
      allowedBorrowers: [],
      requiredBorrower: ethers.ZeroAddress,
    });
  });

  beforeEach(async () => {
    snapshot = await takeSnapshot();
  });

  afterEach(async () => {
    await restoreSnapshot(snapshot);
    snapshot = await takeSnapshot();
  });

  describe('#fallback', async () => {
    it('should revert trying to send ETH to the contract', async () => {
      await expect(FXT.borrower.sendTransaction({ to: await SC.nftfiCollectionOffer.getAddress(), value: 1 })).to
        .reverted;
    });
  });

  describe('#pause - #unpause', async () => {
    it('non owner should not be able to call pause', async () => {
      expect(await SC.nftfiCollectionOffer.paused()).to.eq(false);
      await expect(SC.nftfiCollectionOffer.connect(FXT.borrower).pause()).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
      expect(await SC.nftfiCollectionOffer.paused()).to.eq(false);
    });

    it('owner should be able to call pause', async () => {
      expect(await SC.nftfiCollectionOffer.paused()).to.eq(false);
      await SC.nftfiCollectionOffer.pause();
      expect(await SC.nftfiCollectionOffer.paused()).to.eq(true);
    });

    it('non owner should not be able to call unpause', async () => {
      await SC.nftfiCollectionOffer.pause();
      expect(await SC.nftfiCollectionOffer.paused()).to.eq(true);
      await expect(SC.nftfiCollectionOffer.connect(FXT.borrower).unpause()).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
      expect(await SC.nftfiCollectionOffer.paused()).to.eq(true);
    });

    it('owner should be able to call unpause', async () => {
      await SC.nftfiCollectionOffer.pause();
      expect(await SC.nftfiCollectionOffer.paused()).to.eq(true);
      await SC.nftfiCollectionOffer.unpause();
      expect(await SC.nftfiCollectionOffer.paused()).to.eq(false);
    });
  });

  describe('Begin a new loan', () => {
    describe('acceptCollectionOffer', () => {
      beforeEach(async () => {
        offer = new Offer({
          loanPrincipalAmount: LOAN_FXT.principal,
          maximumRepaymentAmount: LOAN_FXT.repayment,
          nftCollateralId: nft.id,
          nftCollateralContract: await SC.nft.getAddress(),
          loanDuration: LOAN_FXT.duration,
          loanERC20Denomination: await SC.erc20.getAddress(),
          isProRata: LOAN_FXT.isProRata,
          originationFee: 0n,
          liquidityCap: LOAN_FXT.principal,
          allowedBorrowers: [],
          requiredBorrower: ethers.ZeroAddress,
        });
      });

      it('should not allow to use regular acceptOffer', async () => {
        const tx = offer.acceptOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });
        await expect(tx).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'OriginalAcceptOfferDisabled');
      });

      it('should not allow to acceptCollectionOffer when paused', async () => {
        await SC.nftfiCollectionOffer.pause();
        const tx = offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        await expect(tx).to.be.revertedWith('Pausable: paused');
      });

      it('should not allow to begin a new loan with negative interest rate', async () => {
        offer.setOffer({
          loanPrincipalAmount: 1000000n,
          maximumRepaymentAmount: 900000n,
          liquidityCap: LOAN_FXT.principal,
        });

        const tx = offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        await expect(tx).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'NegativeInterestRate');
      });

      it('should not allow to begin a new loan with duration greater than the maximum loan duration', async () => {
        const maxLoanDuration = await SC.nftfiCollectionOffer.maximumLoanDuration();

        offer.setOffer({
          loanDuration: maxLoanDuration + 1n,
        });

        const tx = offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        await expect(tx).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'LoanDurationExceedsMaximum');
      });

      it('should not allow to begin a new loan with duration zero', async () => {
        offer.setLoanDurationToZeroValue();
        const tx = offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        await expect(tx).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'LoanDurationCannotBeZero');
      });

      it('should not allow to begin a new loan when principal currency is not allowed', async () => {
        offer.setLoanERC20DenominationToZeroValue();

        const tx = offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        await expect(tx).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'CurrencyDenominationNotPermitted');
      });

      it('should not allow to begin a new loan when nft is not allowed', async () => {
        offer.setNftCollateralContractToZeroValue();

        const tx = offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        await expect(tx).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'NFTCollateralContractNotPermitted');
      });

      it('should not be able to begin a new loan if lender nonce has canceled', async () => {
        await SC.loanCoordinator.connect(FXT.lender).cancelLoanCommitment(offerType, 1);

        const tx = offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 1n,
          expiry: sigExpiry,
          offerType,
        });

        await expect(tx).to.be.revertedWithCustomError(SC.loanCoordinator, 'InvalidNonce');
      });

      it('should not be able to begin a new loan if lender signature is expired', async () => {
        const now = await currentTime();
        const lenderExpiry = now - 1n;
        const tx = offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: lenderExpiry,
          offerType,
        });

        await expect(tx).to.be.revertedWith('Lender Signature has expired');
      });

      it('should not be able to begin a new loan if InvalidLenderSignature', async () => {
        offer.setOffer({ nftCollateralId: 1n });
        const lenderSig = await offer.getSignature({
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        const tx = offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 1n,
          expiry: sigExpiry,
          offerType,
          customSig: lenderSig,
        });

        await expect(tx).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'InvalidLenderSignature');
      });

      it('should not be able to begin a if transferring the collateral nft fails', async () => {
        await SC.nft.connect(FXT.borrower).approve(ethers.ZeroAddress, nft.id);

        const tx = offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        await expect(tx).to.be.revertedWith('ERC721: caller is not token owner or approved');
      });

      it('should not be able to begin a if transferring the principal fails', async () => {
        const lenderBalance = await SC.erc20.balanceOf(FXT.lender.address);
        await SC.erc20.connect(FXT.lender).transfer(FXT.lender2.address, lenderBalance);

        const tx = offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        await expect(tx).to.be.revertedWith('ERC20: transfer amount exceeds balance');
      });

      it('should accept an offer and creating new loan properly', async () => {
        // BEGIN LOAN .............................................................
        const loanTx = await offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        await loanTx.wait();
        const loanStartedEvent = await selectEvent(loanTx, SC.nftfiCollectionOffer, 'LoanStarted');
        loanId = loanStartedEvent?.args?.loanId;

        await assertTokenOwner(
          'After beginLoan, the nft should be in escrow with NTFfi',
          SC.nft,
          nft.id,
          await SC.escrow.getAddress(),
        );

        await assertBalanceChange(
          'Borrower should have received loan principal',
          SC.erc20,
          FXT.borrower.address,
          borrowerBalance,
          LOAN_FXT.principal,
        );

        await assertBalanceChange(
          'Lender should have spent the loan principal',
          SC.erc20,
          FXT.lender.address,
          lenderBalance,
          -LOAN_FXT.principal,
        );

        const now = await currentTime();
        const loanData = await SC.nftfiCollectionOffer.getLoanTerms(loanId);
        expect(loanData.loanPrincipalAmount).to.eq(LOAN_FXT.principal);
        expect(loanData.maximumRepaymentAmount).to.eq(LOAN_FXT.repayment);
        expect(loanData.nftCollateralId).to.eq(nft.id);
        expect(loanData.loanStartTime).to.eq(now);
        expect(loanData.loanDuration).to.eq(LOAN_FXT.duration);
        expect(loanData.loanInterestRateForDurationInBasisPoints).to.eq(0);
        expect(loanData.loanAdminFeeInBasisPoints).to.eq(LOAN.adminFeeInBasisPoints);
        expect(loanData.nftCollateralContract).to.eq(await SC.nft.getAddress());
        expect(loanData.nftCollateralWrapper).to.eq(await SC.erc721Wrapper.getAddress());
        expect(loanData.loanERC20Denomination).to.eq(await SC.erc20.getAddress());
        expect(loanData.isProRata).to.eq(LOAN_FXT.isProRata);
        expect(loanData.lender).to.eq(FXT.lender.address);
      });

      it('should accept a second offer and creating new, second loan properly', async () => {
        // BEGIN LOAN .............................................................
        offer.setOffer({
          liquidityCap: LOAN_FXT.principal * 2n,
        });
        offer.setNftCollateralIdToZeroValue();

        const lenderSig2 = await offer.getSignature({
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        offer.setOffer({
          nftCollateralId: nft2.id,
        });

        await offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
          customSig: lenderSig2,
        });

        offer.setNftCollateralIdToZeroValue();
        const loanTx = await offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
          customSig: lenderSig2,
        });

        await loanTx.wait();
        const loanStartedEvent = await selectEvent(loanTx, SC.nftfiCollectionOffer, 'LoanStarted');
        loanId = loanStartedEvent?.args?.loanId;

        await assertTokenOwner(
          'After beginLoan, the first nft should be in escrow with NTFfi',
          SC.nft,
          nft2.id,
          await SC.escrow.getAddress(),
        );

        await assertTokenOwner(
          'After beginLoan, the second nft should be in escrow with NTFfi',
          SC.nft,
          nft.id,
          await SC.escrow.getAddress(),
        );

        await assertBalanceChange(
          'Borrower should have received loan principal',
          SC.erc20,
          FXT.borrower.address,
          borrowerBalance,
          LOAN_FXT.principal * 2n,
        );

        await assertBalanceChange(
          'Lender should have spent the loan principal',
          SC.erc20,
          FXT.lender.address,
          lenderBalance,
          -LOAN_FXT.principal * 2n,
        );

        const now = await currentTime();
        const loanData = await SC.nftfiCollectionOffer.getLoanTerms(loanId);
        expect(loanData.loanPrincipalAmount).to.eq(LOAN_FXT.principal);
        expect(loanData.maximumRepaymentAmount).to.eq(LOAN_FXT.repayment);
        expect(loanData.nftCollateralId).to.eq(nft.id);
        expect(loanData.loanStartTime).to.eq(now);
        expect(loanData.loanDuration).to.eq(LOAN_FXT.duration);
        expect(loanData.loanInterestRateForDurationInBasisPoints).to.eq(0);
        expect(loanData.loanAdminFeeInBasisPoints).to.eq(LOAN.adminFeeInBasisPoints);
        expect(loanData.nftCollateralContract).to.eq(await SC.nft.getAddress());
        expect(loanData.nftCollateralWrapper).to.eq(await SC.erc721Wrapper.getAddress());
        expect(loanData.loanERC20Denomination).to.eq(await SC.erc20.getAddress());
        expect(loanData.isProRata).to.eq(LOAN_FXT.isProRata);
        expect(loanData.lender).to.eq(FXT.lender.address);
      });

      it('should accept an offer and creating new loan properly and mint obligation receipt', async () => {
        // BEGIN LOAN .............................................................
        const loanTx = await offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        await loanTx.wait();
        const loanStartedEvent = await selectEvent(loanTx, SC.nftfiCollectionOffer, 'LoanStarted');
        loanId = loanStartedEvent?.args?.loanId;

        const now = await currentTime();

        await SC.nftfiCollectionOffer.connect(FXT.borrower).mintObligationReceipt(loanId);
        await SC.nftfiCollectionOffer.connect(FXT.lender).mintPromissoryNote(loanId);

        await assertTokenOwner(
          'After beginLoan, the nft should be in escrow with NTFfi',
          SC.nft,
          nft.id,
          await SC.escrow.getAddress(),
        );

        const loanCoordinatorLoanData = await SC.loanCoordinator.getLoanData(loanId);

        await assertTokenOwner(
          'After beginLoan, the Lender should own a Promissory Note NFT',
          SC.promissoryNote,
          loanCoordinatorLoanData.smartNftId.toString(),
          FXT.lender.address,
        );

        await assertTokenOwner(
          'After beginLoan and mintObligationReceipt, the Borrower should own a Obligation Note NFT',
          SC.obligationReceipt,
          loanCoordinatorLoanData.smartNftId.toString(),
          FXT.borrower.address,
        );

        await assertBalanceChange(
          'Borrower should have received loan principal',
          SC.erc20,
          FXT.borrower.address,
          borrowerBalance,
          LOAN_FXT.principal,
        );

        await assertBalanceChange(
          'Lender should have spent the loan principal',
          SC.erc20,
          FXT.lender.address,
          lenderBalance,
          -LOAN_FXT.principal,
        );

        const loanData = await SC.nftfiCollectionOffer.getLoanTerms(loanId);
        expect(loanData.loanPrincipalAmount).to.eq(LOAN_FXT.principal);
        expect(loanData.maximumRepaymentAmount).to.eq(LOAN_FXT.repayment);
        expect(loanData.nftCollateralId).to.eq(nft.id);
        expect(loanData.loanStartTime).to.eq(now);
        expect(loanData.loanDuration).to.eq(LOAN_FXT.duration);
        expect(loanData.loanInterestRateForDurationInBasisPoints).to.eq(0);
        expect(loanData.loanAdminFeeInBasisPoints).to.eq(LOAN.adminFeeInBasisPoints);
        expect(loanData.nftCollateralContract).to.eq(await SC.nft.getAddress());
        expect(loanData.nftCollateralWrapper).to.eq(await SC.erc721Wrapper.getAddress());
        expect(loanData.loanERC20Denomination).to.eq(await SC.erc20.getAddress());
        expect(loanData.isProRata).to.eq(LOAN_FXT.isProRata);

        const orData = await SC.obligationReceipt.loans(loanCoordinatorLoanData.smartNftId.toString());
        expect(orData.loanCoordinator).to.eq(await SC.loanCoordinator.getAddress());
        expect(orData.loanId).to.eq(loanId);

        const pnData = await SC.promissoryNote.loans(loanCoordinatorLoanData.smartNftId.toString());
        expect(pnData.loanCoordinator).to.eq(await SC.loanCoordinator.getAddress());
        expect(pnData.loanId).to.eq(loanId);
      });

      it('should accept a collection offer and creating new loan properly with origination fee', async () => {
        const originationFee = 1000n;
        offer.setOffer({
          originationFee: originationFee,
        });

        const loanTx = await offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        await loanTx.wait();
        const loanStartedEvent = await selectEvent(loanTx, SC.nftfiCollectionOffer, 'LoanStarted');
        loanId = loanStartedEvent?.args?.loanId;

        await assertTokenOwner(
          'After beginLoan, the nft should be in escrow with NTFfi',
          SC.nft,
          nft.id,
          await SC.escrow.getAddress(),
        );

        await assertBalanceChange(
          'Borrower should have received loan principal',
          SC.erc20,
          FXT.borrower.address,
          borrowerBalance,
          LOAN_FXT.principal - originationFee,
        );

        await assertBalanceChange(
          'Lender should have spent the loan principal',
          SC.erc20,
          FXT.lender.address,
          lenderBalance,
          -LOAN_FXT.principal + originationFee,
        );

        const now = await currentTime();
        const loanData = await SC.nftfiCollectionOffer.getLoanTerms(loanId);
        expect(loanData.loanPrincipalAmount).to.eq(LOAN_FXT.principal);
        expect(loanData.maximumRepaymentAmount).to.eq(LOAN_FXT.repayment);
        expect(loanData.nftCollateralId).to.eq(nft.id);
        expect(loanData.loanStartTime).to.eq(now);
        expect(loanData.loanDuration).to.eq(LOAN_FXT.duration);
        expect(loanData.loanInterestRateForDurationInBasisPoints).to.eq(0);
        expect(loanData.loanAdminFeeInBasisPoints).to.eq(LOAN.adminFeeInBasisPoints);
        expect(loanData.nftCollateralContract).to.eq(await SC.nft.getAddress());
        expect(loanData.nftCollateralWrapper).to.eq(await SC.erc721Wrapper.getAddress());
        expect(loanData.loanERC20Denomination).to.eq(await SC.erc20.getAddress());
        expect(loanData.isProRata).to.eq(LOAN_FXT.isProRata);
        expect(loanData.lender).to.eq(FXT.lender.address);
        expect(loanData.originationFee).to.eq(1000n);
      });

      it('should accept two offers with the same signature, check liquidityCap and be reverted on the third loan', async () => {
        // BEGIN LOAN .............................................................
        const liquidityCap = LOAN_FXT.principal * BigInt(2);
        offer.setOffer({
          liquidityCap: liquidityCap,
        });

        const lenderSig2 = await offer.getSignature({
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });
        offer.setOffer({
          nftCollateralId: nft2.id,
        });

        await offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
          customSig: lenderSig2,
        });

        offer.setNftCollateralIdToZeroValue();
        await offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
          customSig: lenderSig2,
        });

        const signatureId = ethers.keccak256(lenderSig2);

        const liquidityForSignature = await SC.nftfiCollectionOffer.liquidityPerSignature(signatureId);
        expect(liquidityForSignature).to.be.equal(liquidityCap);

        const tx = offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
          customSig: lenderSig2,
        });

        await expect(tx).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'LiquidityCapExceeded');
      });

      it('should accept offer for allowed borrower', async () => {
        const liquidityCap = LOAN_FXT.principal * BigInt(2);
        offer.setOffer({
          allowedBorrowers: [FXT.borrower.address],
          liquidityCap: liquidityCap,
        });

        await offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });
      });

      it('shouldnt accept offer for not allowed borrower', async () => {
        const liquidityCap = LOAN_FXT.principal * BigInt(2);
        offer.setOffer({
          allowedBorrowers: [FXT.borrower.address],
          liquidityCap: liquidityCap,
        });

        const tx = offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower2, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        await expect(tx).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'OnlySpecifiedBorrower');
      });
    });

    describe('acceptCollectionOffer with id range', () => {
      let lenderSigWithIdRange: string;

      const minId = 0n;
      const maxId = 2n;

      beforeEach(async () => {
        offer.setOffer({
          minId: minId,
          maxId: maxId,
        });

        lenderSigWithIdRange = await offer.getSignatureWithIdRange({
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });
      });

      it('should accept an offer and creating new loan properly with id range (id bottom of the range)', async () => {
        const loanTx = await offer.acceptCollectionOfferWithIdRange(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
          customSig: lenderSigWithIdRange,
        });

        await loanTx.wait();
        const loanStartedEvent = await selectEvent(loanTx, SC.nftfiCollectionOffer, 'LoanStarted');
        loanId = loanStartedEvent?.args?.loanId;

        await assertTokenOwner(
          'After beginLoan, the nft should be in escrow with NTFfi',
          SC.nft,
          nft.id,
          await SC.escrow.getAddress(),
        );

        await assertBalanceChange(
          'Borrower should have received loan principal',
          SC.erc20,
          FXT.borrower.address,
          borrowerBalance,
          LOAN_FXT.principal,
        );

        await assertBalanceChange(
          'Lender should have spent the loan principal',
          SC.erc20,
          FXT.lender.address,
          lenderBalance,
          -LOAN_FXT.principal,
        );

        const now = await currentTime();
        const loanData = await SC.nftfiCollectionOffer.getLoanTerms(loanId);
        expect(loanData.loanPrincipalAmount).to.eq(LOAN_FXT.principal);
        expect(loanData.maximumRepaymentAmount).to.eq(LOAN_FXT.repayment);
        expect(loanData.nftCollateralId).to.eq(nft.id);
        expect(loanData.loanStartTime).to.eq(now);
        expect(loanData.loanDuration).to.eq(LOAN_FXT.duration);
        expect(loanData.loanInterestRateForDurationInBasisPoints).to.eq(0);
        expect(loanData.loanAdminFeeInBasisPoints).to.eq(LOAN.adminFeeInBasisPoints);
        expect(loanData.nftCollateralContract).to.eq(await SC.nft.getAddress());
        expect(loanData.nftCollateralWrapper).to.eq(await SC.erc721Wrapper.getAddress());
        expect(loanData.loanERC20Denomination).to.eq(await SC.erc20.getAddress());
        expect(loanData.isProRata).to.eq(LOAN_FXT.isProRata);
        expect(loanData.lender).to.eq(FXT.lender.address);
      });

      it('should accept an offer and creating new loan properly with id range (id top of the range)', async () => {
        offer.setOffer({
          nftCollateralId: nft3.id,
        });

        const loanTx = await offer.acceptCollectionOfferWithIdRange(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
          customSig: lenderSigWithIdRange,
        });

        await loanTx.wait();
        const loanStartedEvent = await selectEvent(loanTx, SC.nftfiCollectionOffer, 'LoanStarted');
        loanId = loanStartedEvent?.args?.loanId;

        await assertTokenOwner(
          'After beginLoan, the nft should be in escrow with NTFfi',
          SC.nft,
          nft3.id,
          await SC.escrow.getAddress(),
        );

        await assertBalanceChange(
          'Borrower should have received loan principal',
          SC.erc20,
          FXT.borrower.address,
          borrowerBalance,
          LOAN_FXT.principal,
        );

        await assertBalanceChange(
          'Lender should have spent the loan principal',
          SC.erc20,
          FXT.lender.address,
          lenderBalance,
          -LOAN_FXT.principal,
        );

        const now = await currentTime();
        const loanData = await SC.nftfiCollectionOffer.getLoanTerms(loanId);
        expect(loanData.loanPrincipalAmount).to.eq(LOAN_FXT.principal);
        expect(loanData.maximumRepaymentAmount).to.eq(LOAN_FXT.repayment);
        expect(loanData.nftCollateralId).to.eq(nft3.id);
        expect(loanData.loanStartTime).to.eq(now);
        expect(loanData.loanDuration).to.eq(LOAN_FXT.duration);
        expect(loanData.loanInterestRateForDurationInBasisPoints).to.eq(0);
        expect(loanData.loanAdminFeeInBasisPoints).to.eq(LOAN.adminFeeInBasisPoints);
        expect(loanData.nftCollateralContract).to.eq(await SC.nft.getAddress());
        expect(loanData.nftCollateralWrapper).to.eq(await SC.erc721Wrapper.getAddress());
        expect(loanData.loanERC20Denomination).to.eq(await SC.erc20.getAddress());
        expect(loanData.isProRata).to.eq(LOAN_FXT.isProRata);
        expect(loanData.lender).to.eq(FXT.lender.address);
      });

      it('should accept an offer and creating new loan properly with id range (range of 1)', async () => {
        offer.setMinIdToZeroValue();
        offer.setMaxIdToZeroValue();
        offer.setNftCollateralIdToZeroValue();

        const loanTx = await offer.acceptCollectionOfferWithIdRange(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        await loanTx.wait();
        const loanStartedEvent = await selectEvent(loanTx, SC.nftfiCollectionOffer, 'LoanStarted');
        loanId = loanStartedEvent?.args?.loanId;

        await assertTokenOwner(
          'After beginLoan, the nft should be in escrow with NTFfi',
          SC.nft,
          nft.id,
          await SC.escrow.getAddress(),
        );

        await assertBalanceChange(
          'Borrower should have received loan principal',
          SC.erc20,
          FXT.borrower.address,
          borrowerBalance,
          LOAN_FXT.principal,
        );

        await assertBalanceChange(
          'Lender should have spent the loan principal',
          SC.erc20,
          FXT.lender.address,
          lenderBalance,
          -LOAN_FXT.principal,
        );

        const now = await currentTime();
        const loanData = await SC.nftfiCollectionOffer.getLoanTerms(loanId);
        expect(loanData.loanPrincipalAmount).to.eq(LOAN_FXT.principal);
        expect(loanData.maximumRepaymentAmount).to.eq(LOAN_FXT.repayment);
        expect(loanData.nftCollateralId).to.eq(nft.id);
        expect(loanData.loanStartTime).to.eq(now);
        expect(loanData.loanDuration).to.eq(LOAN_FXT.duration);
        expect(loanData.loanInterestRateForDurationInBasisPoints).to.eq(0);
        expect(loanData.loanAdminFeeInBasisPoints).to.eq(LOAN.adminFeeInBasisPoints);
        expect(loanData.nftCollateralContract).to.eq(await SC.nft.getAddress());
        expect(loanData.nftCollateralWrapper).to.eq(await SC.erc721Wrapper.getAddress());
        expect(loanData.loanERC20Denomination).to.eq(await SC.erc20.getAddress());
        expect(loanData.isProRata).to.eq(LOAN_FXT.isProRata);
        expect(loanData.lender).to.eq(FXT.lender.address);
      });

      it('should fail with invalid range min > max', async () => {
        offer.setOffer({
          minId: 2n,
          maxId: 1n,
        });

        const tx = offer.acceptCollectionOfferWithIdRange(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        // BEGIN LOAN .............................................................
        await expect(tx).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'MinIdGreaterThanMaxId');
      });

      it('should fail with id not range (under)', async () => {
        offer.setOffer({
          minId: 1n,
          maxId: 2n,
        });
        offer.setNftCollateralIdToZeroValue();

        const tx = offer.acceptCollectionOfferWithIdRange(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        await expect(tx).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'CollateralIdNotInRange');
      });

      it('should fail with id not range (over)', async () => {
        const minId = 0n;
        const maxId = 1n;

        offer.setOffer({
          minId,
          maxId,
        });

        const tx = offer.acceptCollectionOfferWithIdRange(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        await expect(tx).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'CollateralIdNotInRange');
      });

      it('should fail if the offer is a range signature, but Borrower calls regular acceptCollectionOffer', async () => {
        offer.setMinIdToZeroValue();
        offer.setOffer({
          maxId: 1n,
        });

        const lenderSignatureWithIdRange = await offer.getSignatureWithIdRange({
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        const tx = offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
          customSig: lenderSignatureWithIdRange,
        });

        await expect(tx).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'InvalidLenderSignature');
      });

      it('should accept an offer and creating new loan properly with id range (id bottom of the range) and origination fee', async () => {
        const originationFee = 1000n;
        offer.setOffer({
          originationFee,
        });

        const loanTx = await offer.acceptCollectionOfferWithIdRange(SC.nftfiCollectionOffer, FXT.borrower, {
          lender: FXT.lender,
          nonce: 0n,
          expiry: sigExpiry,
          offerType,
        });

        await loanTx.wait();
        const loanStartedEvent = await selectEvent(loanTx, SC.nftfiCollectionOffer, 'LoanStarted');
        loanId = loanStartedEvent?.args?.loanId;

        await assertTokenOwner(
          'After beginLoan, the nft should be in escrow with NTFfi',
          SC.nft,
          nft.id,
          await SC.escrow.getAddress(),
        );

        await assertBalanceChange(
          'Borrower should have received loan principal',
          SC.erc20,
          FXT.borrower.address,
          borrowerBalance,
          LOAN_FXT.principal - originationFee,
        );

        await assertBalanceChange(
          'Lender should have spent the loan principal',
          SC.erc20,
          FXT.lender.address,
          lenderBalance,
          -LOAN_FXT.principal + originationFee,
        );

        const now = await currentTime();
        const loanData = await SC.nftfiCollectionOffer.getLoanTerms(loanId);
        expect(loanData.loanPrincipalAmount).to.eq(LOAN_FXT.principal);
        expect(loanData.maximumRepaymentAmount).to.eq(LOAN_FXT.repayment);
        expect(loanData.nftCollateralId).to.eq(nft.id);
        expect(loanData.loanStartTime).to.eq(now);
        expect(loanData.loanDuration).to.eq(LOAN_FXT.duration);
        expect(loanData.loanInterestRateForDurationInBasisPoints).to.eq(0);
        expect(loanData.loanAdminFeeInBasisPoints).to.eq(LOAN.adminFeeInBasisPoints);
        expect(loanData.nftCollateralContract).to.eq(await SC.nft.getAddress());
        expect(loanData.nftCollateralWrapper).to.eq(await SC.erc721Wrapper.getAddress());
        expect(loanData.loanERC20Denomination).to.eq(await SC.erc20.getAddress());
        expect(loanData.isProRata).to.eq(LOAN_FXT.isProRata);
        expect(loanData.lender).to.eq(FXT.lender.address);
        expect(loanData.originationFee).to.eq(originationFee);
      });
    });
  });

  describe('REPAY a Loan', () => {
    before(async () => {
      const loanTx = await offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
        lender: FXT.lender,
        nonce: 0n,
        expiry: sigExpiry,
        offerType,
      });

      await loanTx.wait();
      const loanStartedEvent = await selectEvent(loanTx, SC.nftfiCollectionOffer, 'LoanStarted');
      loanId = loanStartedEvent?.args?.loanId;
    });

    it('should not allow to repay a loan with wrong id', async () => {
      await advanceTime(daysToSeconds(5n));

      await expect(SC.nftfiCollectionOffer.connect(FXT.borrower).payBackLoan(0)).to.be.revertedWith('invalid loanId');
    });

    it('should not allow to repay a loan that has already been repaid', async () => {
      await advanceTime(daysToSeconds(5n));
      await SC.nftfiCollectionOffer.connect(FXT.borrower).payBackLoan(loanId);

      await expect(SC.nftfiCollectionOffer.connect(FXT.borrower).payBackLoan(loanId)).to.be.revertedWith(
        'Loan already repaid/liquidated',
      );
    });

    it('should not allow to repay a loan that has already been liquidated', async () => {
      await advanceTime(LOAN_FXT.duration + 1n);
      await SC.nftfiCollectionOffer.connect(FXT.lender).liquidateOverdueLoan(loanId);

      await expect(SC.nftfiCollectionOffer.connect(FXT.borrower).payBackLoan(loanId)).to.be.revertedWith(
        'Loan already repaid/liquidated',
      );
    });

    it('should not allow to repay a loan that has bee expired', async () => {
      await advanceTime(LOAN_FXT.duration + 1n);

      await expect(SC.nftfiCollectionOffer.connect(FXT.borrower).payBackLoan(loanId)).to.be.revertedWith(
        'Loan is expired',
      );
    });

    it('should not be able to repay a loan if transferring the principal payoff amount fails', async () => {
      const borrowerBalance = await SC.erc20.balanceOf(FXT.borrower.address);
      await SC.erc20.connect(FXT.borrower).transfer(FXT.borrower2.address, borrowerBalance);
      await expect(SC.nftfiCollectionOffer.connect(FXT.borrower).payBackLoan(loanId)).to.be.revertedWith(
        'ERC20: transfer amount exceeds balance',
      );
    });

    it('should not be able to repay a loan if transferring the principal admin fee amount fails', async () => {
      const borrowerBalance = await SC.erc20.balanceOf(FXT.borrower.address);
      await SC.erc20
        .connect(FXT.borrower)
        .transfer(FXT.borrower2.address, (LOAN_FXT.repayment - borrowerBalance - 10n) * -1n);
      await expect(SC.nftfiCollectionOffer.connect(FXT.borrower).payBackLoan(loanId)).to.be.revertedWith(
        'ERC20: transfer amount exceeds balance',
      );
    });

    it('should repay a loan properly', async () => {
      const nftfiBalance = await SC.erc20.balanceOf(FXT.nftfiOwner.address);
      const borrowerBalance = await SC.erc20.balanceOf(FXT.borrower.address);
      const lenderBalance = await SC.erc20.balanceOf(FXT.lender.address);

      // REPAY LOAN .............................................................
      await advanceTime(daysToSeconds(5n));
      const repayTx = await SC.nftfiCollectionOffer.connect(FXT.borrower).payBackLoan(loanId);
      const loanRepaidEvent = await selectEvent(repayTx, SC.nftfiCollectionOffer, 'LoanRepaid');
      const adminFee = loanRepaidEvent?.args?.adminFee;

      await assertTokenOwner(
        'After payBackLoan, the original borrower should own the nft again!',
        SC.nft,
        nft.id,
        FXT.borrower.address,
      );

      await assertBalanceChange(
        'Borrower should have repaid the loan',
        SC.erc20,
        FXT.borrower.address,
        borrowerBalance,
        -LOAN_FXT.repayment,
      );
      await assertBalanceChange(
        'Lender should have received the payoff',
        SC.erc20,
        FXT.lender.address,
        lenderBalance,
        LOAN_FXT.repayment - adminFee,
      );
      await assertBalanceChange(
        'NFTfi should have received the adminFee',
        SC.erc20,
        FXT.nftfiOwner.address,
        nftfiBalance,
        adminFee,
      );
    });

    it('anyone should be able to repay a loan properly', async () => {
      const nftfiBalance = await SC.erc20.balanceOf(FXT.nftfiOwner.address);
      const anyoneBalance = await SC.erc20.balanceOf(FXT.anyone.address);
      const lenderBalance = await SC.erc20.balanceOf(FXT.lender.address);

      // REPAY LOAN .............................................................
      await advanceTime(daysToSeconds(5n));
      const repayTx = await SC.nftfiCollectionOffer.connect(FXT.anyone).payBackLoan(loanId);
      const loanRepaidEvent = await selectEvent(repayTx, SC.nftfiCollectionOffer, 'LoanRepaid');
      const adminFee = loanRepaidEvent?.args?.adminFee;

      await assertTokenOwner(
        'After payBackLoan, the original borrower should own the nft again!',
        SC.nft,
        nft.id,
        FXT.borrower.address,
      );

      await assertBalanceChange(
        'Anyone should have repaid the loan',
        SC.erc20,
        FXT.anyone.address,
        anyoneBalance,
        -LOAN_FXT.repayment,
      );
      await assertBalanceChange(
        'Lender should have received the payoff',
        SC.erc20,
        FXT.lender.address,
        lenderBalance,
        LOAN_FXT.repayment - adminFee,
      );
      await assertBalanceChange(
        'NFTfi should have received the adminFee',
        SC.erc20,
        FXT.nftfiOwner.address,
        nftfiBalance,
        adminFee,
      );
    });

    it('should repay a loan with origination fee properly', async () => {
      const originationFee = 1000n;
      const lenderSigWithOriginationFee = await getLenderSignature(
        FXT.lender,
        LOAN_FXT.principal,
        LOAN_FXT.isProRata,
        LOAN_FXT.repayment,
        0n, //nft.id should be 0 in signature for collection offers
        LOAN_FXT.duration,
        0n,
        await SC.nft.getAddress(),
        await SC.erc20.getAddress(),
        sigExpiry,
        offerType,
        originationFee,
        LOAN_FXT.principal,
        [],
      );

      const loanTx = await SC.nftfiCollectionOffer.connect(FXT.borrower).acceptCollectionOffer(
        {
          loanERC20Denomination: await SC.erc20.getAddress(),
          loanPrincipalAmount: LOAN_FXT.principal,
          maximumRepaymentAmount: LOAN_FXT.repayment,
          nftCollateralContract: await SC.nft.getAddress(),
          nftCollateralId: nft2.id,
          loanDuration: LOAN_FXT.duration,
          isProRata: LOAN_FXT.isProRata,
          originationFee: originationFee,
          liquidityCap: LOAN_FXT.principal,
          allowedBorrowers: [],
        },
        {
          signer: FXT.lender.address,
          nonce: 0,
          expiry: sigExpiry,
          signature: lenderSigWithOriginationFee,
        },
      );

      await loanTx.wait();
      const loanStartedEvent = await selectEvent(loanTx, SC.nftfiCollectionOffer, 'LoanStarted');
      loanId = loanStartedEvent?.args?.loanId;

      const nftfiBalance = await SC.erc20.balanceOf(FXT.nftfiOwner.address);
      const borrowerBalance = await SC.erc20.balanceOf(FXT.borrower.address);
      const lenderBalance = await SC.erc20.balanceOf(FXT.lender.address);

      // REPAY LOAN .............................................................
      await advanceTime(daysToSeconds(5n));
      const repayTx = await SC.nftfiCollectionOffer.connect(FXT.borrower).payBackLoan(loanId);
      const loanRepaidEvent = await selectEvent(repayTx, SC.nftfiCollectionOffer, 'LoanRepaid');
      const adminFee = loanRepaidEvent?.args?.adminFee;

      await assertTokenOwner(
        'After payBackLoan, the original borrower should own the nft again!',
        SC.nft,
        nft2.id,
        FXT.borrower.address,
      );

      await assertBalanceChange(
        'Borrower should have repaid the loan',
        SC.erc20,
        FXT.borrower.address,
        borrowerBalance,
        -LOAN_FXT.repayment,
      );

      await assertBalanceChange(
        'Lender should have received the payoff',
        SC.erc20,
        FXT.lender.address,
        lenderBalance,
        LOAN_FXT.repayment - adminFee,
      );

      await assertBalanceChange(
        'NFTfi should have received the adminFee',
        SC.erc20,
        FXT.nftfiOwner.address,
        nftfiBalance,
        adminFee,
      );
    });
  });

  describe('LIQUIDATE an overdue Loan', () => {
    before(async () => {
      offer.setNftCollateralIdToZeroValue();
      const lenderSig = await offer.getSignature({
        lender: FXT.lender,
        nonce: 1n,
        expiry: sigExpiry,
        offerType,
      });

      offer.setOffer({ nftCollateralId: nft2.id });

      const loanTx = await offer.acceptCollectionOffer(SC.nftfiCollectionOffer, FXT.borrower, {
        lender: FXT.lender,
        nonce: 1n,
        expiry: sigExpiry,
        offerType,
        customSig: lenderSig,
      });

      await loanTx.wait();
      const loanStartedEvent = await selectEvent(loanTx, SC.nftfiCollectionOffer, 'LoanStarted');
      loanId = loanStartedEvent?.args?.loanId;
    });

    it('should not allow to liquidate a when is not overdue yet', async () => {
      await advanceTime(daysToSeconds(5n));
      await expect(
        SC.nftfiCollectionOffer.connect(FXT.lender).liquidateOverdueLoan(loanId),
      ).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'LoanNotOverdueYet');
    });

    it('non lender should not be able to liquidate a loan', async () => {
      await advanceTime(LOAN_FXT.duration + 1n);
      await expect(
        SC.nftfiCollectionOffer.connect(FXT.anyone).liquidateOverdueLoan(loanId),
      ).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'OnlyLenderCanLiquidate');
    });

    it('should liquidate a loan properly', async () => {
      const nftfiBalance = await SC.erc20.balanceOf(FXT.nftfiOwner.address);
      const borrowerBalanceBefore = await SC.erc20.balanceOf(FXT.borrower.address);
      const lenderBalanceBefore = await SC.erc20.balanceOf(FXT.lender.address);

      // LIQUIDATE LOAN .............................................................
      await advanceTime(LOAN_FXT.duration + 1n);

      await SC.nftfiCollectionOffer.connect(FXT.lender).liquidateOverdueLoan(loanId); // NOTE: only the lender can Liquidate an overdue loan

      await assertTokenOwner('After closure, Lender should now own the nft', SC.nft, nft2.id, FXT.lender.address);
      await assertBalanceChange(
        'Borrower should have kept the loan',
        SC.erc20,
        FXT.borrower.address,
        borrowerBalanceBefore,
        0n, // expect no change in balance
      );
      await assertBalanceChange(
        'Lender should have received nothing',
        SC.erc20,
        FXT.lender.address,
        lenderBalanceBefore,
        0n, // expect no change in balance
      );
      await assertBalanceChange(
        'NFTfi should have received no adminFee',
        SC.erc20,
        FXT.nftfiOwner.address,
        nftfiBalance,
        0n, // expect no change in balance
      );
    });

    it('should not allow to liquidate a loan that has already been liquidated', async () => {
      await advanceTime(LOAN_FXT.duration + 1n);
      await SC.nftfiCollectionOffer.connect(FXT.lender).liquidateOverdueLoan(loanId);
      await expect(
        SC.nftfiCollectionOffer.connect(FXT.lender).liquidateOverdueLoan(loanId),
      ).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'LoanAlreadyRepaidOrLiquidated');
    });

    it('should not allow to liquidate a loan that has already been repaid', async () => {
      await advanceTime(daysToSeconds(5n));
      await SC.nftfiCollectionOffer.connect(FXT.borrower).payBackLoan(loanId);
      await expect(
        SC.nftfiCollectionOffer.connect(FXT.lender).liquidateOverdueLoan(loanId),
      ).to.be.revertedWithCustomError(SC.nftfiCollectionOffer, 'LoanAlreadyRepaidOrLiquidated');
    });
  });

  describe('#getPayoffAmount', () => {
    it('should return maximumRepaymentAmount', async () => {
      const payoffAmount = await SC.nftfiCollectionOffer.getPayoffAmount(loanId);
      expect(payoffAmount).to.eq(LOAN_FXT.repayment);
    });
  });

  describe('#cancelLoanCommitment', () => {
    before(async () => {
      lenderSig2 = await getLenderSignature(
        FXT.lender,
        LOAN_FXT.principal,
        LOAN_FXT.isProRata,
        LOAN_FXT.repayment,
        0n, //nft.id should be 0 in signature for collection offers
        LOAN_FXT.duration,
        2n,
        await SC.nft.getAddress(),
        await SC.erc20.getAddress(),
        sigExpiry,
        offerType,
        0n,
        LOAN_FXT.principal,
        [],
      );
    });
    it('should fail if the nonce has already been canceled', async () => {
      await SC.loanCoordinator.connect(FXT.lender).cancelLoanCommitment(offerType, 2);
      await expect(
        SC.loanCoordinator.connect(FXT.lender).cancelLoanCommitment(offerType, 2),
      ).to.be.revertedWithCustomError(SC.loanCoordinator, 'InvalidNonce');
    });
    it('should cancel the offer properly', async () => {
      await SC.loanCoordinator.connect(FXT.lender).cancelLoanCommitment(offerType, 2);

      await expect(
        SC.nftfiCollectionOffer.connect(FXT.borrower).acceptCollectionOffer(
          {
            loanERC20Denomination: await SC.erc20.getAddress(),
            loanPrincipalAmount: LOAN_FXT.principal,
            maximumRepaymentAmount: LOAN_FXT.repayment,
            nftCollateralContract: await SC.nft.getAddress(),
            nftCollateralId: nft3.id,
            loanDuration: LOAN_FXT.duration,
            isProRata: LOAN_FXT.isProRata,
            originationFee: 0n,
            liquidityCap: LOAN_FXT.principal,
            allowedBorrowers: [],
          },
          {
            signer: FXT.lender.address,
            nonce: 2,
            expiry: sigExpiry,
            signature: lenderSig2,
          },
        ),
      ).to.be.revertedWithCustomError(SC.loanCoordinator, 'InvalidNonce');

      expect(await SC.loanCoordinator.getWhetherNonceHasBeenUsedForUser(offerType, FXT.lender.address, 2)).to.eq(true);
    });
  });

  describe('#updateAdminFee', () => {
    it('non owner should not be able to call updateAdminFee', async () => {
      await expect(SC.nftfiCollectionOffer.connect(FXT.lender).updateAdminFee(10)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should not be able to call updateAdminFee with a value gt the max allowed', async () => {
      await expect(SC.nftfiCollectionOffer.updateAdminFee(10001)).to.be.revertedWithCustomError(
        SC.nftfiCollectionOffer,
        'BasisPointsTooHigh',
      );
    });

    it('owner should be able to call updateAdminFee properly', async () => {
      await SC.nftfiCollectionOffer.updateAdminFee(20);
      expect(await SC.nftfiCollectionOffer.adminFeeInBasisPoints()).to.eq(20);
    });
  });

  describe('#updateMaximumLoanDuration', () => {
    it('non owner should not be able to call updateMaximumLoanDuration', async () => {
      await expect(SC.nftfiCollectionOffer.connect(FXT.lender).updateMaximumLoanDuration(10)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('owner should not be able to call updateMaximumLoanDuration with a value gt the max allowed', async () => {
      await expect(SC.nftfiCollectionOffer.updateMaximumLoanDuration(4294967296)).to.be.revertedWithCustomError(
        SC.nftfiCollectionOffer,
        'LoanDurationOverflow',
      );
    });

    it('owner should be able to call updateMaximumLoanDuration properly', async () => {
      await SC.nftfiCollectionOffer.updateMaximumLoanDuration(20);
      expect(await SC.nftfiCollectionOffer.maximumLoanDuration()).to.eq(20);
    });
  });
});
