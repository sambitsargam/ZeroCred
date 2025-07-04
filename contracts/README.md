### 📂 ZeroCred Smart Contracts

This directory contains all smart contracts for the ZeroCred protocol, enabling decentralized credit scoring, identity verification (via zk-SNARKs), and minting non-transferable Soulbound Tokens (SBTs).


## ⚙️ Smart Contract Overview

| Contract                   | Purpose                                                                         |
| -------------------------- | ------------------------------------------------------------------------------- |
| `ScoreRegistry.sol`        | Stores the credit score for each verified wallet                                |
| `ZKVerifier.sol`           | Validates zk-SNARK proofs using a Polygon ID circuit validator                  |
| `CircuitValidator.sol`     | Stub contract acting as the ZK proof verifier interface (Polygon ID-compatible) |
| `SoulboundCreditToken.sol` | Non-transferable NFT (SBT) minted to represent credit reputation                |

## 📁 Folder Structure

```
contracts/
├── ScoreRegistry.sol
├── ZKVerifier.sol
├── CircuitValidator.sol
├── SoulboundCreditToken.sol
├── scripts/
│   ├── deploy.js             # Deploys ScoreRegistry + SBT + ZKVerifier
│   └── deploy-validator.js   # Deploys the CircuitValidator stub
```

## 🔨 Prerequisites

* Node.js v18+
* Hardhat
* Sepolia ETH for deployment (use faucet)
* Configure `.env` for private key and RPC

## 🚀 Deploy Contracts to Sepolia

Install dependencies:

```bash
cd contracts
yarn install
```

Compile contracts:

```bash
npx hardhat compile
```

Deploy main contracts:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Deploy validator contract:

```bash
npx hardhat run scripts/deploy-validator.js --network sepolia
```

## 🧠 Contract Summary

### 🏛 `ScoreRegistry.sol`

* `updateScore(address user, uint256 score)`
* `getScore(address user)`

Stores and retrieves the latest score for a wallet. Only callable by owner.

### 🔐 `ZKVerifier.sol`

* `verifyKYC(address, input, a, b, c)` – Calls `CircuitValidator.verify()` and stores verified status
* `isVerified(address)` – Check if the address is verified

Handles zk-SNARK KYC logic on-chain using Polygon ID-compatible verifier.

### 🧬 `CircuitValidator.sol`

* Interface contract for zk-SNARK proof validation

> Replace with a real circuit validator from [Polygon ID Contracts](https://github.com/0xPolygonID/contracts)


### 🏅 `SoulboundCreditToken.sol`

* Extends ERC721
* Prevents transfer (soulbound behavior)
* `mint(address, tokenId, tokenURI)` – Mints SBT to the user

Used to award a non-transferable "credit badge" once user score is verified.


## 🔐 Access Control

Only the backend Oracle (or deployer address) can:

* Call `updateScore` on the registry
* Call `mint` on the SBT contract
* Call `verifyKYC` on the verifier contract

Make sure your backend wallet is authorized.


## 🧪 Local Testing

You can run local tests using Hardhat:

```bash
npx hardhat test
```


## 📄 License

MIT © 2025 ZeroCred Team