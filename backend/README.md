This service powers the **ZeroCred** decentralized credit scoring protocol. It connects the frontend to smart contracts on the Ethereum Sepolia testnet, handles zk-SNARK proof verification using Polygon ID, calculates scores, and mints Soulbound Tokens (SBTs).

## 🛠 Tech Stack
* Node.js + Express
* Ethers.js for blockchain interaction
* zk-SNARK integration via Polygon ID Verifier
* Environment configuration via `dotenv`
* Ethereum Sepolia Testnet


## ⚙️ Features
* ✅ Verify ZK-KYC proofs using the `ZKVerifier` contract
* ✅ Check if a user is verified
* ✅ Update credit score (mock logic)
* ✅ Mint SBT as proof of reputation
* ✅ Serve REST APIs to frontend/UI


## 📁 Folder Contents

```
backend/
├── index.js          # Main Express server
├── package.json      # Backend dependencies
├── .env.example      # Sample environment config
```

## 📦 Installation

```bash
cd backend
cp ../.env.example .env
npm install
npm start
```

Make sure to edit the `.env` file with correct values.


## 🔐 Environment Variables

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_private_wallet_key
SCORE_REGISTRY_ADDRESS=0x... # Deployed ScoreRegistry contract
SBT_CONTRACT_ADDRESS=0x...   # Deployed SBT contract
ZK_VERIFIER_ADDRESS=0x...    # Deployed ZKVerifier contract
PORT=4000
```

## 🔗 API Endpoints

### `GET /score/:address`

Returns the on-chain score for a wallet address.

**Response:**

```json
{ "score": "730" }
```

### `POST /score/update`

Updates the score (requires user to be KYC verified) and mints a Soulbound Token.

**Request:**

```json
{ "address": "0xUserWallet" }
```

**Response:**

```json
{ "score": 748, "tokenId": 1723183747 }
```

### `POST /verify-kyc`

Submits a zk-SNARK proof for KYC verification (Polygon ID compatible).

**Request:**

```json
{
  "address": "0xUserWallet",
  "input": [ /* uint256[] */ ],
  "a": [ "0x...", "0x..." ],
  "b": [[ "0x...", "0x..." ], [ "0x...", "0x..." ]],
  "c": [ "0x...", "0x..." ]
}
```

**Response:**

```json
{ "verified": true }
```


## 🛡 Smart Contract Links

* `ScoreRegistry.sol`: Stores scores
* `ZKVerifier.sol`: Verifies ZK proofs and marks users as verified
* `SoulboundCreditToken.sol`: Mints SBTs for verified scores

## 🧪 Testing

1. Deploy all contracts using Hardhat (see `contracts/` directory).
2. Fund your deployer wallet with Sepolia ETH.
3. Run the backend with your real deployed addresses in `.env`.

## 📄 License

MIT License © 2025 ZeroCred Contributors
