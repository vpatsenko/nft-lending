# `NFTfiSigningUtils`

Helper contract for NFTfi. This contract manages verifying signatures from off-chain NFTfi orders.

Based on the version of this same contract used on NFTfi V1

## Functions:

- `getChainID() (public)`

- `isValidBorrowerSignature(struct LoanData.ListingTerms _listingTerms, struct LoanData.Signature _signature) (external)`

- `isValidBorrowerSignature(struct LoanData.ListingTerms _listingTerms, struct LoanData.Signature _signature, address _loanContract) (public)`

- `isValidBorrowerSignatureBundle(struct LoanData.ListingTerms _listingTerms, struct IBundleBuilder.BundleElements _bundleElements, struct LoanData.Signature _signature) (external)`

- `isValidBorrowerSignatureBundle(struct LoanData.ListingTerms _listingTerms, struct IBundleBuilder.BundleElements _bundleElements, struct LoanData.Signature _signature, address _loanContract) (public)`

- `isValidLenderSignature(struct LoanData.Offer _offer, struct LoanData.Signature _signature) (external)`

- `isValidLenderSignature(struct LoanData.Offer _offer, struct LoanData.Signature _signature, address _loanContract) (public)`

- `isValidLenderSignatureBundle(struct LoanData.Offer _offer, struct IBundleBuilder.BundleElements _bundleElements, struct LoanData.Signature _signature) (external)`

- `isValidLenderSignatureBundle(struct LoanData.Offer _offer, struct IBundleBuilder.BundleElements _bundleElements, struct LoanData.Signature _signature, address _loanContract) (public)`

- `isValidLenderRenegotiationSignature(uint256 _loanId, uint32 _newLoanDuration, uint256 _newMaximumRepaymentAmount, uint256 _renegotiationFee, struct LoanData.Signature _signature) (external)`

- `isValidLenderRenegotiationSignature(uint256 _loanId, uint32 _newLoanDuration, uint256 _newMaximumRepaymentAmount, uint256 _renegotiationFee, struct LoanData.Signature _signature, address _loanContract) (public)`

- `getEncodedListing(struct LoanData.ListingTerms _listingTerms) (internal)`

- `getEncodedOffer(struct LoanData.Offer _offer) (internal)`

- `getEncodedSignature(struct LoanData.Signature _signature) (internal)`

### Function `getChainID() → uint256 public`

This function gets the current chain ID.

### Function `isValidBorrowerSignature(struct LoanData.ListingTerms _listingTerms, struct LoanData.Signature _signature) → bool external`

/\*\*

This function is when the lender accepts a borrower's binding listing terms, to validate the lender's

signature that the borrower provided off-chain to verify that it did indeed made such listing.

#### Parameters:

- `_listingTerms`: - The listing terms struct containing:

- loanERC20Denomination: The address of the ERC20 contract of the currency being used as principal/interest

for this loan.

- minLoanPrincipalAmount: The minumum sum of money transferred from lender to borrower at the beginning of

the loan, measured in loanERC20Denomination's smallest units.

- maxLoanPrincipalAmount: The sum of money transferred from lender to borrower at the beginning of

the loan, measured in loanERC20Denomination's smallest units.

- maximumRepaymentAmount: The maximum amount of money that the borrower would be required to retrieve their

collateral, measured in the smallest units of the ERC20 currency used for the loan. The borrower will always have

to pay this amount to retrieve their collateral, regardless of whether they repay early.

- nftCollateralContract: The address of the ERC721 contract of the NFT collateral.

- nftCollateralId: The ID within the NFTCollateralContract for the NFT being used as collateral for this

loan. The NFT is stored within this contract during the duration of the loan.

- revenueSharePartner: The address of the partner that will receive the revenue share.

- minLoanDuration: The minumum amount of time (measured in seconds) that can elapse before the lender can

liquidate the loan and seize the underlying collateral NFT.

- maxLoanDuration: The maximum amount of time (measured in seconds) that can elapse before the lender can

liquidate the loan and seize the underlying collateral NFT.

- maxInterestRateForDurationInBasisPoints: This is maximum the interest rate (measured in basis points, e.g.

hundreths of a percent) for the loan, that must be repaid pro-rata by the borrower at the conclusion of the loan

or risk seizure of their nft collateral. Note if the type of the loan is fixed then this value is not used and

is irrelevant so it should be set to 0.

- referralFeeInBasisPoints: The percent (measured in basis points) of the loan principal amount that will be

taken as a fee to pay to the referrer, 0 if the lender is not paying referral fee.

- `_signature`: - The offer struct containing:

- signer: The address of the signer. The borrower for `acceptOffer` the lender for `acceptListing`.

- nonce: The nonce referred here is not the same as an Ethereum account's nonce.

We are referring instead to a nonce that is used by the lender or the borrower when they are first signing

off-chain NFTfi orders. These nonce can be any uint256 value that the user has not previously used to sign an

off-chain order. Each nonce can be used at most once per user within NFTfi, regardless of whether they are the

lender or the borrower in that situation. This serves two purposes:

- First, it prevents replay attacks where an attacker would submit a user's off-chain order more than once.

- Second, it allows a user to cancel an off-chain order by calling

NFTfi.cancelLoanCommitmentBeforeLoanHasBegun(), which marks the nonce as used and prevents any future loan from

using the user's off-chain order that contains that nonce.

- expiry: Date when the signature expires

- signature: The ECDSA signature of the borrower, obtained off-chain ahead of time, signing the following

combination of parameters:

- listingTerms.loanERC20Denomination,

- listingTerms.minLoanPrincipalAmount,

- listingTerms.maxLoanPrincipalAmount,

- listingTerms.nftCollateralContract,

- listingTerms.nftCollateralId,

- listingTerms.revenueSharePartner,

- listingTerms.minLoanDuration,

- listingTerms.maxLoanDuration,

- listingTerms.maxInterestRateForDurationInBasisPoints,

- listingTerms.referralFeeInBasisPoints,

- signature.signer,

- signature.nonce,

- signature.expiry,

- address of this contract

- chainId

/

### Function `isValidBorrowerSignature(struct LoanData.ListingTerms _listingTerms, struct LoanData.Signature _signature, address _loanContract) → bool public`

-

This function overload the previous function to allow the caller to specify the address of the contract

/

### Function `isValidBorrowerSignatureBundle(struct LoanData.ListingTerms _listingTerms, struct IBundleBuilder.BundleElements _bundleElements, struct LoanData.Signature _signature) → bool external`

-

This function is when the lender accepts a borrower's binding listing terms, to validate the lender's

signature that the borrower provided off-chain to verify that it did indeed made such listing.

#### Parameters:

- `_listingTerms`: - The listing terms struct containing:

- loanERC20Denomination: The address of the ERC20 contract of the currency being used as principal/interest

for this loan.

- minLoanPrincipalAmount: The minumum sum of money transferred from lender to borrower at the beginning of

the loan, measured in loanERC20Denomination's smallest units.

- maxLoanPrincipalAmount: The sum of money transferred from lender to borrower at the beginning of

the loan, measured in loanERC20Denomination's smallest units.

- maximumRepaymentAmount: The maximum amount of money that the borrower would be required to retrieve their

collateral, measured in the smallest units of the ERC20 currency used for the loan. The borrower will always have

to pay this amount to retrieve their collateral, regardless of whether they repay early.

- nftCollateralContract: The address of the ERC721 contract of the NFT collateral.

- nftCollateralId: The ID within the NFTCollateralContract for the NFT being used as collateral for this

loan. The NFT is stored within this contract during the duration of the loan.

- revenueSharePartner: The address of the partner that will receive the revenue share.

- minLoanDuration: The minumum amount of time (measured in seconds) that can elapse before the lender can

liquidate the loan and seize the underlying collateral NFT.

- maxLoanDuration: The maximum amount of time (measured in seconds) that can elapse before the lender can

liquidate the loan and seize the underlying collateral NFT.

- maxInterestRateForDurationInBasisPoints: This is maximum the interest rate (measured in basis points, e.g.

hundreths of a percent) for the loan, that must be repaid pro-rata by the borrower at the conclusion of the loan

or risk seizure of their nft collateral. Note if the type of the loan is fixed then this value is not used and

is irrelevant so it should be set to 0.

- referralFeeInBasisPoints: The percent (measured in basis points) of the loan principal amount that will be

taken as a fee to pay to the referrer, 0 if the lender is not paying referral fee.

- `_bundleElements`: - the lists of erc721-20-1155 tokens that are to be bundled

- `_signature`: - The offer struct containing:

- signer: The address of the signer. The borrower for `acceptOffer` the lender for `acceptListing`.

- nonce: The nonce referred here is not the same as an Ethereum account's nonce.

We are referring instead to a nonce that is used by the lender or the borrower when they are first signing

off-chain NFTfi orders. These nonce can be any uint256 value that the user has not previously used to sign an

off-chain order. Each nonce can be used at most once per user within NFTfi, regardless of whether they are the

lender or the borrower in that situation. This serves two purposes:

- First, it prevents replay attacks where an attacker would submit a user's off-chain order more than once.

- Second, it allows a user to cancel an off-chain order by calling

NFTfi.cancelLoanCommitmentBeforeLoanHasBegun(), which marks the nonce as used and prevents any future loan from

using the user's off-chain order that contains that nonce.

- expiry: Date when the signature expires

- signature: The ECDSA signature of the borrower, obtained off-chain ahead of time, signing the following

combination of parameters:

- listingTerms.loanERC20Denomination,

- listingTerms.minLoanPrincipalAmount,

- listingTerms.maxLoanPrincipalAmount,

- listingTerms.nftCollateralContract,

- listingTerms.nftCollateralId,

- listingTerms.revenueSharePartner,

- listingTerms.minLoanDuration,

- listingTerms.maxLoanDuration,

- listingTerms.maxInterestRateForDurationInBasisPoints,

- listingTerms.referralFeeInBasisPoints,

- bundleElements

- signature.signer,

- signature.nonce,

- signature.expiry,

- address of this contract

- chainId

/

### Function `isValidBorrowerSignatureBundle(struct LoanData.ListingTerms _listingTerms, struct IBundleBuilder.BundleElements _bundleElements, struct LoanData.Signature _signature, address _loanContract) → bool public`

This function overload the previous function to allow the caller to specify the address of the contract

/

### Function `isValidLenderSignature(struct LoanData.Offer _offer, struct LoanData.Signature _signature) → bool external`

This function is when the borrower accepts a lender's offer, to validate the lender's signature that the

lender provided off-chain to verify that it did indeed made such offer.

#### Parameters:

- `_offer`: - The offer struct containing:

- loanERC20Denomination: The address of the ERC20 contract of the currency being used as principal/interest

for this loan.

- loanPrincipalAmount: The original sum of money transferred from lender to borrower at the beginning of

the loan, measured in loanERC20Denomination's smallest units.

- maximumRepaymentAmount: The maximum amount of money that the borrower would be required to retrieve their

collateral, measured in the smallest units of the ERC20 currency used for the loan. The borrower will always have

to pay this amount to retrieve their collateral, regardless of whether they repay early.

- nftCollateralContract: The address of the ERC721 contract of the NFT collateral.

- nftCollateralId: The ID within the NFTCollateralContract for the NFT being used as collateral for this

loan. The NFT is stored within this contract during the duration of the loan.

- referrer: The address of the referrer who found the lender matching the listing, Zero address to signal

this there is no referrer.

- loanDuration: The amount of time (measured in seconds) that can elapse before the lender can liquidate the

loan and seize the underlying collateral NFT.

- loanInterestRateForDurationInBasisPoints: This is the interest rate (measured in basis points, e.g.

hundreths of a percent) for the loan, that must be repaid pro-rata by the borrower at the conclusion of the loan

or risk seizure of their nft collateral. Note if the type of the loan is fixed then this value is not used and

is irrelevant so it should be set to 0.

- loanAdminFeeInBasisPoints: The percent (measured in basis points) of the interest earned that will be

taken as a fee by the contract admins when the loan is repaid. The fee is stored in the loan struct to prevent an

attack where the contract admins could adjust the fee right before a loan is repaid, and take all of the interest

earned.

- `_signature`: - The signature structure containing:

- signer: The address of the signer. The borrower for `acceptOffer` the lender for `acceptListing`.

- nonce: The nonce referred here is not the same as an Ethereum account's nonce.

We are referring instead to a nonce that is used by the lender or the borrower when they are first signing

off-chain NFTfi orders. These nonce can be any uint256 value that the user has not previously used to sign an

off-chain order. Each nonce can be used at most once per user within NFTfi, regardless of whether they are the

lender or the borrower in that situation. This serves two purposes:

- First, it prevents replay attacks where an attacker would submit a user's off-chain order more than once.

- Second, it allows a user to cancel an off-chain order by calling

NFTfi.cancelLoanCommitmentBeforeLoanHasBegun(), which marks the nonce as used and prevents any future loan from

using the user's off-chain order that contains that nonce.

- expiry: Date when the signature expires

- signature: The ECDSA signature of the lender, obtained off-chain ahead of time, signing the following

combination of parameters:

- offer.loanERC20Denomination

- offer.loanPrincipalAmount

- offer.maximumRepaymentAmount

- offer.nftCollateralContract

- offer.nftCollateralId

- offer.referrer

- offer.loanDuration

- offer.loanAdminFeeInBasisPoints

- signature.signer,

- signature.nonce,

- signature.expiry,

- address of this contract

- chainId

/

### Function `isValidLenderSignature(struct LoanData.Offer _offer, struct LoanData.Signature _signature, address _loanContract) → bool public`

This function overload the previous function to allow the caller to specify the address of the contract

/

### Function `isValidLenderSignatureBundle(struct LoanData.Offer _offer, struct IBundleBuilder.BundleElements _bundleElements, struct LoanData.Signature _signature) → bool external`

This function is when the borrower accepts a lender's offer, to validate the lender's signature that the

lender provided off-chain to verify that it did indeed made such offer.

#### Parameters:

- `_offer`: - The offer struct containing:

- loanERC20Denomination: The address of the ERC20 contract of the currency being used as principal/interest

for this loan.

- loanPrincipalAmount: The original sum of money transferred from lender to borrower at the beginning of

the loan, measured in loanERC20Denomination's smallest units.

- maximumRepaymentAmount: The maximum amount of money that the borrower would be required to retrieve their

collateral, measured in the smallest units of the ERC20 currency used for the loan. The borrower will always have

to pay this amount to retrieve their collateral, regardless of whether they repay early.

- nftCollateralContract: The address of the ERC721 contract of the NFT collateral.

- nftCollateralId: The ID within the NFTCollateralContract for the NFT being used as collateral for this

loan. The NFT is stored within this contract during the duration of the loan.

- referrer: The address of the referrer who found the lender matching the listing, Zero address to signal

this there is no referrer.

- loanDuration: The amount of time (measured in seconds) that can elapse before the lender can liquidate the

loan and seize the underlying collateral NFT.

- loanInterestRateForDurationInBasisPoints: This is the interest rate (measured in basis points, e.g.

hundreths of a percent) for the loan, that must be repaid pro-rata by the borrower at the conclusion of the loan

or risk seizure of their nft collateral. Note if the type of the loan is fixed then this value is not used and

is irrelevant so it should be set to 0.

- loanAdminFeeInBasisPoints: The percent (measured in basis points) of the interest earned that will be

taken as a fee by the contract admins when the loan is repaid. The fee is stored in the loan struct to prevent an

attack where the contract admins could adjust the fee right before a loan is repaid, and take all of the interest

earned.

- `_bundleElements`: - the lists of erc721-20-1155 tokens that are to be bundled

- `_signature`: - The signature structure containing:

- signer: The address of the signer. The borrower for `acceptOffer` the lender for `acceptListing`.

- nonce: The nonce referred here is not the same as an Ethereum account's nonce.

We are referring instead to a nonce that is used by the lender or the borrower when they are first signing

off-chain NFTfi orders. These nonce can be any uint256 value that the user has not previously used to sign an

off-chain order. Each nonce can be used at most once per user within NFTfi, regardless of whether they are the

lender or the borrower in that situation. This serves two purposes:

- First, it prevents replay attacks where an attacker would submit a user's off-chain order more than once.

- Second, it allows a user to cancel an off-chain order by calling

NFTfi.cancelLoanCommitmentBeforeLoanHasBegun(), which marks the nonce as used and prevents any future loan from

using the user's off-chain order that contains that nonce.

- expiry: Date when the signature expires

- signature: The ECDSA signature of the lender, obtained off-chain ahead of time, signing the following

combination of parameters:

- offer.loanERC20Denomination

- offer.loanPrincipalAmount

- offer.maximumRepaymentAmount

- offer.nftCollateralContract

- offer.nftCollateralId

- offer.referrer

- offer.loanDuration

- offer.loanAdminFeeInBasisPoints

- bundleElements

- signature.signer,

- signature.nonce,

- signature.expiry,

- address of this contract

- chainId

/

### Function `isValidLenderSignatureBundle(struct LoanData.Offer _offer, struct IBundleBuilder.BundleElements _bundleElements, struct LoanData.Signature _signature, address _loanContract) → bool public`

This function overload the previous function to allow the caller to specify the address of the contract

/

### Function `isValidLenderRenegotiationSignature(uint256 _loanId, uint32 _newLoanDuration, uint256 _newMaximumRepaymentAmount, uint256 _renegotiationFee, struct LoanData.Signature _signature) → bool external`

This function is called in renegotiateLoan() to validate the lender's signature that the lender provided

off-chain to verify that they did indeed want to agree to this loan renegotiation according to these terms.

#### Parameters:

- `_loanId`: - The unique identifier for the loan to be renegotiated

- `_newLoanDuration`: - The new amount of time (measured in seconds) that can elapse before the lender can

liquidate the loan and seize the underlying collateral NFT.

- `_newMaximumRepaymentAmount`: - The new maximum amount of money that the borrower would be required to

retrieve their collateral, measured in the smallest units of the ERC20 currency used for the loan. The

borrower will always have to pay this amount to retrieve their collateral, regardless of whether they repay

early.

- `_renegotiationFee`: Agreed upon fee in ether that borrower pays for the lender for the renegitiation

- `_signature`: - The signature structure containing:

- signer: The address of the signer. The borrower for `acceptOffer` the lender for `acceptListing`.

- nonce: The nonce referred here is not the same as an Ethereum account's nonce.

We are referring instead to a nonce that is used by the lender or the borrower when they are first signing

off-chain NFTfi orders. These nonce can be any uint256 value that the user has not previously used to sign an

off-chain order. Each nonce can be used at most once per user within NFTfi, regardless of whether they are the

lender or the borrower in that situation. This serves two purposes:

- First, it prevents replay attacks where an attacker would submit a user's off-chain order more than once.

- Second, it allows a user to cancel an off-chain order by calling NFTfi.cancelLoanCommitmentBeforeLoanHasBegun()

, which marks the nonce as used and prevents any future loan from using the user's off-chain order that contains

that nonce.

- expiry - The date when the renegotiation offer expires

- lenderSignature - The ECDSA signature of the lender, obtained off-chain ahead of time, signing the

following combination of parameters:

- \_loanId

- \_newLoanDuration

- \_newMaximumRepaymentAmount

- \_lender

- \_lenderNonce

- \_expiry

- address of this contract

- chainId

/

### Function `isValidLenderRenegotiationSignature(uint256 _loanId, uint32 _newLoanDuration, uint256 _newMaximumRepaymentAmount, uint256 _renegotiationFee, struct LoanData.Signature _signature, address _loanContract) → bool public`

This function overload the previous function to allow the caller to specify the address of the contract

/

### Function `getEncodedListing(struct LoanData.ListingTerms _listingTerms) → bytes internal`

We need this to avoid stack too deep errors.

/

### Function `getEncodedOffer(struct LoanData.Offer _offer) → bytes internal`

We need this to avoid stack too deep errors.

/

### Function `getEncodedSignature(struct LoanData.Signature _signature) → bytes internal`

We need this to avoid stack too deep errors.

/
