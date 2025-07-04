
// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const ScoreRegistry = await ethers.getContractFactory("ScoreRegistry");
  const registry = await ScoreRegistry.deploy();
  await registry.deployed();
  console.log("ScoreRegistry deployed to:", registry.address);

  const SBT = await ethers.getContractFactory("SoulboundCreditToken");
  const sbt = await SBT.deploy();
  await sbt.deployed();
  console.log("SoulboundCreditToken deployed to:", sbt.address);

  const Verifier = await ethers.getContractFactory("ZKVerifierMock");
  const verifier = await Verifier.deploy();
  await verifier.deployed();
  console.log("ZKVerifierMock deployed to:", verifier.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
