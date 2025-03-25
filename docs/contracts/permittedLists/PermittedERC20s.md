# `PermittedERC20s`

Registry for ERC20 currencies supported by NFTfi. Each ERC20 is

associated with a boolean permit.

## Functions:

- `constructor(address _admin, address[] _permittedErc20s) (public)`

- `setERC20Permit(address _erc20, bool _permit) (external)`

- `setERC20Permits(address[] _erc20s, bool[] _permits) (external)`

- `getERC20Permit(address _erc20) (external)`

- `_setERC20Permit(address _erc20, bool _permit) (internal)`

## Events:

- `ERC20Permit(address erc20Contract, bool isPermitted)`

### Function `constructor(address _admin, address[] _permittedErc20s) public`

Initialize `erc20Permits` with a batch of permitted ERC20s

#### Parameters:

- `_admin`: - Initial admin of this contract.

- `_permittedErc20s`: - The batch of addresses initially permitted.

### Function `setERC20Permit(address _erc20, bool _permit) external`

This function can be called by admins to change the permitted status of an ERC20 currency. This includes

both adding an ERC20 currency to the permitted list and removing it.

#### Parameters:

- `_erc20`: - The address of the ERC20 currency whose permit list status changed.

- `_permit`: - The new status of whether the currency is permitted or not.

### Function `setERC20Permits(address[] _erc20s, bool[] _permits) external`

This function can be called by admins to change the permitted status of a batch of ERC20 currency. This

includes both adding an ERC20 currency to the permitted list and removing it.

#### Parameters:

- `_erc20s`: - The addresses of the ERC20 currencies whose permit list status changed.

- `_permits`: - The new statuses of whether the currency is permitted or not.

### Function `getERC20Permit(address _erc20) → bool external`

This function can be called by anyone to get the permit associated with the erc20 contract.

#### Parameters:

- `_erc20`: - The address of the erc20 contract.

#### Return Values:

- Returns whether the erc20 is permitted

### Function `_setERC20Permit(address _erc20, bool _permit) internal`

This function can be called by admins to change the permitted status of an ERC20 currency. This includes

both adding an ERC20 currency to the permitted list and removing it.

#### Parameters:

- `_erc20`: - The address of the ERC20 currency whose permit list status changed.

- `_permit`: - The new status of whether the currency is permitted or not.

### Event `ERC20Permit(address erc20Contract, bool isPermitted)`

This event is fired whenever the admin sets a ERC20 permit.

#### Parameters:

- `erc20Contract`: - Address of the ERC20 contract.

- `isPermitted`: - Signals ERC20 permit.
