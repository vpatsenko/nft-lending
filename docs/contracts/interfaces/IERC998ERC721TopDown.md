# `IERC998ERC721TopDown`

## Functions:

- `onERC721Received(address _operator, address _from, uint256 _childTokenId, bytes _data) (external)`

- `transferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId) (external)`

- `safeTransferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId) (external)`

- `safeTransferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId, bytes _data) (external)`

- `transferChildToParent(uint256 _fromTokenId, address _toContract, uint256 _toTokenId, address _childContract, uint256 _childTokenId, bytes _data) (external)`

- `getChild(address _from, uint256 _tokenId, address _childContract, uint256 _childTokenId) (external)`

- `rootOwnerOf(uint256 _tokenId) (external)`

- `rootOwnerOfChild(address _childContract, uint256 _childTokenId) (external)`

- `ownerOfChild(address _childContract, uint256 _childTokenId) (external)`

## Events:

- `ReceivedChild(address _from, uint256 _tokenId, address _childContract, uint256 _childTokenId)`

- `TransferChild(uint256 tokenId, address _to, address _childContract, uint256 _childTokenId)`

### Function `onERC721Received(address _operator, address _from, uint256 _childTokenId, bytes _data) → bytes4 external`

### Function `transferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId) external`

### Function `safeTransferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId) external`

### Function `safeTransferChild(uint256 _fromTokenId, address _to, address _childContract, uint256 _childTokenId, bytes _data) external`

### Function `transferChildToParent(uint256 _fromTokenId, address _toContract, uint256 _toTokenId, address _childContract, uint256 _childTokenId, bytes _data) external`

### Function `getChild(address _from, uint256 _tokenId, address _childContract, uint256 _childTokenId) external`

### Function `rootOwnerOf(uint256 _tokenId) → bytes32 rootOwner external`

### Function `rootOwnerOfChild(address _childContract, uint256 _childTokenId) → bytes32 rootOwner external`

### Function `ownerOfChild(address _childContract, uint256 _childTokenId) → bytes32 parentTokenOwner, uint256 parentTokenId external`

### Event `ReceivedChild(address _from, uint256 _tokenId, address _childContract, uint256 _childTokenId)`

### Event `TransferChild(uint256 tokenId, address _to, address _childContract, uint256 _childTokenId)`
