import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

// INTERNAL IMPORT
import { CrowdFundingABI, CrowdFundingAddress } from "./contants";

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState("");

    //---CREATE CAMPAIGN
    const createCampaign = async (campaign) => {
        const { title, description, amount, deadline } = campaign;

        if (typeof window.ethereum === "undefined") {
            throw new Error("Please install MetaMask!");
        }

        const provider = new ethers.BrowserProvider(window.ethereum); // Initialize provider
        const signer = await provider.getSigner(); // Get the signer
        const contract = fetchContract(signer); // Initialize the contract

        try {
            const transaction = await contract.createCampaign(
                currentAccount, // owner
                title, // title
                description, // description
                ethers.parseUnits(amount, 18), // Convert amount to wei
                new Date(deadline).getTime() // Convert deadline to Unix timestamp
            );

            await transaction.wait(); // Wait for the transaction to be mined
            console.log("Contract call success", transaction);

            // Return the newly created campaign data
            return {
                owner: currentAccount,
                title,
                description,
                target: ethers.formatEther(ethers.parseUnits(amount, 18)), // Convert back to ETH
                deadline: new Date(deadline).getTime(),
                amountCollected: "0", // New campaigns have 0 donations initially
                pId: Date.now(), // Use a temporary ID (replace with actual ID from the contract if available)
            };
        } catch (error) {
            console.error("Contract call failure", error);
            throw error;
        }
    };

    //---GET ALL CAMPAIGNS
    const getCampaigns = async () => {
        const provider = new ethers.JsonRpcProvider(); // Correct provider initialization
        const contract = fetchContract(provider);

        const campaigns = await contract.getCampaigns();

        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.formatEther(campaign.target.toString()), // Convert target to ETH
            deadline: Number(campaign.deadline.toString()), // Convert deadline to number
            amountCollected: ethers.formatEther(campaign.amountCollected.toString()), // Convert amountCollected to ETH
            pId: i,
        }));

        return parsedCampaigns;
    };

    //---GET USER CAMPAIGNS
    const getUserCampaigns = async () => {
        const provider = new ethers.JsonRpcProvider(); // Correct provider initialization
        const contract = fetchContract(provider);
        const allCampaigns = await contract.getCampaigns();

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        const currentUser = accounts[0]; // Get the current user's address

        if (!currentUser) {
            console.error("No user account found. Please connect your wallet.");
            return [];
        }

        // Filter campaigns by the current user's address
        const filteredCampaigns = allCampaigns.filter(
            (campaign) => campaign.owner.toLowerCase() === currentUser.toLowerCase()
        );

        const userData = filteredCampaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.formatEther(campaign.target.toString()), // Convert target to ETH
            deadline: Number(campaign.deadline.toString()), // Convert deadline to number
            amountCollected: ethers.formatEther(campaign.amountCollected.toString()), // Convert amountCollected to ETH
            pId: i,
        }));

        return userData;
    };

    //---DONATE TO CAMPAIGN
    const donate = async (pId, amount) => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(connection); // Use ethers.BrowserProvider
        const signer = await provider.getSigner(); // Add await here
        const contract = fetchContract(signer);

        const campaignData = await contract.donateToCampaign(pId, {
            value: ethers.parseEther(amount), // Use ethers.parseEther directly
        });
        await campaignData.wait();
        location.reload();
        return campaignData;
    };

    //---GET DONATIONS
    const getDonations = async (pId) => {
        const provider = new ethers.JsonRpcProvider(); // Use ethers.JsonRpcProvider directly
        const contract = fetchContract(provider);
        const donations = await contract.getDonators(pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];
        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.formatEther(donations[1][i].toString()), // Use ethers.formatEther directly
            });
        }
        return parsedDonations;
    };

    //---CHECK IF WALLET IS CONNECTED
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum)
                return console.log("Install MetaMask");
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No Account Found");
            }
        } catch (error) {
            console.log("Something wrong while connecting to wallet");
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    //---CONNECT WALLET FUNCTION
    const connectWallet = async () => {
        try {
            if (!window.ethereum) return console.log("Install MetaMask");
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log("error while connecting to wallet");
        }
    };

    return (
        <CrowdFundingContext.Provider
            value={{
                titleData,
                currentAccount,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                connectWallet,
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    );
};