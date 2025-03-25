# `NftfiHub`

Registry for the contracts supported by NFTfi protocol.

## Functions:

- `constructor(address _admin, string[] _contractKeys, address[] _contractAddresses) (public)`

- `setContract(string _contractKey, address _contractAddress) (external)`

- `setContracts(string[] _contractKeys, address[] _contractAddresses) (external)`

- `getContract(bytes32 _contractKey) (external)`

- `_setContract(string _contractKey, address _contractAddress) (internal)`

- `_setContracts(string[] _contractKeys, address[] _contractAddresses) (internal)`

## Events:

- `ContractUpdated(bytes32 contractKey, address contractAddress)`

### Function `constructor(address _admin, string[] _contractKeys, address[] _contractAddresses) public`

Initializes `contracts` with a batch of permitted contracts

#### Parameters:

- `_admin`: - Initial admin of this contract.

- `_contractKeys`: - Initial contract keys.

- `_contractAddresses`: - Initial associated contract addresses.

### Function `setContract(string _contractKey, address _contractAddress) external`

Set or update the contract address for the given key.

#### Parameters:

- `_contractKey`: - New or existing contract key.

- `_contractAddress`: - The associated contract address.

### Function `setContracts(string[] _contractKeys, address[] _contractAddresses) external`

Set or update the contract addresses for the given keys.

#### Parameters:

- `_contractKeys`: - New or existing contract keys.

- `_contractAddresses`: - The associated contract addresses.

### Function `getContract(bytes32 _contractKey) → address external`

This function can be called by anyone to lookup the contract address associated with the key.

#### Parameters:

- `_contractKey`: - The index to the contract address.

### Function `_setContract(string _contractKey, address _contractAddress) internal`

Set or update the contract address for the given key.

#### Parameters:

- `_contractKey`: - New or existing contract key.

- `_contractAddress`: - The associated contract address.

### Function `_setContracts(string[] _contractKeys, address[] _contractAddresses) internal`

Set or update the contract addresses for the given keys.

#### Parameters:

- `_contractKeys`: - New or existing contract key.

- `_contractAddresses`: - The associated contract address.

### Event `ContractUpdated(bytes32 contractKey, address contractAddress)`

This event is fired whenever the admin registers a contract.

#### Parameters:

- `contractKey`: - Contract key e.g. bytes32('PERMITTED_NFTS').

- `contractAddress`: - Address of the contract.
