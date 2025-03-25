# `Proposals`

Contract to create handle the governance proposals

## Functions:

- `proposalMaxOperations() (public)`

- `votingDelay() (public)`

- `votingPeriod() (public)`

- `constructor(address _admin, address _timelock) (public)`

- `getProposals(uint256 _proposalId) (external)`

- `propose(address[] _targets, uint256[] _values, string[] _signatures, bytes[] _calldatas, bytes32 _votingId, string _description) (public)`

- `queue(uint256 _proposalId) (public)`

- `execute(uint256 _proposalId) (public)`

- `cancel(uint256 _proposalId) (public)`

- `addVoting(bytes32 _id, address _voting) (public)`

- `setGovernableEndpoint(address _endpointAddress, bytes32 _votingId, bool _canGovern) (public)`

- `__acceptTimelockAdmin() (public)`

- `__queueSetTimelockPendingAdmin(address _newPendingAdmin, uint256 _eta) (public)`

- `__executeSetTimelockPendingAdmin(address _newPendingAdmin, uint256 _eta) (public)`

- `getResult(uint256 _proposalId) (public)`

- `getActions(uint256 _proposalId) (public)`

- `state(uint256 _proposalId) (public)`

- `_queueOrRevert(address _target, uint256 _value, string _signature, bytes _data, uint256 _eta) (internal)`

## Events:

- `ProposalCreated(uint256 id, address proposer, address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, uint256 startBlock, uint256 endBlock, string description)`

- `ProposalCanceled(uint256 id)`

- `ProposalQueued(uint256 id, uint256 eta)`

- `ProposalExecuted(uint256 id)`

- `NewVoting(bytes32 id, address voting)`

- `GovernableEndpointModified(address endpointAddress, bytes32 votingId, bool canGovern)`

### Function `proposalMaxOperations() → uint256 public`

### Function `votingDelay() → uint256 public`

### Function `votingPeriod() → uint256 public`

### Function `constructor(address _admin, address _timelock) public`

#### Parameters:

- `_admin`: - Initial admin of this contract.

- `_timelock`: Address of the timelock contract

### Function `getProposals(uint256 _proposalId) → struct IProposals.Proposal external`

#### Parameters:

- `_proposalId`: Unique id of the proposal

#### Return Values:

- proposal data

### Function `propose(address[] _targets, uint256[] _values, string[] _signatures, bytes[] _calldatas, bytes32 _votingId, string _description) → uint256 public`

#### Parameters:

- `_signatures`: The ordered list of function signatures to

be called, optional, can be omitted by passing empty string

- `_calldatas`: The ordered list of calldata to be passed to each call

if signature is present, it should be only the parameter data in hex

if signatures are omitted it should be the full calldata

### Function `queue(uint256 _proposalId) public`

Queues a successfully voted proposal for execution, it stays queue-d until it is

either executed after the delay or cancelled

#### Parameters:

- `_proposalId`: Unique id of the proposal

### Function `execute(uint256 _proposalId) public`

Initiation of proposal execution that actually will happen on the Timestamp contract

#### Parameters:

- `_proposalId`: Unique id of the proposal

### Function `cancel(uint256 _proposalId) public`

Can Cancel a proposal if it is not executed yet and the original poroposer has lost their proposing power

#### Parameters:

- `_proposalId`: Unique id of the proposal

### Function `addVoting(bytes32 _id, address _voting) public`

Adds or removes a voting strategy, we can remove one by setting \_voting to address(0)

#### Parameters:

- `_id`: Unique id of the voting strategy

- `_voting`: Address of the voting startegy contract implementing IVoting

### Function `setGovernableEndpoint(address _endpointAddress, bytes32 _votingId, bool _canGovern) public`

Saves a flag for each governable endpoints by voting strategies to determine if the given

strategy can be used to make a proposal to the endpoint

#### Parameters:

- `_endpointAddress`: Address of the governable endpoint

- `_votingId`: Unique id of the voting strategy

- `_canGovern`: Unique id of the voting strategy

### Function `__acceptTimelockAdmin() public`

used to initiate this contract as the timelock admin, after the timelock contract received

a proposal for transferring (pending) admin rights to this contract from deployer

### Function `__queueSetTimelockPendingAdmin(address _newPendingAdmin, uint256 _eta) public`

queues a proposal to renounce and transfer Timelock admin rights

#### Parameters:

- `_newPendingAdmin`: new admin account (preferably another GovernorAlpha/Proposals

contract if we want the goverance to work)

- `_eta`: estimated time of arrival of a proposal, proposal cannot be executed before this timestamp

### Function `__executeSetTimelockPendingAdmin(address _newPendingAdmin, uint256 _eta) public`

executes a proposal to renounce and transfer Timelock admin rights

#### Parameters:

- `_newPendingAdmin`: new admin account (preferably another GovernorAlpha/Proposals

contract if we want the goverance to work)

- `_eta`: estimated time of arrival of a proposal, proposal cannot be executed before this timestamp

### Function `getResult(uint256 _proposalId) → bool public`

#### Parameters:

- `_proposalId`: Unique id of the proposal

#### Return Values:

- voting result (passed/failed)

### Function `getActions(uint256 _proposalId) → address[] targets, uint256[] values, string[] signatures, bytes[] calldatas public`

#### Parameters:

- `_proposalId`: Unique id of the proposal

#### Return Values:

- targets - ordered list of addresses of the contract the proposal is targeting

- values - ordered list of ETH values sent with the proposal calls

- signatures - ordered list of function signatures to be called, optional,

can be omitted by passing empty string

- calldatas - ordered list of calldatas to be passed to the calls

if signature is present, it is only the parameter data in hex

if signatures are omitted it is the full calldata

### Function `state(uint256 _proposalId) → enum IProposals.ProposalState public`

dynamically calculates proposal state based on the its state parameters

#### Parameters:

- `_proposalId`: Unique id of the proposal

#### Return Values:

- state of the proposal expressed in the ProposalState enum

### Function `_queueOrRevert(address _target, uint256 _value, string _signature, bytes _data, uint256 _eta) internal`

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

### Event `ProposalCreated(uint256 id, address proposer, address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, uint256 startBlock, uint256 endBlock, string description)`

### Event `ProposalCanceled(uint256 id)`

### Event `ProposalQueued(uint256 id, uint256 eta)`

### Event `ProposalExecuted(uint256 id)`

### Event `NewVoting(bytes32 id, address voting)`

### Event `GovernableEndpointModified(address endpointAddress, bytes32 votingId, bool canGovern)`
