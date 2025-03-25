import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { deployContracts, NFTfiContracts } from './utils/deploy-contracts';
import { deployNonPermittedNFT } from './utils/deploy-non-permitted-nft';
import { accountFixture, AccountFixture, factorX, fixedLoan } from './utils/fixtures';
import { mintAndApproveERC20, mintAndApproveNFT } from './utils/tokens';
import { currentTime, daysToSeconds } from './utils/utils';
import { Offer } from './utils/Offer';

describe('Invalid NFT', function () {
  const LOAN_FXT = fixedLoan();
  let accounts: SignerWithAddress[]; // Test accounts
  let SmartContracts: NFTfiContracts; // Smart Contracts
  let SmartContractsInvalidNFT: NFTfiContracts; // Smart Contracts
  let Fixture: AccountFixture; // account fixtures
  let nft: any;
  let invalidNft: any;
  let sigExpiry: bigint;

  const offerType = ethers.encodeBytes32String('ASSET_OFFER_LOAN');
  let offer: Offer;

  before(async function () {
    accounts = await ethers.getSigners();
    Fixture = accountFixture(accounts);
    SmartContracts = await deployContracts(Fixture.nftfiOwner);
    SmartContractsInvalidNFT = await deployContracts(Fixture.nftfiOwner);
    SmartContractsInvalidNFT = await deployNonPermittedNFT(Fixture.nftfiOwner, SmartContracts);

    nft = await mintAndApproveNFT(SmartContracts.nft, Fixture.borrower, await SmartContracts.escrow.getAddress());
    invalidNft = await mintAndApproveNFT(
      SmartContractsInvalidNFT.nft,
      Fixture.borrower,
      await SmartContractsInvalidNFT.escrow.getAddress(),
    );

    await mintAndApproveERC20(
      SmartContracts.erc20,
      Fixture.lender,
      1000n * factorX,
      await SmartContracts.erc20TransferManager.getAddress(),
    );
    await mintAndApproveERC20(
      SmartContracts.erc20,
      Fixture.borrower,
      500n * factorX,
      await SmartContracts.erc20TransferManager.getAddress(),
    );

    const now = await currentTime();
    sigExpiry = now + daysToSeconds(10n);

    offer = new Offer({
      loanERC20Denomination: await SmartContracts.erc20.getAddress(),
      loanPrincipalAmount: LOAN_FXT.principal,
      isProRata: LOAN_FXT.isProRata,
      maximumRepaymentAmount: LOAN_FXT.repayment,
      nftCollateralContract: await SmartContracts.nft.getAddress(),
      nftCollateralId: nft.id,
      loanDuration: LOAN_FXT.duration,
      originationFee: 0n,
      liquidityCap: 0n,
      allowedBorrowers: [Fixture.borrower.address],
    });
  });

  it('a loan with invalid nft should cause revert', async function () {
    offer.setOffer({
      nftCollateralContract: await SmartContractsInvalidNFT.nft.getAddress(),
      nftCollateralId: invalidNft.id,
    });

    const tx = offer.acceptOffer(SmartContractsInvalidNFT.nftfiLoanOffer, Fixture.borrower, {
      lender: Fixture.lender,
      nonce: 0n,
      expiry: sigExpiry,
      offerType,
    });

    await expect(tx).to.be.revertedWithCustomError(
      SmartContractsInvalidNFT.nftfiLoanOffer,
      'NFTCollateralContractNotPermitted',
    );
  });

  it('not registered nft type should not be possible to be permitted', async function () {
    const badNftTypeERC721 = '999';

    await expect(
      SmartContractsInvalidNFT.permittedNFTs
        .connect(Fixture.nftfiOwner)
        .setNFTPermit(await SmartContractsInvalidNFT.nft.getAddress(), badNftTypeERC721),
    ).to.be.revertedWith('NFT type not registered');
  });

  it('a loan started with an permitted nft and then un-approving the nft should be okay', async function () {
    const unpermitted = '';
    offer.setOffer({
      nftCollateralContract: await SmartContracts.nft.getAddress(),
      nftCollateralId: nft.id,
    });

    const loanTx = await offer.acceptOffer(SmartContractsInvalidNFT.nftfiLoanOffer, Fixture.borrower, {
      lender: Fixture.lender,
      nonce: 0n,
      expiry: sigExpiry,
      offerType,
    });
    await loanTx.wait();

    const unPermitTx = await SmartContracts.permittedNFTs
      .connect(Fixture.nftfiOwner)
      .setNFTPermit(await SmartContracts.nft.getAddress(), unpermitted);

    await unPermitTx.wait();
  });
});
