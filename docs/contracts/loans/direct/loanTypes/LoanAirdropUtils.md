# `LoanAirdropUtils`

Helper library for LoanBase

## Functions:

- `pullAirdrop(uint32 _loanId, struct LoanData.LoanTerms _loan, address _target, bytes _data, address _nftAirdrop, uint256 _nftAirdropId, bool _is1155, uint256 _nftAirdropAmount, contract INftfiHub _hub) (external)`

- `wrapCollateral(uint32 _loanId, struct LoanData.LoanTerms _loan, contract INftfiHub _hub) (external)`

- `_transferNFT(struct LoanData.LoanTerms _loan, address _sender, address _recipient) (internal)`

- `_transferNFTtoAirdropReceiver(struct LoanData.LoanTerms _loan, address _airdropReceiverInstance, address _airdropBeneficiary) (internal)`

## Events:

- `AirdropPulledFlashloan(uint256 loanId, address borrower, uint256 nftCollateralId, address nftCollateralContract, address target, bytes data)`

- `CollateralWrapped(uint256 loanId, address borrower, uint256 nftCollateralId, address nftCollateralContract, uint256 receiverId, address receiverInstance)`

### Function `pullAirdrop(uint32 _loanId, struct LoanData.LoanTerms _loan, address _target, bytes _data, address _nftAirdrop, uint256 _nftAirdropId, bool _is1155, uint256 _nftAirdropAmount, contract INftfiHub _hub) external`

### Function `wrapCollateral(uint32 _loanId, struct LoanData.LoanTerms _loan, contract INftfiHub _hub) → address instance, uint256 receiverId external`

### Function `_transferNFT(struct LoanData.LoanTerms _loan, address _sender, address _recipient) internal`

Transfers several types of NFTs using a wrapper that knows how to handle each case.

#### Parameters:

- `_loan`: -

- `_sender`: - Current owner of the NFT

- `_recipient`: - Recipient of the transfer

### Function `_transferNFTtoAirdropReceiver(struct LoanData.LoanTerms _loan, address _airdropReceiverInstance, address _airdropBeneficiary) internal`

Transfers several types of NFTs to an airdrop receiver with an airdrop beneficiary

address attached as supplementing data using a wrapper that knows how to handle each case.

#### Parameters:

- `_loan`: -

- `_airdropReceiverInstance`: - Recipient of the transfer

- `_airdropBeneficiary`: - Beneficiary of the future airdops

### Event `AirdropPulledFlashloan(uint256 loanId, address borrower, uint256 nftCollateralId, address nftCollateralContract, address target, bytes data)`

This event is fired whenever a flashloan is initiated to pull an airdrop

#### Parameters:

- `loanId`: - A unique identifier for this particular loan, sourced from the Loan Coordinator.

- `borrower`: - The address of the borrower.

- `nftCollateralId`: - The ID within the AirdropReceiver for the NFT being used as collateral for this

loan.

- `nftCollateralContract`: - The ERC721 contract of the NFT collateral

- `target`: - address of the airdropping contract

- `data`: - function selector to be called

### Event `CollateralWrapped(uint256 loanId, address borrower, uint256 nftCollateralId, address nftCollateralContract, uint256 receiverId, address receiverInstance)`

This event is fired whenever the collateral gets wrapped in an airdrop receiver

#### Parameters:

- `loanId`: - A unique identifier for this particular loan, sourced from the Loan Coordinator.

- `borrower`: - The address of the borrower.

- `nftCollateralId`: - The ID within the AirdropReceiver for the NFT being used as collateral for this

loan.

- `nftCollateralContract`: - The contract of the NFT collateral

- `receiverId`: - id of the created AirdropReceiver, takes the place of nftCollateralId on the loan

- `receiverInstance`: - address of the created AirdropReceiver
