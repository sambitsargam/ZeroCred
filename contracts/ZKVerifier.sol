
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICircuitValidator {
    function verify(uint256[] calldata input, uint256[2] calldata a, uint256[2][2] calldata b, uint256[2] calldata c) external view returns (bool);
}

contract ZKVerifier {
    address public validator;
    mapping(address => bool) public kycVerified;
    address public owner;

    event ProofVerified(address user);

    constructor(address _validator) {
        validator = _validator;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    function setValidator(address _validator) external onlyOwner {
        validator = _validator;
    }

    function verifyKYC(
        address user,
        uint256[] calldata input,
        uint256[2] calldata a,
        uint256[2][2] calldata b,
        uint256[2] calldata c
    ) external {
        require(ICircuitValidator(validator).verify(input, a, b, c), "Invalid proof");
        kycVerified[user] = true;
        emit ProofVerified(user);
    }

    function isVerified(address user) external view returns (bool) {
        return kycVerified[user];
    }
}
