
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const CircuitValidator = await hre.ethers.getContractFactory("CircuitValidator");
  const validator = await CircuitValidator.deploy();
  await validator.deployed();
  console.log("CircuitValidator deployed to:", validator.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
