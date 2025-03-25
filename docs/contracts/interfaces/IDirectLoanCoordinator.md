# `IDirectLoanCoordinator`

DirectLoanCoordinator interface.

## Functions:

- `registerLoan(address _lender, bytes32 _loanType) (external)`

- `mintObligationReceipt(uint32 _loanId, address _borrower) (external)`

- `resolveLoan(uint32 _loanId) (external)`

- `promissoryNoteToken() (external)`

- `obligationReceiptToken() (external)`

- `getLoanData(uint32 _loanId) (external)`

- `isValidLoanId(uint32 _loanId, address _loanContract) (external)`

### Function `registerLoan(address _lender, bytes32 _loanType) → uint32 external`

### Function `mintObligationReceipt(uint32 _loanId, address _borrower) external`

### Function `resolveLoan(uint32 _loanId) external`

### Function `promissoryNoteToken() → address external`

### Function `obligationReceiptToken() → address external`

### Function `getLoanData(uint32 _loanId) → struct IDirectLoanCoordinator.Loan external`

### Function `isValidLoanId(uint32 _loanId, address _loanContract) → bool external`
