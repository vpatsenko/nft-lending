# `DirectLoanBaseBundle`

some bundle related funcions

## Functions:

- `payBackLoanDecomposeBundle(uint32 _loanId) (external)`

- `_resolveLoanDecomposeBundle(uint32 _loanId, address _nftReceiver, struct LoanData.LoanTerms _loanTerms, contract IDirectLoanCoordinator _loanCoordinator) (internal)`

### Function `payBackLoanDecomposeBundle(uint32 _loanId) external`

This function is called by a anyone to repay a loan. It can be called at any time after the loan has

begun and before loan expiry.. The caller will pay a pro-rata portion of their interest if the loan is paid off

early and the loan is pro-rated type, but the complete repayment amount if it is fixed type.

The the borrower (current owner of the obligation note) will get the collaterl NFT back.

This function is purposefully not pausable in order to prevent an attack where the contract admin's pause the

contract and hold hostage the NFT's that are still within it.

#### Parameters:

- `_loanId`: A unique identifier for this particular loan, sourced from the Loan Coordinator.

### Function `_resolveLoanDecomposeBundle(uint32 _loanId, address _nftReceiver, struct LoanData.LoanTerms _loanTerms, contract IDirectLoanCoordinator _loanCoordinator) internal`

A convenience function with shared functionality between `payBackLoan` and `liquidateOverdueLoan`.

#### Parameters:

- `_loanId`: A unique identifier for this particular loan, sourced from the Loan Coordinator.

- `_nftReceiver`: - The receiver of the collateral nft. The borrower when `payBackLoan` or the lender when

`liquidateOverdueLoan`.

- `_loanTerms`: - The main Loan Terms struct. This data is saved upon loan creation on loanIdToLoan.

- `_loanCoordinator`: - The loan coordinator used when creating the loan.
