# `Timelock`

Executes proposals after a delay

## Modifiers:

- `onlyAdmin()`

- `onlyTimelock()`

## Functions:

- `constructor(address _admin, uint256 _delay) (public)`

- `receive() (external)`

- `setDelay(uint256 _delay) (public)`

- `acceptAdmin() (public)`

- `setPendingAdmin(address _pendingAdmin) (public)`

- `queueTransaction(address _target, uint256 _value, string _signature, bytes _data, uint256 _eta) (public)`

- `cancelTransaction(address _target, uint256 _value, string _signature, bytes _data, uint256 _eta) (public)`

- `executeTransaction(address _target, uint256 _value, string _signature, bytes _data, uint256 _eta) (public)`

- `getBlockTimestamp() (internal)`

## Events:

- `NewAdmin(address newAdmin)`

- `NewPendingAdmin(address newPendingAdmin)`

- `NewDelay(uint256 newDelay)`

- `CancelTransaction(bytes32 txHash, address target, uint256 value, string signature, bytes data, uint256 eta)`

- `ExecuteTransaction(bytes32 txHash, address target, uint256 value, string signature, bytes data, uint256 eta)`

- `QueueTransaction(bytes32 txHash, address target, uint256 value, string signature, bytes data, uint256 eta)`

### Modifier `onlyAdmin()`

### Modifier `onlyTimelock()`

### Function `constructor(address _admin, uint256 _delay) public`

#### Parameters:

- `_admin`: Admin account, generally should be set to deployer address (or other external)

and the transferred to Proposals/GovernorAplha contract

- `_delay`: Minimum amount of time a tx has to stay in queue before it gets accepted

### Function `receive() external`

Receive function to handle plain Ether transfers

### Function `setDelay(uint256 _delay) public`

Enables setting delay trough proposal

#### Parameters:

- `_delay`: New minimum amount of time a tx has to stay in queue before it gets accepted (unix timestamp)

### Function `acceptAdmin() public`

Lets a new pending admin accept the admin rights

### Function `setPendingAdmin(address _pendingAdmin) public`

Enables setting a new pending admin trough proposal

#### Parameters:

- `_pendingAdmin`: new admin address

### Function `queueTransaction(address _target, uint256 _value, string _signature, bytes _data, uint256 _eta) → bytes32 public`

Queues a successfully voted proposal for execution, it stays queue-d until it is

either executed after the delay or cancelled

#### Parameters:

- `_target`: address of the contract the proposal is targeting

- `_value`: ETH value sent with the proposal call

- `_signature`: function signature to be called, optional, can be omitted by passing empty string

- `_data`: calldata to be passed to the call

if signature is present, it is only the parameter data in hex

if signatures are omitted it is the full calldata

- `_eta`: estimated time of arrival of a proposal, proposal cannot be executed before this timestamp

### Function `cancelTransaction(address _target, uint256 _value, string _signature, bytes _data, uint256 _eta) public`

Cancels queued proposal

#### Parameters:

- `_target`: address of the contract the proposal is targeting

- `_value`: ETH value sent with the proposal call

- `_signature`: function signature to be called, optional, can be omitted by passing empty string

- `_data`: calldata to be passed to the call

if signature is present, it is only the parameter data in hex

if signatures are omitted it is the full calldata

- `_eta`: estimated time of arrival of a proposal, proposal cannot be executed before this timestamp

### Function `executeTransaction(address _target, uint256 _value, string _signature, bytes _data, uint256 _eta) public`

Executes queued proposal

#### Parameters:

- `_target`: address of the contract the proposal is targeting

- `_value`: ETH value sent with the proposal call

- `_signature`: function signature to be called, optional, can be omitted by passing empty string

- `_data`: calldata to be passed to the call

if signature is present, it is only the parameter data in hex

if signatures are omitted it is the full calldata

- `_eta`: estimated time of arrival of a proposal, proposal cannot be executed before this timestamp

### Function `getBlockTimestamp() → uint256 internal`

Helper function to get timestamp

### Event `NewAdmin(address newAdmin)`

### Event `NewPendingAdmin(address newPendingAdmin)`

### Event `NewDelay(uint256 newDelay)`

### Event `CancelTransaction(bytes32 txHash, address target, uint256 value, string signature, bytes data, uint256 eta)`

### Event `ExecuteTransaction(bytes32 txHash, address target, uint256 value, string signature, bytes data, uint256 eta)`

### Event `QueueTransaction(bytes32 txHash, address target, uint256 value, string signature, bytes data, uint256 eta)`
