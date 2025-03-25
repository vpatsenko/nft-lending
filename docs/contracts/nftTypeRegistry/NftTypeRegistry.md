# `NftTypeRegistry`

Registry for NFT Types supported by NFTfi.

Each NFT type is associated with the address of an NFT wrapper contract.

## Functions:

- `setNftType(bytes32 _nftType, address _nftWrapper) (external)`

- `setNftTypes(bytes32[] _nftTypes, address[] _nftWrappers) (external)`

- `getNftTypeWrapper(bytes32 _nftType) (external)`

- `_setNftType(bytes32 _nftType, address _nftWrapper) (internal)`

## Events:

- `TypeUpdated(bytes32 nftType, address nftWrapper)`

### Function `setNftType(bytes32 _nftType, address _nftWrapper) external`

Set or update the wrapper contract address for the given NFT Type.

Set address(0) for a nft type for un-register such type.

#### Parameters:

- `_nftType`: - The nft type, e.g. keccak256("ERC721"), or keccak256("ERC1155").

- `_nftWrapper`: - The address of the wrapper contract that implements INftWrapper behaviour for dealing with

NFTs.

### Function `setNftTypes(bytes32[] _nftTypes, address[] _nftWrappers) external`

Batch set or update the wrappers contract address for the given batch of NFT Types.

Set address(0) for a nft type for un-register such type.

#### Parameters:

- `_nftTypes`: - The nft types, e.g. keccak256("ERC721"), or keccak256("ERC1155").

- `_nftWrappers`: - The addresses of the wrapper contract that implements INftWrapper behaviour for dealing

with NFTs.

### Function `getNftTypeWrapper(bytes32 _nftType) → address external`

This function can be called by anyone to get the contract address that implements the given nft type.

#### Parameters:

- `_nftType`: - The nft type, e.g. keccak256("ERC721"), or keccak256("ERC1155").

### Function `_setNftType(bytes32 _nftType, address _nftWrapper) internal`

Set or update the wrapper contract address for the given NFT Type.

Set address(0) for a nft type for un-register such type.

#### Parameters:

- `_nftType`: - The nft type, e.g. keccak256("ERC721"), or keccak256("ERC1155").

- `_nftWrapper`: - The address of the wrapper contract that implements INftWrapper behaviour for dealing with

NFTs.

### Event `TypeUpdated(bytes32 nftType, address nftWrapper)`

This event is fired whenever the admins register a ntf type.

#### Parameters:

- `nftType`: - Nft type represented by keccak256('nft type').

- `nftWrapper`: - Address of the wrapper contract.
