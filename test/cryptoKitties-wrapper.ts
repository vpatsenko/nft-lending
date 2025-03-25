import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { deployContracts, NFTfiContracts } from './utils/deploy-contracts';
import { accountFixture, AccountFixture, factorX, fixedLoan } from './utils/fixtures';
import { mintAndApproveERC20, mintAndApproveKitty } from './utils/tokens';
import {
  advanceTime,
  assertBalanceChange,
  currentTime,
  daysToSeconds,
  restoreSnapshot,
  selectEvent,
  takeSnapshot,
  assertKittyOwner,
} from './utils/utils';
import { Offer } from './utils/Offer';

describe('CryptoKittiesWrapper', function () {
  let accounts: SignerWithAddress[]; // Test accounts
  let SC: NFTfiContracts; // Smart Contracts
  let FXT: AccountFixture; // account fixtures
  let snapshot: number;
  let kitty: any;
  let loanId: any;
  const LOAN_FXT = fixedLoan();
  let sigExpiry: bigint;

  const offerType = ethers.encodeBytes32String('ASSET_OFFER_LOAN');
  let offer: Offer;

  before(async () => {
    accounts = await ethers.getSigners();
    FXT = accountFixture(accounts);
    SC = await deployContracts(FXT.nftfiOwner);

    kitty = await mintAndApproveKitty(SC.kitties, FXT.borrower, await SC.escrow.getAddress());
    await mintAndApproveERC20(SC.erc20, FXT.lender, 1000n * factorX, await SC.erc20TransferManager.getAddress());
    await mintAndApproveERC20(SC.erc20, FXT.borrower, 500n * factorX, await SC.erc20TransferManager.getAddress());

    const now = await currentTime();
    sigExpiry = now + daysToSeconds(10n);
  });

  beforeEach(async () => {
    snapshot = await takeSnapshot();

    offer = new Offer({
      loanERC20Denomination: await SC.erc20.getAddress(),
      loanPrincipalAmount: LOAN_FXT.principal,
      isProRata: LOAN_FXT.isProRata,
      maximumRepaymentAmount: LOAN_FXT.repayment,
      nftCollateralContract: await SC.kitties.getAddress(),
      nftCollateralId: kitty.id,
      loanDuration: LOAN_FXT.duration,
      originationFee: 0n,
      liquidityCap: 0n,
      allowedBorrowers: [FXT.borrower.address],
    });
  });

  afterEach(async () => {
    await restoreSnapshot(snapshot);
    snapshot = await takeSnapshot();
  });

  describe('New loan', () => {
    it('should transfer the kitty properly when a new loan begin', async () => {
      await assertKittyOwner(
        'Before beginLoan, the kitty should owned by borrower',
        SC.kitties,
        kitty.id,
        FXT.borrower.address,
      );

      await offer.acceptOffer(SC.nftfiLoanOffer, FXT.borrower, {
        lender: FXT.lender,
        nonce: 0n,
        expiry: sigExpiry,
        offerType,
      });

      await assertKittyOwner(
        'After beginLoan, the kitty should be in escrow with NTFfi',
        SC.kitties,
        kitty.id,
        await SC.escrow.getAddress(),
      );
    });
  });

  describe('Loan repayment', () => {
    beforeEach(async () => {
      const loanTx = await offer.acceptOffer(SC.nftfiLoanOffer, FXT.borrower, {
        lender: FXT.lender,
        nonce: 0n,
        expiry: sigExpiry,
        offerType,
      });

      await loanTx.wait();
      const loanStartedEvent = await selectEvent(loanTx, SC.nftfiLoanOffer, 'LoanStarted');
      loanId = loanStartedEvent?.args?.loanId;
    });

    it('should transfer the kitty properly to the borrower', async () => {
      await assertKittyOwner(
        'Before beginLoan, the kitty should be in escrow with NTFfi',
        SC.kitties,
        kitty.id,
        await SC.escrow.getAddress(),
      );

      const nftfiBalance = await SC.erc20.balanceOf(FXT.nftfiOwner.address);
      const borrowerBalance = await SC.erc20.balanceOf(FXT.borrower.address);
      const lenderBalance = await SC.erc20.balanceOf(FXT.lender.address);

      // REPAY LOAN
      await advanceTime(daysToSeconds(5n));
      const repayTx = await SC.nftfiLoanOffer.connect(FXT.borrower).payBackLoanSafe(loanId);
      const loanRepaidEvent = await selectEvent(repayTx, SC.nftfiLoanOffer, 'LoanRepaid');
      const adminFee = loanRepaidEvent?.args?.adminFee;

      await assertKittyOwner(
        'After payBackLoan, the original borrower should own the nft again!',
        SC.kitties,
        kitty.id,
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

  describe('Overdue Loan liquidation', () => {
    beforeEach(async () => {
      const loanTx = await offer.acceptOffer(SC.nftfiLoanOffer, FXT.borrower, {
        lender: FXT.lender,
        nonce: 0n,
        expiry: sigExpiry,
        offerType,
      });

      await loanTx.wait();
      const loanStartedEvent = await selectEvent(loanTx, SC.nftfiLoanOffer, 'LoanStarted');
      loanId = loanStartedEvent?.args?.loanId;
    });
    it('should transfer the nft properly to the lender', async () => {
      await assertKittyOwner(
        'Before beginLoan, the kitty should be in escrow with NTFfi',
        SC.kitties,
        kitty.id,
        await SC.escrow.getAddress(),
      );

      const nftfiBalance = await SC.erc20.balanceOf(FXT.nftfiOwner.address);
      const borrowerBalanceBefore = await SC.erc20.balanceOf(FXT.borrower.address);
      const lenderBalanceBefore = await SC.erc20.balanceOf(FXT.lender.address);

      // LIQUIDATE LOAN
      await advanceTime(LOAN_FXT.duration + 1n);

      await SC.nftfiLoanOffer.connect(FXT.lender).liquidateOverdueLoan(loanId);

      await assertKittyOwner('After closure, the lender should own the nft', SC.kitties, kitty.id, FXT.lender.address);

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
  });
});
