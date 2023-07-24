import { useState } from 'react';
import Web3 from 'web3';
import CryptoJS from 'crypto-js';
import contractAbi from './Abi.json';
const KEY = process.env.REACT_APP_ENCRYPTION_KEY; // Replace with your secret key

const ReportPage = () => {
  const [reportId, setReportId] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const initializeWeb3 = async (reportId) => {
    if (window.ethereum) {
      try {
        setLoading(true);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        // Fetch the report using the current user's account
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        try {
          const fetchedReport = await contract.methods.getReportById(reportId).call({ from: account });
          setReport(fetchedReport);
          setError('');
        } catch (error) {
          setError('Error fetching report: Report not found.');
        } finally {
          setLoading(false);
        }
      } catch (error) {
        setError('Error initializing web3: ' + error.message);
        setLoading(false);
      }
    } else {
      setError('MetaMask not detected');
    }
  };

  const handleReportIdChange = (event) => {
    setReportId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Fetch the report using the current user's account
    // You can perform additional validation before making the request
    if (reportId) {
      initializeWeb3(reportId); // Call the function to fetch the report
    }
  };

  const decryptData = (data) => {
    try {
      console.log('Encrypted data:', data); // Check the encrypted data
      // Decrypt the data using AES algorithm and secret key
      const decryptedBytes = CryptoJS.AES.decrypt(data, KEY);
      const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
      return decryptedText;
    } catch (error) {
      console.error('Error decrypting data:', error);
      return '';
    }
  };

  return (
    <div>
      <h1>Fetch Report</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Report ID:
          <input type="text" value={reportId} onChange={handleReportIdChange} />
        </label>
        <button type="submit">Fetch Report</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {report ? (
        <div>
          <h2>Report Details</h2>
          <p>District: {decryptData(report.district)}</p>
          <p>Area: {decryptData(report.area)}</p>
          <p>Title: {decryptData(report.title)}</p>
          <p>Description: {decryptData(report.description)}</p>
          <p>Photo Hash: {decryptData(report.photoHash)}</p>
          <p>Video Hash: {decryptData(report.videoHash)}</p>
        </div>
      ) : (
        <p>Enter a valid report ID and click "Fetch Report" to see the details.</p>
      )}
    </div>
  );
};

export default ReportPage;
