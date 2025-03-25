# `DirectLoanCoordinator`

This contract is in charge of coordinating the creation, disctubution and desctruction of the SmartNfts

related to a loan, the Promossory Note and Obligaiton Receipt.

## Modifiers:

- `onlyInitialized()`

## Functions:

- `constructor(address _nftfiHub, address _admin, string[] _loanTypes, address[] _loanContracts) (public)`

- `initialize(address _promissoryNoteToken, address _obligationReceiptToken) (external)`

- `registerLoan(address _lender, bytes32 _loanType) (external)`

- `mintObligationReceipt(uint32 _loanId, address _borrower) (external)`

- `resolveLoan(uint32 _loanId) (external)`

- `getLoanData(uint32 _loanId) (external)`

- `isValidLoanId(uint32 _loanId, address _loanContract) (external)`

- `registerLoanType(string _loanType, address _loanContract) (external)`

- `registerLoanTypes(string[] _loanTypes, address[] _loanContracts) (external)`

- `getContractFromType(bytes32 _loanType) (public)`

- `getTypeFromContract(address _loanContract) (public)`

- `_registerLoanType(string _loanType, address _loanContract) (internal)`

- `_registerLoanTypes(string[] _loanTypes, address[] _loanContracts) (internal)`

## Events:

- `UpdateStatus(uint32 loanId, uint64 smartNftId, address loanContract, enum IDirectLoanCoordinator.StatusType newStatus)`

- `TypeUpdated(bytes32 loanType, address loanContract)`

### Modifier `onlyInitialized()`

Function using this modifier can only be executed after this contract is initialized

### Function `constructor(address _nftfiHub, address _admin, string[] _loanTypes, address[] _loanContracts) public`

Sets the admin of the contract.

Initializes `contractTypes` with a batch of loan types. Sets `NftfiHub`.

#### Parameters:

- `_nftfiHub`: - Address of the NftfiHub contract

- `_admin`: - Initial admin of this contract.

- `_loanTypes`: - Loan types represented by keccak256('loan type').

- `_loanContracts`: - The addresses of each wrapper contract that implements the loan type's behaviour.

### Function `initialize(address _promissoryNoteToken, address _obligationReceiptToken) external`

Sets `promissoryNoteToken` and `obligationReceiptToken`.

It can be executed once by the deployer.

#### Parameters:

- `_promissoryNoteToken`: - Promissory Note Token address

- `_obligationReceiptToken`: - Obligaiton Recipt Token address

### Function `registerLoan(address _lender, bytes32 _loanType) → uint32 external`

This is called by the LoanType beginning the new loan.

It initialize the new loan data, mints both PromissoryNote and ObligationReceipt SmartNft's and returns the

new loan id.

#### Parameters:

- `_lender`: - Address of the lender

- `_loanType`: - The type of the loan

### Function `mintObligationReceipt(uint32 _loanId, address _borrower) external`

### Function `resolveLoan(uint32 _loanId) external`

This is called by the LoanType who created the loan, when a loan is resolved whether by paying back or

liquidating the loan.

It sets the loan as `RESOLVED` and burns both PromossoryNote and ObligationReceipt SmartNft's.

#### Parameters:

- `_loanId`: - Id of the loan

### Function `getLoanData(uint32 _loanId) → struct IDirectLoanCoordinator.Loan external`

Returns loan's data for a given id.

#### Parameters:

- `_loanId`: - Id of the loan

### Function `isValidLoanId(uint32 _loanId, address _loanContract) → bool validity external`

checks if the given id is valid for the given loan contract address

#### Parameters:

- `_loanId`: - Id of the loan

- `_loanContract`: - address og the loan contract

### Function `registerLoanType(string _loanType, address _loanContract) external`

Set or update the contract address that implements the given Loan Type.

Set address(0) for a loan type for un-register such type.

#### Parameters:

- `_loanType`: - Loan type represented by 'loan type'.

- `_loanContract`: - The address of the wrapper contract that implements the loan type's behaviour.

### Function `registerLoanTypes(string[] _loanTypes, address[] _loanContracts) external`

Batch set or update the contract addresses that implement the given batch Loan Type.

Set address(0) for a loan type for un-register such type.

#### Parameters:

- `_loanTypes`: - Loan types represented by 'loan type'.

- `_loanContracts`: - The addresses of each wrapper contract that implements the loan type's behaviour.

### Function `getContractFromType(bytes32 _loanType) → address public`

This function can be called by anyone to get the contract address that implements the given loan type.

#### Parameters:

- `_loanType`: - The loan type, e.g. bytes32("DIRECT_LOAN_FIXED"), or bytes32("DIRECT_LOAN_PRO_RATED").

### Function `getTypeFromContract(address _loanContract) → bytes32 public`

This function can be called by anyone to get the loan type of the given contract address.

#### Parameters:

- `_loanContract`: - The loan contract

### Function `_registerLoanType(string _loanType, address _loanContract) internal`

Set or update the contract address that implements the given Loan Type.

Set address(0) for a loan type for un-register such type.

#### Parameters:

- `_loanType`: - Loan type represented by 'loan type').

- `_loanContract`: - The address of the wrapper contract that implements the loan type's behaviour.

### Function `_registerLoanTypes(string[] _loanTypes, address[] _loanContracts) internal`

Batch set or update the contract addresses that implement the given batch Loan Type.

Set address(0) for a loan type for un-register such type.

#### Parameters:

- `_loanTypes`: - Loan types represented by keccak256('loan type').

- `_loanContracts`: - The addresses of each wrapper contract that implements the loan type's behaviour.

### Event `UpdateStatus(uint32 loanId, uint64 smartNftId, address loanContract, enum IDirectLoanCoordinator.StatusType newStatus)`

### Event `TypeUpdated(bytes32 loanType, address loanContract)`

This event is fired whenever the admins register a loan type.

#### Parameters:

- `loanType`: - Loan type represented by keccak256('loan type').

- `loanContract`: - Address of the loan type contract.
