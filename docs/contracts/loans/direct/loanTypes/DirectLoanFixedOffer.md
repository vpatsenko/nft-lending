# `DirectLoanFixedOffer`

Main contract for NFTfi Direct Loans Fixed Type. This contract manages the ability to create NFT-backed

peer-to-peer loans of type Fixed (agreed to be a fixed-repayment loan) where the borrower pays the

maximumRepaymentAmount regardless of whether they repay early or not.

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

- `constructor(address _admin, address _nftfiHub, address[] _permittedErc20s) (public)`

- `acceptOffer(struct LoanData.Offer _offer, struct LoanData.Signature _signature, struct LoanData.BorrowerSettings _borrowerSettings) (external)`

- `getPayoffAmount(uint32 _loanId) (external)`

- `_acceptOffer(bytes32 _loanType, struct LoanData.LoanTerms _loanTerms, struct LoanData.LoanExtras _loanExtras, struct LoanData.Offer _offer, struct LoanData.Signature _signature) (internal)`

- `_setupLoanTerms(struct LoanData.Offer _offer, address _nftWrapper) (internal)`

- `_payoffAndFee(struct LoanData.LoanTerms _loanTerms) (internal)`

- `_loanSanityChecksOffer(struct LoanData.Offer _offer) (internal)`

### Function `constructor(address _admin, address _nftfiHub, address[] _permittedErc20s) public`

Sets `hub` and permitted erc20-s

#### Parameters:

- `_admin`: - Initial admin of this contract.

- `_nftfiHub`: - NFTfiHub address

- `_permittedErc20s`: - list of permitted ERC20 token contract addresses

### Function `acceptOffer(struct LoanData.Offer _offer, struct LoanData.Signature _signature, struct LoanData.BorrowerSettings _borrowerSettings) external`

This function is called by the borrower when accepting a lender's offer to begin a loan.

#### Parameters:

- `_offer`: - The offer made by the lender.

- `_signature`: - The components of the lender's signature.

- `_borrowerSettings`: - Some extra parameters that the borrower needs to set when accepting an offer.

### Function `getPayoffAmount(uint32 _loanId) → uint256 external`

This function can be used to view the current quantity of the ERC20 currency used in the specified loan

required by the borrower to repay their loan, measured in the smallest unit of the ERC20 currency.

#### Parameters:

- `_loanId`: A unique identifier for this particular loan, sourced from the Loan Coordinator.

#### Return Values:

- The amount of the specified ERC20 currency required to pay back this loan, measured in the smallest unit

of the specified ERC20 currency.

### Function `_acceptOffer(bytes32 _loanType, struct LoanData.LoanTerms _loanTerms, struct LoanData.LoanExtras _loanExtras, struct LoanData.Offer _offer, struct LoanData.Signature _signature) internal`

This function is called by the borrower when accepting a lender's offer to begin a loan.

#### Parameters:

- `_loanType`: - The loan type being created.

- `_loanTerms`: - The main Loan Terms struct. This data is saved upon loan creation on loanIdToLoan.

- `_loanExtras`: - The main Loan Terms struct. This data is saved upon loan creation on loanIdToLoanExtras.

- `_offer`: - The offer made by the lender.

- `_signature`: - The components of the lender's signature.

### Function `_setupLoanTerms(struct LoanData.Offer _offer, address _nftWrapper) → struct LoanData.LoanTerms internal`

Creates a `LoanTerms` struct using data sent as the lender's `_offer` on `acceptOffer`.

This is needed in order to avoid stack too deep issues.

Since this is a Fixed loan type loanInterestRateForDurationInBasisPoints is ignored.

### Function `_payoffAndFee(struct LoanData.LoanTerms _loanTerms) → uint256 adminFee, uint256 payoffAmount internal`

Calculates the payoff amount and admin fee

#### Parameters:

- `_loanTerms`: - Struct containing all the loan's parameters

### Function `_loanSanityChecksOffer(struct LoanData.Offer _offer) internal`

Function that performs some validation checks over loan parameters when accepting an offer
