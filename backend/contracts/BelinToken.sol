// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./DataConsumerV3.sol";

contract BelinToken is ERC20, Ownable, DataConsumerV3 {
    uint256 private constant PRICE_PER_TOKEN = 10; // in dollar

    constructor() ERC20("BELIN", "BEL1") Ownable(msg.sender) {}

    function mint(address _to, uint256 _amount) external payable {
        int256 ethInDollars = getChainlinkDataFeedLatestAnswer();
        require(ethInDollars > 0, "Invalid price feed value");

        uint256 ethInDollarsUint = uint256(ethInDollars / 1e8);

        uint256 expectedPriceInWei = (PRICE_PER_TOKEN * 1 ether * _amount) /
            ethInDollarsUint;
        console.log("ethInDollars:", ethInDollarsUint);
        console.log("ethInDollarsUint:", ethInDollarsUint);
        console.log("expectedPriceInWei:", expectedPriceInWei);
        console.log("value provided:", msg.value);
        require(msg.value > expectedPriceInWei, "not enought funds provided");
        _mint(_to, _amount);
    }
}
