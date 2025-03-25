# `TestSignerContract`

Test implementation of a signing contract

## Functions:

- `constructor(address _admin) (public)`

- `isValidSignature(bytes32 _hash, bytes _signature) (external)`

- `approveNFT(address _token, address _to, uint256 _tokenId) (external)`

- `approveERC20(address _token, address _to, uint256 _amount) (external)`

- `liquidateOverdueLoan(address _loanContract, uint32 _loanId) (external)`

### Function `constructor(address _admin) public`

### Function `isValidSignature(bytes32 _hash, bytes _signature) → bytes4 external`

### Function `approveNFT(address _token, address _to, uint256 _tokenId) external`

### Function `approveERC20(address _token, address _to, uint256 _amount) external`

### Function `liquidateOverdueLoan(address _loanContract, uint32 _loanId) external`
