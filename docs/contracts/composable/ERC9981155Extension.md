# `ERC9981155Extension`

ERC998TopDown extension to support ERC1155 children

## Functions:

- `childBalance(uint256 _tokenId, address _childContract, uint256 _childTokenId) (external)`

- `supportsInterface(bytes4 _interfaceId) (public)`

- `safeTransferChild(uint256 _tokenId, address _to, address _childContract, uint256 _childTokenId, uint256 _amount, bytes _data) (external)`

- `safeBatchTransferChild(uint256 _tokenId, address _to, address _childContract, uint256[] _childTokenIds, uint256[] _amounts, bytes _data) (external)`

- `onERC1155Received(address, address, uint256, uint256, bytes) (external)`

- `onERC1155BatchReceived(address, address _from, uint256[] _ids, uint256[] _values, bytes _data) (external)`

- `_validateAndReceive1155Child(address _from, address _childContract, uint256 _id, uint256 _amount, bytes _data) (internal)`

- `_receive1155Child(uint256 _tokenId, address _childContract, uint256 _childTokenId, uint256 _amount) (internal)`

- `_validate1155ChildTransfer(uint256 _fromTokenId) (internal)`

- `_remove1155Child(uint256 _tokenId, address _childContract, uint256 _childTokenId, uint256 _amount) (internal)`

### Function `childBalance(uint256 _tokenId, address _childContract, uint256 _childTokenId) → uint256 external`

Gives child balance for a specific child contract and child id

#### Parameters:

- `_childContract`: The ERC1155 contract of the child token

- `_childTokenId`: The tokenId of the child token

### Function `supportsInterface(bytes4 _interfaceId) → bool public`

See {IERC165-supportsInterface}.

### Function `safeTransferChild(uint256 _tokenId, address _to, address _childContract, uint256 _childTokenId, uint256 _amount, bytes _data) external`

Transfer a ERC1155 child token from top-down composable to address or other top-down composable

#### Parameters:

- `_tokenId`: The owning token to transfer from

- `_to`: The address that receives the child token

- `_childContract`: The ERC1155 contract of the child token

- `_childTokenId`: The tokenId of the token that is being transferred

- `_amount`: The amount of the token that is being transferred

- `_data`: Additional data with no specified format

### Function `safeBatchTransferChild(uint256 _tokenId, address _to, address _childContract, uint256[] _childTokenIds, uint256[] _amounts, bytes _data) external`

Transfer batch of ERC1155 child token from top-down composable to address or other top-down composable

#### Parameters:

- `_tokenId`: The owning token to transfer from

- `_to`: The address that receives the child token

- `_childContract`: The ERC1155 contract of the child token

- `_childTokenIds`: The list of tokenId of the token that is being transferred

- `_amounts`: The list of amount of the token that is being transferred

- `_data`: Additional data with no specified format

### Function `onERC1155Received(address, address, uint256, uint256, bytes) → bytes4 external`

A token receives a child token

### Function `onERC1155BatchReceived(address, address _from, uint256[] _ids, uint256[] _values, bytes _data) → bytes4 external`

A token receives a batch of child tokens

param The address that caused the transfer

#### Parameters:

- `_from`: The owner of the child token

- `_ids`: The list of token id that is being transferred to the parent

- `_values`: The list of amounts of the tokens that is being transferred

- `_data`: Up to the first 32 bytes contains an integer which is the receiving parent tokenId

#### Return Values:

- the selector of this method

### Function `_validateAndReceive1155Child(address _from, address _childContract, uint256 _id, uint256 _amount, bytes _data) internal`

Validates the data of the child token and receives it

#### Parameters:

- `_from`: The owner of the child token

- `_childContract`: The ERC1155 contract of the child token

- `_id`: The token id that is being transferred to the parent

- `_amount`: The amount of the token that is being transferred

- `_data`: Up to the first 32 bytes contains an integer which is the receiving parent tokenId

### Function `_receive1155Child(uint256 _tokenId, address _childContract, uint256 _childTokenId, uint256 _amount) internal`

Updates the state to receive a child

#### Parameters:

- `_tokenId`: The token receiving the child

- `_childContract`: The ERC1155 contract of the child token

- `_childTokenId`: The token id that is being transferred to the parent

- `_amount`: The amount of the token that is being transferred

### Function `_validate1155ChildTransfer(uint256 _fromTokenId) internal`

Validates the transfer of a 1155 child

#### Parameters:

- `_fromTokenId`: The owning token to transfer from

### Function `_remove1155Child(uint256 _tokenId, address _childContract, uint256 _childTokenId, uint256 _amount) internal`

Updates the state to remove a ERC1155 child

#### Parameters:

- `_tokenId`: The owning token to transfer from

- `_childContract`: The ERC1155 contract of the child token

- `_childTokenId`: The tokenId of the token that is being transferred

- `_amount`: The amount of the token that is being transferred
