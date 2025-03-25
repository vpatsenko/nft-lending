# `SmartNft`

An ERC721 token which represents a very basic implementation of the NFTfi V2 SmartNFT.

## Functions:

- `constructor(address _admin, address _nftfiHub, address _loanCoordinator, string _name, string _symbol, string _customBaseURI) (public)`

- `setLoanCoordinator(address _account) (external)`

- `mint(address _to, uint256 _tokenId, bytes _data) (external)`

- `burn(uint256 _tokenId) (external)`

- `setBaseURI(string _customBaseURI) (external)`

- `exists(uint256 _tokenId) (external)`

- `supportsInterface(bytes4 _interfaceId) (public)`

- `_setBaseURI(string _customBaseURI) (internal)`

- `_baseURI() (internal)`

- `_getChainID() (internal)`

### Function `constructor(address _admin, address _nftfiHub, address _loanCoordinator, string _name, string _symbol, string _customBaseURI) public`

Grants the contract the default admin role to `_admin`.

Grants LOAN_COORDINATOR_ROLE to `_loanCoordinator`.

#### Parameters:

- `_admin`: - Account to set as the admin of roles

- `_nftfiHub`: - Address of the NftfiHub contract

- `_loanCoordinator`: - Initial loan coordinator

- `_name`: - Name for the SmarNFT

- `_symbol`: - Symbol for the SmarNFT

- `_customBaseURI`: - Base URI for the SmarNFT

### Function `setLoanCoordinator(address _account) external`

Grants LOAN_COORDINATOR_ROLE to `_account`.

Requirements:

- the caller must have `role`'s admin role.

### Function `mint(address _to, uint256 _tokenId, bytes _data) external`

Mints a new token with `_tokenId` and assigne to `_to`.

Requirements:

- the caller must have `LOAN_COORDINATOR_ROLE` role.

#### Parameters:

- `_to`: The address reciving the SmartNft

- `_tokenId`: The id of the new SmartNft

- `_data`: Up to the first 32 bytes contains an integer which represents the loanId linked to the SmartNft

### Function `burn(uint256 _tokenId) external`

Burns `_tokenId` token.

Requirements:

- the caller must have `LOAN_COORDINATOR_ROLE` role.

### Function `setBaseURI(string _customBaseURI) external`

Sets baseURI.

#### Parameters:

- `_customBaseURI`: - Base URI for the SmarNFT

### Function `exists(uint256 _tokenId) → bool external`

### Function `supportsInterface(bytes4 _interfaceId) → bool public`

See {IERC165-supportsInterface}.

### Function `_setBaseURI(string _customBaseURI) internal`

Sets baseURI.

### Function `_baseURI() → string internal`

Base URI for computing {tokenURI}. If set, the resulting URI for each

token will be the concatenation of the `baseURI` and the `tokenId`.

### Function `_getChainID() → uint256 internal`

This function gets the current chain ID.
