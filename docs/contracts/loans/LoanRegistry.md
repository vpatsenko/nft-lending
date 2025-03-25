# `LoanRegistry`

Registry for Loan Types supported by NFTfi.

Each Loan type is associated with the address of a Loan contract that implements the loan type.

## Functions:

- `registerLoan(bytes32 _loanType, address _loanContract) (external)`

- `registerLoans(bytes32[] _loanTypes, address[] _loanContracts) (external)`

- `getContractFromType(bytes32 _loanType) (external)`

- `getTypeFromContract(address _loanContract) (external)`

- `_registerLoan(bytes32 _loanType, address _loanContract) (internal)`

## Events:

- `TypeUpdated(bytes32 loanType, address loanContract)`

### Function `registerLoan(bytes32 _loanType, address _loanContract) external`

Set or update the contract address that implements the given Loan Type.

Set address(0) for a loan type for un-register such type.

#### Parameters:

- `_loanType`: - Loan type represented by keccak256('loan type').

- `_loanContract`: - The address of the wrapper contract that implements the loan type's behaviour.

### Function `registerLoans(bytes32[] _loanTypes, address[] _loanContracts) external`

Batch set or update the contract addresses that implement the given batch Loan Type.

Set address(0) for a loan type for un-register such type.

#### Parameters:

- `_loanTypes`: - Loan types represented by keccak256('loan type').

- `_loanContracts`: - The addresses of each wrapper contract that implements the loan type's behaviour.

### Function `getContractFromType(bytes32 _loanType) → address external`

This function can be called by anyone to get the contract address that implements the given loan type.

#### Parameters:

- `_loanType`: - The loan type, e.g. keccak256("DIRECT_LOAN_FIXED"), or keccak256("DIRECT_LOAN_PRO_RATED").

### Function `getTypeFromContract(address _loanContract) → bytes32 external`

This function can be called by anyone to get the loan type of the given contract address.

#### Parameters:

- `_loanContract`: - The loan contract

### Function `_registerLoan(bytes32 _loanType, address _loanContract) internal`

Set or update the contract address that implements the given Loan Type.

Set address(0) for a loan type for un-register such type.

#### Parameters:

- `_loanType`: - Loan type represented by keccak256('loan type').

- `_loanContract`: - The address of the wrapper contract that implements the loan type's behaviour.

### Event `TypeUpdated(bytes32 loanType, address loanContract)`

This event is fired whenever the admins register a loan type.

#### Parameters:

- `loanType`: - Loan type represented by keccak256('loan type').

- `loanContract`: - Address of the loan type contract.
