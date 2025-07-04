const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Blockchain setup
const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contract ABIs
const registryAbi = [
  "function updateScore(address user, uint256 newScore) public",
  "function getScore(address user) public view returns (uint256)"
];

const sbtAbi = [
  "function mint(address to, uint256 tokenId, string memory tokenURI) public"
];

const verifierAbi = [
  "function verifyKYC(address user, uint256[] calldata input, uint256[2] calldata a, uint256[2][2] calldata b, uint256[2] calldata c) external",
  "function isVerified(address user) external view returns (bool)"
];

// Contract instances
const registry = new ethers.Contract(process.env.SCORE_REGISTRY_ADDRESS, registryAbi, wallet);
const sbt = new ethers.Contract(process.env.SBT_CONTRACT_ADDRESS, sbtAbi, wallet);
const verifier = new ethers.Contract(process.env.ZK_VERIFIER_ADDRESS, verifierAbi, wallet);

// Routes
app.get("/score/:address", async (req, res) => {
  try {
    const score = await registry.getScore(req.params.address);
    res.json({ score: score.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch score" });
  }
});

app.post("/score/update", async (req, res) => {
  const { address } = req.body;
  try {
    const isVerified = await verifier.isVerified(address);
    if (!isVerified) {
      return res.status(403).json({ error: "KYC not verified" });
    }

    const score = Math.floor(Math.random() * 300) + 550;
    const tx = await registry.updateScore(address, score);
    await tx.wait();

    const tokenURI = `data:application/json;base64,${Buffer.from(JSON.stringify({
      name: "ZeroCred SBT",
      description: "Your decentralized credit score",
      attributes: [{ trait_type: "Credit Score", value: score }]
    })).toString("base64")}`;

    const tokenId = Date.now();
    const mintTx = await sbt.mint(address, tokenId, tokenURI);
    await mintTx.wait();

    res.json({ score, tokenId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update score or mint SBT" });
  }
});

app.post("/verify-kyc", async (req, res) => {
  const { address, input, a, b, c } = req.body;
  try {
    const tx = await verifier.verifyKYC(address, input, a, b, c);
    await tx.wait();
    res.json({ verified: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Verification failed" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`ZeroCred backend is live on http://localhost:${PORT}`);
});
