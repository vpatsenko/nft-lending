// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.19;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {INftWrapper} from "../../interfaces/INftWrapper.sol";

/**
 * @title ERC721LegacyWrapper
 * @author NFTfi
 * @dev Provides logic to transfer ERC721, uses regular transferFrom instead of safe
 */
contract ERC721LegacyWrapper is INftWrapper {
    /**
     * @dev Transfers ERC721 `_nftId` handled by the contract `_nftContract` from `_sender` to `_recipient`
     *
     * @param _sender - The current owner of the ERC721
     * @param _recipient - The new owner of the ERC721
     * @param _nftContract - ERC721 contract
     * @param _nftId - ERC721 id
     *
     * @return true if successfully transferred, false otherwise
     */
    function transferNFT(
        address _sender,
        address _recipient,
        address _nftContract,
        uint256 _nftId
    ) external override returns (bool) {
        IERC721(_nftContract).transferFrom(_sender, _recipient, _nftId);
        return true;
    }

    function approveNFT(address to, address nftContract, uint256 tokenId) external override returns (bool) {
        IERC721(nftContract).approve(to, tokenId);
        return true;
    }

    function isOwner(address _owner, address _nftContract, uint256 _tokenId) public view override returns (bool) {
        return IERC721(_nftContract).ownerOf(_tokenId) == _owner;
    }

    function balanceOf(
        address _owner,
        address _nftContract,
        uint256 _tokenId
    ) external view override returns (uint256) {
        if (isOwner(_owner, _nftContract, _tokenId)) {
            return 1;
        } else {
            return 0;
        }
    }
}
