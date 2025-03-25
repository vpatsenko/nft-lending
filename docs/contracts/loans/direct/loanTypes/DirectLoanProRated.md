# `DirectLoanProRated`

Main contract for NFTfi Direct Loans ProRated Type. This contract manages the ability to create NFT-backed

peer-to-peer loans type ProRated (pro-rata interest loan) where the user only pays the principal plus pro-rata

interest if repaid early.

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

## Functions:

- `constructor(address _nftfiHub) (public)`

- `acceptOffer(struct LoanData.Offer _offer, struct LoanData.Signature _signature, struct LoanData.BorrowerSettings _borrowerSettings) (external)`

- `acceptListing(struct LoanData.ListingTerms _listingTerms, struct LoanData.Offer _offer, struct LoanData.Signature _signature) (external)`

- `renegotiateLoan(uint256 _loanId, uint32 _newLoanDuration, uint256 _newMaximumRepaymentAmount, uint256 _renegotiationFee, uint256 _lenderNonce, uint256 _expiry, bytes _lenderSignature) (external)`

- `getPayoffAmount(uint256 _loanId) (external)`

- `_payoffAndFee(struct LoanData.LoanTerms _loan) (internal)`

- `_setupLoanTermsOffer(struct LoanData.Offer _offer) (internal)`

- `_setupLoanTermsListing(struct LoanData.Offer _offer) (internal)`

- `_setupLoanExtras(address _revenueSharePartner, uint32 _referralFeeInBasisPoints) (internal)`

- `_computeInterestDue(uint256 _loanPrincipalAmount, uint256 _maximumRepaymentAmount, uint256 _loanDurationSoFarInSeconds, uint256 _loanTotalDurationAgreedTo, uint256 _loanInterestRateForDurationInBasisPoints) (internal)`

### Function `constructor(address _nftfiHub) public`

Sets `hub`

#### Parameters:

- `_nftfiHub`: - NFTfiHub address

### Function `acceptOffer(struct LoanData.Offer _offer, struct LoanData.Signature _signature, struct LoanData.BorrowerSettings _borrowerSettings) external`

This function is called by the borrower when accepting a lender's offer to begin a loan.

#### Parameters:

- `_offer`: - The offer made by the lender.

- `_signature`: - The components of the lender's signature.

- `_borrowerSettings`: - Some extra parameters that the borrower needs to set when accepting an offer.

### Function `acceptListing(struct LoanData.ListingTerms _listingTerms, struct LoanData.Offer _offer, struct LoanData.Signature _signature) external`

This function is called by the lender when accepting a barrower's binding terms for a loan.

#### Parameters:

- `_listingTerms`: - Terms the borrower set off-chain and is willing to accept automatically when

fulfiled by a lender's offer .

- `_offer`: - The offer made by the lender.

- `_signature`: - The components of the borrower's signature.

### Function `renegotiateLoan(uint256 _loanId, uint32 _newLoanDuration, uint256 _newMaximumRepaymentAmount, uint256 _renegotiationFee, uint256 _lenderNonce, uint256 _expiry, bytes _lenderSignature) external`

makes possible to change loan duration and max repayment amount, loan duration even can be extended if

loan was expired but not liquidated.

#### Parameters:

- `_loanId`: - The unique identifier for the loan to be renegotiated

- `_newLoanDuration`: - The new amount of time (measured in seconds) that can elapse before the lender can

liquidate the loan and seize the underlying collateral NFT.

- `_newMaximumRepaymentAmount`: - The new maximum amount of money that the borrower would be required to

retrieve their collateral, measured in the smallest units of the ERC20 currency used for the loan. The

borrower will always have to pay this amount to retrieve their collateral, regardless of whether they repay

early.

- `_renegotiationFee`: Agreed upon fee in ether that borrower pays for the lender for the renegitiation

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

### Function `getPayoffAmount(uint256 _loanId) → uint256 external`

This function can be used to view the current quantity of the ERC20 currency used in the specified loan

required by the borrower to repay their loan, measured in the smallest unit of the ERC20 currency. Note that

since interest accrues every second, once a borrower calls repayLoan(), the amount will have increased slightly.

#### Parameters:

- `_loanId`: A unique identifier for this particular loan, sourced from the Loan Coordinator.

#### Return Values:

- The amount of the specified ERC20 currency required to pay back this loan, measured in the smallest unit

of the specified ERC20 currency.

### Function `_payoffAndFee(struct LoanData.LoanTerms _loan) → uint256, uint256 internal`

Calculates the payoff amount and admin fee

#### Parameters:

- `_loan`: - Struct containing all the loan's parameters

### Function `_setupLoanTermsOffer(struct LoanData.Offer _offer) → struct LoanData.LoanTerms internal`

Creates a `LoanTerms` struct using data sent as the lender's `_offer` on `acceptOffer`.

This is needed in order to avoid stack too deep issues.

### Function `_setupLoanTermsListing(struct LoanData.Offer _offer) → struct LoanData.LoanTerms internal`

Creates a `LoanTerms` struct using data sent as the lender's `_offer` on `acceptListing`.

Even though this is a Fixed type loan, this is called by the lender when accepting the binding terms set by the

borrower so the `maximumRepaymentAmount` shold be calculated based on the offer's `loanPrincipalAmount` and

`loanInterestRateForDurationInBasisPoints`

This is needed in order to avoid stack too deep issues.

### Function `_setupLoanExtras(address _revenueSharePartner, uint32 _referralFeeInBasisPoints) → struct LoanData.LoanExtras internal`

Creates a `LoanExtras` struct using data sent as the borrower's extra settings.

This is needed in order to avoid stack too deep issues.

### Function `_computeInterestDue(uint256 _loanPrincipalAmount, uint256 _maximumRepaymentAmount, uint256 _loanDurationSoFarInSeconds, uint256 _loanTotalDurationAgreedTo, uint256 _loanInterestRateForDurationInBasisPoints) → uint256 internal`

A convenience function that calculates the amount of interest currently due for a given loan. The

interest is capped at \_maximumRepaymentAmount minus \_loanPrincipalAmount.

#### Parameters:

- `_loanPrincipalAmount`: - The total quantity of principal first loaned to the borrower, measured in the

smallest units of the ERC20 currency used for the loan.

- `_maximumRepaymentAmount`: - The maximum amount of money that the borrower would be required to retrieve

their collateral. If interestIsProRated is set to false, then the borrower will always have to pay this amount to

retrieve their collateral.

- `_loanDurationSoFarInSeconds`: - The elapsed time (in seconds) that has occurred so far since the loan began

until repayment.

- `_loanTotalDurationAgreedTo`: - The original duration that the borrower and lender agreed to, by which they

measured the interest that would be due.

- `_loanInterestRateForDurationInBasisPoints`: - The interest rate that the borrower and lender agreed would be

due after the totalDuration passed.

#### Return Values:

- The quantity of interest due, measured in the smallest units of the ERC20 currency used to pay this loan.
