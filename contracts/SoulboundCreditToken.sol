
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SoulboundCreditToken is ERC721URIStorage {
    address public owner;
    mapping(uint256 => bool) private _locked;

    constructor() ERC721("ZeroCred SBT", "ZCSBT") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function mint(address to, uint256 tokenId, string memory tokenURI_) public onlyOwner {
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);
        _locked[tokenId] = true;
    }

    function transferFrom(address, address, uint256) public pure override {
        revert("Soulbound: transfers disabled");
    }

    function safeTransferFrom(address, address, uint256) public pure override {
        revert("Soulbound: transfers disabled");
    }

    function safeTransferFrom(address, address, uint256, bytes memory) public pure override {
        revert("Soulbound: transfers disabled");
    }

    function isLocked(uint256 tokenId) external view returns (bool) {
        return _locked[tokenId];
    }
}
