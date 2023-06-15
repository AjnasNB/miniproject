import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './ReportForm.css';

// ABI (Application Binary Interface) of the smart contract
const contractABI = 
[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
					},
					{
						"internalType": "address",
						"name": "submitter",
						"type": "address"
					}
				],
				"internalType": "struct AnonymousReportingSystem.Report",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


// Address of the deployed smart contract on the Ethereum network
const contractAddress = '0xF22C5c281D44A0443638aBE1d445101cFA41809c';

const ReportForm = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [district, setDistrict] = useState('');
  const [exciseZone, setExciseZone] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
        setContract(contractInstance);

        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccounts(accounts);
        } catch (error) {
          console.error('Failed to connect to MetaMask:', error);
        }
      } else {
        console.error('Web3 not found. Please install MetaMask to interact with the Ethereum network.');
      }
      // Add this code inside the useEffect hook after setting the contract instance

// Listen for the ReportSubmitted event
contract.events.ReportSubmitted((error, event) => {
  if (error) {
    console.error('Error processing event:', error);
  } else {
    // Get the reportId from the event data
    const reportId = event.returnValues.reportId;
    console.log('Report submitted with ID:', reportId);

    // Perform any necessary actions with the submitted report
    // You can update the UI or fetch the report details using `getReport` function
  }
})
  .on('error', (error) => {
    console.error('Error listening to event:', error);
  });

    };

    initializeWeb3();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the transaction to the smart contract
      const submitter = accounts[0];

      // Convert photo and video files to their respective hashes (if needed)
      const photoHash = photo ? 'hash_of_photo_file' : '';
      const videoHash = video ? 'hash_of_video_file' : '';

      await contract.methods
        .submitReport(district, exciseZone, title, description, photoHash, videoHash)
        .send({ from: submitter });

      // Clear the form fields after successful submission
      setDistrict('');
      setExciseZone('');
      setTitle('');
      setDescription('');
      setPhoto(null);
      setVideo(null);

      // Show success message to the user
      alert('Report submitted successfully!');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('An error occurred while submitting the report. Please try again.');
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setVideo(file);
  };

  return (
    <form onSubmit={handleSubmit} className="report-form-container">
      <h2 className="report-form-heading">Submit Report</h2>
      <div className="report-form">
        <label>
          District:
          <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} className="report-form-input" />
        </label>
        <label>
          Excise Zone:
          <input type="text" value={exciseZone} onChange={(e) => setExciseZone(e.target.value)} className="report-form-input" />
        </label>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="report-form-input" />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="report-form-input"></textarea>
        </label>
        <label>
          Photo:
          <input type="file" accept="image/*" onChange={handlePhotoChange} className="report-form-input" />
        </label>
        <label>
          Video:
          <input type="file" accept="video/*" onChange={handleVideoChange} className="report-form-input" />
        </label>
        <button type="submit" className="report-form-button">Submit Report</button>
      </div>
    </form>
  );
};

export default ReportForm;
