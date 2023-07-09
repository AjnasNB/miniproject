import { useEffect, useState } from 'react';
import Web3 from 'web3';
const contractAbi = [
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
] // Your contract ABI

const ReportPage = () => {
  
  const [total, setTotal] = useState(0);

  

  const initializeWeb3 = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const contractAddress = '0x110300ecA2B4F7204e537B9B58F3E99a3F502107'; // Replace with your contract address
        const contract = new web3.eth.Contract(contractAbi, contractAddress);


        // Fetch the report using the current user's account
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        try {
          const fetchedReport = await contract.methods.getTotalContractsDeployed().call({ from: account });
          console.log(parseInt(fetchedReport));
          setTotal(parseInt(fetchedReport));
        } catch (error) {
          console.error('Error fetching report:', error);
        }
      } catch (error) {
        console.error('Error initializing web3:', error);
      }
    } else {
      console.error('MetaMask not detected');
    }
  };

  useEffect(() => {
    initializeWeb3();
  }, []);
  if(!total){
    initializeWeb3();
  }
  return (
    <div>
      <h1>Total Reports:{total}</h1>
      
    </div>
  );
};

export default ReportPage;
