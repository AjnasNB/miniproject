import React, { useState } from "react";
import "./ReportForm.css"; // Import the CSS file for styling
import Location from "./Location"; // Import the Location component

const ReportForm = () => {
  const [reportData, setReportData] = useState({
    district: "", // Add district field to reportData
    exciseZone: "", // Add exciseZone field to reportData
    title: "",
    description: "",
    photo: null,
    video: null
  });

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReportData({ ...reportData, [name]: value });
  };

  // Handle district selection
  const handleDistrictSelect = (district) => {
    setReportData({ ...reportData, district });
  };

  // Handle excise zone selection
  const handleExciseZoneSelect = (exciseZone) => {
    setReportData({ ...reportData, exciseZone });
  };

  // Handle photo file upload
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    setReportData({ ...reportData, photo: file });
  };

  // Handle video file upload
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setReportData({ ...reportData, video: file });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Encrypt the reportData and send it to the backend
    // using appropriate encryption and API calls
    // Reset the form after submission
    setReportData({
      district: "",
      exciseZone: "",
      title: "",
      description: "",
      photo: null,
      video: null
    });
  };
 

  return (
    <div className="report-form-container">
      <h1 className="report-form-heading">Suraksh</h1>
      <form onSubmit={handleSubmit} className="report-form" id="report-form">
        <Location
          district={reportData.district}
          exciseZone={reportData.exciseZone}
          onDistrictSelect={handleDistrictSelect}
          onExciseZoneSelect={handleExciseZoneSelect}
          
        />
        <input
          type="text"
          name="title"
          value={reportData.title}
          onChange={handleInputChange}
          placeholder="Report Title"
          className="report-form-input"
          required
        />
        <textarea
          name="description"
          value={reportData.description}
          onChange={handleInputChange}
          placeholder="Report Description"
          className="report-form-input"
          required
        />
        <label className="report-form-label">Upload Photo</label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="report-form-input"
        />
        <label className="report-form-label">Upload Video</label>
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleVideoUpload}
          className="report-form-input"
        />
        <button type="submit" className="report-form-button">Submit Report</button>
      </form>
    </div>
  );
  
};

export default ReportForm;
