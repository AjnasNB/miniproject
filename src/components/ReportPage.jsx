import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function ContractPage() {
  const [totalContractsDeployed, setTotalContractsDeployed] = useState(0);

  useEffect(() => {
    connectToEthereum();
  }, []);

  async function connectToEthereum() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        getTotalContractsDeployed(signer);
      } catch (error) {
        console.error('Error connecting to Ethereum:', error);
      }
    } else {
      console.error('Ethereum not found.');
    }
  }

  async function getTotalContractsDeployed(signer) {
    try {
      const contractAddress = '0x110300ecA2B4F7204e537B9B58F3E99a3F502107'; // Replace with the actual contract address
      const contractABI = [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				}
			],
			"name": "AccessGranted",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				}
			],
			"name": "AccessRevoked",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "reportId",
					"type": "uint256"
				}
			],
			"name": "ReportReceived",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "reportId",
					"type": "uint256"
				}
			],
			"name": "ReportSubmitted",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_reportId",
					"type": "uint256"
				}
			],
			"name": "getReport",
			"outputs": [
				{
					"components": [
						{
							"internalType": "string",
							"name": "district",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "exciseZone",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "title",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "description",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "photoHash",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "videoHash",
							"type": "string"
						}
					],
					"internalType": "struct AnonymousReportingSystem.Report",
					"name": "",
					"type": "tuple"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getTotalContractsDeployed",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_user",
					"type": "address"
				}
			],
			"name": "grantAccess",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_user",
					"type": "address"
				}
			],
			"name": "revokeAccess",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_district",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_exciseZone",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_title",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_description",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_photoHash",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_videoHash",
					"type": "string"
				}
			],
			"name": "submitReport",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const totalContracts = await contract.getTotalContractsDeployed();
      setTotalContractsDeployed(totalContracts);
    } catch (error) {
      console.error('Error calling getTotalContractsDeployed():', error);
    }
  }

  return (
    <div>
      <h1>Total Contracts Deployed: {totalContractsDeployed}</h1>
    </div>
  );
}

export default ContractPage;
