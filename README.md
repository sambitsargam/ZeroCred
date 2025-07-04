
# 🏦 ZeroCred

ZeroCred is a privacy-preserving, decentralized credit scoring protocol built with zk-SNARK identity verification, on-chain behavioral analysis, and Soulbound Tokens (SBTs). Users can verify their identity using **Polygon ID**, and receive a **non-transferable reputation badge** that reflects their creditworthiness based on on-chain activity.


## 🧰 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React + Tailwind CSS + MetaMask SDK |
| Backend | Node.js + Express + Ethers.js |
| Smart Contracts | Solidity + Hardhat |
| ZK Identity | Polygon ID |
| Token Logic | USDC (simulated) |
| Cross-chain Ready | LI.FI SDK + Circle CCTP V2 |
| Deployment | Sepolia or Linea Testnet |


## 🧩 Features

- 🔒 ZK-based KYC using Polygon ID
- 🧠 On-chain behavior → Credit Score
- 🏅 Non-transferable Soulbound NFT as proof
- 🔁 Updatable score with verifiable identity
- 🌐 API access to credit score endpoints
- 🎖️ Frontend badge tiers (Bronze → Diamond)


## 📁 Project Structure

```
ZeroCred-MVP/
├── frontend/               # React + Tailwind UI
├── backend/                # Express server + Ethers.js
├── contracts/              # Solidity smart contracts
├── docs/                   # Architecture, schemas, ABIs
├── .env.example            # Example env config
└── README.md               # This file
```

## 🧪 Contracts

- `ScoreRegistry.sol`: Tracks and updates user scores
- `SoulboundCreditToken.sol`: Minted on scoring, soulbound to wallet
- `ZKVerifier.sol`: Accepts zk-SNARK proofs (Polygon ID-style)
- `CircuitValidator.sol`: Interface for Polygon ID circuit logic

Deploy using:
```bash
npx hardhat run scripts/deploy.js --network sepolia
npx hardhat run scripts/deploy-validator.js --network sepolia
```


## 🔐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/score/:address` | GET | Fetch a user’s score |
| `/score/update` | POST | Calculate + Mint SBT |
| `/verify-kyc` | POST | Validate zk-SNARK proof |


## 🧾 Documentation

- `frontend/README.md`: React app usage and structure
- `backend/README.md`: Express API server details
- `contracts/README.md`: Smart contract descriptions
- `docs/architecture.md`: Architecture + system diagram
- `docs/circuit_validator.abi.json`: ABI for zk verifier
- `docs/polygonid_kyc_schema.json`: Polygon ID credential schema

## 📦 Installation

```bash
git clone https://github.com/sambitsargam/zerocred.git
cd ZeroCred

# Install all dependencies
cd contracts && yarn install
cd ../backend && npm install
cd ../frontend && npm install
```

Set up `.env` from `.env.example` in the root.

## 📜 License

MIT © 2025 ZeroCred Contributors
