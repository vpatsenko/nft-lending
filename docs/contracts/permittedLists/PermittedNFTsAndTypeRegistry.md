# `PermittedNFTsAndTypeRegistry`

Registry for NFT contracts supported by NFTfi.

Each NFT is associated with an NFT Type.

## Modifiers:

- `onlyOwnerOrAirdropFactory(string _nftType)`

## Functions:

- `constructor(address _admin, address _nftfiHub, string[] _definedNftTypes, address[] _definedNftWrappers, address[] _permittedNftContracts, string[] _permittedNftTypes) (public)`

- `setNFTPermit(address _nftContract, string _nftType) (external)`

- `setNFTPermits(address[] _nftContracts, string[] _nftTypes) (external)`

- `getNFTPermit(address _nftContract) (external)`

- `getNFTWrapper(address _nftContract) (external)`

- `setNftType(string _nftType, address _nftWrapper) (external)`

- `setNftTypes(string[] _nftTypes, address[] _nftWrappers) (external)`

- `getNftTypeWrapper(bytes32 _nftType) (public)`

- `_setNftType(string _nftType, address _nftWrapper) (internal)`

- `_setNftTypes(string[] _nftTypes, address[] _nftWrappers) (internal)`

- `_setNFTPermit(address _nftContract, string _nftType) (internal)`

- `_setNFTPermits(address[] _nftContracts, string[] _nftTypes) (internal)`

## Events:

- `TypeUpdated(bytes32 nftType, address nftWrapper)`

- `NFTPermit(address nftContract, bytes32 nftType)`

### Modifier `onlyOwnerOrAirdropFactory(string _nftType)`

Throws if called by any account other than the owner.

### Function `constructor(address _admin, address _nftfiHub, string[] _definedNftTypes, address[] _definedNftWrappers, address[] _permittedNftContracts, string[] _permittedNftTypes) public`

Sets `nftTypeRegistry`

Initialize `nftPermits` with a batch of permitted NFTs

#### Parameters:

- `_admin`: - Initial admin of this contract.

- `_nftfiHub`: - Address of the NftfiHub contract

- `_definedNftTypes`: - All the ossible nft types

- `_definedNftWrappers`: - All the possible wrappers for the types

- `_permittedNftContracts`: - The addresses of the NFT contracts.

- `_permittedNftTypes`: - The NFT Types. e.g. "CRYPTO_KITTIES"

- "" means "disable this permit"

- != "" means "enable permit with the given NFT Type"

### Function `setNFTPermit(address _nftContract, string _nftType) external`

This function can be called by admins to change the permitted list status of an NFT contract. This

includes both adding an NFT contract to the permitted list and removing it.

`_nftContract` can not be zero address.

#### Parameters:

- `_nftContract`: - The address of the NFT contract.

- `_nftType`: - The NFT Type. e.g. "CRYPTO_KITTIES"

- "" means "disable this permit"

- != "" means "enable permit with the given NFT Type"

### Function `setNFTPermits(address[] _nftContracts, string[] _nftTypes) external`

This function can be called by admins to change the permitted list status of a batch NFT contracts. This

includes both adding an NFT contract to the permitted list and removing it.

`_nftContract` can not be zero address.

#### Parameters:

- `_nftContracts`: - The addresses of the NFT contracts.

- `_nftTypes`: - The NFT Types. e.g. "CRYPTO_KITTIES"

- "" means "disable this permit"

- != "" means "enable permit with the given NFT Type"

### Function `getNFTPermit(address _nftContract) → bytes32 external`

This function can be called by anyone to lookup the Nft Type associated with the contract.

Returns the NFT Type:

- bytes32("") means "not permitted"

- != bytes32("") means "permitted with the given NFT Type"

#### Parameters:

- `_nftContract`: - The address of the NFT contract.

### Function `getNFTWrapper(address _nftContract) → address external`

This function can be called by anyone to lookup the address of the NftWrapper associated to the

`_nftContract` type.

#### Parameters:

- `_nftContract`: - The address of the NFT contract.

### Function `setNftType(string _nftType, address _nftWrapper) external`

Set or update the wrapper contract address for the given NFT Type.

Set address(0) for a nft type for un-register such type.

#### Parameters:

- `_nftType`: - The nft type, e.g. "ERC721", or "ERC1155".

- `_nftWrapper`: - The address of the wrapper contract that implements INftWrapper behaviour for dealing with

NFTs.

### Function `setNftTypes(string[] _nftTypes, address[] _nftWrappers) external`

Batch set or update the wrappers contract address for the given batch of NFT Types.

Set address(0) for a nft type for un-register such type.

#### Parameters:

- `_nftTypes`: - The nft types, e.g. "ERC721", or "ERC1155".

- `_nftWrappers`: - The addresses of the wrapper contract that implements INftWrapper behaviour for dealing

with NFTs.

### Function `getNftTypeWrapper(bytes32 _nftType) → address public`

This function can be called by anyone to get the contract address that implements the given nft type.

#### Parameters:

- `_nftType`: - The nft type, e.g. bytes32("ERC721"), or bytes32("ERC1155").

### Function `_setNftType(string _nftType, address _nftWrapper) internal`

Set or update the wrapper contract address for the given NFT Type.

Set address(0) for a nft type for un-register such type.

#### Parameters:

- `_nftType`: - The nft type, e.g. "ERC721", or "ERC1155".

- `_nftWrapper`: - The address of the wrapper contract that implements INftWrapper behaviour for dealing with

NFTs.

### Function `_setNftTypes(string[] _nftTypes, address[] _nftWrappers) internal`

Batch set or update the wrappers contract address for the given batch of NFT Types.

Set address(0) for a nft type for un-register such type.

#### Parameters:

- `_nftTypes`: - The nft types, e.g. keccak256("ERC721"), or keccak256("ERC1155").

- `_nftWrappers`: - The addresses of the wrapper contract that implements INftWrapper behaviour for dealing

with NFTs.

### Function `_setNFTPermit(address _nftContract, string _nftType) internal`

This function changes the permitted list status of an NFT contract. This includes both adding an NFT

contract to the permitted list and removing it.

#### Parameters:

- `_nftContract`: - The address of the NFT contract.

- `_nftType`: - The NFT Type. e.g. bytes32("CRYPTO_KITTIES")

- bytes32("") means "disable this permit"

- != bytes32("") means "enable permit with the given NFT Type"

### Function `_setNFTPermits(address[] _nftContracts, string[] _nftTypes) internal`

This function changes the permitted list status of a batch NFT contracts. This includes both adding an

NFT contract to the permitted list and removing it.

#### Parameters:

- `_nftContracts`: - The addresses of the NFT contracts.

- `_nftTypes`: - The NFT Types. e.g. "CRYPTO_KITTIES"

- "" means "disable this permit"

- != "" means "enable permit with the given NFT Type"

### Event `TypeUpdated(bytes32 nftType, address nftWrapper)`

This event is fired whenever the admins register a ntf type.

#### Parameters:

- `nftType`: - Nft type represented by keccak256('nft type').

- `nftWrapper`: - Address of the wrapper contract.

### Event `NFTPermit(address nftContract, bytes32 nftType)`

This event is fired whenever the admin sets a NFT's permit.

#### Parameters:

- `nftContract`: - Address of the NFT contract.

- `nftType`: - NTF type e.g. bytes32("CRYPTO_KITTIES")
