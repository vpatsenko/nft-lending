# `QuorumVoting`

Quorum voting strategy implementing the IVoting interface to be used in the Proposals contract

Uses token balances to define voting rights

## Functions:

- `quorumVotes() (public)`

- `proposalThreshold() (public)`

- `constructor(address _token, address _proposalsContract) (public)`

- `canPropose(address _proposer) (external)`

- `getMajorityResult(uint256 _proposalId) (external)`

- `castVote(uint256 _proposalId, bool _support) (public)`

- `castVoteBySig(uint256 _proposalId, bool _support, uint8 _v, bytes32 _r, bytes32 _s) (public)`

- `getReceipt(uint256 _proposalId, address _voter) (public)`

- `_castVote(address _voter, uint256 _proposalId, bool _support) (internal)`

- `getChainId() (internal)`

## Events:

- `VoteCast(address voter, uint256 proposalId, bool support, uint256 votes)`

### Function `quorumVotes() → uint256 public`

### Function `proposalThreshold() → uint256 public`

### Function `constructor(address _token, address _proposalsContract) public`

#### Parameters:

- `_token`: Address of the token contract used for voting power

- `_proposalsContract`: Address of the proposals contract

### Function `canPropose(address _proposer) → bool external`

Returns if an address has proposing power

#### Parameters:

- `_proposer`: Address to be checked

#### Return Values:

- Has proposing power or not

### Function `getMajorityResult(uint256 _proposalId) → bool external`

Retunrs the result of the vote, the Proposals contract will query on decision of a proposal

#### Parameters:

- `_proposalId`: Local id of the proposal

#### Return Values:

- Result of the vote (true if above threshold and more for than against)

### Function `castVote(uint256 _proposalId, bool _support) public`

Function for the voters to vote for a given porposal

#### Parameters:

- `_proposalId`: Local id of the proposal

- `_support`: If the voter supprost the given proposal or not

### Function `castVoteBySig(uint256 _proposalId, bool _support, uint8 _v, bytes32 _r, bytes32 _s) public`

Function for the voters to vote for a given porposal with an ECDSA signature

#### Parameters:

- `_proposalId`: Local id of the proposal

- `_support`: If the voter supprost the given proposal or not

- `_v`: ECDSA parameter v

- `_r`: ECDSA parameter r

- `_s`: ECDSA parameter s

### Function `getReceipt(uint256 _proposalId, address _voter) → struct QuorumVoting.Receipt public`

Gets voting receipts stored on-chain

#### Parameters:

- `_proposalId`: Local id of the proposal

- `_voter`: Address of the voter

#### Return Values:

- Voting receipt containing if voter has voted and their decision

### Function `_castVote(address _voter, uint256 _proposalId, bool _support) internal`

Internal function for the voters to vote for a given porposal

#### Parameters:

- `_voter`: voter address

- `_proposalId`: Local id of the proposal

- `_support`: If the voter supprost the given proposal or not

### Function `getChainId() → uint256 internal`

Chain id for the ECDSA signature voting

### Event `VoteCast(address voter, uint256 proposalId, bool support, uint256 votes)`
