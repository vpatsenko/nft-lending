# `MultisigVoting`

Multisig voting strategy implementing the IVoting interface to be used in the Proposals contract

## Functions:

- `constructor(address _admin, address _proposalsContract, address[] _voters, address[] _proposers, uint256 _voteThreshold) (public)`

- `canPropose(address _proposer) (external)`

- `getMajorityResult(uint256 _proposalId) (external)`

- `castVote(uint256 _proposalId, bool _support) (public)`

- `addVoters(address[] _voters) (public)`

- `addVoter(address _voter) (public)`

- `removeVoter(address _voter) (public)`

- `setProposers(address[] _proposers, bool _canPropose) (public)`

- `setProposer(address _proposer, bool _canPropose) (public)`

- `setVoteThreshold(uint256 _voteThreshold) (public)`

- `getReceipt(uint256 _proposalId, address _voter) (public)`

## Events:

- `VoteCast(address voter, uint256 proposalId, bool support)`

### Function `constructor(address _admin, address _proposalsContract, address[] _voters, address[] _proposers, uint256 _voteThreshold) public`

#### Parameters:

- `_admin`: - Initial admin of this contract.

- `_proposalsContract`: Address of the proposals contract

- `_voters`: List of addresses of the voters

- `_proposers`: List of addresses of the proposers

- `_voteThreshold`: The number of votes in support of a proposal required in order for a vote to succeed

### Function `canPropose(address _proposer) → bool external`

Returns if an address has proposing rights

#### Parameters:

- `_proposer`: Address to be checked

#### Return Values:

- Has proposing rights or not

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

### Function `addVoters(address[] _voters) public`

Adds multiple voters to the contract at a time

#### Parameters:

- `_voters`: List of addresses of the voters to be added

### Function `addVoter(address _voter) public`

Adds a new voter address to the contract

#### Parameters:

- `_voter`: Address of the voter to be added

### Function `removeVoter(address _voter) public`

Removes a voter address from the contract

#### Parameters:

- `_voter`: address of the voter to be removed

### Function `setProposers(address[] _proposers, bool _canPropose) public`

Enables or disables a list of voter addresses to propose

#### Parameters:

- `_proposers`: List of proposer addresses to be set

- `_canPropose`: Flag, if the given address list can or cannot propose

### Function `setProposer(address _proposer, bool _canPropose) public`

Enables or disables a voter address to propose

#### Parameters:

- `_proposer`: Proposer address to be set

- `_canPropose`: Flag, if the given address list can or cannot propose

### Function `setVoteThreshold(uint256 _voteThreshold) public`

Sets number of votes needed for a vote to succeed

#### Parameters:

- `_voteThreshold`: The number of votes in support of a proposal required in order for a vote to succeed

### Function `getReceipt(uint256 _proposalId, address _voter) → struct MultisigVoting.Receipt public`

Gets voting receipts stored on-chain

#### Parameters:

- `_proposalId`: Local id of the proposal

- `_voter`: Address of the voter

#### Return Values:

- Voting receipt containing if voter has voted and their decision

### Event `VoteCast(address voter, uint256 proposalId, bool support)`
