// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.19;

import {OldINftWrapper} from "./OldINftWrapper.sol";
import {IPunks} from "../../interfaces/IPunks.sol";

/**
 * @title PunkWrapper
 * @author NFTfi
 * @dev Provides logic to transfer Punks
 */
contract OldPunkWrapper is OldINftWrapper {
    /**
     * @dev Transfers Punk `_nftId` handled by the contract `_nftContract` from `_sender` to `_recipient`
     *
     * @param _sender - The current owner of the Punk
     * @param _recipient - The new owner of the Punk
     * @param _nftContract - Punk contract
     * @param _nftId - Punk id
     *
     * @return true if successfully transferred, false otherwise
     */
    function transferNFT(
        address _sender,
        address _recipient,
        address _nftContract,
        uint256 _nftId
    ) external override returns (bool) {
        if (address(this) == _sender) {
            IPunks(_nftContract).transferPunk(_recipient, _nftId);
        } else {
            // solhint-disable-next-line custom-errors
            require(isOwner(_sender, _nftContract, _nftId), "PunkWrapper:sender must be owner");
            IPunks(_nftContract).buyPunk(_nftId);
        }
        return true;
    }

    function isOwner(address _owner, address _nftContract, uint256 _tokenId) public view override returns (bool) {
        return IPunks(_nftContract).punkIndexToAddress(_tokenId) == _owner;
    }
}
