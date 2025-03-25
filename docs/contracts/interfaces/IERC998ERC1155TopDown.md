# `IERC998ERC1155TopDown`

## Functions:

- `safeTransferChild(uint256 fromTokenId, address to, address childContract, uint256 childTokenId, uint256 amount, bytes data) (external)`

- `safeBatchTransferChild(uint256 fromTokenId, address to, address childContract, uint256[] childTokenIds, uint256[] amounts, bytes data) (external)`

- `childBalance(uint256 tokenId, address childContract, uint256 childTokenId) (external)`

## Events:

- `Received1155Child(address from, uint256 toTokenId, address childContract, uint256 childTokenId, uint256 amount)`

- `Transfer1155Child(uint256 fromTokenId, address to, address childContract, uint256 childTokenId, uint256 amount)`

- `Transfer1155BatchChild(uint256 fromTokenId, address to, address childContract, uint256[] childTokenIds, uint256[] amounts)`

### Function `safeTransferChild(uint256 fromTokenId, address to, address childContract, uint256 childTokenId, uint256 amount, bytes data) external`

### Function `safeBatchTransferChild(uint256 fromTokenId, address to, address childContract, uint256[] childTokenIds, uint256[] amounts, bytes data) external`

### Function `childBalance(uint256 tokenId, address childContract, uint256 childTokenId) → uint256 external`

### Event `Received1155Child(address from, uint256 toTokenId, address childContract, uint256 childTokenId, uint256 amount)`

### Event `Transfer1155Child(uint256 fromTokenId, address to, address childContract, uint256 childTokenId, uint256 amount)`

### Event `Transfer1155BatchChild(uint256 fromTokenId, address to, address childContract, uint256[] childTokenIds, uint256[] amounts)`
