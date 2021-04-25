//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import 'hardhat/console.sol';

interface IPOOL {
    function addAddressToPool() external;

    function currentPoolWorth() external view returns (uint256);

    function voteForAddress(address addr) external;

    function votesFor(address addr) external view returns (uint256);
}
