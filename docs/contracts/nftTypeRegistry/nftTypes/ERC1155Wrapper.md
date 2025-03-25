# `ERC1155Wrapper`

Provides logic to transfer ERC1155 tokens

## Functions:

- `transferNFT(address _sender, address _recipient, address _nftContract, uint256 _nftId) (external)`

- `isOwner(address _owner, address _nftContract, uint256 _tokenId) (external)`

- `wrapAirdropReceiver(address _recipient, address _nftContract, uint256 _nftId, address _beneficiary) (external)`

### Function `transferNFT(address _sender, address _recipient, address _nftContract, uint256 _nftId) → bool external`

Transfer the nft to the `recipient`

#### Parameters:

- `_sender`: Address of the current owner of the nft

- `_recipient`: Address that will receive the nft

- `_nftContract`: Address of the nft contract

- `_nftId`: Id of the nft

#### Return Values:

- true if successfully transferred, false otherwise

### Function `isOwner(address _owner, address _nftContract, uint256 _tokenId) → bool external`

### Function `wrapAirdropReceiver(address _recipient, address _nftContract, uint256 _nftId, address _beneficiary) → bool external`
