# `NftfiBundler`

ERC998 Top-Down Composable Non-Fungible Token that supports permitted ERC721, ERC1155 and ERC20 children.

## Functions:

- `constructor(address _nftfiHub, string _name, string _symbol) (public)`

- `supportsInterface(bytes4 _interfaceId) (public)`

- `permittedAsset(address _asset) (public)`

- `permittedErc20Asset(address _erc20Contract) (public)`

- `buildBundle(struct IBundleBuilder.BundleElements _bundleElements, address _sender, address _receiver) (external)`

- `decomposeBundle(uint256 _tokenId, address _receiver) (external)`

- `_receiveChild(address _from, uint256 _tokenId, address _childContract, uint256 _childTokenId) (internal)`

- `_receive1155Child(uint256 _tokenId, address _childContract, uint256 _childTokenId, uint256 _amount) (internal)`

- `_receiveErc20Child(address _from, uint256 _tokenId, address _erc20Contract, uint256 _value) (internal)`

## Events:

- `NewBundle(uint256 bundleId, address sender, address receiver)`

### Function `constructor(address _nftfiHub, string _name, string _symbol) public`

Stores the NftfiHub, name and symbol

#### Parameters:

- `_nftfiHub`: Address of the NftfiHub contract

- `_name`: name of the token contract

- `_symbol`: symbol of the token contract

### Function `supportsInterface(bytes4 _interfaceId) → bool public`

See {IERC165-supportsInterface}.

### Function `permittedAsset(address _asset) → bool public`

Tells if an asset is permitted or not

#### Parameters:

- `_asset`: address of the asset

#### Return Values:

- true if permitted, false otherwise

### Function `permittedErc20Asset(address _erc20Contract) → bool public`

Tells if the erc20 is permitted or not

#### Parameters:

- `_erc20Contract`: address of the erc20

#### Return Values:

- true if permitted, false otherwise

### Function `buildBundle(struct IBundleBuilder.BundleElements _bundleElements, address _sender, address _receiver) → uint256 external`

used by the loan contract to build a bundle from the BundleElements struct at the beginning of a loan,

returns the id of the created bundle

#### Parameters:

- `_bundleElements`: - the lists of erc721-20-1155 tokens that are to be bundled

- `_sender`: sender of the tokens in the bundle - the borrower

- `_receiver`: receiver of the created bundle, normally the loan contract

### Function `decomposeBundle(uint256 _tokenId, address _receiver) external`

Remove all the children from the bundle

This method may run out of gas if the list of children is too big. In that case, children can be removed

     individually.

#### Parameters:

- `_tokenId`: the id of the bundle

- `_receiver`: address of the receiver of the children

### Function `_receiveChild(address _from, uint256 _tokenId, address _childContract, uint256 _childTokenId) internal`

Update the state to receive a ERC721 child

Overrides the implementation to check if the asset is permitted

#### Parameters:

- `_from`: The owner of the child token

- `_tokenId`: The token receiving the child

- `_childContract`: The ERC721 contract of the child token

- `_childTokenId`: The token that is being transferred to the parent

### Function `_receive1155Child(uint256 _tokenId, address _childContract, uint256 _childTokenId, uint256 _amount) internal`

Updates the state to receive a ERC1155 child

Overrides the implementation to check if the asset is permitted

#### Parameters:

- `_tokenId`: The token receiving the child

- `_childContract`: The ERC1155 contract of the child token

- `_childTokenId`: The token id that is being transferred to the parent

- `_amount`: The amount of the token that is being transferred

### Function `_receiveErc20Child(address _from, uint256 _tokenId, address _erc20Contract, uint256 _value) internal`

Store data for the received ERC20

#### Parameters:

- `_from`: The current owner address of the ERC20 tokens that are being transferred.

- `_tokenId`: The token to transfer the ERC20 tokens to.

- `_erc20Contract`: The ERC20 token contract

- `_value`: The number of ERC20 tokens to transfer

### Event `NewBundle(uint256 bundleId, address sender, address receiver)`
