//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.7.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

// This is the main building block for smart contracts.
contract ERC20Token is ERC20 {
    using SafeMath for uint256;

    constructor() ERC20('Fake DAI', 'FDAI') {}

    function mintDummy() public {
        _mint(msg.sender, 1000000 * (10**uint256(decimals())));
    }
}
