# `DirectLoanBase`

Main contract for NFTfi Direct Loans Type. This contract manages the ability to create NFT-backed

peer-to-peer loans.

There are two ways to commence an NFT-backed loan:

a. The borrower accepts a lender's offer by calling `acceptOffer`.

1. the borrower calls nftContract.approveAll(NFTfi), approving the NFTfi contract to move their NFT's on their

be1alf.

2. the lender calls erc20Contract.approve(NFTfi), allowing NFTfi to move the lender's ERC20 tokens on their

behalf.

3. the lender signs an off-chain message, proposing its offer terms.

4. the borrower calls `acceptOffer` to accept these terms and enter into the loan. The NFT is stored in

the contract, the borrower receives the loan principal in the specified ERC20 currency, the lender receives an

NFTfi promissory note (in ERC721 form) that represents the rights to either the principal-plus-interest, or the

underlying NFT collateral if the borrower does not pay back in time, and the borrower receives obligation receipt

(in ERC721 form) that gives them the right to pay back the loan and get the collateral back.

b. The lender accepts a borrowe's binding terms by calling `acceptListing`.

1. the borrower calls nftContract.approveAll(NFTfi), approving the NFTfi contract to move their NFT's on their

be1alf.

2. the lender calls erc20Contract.approve(NFTfi), allowing NFTfi to move the lender's ERC20 tokens on their

behalf.

3. the borrower signs an off-chain message, proposing its binding terms.

4. the lender calls `acceptListing` with an offer matching the binding terms and enter into the loan. The NFT is

stored in the contract, the borrower receives the loan principal in the specified ERC20 currency, the lender

receives an NFTfi promissory note (in ERC721 form) that represents the rights to either the principal-plus-interest,

or the underlying NFT collateral if the borrower does not pay back in time, and the borrower receives obligation

receipt (in ERC721 form) that gives them the right to pay back the loan and get the collateral back.

The lender can freely transfer and trade this ERC721 promissory note as they wish, with the knowledge that

transferring the ERC721 promissory note tranfsers the rights to principal-plus-interest and/or collateral, and that

they will no longer have a claim on the loan. The ERC721 promissory note itself represents that claim.

The borrower can freely transfer and trade this ERC721 obligaiton receipt as they wish, with the knowledge that

transferring the ERC721 obligaiton receipt tranfsers the rights right to pay back the loan and get the collateral

back.

A loan may end in one of two ways:

- First, a borrower may call NFTfi.payBackLoan() and pay back the loan plus interest at any time, in which case they

receive their NFT back in the same transaction.

- Second, if the loan's duration has passed and the loan has not been paid back yet, a lender can call

NFTfi.liquidateOverdueLoan(), in which case they receive the underlying NFT collateral and forfeit the rights to the

principal-plus-interest, which the borrower now keeps.

If the loan was created as a ProRated type loan (pro-rata interest loan), then the user only pays the principal plus

pro-rata interest if repaid early.

However, if the loan was was created as a Fixed type loan (agreed to be a fixed-repayment loan), then the borrower

pays the maximumRepaymentAmount regardless of whether they repay early or not.

## Modifiers:

- `loanSanityChecks(struct LoanData.Offer _offer)`

- `loanSanityChecksOffer(struct LoanData.Offer _offer)`

- `bindingTermsSanityChecks(struct LoanData.ListingTerms _listingTerms, struct LoanData.Offer _offer)`

- `payBackChecks(uint256 _loanId)`

## Functions:

- `constructor(address _nftfiHub) (internal)`

- `updateMaximumLoanDuration(uint256 _newMaximumLoanDuration) (external)`

- `updateMaximumNumberOfActiveLoans(uint256 _newMaximumNumberOfActiveLoans) (external)`

- `updateAdminFee(uint256 _newAdminFeeInBasisPoints) (external)`

- `payBackLoan(uint256 _loanId) (external)`

- `liquidateOverdueLoan(uint256 _loanId) (external)`

- `cancelLoanCommitmentBeforeLoanHasBegun(uint256 _nonce) (external)`

- `getPayoffAmount(uint256 _loanId) (external)`

- `getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) (public)`

- `_acceptOffer(bytes32 _loanType, struct LoanData.LoanTerms _loanTerms, struct LoanData.LoanExtras _loanExtras, struct LoanData.Offer _offer, struct LoanData.Signature _signature) (internal)`

- `_renegotiateLoan(uint256 _loanId, uint32 _newLoanDuration, uint256 _newMaximumRepaymentAmount, uint256 _renegotiationFee, uint256 _lenderNonce, uint256 _expiry, bytes _lenderSignature) (internal)`

- `_acceptListing(bytes32 _loanType, struct LoanData.LoanTerms _loanTerms, struct LoanData.LoanExtras _loanExtras, struct LoanData.ListingTerms _listingTerms, address _referrer, struct LoanData.Signature _signature) (internal)`

- `_checkLenderSignatures(struct LoanData.Offer _offer, struct LoanData.Signature _signature) (internal)`

- `_checkBorrowerSignatures(struct LoanData.ListingTerms _listingTerms, struct LoanData.Signature _signature) (internal)`

- `_updateActiveLoans() (internal)`

- `_createLoan(bytes32 _loanType, struct LoanData.LoanTerms _loanTerms, struct LoanData.LoanExtras _loanExtras, address _borrower, address _lender, address _referrer) (internal)`

- `_transferNFT(struct LoanData.LoanTerms _loanTerms, address _sender, address _recipient) (internal)`

- `_payoffAndFee(struct LoanData.LoanTerms _loanTerms) (internal)`

- `_getWrapper(address _nftCollateralContract) (internal)`

- `_getRevenueSharePercent(address _revenueSharePartner) (internal)`

- `_computeRevenueShare(uint256 _adminFee, uint256 _revenueShareInBasisPoints) (internal)`

- `_computeAdminFee(uint256 _interestDue, uint256 _adminFeeInBasisPoints) (internal)`

- `_computeReferralFee(uint256 _loanPrincipalAmount, uint256 _referralFeeInBasisPoints, address _referrer) (internal)`

## Events:

- `AdminFeeUpdated(uint256 newAdminFee)`

- `LoanStarted(uint256 loanId, address borrower, address lender)`

- `LoanRepaid(uint256 loanId, address borrower, address lender, uint256 loanPrincipalAmount, uint256 nftCollateralId, uint256 amountPaidToLender, uint256 adminFee, uint256 revenueShare, address revenueSharePartner, address nftCollateralContract, address loanERC20Denomination)`

- `LoanLiquidated(uint256 loanId, address borrower, address lender, uint256 loanPrincipalAmount, uint256 nftCollateralId, uint256 loanMaturityDate, uint256 loanLiquidationDate, address nftCollateralContract)`

### Modifier `loanSanityChecks(struct LoanData.Offer _offer)`

Modifiers that performs some validation checks over loan parameters

### Modifier `loanSanityChecksOffer(struct LoanData.Offer _offer)`

Modifiers that performs some validation checks over loan parameters when accepting an offer

### Modifier `bindingTermsSanityChecks(struct LoanData.ListingTerms _listingTerms, struct LoanData.Offer _offer)`

Modifiers that performs some validation checks over loan parameters when accepting a listing

### Modifier `payBackChecks(uint256 _loanId)`

Modifiers that performs some validation checks before trying to repay a loan

#### Parameters:

- `_loanId`: - The id of the loan being repaid

### Function `constructor(address _nftfiHub) internal`

Sets `hub`

#### Parameters:

- `_nftfiHub`: - NFTfiHub address

### Function `updateMaximumLoanDuration(uint256 _newMaximumLoanDuration) external`

This function can be called by admins to change the maximumLoanDuration. Note that they can never change

maximumLoanDuration to be greater than UINT32_MAX, since that's the maximum space alotted for the duration in the

loan struct.

#### Parameters:

- `_newMaximumLoanDuration`: - The new maximum loan duration, measured in seconds.

### Function `updateMaximumNumberOfActiveLoans(uint256 _newMaximumNumberOfActiveLoans) external`

This function can be called by admins to change the maximumNumberOfActiveLoans.

#### Parameters:

- `_newMaximumNumberOfActiveLoans`: - The new maximum number of active loans, used to limit the risk that NFTfi

faces while the project is first getting started.

### Function `updateAdminFee(uint256 _newAdminFeeInBasisPoints) external`

This function can be called by admins to change the percent of interest rates earned that they charge as

a fee. Note that newAdminFee can never exceed 10,000, since the fee is measured in basis points.

#### Parameters:

- `_newAdminFeeInBasisPoints`: - The new admin fee measured in basis points. This is a percent of the interest

paid upon a loan's completion that go to the contract admins.

### Function `payBackLoan(uint256 _loanId) external`

This function is called by a anyone to repay a loan. It can be called at any time after the loan has

begun and before loan expiry.. The caller will pay a pro-rata portion of their interest if the loan is paid off

early and the loan is pro-rated type, but the complete repayment amount if it is fixed type.

The the borrower (current owner of the obligation note) will get the collaterl NFT back.

This function is purposefully not pausable in order to prevent an attack where the contract admin's pause the

contract and hold hostage the NFT's that are still within it.

#### Parameters:

- `_loanId`: A unique identifier for this particular loan, sourced from the Loan Coordinator.

### Function `liquidateOverdueLoan(uint256 _loanId) external`

This function is called by a lender once a loan has finished its duration and the borrower still has not

repaid. The lender can call this function to seize the underlying NFT collateral, although the lender gives up

all rights to the principal-plus-collateral by doing so.

This function is purposefully not pausable in order to prevent an attack where the contract admin's pause

the contract and hold hostage the NFT's that are still within it.

We intentionally allow anybody to call this function, although only the lender will end up receiving the seized

collateral. We are exploring the possbility of incentivizing users to call this function by using some of the

admin funds.

#### Parameters:

- `_loanId`: A unique identifier for this particular loan, sourced from the Loan Coordinator.

### Function `cancelLoanCommitmentBeforeLoanHasBegun(uint256 _nonce) external`

This function can be called by either a lender or a borrower to cancel all off-chain orders that they

have signed that contain this nonce. If the off-chain orders were created correctly, there should only be one

off-chain order that contains this nonce at all.

The nonce referred to here is not the same as an Ethereum account's nonce. We are referring

instead to nonces that are used by both the lender and the borrower when they are first signing off-chain NFTfi

orders. These nonces can be any uint256 value that the user has not previously used to sign an off-chain order.

Each nonce can be used at most once per user within NFTfi, regardless of whether they are the lender or the

borrower in that situation. This serves two purposes. First, it prevents replay attacks where an attacker would

submit a user's off-chain order more than once. Second, it allows a user to cancel an off-chain order by calling

NFTfi.cancelLoanCommitmentBeforeLoanHasBegun(), which marks the nonce as used and prevents any future loan from

using the user's off-chain order that contains that nonce.

#### Parameters:

- `_nonce`: - User nonce

### Function `getPayoffAmount(uint256 _loanId) → uint256 external`

This function can be used to view the current quantity of the ERC20 currency used in the specified loan

required by the borrower to repay their loan, measured in the smallest unit of the ERC20 currency.

#### Parameters:

- `_loanId`: A unique identifier for this particular loan, sourced from the Loan Coordinator.

#### Return Values:

- The amount of the specified ERC20 currency required to pay back this loan, measured in the smallest unit

of the specified ERC20 currency.

### Function `getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) → bool public`

This function can be used to view whether a particular nonce for a particular user has already been used,

either from a successful loan or a cancelled off-chain order.

#### Parameters:

- `_user`: - The address of the user. This function works for both lenders and borrowers alike.

- `_nonce`: - The nonce referred to here is not the same as an Ethereum account's nonce. We are referring

instead to nonces that are used by both the lender and the borrower when they are first signing off-chain

NFTfi orders. These nonces can be any uint256 value that the user has not previously used to sign an off-chain

order. Each nonce can be used at most once per user within NFTfi, regardless of whether they are the lender or

the borrower in that situation. This serves two purposes:

- First, it prevents replay attacks where an attacker would submit a user's off-chain order more than once.

- Second, it allows a user to cancel an off-chain order by calling NFTfi.cancelLoanCommitmentBeforeLoanHasBegun()

, which marks the nonce as used and prevents any future loan from using the user's off-chain order that contains

that nonce.

#### Return Values:

- A bool representing whether or not this nonce has been used for this user.

### Function `_acceptOffer(bytes32 _loanType, struct LoanData.LoanTerms _loanTerms, struct LoanData.LoanExtras _loanExtras, struct LoanData.Offer _offer, struct LoanData.Signature _signature) internal`

This function is called by the borrower when accepting a lender's offer to begin a loan.

#### Parameters:

- `_loanType`: - The loan type being created.

- `_loanTerms`: - The main Loan Terms struct. This data is saved upon loan creation on loanIdToLoan.

- `_loanExtras`: - The main Loan Terms struct. This data is saved upon loan creation on loanIdToLoanExtras.

- `_offer`: - The offer made by the lender.

- `_signature`: - The components of the lender's signature.

### Function `_renegotiateLoan(uint256 _loanId, uint32 _newLoanDuration, uint256 _newMaximumRepaymentAmount, uint256 _renegotiationFee, uint256 _lenderNonce, uint256 _expiry, bytes _lenderSignature) internal`

makes possible to change loan duration and max repayment amount, loan duration even can be extended if

loan was expired but not liquidated. IMPORTANT: Frontend will have to propt the caller to do an ERC20 approve for

the fee amount from themselves (borrower/obligation reciept holder) to the lender (promissory note holder)

#### Parameters:

- `_loanId`: - The unique identifier for the loan to be renegotiated

- `_newLoanDuration`: - The new amount of time (measured in seconds) that can elapse before the lender can

liquidate the loan and seize the underlying collateral NFT.

- `_newMaximumRepaymentAmount`: - The new maximum amount of money that the borrower would be required to

retrieve their collateral, measured in the smallest units of the ERC20 currency used for the loan. The

borrower will always have to pay this amount to retrieve their collateral, regardless of whether they repay

early.

- `_renegotiationFee`: Agreed upon fee in loan denomination that borrower pays for the lender for the

renegotiation, has to be paid with an ERC20 transfer loanERC20Denomination token, uses transfer from,

frontend will have to propmt an erc20 approve for this from the borrower to the lender

- `_lenderNonce`: - The nonce referred to here is not the same as an Ethereum account's nonce. We are

referring instead to nonces that are used by both the lender and the borrower when they are first signing

off-chain NFTfi orders. These nonces can be any uint256 value that the user has not previously used to sign an

off-chain order. Each nonce can be used at most once per user within NFTfi, regardless of whether they are the

lender or the borrower in that situation. This serves two purposes:

- First, it prevents replay attacks where an attacker would submit a user's off-chain order more than once.

- Second, it allows a user to cancel an off-chain order by calling NFTfi.cancelLoanCommitmentBeforeLoanHasBegun()

  , which marks the nonce as used and prevents any future loan from using the user's off-chain order that contains

that nonce.

- `_expiry`: - The date when the renegotiation offer expires

- `_lenderSignature`: - The ECDSA signature of the lender, obtained off-chain ahead of time, signing the

following combination of parameters:

- \_loanId

- \_newLoanDuration

- \_newMaximumRepaymentAmount

- \_lender

- \_expiry

- chainId

### Function `_acceptListing(bytes32 _loanType, struct LoanData.LoanTerms _loanTerms, struct LoanData.LoanExtras _loanExtras, struct LoanData.ListingTerms _listingTerms, address _referrer, struct LoanData.Signature _signature) internal`

This function is called by the lender when accepting a barrower's binding terms for a loan.

#### Parameters:

- `_loanType`: - The loan type being created.

- `_loanTerms`: - The main Loan Terms struct. This data is saved upon loan creation on loanIdToLoan.

- `_loanExtras`: - The main Loan Terms struct. This data is saved upon loan creation on loanIdToLoanExtras.

- `_referrer`: - The address of the referrer who found the lender matching the listing, Zero address to signal

this there is no referrer.

- `_signature`: - The components of the borrower's signature.

### Function `_checkLenderSignatures(struct LoanData.Offer _offer, struct LoanData.Signature _signature) internal`

/\*\*

This function is when the borrower accepts a lender's offer, to validate the lender's signature that the

lender provided off-chain to verify that it did indeed made such offer.

#### Parameters:

- `_offer`: - The offer struct containing:

- loanERC20Denomination: The address of the ERC20 contract of the currency being used as principal/interest

for this loan.

- loanPrincipalAmount: The original sum of money transferred from lender to borrower at the beginning of

the loan, measured in loanERC20Denomination's smallest units.

- maximumRepaymentAmount: The maximum amount of money that the borrower would be required to retrieve their

collateral, measured in the smallest units of the ERC20 currency used for the loan. The borrower will always

have to pay this amount to retrieve their collateral, regardless of whether they repay early.

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

- offer.loanInterestRateForDurationInBasisPoints

- offer.loanAdminFeeInBasisPoints

- signature.signer,

- signature.nonce,

- signature.expiry,

- chainId

/

### Function `_checkBorrowerSignatures(struct LoanData.ListingTerms _listingTerms, struct LoanData.Signature _signature) internal`

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

collateral, measured in the smallest units of the ERC20 currency used for the loan. The borrower will always

have to pay this amount to retrieve their collateral, regardless of whether they repay early.

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

- chainId

/

### Function `_updateActiveLoans() internal`

Updates total active loans counter by 1 and validates it the contract has reached the maximum number of

active loans allowed by admins.

/

### Function `_createLoan(bytes32 _loanType, struct LoanData.LoanTerms _loanTerms, struct LoanData.LoanExtras _loanExtras, address _borrower, address _lender, address _referrer) → uint256 internal`

Transfer collateral NFT from borrower to this contract and principal from lender to the borrower and

registers the new loan through the loan coordinator.

#### Parameters:

- `_loanType`: - The type of loan it is being created

- `_loanTerms`: - Struct containing the loan's settings

- `_loanExtras`: - Struct containing some loan's extra settings, needed to avoid stack too deep

- `_lender`: - The address of the lender.

- `_referrer`: - The address of the referrer who found the lender matching the listing, Zero address to signal

that there is no referrer.

/

### Function `_transferNFT(struct LoanData.LoanTerms _loanTerms, address _sender, address _recipient) internal`

Transfers several types of NFTs using a wrapper that knows how to handle each case.

#### Parameters:

- `_loanTerms`: - Struct containing all the loan's parameters

- `_sender`: - Current owner of the NFT

- `_recipient`: - Recipient of the transfer

/

### Function `_payoffAndFee(struct LoanData.LoanTerms _loanTerms) → uint256, uint256 internal`

Calculates the payoff amount and admin fee

/

### Function `_getWrapper(address _nftCollateralContract) → address internal`

Checks that the collateral is a supported contracts and returns what wrapper to use for the loan's NFT

collateral contract.

#### Parameters:

- `_nftCollateralContract`: - The address of the the NFT collateral contract.

#### Return Values:

- Address of the NftWrapper to use for the loan's NFT collateral.

/

### Function `_getRevenueSharePercent(address _revenueSharePartner) → uint32 internal`

Checks that the partner is permitted and returns its shared percent.

#### Parameters:

- `_revenueSharePartner`: - Partner's address

#### Return Values:

- The revenue share percent for the partner.

/

### Function `_computeRevenueShare(uint256 _adminFee, uint256 _revenueShareInBasisPoints) → uint256 internal`

A convenience function computing the revenue share taken from the admin fee to transferr to the permitted

partner.

#### Parameters:

- `_adminFee`: - The quantity of ERC20 currency (measured in smalled units of that ERC20 currency) that is due

as an admin fee.

- `_revenueShareInBasisPoints`: - The percent (measured in basis points) of the admin fee amount that will be

taken as a revenue share for a the partner, at the moment the loan is begun.

#### Return Values:

- The quantity of ERC20 currency (measured in smalled units of that ERC20 currency) that should be sent to

the `revenueSharePartner`.

/

### Function `_computeAdminFee(uint256 _interestDue, uint256 _adminFeeInBasisPoints) → uint256 internal`

A convenience function computing the adminFee taken from a specified quantity of interest.

#### Parameters:

- `_interestDue`: - The amount of interest due, measured in the smallest quantity of the ERC20 currency being

used to pay the interest.

- `_adminFeeInBasisPoints`: - The percent (measured in basis points) of the interest earned that will be taken

as a fee by the contract admins when the loan is repaid. The fee is stored in the loan struct to prevent an

attack where the contract admins could adjust the fee right before a loan is repaid, and take all of the interest

earned.

#### Return Values:

- The quantity of ERC20 currency (measured in smalled units of that ERC20 currency) that is due as an admin

fee.

/

### Function `_computeReferralFee(uint256 _loanPrincipalAmount, uint256 _referralFeeInBasisPoints, address _referrer) → uint256 internal`

A convenience function computing the referral fee taken from the loan principal amount to transferr to

the referrer.

#### Parameters:

- `_loanPrincipalAmount`: - The original sum of money transferred from lender to borrower at the beginning of

the loan, measured in loanERC20Denomination's smallest units.

- `_referralFeeInBasisPoints`: - The percent (measured in basis points) of the loan principal amount that will

be taken as a fee to pay to the referrer, 0 if the lender is not paying referral fee.

- `_referrer`: - The address of the referrer who found the lender matching the listing, Zero address to signal

that there is no referrer.

#### Return Values:

- The quantity of ERC20 currency (measured in smalled units of that ERC20 currency) that should be sent to

the referrer.

/

### Event `AdminFeeUpdated(uint256 newAdminFee)`

This event is fired whenever the admins change the percent of interest rates earned that they charge as a

fee. Note that newAdminFee can never exceed 10,000, since the fee is measured in basis points.

#### Parameters:

- `newAdminFee`: - The new admin fee measured in basis points. This is a percent of the interest paid upon a

loan's completion that go to the contract admins.

### Event `LoanStarted(uint256 loanId, address borrower, address lender)`

This event is fired whenever a borrower begins a loan by calling NFTfi.beginLoan(), which can only occur

after both the lender and borrower have approved their ERC721 and ERC20 contracts to use NFTfi, and when they

both have signed off-chain messages that agree on the terms of the loan.

#### Parameters:

- `loanId`: - A unique identifier for this particular loan, sourced from the Loan Coordinator.

- `borrower`: - The address of the borrower.

- `lender`: - The address of the lender. The lender can change their address by transferring the NFTfi ERC721

token that they received when the loan began.

### Event `LoanRepaid(uint256 loanId, address borrower, address lender, uint256 loanPrincipalAmount, uint256 nftCollateralId, uint256 amountPaidToLender, uint256 adminFee, uint256 revenueShare, address revenueSharePartner, address nftCollateralContract, address loanERC20Denomination)`

This event is fired whenever a borrower successfully repays their loan, paying

principal-plus-interest-minus-fee to the lender in loanERC20Denomination, paying fee to owner in

loanERC20Denomination, and receiving their NFT collateral back.

#### Parameters:

- `loanId`: - A unique identifier for this particular loan, sourced from the Loan Coordinator.

- `borrower`: - The address of the borrower.

- `lender`: - The address of the lender. The lender can change their address by transferring the NFTfi ERC721

token that they received when the loan began.

- `loanPrincipalAmount`: - The original sum of money transferred from lender to borrower at the beginning of

the loan, measured in loanERC20Denomination's smallest units.

- `nftCollateralId`: - The ID within the NFTCollateralContract for the NFT being used as collateral for this

loan. The NFT is stored within this contract during the duration of the loan.

- `amountPaidToLender`: The amount of ERC20 that the borrower paid to the lender, measured in the smalled

units of loanERC20Denomination.

- `adminFee`: The amount of interest paid to the contract admins, measured in the smalled units of

loanERC20Denomination and determined by adminFeeInBasisPoints. This amount never exceeds the amount of interest

earned.

- `revenueShare`: The amount taken from admin fee amount shared with the partner.

- `revenueSharePartner`: - The address of the partner that will receive the revenue share.

- `nftCollateralContract`: - The ERC721 contract of the NFT collateral

- `loanERC20Denomination`: - The ERC20 contract of the currency being used as principal/interest for this

loan.

### Event `LoanLiquidated(uint256 loanId, address borrower, address lender, uint256 loanPrincipalAmount, uint256 nftCollateralId, uint256 loanMaturityDate, uint256 loanLiquidationDate, address nftCollateralContract)`

This event is fired whenever a lender liquidates an outstanding loan that is owned to them that has

exceeded its duration. The lender receives the underlying NFT collateral, and the borrower no longer needs to

repay the loan principal-plus-interest.

#### Parameters:

- `loanId`: - A unique identifier for this particular loan, sourced from the Loan Coordinator.

- `borrower`: - The address of the borrower.

- `lender`: - The address of the lender. The lender can change their address by transferring the NFTfi ERC721

token that they received when the loan began.

- `loanPrincipalAmount`: - The original sum of money transferred from lender to borrower at the beginning of

the loan, measured in loanERC20Denomination's smallest units.

- `nftCollateralId`: - The ID within the NFTCollateralContract for the NFT being used as collateral for this

loan. The NFT is stored within this contract during the duration of the loan.

- `loanMaturityDate`: - The unix time (measured in seconds) that the loan became due and was eligible for

liquidation.

- `loanLiquidationDate`: - The unix time (measured in seconds) that liquidation occurred.

- `nftCollateralContract`: - The ERC721 contract of the NFT collateral
