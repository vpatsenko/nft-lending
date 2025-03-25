# `DirectLoanBaseMinimal`

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

## Functions:

- `constructor(address _admin, address _nftfiHub, bytes32 _loanCoordinatorKey, address[] _permittedErc20s) (internal)`

- `updateMaximumLoanDuration(uint256 _newMaximumLoanDuration) (external)`

- `updateAdminFee(uint16 _newAdminFeeInBasisPoints) (external)`

- `drainERC20Airdrop(address _tokenAddress, address _receiver) (external)`

- `setERC20Permit(address _erc20, bool _permit) (external)`

- `setERC20Permits(address[] _erc20s, bool[] _permits) (external)`

- `drainERC721Airdrop(address _tokenAddress, uint256 _tokenId, address _receiver) (external)`

- `drainERC1155Airdrop(address _tokenAddress, uint256 _tokenId, address _receiver) (external)`

- `mintObligationReceipt(uint32 _loanId) (external)`

- `renegotiateLoan(uint32 _loanId, uint32 _newLoanDuration, uint256 _newMaximumRepaymentAmount, uint256 _renegotiationFee, uint256 _lenderNonce, uint256 _expiry, bytes _lenderSignature) (external)`

- `payBackLoan(uint32 _loanId) (external)`

- `liquidateOverdueLoan(uint32 _loanId) (external)`

- `pullAirdrop(uint32 _loanId, address _target, bytes _data, address _nftAirdrop, uint256 _nftAirdropId, bool _is1155, uint256 _nftAirdropAmount) (external)`

- `wrapCollateral(uint32 _loanId) (external)`

- `cancelLoanCommitmentBeforeLoanHasBegun(uint256 _nonce) (external)`

- `getPayoffAmount(uint32 _loanId) (external)`

- `getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) (external)`

- `getERC20Permit(address _erc20) (public)`

- `_renegotiateLoan(uint32 _loanId, uint32 _newLoanDuration, uint256 _newMaximumRepaymentAmount, uint256 _renegotiationFee, uint256 _lenderNonce, uint256 _expiry, bytes _lenderSignature) (internal)`

- `_createLoan(bytes32 _loanType, struct LoanData.LoanTerms _loanTerms, struct LoanData.LoanExtras _loanExtras, address _borrower, address _lender, address _referrer) (internal)`

- `_createLoanNoNftTransfer(bytes32 _loanType, struct LoanData.LoanTerms _loanTerms, struct LoanData.LoanExtras _loanExtras, address _borrower, address _lender, address _referrer) (internal)`

- `_transferNFT(struct LoanData.LoanTerms _loanTerms, address _sender, address _recipient) (internal)`

- `_payBackLoan(uint32 _loanId, address _borrower, address _lender, struct LoanData.LoanTerms _loan) (internal)`

- `_resolveLoan(uint32 _loanId, address _nftReceiver, struct LoanData.LoanTerms _loanTerms, contract IDirectLoanCoordinator _loanCoordinator) (internal)`

- `_resolveLoanNoNftTransfer(uint32 _loanId, struct LoanData.LoanTerms _loanTerms, contract IDirectLoanCoordinator _loanCoordinator) (internal)`

- `_setERC20Permit(address _erc20, bool _permit) (internal)`

- `_loanSanityChecks(struct LoanData.Offer _offer, address _nftWrapper) (internal)`

- `_getPartiesAndData(uint32 _loanId) (internal)`

- `_setupLoanExtras(address _revenueSharePartner, uint16 _referralFeeInBasisPoints) (internal)`

- `_payoffAndFee(struct LoanData.LoanTerms _loanTerms) (internal)`

- `_getWrapper(address _nftCollateralContract) (internal)`

## Events:

- `AdminFeeUpdated(uint16 newAdminFee)`

- `MaximumLoanDurationUpdated(uint256 newMaximumLoanDuration)`

- `LoanStarted(uint32 loanId, address borrower, address lender, struct LoanData.LoanTerms loanTerms, struct LoanData.LoanExtras loanExtras)`

- `LoanRepaid(uint32 loanId, address borrower, address lender, uint256 loanPrincipalAmount, uint256 nftCollateralId, uint256 amountPaidToLender, uint256 adminFee, uint256 revenueShare, address revenueSharePartner, address nftCollateralContract, address loanERC20Denomination)`

- `LoanLiquidated(uint32 loanId, address borrower, address lender, uint256 loanPrincipalAmount, uint256 nftCollateralId, uint256 loanMaturityDate, uint256 loanLiquidationDate, address nftCollateralContract)`

- `LoanRenegotiated(uint32 loanId, address borrower, address lender, uint32 newLoanDuration, uint256 newMaximumRepaymentAmount, uint256 renegotiationFee, uint256 renegotiationAdminFee)`

- `ERC20Permit(address erc20Contract, bool isPermitted)`

### Function `constructor(address _admin, address _nftfiHub, bytes32 _loanCoordinatorKey, address[] _permittedErc20s) internal`

Sets `hub`

#### Parameters:

- `_admin`: - Initial admin of this contract.

- `_nftfiHub`: - NFTfiHub address

- `_loanCoordinatorKey`: -

- `_permittedErc20s`: -

### Function `updateMaximumLoanDuration(uint256 _newMaximumLoanDuration) external`

This function can be called by admins to change the maximumLoanDuration. Note that they can never change

maximumLoanDuration to be greater than UINT32_MAX, since that's the maximum space alotted for the duration in the

loan struct.

#### Parameters:

- `_newMaximumLoanDuration`: - The new maximum loan duration, measured in seconds.

### Function `updateAdminFee(uint16 _newAdminFeeInBasisPoints) external`

This function can be called by admins to change the percent of interest rates earned that they charge as

a fee. Note that newAdminFee can never exceed 10,000, since the fee is measured in basis points.

#### Parameters:

- `_newAdminFeeInBasisPoints`: - The new admin fee measured in basis points. This is a percent of the interest

paid upon a loan's completion that go to the contract admins.

### Function `drainERC20Airdrop(address _tokenAddress, address _receiver) external`

used by the owner account to be able to drain ERC20 tokens received as airdrops

for the locked collateral NFT-s

#### Parameters:

- `_tokenAddress`: - address of the token contract for the token to be sent out

- `_receiver`: - receiver of the token

### Function `setERC20Permit(address _erc20, bool _permit) external`

This function can be called by admins to change the permitted status of an ERC20 currency. This includes

both adding an ERC20 currency to the permitted list and removing it.

#### Parameters:

- `_erc20`: - The address of the ERC20 currency whose permit list status changed.

- `_permit`: - The new status of whether the currency is permitted or not.

### Function `setERC20Permits(address[] _erc20s, bool[] _permits) external`

This function can be called by admins to change the permitted status of a batch of ERC20 currency. This

includes both adding an ERC20 currency to the permitted list and removing it.

#### Parameters:

- `_erc20s`: - The addresses of the ERC20 currencies whose permit list status changed.

- `_permits`: - The new statuses of whether the currency is permitted or not.

### Function `drainERC721Airdrop(address _tokenAddress, uint256 _tokenId, address _receiver) external`

used by the owner account to be able to drain ERC721 tokens received as airdrops

for the locked collateral NFT-s

#### Parameters:

- `_tokenAddress`: - address of the token contract for the token to be sent out

- `_tokenId`: - id token to be sent out

- `_receiver`: - receiver of the token

### Function `drainERC1155Airdrop(address _tokenAddress, uint256 _tokenId, address _receiver) external`

used by the owner account to be able to drain ERC1155 tokens received as airdrops

for the locked collateral NFT-s

#### Parameters:

- `_tokenAddress`: - address of the token contract for the token to be sent out

- `_tokenId`: - id token to be sent out

- `_receiver`: - receiver of the token

### Function `mintObligationReceipt(uint32 _loanId) external`

### Function `renegotiateLoan(uint32 _loanId, uint32 _newLoanDuration, uint256 _newMaximumRepaymentAmount, uint256 _renegotiationFee, uint256 _lenderNonce, uint256 _expiry, bytes _lenderSignature) external`

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

- address of this contract

- chainId

### Function `payBackLoan(uint32 _loanId) external`

This function is called by a anyone to repay a loan. It can be called at any time after the loan has

begun and before loan expiry.. The caller will pay a pro-rata portion of their interest if the loan is paid off

early and the loan is pro-rated type, but the complete repayment amount if it is fixed type.

The the borrower (current owner of the obligation note) will get the collaterl NFT back.

This function is purposefully not pausable in order to prevent an attack where the contract admin's pause the

contract and hold hostage the NFT's that are still within it.

#### Parameters:

- `_loanId`: A unique identifier for this particular loan, sourced from the Loan Coordinator.

### Function `liquidateOverdueLoan(uint32 _loanId) external`

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

### Function `pullAirdrop(uint32 _loanId, address _target, bytes _data, address _nftAirdrop, uint256 _nftAirdropId, bool _is1155, uint256 _nftAirdropAmount) external`

this function initiates a flashloan to pull an airdrop from a tartget contract

#### Parameters:

- `_loanId`: -

- `_target`: - address of the airdropping contract

- `_data`: - function selector to be called on the airdropping contract

- `_nftAirdrop`: - address of the used claiming nft in the drop

- `_nftAirdropId`: - id of the used claiming nft in the drop

- `_is1155`: -

- `_nftAirdropAmount`: - amount in case of 1155

### Function `wrapCollateral(uint32 _loanId) external`

this function creates a proxy contract wrapping the collateral to be able to catch an expected airdrop

#### Parameters:

- `_loanId`: -

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

### Function `getPayoffAmount(uint32 _loanId) → uint256 external`

This function can be used to view the current quantity of the ERC20 currency used in the specified loan

required by the borrower to repay their loan, measured in the smallest unit of the ERC20 currency.

#### Parameters:

- `_loanId`: A unique identifier for this particular loan, sourced from the Loan Coordinator.

#### Return Values:

- The amount of the specified ERC20 currency required to pay back this loan, measured in the smallest unit

of the specified ERC20 currency.

### Function `getWhetherNonceHasBeenUsedForUser(address _user, uint256 _nonce) → bool external`

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

### Function `getERC20Permit(address _erc20) → bool public`

This function can be called by anyone to get the permit associated with the erc20 contract.

#### Parameters:

- `_erc20`: - The address of the erc20 contract.

#### Return Values:

- Returns whether the erc20 is permitted

### Function `_renegotiateLoan(uint32 _loanId, uint32 _newLoanDuration, uint256 _newMaximumRepaymentAmount, uint256 _renegotiationFee, uint256 _lenderNonce, uint256 _expiry, bytes _lenderSignature) internal`

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

- `_renegotiationFee`: Agreed upon fee in loan denomination that borrower pays for the lender and

the admin for the renegotiation, has to be paid with an ERC20 transfer loanERC20Denomination token,

uses transfer from, frontend will have to propmt an erc20 approve for this from the borrower to the lender,

admin fee is calculated by the loan's loanAdminFeeInBasisPoints value

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

- address of this contract

- chainId

### Function `_createLoan(bytes32 _loanType, struct LoanData.LoanTerms _loanTerms, struct LoanData.LoanExtras _loanExtras, address _borrower, address _lender, address _referrer) → uint32 internal`

Transfer collateral NFT from borrower to this contract and principal from lender to the borrower and

registers the new loan through the loan coordinator.

#### Parameters:

- `_loanType`: - The type of loan it is being created

- `_loanTerms`: - Struct containing the loan's settings

- `_loanExtras`: - Struct containing some loan's extra settings, needed to avoid stack too deep

- `_lender`: - The address of the lender.

- `_referrer`: - The address of the referrer who found the lender matching the listing, Zero address to signal

that there is no referrer.

### Function `_createLoanNoNftTransfer(bytes32 _loanType, struct LoanData.LoanTerms _loanTerms, struct LoanData.LoanExtras _loanExtras, address _borrower, address _lender, address _referrer) → uint32 loanId internal`

Transfer principal from lender to the borrower and

registers the new loan through the loan coordinator.

#### Parameters:

- `_loanType`: - The type of loan it is being created

- `_loanTerms`: - Struct containing the loan's settings

- `_loanExtras`: - Struct containing some loan's extra settings, needed to avoid stack too deep

- `_lender`: - The address of the lender.

- `_referrer`: - The address of the referrer who found the lender matching the listing, Zero address to signal

that there is no referrer.

### Function `_transferNFT(struct LoanData.LoanTerms _loanTerms, address _sender, address _recipient) internal`

Transfers several types of NFTs using a wrapper that knows how to handle each case.

#### Parameters:

- `_loanTerms`: - Struct containing all the loan's parameters

- `_sender`: - Current owner of the NFT

- `_recipient`: - Recipient of the transfer

### Function `_payBackLoan(uint32 _loanId, address _borrower, address _lender, struct LoanData.LoanTerms _loan) internal`

This function is called by a anyone to repay a loan. It can be called at any time after the loan has

begun and before loan expiry.. The caller will pay a pro-rata portion of their interest if the loan is paid off

early and the loan is pro-rated type, but the complete repayment amount if it is fixed type.

The the borrower (current owner of the obligation note) will get the collaterl NFT back.

This function is purposefully not pausable in order to prevent an attack where the contract admin's pause the

contract and hold hostage the NFT's that are still within it.

#### Parameters:

- `_loanId`: A unique identifier for this particular loan, sourced from the Loan Coordinator.

### Function `_resolveLoan(uint32 _loanId, address _nftReceiver, struct LoanData.LoanTerms _loanTerms, contract IDirectLoanCoordinator _loanCoordinator) internal`

A convenience function with shared functionality between `payBackLoan` and `liquidateOverdueLoan`.

#### Parameters:

- `_loanId`: A unique identifier for this particular loan, sourced from the Loan Coordinator.

- `_nftReceiver`: - The receiver of the collateral nft. The borrower when `payBackLoan` or the lender when

`liquidateOverdueLoan`.

- `_loanTerms`: - The main Loan Terms struct. This data is saved upon loan creation on loanIdToLoan.

- `_loanCoordinator`: - The loan coordinator used when creating the loan.

### Function `_resolveLoanNoNftTransfer(uint32 _loanId, struct LoanData.LoanTerms _loanTerms, contract IDirectLoanCoordinator _loanCoordinator) internal`

Resolving the loan without trasferring the nft to provide a base for the bundle

break up of the bundled loans

#### Parameters:

- `_loanId`: A unique identifier for this particular loan, sourced from the Loan Coordinator.

- `_loanTerms`: - The main Loan Terms struct. This data is saved upon loan creation on loanIdToLoan.

- `_loanCoordinator`: - The loan coordinator used when creating the loan.

### Function `_setERC20Permit(address _erc20, bool _permit) internal`

This function can be called by admins to change the permitted status of an ERC20 currency. This includes

both adding an ERC20 currency to the permitted list and removing it.

#### Parameters:

- `_erc20`: - The address of the ERC20 currency whose permit list status changed.

- `_permit`: - The new status of whether the currency is permitted or not.

### Function `_loanSanityChecks(struct LoanData.Offer _offer, address _nftWrapper) internal`

Performs some validation checks over loan parameters

### Function `_getPartiesAndData(uint32 _loanId) → address borrower, address lender, struct LoanData.LoanTerms loan, contract IDirectLoanCoordinator loanCoordinator internal`

reads some variable values of a loan for payback functions, created to reduce code repetition

### Function `_setupLoanExtras(address _revenueSharePartner, uint16 _referralFeeInBasisPoints) → struct LoanData.LoanExtras internal`

Creates a `LoanExtras` struct using data sent as the borrower's extra settings.

This is needed in order to avoid stack too deep issues.

### Function `_payoffAndFee(struct LoanData.LoanTerms _loanTerms) → uint256, uint256 internal`

Calculates the payoff amount and admin fee

### Function `_getWrapper(address _nftCollateralContract) → address internal`

Checks that the collateral is a supported contracts and returns what wrapper to use for the loan's NFT

collateral contract.

#### Parameters:

- `_nftCollateralContract`: - The address of the the NFT collateral contract.

#### Return Values:

- Address of the NftWrapper to use for the loan's NFT collateral.

### Event `AdminFeeUpdated(uint16 newAdminFee)`

This event is fired whenever the admins change the percent of interest rates earned that they charge as a

fee. Note that newAdminFee can never exceed 10,000, since the fee is measured in basis points.

#### Parameters:

- `newAdminFee`: - The new admin fee measured in basis points. This is a percent of the interest paid upon a

loan's completion that go to the contract admins.

### Event `MaximumLoanDurationUpdated(uint256 newMaximumLoanDuration)`

This event is fired whenever the admins change the maximum duration of any loan started for this loan

type.

#### Parameters:

- `newMaximumLoanDuration`: - The new maximum duration.

### Event `LoanStarted(uint32 loanId, address borrower, address lender, struct LoanData.LoanTerms loanTerms, struct LoanData.LoanExtras loanExtras)`

This event is fired whenever a borrower begins a loan by calling NFTfi.beginLoan(), which can only occur

after both the lender and borrower have approved their ERC721 and ERC20 contracts to use NFTfi, and when they

both have signed off-chain messages that agree on the terms of the loan.

#### Parameters:

- `loanId`: - A unique identifier for this particular loan, sourced from the Loan Coordinator.

- `borrower`: - The address of the borrower.

- `lender`: - The address of the lender. The lender can change their address by transferring the NFTfi ERC721

token that they received when the loan began.

### Event `LoanRepaid(uint32 loanId, address borrower, address lender, uint256 loanPrincipalAmount, uint256 nftCollateralId, uint256 amountPaidToLender, uint256 adminFee, uint256 revenueShare, address revenueSharePartner, address nftCollateralContract, address loanERC20Denomination)`

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

### Event `LoanLiquidated(uint32 loanId, address borrower, address lender, uint256 loanPrincipalAmount, uint256 nftCollateralId, uint256 loanMaturityDate, uint256 loanLiquidationDate, address nftCollateralContract)`

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

### Event `LoanRenegotiated(uint32 loanId, address borrower, address lender, uint32 newLoanDuration, uint256 newMaximumRepaymentAmount, uint256 renegotiationFee, uint256 renegotiationAdminFee)`

This event is fired when some of the terms of a loan are being renegotiated.

#### Parameters:

- `loanId`: - The unique identifier for the loan to be renegotiated

- `newLoanDuration`: - The new amount of time (measured in seconds) that can elapse before the lender can

liquidate the loan and seize the underlying collateral NFT.

- `newMaximumRepaymentAmount`: - The new maximum amount of money that the borrower would be required to

retrieve their collateral, measured in the smallest units of the ERC20 currency used for the loan. The

borrower will always have to pay this amount to retrieve their collateral, regardless of whether they repay

early.

- `renegotiationFee`: Agreed upon fee in loan denomination that borrower pays for the lender for the

renegotiation, has to be paid with an ERC20 transfer loanERC20Denomination token, uses transfer from,

frontend will have to propmt an erc20 approve for this from the borrower to the lender

- `renegotiationAdminFee`: renegotiationFee admin portion based on determined by adminFeeInBasisPoints

### Event `ERC20Permit(address erc20Contract, bool isPermitted)`

This event is fired whenever the admin sets a ERC20 permit.

#### Parameters:

- `erc20Contract`: - Address of the ERC20 contract.

- `isPermitted`: - Signals ERC20 permit.
