//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

import 'hardhat/console.sol';
import './IPool.sol';

contract Pool is IPOOL {
    using SafeMath for uint256;

    uint256 public totalPayout;
    uint256 public pricePerAddress;

    uint256 public currentMemberCount;
    uint256 public maxMemberCount;

    address public asset;

    bool public totalPayoutPaid;

    mapping(address => bool) private _isPoolMember;
    mapping(address => bool) private _hasVoted;

    mapping(address => uint256) private _voteCount;

    constructor(
        uint256 _totalPayout,
        uint256 _maxMemberCount,
        address _asset
    ) {
        totalPayout = _totalPayout;
        maxMemberCount = _maxMemberCount;
        pricePerAddress = totalPayout.div(maxMemberCount);
        asset = _asset;
    }

    modifier memberOfPool() {
        require(_isPoolMember[msg.sender], 'Address is not a member of this pool.');
        _;
    }

    function addAddressToPool() external override {
        address user = msg.sender;
        bool isMember = _isPoolMember[user];
        require(!isMember, 'Address is already member of pool.');

        IERC20 ercAsset = IERC20(asset);
        ercAsset.transferFrom(msg.sender, address(this), pricePerAddress);

        ++currentMemberCount;
        _isPoolMember[user] = true;
    }

    function currentPoolWorth() external view override returns (uint256) {
        IERC20 ercAsset = IERC20(asset);
        return ercAsset.balanceOf(address(this));
    }

    function voteForAddress(address addr) external override memberOfPool() {
        require(!_hasVoted[msg.sender], 'This address has already voted');

        if (totalPayoutPaid) return;
        _voteCount[addr]++;

        uint256 votesRequired = maxMemberCount.div(2);

        if (_voteCount[addr] > votesRequired) {
            bool payoutSuccessful = payout(addr);
            if (payoutSuccessful) totalPayoutPaid = true;
        }
    }

    function votesFor(address addr) external view override memberOfPool() returns (uint256) {
        return _voteCount[addr];
    }

    function payout(address addr) private returns (bool) {
        IERC20 ercAsset = IERC20(asset);
        return ercAsset.transfer(addr, totalPayout);
    }
}
