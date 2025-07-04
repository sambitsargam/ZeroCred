
# 🧑‍💻 ZeroCred Frontend

This is the frontend interface for **ZeroCred**, a decentralized credit scoring platform that uses zk-SNARK KYC (via Polygon ID) and mints Soulbound Tokens (SBTs) to represent verified credit reputation.

Built with **React**, **TailwindCSS**, and **MetaMask SDK**, it allows users to:
- Connect wallet
- Submit ZK proof
- View credit score
- Recalculate score
- Mint & view SBT badges



## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React | Frontend Framework |
| Tailwind CSS | UI Styling |
| MetaMask SDK | Wallet Connection |
| Axios | Backend API calls |
| ethers.js | Web3 contract calls (read-only) |
| vite or react-scripts | Dev server & bundling |



## 🚀 Setup Instructions

```bash
cd frontend
npm install
npm start
```

Runs the app at: [http://localhost:3000](http://localhost:3000)



## ⚙️ Features

- 🔌 Connect to MetaMask
- 🔒 Submit ZK Proof (via backend `/verify-kyc`)
- 📈 View credit score (from blockchain)
- 🛠 Trigger `/score/update` to mint SBT
- 🪪 Show visual badge based on score tier:
  - 🥉 Bronze (550–599)
  - 🥈 Silver (600–699)
  - 🥇 Gold (700–799)
  - 💎 Diamond (800+)



## 🧬 File Structure

```
frontend/
├── src/
│   ├── App.js           # Main React component
│   ├── index.js         # Entry point
│   ├── index.css        # Tailwind base styles
│   ├── assets/          # Score badges (SVGs)
│   └── components/      # (Optional) Modular components
├── public/
│   └── index.html       # HTML root
├── tailwind.config.js   # Tailwind setup
├── postcss.config.js    # Tailwind + PostCSS pipeline
└── package.json         # Project metadata and deps
```



## 📦 Environment Variables (Optional)

If needed in the future:
```
REACT_APP_BACKEND_URL=http://localhost:4000
REACT_APP_CHAIN_ID=11155111  # Sepolia
```



## 🔗 Interactions

| UI Action | Calls | Notes |
|----------|-------|-------|
| Connect Wallet | MetaMask SDK | Detects user address |
| "Verify KYC" | `/verify-kyc` | Sends ZK proof via backend |
| "Get Score" | `/score/:address` | Fetches on-chain score |
| "Recalculate Score" | `/score/update` | Requires verified status |
| View Badge | Score logic | UI badge changes by score |



## ✨ Enhancements

- 🧩 Add QR scanner for Polygon ID credential
- 📊 Show historical score chart
- 💬 Add toast notifications
- 🔁 Support multiple chains with LI.FI SDK


## 🧾 License

MIT © 2025 ZeroCred Contributors
