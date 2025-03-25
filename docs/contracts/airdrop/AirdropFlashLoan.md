# `AirdropFlashLoan`

## Functions:

- `constructor(address _nftfiHub) (public)`

- `pullAirdrop(address _nftCollateralContract, uint256 _nftCollateralId, address _nftWrapper, address _target, bytes _data, address _nftAirdrop, uint256 _nftAirdropId, bool _is1155, uint256 _nftAirdropAmount, address _beneficiary) (external)`

- `supportsInterface(bytes4 _interfaceId) (public)`

- `_transferNFT(address _nftWrapper, address _sender, address _recipient, address _nftCollateralContract, uint256 _nftCollateralId) (internal)`

- `_getSelector(bytes _data) (internal)`

### Function `constructor(address _nftfiHub) public`

### Function `pullAirdrop(address _nftCollateralContract, uint256 _nftCollateralId, address _nftWrapper, address _target, bytes _data, address _nftAirdrop, uint256 _nftAirdropId, bool _is1155, uint256 _nftAirdropAmount, address _beneficiary) external`

### Function `supportsInterface(bytes4 _interfaceId) → bool public`

See {IERC165-supportsInterface}.

### Function `_transferNFT(address _nftWrapper, address _sender, address _recipient, address _nftCollateralContract, uint256 _nftCollateralId) internal`

### Function `_getSelector(bytes _data) → bytes4 selector internal`
