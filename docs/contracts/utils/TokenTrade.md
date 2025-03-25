# `TokenTrade`

## Functions:

- `constructor(address _nftfiHub, bytes32 _loanCoordinatorKey) (public)`

- `cancelTradeCommitment(uint256 _nonce) (external)`

- `getNonceUsage(address _user, uint256 _nonce) (external)`

- `sellObligationReceipt(address _tradeERC20, uint256 _nftId, uint256 _erc20Amount, address _buyer, uint256 _buyerNonce, uint256 _expiry, bytes _buyerSignature) (external)`

- `buyObligationReceipt(address _tradeERC20, uint256 _nftId, uint256 _erc20Amount, address _seller, uint256 _sellerNonce, uint256 _expiry, bytes _sellerSignature) (external)`

- `sellPromissoryNote(address _tradeERC20, uint256 _nftId, uint256 _erc20Amount, address _buyer, uint256 _buyerNonce, uint256 _expiry, bytes _buyerSignature) (external)`

- `buyPromissoryNote(address _tradeERC20, uint256 _nftId, uint256 _erc20Amount, address _seller, uint256 _sellerNonce, uint256 _expiry, bytes _sellerSignature) (external)`

- `trade(address _tradeERC20, address _tradeNft, uint256 _nftId, uint256 _erc20Amount, address _seller, address _buyer) (internal)`

- `isValidTradeSignature(address _tradeERC20, address _tradeNft, uint256 _nftId, uint256 _erc20Amount, address _accepter, uint256 _accepterNonce, uint256 _expiry, bytes _accepterSignature) (public)`

- `getChainID() (internal)`

### Function `constructor(address _nftfiHub, bytes32 _loanCoordinatorKey) public`

### Function `cancelTradeCommitment(uint256 _nonce) external`

This function can be called by the initiator to cancel all off-chain orders that they

have signed that contain this nonce. If the off-chain orders were created correctly, there should only be one

off-chain order that contains this nonce at all.

The nonce referred to here is not the same as an Ethereum account's nonce. We are referring

instead to nonces that are used by both the lender and the borrower when they are first signing off-chain NFTfi

orders. These nonces can be any uint256 value that the user has not previously used to sign an off-chain order.

Each nonce can be used at most once per user within NFTfi, regardless of whether they are the lender or the

borrower in that situation. This serves two purposes. First, it prevents replay attacks where an attacker would

submit a user's off-chain order more than once. Second, it allows a user to cancel an off-chain order by calling

NFTfi.cancelTradeCommitment(), which marks the nonce as used and prevents any future trade from

using the user's off-chain order that contains that nonce.

#### Parameters:

- `_nonce`: - User nonce

### Function `getNonceUsage(address _user, uint256 _nonce) → bool external`

This function can be used to view whether a particular nonce for a particular user has already been used,

either from a successful trade or a cancelled off-chain order.

#### Parameters:

- `_user`: - The address of the user. This function works for both lenders and borrowers alike.

- `_nonce`: - The nonce referred to here is not the same as an Ethereum account's nonce. We are referring

instead to nonces that are used by both the lender and the borrower when they are first signing off-chain

NFTfi orders. These nonces can be any uint256 value that the user has not previously used to sign an off-chain

order. Each nonce can be used at most once per user within NFTfi, regardless of whether they are the lender or

the borrower in that situation. This serves two purposes:

- First, it prevents replay attacks where an attacker would submit a user's off-chain order more than once.

- Second, it allows a user to cancel an off-chain order by calling NFTfi.cancelTradeCommitment()

, which marks the nonce as used and prevents any future trade from using the user's off-chain order that contains

that nonce.

#### Return Values:

- A bool representing whether or not this nonce has been used for this user.

### Function `sellObligationReceipt(address _tradeERC20, uint256 _nftId, uint256 _erc20Amount, address _buyer, uint256 _buyerNonce, uint256 _expiry, bytes _buyerSignature) external`

trade initiator sells their obligation receipt to the accepter

Activates an off chain proposed ERC20-loanNFT token trade, works very much like the loan offer acceptal

both parties have to approve the token allowances for the trade contract before calling this function

parameters: see trade()

### Function `buyObligationReceipt(address _tradeERC20, uint256 _nftId, uint256 _erc20Amount, address _seller, uint256 _sellerNonce, uint256 _expiry, bytes _sellerSignature) external`

trade initiator buys obligation receipt of the accepter

Activates an off chain proposed ERC20-loanNFT token trade, works very much like the loan offer acceptal

both parties have to approve the token allowances for the trade contract before calling this function

parameters: see trade()

### Function `sellPromissoryNote(address _tradeERC20, uint256 _nftId, uint256 _erc20Amount, address _buyer, uint256 _buyerNonce, uint256 _expiry, bytes _buyerSignature) external`

trade initiator sells their promissory note to the accepter

Activates an off chain proposed ERC20-loanNFT token trade, works very much like the loan offer acceptal

both parties have to approve the token allowances for the trade contract before calling this function

parameters: see trade()

### Function `buyPromissoryNote(address _tradeERC20, uint256 _nftId, uint256 _erc20Amount, address _seller, uint256 _sellerNonce, uint256 _expiry, bytes _sellerSignature) external`

trade initiator buys promissory note of the accepter

Activates an off chain proposed ERC20-loanNFT token trade, works very much like the loan offer acceptal

both parties have to approve the token allowances for the trade contract before calling this function

parameters: see trade()

### Function `trade(address _tradeERC20, address _tradeNft, uint256 _nftId, uint256 _erc20Amount, address _seller, address _buyer) internal`

Activates an off chain proposed ERC20-loanNFT token trade, works very much like the loan offer acceptal

both parties have to approve the token allowances for the trade contract before calling this function

#### Parameters:

- `_tradeERC20`: - Contract address for the token denomination of the erc20 side of the trade,

can only be a premitted erc20 token

- `_tradeNft`: - Contract address for the loanNFT side of the trade,

can only be the 'promissory note' or the 'obligation receipt' of the used loan coordinator

- `_nftId`: - ID of the loanNFT to be tradeped

true:

     initiator sells loanNFT for erc20, accepter buys loanNFT for erc20

false:

     initiator buys loanNFT for erc20, accepter sells loanNFT for erc20

- `_erc20Amount`: - amount of payment price in erc20 for the loanNFT

- `_seller`: - address of the user selling the loanNFT for ERC20 tokens

- `_buyer`: - address of the user buying the loanNFT for ERC20 tokens

### Function `isValidTradeSignature(address _tradeERC20, address _tradeNft, uint256 _nftId, uint256 _erc20Amount, address _accepter, uint256 _accepterNonce, uint256 _expiry, bytes _accepterSignature) → bool public`

This function is called in trade()to validate the trade initiator's signature that the lender

has provided off-chain to verify that they did indeed want to

agree to this loan renegotiation according to these terms.

#### Parameters:

- `_tradeERC20`: - Contract address for the token denomination of the erc20 side of the trade,

can only be a premitted erc20 token

- `_tradeNft`: - Contract address for the loanNFT side of the trade,

can only be the 'promissory note' or the 'obligation receipt' of the used loan coordinator

- `_nftId`: - ID of the loanNFT to be tradeped

- `_erc20Amount`: - amount of payment price in erc20 for the loanNFT

- `_accepter`: - address of the user accepting the proposed trade, they have created the off-chain signature

- `_accepterNonce`: - The nonce referred to here is not the same as an Ethereum account's nonce. We are

referring instead to nonces that are used by both the lender and the borrower when they are first signing

off-chain NFTfi orders. These nonces can be any uint256 value that the user has not previously used to sign an

off-chain order. Each nonce can be used at most once per user within NFTfi, regardless of whether they are the

lender or the borrower in that situation. This serves two purposes:

- First, it prevents replay attacks where an attacker would submit a user's off-chain order more than once.

- Second, it allows a user to cancel an off-chain order by calling NFTfi.cancelTradeCommitment()

, which marks the nonce as used and prevents any future trade from using the user's off-chain order that contains

that nonce.

- `_expiry`: - The date when the trade offer expires

- `_accepterSignature`: - The ECDSA signature of the trade initiator,

obtained off-chain ahead of time, signing the

following combination of parameters:

- tradeERC20,

- tradeLoanNft,

- loanNftId,

- erc20Amount,

- initiator,

- accepter,

- initiatorNonce,

- expiry,

- chainId

### Function `getChainID() → uint256 internal`

This function gets the current chain ID.
