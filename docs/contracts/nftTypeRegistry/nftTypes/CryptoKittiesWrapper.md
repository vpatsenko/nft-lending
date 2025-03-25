# `CryptoKittiesWrapper`

Provides logic to transfer CryptoKitties

## Functions:

- `transferNFT(address _sender, address _recipient, address _nftContract, uint256 _nftId) (external)`

- `isOwner(address _owner, address _nftContract, uint256 _tokenId) (external)`

- `wrapAirdropReceiver(address _recipient, address _nftContract, uint256 _nftId, address _beneficiary) (external)`

### Function `transferNFT(address _sender, address _recipient, address _nftContract, uint256 _nftId) → bool external`

Transfers Kitty `_nftId` handled by the contract `_nftContract` from `_sender` to `_recipient`

#### Parameters:

- `_sender`: - The current owner of the Kitty

- `_recipient`: - The new owner of the Kitty

- `_nftContract`: - CryptoKitties contract

- `_nftId`: - Kitty id

#### Return Values:

- true if successfully transferred, false otherwise

### Function `isOwner(address _owner, address _nftContract, uint256 _tokenId) → bool external`

### Function `wrapAirdropReceiver(address _recipient, address _nftContract, uint256 _nftId, address _beneficiary) → bool external`
