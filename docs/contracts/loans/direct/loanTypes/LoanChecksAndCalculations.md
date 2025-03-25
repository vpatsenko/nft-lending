# `LoanChecksAndCalculations`

Helper library for LoanBase

## Functions:

- `payBackChecks(uint32 _loanId, contract INftfiHub _hub) (external)`

- `checkLoanIdValidity(uint32 _loanId, contract INftfiHub _hub) (public)`

- `getRevenueSharePercent(address _revenueSharePartner, contract INftfiHub _hub) (external)`

- `renegotiationChecks(struct LoanData.LoanTerms _loan, uint32 _loanId, uint32 _newLoanDuration, uint256 _newMaximumRepaymentAmount, uint256 _lenderNonce, contract INftfiHub _hub) (external)`

- `computeRevenueShare(uint256 _adminFee, uint256 _revenueShareInBasisPoints) (external)`

- `computeAdminFee(uint256 _interestDue, uint256 _adminFeeInBasisPoints) (external)`

- `computeReferralFee(uint256 _loanPrincipalAmount, uint256 _referralFeeInBasisPoints, address _referrer) (external)`

### Function `payBackChecks(uint32 _loanId, contract INftfiHub _hub) external`

Function that performs some validation checks before trying to repay a loan

#### Parameters:

- `_loanId`: - The id of the loan being repaid

### Function `checkLoanIdValidity(uint32 _loanId, contract INftfiHub _hub) public`

### Function `getRevenueSharePercent(address _revenueSharePartner, contract INftfiHub _hub) → uint16 external`

Function that the partner is permitted and returns its shared percent.

#### Parameters:

- `_revenueSharePartner`: - Partner's address

#### Return Values:

- The revenue share percent for the partner.

### Function `renegotiationChecks(struct LoanData.LoanTerms _loan, uint32 _loanId, uint32 _newLoanDuration, uint256 _newMaximumRepaymentAmount, uint256 _lenderNonce, contract INftfiHub _hub) → address, address external`

Performs some validation checks before trying to renegotiate a loan.

Needed to avoid stack too deep.

#### Parameters:

- `_loan`: - The main Loan Terms struct.

- `_loanId`: - The unique identifier for the loan to be renegotiated

- `_newLoanDuration`: - The new amount of time (measured in seconds) that can elapse before the lender can

liquidate the loan and seize the underlying collateral NFT.

- `_newMaximumRepaymentAmount`: - The new maximum amount of money that the borrower would be required to

retrieve their collateral, measured in the smallest units of the ERC20 currency used for the loan. The

borrower will always have to pay this amount to retrieve their collateral, regardless of whether they repay

early.

- `_lenderNonce`: - The nonce referred to here is not the same as an Ethereum account's nonce. We are

referring instead to nonces that are used by both the lender and the borrower when they are first signing

off-chain NFTfi orders. These nonces can be any uint256 value that the user has not previously used to sign an

off-chain order. Each nonce can be used at most once per user within NFTfi, regardless of whether they are the

lender or the borrower in that situation. This serves two purposes:

- First, it prevents replay attacks where an attacker would submit a user's off-chain order more than once.

- Second, it allows a user to cancel an off-chain order by calling NFTfi.cancelLoanCommitmentBeforeLoanHasBegun()

  , which marks the nonce as used and prevents any future loan from using the user's off-chain order that contains

that nonce.

#### Return Values:

- Borrower and Lender addresses

### Function `computeRevenueShare(uint256 _adminFee, uint256 _revenueShareInBasisPoints) → uint256 external`

A convenience function computing the revenue share taken from the admin fee to transferr to the permitted

partner.

#### Parameters:

- `_adminFee`: - The quantity of ERC20 currency (measured in smalled units of that ERC20 currency) that is due

as an admin fee.

- `_revenueShareInBasisPoints`: - The percent (measured in basis points) of the admin fee amount that will be

taken as a revenue share for a the partner, at the moment the loan is begun.

#### Return Values:

- The quantity of ERC20 currency (measured in smalled units of that ERC20 currency) that should be sent to

the `revenueSharePartner`.

### Function `computeAdminFee(uint256 _interestDue, uint256 _adminFeeInBasisPoints) → uint256 external`

A convenience function computing the adminFee taken from a specified quantity of interest.

#### Parameters:

- `_interestDue`: - The amount of interest due, measured in the smallest quantity of the ERC20 currency being

used to pay the interest.

- `_adminFeeInBasisPoints`: - The percent (measured in basis points) of the interest earned that will be taken

as a fee by the contract admins when the loan is repaid. The fee is stored in the loan struct to prevent an

attack where the contract admins could adjust the fee right before a loan is repaid, and take all of the interest

earned.

#### Return Values:

- The quantity of ERC20 currency (measured in smalled units of that ERC20 currency) that is due as an admin

fee.

### Function `computeReferralFee(uint256 _loanPrincipalAmount, uint256 _referralFeeInBasisPoints, address _referrer) → uint256 external`

A convenience function computing the referral fee taken from the loan principal amount to transferr to

the referrer.

#### Parameters:

- `_loanPrincipalAmount`: - The original sum of money transferred from lender to borrower at the beginning of

the loan, measured in loanERC20Denomination's smallest units.

- `_referralFeeInBasisPoints`: - The percent (measured in basis points) of the loan principal amount that will

be taken as a fee to pay to the referrer, 0 if the lender is not paying referral fee.

- `_referrer`: - The address of the referrer who found the lender matching the listing, Zero address to signal

that there is no referrer.

#### Return Values:

- The quantity of ERC20 currency (measured in smalled units of that ERC20 currency) that should be sent to

the referrer.
