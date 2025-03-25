# `ERC721Wrapper`

Provides logic to transfer ERC721

## Functions:

- `transferNFT(address _sender, address _recipient, address _nftContract, uint256 _nftId) (external)`

- `isOwner(address _owner, address _nftContract, uint256 _tokenId) (external)`

- `wrapAirdropReceiver(address _recipient, address _nftContract, uint256 _nftId, address _beneficiary) (external)`

### Function `transferNFT(address _sender, address _recipient, address _nftContract, uint256 _nftId) → bool external`

Transfers ERC721 `_nftId` handled by the contract `_nftContract` from `_sender` to `_recipient`

#### Parameters:

- `_sender`: - The current owner of the ERC721

- `_recipient`: - The new owner of the ERC721

- `_nftContract`: - ERC721 contract

- `_nftId`: - ERC721 id

#### Return Values:

- true if successfully transferred, false otherwise

### Function `isOwner(address _owner, address _nftContract, uint256 _tokenId) → bool external`

### Function `wrapAirdropReceiver(address _recipient, address _nftContract, uint256 _nftId, address _beneficiary) → bool external`
