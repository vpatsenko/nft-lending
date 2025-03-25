# `TestCryptoKitties`

Test contract with CryptoKitties ERC721 related functionalities.

Extracted from https://etherscan.io/address/0x06012c8cf97bead5deae237070f9587f8e7a266d#code

## Functions:

- `supportsInterface(bytes4 _interfaceID) (external)`

- `balanceOf(address _owner) (public)`

- `mint(address _owner) (external)`

- `transfer(address _to, uint256 _tokenId) (external)`

- `approve(address _to, uint256 _tokenId) (external)`

- `transferFrom(address _from, address _to, uint256 _tokenId) (external)`

- `totalSupply() (public)`

- `ownerOf(uint256 _tokenId) (external)`

- `tokensOfOwner(address _owner) (external)`

- `_transfer(address _from, address _to, uint256 _tokenId) (internal)`

- `_createKitty(uint256 _matronId, uint256 _sireId, uint256 _generation, uint256 _genes, address _owner) (internal)`

- `_owns(address _claimant, uint256 _tokenId) (internal)`

- `_approvedFor(address _claimant, uint256 _tokenId) (internal)`

- `_approve(uint256 _tokenId, address _approved) (internal)`

## Events:

- `Birth(address owner, uint256 kittyId, uint256 matronId, uint256 sireId, uint256 genes)`

### Function `supportsInterface(bytes4 _interfaceID) → bool external`

Introspection interface as per ERC-165 (https://github.com/ethereum/EIPs/issues/165).

Returns true for any standardized interfaces implemented by this contract. We implement

ERC-165 (obviously!) and ERC-721.

### Function `balanceOf(address _owner) → uint256 count public`

Returns the number of Kitties owned by a specific address.

Required for ERC-721 compliance

#### Parameters:

- `_owner`: The owner address to check.

### Function `mint(address _owner) → uint256 external`

### Function `transfer(address _to, uint256 _tokenId) external`

Transfers a Kitty to another address. If transferring to a smart

contract be VERY CAREFUL to ensure that it is aware of ERC-721 (or

CryptoKitties specifically) or your Kitty may be lost forever. Seriously.

Required for ERC-721 compliance.

#### Parameters:

- `_to`: The address of the recipient, can be a user or contract.

- `_tokenId`: The ID of the Kitty to transfer.

### Function `approve(address _to, uint256 _tokenId) external`

Grant another address the right to transfer a specific Kitty via

transferFrom(). This is the preferred flow for transfering NFTs to contracts.

Required for ERC-721 compliance.

#### Parameters:

- `_to`: The address to be granted transfer approval. Pass address(0) to

clear all approvals.

- `_tokenId`: The ID of the Kitty that can be transferred if this call succeeds.

### Function `transferFrom(address _from, address _to, uint256 _tokenId) external`

Transfer a Kitty owned by another address, for which the calling address

has previously been granted transfer approval by the owner.

Required for ERC-721 compliance.

#### Parameters:

- `_from`: The address that owns the Kitty to be transfered.

- `_to`: The address that should take ownership of the Kitty. Can be any address,

including the caller.

- `_tokenId`: The ID of the Kitty to be transferred.

### Function `totalSupply() → uint256 public`

Returns the total number of Kitties currently in existence.

Required for ERC-721 compliance.

### Function `ownerOf(uint256 _tokenId) → address owner external`

Returns the address currently assigned ownership of a given Kitty.

Required for ERC-721 compliance.

### Function `tokensOfOwner(address _owner) → uint256[] ownerTokens external`

Returns a list of all Kitty IDs assigned to an address.

This method MUST NEVER be called by smart contract code. First, it's fairly

expensive (it walks the entire Kitty array looking for cats belonging to owner),

but it also returns a dynamic array, which is only supported for web3 calls, and

not contract-to-contract calls.

#### Parameters:

- `_owner`: The owner whose Kitties we are interested in.

### Function `_transfer(address _from, address _to, uint256 _tokenId) internal`

Assigns ownership of a specific Kitty to an address.

### Function `_createKitty(uint256 _matronId, uint256 _sireId, uint256 _generation, uint256 _genes, address _owner) → uint256 internal`

An internal method that creates a new kitty and stores it. This

method doesn't do any checking and should only be called when the

input data is known to be valid. Will generate both a Birth event

and a Transfer event.

#### Parameters:

- `_matronId`: The kitty ID of the matron of this cat (zero for gen0)

- `_sireId`: The kitty ID of the sire of this cat (zero for gen0)

- `_generation`: The generation number of this cat, must be computed by caller.

- `_genes`: The kitty's genetic code.

- `_owner`: The inital owner of this cat, must be non-zero (except for the unKitty, ID 0)

### Function `_owns(address _claimant, uint256 _tokenId) → bool internal`

Checks if a given address is the current owner of a particular Kitty.

#### Parameters:

- `_claimant`: the address we are validating against.

- `_tokenId`: kitten id, only valid when > 0

### Function `_approvedFor(address _claimant, uint256 _tokenId) → bool internal`

Checks if a given address currently has transferApproval for a particular Kitty.

#### Parameters:

- `_claimant`: the address we are confirming kitten is approved for.

- `_tokenId`: kitten id, only valid when > 0

### Function `_approve(uint256 _tokenId, address _approved) internal`

Marks an address as being approved for transferFrom(), overwriting any previous

approval. Setting \_approved to address(0) clears all transfer approval.

NOTE: \_approve() does NOT send the Approval event. This is intentional because

\_approve() and transferFrom() are used together for putting Kitties on auction, and

there is no value in spamming the log with Approval events in that case.

### Event `Birth(address owner, uint256 kittyId, uint256 matronId, uint256 sireId, uint256 genes)`

The Birth event is fired whenever a new kitten comes into existence. This obviously

includes any time a cat is created through the giveBirth method, but it is also called

when a new gen0 cat is created.
