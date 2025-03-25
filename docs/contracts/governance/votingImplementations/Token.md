# `Token`

ERC-20 Token for quorum voting

## Functions:

- `constructor(address _account) (public)`

- `approve(address _spender, uint256 _rawAmount) (external)`

- `transfer(address _dst, uint256 _rawAmount) (external)`

- `transferFrom(address _src, address _dst, uint256 _rawAmount) (external)`

- `allowance(address _account, address _spender) (external)`

- `balanceOf(address _account) (external)`

- `getCurrentVotes(address _account) (external)`

- `delegate(address _delegatee) (public)`

- `delegateBySig(address _delegatee, uint256 _nonce, uint256 _expiry, uint8 _v, bytes32 _r, bytes32 _s) (public)`

- `getPriorVotes(address _account, uint256 _blockNumber) (public)`

- `_delegate(address _delegator, address _delegatee) (internal)`

- `_transferTokens(address _src, address _dst, uint96 _amount) (internal)`

- `_moveDelegates(address _srcRep, address _dstRep, uint96 _amount) (internal)`

- `_writeCheckpoint(address _delegatee, uint32 _nCheckpoints, uint96 _oldVotes, uint96 _newVotes) (internal)`

- `getChainId() (internal)`

- `safe32(uint256 n, string errorMessage) (internal)`

- `safe96(uint256 n, string errorMessage) (internal)`

## Events:

- `DelegateChanged(address delegator, address fromDelegate, address toDelegate)`

- `DelegateVotesChanged(address delegate, uint256 previousBalance, uint256 newBalance)`

- `Transfer(address from, address to, uint256 amount)`

- `Approval(address owner, address spender, uint256 amount)`

### Function `constructor(address _account) public`

Construct a new token

#### Parameters:

- `_account`: The initial account to grant all the tokens

### Function `approve(address _spender, uint256 _rawAmount) → bool external`

Approve `spender` to transfer up to `amount` from `src`

    This will overwrite the approval amount for `spender`

         and is subject to issues noted [here](https://eips.ethereum.org/EIPS/eip-20#approve)

#### Parameters:

- `_spender`: The address of the account which may transfer tokens

- `_rawAmount`: The number of tokens that are approved (2^256-1 means infinite)

#### Return Values:

- Whether or not the approval succeeded

### Function `transfer(address _dst, uint256 _rawAmount) → bool external`

Transfer `amount` tokens from `msg.sender` to `dst`

#### Parameters:

- `_dst`: The address of the destination account

- `_rawAmount`: The number of tokens to transfer

#### Return Values:

- Whether or not the transfer succeeded

### Function `transferFrom(address _src, address _dst, uint256 _rawAmount) → bool external`

Transfer `amount` tokens from `src` to `dst`

#### Parameters:

- `_src`: The address of the source account

- `_dst`: The address of the destination account

- `_rawAmount`: The number of tokens to transfer

#### Return Values:

- Whether or not the transfer succeeded

### Function `allowance(address _account, address _spender) → uint256 external`

Get the number of tokens `spender` is approved to spend on behalf of `account`

#### Parameters:

- `_account`: The address of the account holding the funds

- `_spender`: The address of the account spending the funds

#### Return Values:

- The number of tokens approved

### Function `balanceOf(address _account) → uint256 external`

Get the number of tokens held by the `account`

#### Parameters:

- `_account`: The address of the account to get the balance of

#### Return Values:

- The number of tokens held

### Function `getCurrentVotes(address _account) → uint96 external`

Gets the current votes balance for `account`

#### Parameters:

- `_account`: The address to get votes balance

#### Return Values:

- The number of current votes for `account`

### Function `delegate(address _delegatee) public`

Delegate votes from `msg.sender` to `delegatee`

#### Parameters:

- `_delegatee`: The address to delegate votes to

### Function `delegateBySig(address _delegatee, uint256 _nonce, uint256 _expiry, uint8 _v, bytes32 _r, bytes32 _s) public`

Delegates votes from signatory to `delegatee`

#### Parameters:

- `_delegatee`: The address to delegate votes to

- `_nonce`: The contract state required to match the signature

- `_expiry`: The time at which to expire the signature

- `_v`: The recovery byte of the signature

- `_r`: Half of the ECDSA signature pair

- `_s`: Half of the ECDSA signature pair

### Function `getPriorVotes(address _account, uint256 _blockNumber) → uint96 public`

Determine the prior number of votes for an account as of a block number

Block number must be a finalized block or else this function will revert to prevent misinformation.

#### Parameters:

- `_account`: The address of the account to check

- `_blockNumber`: The block number to get the vote balance at

#### Return Values:

- The number of votes the account had as of the given block

### Function `_delegate(address _delegator, address _delegatee) internal`

Delegate votes from `_delegator` to `delegatee`

#### Parameters:

- `_delegator`: The address to delegate votes from

- `_delegatee`: The address to delegate votes to

### Function `_transferTokens(address _src, address _dst, uint96 _amount) internal`

Transfer `amount` tokens from `src` to `dst`

#### Parameters:

- `_src`: The address of the source account

- `_dst`: The address of the destination account

- `_amount`: The number of tokens to transfer

### Function `_moveDelegates(address _srcRep, address _dstRep, uint96 _amount) internal`

actually administers the delegate number change by updating the sorage

#### Parameters:

- `_srcRep`: source address

- `_dstRep`: destination address

- `_amount`: amount of votes moved

### Function `_writeCheckpoint(address _delegatee, uint32 _nCheckpoints, uint96 _oldVotes, uint96 _newVotes) internal`

records voting powers after vote delegation

#### Parameters:

- `_delegatee`: voter to be updated

- `_nCheckpoints`: checkopoint number (sequential index like)

- `_oldVotes`: number of old votes

- `_newVotes`: number of new votes

### Function `getChainId() → uint256 internal`

Chain id for the ECDSA signature voting

### Function `safe32(uint256 n, string errorMessage) → uint32 internal`

Checks if uint256 is safely convertible to uint32

#### Parameters:

- `n`: uint256 number to be converted to uint32

- `errorMessage`: Error to throw if overflow happens

### Function `safe96(uint256 n, string errorMessage) → uint96 internal`

Checks if uint256 is safely convertible to uint96

#### Parameters:

- `n`: uint256 number to be converted to uint96

- `errorMessage`: Error to throw if overflow happens

### Event `DelegateChanged(address delegator, address fromDelegate, address toDelegate)`

### Event `DelegateVotesChanged(address delegate, uint256 previousBalance, uint256 newBalance)`

### Event `Transfer(address from, address to, uint256 amount)`

### Event `Approval(address owner, address spender, uint256 amount)`
