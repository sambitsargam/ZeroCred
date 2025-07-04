
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ScoreRegistry {
    mapping(address => uint256) public scores;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function updateScore(address user, uint256 newScore) public onlyOwner {
        scores[user] = newScore;
    }

    function getScore(address user) public view returns (uint256) {
        return scores[user];
    }
}
