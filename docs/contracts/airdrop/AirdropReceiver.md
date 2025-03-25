# `AirdropReceiver`

## Modifiers:

- `onlyOwner()`

- `onlyOwnerOrBeneficiary()`

## Functions:

- `constructor(address _nftfiHub) (public)`

- `getTokenId() (public)`

- `initialize(address _to) (external)`

- `wrap(address _from, address _beneficiary, address _nftCollateralContract, uint256 _nftCollateralId) (external)`

- `unwrap(address _receiver) (external)`

- `pullAirdrop(address _target, bytes _data) (external)`

- `supportsInterface(bytes4 _interfaceId) (public)`

- `drainERC20Airdrop(address tokenAddress, address receiver) (external)`

- `drainERC721Airdrop(address tokenAddress, uint256 tokenId, address receiver) (external)`

- `drainERC1155Airdrop(address tokenAddress, uint256 tokenId, address receiver) (external)`

- `_transferNFT(address _nftTransferWrapper, address _sender, address _recipient, address _nftCollateralContract, uint256 _nftCollateralId) (internal)`

- `_getSelector(bytes _data) (internal)`

- `onERC721Received(address, address _from, uint256 _tokenId, bytes _data) (public)`

- `onERC1155Received(address, address _from, uint256 _id, uint256, bytes _data) (public)`

- `onERC1155BatchReceived(address, address _from, uint256[] _ids, uint256[], bytes _data) (public)`

- `_receiveAndWrap(address _from, address _beneficiary, address _nftCollateralContract, uint256 _nftCollateralId) (internal)`

## Events:

- `Initialized(uint256 tokenId)`

- `NftWrapped(address nftCollateralContract, uint256 nftCollateralId, address from, address beneficiary, address owner)`

- `NftUnwrapped(address nftCollateralContract, uint256 nftCollateralId, address to, address owner)`

### Modifier `onlyOwner()`

### Modifier `onlyOwnerOrBeneficiary()`

### Function `constructor(address _nftfiHub) public`

### Function `getTokenId() → uint256 public`

### Function `initialize(address _to) → uint256 external`

### Function `wrap(address _from, address _beneficiary, address _nftCollateralContract, uint256 _nftCollateralId) external`

### Function `unwrap(address _receiver) external`

### Function `pullAirdrop(address _target, bytes _data) external`

### Function `supportsInterface(bytes4 _interfaceId) → bool public`

See {IERC165-supportsInterface}.

### Function `drainERC20Airdrop(address tokenAddress, address receiver) external`

used by the owner account to be able to drain ERC20 tokens received as airdrops

for the locked collateral NFT-s

#### Parameters:

- `tokenAddress`: - address of the token contract for the token to be sent out

- `receiver`: - receiver of the token

### Function `drainERC721Airdrop(address tokenAddress, uint256 tokenId, address receiver) external`

used by the owner account to be able to drain ERC721 tokens received as airdrops

for the locked collateral NFT-s

#### Parameters:

- `tokenAddress`: - address of the token contract for the token to be sent out

- `tokenId`: - id token to be sent out

- `receiver`: - receiver of the token

### Function `drainERC1155Airdrop(address tokenAddress, uint256 tokenId, address receiver) external`

used by the owner account to be able to drain ERC1155 tokens received as airdrops

for the locked collateral NFT-s

#### Parameters:

- `tokenAddress`: - address of the token contract for the token to be sent out

- `tokenId`: - id token to be sent out

- `receiver`: - receiver of the token

### Function `_transferNFT(address _nftTransferWrapper, address _sender, address _recipient, address _nftCollateralContract, uint256 _nftCollateralId) internal`

### Function `_getSelector(bytes _data) → bytes4 selector internal`

### Function `onERC721Received(address, address _from, uint256 _tokenId, bytes _data) → bytes4 public`

### Function `onERC1155Received(address, address _from, uint256 _id, uint256, bytes _data) → bytes4 public`

### Function `onERC1155BatchReceived(address, address _from, uint256[] _ids, uint256[], bytes _data) → bytes4 public`

### Function `_receiveAndWrap(address _from, address _beneficiary, address _nftCollateralContract, uint256 _nftCollateralId) internal`

### Event `Initialized(uint256 tokenId)`

### Event `NftWrapped(address nftCollateralContract, uint256 nftCollateralId, address from, address beneficiary, address owner)`

### Event `NftUnwrapped(address nftCollateralContract, uint256 nftCollateralId, address to, address owner)`
