# `ERC998ERC20Extension`

ERC998TopDown extension to support ERC20 children

## Functions:

- `balanceOfERC20(uint256 _tokenId, address _erc20Contract) (external)`

- `erc20ContractByIndex(uint256 _tokenId, uint256 _index) (external)`

- `totalERC20Contracts(uint256 _tokenId) (external)`

- `supportsInterface(bytes4 _interfaceId) (public)`

- `transferERC20(uint256 _tokenId, address _to, address _erc20Contract, uint256 _value) (external)`

- `getERC20(address, uint256, address, uint256) (external)`

- `transferERC223(uint256, address, address, uint256, bytes) (external)`

- `tokenFallback(address, uint256, bytes) (external)`

- `_getERC20(address _from, uint256 _tokenId, address _erc20Contract, uint256 _value) (internal)`

- `_validateERC20Value(uint256 _value) (internal)`

- `_validateERC20Transfer(uint256 _fromTokenId) (internal)`

- `_receiveErc20Child(address _from, uint256 _tokenId, address _erc20Contract, uint256 _value) (internal)`

- `_removeERC20(uint256 _tokenId, address _erc20Contract, uint256 _value) (internal)`

### Function `balanceOfERC20(uint256 _tokenId, address _erc20Contract) → uint256 external`

Look up the balance of ERC20 tokens for a specific token and ERC20 contract

#### Parameters:

- `_tokenId`: The token that owns the ERC20 tokens

- `_erc20Contract`: The ERC20 contract

#### Return Values:

- The number of ERC20 tokens owned by a token

### Function `erc20ContractByIndex(uint256 _tokenId, uint256 _index) → address external`

Get ERC20 contract by tokenId and index

#### Parameters:

- `_tokenId`: The parent token of ERC20 tokens

- `_index`: The index position of the child contract

#### Return Values:

- childContract The contract found at the tokenId and index

### Function `totalERC20Contracts(uint256 _tokenId) → uint256 external`

Get the total number of ERC20 tokens owned by tokenId

#### Parameters:

- `_tokenId`: The parent token of ERC20 tokens

#### Return Values:

- uint256 The total number of ERC20 tokens

### Function `supportsInterface(bytes4 _interfaceId) → bool public`

See {IERC165-supportsInterface}.

### Function `transferERC20(uint256 _tokenId, address _to, address _erc20Contract, uint256 _value) external`

Transfer ERC20 tokens to address

#### Parameters:

- `_tokenId`: The token to transfer from

- `_to`: The address to send the ERC20 tokens to

- `_erc20Contract`: The ERC20 contract

- `_value`: The number of ERC20 tokens to transfer

### Function `getERC20(address, uint256, address, uint256) external`

Get ERC20 tokens from ERC20 contract.

This contract has to be approved first by \_erc20Contract

### Function `transferERC223(uint256, address, address, uint256, bytes) external`

NOT SUPPORTED

Intended to transfer ERC223 tokens. ERC223 tokens can be transferred as regular ERC20

### Function `tokenFallback(address, uint256, bytes) external`

NOT SUPPORTED

Intended to receive ERC223 tokens. ERC223 tokens can be deposited as regular ERC20

### Function `_getERC20(address _from, uint256 _tokenId, address _erc20Contract, uint256 _value) internal`

Get ERC20 tokens from ERC20 contract.

This contract has to be approved first by \_erc20Contract

#### Parameters:

- `_from`: The current owner address of the ERC20 tokens that are being transferred.

- `_tokenId`: The token to transfer the ERC20 tokens to.

- `_erc20Contract`: The ERC20 token contract

- `_value`: The number of ERC20 tokens to transfer

### Function `_validateERC20Value(uint256 _value) internal`

Validates the value of a ERC20 transfer

#### Parameters:

- `_value`: The number of ERC20 tokens to transfer

### Function `_validateERC20Transfer(uint256 _fromTokenId) internal`

Validates the transfer of a ERC20

#### Parameters:

- `_fromTokenId`: The owning token to transfer from

### Function `_receiveErc20Child(address _from, uint256 _tokenId, address _erc20Contract, uint256 _value) internal`

Store data for the received ERC20

#### Parameters:

- `_from`: The current owner address of the ERC20 tokens that are being transferred.

- `_tokenId`: The token to transfer the ERC20 tokens to.

- `_erc20Contract`: The ERC20 token contract

- `_value`: The number of ERC20 tokens to transfer

### Function `_removeERC20(uint256 _tokenId, address _erc20Contract, uint256 _value) internal`

Updates the state to remove ERC20 tokens

#### Parameters:

- `_tokenId`: The token to transfer from

- `_erc20Contract`: The ERC20 contract

- `_value`: The number of ERC20 tokens to transfer
