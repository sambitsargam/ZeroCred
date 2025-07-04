# 🏗️ ZeroCred – Architecture Overview

ZeroCred is a decentralized credit reputation system that uses **ZK identity verification**, **on-chain behavioral analysis**, and **Soulbound NFTs** to create a composable Web3 credit score.

---

## 🔍 High-Level Flow

```
   ┌────────────┐          ┌────────────────────┐           ┌────────────────────┐
   │  User Wallet│◄───────►│ Polygon ID Wallet  │           │Polygon ID Issuer   │
   └────┬────────┘          └──────┬─────────────┘           └──────────┬─────────┘
        │                          │ Issue Credential                       │
        │ Scan QR & Prove KYC ◄────┘                                       │
        ▼                                                                  │
┌─────────────────────────────────────────────────────────────────────────▼────────────────────┐
│                                         Frontend (React + Tailwind)                                             │
│                                                                                                                 │
│  - Connects to MetaMask                                                                                         │
│  - Shows score, badge                                                                                           │
│  - Submits ZK proof and triggers backend logic                                                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                         Backend (Express + Ethers.js)                                          │
│                                                                                                                 │
│  - Verifies KYC ZK proof via ZKVerifier.sol                                                                     │
│  - If verified, calculates score (mock or data-driven)                                                          │
│  - Updates ScoreRegistry                                                                                       │
│  - Mints SoulboundCreditToken with dynamic score metadata                                                      │
│  - Exposes REST API                                                                                             │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                         Ethereum Sepolia (or Linea)                                            │
│                                                                                                                 │
│  - ScoreRegistry.sol: Stores scores per user                                                                    │
│  - SoulboundCreditToken.sol: Non-transferable NFTs                                                              │
│  - ZKVerifier.sol: Validates zk-SNARKs with CircuitValidator                                                    │
│  - CircuitValidator.sol: Polygon ID-compatible circuit hook                                                     │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

```

---

## 🔗 Component Breakdown

| Layer      | Tech                          | Role                                    |
| ---------- | ----------------------------- | --------------------------------------- |
| Wallet     | MetaMask                      | Signs transactions, connects user       |
| Identity   | Polygon ID                    | ZK-KYC, no personal data leaked         |
| Frontend   | React + Tailwind              | UI for score, badge, wallet interaction |
| Backend    | Node.js + Express             | Score logic, verification, API          |
| Blockchain | Ethereum Sepolia or Linea     | Score and SBT storage                   |
| ZK Proof   | Polygon ID Verifier + Circuit | Validates user proofs on-chain          |
| Token      | Soulbound ERC721              | Immutable credit history badge          |

---

## 🔒 Security + Privacy Model

| Concern                     | How it's Addressed                              |
| --------------------------- | ----------------------------------------------- |
| **KYC Privacy**             | zk-SNARKs + Polygon ID = no PII shared          |
| **Fake Score Manipulation** | Only backend signer can mint + score            |
| **SBT Transfer Exploit**    | `SoulboundCreditToken` disables transfer        |
| **Sybil Attack**            | One credential per identity (ZK + wallet bound) |

---

## 🚀 Deployment Stack

| Service                    | Used For               |
| -------------------------- | ---------------------- |
| **Vercel / Netlify**       | Host frontend          |
| **Render / Railway**       | Host backend API       |
| **Sepolia / Linea**        | Testnet contracts      |
| **Infura / Alchemy**       | Sepolia RPC            |
| **Polygon ID Issuer Node** | Issue credentials      |
| **IPFS (optional)**        | Host metadata for SBTs |

---

## 📦 Expandability

* ✅ Integrate Circle Wallet SDK for real USDC behavior scoring
* ✅ Add LI.FI SDK for score portability across chains
* ✅ Add lending API integrations (Aave, Compound)
* ✅ Add notification system on score drops
* ✅ DAO-gated credential use (soulbound DAO roles)