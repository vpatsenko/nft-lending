# `IBundleBuilder`

## Functions:

- `buildBundle(struct IBundleBuilder.BundleElements _bundleElements, address _sender, address _receiver) (external)`

- `decomposeBundle(uint256 _tokenId, address _receiver) (external)`

### Function `buildBundle(struct IBundleBuilder.BundleElements _bundleElements, address _sender, address _receiver) → uint256 external`

used by the loan contract to build a bundle from the BundleElements struct at the beginning of a loan,

returns the id of the created bundle

#### Parameters:

- `_bundleElements`: - the lists of erc721-20-1155 tokens that are to be bundled

- `_sender`: sender of the tokens in the bundle - the borrower

- `_receiver`: receiver of the created bundle, normally the loan contract

### Function `decomposeBundle(uint256 _tokenId, address _receiver) external`

Remove all the children from the bundle

This method may run out of gas if the list of children is too big. In that case, children can be removed

     individually.

#### Parameters:

- `_tokenId`: the id of the bundle

- `_receiver`: address of the receiver of the children
