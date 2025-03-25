# `NftReceiver`

Base contract with capabilities for receiving ERC1155 and ERC721 tokens

## Functions:

- `onERC1155Received(address, address, uint256, uint256, bytes) (external)`

- `onERC1155BatchReceived(address, address, uint256[], uint256[], bytes) (external)`

- `supportsInterface(bytes4 _interfaceId) (public)`

### Function `onERC1155Received(address, address, uint256, uint256, bytes) → bytes4 external`

@dev Handles the receipt of a single ERC1155 token type. This function is called at the end of a

`safeTransferFrom` after the balance has been updated.

#### Return Values:

- if allowed

### Function `onERC1155BatchReceived(address, address, uint256[], uint256[], bytes) → bytes4 external`

@dev Handles the receipt of a multiple ERC1155 token types. This function is called at the end of a

`safeBatchTransferFrom` after the balances have been updated.

@return `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))` if allowed

### Function `supportsInterface(bytes4 _interfaceId) → bool public`

Checks whether this contract implements the interface defined by `interfaceId`.

#### Parameters:

- `_interfaceId`: Id of the interface

#### Return Values:

- true if this contract implements the interface
