# `BaseLoan`

Implements base functionalities common to all Loan types.

Mostly related to governance and security.

## Functions:

- `constructor(address _admin) (internal)`

- `pause() (external)`

- `unpause() (external)`

### Function `constructor(address _admin) internal`

Sets the admin of the contract.

#### Parameters:

- `_admin`: - Initial admin of this contract.

### Function `pause() external`

Triggers stopped state.

Requirements:

- Only the owner can call this method.

- The contract must not be paused.

### Function `unpause() external`

Returns to normal state.

Requirements:

- Only the owner can call this method.

- The contract must be paused.
