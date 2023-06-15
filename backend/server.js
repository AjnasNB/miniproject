const Web3 = require('web3');
const contractABI = '../src/components/AnonymousReportSystem.json';
const contractAddress = ''; // Replace with the deployed contract address

// Connect to the Ethereum network
const web3 = new Web3('https://mainnet.infura.io/v3/your-infura-project-id');

// Create an instance of the contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Submit a new report
const district = 'District 1';
const exciseZone = 'Zone A';
const title = 'Suspicious Activity';
const description = 'Witnessed suspicious behavior near the park.';
const photoHash = '0xabc...'; // Replace with the IPFS hash of the photo
const videoHash = '0xdef...'; // Replace with the IPFS hash of the video

contract.methods.submitReport(district, exciseZone, title, description, photoHash, videoHash)
  .send({ from: '0xYourEthereumAddress' }) // Replace with your Ethereum address
  .on('transactionHash', function(hash) {
    console.log('Report submitted. Transaction hash:', hash);
  })
  .on('receipt', function(receipt) {
    // Get the report ID from the event logs
    const reportId = receipt.events.ReportSubmitted.returnValues.reportId;
    console.log('Report ID:', reportId);

    // Retrieve the submitted report
    contract.methods.getReport(reportId)
      .call({ from: '0xYourEthereumAddress' }) // Replace with your Ethereum address
      .then(function(report) {
        console.log('Submitted Report:', report);
        // Format the report as JSON and use it as needed
        const reportJSON = {
          district: report.district,
          exciseZone: report.exciseZone,
          title: report.title,
          description: report.description,
          photoHash: report.photoHash,
          videoHash: report.videoHash,
          submitter: report.submitter
        };
        console.log('Report JSON:', JSON.stringify(reportJSON));
      });
  })
  .on('error', function(error) {
    console.error('Error submitting report:', error);
  });
