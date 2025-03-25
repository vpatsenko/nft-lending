# `IVoting`

Common interface for functions voting contracts have to implement to be used for the Proposals contract

## Functions:

- `proposalsContract() (external)`

- `canPropose(address _proposer) (external)`

- `getMajorityResult(uint256 _proposalId) (external)`

### Function `proposalsContract() → contract IProposals external`

#### Return Values:

- The proposals contract thats proposals this voting strategy votes on

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
