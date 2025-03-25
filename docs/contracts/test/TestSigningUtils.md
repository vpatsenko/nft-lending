# `TestSigningUtils`

Wrapping the NFTfiSigningUtils library in a contract so it can be unit tested

## Functions:

- `getChainID() (public)`

- `isValidBorrowerSignature(struct LoanData.ListingTerms _listingTerms, struct LoanData.Signature _signature) (public)`

- `isValidLenderSignature(struct LoanData.Offer _offer, struct LoanData.Signature _signature) (public)`

- `isValidLenderRenegotiationSignature(uint32 _loanId, uint32 _newLoanDuration, uint256 _newMaximumRepaymentAmount, uint256 _renegotiationFee, struct LoanData.Signature _signature) (public)`

### Function `getChainID() → uint256 public`

### Function `isValidBorrowerSignature(struct LoanData.ListingTerms _listingTerms, struct LoanData.Signature _signature) → bool public`

### Function `isValidLenderSignature(struct LoanData.Offer _offer, struct LoanData.Signature _signature) → bool public`

### Function `isValidLenderRenegotiationSignature(uint32 _loanId, uint32 _newLoanDuration, uint256 _newMaximumRepaymentAmount, uint256 _renegotiationFee, struct LoanData.Signature _signature) → bool public`
