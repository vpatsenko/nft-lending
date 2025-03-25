# `PermittedNFTs`

Registry for NFT contracts supported by NFTfi.

Each NFT is associated with an NFT Type.

## Functions:

- `constructor(address _nftTypeRegistry, address[] _nftContracts, bytes32[] _nftTypes) (public)`

- `setNFTPermit(address _nftContract, bytes32 _nftType) (external)`

- `setNFTPermits(address[] _nftContracts, bytes32[] _nftTypes) (external)`

- `getNFTPermit(address _nftContract) (external)`

- `getNFTWrapper(address _nftContract) (external)`

- `_setNFTPermit(address _nftContract, bytes32 _nftType) (internal)`

- `_setNFTPermits(address[] _nftContracts, bytes32[] _nftTypes) (internal)`

## Events:

- `NFTPermit(address nftContract, bytes32 nftType)`

### Function `constructor(address _nftTypeRegistry, address[] _nftContracts, bytes32[] _nftTypes) public`

Sets `nftTypeRegistry`

Initialize `nftPermits` with a batch of permitted NFTs

#### Parameters:

- `_nftTypeRegistry`: - NftTypeRegistry address

- `_nftContracts`: - The addresses of the NFT contracts.

- `_nftTypes`: - The NFT Types. e.g. bytes32("CRYPTO_KITTIES")

- bytes32("") means "disable this permit"

- != bytes32("") means "enable permit with the given NFT Type"

### Function `setNFTPermit(address _nftContract, bytes32 _nftType) external`

This function can be called by admins to change the permitted list status of an NFT contract. This

includes both adding an NFT contract to the permitted list and removing it.

`_nftContract` can not be zero address.

#### Parameters:

- `_nftContract`: - The address of the NFT contract.

- `_nftType`: - The NFT Type. e.g. bytes32("CRYPTO_KITTIES")

- bytes32("") means "disable this permit"

- != bytes32("") means "enable permit with the given NFT Type"

### Function `setNFTPermits(address[] _nftContracts, bytes32[] _nftTypes) external`

This function can be called by admins to change the permitted list status of a batch NFT contracts. This

includes both adding an NFT contract to the permitted list and removing it.

`_nftContract` can not be zero address.

#### Parameters:

- `_nftContracts`: - The addresses of the NFT contracts.

- `_nftTypes`: - The NFT Types. e.g. bytes32("CRYPTO_KITTIES")

- bytes32("") means "disable this permit"

- != bytes32("") means "enable permit with the given NFT Type"

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

### Function `_setNFTPermit(address _nftContract, bytes32 _nftType) internal`

This function changes the permitted list status of an NFT contract. This includes both adding an NFT

contract to the permitted list and removing it.

#### Parameters:

- `_nftContract`: - The address of the NFT contract.

- `_nftType`: - The NFT Type. e.g. bytes32("CRYPTO_KITTIES")

- bytes32("") means "disable this permit"

- != bytes32("") means "enable permit with the given NFT Type"

### Function `_setNFTPermits(address[] _nftContracts, bytes32[] _nftTypes) internal`

This function changes the permitted list status of a batch NFT contracts. This includes both adding an

NFT contract to the permitted list and removing it.

#### Parameters:

- `_nftContracts`: - The addresses of the NFT contracts.

- `_nftTypes`: - The NFT Types. e.g. bytes32("CRYPTO_KITTIES")

- bytes32("") means "disable this permit"

- != bytes32("") means "enable permit with the given NFT Type"

### Event `NFTPermit(address nftContract, bytes32 nftType)`

This event is fired whenever the admin sets a NFT's permit.

#### Parameters:

- `nftContract`: - Address of the NFT contract.

- `nftType`: - NTF type e.g. keccak256("CRYPTO_KITTIES")
