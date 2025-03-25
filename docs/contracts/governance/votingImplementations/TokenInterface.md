# `TokenInterface`

Defines a one function interface for a quorum voting token

## Functions:

- `getPriorVotes(address account, uint256 blockNumber) (external)`

### Function `getPriorVotes(address account, uint256 blockNumber) → uint96 external`

Determine the prior number of votes for an account as of a block number

Block number must be a finalized block or else this function will revert to prevent misinformation.

#### Parameters:

- `account`: The address of the account to check

- `blockNumber`: The block number to get the vote balance at

#### Return Values:

- The number of votes the account had as of the given block
