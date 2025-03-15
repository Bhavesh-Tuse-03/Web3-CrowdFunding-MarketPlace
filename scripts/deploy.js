const hre = require("hardhat");

async function main() {
    // Get the contract factory
    const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");

    // Deploy the contract
    const crowdFunding = await CrowdFunding.deploy();

    // Wait for deployment
    await crowdFunding.deploymentTransaction().wait(); // Use deploymentTransaction().wait() instead of deployed()

    // Log the deployed contract address
    console.log("CrowdFunding deployed to:", crowdFunding.target); // Use target instead of getAddress()
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
