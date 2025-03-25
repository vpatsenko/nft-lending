Proposals.execute(uint256) (contracts/governance/Proposals.sol#215-229) sends eth to arbitrary user
Dangerous calls: - timelock.executeTransaction{value: proposal.values[i]}(proposal.targets[i],proposal.values[i],proposal.signatures[i],proposal.calldatas[i],proposal.eta) (contracts/governance/Proposals.sol#220-226)
--

## DirectLoanBase.\_renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#640-699) ignores return value by IERC20(loan.loanERC20Denomination).transferFrom(borrower,lender,\_renegotiationFee) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#694)

DirectLoanProRated.\_computeInterestDue(uint256,uint256,uint256,uint256,uint256) (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#313-329) performs a multiplication on the result of a division:
-interestDueAfterEntireDuration = (\_loanPrincipalAmount _ \_loanInterestRateForDurationInBasisPoints) / uint256(10000) (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#320-321)
-interestDueAfterElapsedDuration = (interestDueAfterEntireDuration _ \_loanDurationSoFarInSeconds) / \_loanTotalDurationAgreedTo (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#322-323)
--

## TestCryptoKitties.\_createKitty(uint256,uint256,uint256,uint256,address) (contracts/test/TestCryptoKitties.sol#282-328) uses a dangerous strict equality: - require(bool)(newKittenId == uint256(uint32(newKittenId))) (contracts/test/TestCryptoKitties.sol#318)

## Token.\_writeCheckpoint(address,uint32,uint96,uint96) (contracts/governance/votingImplementations/Token.sol#334-350) uses a dangerous strict equality: - \_nCheckpoints > 0 && checkpoints[\_delegatee][_ncheckpoints - 1].fromBlock == blockNumber (contracts/governance/votingImplementations/Token.sol#342)

Reentrancy in DirectLoanBase.\_renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#640-699):
External calls: - borrower = IERC721(loanCoordinator.obligationReceiptToken()).ownerOf(smartNftId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#655) - lender = IERC721(loanCoordinator.promissoryNoteToken()).ownerOf(smartNftId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#667) - IERC20(loan.loanERC20Denomination).transferFrom(borrower,lender,\_renegotiationFee) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#694)
State variables written after the call(s): - loan.loanDuration = \_newLoanDuration (contracts/loans/direct/loanTypes/DirectLoanBase.sol#697) - loan.maximumRepaymentAmount = \_newMaximumRepaymentAmount (contracts/loans/direct/loanTypes/DirectLoanBase.sol#698)
Reentrancy in DirectLoanBase.liquidateOverdueLoan(uint256) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#469-510):
External calls: - lender = IERC721(loanCoordinator.promissoryNoteToken()).ownerOf(smartNftId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#486) - borrower = IERC721(loanCoordinator.obligationReceiptToken()).ownerOf(smartNftId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#489) - \_resolveLoan(\_loanId,lender,loan,loanCoordinator) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#491) - Address.functionDelegateCall(\_loanTerms.nftCollateralWrapper,abi.encodeWithSelector(INftWrapper(\_loanTerms.nftCollateralWrapper).transferNFT.selector,\_sender,\_recipient,\_loanTerms.nftCollateralContract,\_loanTerms.nftCollateralId),NFT was not successfully transferred) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#939-949) - \_loanCoordinator.resolveLoan(\_loanId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#979)
State variables written after the call(s): - delete loanIdToLoan[_loanId] (contracts/loans/direct/loanTypes/DirectLoanBase.sol#508) - \_resolveLoan(\_loanId,lender,loan,loanCoordinator) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#491) - loanRepaidOrLiquidated[_loanId] = true (contracts/loans/direct/loanTypes/DirectLoanBase.sol#969)
Reentrancy in DirectLoanBase.payBackLoan(uint256) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#394-453):
External calls: - borrower = IERC721(loanCoordinator.obligationReceiptToken()).ownerOf(smartNftId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#401) - lender = IERC721(loanCoordinator.promissoryNoteToken()).ownerOf(smartNftId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#404) - IERC20(loan.loanERC20Denomination).safeTransferFrom(msg.sender,lender,payoffAmount) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#413) - IERC20(loan.loanERC20Denomination).safeTransferFrom(msg.sender,loanExtras.revenueSharePartner,revenueShare) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#422-426) - IERC20(loan.loanERC20Denomination).safeTransferFrom(msg.sender,owner(),adminFee) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#429) - \_resolveLoan(\_loanId,borrower,loan,loanCoordinator) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#431) - Address.functionDelegateCall(\_loanTerms.nftCollateralWrapper,abi.encodeWithSelector(INftWrapper(\_loanTerms.nftCollateralWrapper).transferNFT.selector,\_sender,\_recipient,\_loanTerms.nftCollateralContract,\_loanTerms.nftCollateralId),NFT was not successfully transferred) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#939-949) - \_loanCoordinator.resolveLoan(\_loanId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#979)
State variables written after the call(s): - delete loanIdToLoan[_loanId] (contracts/loans/direct/loanTypes/DirectLoanBase.sol#451) - delete loanIdToLoanExtras[_loanId] (contracts/loans/direct/loanTypes/DirectLoanBase.sol#452) - \_resolveLoan(\_loanId,borrower,loan,loanCoordinator) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#431) - loanRepaidOrLiquidated[_loanId] = true (contracts/loans/direct/loanTypes/DirectLoanBase.sol#969)
--

ERC9981155Extension.\_receive1155Child(uint256,address,uint256,uint256) (contracts/composable/ERC9981155Extension.sol#176-189) ignores return value by childContracts[_tokenId].add(\_childContract) (contracts/composable/ERC9981155Extension.sol#185)
ERC9981155Extension.\_receive1155Child(uint256,address,uint256,uint256) (contracts/composable/ERC9981155Extension.sol#176-189) ignores return value by childTokens[\_tokenId][_childcontract].add(\_childTokenId) (contracts/composable/ERC9981155Extension.sol#187)
ERC9981155Extension.\_remove1155Child(uint256,address,uint256,uint256) (contracts/composable/ERC9981155Extension.sol#212-233) ignores return value by childTokens[\_tokenId][_childcontract].remove(\_childTokenId) (contracts/composable/ERC9981155Extension.sol#226)
ERC9981155Extension.\_remove1155Child(uint256,address,uint256,uint256) (contracts/composable/ERC9981155Extension.sol#212-233) ignores return value by childContracts[_tokenId].remove(\_childContract) (contracts/composable/ERC9981155Extension.sol#230)
ERC998TopDown.rootOwnerOfChild(address,uint256) (contracts/composable/ERC998TopDown.sol#146-181) ignores return value by IERC998ERC721TopDown(rootOwnerAddress).rootOwnerOfChild(address(this),\_childTokenId) (contracts/composable/ERC998TopDown.sol#161-170)
ERC998TopDown.\_removeChild(uint256,address,uint256) (contracts/composable/ERC998TopDown.sol#389-402) ignores return value by childTokens[\_tokenId][_childcontract].remove(\_childTokenId) (contracts/composable/ERC998TopDown.sol#395)
ERC998TopDown.\_removeChild(uint256,address,uint256) (contracts/composable/ERC998TopDown.sol#389-402) ignores return value by childContracts[_tokenId].remove(\_childContract) (contracts/composable/ERC998TopDown.sol#400)
ERC998TopDown.\_receiveChild(address,uint256,address,uint256) (contracts/composable/ERC998TopDown.sol#430-444) ignores return value by childContracts[_tokenId].add(\_childContract) (contracts/composable/ERC998TopDown.sol#439)
ERC998TopDown.\_receiveChild(address,uint256,address,uint256) (contracts/composable/ERC998TopDown.sol#430-444) ignores return value by childTokens[\_tokenId][_childcontract].add(\_childTokenId) (contracts/composable/ERC998TopDown.sol#441)
Proposals.\_\_queueSetTimelockPendingAdmin(address,uint256) (contracts/governance/Proposals.sol#307-309) ignores return value by timelock.queueTransaction(address(timelock),0,setPendingAdmin(address),abi.encode(\_newPendingAdmin),\_eta) (contracts/governance/Proposals.sol#308)
Proposals.\_queueOrRevert(address,uint256,string,bytes,uint256) (contracts/governance/Proposals.sol#405-417) ignores return value by timelock.queueTransaction(\_target,\_value,\_signature,\_data,\_eta) (contracts/governance/Proposals.sol#416)
DirectLoanBase.\_transferNFT(LoanData.LoanTerms,address,address) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#934-950) ignores return value by Address.functionDelegateCall(\_loanTerms.nftCollateralWrapper,abi.encodeWithSelector(INftWrapper(\_loanTerms.nftCollateralWrapper).transferNFT.selector,\_sender,\_recipient,\_loanTerms.nftCollateralContract,\_loanTerms.nftCollateralId),NFT was not successfully transferred) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#939-949)
--

ImmutableBundle.constructor(address,string,string).\_name (contracts/composable/ImmutableBundle.sol#38) shadows:
ImmutableBundle.constructor(address,string,string).\_symbol (contracts/composable/ImmutableBundle.sol#39) shadows:
NftfiBundler.constructor(address,string,string).\_name (contracts/composable/NftfiBundler.sol#31) shadows:
NftfiBundler.constructor(address,string,string).\_symbol (contracts/composable/NftfiBundler.sol#32) shadows:
SmartNft.constructor(address,address,string,string).\_name (contracts/smartNft/SmartNft.sol#36) shadows:
SmartNft.constructor(address,address,string,string).\_symbol (contracts/smartNft/SmartNft.sol#37) shadows:
--

## MultisigVoting.setVoteThreshold(uint256) (contracts/governance/votingImplementations/MultisigVoting.sol#185-188) should emit an event for: - voteThreshold = \_voteThreshold (contracts/governance/votingImplementations/MultisigVoting.sol#187)

## Governable.setX(uint256) (contracts/test/Governable.sol#22-24) should emit an event for: - \_x = x (contracts/test/Governable.sol#23)

Timelock.constructor(address,uint256).\_admin (contracts/governance/Timelock.sol#87) lacks a zero-check on : - admin = \_admin (contracts/governance/Timelock.sol#91)
Timelock.setPendingAdmin(address).\_pendingAdmin (contracts/governance/Timelock.sol#136) lacks a zero-check on : - pendingAdmin = \_pendingAdmin (contracts/governance/Timelock.sol#137)
Timelock.executeTransaction(address,uint256,string,bytes,uint256).\_target (contracts/governance/Timelock.sol#203) lacks a zero-check on : - (success) = \_target.call{value: \_value}(callData) (contracts/governance/Timelock.sol#225)
--

Governable.constructor(address).owner (contracts/test/Governable.sol#14) lacks a zero-check on : - \_owner = owner (contracts/test/Governable.sol#15)
Governable.setOwner(address).owner (contracts/test/Governable.sol#18) lacks a zero-check on : - \_owner = owner (contracts/test/Governable.sol#19)
--

NftfiBundler.decomposeBundle(uint256,address) (contracts/composable/NftfiBundler.sol#54-84) has external calls inside a loop: IERC1155(childContract).safeTransferFrom(address(this),\_receiver,childId,balance,) (contracts/composable/NftfiBundler.sol#70)
NftfiBundler.decomposeBundle(uint256,address) (contracts/composable/NftfiBundler.sol#54-84) has external calls inside a loop: IERC721(childContract).safeTransferFrom(address(this),\_receiver,childId) (contracts/composable/NftfiBundler.sol#75-79)
--

Variable 'ERC998TopDown.rootOwnerOfChild(address,uint256).returnedRootOwner (contracts/composable/ERC998TopDown.sol#162)' in ERC998TopDown.rootOwnerOfChild(address,uint256) (contracts/composable/ERC998TopDown.sol#146-181) potentially used before declaration: returnedRootOwner & ERC998_MAGIC_MASK == ERC998_MAGIC_VALUE (contracts/composable/ERC998TopDown.sol#165)
Variable 'ERC998TopDown.rootOwnerOfChild(address,uint256).returnedRootOwner (contracts/composable/ERC998TopDown.sol#162)' in ERC998TopDown.rootOwnerOfChild(address,uint256) (contracts/composable/ERC998TopDown.sol#146-181) potentially used before declaration: returnedRootOwner (contracts/composable/ERC998TopDown.sol#166)
--

Reentrancy in DirectLoanBase.\_createLoan(bytes32,LoanData.LoanTerms,LoanData.LoanExtras,address,address,address) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#887-925):
External calls: - \_transferNFT(\_loanTerms,\_borrower,address(this)) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#897) - Address.functionDelegateCall(\_loanTerms.nftCollateralWrapper,abi.encodeWithSelector(INftWrapper(\_loanTerms.nftCollateralWrapper).transferNFT.selector,\_sender,\_recipient,\_loanTerms.nftCollateralContract,\_loanTerms.nftCollateralId),NFT was not successfully transferred) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#939-949) - IERC20(\_loanTerms.loanERC20Denomination).safeTransferFrom(\_lender,\_referrer,referralfee) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#907) - IERC20(\_loanTerms.loanERC20Denomination).safeTransferFrom(\_lender,\_borrower,principalAmount) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#910) - loanId = loanCoordinator.registerLoan(\_lender,\_borrower,\_loanType) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#917)
State variables written after the call(s): - loanIdToLoan[loanId] = \_loanTerms (contracts/loans/direct/loanTypes/DirectLoanBase.sol#921) - loanIdToLoanExtras[loanId] = \_loanExtras (contracts/loans/direct/loanTypes/DirectLoanBase.sol#922)
Reentrancy in ImmutableBundle.\_mintImmutableBundle(address,uint256) (contracts/composable/ImmutableBundle.sol#124-131):
External calls: - \_safeMint(\_to,immutableId) (contracts/composable/ImmutableBundle.sol#126)
State variables written after the call(s): - bundleOfImmutable[immutableId] = \_bundleId (contracts/composable/ImmutableBundle.sol#127) - immutableOfBundle[_bundleId] = immutableId (contracts/composable/ImmutableBundle.sol#128)
Reentrancy in DirectLoanBase.\_renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#640-699):
External calls: - borrower = IERC721(loanCoordinator.obligationReceiptToken()).ownerOf(smartNftId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#655) - lender = IERC721(loanCoordinator.promissoryNoteToken()).ownerOf(smartNftId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#667)
State variables written after the call(s): - \_nonceHasBeenUsedForUser[lender][_lendernonce] = true (contracts/loans/direct/loanTypes/DirectLoanBase.sol#670)
Reentrancy in DirectLoanBase.liquidateOverdueLoan(uint256) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#469-510):
External calls: - lender = IERC721(loanCoordinator.promissoryNoteToken()).ownerOf(smartNftId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#486) - borrower = IERC721(loanCoordinator.obligationReceiptToken()).ownerOf(smartNftId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#489) - \_resolveLoan(\_loanId,lender,loan,loanCoordinator) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#491) - Address.functionDelegateCall(\_loanTerms.nftCollateralWrapper,abi.encodeWithSelector(INftWrapper(\_loanTerms.nftCollateralWrapper).transferNFT.selector,\_sender,\_recipient,\_loanTerms.nftCollateralContract,\_loanTerms.nftCollateralId),NFT was not successfully transferred) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#939-949) - \_loanCoordinator.resolveLoan(\_loanId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#979)
State variables written after the call(s): - delete loanIdToLoanExtras[_loanId] (contracts/loans/direct/loanTypes/DirectLoanBase.sol#509)
Reentrancy in ImmutableBundle.mintBundle(address) (contracts/composable/ImmutableBundle.sol#50-53):
External calls: - bundleId = bundler.safeMint(address(this)) (contracts/composable/ImmutableBundle.sol#51) - \_mintImmutableBundle(\_to,bundleId) (contracts/composable/ImmutableBundle.sol#52)
State variables written after the call(s): - \_mintImmutableBundle(\_to,bundleId) (contracts/composable/ImmutableBundle.sol#52) - bundleOfImmutable[immutableId] = \_bundleId (contracts/composable/ImmutableBundle.sol#127) - \_mintImmutableBundle(\_to,bundleId) (contracts/composable/ImmutableBundle.sol#52) - immutableOfBundle[_bundleId] = immutableId (contracts/composable/ImmutableBundle.sol#128)
Reentrancy in DirectLoanCoordinator.registerLoan(address,address,bytes32) (contracts/loans/direct/DirectLoanCoordinator.sol#95-125):
External calls: - SmartNft(promissoryNoteToken).mint(\_lender,smartNftId,) (contracts/loans/direct/DirectLoanCoordinator.sol#114) - SmartNft(obligationReceiptToken).mint(\_borrower,smartNftId,) (contracts/loans/direct/DirectLoanCoordinator.sol#118)
State variables written after the call(s): - loans[totalNumLoans] = newLoan (contracts/loans/direct/DirectLoanCoordinator.sol#120)
--

Reentrancy in DirectLoanBase.\_acceptListing(bytes32,LoanData.LoanTerms,LoanData.LoanExtras,LoanData.ListingTerms,address,LoanData.Signature) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#711-727):
External calls: - loanId = \_createLoan(\_loanType,\_loanTerms,\_loanExtras,\_signature.signer,msg.sender,\_referrer) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#723) - Address.functionDelegateCall(\_loanTerms.nftCollateralWrapper,abi.encodeWithSelector(INftWrapper(\_loanTerms.nftCollateralWrapper).transferNFT.selector,\_sender,\_recipient,\_loanTerms.nftCollateralContract,\_loanTerms.nftCollateralId),NFT was not successfully transferred) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#939-949) - IERC20(\_loanTerms.loanERC20Denomination).safeTransferFrom(\_lender,\_referrer,referralfee) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#907) - IERC20(\_loanTerms.loanERC20Denomination).safeTransferFrom(\_lender,\_borrower,principalAmount) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#910) - loanId = loanCoordinator.registerLoan(\_lender,\_borrower,\_loanType) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#917)
External calls sending eth: - loanId = \_createLoan(\_loanType,\_loanTerms,\_loanExtras,\_signature.signer,msg.sender,\_referrer) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#723)
Event emitted after the call(s): - LoanStarted(loanId,\_signature.signer,msg.sender,\_loanTerms,\_loanExtras) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#726)
Reentrancy in DirectLoanBase.\_acceptOffer(bytes32,LoanData.LoanTerms,LoanData.LoanExtras,LoanData.Offer,LoanData.Signature) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#582-604):
External calls: - loanId = \_createLoan(\_loanType,\_loanTerms,\_loanExtras,msg.sender,\_signature.signer,\_offer.referrer) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#593-600) - Address.functionDelegateCall(\_loanTerms.nftCollateralWrapper,abi.encodeWithSelector(INftWrapper(\_loanTerms.nftCollateralWrapper).transferNFT.selector,\_sender,\_recipient,\_loanTerms.nftCollateralContract,\_loanTerms.nftCollateralId),NFT was not successfully transferred) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#939-949) - IERC20(\_loanTerms.loanERC20Denomination).safeTransferFrom(\_lender,\_referrer,referralfee) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#907) - IERC20(\_loanTerms.loanERC20Denomination).safeTransferFrom(\_lender,\_borrower,principalAmount) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#910) - loanId = loanCoordinator.registerLoan(\_lender,\_borrower,\_loanType) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#917)
External calls sending eth: - loanId = \_createLoan(\_loanType,\_loanTerms,\_loanExtras,msg.sender,\_signature.signer,\_offer.referrer) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#593-600)
Event emitted after the call(s): - LoanStarted(loanId,msg.sender,\_signature.signer,\_loanTerms,\_loanExtras) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#603)
Reentrancy in NftfiBundler.decomposeBundle(uint256,address) (contracts/composable/NftfiBundler.sol#54-84):
External calls: - IERC1155(childContract).safeTransferFrom(address(this),\_receiver,childId,balance,) (contracts/composable/NftfiBundler.sol#70)
Event emitted after the call(s): - Transfer1155Child(\_tokenId,\_receiver,childContract,childId,balance) (contracts/composable/NftfiBundler.sol#71)
Reentrancy in NftfiBundler.decomposeBundle(uint256,address) (contracts/composable/NftfiBundler.sol#54-84):
External calls: - IERC721(childContract).safeTransferFrom(address(this),\_receiver,childId) (contracts/composable/NftfiBundler.sol#75-79) - \_oldNFTsTransfer(\_receiver,childContract,childId) (contracts/composable/NftfiBundler.sol#78) - IERC721(\_childContract).approve(address(this),\_childTokenId) (contracts/composable/ERC998TopDown.sol#490-494) - IERC721(\_childContract).transferFrom(address(this),\_to,\_childTokenId) (contracts/composable/ERC998TopDown.sol#496)
Event emitted after the call(s): - TransferChild(\_tokenId,\_receiver,childContract,childId) (contracts/composable/NftfiBundler.sol#80)
Reentrancy in Timelock.executeTransaction(address,uint256,string,bytes,uint256) (contracts/governance/Timelock.sol#202-229):
External calls: - (success) = \_target.call{value: \_value}(callData) (contracts/governance/Timelock.sol#225)
Event emitted after the call(s): - ExecuteTransaction(txHash,\_target,\_value,\_signature,\_data,\_eta) (contracts/governance/Timelock.sol#228)
Reentrancy in DirectLoanBase.liquidateOverdueLoan(uint256) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#469-510):
External calls: - lender = IERC721(loanCoordinator.promissoryNoteToken()).ownerOf(smartNftId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#486) - borrower = IERC721(loanCoordinator.obligationReceiptToken()).ownerOf(smartNftId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#489) - \_resolveLoan(\_loanId,lender,loan,loanCoordinator) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#491) - Address.functionDelegateCall(\_loanTerms.nftCollateralWrapper,abi.encodeWithSelector(INftWrapper(\_loanTerms.nftCollateralWrapper).transferNFT.selector,\_sender,\_recipient,\_loanTerms.nftCollateralContract,\_loanTerms.nftCollateralId),NFT was not successfully transferred) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#939-949) - \_loanCoordinator.resolveLoan(\_loanId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#979)
Event emitted after the call(s): - LoanLiquidated(\_loanId,borrower,lender,loan.loanPrincipalAmount,loan.nftCollateralId,loanMaturityDate,block.timestamp,loan.nftCollateralContract) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#494-503)
Reentrancy in ImmutableBundle.mintBundle(address) (contracts/composable/ImmutableBundle.sol#50-53):
External calls: - bundleId = bundler.safeMint(address(this)) (contracts/composable/ImmutableBundle.sol#51) - \_mintImmutableBundle(\_to,bundleId) (contracts/composable/ImmutableBundle.sol#52)
Event emitted after the call(s): - \_mintImmutableBundle(\_to,bundleId) (contracts/composable/ImmutableBundle.sol#52)
Reentrancy in DirectLoanBase.payBackLoan(uint256) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#394-453):
External calls: - borrower = IERC721(loanCoordinator.obligationReceiptToken()).ownerOf(smartNftId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#401) - lender = IERC721(loanCoordinator.promissoryNoteToken()).ownerOf(smartNftId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#404) - IERC20(loan.loanERC20Denomination).safeTransferFrom(msg.sender,lender,payoffAmount) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#413) - IERC20(loan.loanERC20Denomination).safeTransferFrom(msg.sender,loanExtras.revenueSharePartner,revenueShare) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#422-426) - IERC20(loan.loanERC20Denomination).safeTransferFrom(msg.sender,owner(),adminFee) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#429) - \_resolveLoan(\_loanId,borrower,loan,loanCoordinator) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#431) - Address.functionDelegateCall(\_loanTerms.nftCollateralWrapper,abi.encodeWithSelector(INftWrapper(\_loanTerms.nftCollateralWrapper).transferNFT.selector,\_sender,\_recipient,\_loanTerms.nftCollateralContract,\_loanTerms.nftCollateralId),NFT was not successfully transferred) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#939-949) - \_loanCoordinator.resolveLoan(\_loanId) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#979)
Event emitted after the call(s): - LoanRepaid(\_loanId,borrower,lender,loan.loanPrincipalAmount,loan.nftCollateralId,payoffAmount,adminFee,revenueShare,loanExtras.revenueSharePartner,loan.nftCollateralContract,loan.loanERC20Denomination) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#434-446)
Reentrancy in DirectLoanCoordinator.registerLoan(address,address,bytes32) (contracts/loans/direct/DirectLoanCoordinator.sol#95-125):
External calls: - SmartNft(promissoryNoteToken).mint(\_lender,smartNftId,) (contracts/loans/direct/DirectLoanCoordinator.sol#114) - SmartNft(obligationReceiptToken).mint(\_borrower,smartNftId,) (contracts/loans/direct/DirectLoanCoordinator.sol#118)
Event emitted after the call(s): - UpdateStatus(totalNumLoans,loanContract,StatusType.NEW) (contracts/loans/direct/DirectLoanCoordinator.sol#122)
Reentrancy in DirectLoanCoordinator.resolveLoan(uint256) (contracts/loans/direct/DirectLoanCoordinator.sol#134-145):
External calls: - SmartNft(promissoryNoteToken).burn(loan.smartNftId) (contracts/loans/direct/DirectLoanCoordinator.sol#141) - SmartNft(obligationReceiptToken).burn(loan.smartNftId) (contracts/loans/direct/DirectLoanCoordinator.sol#142)
Event emitted after the call(s): - UpdateStatus(\_loanId,msg.sender,StatusType.RESOLVED) (contracts/loans/direct/DirectLoanCoordinator.sol#144)
Reentrancy in ERC9981155Extension.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes) (contracts/composable/ERC9981155Extension.sol#73-99):
External calls: - IERC1155(\_childContract).safeBatchTransferFrom(address(this),\_to,\_childTokenIds,\_amounts,\_data) (contracts/composable/ERC9981155Extension.sol#96)
Event emitted after the call(s): - Transfer1155BatchChild(\_tokenId,\_to,\_childContract,\_childTokenIds,\_amounts) (contracts/composable/ERC9981155Extension.sol#97)
Reentrancy in ERC9981155Extension.safeTransferChild(uint256,address,address,uint256,uint256,bytes) (contracts/composable/ERC9981155Extension.sol#45-62):
External calls: - IERC1155(\_childContract).safeTransferFrom(address(this),\_to,\_childTokenId,\_amount,\_data) (contracts/composable/ERC9981155Extension.sol#59)
Event emitted after the call(s): - Transfer1155Child(\_tokenId,\_to,\_childContract,\_childTokenId,\_amount) (contracts/composable/ERC9981155Extension.sol#60)
Reentrancy in ERC998TopDown.safeTransferChild(uint256,address,address,uint256) (contracts/composable/ERC998TopDown.sol#216-225):
External calls: - IERC721(\_childContract).safeTransferFrom(address(this),\_to,\_childTokenId) (contracts/composable/ERC998TopDown.sol#223)
Event emitted after the call(s): - TransferChild(\_fromTokenId,\_to,\_childContract,\_childTokenId) (contracts/composable/ERC998TopDown.sol#224)
Reentrancy in ERC998TopDown.safeTransferChild(uint256,address,address,uint256,bytes) (contracts/composable/ERC998TopDown.sol#235-249):
External calls: - IERC721(\_childContract).safeTransferFrom(address(this),\_to,\_childTokenId,\_data) (contracts/composable/ERC998TopDown.sol#246)
Event emitted after the call(s): - TransferChild(\_fromTokenId,\_to,\_childContract,\_childTokenId) (contracts/composable/ERC998TopDown.sol#247)
Reentrancy in ERC998TopDown.transferChild(uint256,address,address,uint256) (contracts/composable/ERC998TopDown.sol#258-267):
External calls: - \_oldNFTsTransfer(\_to,\_childContract,\_childTokenId) (contracts/composable/ERC998TopDown.sol#265) - IERC721(\_childContract).approve(address(this),\_childTokenId) (contracts/composable/ERC998TopDown.sol#490-494) - IERC721(\_childContract).transferFrom(address(this),\_to,\_childTokenId) (contracts/composable/ERC998TopDown.sol#496)
Event emitted after the call(s): - TransferChild(\_fromTokenId,\_to,\_childContract,\_childTokenId) (contracts/composable/ERC998TopDown.sol#266)
--

Proposals.state(uint256) (contracts/governance/Proposals.sol#368-388) uses timestamp for comparisons
Dangerous comparisons: - block.timestamp >= proposal.eta + timelock.GRACE_PERIOD() (contracts/governance/Proposals.sol#383)
Proposals.\_queueOrRevert(address,uint256,string,bytes,uint256) (contracts/governance/Proposals.sol#405-417) uses timestamp for comparisons
Dangerous comparisons: - require(bool,string)(! timelock.queuedTransactions(keccak256(bytes)(abi.encode(\_target,\_value,\_signature,\_data,\_eta))),\_queueOrRevert: proposal action already queued at eta) (contracts/governance/Proposals.sol#412-415)
Timelock.queueTransaction(address,uint256,string,bytes,uint256) (contracts/governance/Timelock.sol#153-167) uses timestamp for comparisons
Dangerous comparisons: - require(bool,string)(\_eta >= getBlockTimestamp() + delay,queueTransaction: Estimated execution block must satisfy delay.) (contracts/governance/Timelock.sol#160)
Timelock.executeTransaction(address,uint256,string,bytes,uint256) (contracts/governance/Timelock.sol#202-229) uses timestamp for comparisons
Dangerous comparisons: - require(bool,string)(getBlockTimestamp() >= \_eta,executeTransaction: Transaction hasn't surpassed time lock.) (contracts/governance/Timelock.sol#211) - require(bool,string)(getBlockTimestamp() <= \_eta + GRACE_PERIOD,executeTransaction: Transaction is stale.) (contracts/governance/Timelock.sol#212)
DirectLoanBase.liquidateOverdueLoan(uint256) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#469-510) uses timestamp for comparisons
Dangerous comparisons: - require(bool,string)(block.timestamp > loanMaturityDate,Loan is not overdue yet) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#481)
DirectLoanBase.\_renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#640-699) uses timestamp for comparisons
Dangerous comparisons: - require(bool,string)(block.timestamp <= (uint256(loan.loanStartTime) + \_newLoanDuration),New duration already expired) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#658)
DirectLoanProRated.\_computeInterestDue(uint256,uint256,uint256,uint256,uint256) (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#313-329) uses timestamp for comparisons
Dangerous comparisons: - \_loanPrincipalAmount + interestDueAfterElapsedDuration > \_maximumRepaymentAmount (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#324)
TestCryptoKitties.tokensOfOwner(address) (contracts/test/TestCryptoKitties.sol#225-249) uses timestamp for comparisons
Dangerous comparisons: - catId <= totalCats (contracts/test/TestCryptoKitties.sol#240)
TestCryptoKitties.\_createKitty(uint256,uint256,uint256,uint256,address) (contracts/test/TestCryptoKitties.sol#282-328) uses timestamp for comparisons
Dangerous comparisons: - require(bool)(newKittenId == uint256(uint32(newKittenId))) (contracts/test/TestCryptoKitties.sol#318)
NFTfiSigningUtils.isValidBorrowerSignature(LoanData.ListingTerms,LoanData.Signature) (contracts/utils/NFTfiSigningUtils.sol#94-111) uses timestamp for comparisons
Dangerous comparisons: - require(bool,string)(block.timestamp <= \_signature.expiry,Borrower Signature has expired) (contracts/utils/NFTfiSigningUtils.sol#99)
NFTfiSigningUtils.isValidLenderSignature(LoanData.Offer,LoanData.Signature) (contracts/utils/NFTfiSigningUtils.sol#168-185) uses timestamp for comparisons
Dangerous comparisons: - require(bool,string)(block.timestamp <= \_signature.expiry,Lender Signature has expired) (contracts/utils/NFTfiSigningUtils.sol#173)
NFTfiSigningUtils.isValidLenderRenegotiationSignature(uint256,uint32,uint256,uint256,address,uint256,uint256,bytes) (contracts/utils/NFTfiSigningUtils.sol#219-250) uses timestamp for comparisons
Dangerous comparisons: - require(bool,string)(block.timestamp <= \_expiry,Renegotiation Signature has expired) (contracts/utils/NFTfiSigningUtils.sol#229)
--

Token.delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32) (contracts/governance/votingImplementations/Token.sol#194-212) uses timestamp for comparisons
Dangerous comparisons: - require(bool,string)(block.timestamp <= \_expiry,Token::delegateBySig: signature expired) (contracts/governance/votingImplementations/Token.sol#210)
--

ERC998TopDown.ownerOfChild(address,uint256) (contracts/composable/ERC998TopDown.sol#109-123) uses assembly - INLINE ASM (contracts/composable/ERC998TopDown.sol#120-122)
ERC998TopDown.rootOwnerOfChild(address,uint256) (contracts/composable/ERC998TopDown.sol#146-181) uses assembly - INLINE ASM (contracts/composable/ERC998TopDown.sol#177-179)
ERC998TopDown.\_parseTokenId(bytes) (contracts/composable/ERC998TopDown.sol#469-474) uses assembly - INLINE ASM (contracts/composable/ERC998TopDown.sol#471-473)
QuorumVoting.getChainId() (contracts/governance/votingImplementations/QuorumVoting.sol#229-236) uses assembly - INLINE ASM (contracts/governance/votingImplementations/QuorumVoting.sol#232-234)
ContractKeys.getIdFromStringKey(string) (contracts/utils/ContractKeys.sol#22-29) uses assembly - INLINE ASM (contracts/utils/ContractKeys.sol#26-28)
NFTfiSigningUtils.getChainID() (contracts/utils/NFTfiSigningUtils.sol#28-35) uses assembly - INLINE ASM (contracts/utils/NFTfiSigningUtils.sol#31-33)
--

## Token.getChainId() (contracts/governance/votingImplementations/Token.sol#359-366) uses assembly - INLINE ASM (contracts/governance/votingImplementations/Token.sol#362-364)

MultisigVoting.castVote(uint256,bool) (contracts/governance/votingImplementations/MultisigVoting.sol#112-128) compares to a boolean constant:
-require(bool,string)(receipt.hasVoted == false,\_castVote: voter already voted) (contracts/governance/votingImplementations/MultisigVoting.sol#116)
MultisigVoting.addVoter(address) (contracts/governance/votingImplementations/MultisigVoting.sol#144-148) compares to a boolean constant:
-require(bool,string)(voters[_voter] == false,addVoter: Address is already a voter.) (contracts/governance/votingImplementations/MultisigVoting.sol#145)
MultisigVoting.removeVoter(address) (contracts/governance/votingImplementations/MultisigVoting.sol#154-158) compares to a boolean constant:
-require(bool,string)(voters[_voter] == true,setProposer: Address isn't a voter.) (contracts/governance/votingImplementations/MultisigVoting.sol#155)
MultisigVoting.setProposer(address,bool) (contracts/governance/votingImplementations/MultisigVoting.sol#176-179) compares to a boolean constant:
-require(bool,string)(voters[_proposer] == true,setProposer: Address isn't a voter.) (contracts/governance/votingImplementations/MultisigVoting.sol#177)
QuorumVoting.\_castVote(address,uint256,bool) (contracts/governance/votingImplementations/QuorumVoting.sol#194-220) compares to a boolean constant:
-require(bool,string)(receipt.hasVoted == false,GovernorAlpha::\_castVote: voter already voted) (contracts/governance/votingImplementations/QuorumVoting.sol#206)
-- - Version used: ['0.8.4', '^0.8.0'] - 0.8.4 (contracts/NftfiHub.sol#3) - 0.8.4 (contracts/composable/ERC9981155Extension.sol#3) - 0.8.4 (contracts/composable/ERC998TopDown.sol#3) - 0.8.4 (contracts/composable/ImmutableBundle.sol#3) - 0.8.4 (contracts/composable/NftfiBundler.sol#3) - 0.8.4 (contracts/governance/IProposals.sol#3) - 0.8.4 (contracts/governance/ITimelock.sol#3) - 0.8.4 (contracts/governance/IVoting.sol#3) - 0.8.4 (contracts/governance/Proposals.sol#3) - 0.8.4 (contracts/governance/Timelock.sol#3) - 0.8.4 (contracts/governance/votingImplementations/MultisigVoting.sol#3) - 0.8.4 (contracts/governance/votingImplementations/QuorumVoting.sol#3) - 0.8.4 (contracts/interfaces/ICryptoKitties.sol#2) - 0.8.4 (contracts/interfaces/IDirectLoanCoordinator.sol#3) - 0.8.4 (contracts/interfaces/IERC998ERC1155TopDown.sol#3) - 0.8.4 (contracts/interfaces/IERC998ERC721TopDown.sol#3) - 0.8.4 (contracts/interfaces/IERC998ERC721TopDownEnumerable.sol#3) - 0.8.4 (contracts/interfaces/INftTypeRegistry.sol#3) - 0.8.4 (contracts/interfaces/INftWrapper.sol#3) - 0.8.4 (contracts/interfaces/INftfiBundler.sol#3) - 0.8.4 (contracts/interfaces/INftfiHub.sol#3) - 0.8.4 (contracts/interfaces/IPermittedERC20s.sol#3) - 0.8.4 (contracts/interfaces/IPermittedNFTs.sol#3) - 0.8.4 (contracts/interfaces/IPermittedPartners.sol#3) - 0.8.4 (contracts/loans/BaseLoan.sol#3) - 0.8.4 (contracts/loans/LoanRegistry.sol#3) - 0.8.4 (contracts/loans/direct/DirectLoanCoordinator.sol#3) - 0.8.4 (contracts/loans/direct/loanTypes/DirectLoanBase.sol#3) - 0.8.4 (contracts/loans/direct/loanTypes/DirectLoanFixed.sol#3) - 0.8.4 (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#3) - 0.8.4 (contracts/loans/direct/loanTypes/LoanData.sol#3) - 0.8.4 (contracts/nftTypeRegistry/NftTypeRegistry.sol#3) - 0.8.4 (contracts/nftTypeRegistry/nftTypes/CryptoKittiesWrapper.sol#2) - 0.8.4 (contracts/nftTypeRegistry/nftTypes/ERC1155Wrapper.sol#2) - 0.8.4 (contracts/nftTypeRegistry/nftTypes/ERC721Wrapper.sol#2) - 0.8.4 (contracts/permittedLists/PermittedERC20s.sol#3) - 0.8.4 (contracts/permittedLists/PermittedNFTs.sol#3) - 0.8.4 (contracts/permittedLists/PermittedPartners.sol#3) - 0.8.4 (contracts/smartNft/SmartNft.sol#3) - 0.8.4 (contracts/test/TestBaseLoan.sol#2) - 0.8.4 (contracts/test/TestCryptoKitties.sol#2) - 0.8.4 (contracts/test/TestERC1155.sol#2) - ^0.8.0 (contracts/test/TestERC721.sol#2) - 0.8.4 (contracts/test/TestGaspMasks.sol#3) - 0.8.4 (contracts/test/TestNftReceiver.sol#2) - 0.8.4 (contracts/test/TestNonBundleRootOwner.sol#3) - ^0.8.0 (contracts/test/TestOwnable.sol#2) - ^0.8.0 (contracts/test/TestProposals.sol#3) - 0.8.4 (contracts/test/TestRealsies.sol#3) - 0.8.4 (contracts/utils/ContractKeys.sol#3) - 0.8.4 (contracts/utils/NFTfiSigningUtils.sol#3) - 0.8.4 (contracts/utils/NftReceiver.sol#2) - 0.8.4 (contracts/utils/Ownable.sol#3)
--

## DirectLoanBase.\_payoffAndFee(LoanData.LoanTerms) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#985) is never used and should be removed

Pragma version0.8.4 (contracts/NftfiHub.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/composable/ERC9981155Extension.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/composable/ERC998TopDown.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/composable/ImmutableBundle.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/composable/NftfiBundler.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/governance/IProposals.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/governance/ITimelock.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/governance/IVoting.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/governance/Proposals.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/governance/Timelock.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/governance/votingImplementations/MultisigVoting.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/governance/votingImplementations/QuorumVoting.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/interfaces/ICryptoKitties.sol#2) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/interfaces/IDirectLoanCoordinator.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/interfaces/IERC998ERC1155TopDown.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/interfaces/IERC998ERC721TopDown.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/interfaces/IERC998ERC721TopDownEnumerable.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/interfaces/INftTypeRegistry.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/interfaces/INftWrapper.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/interfaces/INftfiBundler.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/interfaces/INftfiHub.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/interfaces/IPermittedERC20s.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/interfaces/IPermittedNFTs.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/interfaces/IPermittedPartners.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/loans/BaseLoan.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/loans/LoanRegistry.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/loans/direct/DirectLoanCoordinator.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/loans/direct/loanTypes/DirectLoanBase.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/loans/direct/loanTypes/DirectLoanFixed.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/loans/direct/loanTypes/LoanData.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/nftTypeRegistry/NftTypeRegistry.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/nftTypeRegistry/nftTypes/CryptoKittiesWrapper.sol#2) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/nftTypeRegistry/nftTypes/ERC1155Wrapper.sol#2) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/nftTypeRegistry/nftTypes/ERC721Wrapper.sol#2) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/permittedLists/PermittedERC20s.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/permittedLists/PermittedNFTs.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/permittedLists/PermittedPartners.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/smartNft/SmartNft.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/test/TestBaseLoan.sol#2) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/test/TestCryptoKitties.sol#2) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/test/TestERC1155.sol#2) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version^0.8.0 (contracts/test/TestERC721.sol#2) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/test/TestGaspMasks.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/test/TestNftReceiver.sol#2) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/test/TestNonBundleRootOwner.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version^0.8.0 (contracts/test/TestOwnable.sol#2) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version^0.8.0 (contracts/test/TestProposals.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/test/TestRealsies.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/utils/ContractKeys.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/utils/NFTfiSigningUtils.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/utils/NftReceiver.sol#2) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
Pragma version0.8.4 (contracts/utils/Ownable.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6
--

## Pragma version0.8.4 (contracts/governance/votingImplementations/Token.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6

## Pragma version0.8.4 (contracts/test/Governable.sol#3) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6

## Low level call in Timelock.executeTransaction(address,uint256,string,bytes,uint256) (contracts/governance/Timelock.sol#202-229): - (success) = \_target.call{value: \_value}(callData) (contracts/governance/Timelock.sol#225)

## NftfiBundler (contracts/composable/NftfiBundler.sol#16-121) should inherit from INftfiBundler (contracts/interfaces/INftfiBundler.sol#7-11)

Parameter NftfiHub.setContract(string,address).\_contractKey (contracts/NftfiHub.sol#63) is not in mixedCase
Parameter NftfiHub.setContract(string,address).\_contractAddress (contracts/NftfiHub.sol#63) is not in mixedCase
Parameter NftfiHub.setContracts(string[],address[]).\_contractKeys (contracts/NftfiHub.sol#72) is not in mixedCase
Parameter NftfiHub.setContracts(string[],address[]).\_contractAddresses (contracts/NftfiHub.sol#72) is not in mixedCase
Parameter NftfiHub.getContract(bytes32).\_contractKey (contracts/NftfiHub.sol#80) is not in mixedCase
Parameter ERC9981155Extension.childBalance(uint256,address,uint256).\_tokenId (contracts/composable/ERC9981155Extension.sol#29) is not in mixedCase
Parameter ERC9981155Extension.childBalance(uint256,address,uint256).\_childContract (contracts/composable/ERC9981155Extension.sol#30) is not in mixedCase
Parameter ERC9981155Extension.childBalance(uint256,address,uint256).\_childTokenId (contracts/composable/ERC9981155Extension.sol#31) is not in mixedCase
Parameter ERC9981155Extension.safeTransferChild(uint256,address,address,uint256,uint256,bytes).\_tokenId (contracts/composable/ERC9981155Extension.sol#46) is not in mixedCase
Parameter ERC9981155Extension.safeTransferChild(uint256,address,address,uint256,uint256,bytes).\_to (contracts/composable/ERC9981155Extension.sol#47) is not in mixedCase
Parameter ERC9981155Extension.safeTransferChild(uint256,address,address,uint256,uint256,bytes).\_childContract (contracts/composable/ERC9981155Extension.sol#48) is not in mixedCase
Parameter ERC9981155Extension.safeTransferChild(uint256,address,address,uint256,uint256,bytes).\_childTokenId (contracts/composable/ERC9981155Extension.sol#49) is not in mixedCase
Parameter ERC9981155Extension.safeTransferChild(uint256,address,address,uint256,uint256,bytes).\_amount (contracts/composable/ERC9981155Extension.sol#50) is not in mixedCase
Parameter ERC9981155Extension.safeTransferChild(uint256,address,address,uint256,uint256,bytes).\_data (contracts/composable/ERC9981155Extension.sol#51) is not in mixedCase
Parameter ERC9981155Extension.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).\_tokenId (contracts/composable/ERC9981155Extension.sol#74) is not in mixedCase
Parameter ERC9981155Extension.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).\_to (contracts/composable/ERC9981155Extension.sol#75) is not in mixedCase
Parameter ERC9981155Extension.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).\_childContract (contracts/composable/ERC9981155Extension.sol#76) is not in mixedCase
Parameter ERC9981155Extension.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).\_childTokenIds (contracts/composable/ERC9981155Extension.sol#77) is not in mixedCase
Parameter ERC9981155Extension.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).\_amounts (contracts/composable/ERC9981155Extension.sol#78) is not in mixedCase
Parameter ERC9981155Extension.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).\_data (contracts/composable/ERC9981155Extension.sol#79) is not in mixedCase
Parameter ERC9981155Extension.onERC1155Received(address,address,uint256,uint256,bytes).\_from (contracts/composable/ERC9981155Extension.sol#112) is not in mixedCase
Parameter ERC9981155Extension.onERC1155Received(address,address,uint256,uint256,bytes).\_id (contracts/composable/ERC9981155Extension.sol#113) is not in mixedCase
Parameter ERC9981155Extension.onERC1155Received(address,address,uint256,uint256,bytes).\_amount (contracts/composable/ERC9981155Extension.sol#114) is not in mixedCase
Parameter ERC9981155Extension.onERC1155Received(address,address,uint256,uint256,bytes).\_data (contracts/composable/ERC9981155Extension.sol#115) is not in mixedCase
Parameter ERC9981155Extension.onERC1155BatchReceived(address,address,uint256[],uint256[],bytes).\_from (contracts/composable/ERC9981155Extension.sol#132) is not in mixedCase
Parameter ERC9981155Extension.onERC1155BatchReceived(address,address,uint256[],uint256[],bytes).\_ids (contracts/composable/ERC9981155Extension.sol#133) is not in mixedCase
Parameter ERC9981155Extension.onERC1155BatchReceived(address,address,uint256[],uint256[],bytes).\_values (contracts/composable/ERC9981155Extension.sol#134) is not in mixedCase
Parameter ERC9981155Extension.onERC1155BatchReceived(address,address,uint256[],uint256[],bytes).\_data (contracts/composable/ERC9981155Extension.sol#135) is not in mixedCase
Parameter ERC998TopDown.childExists(address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#47) is not in mixedCase
Parameter ERC998TopDown.childExists(address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#47) is not in mixedCase
Parameter ERC998TopDown.totalChildContracts(uint256).\_tokenId (contracts/composable/ERC998TopDown.sol#57) is not in mixedCase
Parameter ERC998TopDown.childContractByIndex(uint256,uint256).\_tokenId (contracts/composable/ERC998TopDown.sol#67) is not in mixedCase
Parameter ERC998TopDown.childContractByIndex(uint256,uint256).\_index (contracts/composable/ERC998TopDown.sol#67) is not in mixedCase
Parameter ERC998TopDown.totalChildTokens(uint256,address).\_tokenId (contracts/composable/ERC998TopDown.sol#83) is not in mixedCase
Parameter ERC998TopDown.totalChildTokens(uint256,address).\_childContract (contracts/composable/ERC998TopDown.sol#83) is not in mixedCase
Parameter ERC998TopDown.childTokenByIndex(uint256,address,uint256).\_tokenId (contracts/composable/ERC998TopDown.sol#95) is not in mixedCase
Parameter ERC998TopDown.childTokenByIndex(uint256,address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#96) is not in mixedCase
Parameter ERC998TopDown.childTokenByIndex(uint256,address,uint256).\_index (contracts/composable/ERC998TopDown.sol#97) is not in mixedCase
Parameter ERC998TopDown.ownerOfChild(address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#109) is not in mixedCase
Parameter ERC998TopDown.ownerOfChild(address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#109) is not in mixedCase
Parameter ERC998TopDown.rootOwnerOf(uint256).\_tokenId (contracts/composable/ERC998TopDown.sol#130) is not in mixedCase
Parameter ERC998TopDown.rootOwnerOfChild(address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#146) is not in mixedCase
Parameter ERC998TopDown.rootOwnerOfChild(address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#146) is not in mixedCase
Parameter ERC998TopDown.supportsInterface(bytes4).\_interfaceId (contracts/composable/ERC998TopDown.sol#189) is not in mixedCase
Parameter ERC998TopDown.safeMint(address).\_to (contracts/composable/ERC998TopDown.sol#202) is not in mixedCase
Parameter ERC998TopDown.safeTransferChild(uint256,address,address,uint256).\_fromTokenId (contracts/composable/ERC998TopDown.sol#217) is not in mixedCase
Parameter ERC998TopDown.safeTransferChild(uint256,address,address,uint256).\_to (contracts/composable/ERC998TopDown.sol#218) is not in mixedCase
Parameter ERC998TopDown.safeTransferChild(uint256,address,address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#219) is not in mixedCase
Parameter ERC998TopDown.safeTransferChild(uint256,address,address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#220) is not in mixedCase
Parameter ERC998TopDown.safeTransferChild(uint256,address,address,uint256,bytes).\_fromTokenId (contracts/composable/ERC998TopDown.sol#236) is not in mixedCase
Parameter ERC998TopDown.safeTransferChild(uint256,address,address,uint256,bytes).\_to (contracts/composable/ERC998TopDown.sol#237) is not in mixedCase
Parameter ERC998TopDown.safeTransferChild(uint256,address,address,uint256,bytes).\_childContract (contracts/composable/ERC998TopDown.sol#238) is not in mixedCase
Parameter ERC998TopDown.safeTransferChild(uint256,address,address,uint256,bytes).\_childTokenId (contracts/composable/ERC998TopDown.sol#239) is not in mixedCase
Parameter ERC998TopDown.safeTransferChild(uint256,address,address,uint256,bytes).\_data (contracts/composable/ERC998TopDown.sol#240) is not in mixedCase
Parameter ERC998TopDown.transferChild(uint256,address,address,uint256).\_fromTokenId (contracts/composable/ERC998TopDown.sol#259) is not in mixedCase
Parameter ERC998TopDown.transferChild(uint256,address,address,uint256).\_to (contracts/composable/ERC998TopDown.sol#260) is not in mixedCase
Parameter ERC998TopDown.transferChild(uint256,address,address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#261) is not in mixedCase
Parameter ERC998TopDown.transferChild(uint256,address,address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#262) is not in mixedCase
Parameter ERC998TopDown.getChild(address,uint256,address,uint256).\_from (contracts/composable/ERC998TopDown.sol#294) is not in mixedCase
Parameter ERC998TopDown.getChild(address,uint256,address,uint256).\_tokenId (contracts/composable/ERC998TopDown.sol#295) is not in mixedCase
Parameter ERC998TopDown.getChild(address,uint256,address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#296) is not in mixedCase
Parameter ERC998TopDown.getChild(address,uint256,address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#297) is not in mixedCase
Parameter ERC998TopDown.onERC721Received(address,address,uint256,bytes).\_from (contracts/composable/ERC998TopDown.sol#313) is not in mixedCase
Parameter ERC998TopDown.onERC721Received(address,address,uint256,bytes).\_childTokenId (contracts/composable/ERC998TopDown.sol#314) is not in mixedCase
Parameter ERC998TopDown.onERC721Received(address,address,uint256,bytes).\_data (contracts/composable/ERC998TopDown.sol#315) is not in mixedCase
Parameter ImmutableBundle.mintBundle(address).\_to (contracts/composable/ImmutableBundle.sol#50) is not in mixedCase
Parameter ImmutableBundle.onERC721Received(address,address,uint256,bytes).\_from (contracts/composable/ImmutableBundle.sol#65) is not in mixedCase
Parameter ImmutableBundle.onERC721Received(address,address,uint256,bytes).\_bundleId (contracts/composable/ImmutableBundle.sol#66) is not in mixedCase
Parameter ImmutableBundle.withdraw(uint256,address).\_immutableId (contracts/composable/ImmutableBundle.sol#84) is not in mixedCase
Parameter ImmutableBundle.withdraw(uint256,address).\_to (contracts/composable/ImmutableBundle.sol#84) is not in mixedCase
Parameter ImmutableBundle.withdrawAndDecompose(uint256,address).\_immutableId (contracts/composable/ImmutableBundle.sol#98) is not in mixedCase
Parameter ImmutableBundle.withdrawAndDecompose(uint256,address).\_to (contracts/composable/ImmutableBundle.sol#98) is not in mixedCase
Parameter NftfiBundler.permittedAsset(address).\_asset (contracts/composable/NftfiBundler.sol#42) is not in mixedCase
Parameter NftfiBundler.decomposeBundle(uint256,address).\_tokenId (contracts/composable/NftfiBundler.sol#54) is not in mixedCase
Parameter NftfiBundler.decomposeBundle(uint256,address).\_receiver (contracts/composable/NftfiBundler.sol#54) is not in mixedCase
Function ITimelock.GRACE_PERIOD() (contracts/governance/ITimelock.sol#89) is not in mixedCase
Parameter Proposals.getProposals(uint256).\_proposalId (contracts/governance/Proposals.sol#107) is not in mixedCase
Parameter Proposals.propose(address[],uint256[],string[],bytes[],bytes32,string).\_targets (contracts/governance/Proposals.sol#123) is not in mixedCase
Parameter Proposals.propose(address[],uint256[],string[],bytes[],bytes32,string).\_values (contracts/governance/Proposals.sol#124) is not in mixedCase
Parameter Proposals.propose(address[],uint256[],string[],bytes[],bytes32,string).\_signatures (contracts/governance/Proposals.sol#125) is not in mixedCase
Parameter Proposals.propose(address[],uint256[],string[],bytes[],bytes32,string).\_calldatas (contracts/governance/Proposals.sol#126) is not in mixedCase
Parameter Proposals.propose(address[],uint256[],string[],bytes[],bytes32,string).\_votingId (contracts/governance/Proposals.sol#127) is not in mixedCase
Parameter Proposals.propose(address[],uint256[],string[],bytes[],bytes32,string).\_description (contracts/governance/Proposals.sol#128) is not in mixedCase
Parameter Proposals.queue(uint256).\_proposalId (contracts/governance/Proposals.sol#200) is not in mixedCase
Parameter Proposals.execute(uint256).\_proposalId (contracts/governance/Proposals.sol#215) is not in mixedCase
Parameter Proposals.cancel(uint256).\_proposalId (contracts/governance/Proposals.sol#235) is not in mixedCase
Parameter Proposals.addVoting(bytes32,address).\_id (contracts/governance/Proposals.sol#261) is not in mixedCase
Parameter Proposals.addVoting(bytes32,address).\_voting (contracts/governance/Proposals.sol#261) is not in mixedCase
Parameter Proposals.setGovernableEndpoint(address,bytes32,bool).\_endpointAddress (contracts/governance/Proposals.sol#280) is not in mixedCase
Parameter Proposals.setGovernableEndpoint(address,bytes32,bool).\_votingId (contracts/governance/Proposals.sol#281) is not in mixedCase
Parameter Proposals.setGovernableEndpoint(address,bytes32,bool).\_canGovern (contracts/governance/Proposals.sol#282) is not in mixedCase
Function Proposals.**acceptTimelockAdmin() (contracts/governance/Proposals.sol#297-299) is not in mixedCase
Function Proposals.**queueSetTimelockPendingAdmin(address,uint256) (contracts/governance/Proposals.sol#307-309) is not in mixedCase
Parameter Proposals.**queueSetTimelockPendingAdmin(address,uint256).\_newPendingAdmin (contracts/governance/Proposals.sol#307) is not in mixedCase
Parameter Proposals.**queueSetTimelockPendingAdmin(address,uint256).\_eta (contracts/governance/Proposals.sol#307) is not in mixedCase
Function Proposals.**executeSetTimelockPendingAdmin(address,uint256) (contracts/governance/Proposals.sol#317-325) is not in mixedCase
Parameter Proposals.**executeSetTimelockPendingAdmin(address,uint256).\_newPendingAdmin (contracts/governance/Proposals.sol#317) is not in mixedCase
Parameter Proposals.\_\_executeSetTimelockPendingAdmin(address,uint256).\_eta (contracts/governance/Proposals.sol#317) is not in mixedCase
Parameter Proposals.getResult(uint256).\_proposalId (contracts/governance/Proposals.sol#335) is not in mixedCase
Parameter Proposals.getActions(uint256).\_proposalId (contracts/governance/Proposals.sol#349) is not in mixedCase
Parameter Proposals.state(uint256).\_proposalId (contracts/governance/Proposals.sol#368) is not in mixedCase
Parameter Timelock.setDelay(uint256).\_delay (contracts/governance/Timelock.sol#113) is not in mixedCase
Parameter Timelock.setPendingAdmin(address).\_pendingAdmin (contracts/governance/Timelock.sol#136) is not in mixedCase
Parameter Timelock.queueTransaction(address,uint256,string,bytes,uint256).\_target (contracts/governance/Timelock.sol#154) is not in mixedCase
Parameter Timelock.queueTransaction(address,uint256,string,bytes,uint256).\_value (contracts/governance/Timelock.sol#155) is not in mixedCase
Parameter Timelock.queueTransaction(address,uint256,string,bytes,uint256).\_signature (contracts/governance/Timelock.sol#156) is not in mixedCase
Parameter Timelock.queueTransaction(address,uint256,string,bytes,uint256).\_data (contracts/governance/Timelock.sol#157) is not in mixedCase
Parameter Timelock.queueTransaction(address,uint256,string,bytes,uint256).\_eta (contracts/governance/Timelock.sol#158) is not in mixedCase
Parameter Timelock.cancelTransaction(address,uint256,string,bytes,uint256).\_target (contracts/governance/Timelock.sol#180) is not in mixedCase
Parameter Timelock.cancelTransaction(address,uint256,string,bytes,uint256).\_value (contracts/governance/Timelock.sol#181) is not in mixedCase
Parameter Timelock.cancelTransaction(address,uint256,string,bytes,uint256).\_signature (contracts/governance/Timelock.sol#182) is not in mixedCase
Parameter Timelock.cancelTransaction(address,uint256,string,bytes,uint256).\_data (contracts/governance/Timelock.sol#183) is not in mixedCase
Parameter Timelock.cancelTransaction(address,uint256,string,bytes,uint256).\_eta (contracts/governance/Timelock.sol#184) is not in mixedCase
Parameter Timelock.executeTransaction(address,uint256,string,bytes,uint256).\_target (contracts/governance/Timelock.sol#203) is not in mixedCase
Parameter Timelock.executeTransaction(address,uint256,string,bytes,uint256).\_value (contracts/governance/Timelock.sol#204) is not in mixedCase
Parameter Timelock.executeTransaction(address,uint256,string,bytes,uint256).\_signature (contracts/governance/Timelock.sol#205) is not in mixedCase
Parameter Timelock.executeTransaction(address,uint256,string,bytes,uint256).\_data (contracts/governance/Timelock.sol#206) is not in mixedCase
Parameter Timelock.executeTransaction(address,uint256,string,bytes,uint256).\_eta (contracts/governance/Timelock.sol#207) is not in mixedCase
Parameter MultisigVoting.canPropose(address).\_proposer (contracts/governance/votingImplementations/MultisigVoting.sol#87) is not in mixedCase
Parameter MultisigVoting.getMajorityResult(uint256).\_proposalId (contracts/governance/votingImplementations/MultisigVoting.sol#96) is not in mixedCase
Parameter MultisigVoting.castVote(uint256,bool).\_proposalId (contracts/governance/votingImplementations/MultisigVoting.sol#112) is not in mixedCase
Parameter MultisigVoting.castVote(uint256,bool).\_support (contracts/governance/votingImplementations/MultisigVoting.sol#112) is not in mixedCase
Parameter MultisigVoting.addVoters(address[]).\_voters (contracts/governance/votingImplementations/MultisigVoting.sol#134) is not in mixedCase
Parameter MultisigVoting.addVoter(address).\_voter (contracts/governance/votingImplementations/MultisigVoting.sol#144) is not in mixedCase
Parameter MultisigVoting.removeVoter(address).\_voter (contracts/governance/votingImplementations/MultisigVoting.sol#154) is not in mixedCase
Parameter MultisigVoting.setProposers(address[],bool).\_proposers (contracts/governance/votingImplementations/MultisigVoting.sol#165) is not in mixedCase
Parameter MultisigVoting.setProposers(address[],bool).\_canPropose (contracts/governance/votingImplementations/MultisigVoting.sol#165) is not in mixedCase
Parameter MultisigVoting.setProposer(address,bool).\_proposer (contracts/governance/votingImplementations/MultisigVoting.sol#176) is not in mixedCase
Parameter MultisigVoting.setProposer(address,bool).\_canPropose (contracts/governance/votingImplementations/MultisigVoting.sol#176) is not in mixedCase
Parameter MultisigVoting.setVoteThreshold(uint256).\_voteThreshold (contracts/governance/votingImplementations/MultisigVoting.sol#185) is not in mixedCase
Parameter MultisigVoting.getReceipt(uint256,address).\_proposalId (contracts/governance/votingImplementations/MultisigVoting.sol#200) is not in mixedCase
Parameter MultisigVoting.getReceipt(uint256,address).\_voter (contracts/governance/votingImplementations/MultisigVoting.sol#200) is not in mixedCase
Parameter QuorumVoting.canPropose(address).\_proposer (contracts/governance/votingImplementations/QuorumVoting.sol#116) is not in mixedCase
Parameter QuorumVoting.getMajorityResult(uint256).\_proposalId (contracts/governance/votingImplementations/QuorumVoting.sol#125) is not in mixedCase
Parameter QuorumVoting.castVote(uint256,bool).\_proposalId (contracts/governance/votingImplementations/QuorumVoting.sol#141) is not in mixedCase
Parameter QuorumVoting.castVote(uint256,bool).\_support (contracts/governance/votingImplementations/QuorumVoting.sol#141) is not in mixedCase
Parameter QuorumVoting.castVoteBySig(uint256,bool,uint8,bytes32,bytes32).\_proposalId (contracts/governance/votingImplementations/QuorumVoting.sol#154) is not in mixedCase
Parameter QuorumVoting.castVoteBySig(uint256,bool,uint8,bytes32,bytes32).\_support (contracts/governance/votingImplementations/QuorumVoting.sol#155) is not in mixedCase
Parameter QuorumVoting.castVoteBySig(uint256,bool,uint8,bytes32,bytes32).\_v (contracts/governance/votingImplementations/QuorumVoting.sol#156) is not in mixedCase
Parameter QuorumVoting.castVoteBySig(uint256,bool,uint8,bytes32,bytes32).\_r (contracts/governance/votingImplementations/QuorumVoting.sol#157) is not in mixedCase
Parameter QuorumVoting.castVoteBySig(uint256,bool,uint8,bytes32,bytes32).\_s (contracts/governance/votingImplementations/QuorumVoting.sol#158) is not in mixedCase
Parameter QuorumVoting.getReceipt(uint256,address).\_proposalId (contracts/governance/votingImplementations/QuorumVoting.sol#180) is not in mixedCase
Parameter QuorumVoting.getReceipt(uint256,address).\_voter (contracts/governance/votingImplementations/QuorumVoting.sol#180) is not in mixedCase
Parameter LoanRegistry.registerLoan(string,address).\_loanType (contracts/loans/LoanRegistry.sol#71) is not in mixedCase
Parameter LoanRegistry.registerLoan(string,address).\_loanContract (contracts/loans/LoanRegistry.sol#71) is not in mixedCase
Parameter LoanRegistry.registerLoans(string[],address[]).\_loanTypes (contracts/loans/LoanRegistry.sol#82) is not in mixedCase
Parameter LoanRegistry.registerLoans(string[],address[]).\_loanContracts (contracts/loans/LoanRegistry.sol#82) is not in mixedCase
Parameter LoanRegistry.getContractFromType(bytes32).\_loanType (contracts/loans/LoanRegistry.sol#91) is not in mixedCase
Parameter LoanRegistry.getTypeFromContract(address).\_loanContract (contracts/loans/LoanRegistry.sol#100) is not in mixedCase
Parameter DirectLoanCoordinator.initialize(address,address).\_promissoryNoteToken (contracts/loans/direct/DirectLoanCoordinator.sol#75) is not in mixedCase
Parameter DirectLoanCoordinator.initialize(address,address).\_obligationReceiptToken (contracts/loans/direct/DirectLoanCoordinator.sol#75) is not in mixedCase
Parameter DirectLoanCoordinator.registerLoan(address,address,bytes32).\_lender (contracts/loans/direct/DirectLoanCoordinator.sol#96) is not in mixedCase
Parameter DirectLoanCoordinator.registerLoan(address,address,bytes32).\_borrower (contracts/loans/direct/DirectLoanCoordinator.sol#97) is not in mixedCase
Parameter DirectLoanCoordinator.registerLoan(address,address,bytes32).\_loanType (contracts/loans/direct/DirectLoanCoordinator.sol#98) is not in mixedCase
Parameter DirectLoanCoordinator.resolveLoan(uint256).\_loanId (contracts/loans/direct/DirectLoanCoordinator.sol#134) is not in mixedCase
Parameter DirectLoanCoordinator.getLoanData(uint256).\_loanId (contracts/loans/direct/DirectLoanCoordinator.sol#152) is not in mixedCase
Parameter DirectLoanBase.updateMaximumLoanDuration(uint256).\_newMaximumLoanDuration (contracts/loans/direct/loanTypes/DirectLoanBase.sol#353) is not in mixedCase
Parameter DirectLoanBase.updateMaximumNumberOfActiveLoans(uint256).\_newMaximumNumberOfActiveLoans (contracts/loans/direct/loanTypes/DirectLoanBase.sol#366) is not in mixedCase
Parameter DirectLoanBase.updateAdminFee(uint256).\_newAdminFeeInBasisPoints (contracts/loans/direct/loanTypes/DirectLoanBase.sol#377) is not in mixedCase
Parameter DirectLoanBase.payBackLoan(uint256).\_loanId (contracts/loans/direct/loanTypes/DirectLoanBase.sol#394) is not in mixedCase
Parameter DirectLoanBase.liquidateOverdueLoan(uint256).\_loanId (contracts/loans/direct/loanTypes/DirectLoanBase.sol#469) is not in mixedCase
Parameter DirectLoanBase.cancelLoanCommitmentBeforeLoanHasBegun(uint256).\_nonce (contracts/loans/direct/loanTypes/DirectLoanBase.sol#528) is not in mixedCase
Parameter DirectLoanBase.getWhetherNonceHasBeenUsedForUser(address,uint256).\_user (contracts/loans/direct/loanTypes/DirectLoanBase.sol#565) is not in mixedCase
Parameter DirectLoanBase.getWhetherNonceHasBeenUsedForUser(address,uint256).\_nonce (contracts/loans/direct/loanTypes/DirectLoanBase.sol#565) is not in mixedCase
Variable DirectLoanBase.LOAN_COORDINATOR (contracts/loans/direct/loanTypes/DirectLoanBase.sol#85) is not in mixedCase
Parameter DirectLoanFixed.acceptOffer(LoanData.Offer,LoanData.Signature,LoanData.BorrowerSettings).\_offer (contracts/loans/direct/loanTypes/DirectLoanFixed.sol#93) is not in mixedCase
Parameter DirectLoanFixed.acceptOffer(LoanData.Offer,LoanData.Signature,LoanData.BorrowerSettings).\_signature (contracts/loans/direct/loanTypes/DirectLoanFixed.sol#94) is not in mixedCase
Parameter DirectLoanFixed.acceptOffer(LoanData.Offer,LoanData.Signature,LoanData.BorrowerSettings).\_borrowerSettings (contracts/loans/direct/loanTypes/DirectLoanFixed.sol#95) is not in mixedCase
Parameter DirectLoanFixed.acceptListing(LoanData.ListingTerms,LoanData.Offer,LoanData.Signature).\_listingTerms (contracts/loans/direct/loanTypes/DirectLoanFixed.sol#115) is not in mixedCase
Parameter DirectLoanFixed.acceptListing(LoanData.ListingTerms,LoanData.Offer,LoanData.Signature).\_offer (contracts/loans/direct/loanTypes/DirectLoanFixed.sol#116) is not in mixedCase
Parameter DirectLoanFixed.acceptListing(LoanData.ListingTerms,LoanData.Offer,LoanData.Signature).\_signature (contracts/loans/direct/loanTypes/DirectLoanFixed.sol#117) is not in mixedCase
Parameter DirectLoanFixed.renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes).\_loanId (contracts/loans/direct/loanTypes/DirectLoanFixed.sol#161) is not in mixedCase
Parameter DirectLoanFixed.renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes).\_newLoanDuration (contracts/loans/direct/loanTypes/DirectLoanFixed.sol#162) is not in mixedCase
Parameter DirectLoanFixed.renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes).\_newMaximumRepaymentAmount (contracts/loans/direct/loanTypes/DirectLoanFixed.sol#163) is not in mixedCase
Parameter DirectLoanFixed.renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes).\_renegotiationFee (contracts/loans/direct/loanTypes/DirectLoanFixed.sol#164) is not in mixedCase
Parameter DirectLoanFixed.renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes).\_lenderNonce (contracts/loans/direct/loanTypes/DirectLoanFixed.sol#165) is not in mixedCase
Parameter DirectLoanFixed.renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes).\_expiry (contracts/loans/direct/loanTypes/DirectLoanFixed.sol#166) is not in mixedCase
Parameter DirectLoanFixed.renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes).\_lenderSignature (contracts/loans/direct/loanTypes/DirectLoanFixed.sol#167) is not in mixedCase
Parameter DirectLoanFixed.getPayoffAmount(uint256).\_loanId (contracts/loans/direct/loanTypes/DirectLoanFixed.sol#193) is not in mixedCase
Parameter DirectLoanProRated.acceptOffer(LoanData.Offer,LoanData.Signature,LoanData.BorrowerSettings).\_offer (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#92) is not in mixedCase
Parameter DirectLoanProRated.acceptOffer(LoanData.Offer,LoanData.Signature,LoanData.BorrowerSettings).\_signature (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#93) is not in mixedCase
Parameter DirectLoanProRated.acceptOffer(LoanData.Offer,LoanData.Signature,LoanData.BorrowerSettings).\_borrowerSettings (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#94) is not in mixedCase
Parameter DirectLoanProRated.acceptListing(LoanData.ListingTerms,LoanData.Offer,LoanData.Signature).\_listingTerms (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#114) is not in mixedCase
Parameter DirectLoanProRated.acceptListing(LoanData.ListingTerms,LoanData.Offer,LoanData.Signature).\_offer (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#115) is not in mixedCase
Parameter DirectLoanProRated.acceptListing(LoanData.ListingTerms,LoanData.Offer,LoanData.Signature).\_signature (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#116) is not in mixedCase
Parameter DirectLoanProRated.renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes).\_loanId (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#160) is not in mixedCase
Parameter DirectLoanProRated.renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes).\_newLoanDuration (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#161) is not in mixedCase
Parameter DirectLoanProRated.renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes).\_newMaximumRepaymentAmount (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#162) is not in mixedCase
Parameter DirectLoanProRated.renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes).\_renegotiationFee (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#163) is not in mixedCase
Parameter DirectLoanProRated.renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes).\_lenderNonce (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#164) is not in mixedCase
Parameter DirectLoanProRated.renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes).\_expiry (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#165) is not in mixedCase
Parameter DirectLoanProRated.renegotiateLoan(uint256,uint32,uint256,uint256,uint256,uint256,bytes).\_lenderSignature (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#166) is not in mixedCase
Parameter DirectLoanProRated.getPayoffAmount(uint256).\_loanId (contracts/loans/direct/loanTypes/DirectLoanProRated.sol#193) is not in mixedCase
Parameter NftTypeRegistry.setNftType(string,address).\_nftType (contracts/nftTypeRegistry/NftTypeRegistry.sol#65) is not in mixedCase
Parameter NftTypeRegistry.setNftType(string,address).\_nftWrapper (contracts/nftTypeRegistry/NftTypeRegistry.sol#65) is not in mixedCase
Parameter NftTypeRegistry.setNftTypes(string[],address[]).\_nftTypes (contracts/nftTypeRegistry/NftTypeRegistry.sol#77) is not in mixedCase
Parameter NftTypeRegistry.setNftTypes(string[],address[]).\_nftWrappers (contracts/nftTypeRegistry/NftTypeRegistry.sol#77) is not in mixedCase
Parameter NftTypeRegistry.getNftTypeWrapper(bytes32).\_nftType (contracts/nftTypeRegistry/NftTypeRegistry.sol#86) is not in mixedCase
Parameter CryptoKittiesWrapper.transferNFT(address,address,address,uint256).\_sender (contracts/nftTypeRegistry/nftTypes/CryptoKittiesWrapper.sol#24) is not in mixedCase
Parameter CryptoKittiesWrapper.transferNFT(address,address,address,uint256).\_recipient (contracts/nftTypeRegistry/nftTypes/CryptoKittiesWrapper.sol#25) is not in mixedCase
Parameter CryptoKittiesWrapper.transferNFT(address,address,address,uint256).\_nftContract (contracts/nftTypeRegistry/nftTypes/CryptoKittiesWrapper.sol#26) is not in mixedCase
Parameter CryptoKittiesWrapper.transferNFT(address,address,address,uint256).\_nftId (contracts/nftTypeRegistry/nftTypes/CryptoKittiesWrapper.sol#27) is not in mixedCase
Parameter ERC1155Wrapper.transferNFT(address,address,address,uint256).\_sender (contracts/nftTypeRegistry/nftTypes/ERC1155Wrapper.sol#23) is not in mixedCase
Parameter ERC1155Wrapper.transferNFT(address,address,address,uint256).\_recipient (contracts/nftTypeRegistry/nftTypes/ERC1155Wrapper.sol#24) is not in mixedCase
Parameter ERC1155Wrapper.transferNFT(address,address,address,uint256).\_nftContract (contracts/nftTypeRegistry/nftTypes/ERC1155Wrapper.sol#25) is not in mixedCase
Parameter ERC1155Wrapper.transferNFT(address,address,address,uint256).\_nftId (contracts/nftTypeRegistry/nftTypes/ERC1155Wrapper.sol#26) is not in mixedCase
Parameter ERC721Wrapper.transferNFT(address,address,address,uint256).\_sender (contracts/nftTypeRegistry/nftTypes/ERC721Wrapper.sol#24) is not in mixedCase
Parameter ERC721Wrapper.transferNFT(address,address,address,uint256).\_recipient (contracts/nftTypeRegistry/nftTypes/ERC721Wrapper.sol#25) is not in mixedCase
Parameter ERC721Wrapper.transferNFT(address,address,address,uint256).\_nftContract (contracts/nftTypeRegistry/nftTypes/ERC721Wrapper.sol#26) is not in mixedCase
Parameter ERC721Wrapper.transferNFT(address,address,address,uint256).\_nftId (contracts/nftTypeRegistry/nftTypes/ERC721Wrapper.sol#27) is not in mixedCase
Parameter PermittedERC20s.setERC20Permit(address,bool).\_erc20 (contracts/permittedLists/PermittedERC20s.sol#64) is not in mixedCase
Parameter PermittedERC20s.setERC20Permit(address,bool).\_permit (contracts/permittedLists/PermittedERC20s.sol#64) is not in mixedCase
Parameter PermittedERC20s.setERC20Permits(address[],bool[]).\_erc20s (contracts/permittedLists/PermittedERC20s.sol#75) is not in mixedCase
Parameter PermittedERC20s.setERC20Permits(address[],bool[]).\_permits (contracts/permittedLists/PermittedERC20s.sol#75) is not in mixedCase
Parameter PermittedERC20s.getERC20Permit(address).\_erc20 (contracts/permittedLists/PermittedERC20s.sol#90) is not in mixedCase
Parameter PermittedNFTs.setNFTPermit(address,string).\_nftContract (contracts/permittedLists/PermittedNFTs.sol#82) is not in mixedCase
Parameter PermittedNFTs.setNFTPermit(address,string).\_nftType (contracts/permittedLists/PermittedNFTs.sol#82) is not in mixedCase
Parameter PermittedNFTs.setNFTPermits(address[],string[]).\_nftContracts (contracts/permittedLists/PermittedNFTs.sol#96) is not in mixedCase
Parameter PermittedNFTs.setNFTPermits(address[],string[]).\_nftTypes (contracts/permittedLists/PermittedNFTs.sol#96) is not in mixedCase
Parameter PermittedNFTs.getNFTPermit(address).\_nftContract (contracts/permittedLists/PermittedNFTs.sol#107) is not in mixedCase
Parameter PermittedNFTs.getNFTWrapper(address).\_nftContract (contracts/permittedLists/PermittedNFTs.sol#116) is not in mixedCase
Parameter PermittedPartners.setPartnerRevenueShare(address,uint32).\_partner (contracts/permittedLists/PermittedPartners.sol#65) is not in mixedCase
Parameter PermittedPartners.setPartnerRevenueShare(address,uint32).\_revenueShareInBasisPoints (contracts/permittedLists/PermittedPartners.sol#65) is not in mixedCase
Parameter PermittedPartners.getPartnerPermit(address).\_partner (contracts/permittedLists/PermittedPartners.sol#78) is not in mixedCase
Parameter SmartNft.setLoanCoordinator(address).\_account (contracts/smartNft/SmartNft.sol#50) is not in mixedCase
Parameter SmartNft.mint(address,uint256,bytes).\_to (contracts/smartNft/SmartNft.sol#62) is not in mixedCase
Parameter SmartNft.mint(address,uint256,bytes).\_tokenId (contracts/smartNft/SmartNft.sol#63) is not in mixedCase
Parameter SmartNft.mint(address,uint256,bytes).\_data (contracts/smartNft/SmartNft.sol#64) is not in mixedCase
Parameter SmartNft.burn(uint256).\_tokenId (contracts/smartNft/SmartNft.sol#76) is not in mixedCase
Parameter SmartNft.supportsInterface(bytes4).\_interfaceId (contracts/smartNft/SmartNft.sol#83) is not in mixedCase
Parameter TestCryptoKitties.supportsInterface(bytes4).\_interfaceID (contracts/test/TestCryptoKitties.sol#109) is not in mixedCase
Parameter TestCryptoKitties.balanceOf(address).\_owner (contracts/test/TestCryptoKitties.sol#119) is not in mixedCase
Parameter TestCryptoKitties.mint(address).\_owner (contracts/test/TestCryptoKitties.sol#123) is not in mixedCase
Parameter TestCryptoKitties.transfer(address,uint256).\_to (contracts/test/TestCryptoKitties.sol#133) is not in mixedCase
Parameter TestCryptoKitties.transfer(address,uint256).\_tokenId (contracts/test/TestCryptoKitties.sol#133) is not in mixedCase
Parameter TestCryptoKitties.approve(address,uint256).\_to (contracts/test/TestCryptoKitties.sol#162) is not in mixedCase
Parameter TestCryptoKitties.approve(address,uint256).\_tokenId (contracts/test/TestCryptoKitties.sol#162) is not in mixedCase
Parameter TestCryptoKitties.transferFrom(address,address,uint256).\_from (contracts/test/TestCryptoKitties.sol#182) is not in mixedCase
Parameter TestCryptoKitties.transferFrom(address,address,uint256).\_to (contracts/test/TestCryptoKitties.sol#183) is not in mixedCase
Parameter TestCryptoKitties.transferFrom(address,address,uint256).\_tokenId (contracts/test/TestCryptoKitties.sol#184) is not in mixedCase
Parameter TestCryptoKitties.ownerOf(uint256).\_tokenId (contracts/test/TestCryptoKitties.sol#212) is not in mixedCase
Parameter TestCryptoKitties.tokensOfOwner(address).\_owner (contracts/test/TestCryptoKitties.sol#225) is not in mixedCase
Constant TestCryptoKitties.InterfaceSignature_ERC165 (contracts/test/TestCryptoKitties.sol#16) is not in UPPER_CASE_WITH_UNDERSCORES
Constant TestCryptoKitties.InterfaceSignature_ERC721 (contracts/test/TestCryptoKitties.sol#18-28) is not in UPPER_CASE_WITH_UNDERSCORES
Parameter TestERC721.mint(address,uint256).\_to (contracts/test/TestERC721.sol#11) is not in mixedCase
Parameter TestERC721.mint(address,uint256).\_tokenId (contracts/test/TestERC721.sol#11) is not in mixedCase
Parameter ContractKeys.getIdFromStringKey(string).\_key (contracts/utils/ContractKeys.sol#22) is not in mixedCase
Parameter NFTfiSigningUtils.isValidBorrowerSignature(LoanData.ListingTerms,LoanData.Signature).\_listingTerms (contracts/utils/NFTfiSigningUtils.sol#94) is not in mixedCase
Parameter NFTfiSigningUtils.isValidBorrowerSignature(LoanData.ListingTerms,LoanData.Signature).\_signature (contracts/utils/NFTfiSigningUtils.sol#94) is not in mixedCase
Parameter NFTfiSigningUtils.isValidLenderSignature(LoanData.Offer,LoanData.Signature).\_offer (contracts/utils/NFTfiSigningUtils.sol#168) is not in mixedCase
Parameter NFTfiSigningUtils.isValidLenderSignature(LoanData.Offer,LoanData.Signature).\_signature (contracts/utils/NFTfiSigningUtils.sol#168) is not in mixedCase
Parameter NFTfiSigningUtils.isValidLenderRenegotiationSignature(uint256,uint32,uint256,uint256,address,uint256,uint256,bytes).\_loanId (contracts/utils/NFTfiSigningUtils.sol#220) is not in mixedCase
Parameter NFTfiSigningUtils.isValidLenderRenegotiationSignature(uint256,uint32,uint256,uint256,address,uint256,uint256,bytes).\_newLoanDuration (contracts/utils/NFTfiSigningUtils.sol#221) is not in mixedCase
Parameter NFTfiSigningUtils.isValidLenderRenegotiationSignature(uint256,uint32,uint256,uint256,address,uint256,uint256,bytes).\_newMaximumRepaymentAmount (contracts/utils/NFTfiSigningUtils.sol#222) is not in mixedCase
Parameter NFTfiSigningUtils.isValidLenderRenegotiationSignature(uint256,uint32,uint256,uint256,address,uint256,uint256,bytes).\_renegotiationFee (contracts/utils/NFTfiSigningUtils.sol#223) is not in mixedCase
Parameter NFTfiSigningUtils.isValidLenderRenegotiationSignature(uint256,uint32,uint256,uint256,address,uint256,uint256,bytes).\_lender (contracts/utils/NFTfiSigningUtils.sol#224) is not in mixedCase
Parameter NFTfiSigningUtils.isValidLenderRenegotiationSignature(uint256,uint32,uint256,uint256,address,uint256,uint256,bytes).\_lenderNonce (contracts/utils/NFTfiSigningUtils.sol#225) is not in mixedCase
Parameter NFTfiSigningUtils.isValidLenderRenegotiationSignature(uint256,uint32,uint256,uint256,address,uint256,uint256,bytes).\_expiry (contracts/utils/NFTfiSigningUtils.sol#226) is not in mixedCase
Parameter NFTfiSigningUtils.isValidLenderRenegotiationSignature(uint256,uint32,uint256,uint256,address,uint256,uint256,bytes).\_lenderSignature (contracts/utils/NFTfiSigningUtils.sol#227) is not in mixedCase
Parameter NFTfiSigningUtils.getEncodedListing(LoanData.ListingTerms).\_listingTerms (contracts/utils/NFTfiSigningUtils.sol#255) is not in mixedCase
Parameter NFTfiSigningUtils.getEncodedOffer(LoanData.Offer).\_offer (contracts/utils/NFTfiSigningUtils.sol#274) is not in mixedCase
Parameter NFTfiSigningUtils.getEncodedSignature(LoanData.Signature).\_signature (contracts/utils/NFTfiSigningUtils.sol#292) is not in mixedCase
Parameter NftReceiver.supportsInterface(bytes4).\_interfaceId (contracts/utils/NftReceiver.sol#48) is not in mixedCase
Parameter Ownable.transferOwnership(address).\_newOwner (contracts/utils/Ownable.sol#46) is not in mixedCase
--

Parameter Token.approve(address,uint256).\_spender (contracts/governance/votingImplementations/Token.sol#87) is not in mixedCase
Parameter Token.approve(address,uint256).\_rawAmount (contracts/governance/votingImplementations/Token.sol#87) is not in mixedCase
Parameter Token.transfer(address,uint256).\_dst (contracts/governance/votingImplementations/Token.sol#107) is not in mixedCase
Parameter Token.transfer(address,uint256).\_rawAmount (contracts/governance/votingImplementations/Token.sol#107) is not in mixedCase
Parameter Token.transferFrom(address,address,uint256).\_src (contracts/governance/votingImplementations/Token.sol#121) is not in mixedCase
Parameter Token.transferFrom(address,address,uint256).\_dst (contracts/governance/votingImplementations/Token.sol#122) is not in mixedCase
Parameter Token.transferFrom(address,address,uint256).\_rawAmount (contracts/governance/votingImplementations/Token.sol#123) is not in mixedCase
Parameter Token.allowance(address,address).\_account (contracts/governance/votingImplementations/Token.sol#150) is not in mixedCase
Parameter Token.allowance(address,address).\_spender (contracts/governance/votingImplementations/Token.sol#150) is not in mixedCase
Parameter Token.balanceOf(address).\_account (contracts/governance/votingImplementations/Token.sol#159) is not in mixedCase
Parameter Token.getCurrentVotes(address).\_account (contracts/governance/votingImplementations/Token.sol#168) is not in mixedCase
Parameter Token.delegate(address).\_delegatee (contracts/governance/votingImplementations/Token.sol#181) is not in mixedCase
Parameter Token.delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32).\_delegatee (contracts/governance/votingImplementations/Token.sol#195) is not in mixedCase
Parameter Token.delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32).\_nonce (contracts/governance/votingImplementations/Token.sol#196) is not in mixedCase
Parameter Token.delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32).\_expiry (contracts/governance/votingImplementations/Token.sol#197) is not in mixedCase
Parameter Token.delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32).\_v (contracts/governance/votingImplementations/Token.sol#198) is not in mixedCase
Parameter Token.delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32).\_r (contracts/governance/votingImplementations/Token.sol#199) is not in mixedCase
Parameter Token.delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32).\_s (contracts/governance/votingImplementations/Token.sol#200) is not in mixedCase
Parameter Token.getPriorVotes(address,uint256).\_account (contracts/governance/votingImplementations/Token.sol#225) is not in mixedCase
Parameter Token.getPriorVotes(address,uint256).\_blockNumber (contracts/governance/votingImplementations/Token.sol#225) is not in mixedCase
Constant Token.totalSupply (contracts/governance/votingImplementations/Token.sol#27) is not in UPPER_CASE_WITH_UNDERSCORES
--

Variable ERC998TopDown.totalChildTokens(uint256,address).\_childContract (contracts/composable/ERC998TopDown.sol#83) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.childTokenByIndex(uint256,address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#96) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.transferChild(uint256,address,address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#261) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC9981155Extension.\_remove1155Child(uint256,address,uint256,uint256).\_childContract (contracts/composable/ERC9981155Extension.sol#214) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable IERC998ERC721TopDownEnumerable.totalChildTokens(uint256,address).\_childContract (contracts/interfaces/IERC998ERC721TopDownEnumerable.sol#10) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable IERC998ERC721TopDownEnumerable.childTokenByIndex(uint256,address,uint256).\_childContract (contracts/interfaces/IERC998ERC721TopDownEnumerable.sol#14) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.\_receiveChild(address,uint256,address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#434) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC998TopDown.getChild(address,uint256,address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#297) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC998TopDown.safeTransferChild(uint256,address,address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#220) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC998TopDown.ownerOfChild(address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#109) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC998TopDown.\_oldNFTsTransfer(address,address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#485) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC998TopDown.transferChild(uint256,address,address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#262) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC9981155Extension.\_remove1155Child(uint256,address,uint256,uint256).\_childTokenId (contracts/composable/ERC9981155Extension.sol#215) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable IERC998ERC721TopDown.safeTransferChild(uint256,address,address,uint256).\_childTokenId (contracts/interfaces/IERC998ERC721TopDown.sol#37) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC998TopDown.\_removeChild(uint256,address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#392) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC998TopDown.\_transferChild(uint256,address,address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#347) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC9981155Extension.safeTransferChild(uint256,address,address,uint256,uint256,bytes).\_childTokenId (contracts/composable/ERC9981155Extension.sol#49) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable IERC998ERC721TopDown.transferChildToParent(uint256,address,uint256,address,uint256,bytes).\_childTokenId (contracts/interfaces/IERC998ERC721TopDown.sol#53) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC998TopDown.safeTransferChild(uint256,address,address,uint256,bytes).\_childTokenId (contracts/composable/ERC998TopDown.sol#239) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable IERC998ERC721TopDown.getChild(address,uint256,address,uint256).\_childTokenId (contracts/interfaces/IERC998ERC721TopDown.sol#63) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC998TopDown.\_ownerOfChild(address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#453) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable IERC998ERC721TopDown.safeTransferChild(uint256,address,address,uint256,bytes).\_childTokenId (contracts/interfaces/IERC998ERC721TopDown.sol#44) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable IERC998ERC721TopDown.ownerOfChild(address,uint256).\_childTokenId (contracts/interfaces/IERC998ERC721TopDown.sol#70) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable IERC998ERC721TopDown.transferChild(uint256,address,address,uint256).\_childTokenId (contracts/interfaces/IERC998ERC721TopDown.sol#30) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable IERC998ERC721TopDown.rootOwnerOfChild(address,uint256).\_childTokenId (contracts/interfaces/IERC998ERC721TopDown.sol#68) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC9981155Extension.\_receive1155Child(uint256,address,uint256,uint256).\_childTokenId (contracts/composable/ERC9981155Extension.sol#179) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC998TopDown.\_validateAndReceiveChild(address,address,uint256,bytes).\_childTokenId (contracts/composable/ERC998TopDown.sol#414) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC998TopDown.rootOwnerOfChild(address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#146) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC998TopDown.onERC721Received(address,address,uint256,bytes).\_childTokenId (contracts/composable/ERC998TopDown.sol#314) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC998TopDown.\_validateChildTransfer(uint256,address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#363) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable ERC9981155Extension.childBalance(uint256,address,uint256).\_childTokenId (contracts/composable/ERC9981155Extension.sol#31) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable IERC998ERC721TopDown.onERC721Received(address,address,uint256,bytes).\_childTokenId (contracts/interfaces/IERC998ERC721TopDown.sol#22) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable IERC998ERC721TopDown.ownerOfChild(address,uint256).\_childContract (contracts/interfaces/IERC998ERC721TopDown.sol#70) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC9981155Extension.safeTransferChild(uint256,address,address,uint256,uint256,bytes).\_childContract (contracts/composable/ERC9981155Extension.sol#48) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable IERC998ERC721TopDown.transferChildToParent(uint256,address,uint256,address,uint256,bytes).\_childContract (contracts/interfaces/IERC998ERC721TopDown.sol#52) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.rootOwnerOfChild(address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#146) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.safeTransferChild(uint256,address,address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#219) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.getChild(address,uint256,address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#296) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.childExists(address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#47) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.\_ownerOfChild(address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#453) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.ownerOfChild(address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#109) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC9981155Extension.\_validateAndReceive1155Child(address,address,uint256,uint256,bytes).\_childContract (contracts/composable/ERC9981155Extension.sol#157) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable IERC998ERC721TopDown.rootOwnerOfChild(address,uint256).\_childContract (contracts/interfaces/IERC998ERC721TopDown.sol#68) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable IERC998ERC721TopDown.transferChild(uint256,address,address,uint256).\_childContract (contracts/interfaces/IERC998ERC721TopDown.sol#29) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC9981155Extension.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).\_childContract (contracts/composable/ERC9981155Extension.sol#76) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable IERC998ERC721TopDown.safeTransferChild(uint256,address,address,uint256,bytes).\_childContract (contracts/interfaces/IERC998ERC721TopDown.sol#43) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.\_validateAndReceiveChild(address,address,uint256,bytes).\_childContract (contracts/composable/ERC998TopDown.sol#413) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.\_transferChild(uint256,address,address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#346) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable IERC998ERC721TopDown.getChild(address,uint256,address,uint256).\_childContract (contracts/interfaces/IERC998ERC721TopDown.sol#62) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC9981155Extension.childBalance(uint256,address,uint256).\_childContract (contracts/composable/ERC9981155Extension.sol#30) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.\_removeChild(uint256,address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#391) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable IERC998ERC721TopDown.safeTransferChild(uint256,address,address,uint256).\_childContract (contracts/interfaces/IERC998ERC721TopDown.sol#36) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC9981155Extension.\_receive1155Child(uint256,address,uint256,uint256).\_childContract (contracts/composable/ERC9981155Extension.sol#178) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.safeTransferChild(uint256,address,address,uint256,bytes).\_childContract (contracts/composable/ERC998TopDown.sol#238) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.\_receiveChild(address,uint256,address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#433) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.\_oldNFTsTransfer(address,address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#484) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.\_validateChildTransfer(uint256,address,uint256).\_childContract (contracts/composable/ERC998TopDown.sol#362) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable ERC998TopDown.childExists(address,uint256).\_childTokenId (contracts/composable/ERC998TopDown.sol#47) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable NftfiBundler.\_receive1155Child(uint256,address,uint256,uint256).\_childContract (contracts/composable/NftfiBundler.sol#114) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable NftfiBundler.\_receiveChild(address,uint256,address,uint256).\_childContract (contracts/composable/NftfiBundler.sol#97) is too similar to ERC998TopDown.childContracts (contracts/composable/ERC998TopDown.sol#33)
Variable NftfiBundler.\_receiveChild(address,uint256,address,uint256).\_childTokenId (contracts/composable/NftfiBundler.sol#98) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable NftfiBundler.\_receive1155Child(uint256,address,uint256,uint256).\_childTokenId (contracts/composable/NftfiBundler.sol#115) is too similar to IERC998ERC1155TopDown.safeBatchTransferChild(uint256,address,address,uint256[],uint256[],bytes).childTokenIds (contracts/interfaces/IERC998ERC1155TopDown.sol#41)
Variable DirectLoanBase.LOAN_COORDINATOR (contracts/loans/direct/loanTypes/DirectLoanBase.sol#85) is too similar to DirectLoanBase.\_resolveLoan(uint256,address,LoanData.LoanTerms,IDirectLoanCoordinator).\_loanCoordinator (contracts/loans/direct/loanTypes/DirectLoanBase.sol#965)
Variable TestCryptoKitties.InterfaceSignature_ERC165 (contracts/test/TestCryptoKitties.sol#16) is too similar to TestCryptoKitties.InterfaceSignature_ERC721 (contracts/test/TestCryptoKitties.sol#18-28)
--

NftfiBundler.slitherConstructorConstantVariables() (contracts/composable/NftfiBundler.sol#16-121) uses literals with too many digits: - ERC998_MAGIC_VALUE = 0xcd740db500000000000000000000000000000000000000000000000000000000 (contracts/composable/ERC998TopDown.sol#27)
NftfiBundler.slitherConstructorConstantVariables() (contracts/composable/NftfiBundler.sol#16-121) uses literals with too many digits: - ERC998_MAGIC_MASK = 0xffffffff00000000000000000000000000000000000000000000000000000000 (contracts/composable/ERC998TopDown.sol#28)
QuorumVoting.quorumVotes() (contracts/governance/votingImplementations/QuorumVoting.sol#41-43) uses literals with too many digits: - 400000e18 (contracts/governance/votingImplementations/QuorumVoting.sol#42)
QuorumVoting.proposalThreshold() (contracts/governance/votingImplementations/QuorumVoting.sol#47-49) uses literals with too many digits: - 100000e18 (contracts/governance/votingImplementations/QuorumVoting.sol#48)
--

## Token.slitherConstructorConstantVariables() (contracts/governance/votingImplementations/Token.sol#11-387) uses literals with too many digits: - totalSupply = 10000000e18 (contracts/governance/votingImplementations/Token.sol#27)

propose(address[],uint256[],string[],bytes[],bytes32,string) should be declared external: - Proposals.propose(address[],uint256[],string[],bytes[],bytes32,string) (contracts/governance/Proposals.sol#122-193)
queue(uint256) should be declared external: - Proposals.queue(uint256) (contracts/governance/Proposals.sol#200-209)
execute(uint256) should be declared external: - Proposals.execute(uint256) (contracts/governance/Proposals.sol#215-229)
cancel(uint256) should be declared external: - Proposals.cancel(uint256) (contracts/governance/Proposals.sol#235-254)
addVoting(bytes32,address) should be declared external: - Proposals.addVoting(bytes32,address) (contracts/governance/Proposals.sol#261-270)
setGovernableEndpoint(address,bytes32,bool) should be declared external: - Proposals.setGovernableEndpoint(address,bytes32,bool) (contracts/governance/Proposals.sol#279-287)
**acceptTimelockAdmin() should be declared external: - Proposals.**acceptTimelockAdmin() (contracts/governance/Proposals.sol#297-299)
**queueSetTimelockPendingAdmin(address,uint256) should be declared external: - Proposals.**queueSetTimelockPendingAdmin(address,uint256) (contracts/governance/Proposals.sol#307-309)
**executeSetTimelockPendingAdmin(address,uint256) should be declared external: - Proposals.**executeSetTimelockPendingAdmin(address,uint256) (contracts/governance/Proposals.sol#317-325)
getActions(uint256) should be declared external: - Proposals.getActions(uint256) (contracts/governance/Proposals.sol#349-361)
setDelay(uint256) should be declared external: - Timelock.setDelay(uint256) (contracts/governance/Timelock.sol#113-119)
acceptAdmin() should be declared external: - Timelock.acceptAdmin() (contracts/governance/Timelock.sol#124-130)
setPendingAdmin(address) should be declared external: - Timelock.setPendingAdmin(address) (contracts/governance/Timelock.sol#136-140)
queueTransaction(address,uint256,string,bytes,uint256) should be declared external: - Timelock.queueTransaction(address,uint256,string,bytes,uint256) (contracts/governance/Timelock.sol#153-167)
cancelTransaction(address,uint256,string,bytes,uint256) should be declared external: - Timelock.cancelTransaction(address,uint256,string,bytes,uint256) (contracts/governance/Timelock.sol#179-190)
executeTransaction(address,uint256,string,bytes,uint256) should be declared external: - Timelock.executeTransaction(address,uint256,string,bytes,uint256) (contracts/governance/Timelock.sol#202-229)
castVote(uint256,bool) should be declared external: - MultisigVoting.castVote(uint256,bool) (contracts/governance/votingImplementations/MultisigVoting.sol#112-128)
removeVoter(address) should be declared external: - MultisigVoting.removeVoter(address) (contracts/governance/votingImplementations/MultisigVoting.sol#154-158)
getReceipt(uint256,address) should be declared external: - MultisigVoting.getReceipt(uint256,address) (contracts/governance/votingImplementations/MultisigVoting.sol#200-202)
castVote(uint256,bool) should be declared external: - QuorumVoting.castVote(uint256,bool) (contracts/governance/votingImplementations/QuorumVoting.sol#141-143)
castVoteBySig(uint256,bool,uint8,bytes32,bytes32) should be declared external: - QuorumVoting.castVoteBySig(uint256,bool,uint8,bytes32,bytes32) (contracts/governance/votingImplementations/QuorumVoting.sol#153-168)
getReceipt(uint256,address) should be declared external: - QuorumVoting.getReceipt(uint256,address) (contracts/governance/votingImplementations/QuorumVoting.sol#180-182)
getWhetherNonceHasBeenUsedForUser(address,uint256) should be declared external: - DirectLoanBase.getWhetherNonceHasBeenUsedForUser(address,uint256) (contracts/loans/direct/loanTypes/DirectLoanBase.sol#565-567)
mint(address,uint256,uint256,bytes) should be declared external: - TestERC1155.mint(address,uint256,uint256,bytes) (contracts/test/TestERC1155.sol#11-18)
mint(address,uint256) should be declared external: - TestERC721.mint(address,uint256) (contracts/test/TestERC721.sol#11-13)
rootOwnerOfChild(address,uint256) should be declared external: - TestNonBundleRootOwner.rootOwnerOfChild(address,uint256) (contracts/test/TestNonBundleRootOwner.sol#8-10)
transferOwnership(address) should be declared external: - Ownable.transferOwnership(address) (contracts/utils/Ownable.sol#46-49)
--
delegate(address) should be declared external: - Token.delegate(address) (contracts/governance/votingImplementations/Token.sol#181-183)
delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32) should be declared external: - Token.delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32) (contracts/governance/votingImplementations/Token.sol#194-212)
getPriorVotes(address,uint256) should be declared external: - Token.getPriorVotes(address,uint256) (contracts/governance/votingImplementations/Token.sol#225-257)
