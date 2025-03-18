import { ethers } from "hardhat";
import { config } from "dotenv";

config();

async function main() {
  // Get the contract factory
  const FinePayment = await ethers.getContractFactory("FinePayment");
  
  // Deploy the contract with a mock ERC20 token address
  // In production, you would use your actual ERC20 token address
  const mockTokenAddress = "0x0000000000000000000000000000000000000000";
  
  console.log("Deploying FinePayment contract...");
  const finePayment = await FinePayment.deploy(mockTokenAddress);
  await finePayment.deployed();
  
  console.log("FinePayment deployed to:", finePayment.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 