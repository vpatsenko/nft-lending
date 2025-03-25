# `ITimelock`

Interface of the Timelock contract, which handles proposal delays and execution in practice

## Functions:

- `acceptAdmin() (external)`

- `queueTransaction(address _target, uint256 _value, string _signature, bytes _data, uint256 _eta) (external)`

- `cancelTransaction(address _target, uint256 _value, string _signature, bytes _data, uint256 _eta) (external)`

- `executeTransaction(address _target, uint256 _value, string _signature, bytes _data, uint256 _eta) (external)`

- `delay() (external)`

- `GRACE_PERIOD() (external)`

- `queuedTransactions(bytes32 hash) (external)`

### Function `acceptAdmin() external`

Lets a new pending admin accept the admin rights

### Function `queueTransaction(address _target, uint256 _value, string _signature, bytes _data, uint256 _eta) → bytes32 external`

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

### Function `cancelTransaction(address _target, uint256 _value, string _signature, bytes _data, uint256 _eta) external`

Cancels queued proposal

#### Parameters:

- `_target`: address of the contract the proposal is targeting

- `_value`: ETH value sent with the proposal call

- `_signature`: function signature to be called, optional, can be omitted by passing empty string

- `_data`: calldata to be passed to the call

if signature is present, it is only the parameter data in hex

if signatures are omitted it is the full calldata

- `_eta`: estimated time of arrival of a proposal, proposal cannot be executed before this timestamp

### Function `executeTransaction(address _target, uint256 _value, string _signature, bytes _data, uint256 _eta) external`

Executes queued proposal

#### Parameters:

- `_target`: address of the contract the proposal is targeting

- `_value`: ETH value sent with the proposal call

- `_signature`: function signature to be called, optional, can be omitted by passing empty string

- `_data`: calldata to be passed to the call

if signature is present, it is only the parameter data in hex

if signatures are omitted it is the full calldata

- `_eta`: estimated time of arrival of a proposal, proposal cannot be executed before this timestamp

### Function `delay() → uint256 external`

Minimum amount of time a tx has to stay in queue before it gets accepted (unix timestamp)

### Function `GRACE_PERIOD() → uint256 external`

Maximum amount of time a transaction can be queued without

execution before it becomes stale and cannot be executed anymore

### Function `queuedTransactions(bytes32 hash) → bool external`

tx hash key => is queued
