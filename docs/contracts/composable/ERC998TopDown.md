# `ERC998TopDown`

ERC998ERC721 Top-Down Composable Non-Fungible Token.

See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-998.md

This implementation does not support children to be nested bundles, erc20 nor bottom-up

## Functions:

- `childExists(address _childContract, uint256 _childTokenId) (external)`

- `totalChildContracts(uint256 _tokenId) (external)`

- `childContractByIndex(uint256 _tokenId, uint256 _index) (external)`

- `totalChildTokens(uint256 _tokenId, address _childContract) (external)`

- `childTokenByIndex(uint256 _tokenId, address _childContract, uint256 _index) (external)`

- `ownerOfChild(address _childContract, uint256 _childTokenId) (external)`

- `rootOwnerOf(uint256 _tokenId) (public)`

- `rootOwnerOfChild(address _childContract, uint256 _childTokenId) (public)`

- `supportsInterface(bytes4 _interfaceId) (public)`

- `_safeMint(address _to) (internal)`

- `safeTransferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId) (external)`

- `safeTransferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId, bytes _data) (external)`

- `transferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId) (external)`

- `transferChildToParent(uint256, address, uint256, address, uint256, bytes) (external)`

- `getChild(address, uint256, address, uint256) (external)`

- `_getChild(address _from, uint256 _tokenId, address _childContract, uint256 _childTokenId) (internal)`

- `onERC721Received(address, address _from, uint256 _childTokenId, bytes _data) (external)`

- `_beforeTokenTransfer(address _from, address _to, uint256 _tokenId) (internal)`

- `_transferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId) (internal)`

- `_validateChildTransfer(uint256 _fromTokenId, address _childContract, uint256 _childTokenId) (internal)`

- `_validateReceiver(address _to) (internal)`

- `_removeChild(uint256 _tokenId, address _childContract, uint256 _childTokenId) (internal)`

- `_validateAndReceiveChild(address _from, address _childContract, uint256 _childTokenId, bytes _data) (internal)`

- `_receiveChild(address _from, uint256 _tokenId, address _childContract, uint256 _childTokenId) (internal)`

- `_ownerOfChild(address _childContract, uint256 _childTokenId) (internal)`

- `_parseTokenId(bytes _data) (internal)`

- `_oldNFTsTransfer(address _to, address _childContract, uint256 _childTokenId) (internal)`

- `_validateTransferSender(uint256 _fromTokenId) (internal)`

### Function `childExists(address _childContract, uint256 _childTokenId) → bool external`

Tells whether the ERC721 type child exists or not

#### Parameters:

- `_childContract`: The contract address of the child token

- `_childTokenId`: The tokenId of the child

#### Return Values:

- True if the child exists, false otherwise

### Function `totalChildContracts(uint256 _tokenId) → uint256 external`

Get the total number of child contracts with tokens that are owned by \_tokenId

#### Parameters:

- `_tokenId`: The parent token of child tokens in child contracts

#### Return Values:

- uint256 The total number of child contracts with tokens owned by \_tokenId

### Function `childContractByIndex(uint256 _tokenId, uint256 _index) → address childContract external`

Get child contract by tokenId and index

#### Parameters:

- `_tokenId`: The parent token of child tokens in child contract

- `_index`: The index position of the child contract

#### Return Values:

- childContract The contract found at the \_tokenId and index

### Function `totalChildTokens(uint256 _tokenId, address _childContract) → uint256 external`

Get the total number of child tokens owned by tokenId that exist in a child contract

#### Parameters:

- `_tokenId`: The parent token of child tokens

- `_childContract`: The child contract containing the child tokens

#### Return Values:

- uint256 The total number of child tokens found in child contract that are owned by \_tokenId

### Function `childTokenByIndex(uint256 _tokenId, address _childContract, uint256 _index) → uint256 childTokenId external`

Get child token owned by \_tokenId, in child contract, at index position

#### Parameters:

- `_tokenId`: The parent token of the child token

- `_childContract`: The child contract of the child token

- `_index`: The index position of the child token

#### Return Values:

- childTokenId The child tokenId for the parent token, child token and index

### Function `ownerOfChild(address _childContract, uint256 _childTokenId) → bytes32 parentTokenOwner, uint256 parentTokenId external`

Get the parent tokenId and its owner of a ERC721 child token

#### Parameters:

- `_childContract`: The contract address of the child token

- `_childTokenId`: The tokenId of the child

#### Return Values:

- parentTokenOwner The parent address of the parent token and ERC998 magic value

- parentTokenId The parent tokenId of \_childTokenId

### Function `rootOwnerOf(uint256 _tokenId) → bytes32 rootOwner public`

Get the root owner of tokenId

#### Parameters:

- `_tokenId`: The token to query for a root owner address

#### Return Values:

- rootOwner The root owner at the top of tree of tokens and ERC998 magic value.

### Function `rootOwnerOfChild(address _childContract, uint256 _childTokenId) → bytes32 rootOwner public`

Get the root owner of a child token

Returns the owner at the top of the tree of composables

Use Cases handled:

- Case 1: Token owner is this contract and token.

- Case 2: Token owner is other external top-down composable

- Case 3: Token owner is other contract

- Case 4: Token owner is user

#### Parameters:

- `_childContract`: The contract address of the child token

- `_childTokenId`: The tokenId of the child

#### Return Values:

- rootOwner The root owner at the top of tree of tokens and ERC998 magic value

### Function `supportsInterface(bytes4 _interfaceId) → bool public`

See {IERC165-supportsInterface}.

The interface id 0x1efdf36a is added. The spec claims it to be the interface id of IERC998ERC721TopDown.

But it is not.

It is added anyway in case some contract checks it being compliant with the spec.

### Function `_safeMint(address _to) → uint256 internal`

Mints a new bundle

#### Parameters:

- `_to`: The address that owns the new bundle

#### Return Values:

- The id of the new bundle

### Function `safeTransferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId) external`

Transfer child token from top-down composable to address

#### Parameters:

- `_fromTokenId`: The owning token to transfer from

- `_to`: The address that receives the child token

- `_childContract`: The ERC721 contract of the child token

- `_childTokenId`: The tokenId of the token that is being transferred

### Function `safeTransferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId, bytes _data) external`

Transfer child token from top-down composable to address or other top-down composable

#### Parameters:

- `_fromTokenId`: The owning token to transfer from

- `_to`: The address that receives the child token

- `_childContract`: The ERC721 contract of the child token

- `_childTokenId`: The tokenId of the token that is being transferred

- `_data`: Additional data with no specified format

### Function `transferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId) external`

Transfer child token from top-down composable to address

#### Parameters:

- `_fromTokenId`: The owning token to transfer from

- `_to`: The address that receives the child token

- `_childContract`: The ERC721 contract of the child token

- `_childTokenId`: The tokenId of the token that is being transferred

### Function `transferChildToParent(uint256, address, uint256, address, uint256, bytes) external`

NOT SUPPORTED

Intended to transfer bottom-up composable child token from top-down composable to other ERC721 token.

### Function `getChild(address, uint256, address, uint256) external`

Transfer a child token from an ERC721 contract to a composable. Used for old tokens that does not

have a safeTransferFrom method like cryptokitties

### Function `_getChild(address _from, uint256 _tokenId, address _childContract, uint256 _childTokenId) internal`

Transfer a child token from an ERC721 contract to a composable. Used for old tokens that does not

have a safeTransferFrom method like cryptokitties

This contract has to be approved first in \_childContract

#### Parameters:

- `_from`: The address that owns the child token.

- `_tokenId`: The token that becomes the parent owner

- `_childContract`: The ERC721 contract of the child token

- `_childTokenId`: The tokenId of the child token

### Function `onERC721Received(address, address _from, uint256 _childTokenId, bytes _data) → bytes4 external`

A token receives a child token

param The address that caused the transfer

#### Parameters:

- `_from`: The owner of the child token

- `_childTokenId`: The token that is being transferred to the parent

- `_data`: Up to the first 32 bytes contains an integer which is the receiving parent tokenId

#### Return Values:

- the selector of this method

### Function `_beforeTokenTransfer(address _from, address _to, uint256 _tokenId) internal`

ERC721 implementation hook that is called before any token transfer. Prevents nested bundles

#### Parameters:

- `_from`: address of the current owner of the token

- `_to`: destination address

- `_tokenId`: id of the token to transfer

### Function `_transferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId) internal`

Validates the child transfer parameters and remove the child from the bundle

#### Parameters:

- `_fromTokenId`: The owning token to transfer from

- `_to`: The address that receives the child token

- `_childContract`: The ERC721 contract of the child token

- `_childTokenId`: The tokenId of the token that is being transferred

### Function `_validateChildTransfer(uint256 _fromTokenId, address _childContract, uint256 _childTokenId) internal`

Validates the child transfer parameters

#### Parameters:

- `_fromTokenId`: The owning token to transfer from

- `_childContract`: The ERC721 contract of the child token

- `_childTokenId`: The tokenId of the token that is being transferred

### Function `_validateReceiver(address _to) internal`

Validates the receiver of a child transfer

#### Parameters:

- `_to`: The address that receives the child token

### Function `_removeChild(uint256 _tokenId, address _childContract, uint256 _childTokenId) internal`

Updates the state to remove a child

#### Parameters:

- `_tokenId`: The owning token to transfer from

- `_childContract`: The ERC721 contract of the child token

- `_childTokenId`: The tokenId of the token that is being transferred

### Function `_validateAndReceiveChild(address _from, address _childContract, uint256 _childTokenId, bytes _data) internal`

Validates the data from a child transfer and receives it

#### Parameters:

- `_from`: The owner of the child token

- `_childContract`: The ERC721 contract of the child token

- `_childTokenId`: The token that is being transferred to the parent

- `_data`: Up to the first 32 bytes contains an integer which is the receiving parent tokenId

### Function `_receiveChild(address _from, uint256 _tokenId, address _childContract, uint256 _childTokenId) internal`

Update the state to receive a child

#### Parameters:

- `_from`: The owner of the child token

- `_tokenId`: The token receiving the child

- `_childContract`: The ERC721 contract of the child token

- `_childTokenId`: The token that is being transferred to the parent

### Function `_ownerOfChild(address _childContract, uint256 _childTokenId) → address parentTokenOwner, uint256 parentTokenId internal`

Returns the owner of a child

#### Parameters:

- `_childContract`: The contract address of the child token

- `_childTokenId`: The tokenId of the child

#### Return Values:

- parentTokenOwner The parent address of the parent token and ERC998 magic value

- parentTokenId The parent tokenId of \_childTokenId

### Function `_parseTokenId(bytes _data) → uint256 tokenId internal`

Convert up to 32 bytes of_data to uint256, owner nft tokenId passed as uint in bytes

#### Parameters:

- `_data`: Up to the first 32 bytes contains an integer which is the receiving parent tokenId

#### Return Values:

- tokenId the token Id encoded in the data

### Function `_oldNFTsTransfer(address _to, address _childContract, uint256 _childTokenId) internal`

Transfers the NFT using method compatible with old token contracts

#### Parameters:

- `_to`: address of the receiver of the children

- `_childContract`: The contract address of the child token

- `_childTokenId`: The tokenId of the child

### Function `_validateTransferSender(uint256 _fromTokenId) internal`

Validates that the sender is authorized to perform a child transfer

#### Parameters:

- `_fromTokenId`: The owning token to transfer from
