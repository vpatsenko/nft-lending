pragma solidity 0.8.19;

import "forge-std/Test.sol";
import {TestBaseLoan} from "../contracts/test/TestBaseLoan.sol";

contract BaseLoanTest is Test {
    event Paused(address account);

    TestBaseLoan public baseLoan;

    function setUp() public {
        baseLoan = new TestBaseLoan(address(1));
    }

    function test_Owner() public {
        assertEq(baseLoan.owner(), address(1));
    }

    function testFail_ShouldSendETHToTheContract() public {
        hoax(address(1), 1);
        (bool success, ) = address(baseLoan).call{value: 1 ether}("");
        require(success, "send eth failed");
    }

    function testFail_NotOwnerShouldNotBeAbleToCallPause() public {
        vm.prank(address(2));
        baseLoan.pause();
        assertEq(baseLoan.paused(), false);
    }

    function testFail_NonOwnerShouldNotBeAbleToUnpause() public {
        vm.prank(address(2));
        baseLoan.unpause();
        assertEq(baseLoan.paused(), true);
    }

    function test_OwnerShouldBeAbleToCallPause() public {
        vm.prank(address(1));
        baseLoan.pause();
        assertEq(baseLoan.paused(), true);
    }

    function test_OwnerShouldBeAbleToUnpause() public {
        vm.prank(address(1));
        baseLoan.pause();

        vm.prank(address(1));
        baseLoan.unpause();
        assertEq(baseLoan.paused(), false);
    }
}
