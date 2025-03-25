# `PermittedAirdrops`

Registry for airdropa supported by NFTfi. Each Airdrop is associated with a boolean permit.

## Functions:

- `constructor(address _admin, address[] _airdopContracts, bytes4[] _selectors) (public)`

- `setAirdroptPermit(address _airdropContract, bytes4 _selector, bool _permit) (external)`

- `setAirdroptPermits(address[] _airdropContracts, bytes4[] _selectors, bool[] _permits) (external)`

- `isValidAirdrop(bytes _addressSel) (external)`

- `_setAirdroptPermit(address _airdropContract, bytes4 _selector, bool _permit) (internal)`

## Events:

- `AirdropPermit(address airdropContract, bytes4 selector, bool isPermitted)`

### Function `constructor(address _admin, address[] _airdopContracts, bytes4[] _selectors) public`

Initialize `airdropPermits` with a batch of permitted airdops

#### Parameters:

- `_admin`: - Initial admin of this contract.

- `_airdopContracts`: - The batch of airdrop contract addresses initially permitted.

- `_selectors`: - The batch of selector of the permitted functions for each `_airdopContracts`.

### Function `setAirdroptPermit(address _airdropContract, bytes4 _selector, bool _permit) external`

This function can be called by admins to change the permitted status of an airdrop. This includes

both adding an airdrop to the permitted list and removing it.

#### Parameters:

- `_airdropContract`: - The address of airdrop contract whose permit list status changed.

- `_selector`: - The selector of the permitted function whose permit list status changed.

- `_permit`: - The new status of whether the airdrop is permitted or not.

### Function `setAirdroptPermits(address[] _airdropContracts, bytes4[] _selectors, bool[] _permits) external`

This function can be called by admins to change the permitted status of a batch of airdrops. This

includes both adding an airdop to the permitted list and removing it.

#### Parameters:

- `_airdropContracts`: - The addresses of the airdrop contracts whose permit list status changed.

- `_selectors`: - the selector of the permitted functions for each airdop whose permit list status changed.

- `_permits`: - The new statuses of whether the airdrop is permitted or not.

### Function `isValidAirdrop(bytes _addressSel) → bool external`

This function can be called by anyone to get the permit associated with the airdrop.

#### Parameters:

- `_addressSel`: - The address of the airdrop contract + function selector.

#### Return Values:

- Returns whether the airdrop is permitted

### Function `_setAirdroptPermit(address _airdropContract, bytes4 _selector, bool _permit) internal`

This function can be called by admins to change the permitted status of an airdrop. This includes

both adding an airdrop to the permitted list and removing it.

#### Parameters:

- `_airdropContract`: - The address of airdrop contract whose permit list status changed.

- `_selector`: - The selector of the permitted function whose permit list status changed.

- `_permit`: - The new status of whether the airdrop is permitted or not.

### Event `AirdropPermit(address airdropContract, bytes4 selector, bool isPermitted)`

This event is fired whenever the admin sets a ERC20 permit.

#### Parameters:

- `airdropContract`: - Address of the airdrop contract.

- `selector`: - The selector of the permitted function in the `airdropContract`.

- `isPermitted`: - Signals airdrop permit.
