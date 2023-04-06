import React, { useState } from "react";

const Location = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedExciseZone, setSelectedExciseZone] = useState("");

  // Handle district selection
  const handleDistrictChange = (event) => {
    const { value } = event.target;
    setSelectedDistrict(value);
    // Reset selected excise zone when district changes
    setSelectedExciseZone("");
  };

  // Handle excise zone selection
  const handleExciseZoneChange = (event) => {
    const { value } = event.target;
    setSelectedExciseZone(value);
  };

  return (
    <div>
      <label htmlFor="district">District:</label>
      <select
        id="district"
        name="district"
        value={selectedDistrict}
        onChange={handleDistrictChange}
      >
        <option value="">Select District</option>
        <option value="Alappuzha">Alappuzha</option>
        <option value="Ernakulam">Ernakulam</option>
        <option value="Idukki">Idukki</option>
        <option value="Kannur">Kannur</option>
        <option value="Kasaragod">Kasaragod</option>
        <option value="Kollam">Kollam</option>
        <option value="Kottayam">Kottayam</option>
        <option value="Kozhikode">Kozhikode</option>
        <option value="Malappuram">Malappuram</option>
        <option value="Palakkad">Palakkad</option>
        <option value="Pathanamthitta">Pathanamthitta</option>
        <option value="Thiruvananthapuram">Thiruvananthapuram</option>
        <option value="Thrissur">Thrissur</option>
        <option value="Wayanad">Wayanad</option>
      </select>
      <br />
      <label htmlFor="exciseZone">Excise Zone:</label>
      <select
        id="exciseZone"
        name="exciseZone"
        value={selectedExciseZone}
        onChange={handleExciseZoneChange}
      >
        <option value="">Select Excise Zone</option>
        {selectedDistrict === "Alappuzha" && (
          <React.Fragment>
            <option value="AlappuzhaExciseZone1">Excise Zone 1</option>
            <option value="AlappuzhaExciseZone2">Excise Zone 2</option>
            <option value="AlappuzhaExciseZone3">Excise Zone 3</option>
            {/* Add more excise zone options for Alappuzha as needed */}
          </React.Fragment>
        )}
        {selectedDistrict === "Ernakulam" && (
          <React.Fragment>
            <option value="ErnakulamExciseZone1">Excise Zone 1</option>
            <option value="ErnakulamExciseZone2">Excise Zone 2</option>
            <option value="ErnakulamExciseZone3">Excise Zone 3</option>
            {/* Add more excise zone options for Ernakulam as needed */}
          </React.Fragment>
        )}
        ...
        {selectedDistrict === "Idukki" && (
          <React.Fragment>
            <option value="IdukkiExciseZone1">Excise Zone 1</option>
            <option value="IdukkiExciseZone2">Excise Zone 2</option>
            <option value="IdukkiExciseZone3">Excise Zone 3</option>
            {/* Add more excise zone options for Idukki as needed */}
          </React.Fragment>
        )}
        {selectedDistrict === "Kannur" && (
          <React.Fragment>
            <option value="KannurExciseZone1">Excise Zone 1</option>
            <option value="KannurExciseZone2">Excise Zone 2</option>
            <option value="KannurExciseZone3">Excise Zone 3</option>
            {/* Add more excise zone options for Kannur as needed */}
          </React.Fragment>
        )}
        {/* Repeat the above pattern for the remaining districts */}
        {selectedDistrict === "Kasaragod" && (
          <React.Fragment>
            <option value="KasaragodExciseZone1">Excise Zone 1</option>
            <option value="KasaragodExciseZone2">Excise Zone 2</option>
            <option value="KasaragodExciseZone3">Excise Zone 3</option>
            {/* Add more excise zone options for Kasaragod as needed */}
          </React.Fragment>
        )}
        {selectedDistrict === "Kollam" && (
          <React.Fragment>
            <option value="KollamExciseZone1">Excise Zone 1</option>
            <option value="KollamExciseZone2">Excise Zone 2</option>
            <option value="KollamExciseZone3">Excise Zone 3</option>
            {/* Add more excise zone options for Kollam as needed */}
          </React.Fragment>
        )}
        {selectedDistrict === "Kottayam" && (
          <React.Fragment>
            <option value="KottayamExciseZone1">Excise Zone 1</option>
            <option value="KottayamExciseZone2">Excise Zone 2</option>
            <option value="KottayamExciseZone3">Excise Zone 3</option>
            {/* Add more excise zone options for Kottayam as needed */}
          </React.Fragment>
        )}
        {selectedDistrict === "Kozhikode" && (
          <React.Fragment>
            <option value="KozhikodeExciseZone1">Excise Zone 1</option>
            <option value="KozhikodeExciseZone2">Excise Zone 2</option>
            <option value="KozhikodeExciseZone3">Excise Zone 3</option>
            {/* Add more excise zone options for Kozhikode as needed */}
          </React.Fragment>
        )}
        {selectedDistrict === "Malappuram" && (
          <React.Fragment>
            <option value="MalappuramExciseZone1">Excise Zone 1</option>
            <option value="MalappuramExciseZone2">Excise Zone 2</option>
            <option value="MalappuramExciseZone3">Excise Zone 3</option>
            {/* Add more excise zone options for Malappuram as needed */}
          </React.Fragment>
        )}
        {selectedDistrict === "Palakkad" && (
          <React.Fragment>
            <option value="PalakkadExciseZone1">Excise Zone 1</option>
            <option value="PalakkadExciseZone2">Excise Zone 2</option>
            <option value="PalakkadExciseZone3">Excise Zone 3</option>
            {/* Add more excise zone options for Palakkad as needed */}
          </React.Fragment>
        
        )}
        {selectedDistrict === "Pathanamthitta" && (
            
          <React.Fragment>
            <option value="PathanamthittaExciseZone1">Excise Zone 1</option>
            <option value="PathanamthittaExciseZone2">Excise Zone 2</option>
            <option value="PathanamthittaExciseZone3">Excise Zone 3</option>
            {/* Add more excise zone options for Pathanamthitta as needed */}
          </React.Fragment>
        )}
        {selectedDistrict === "Thiruvananthapuram" && (
          <React.Fragment>  
            <option value="ThiruvananthapuramExciseZone1">Excise Zone 1</option>
            <option value="ThiruvananthapuramExciseZone2">Excise Zone 2</option>
            <option value="ThiruvananthapuramExciseZone3">Excise Zone 3</option>
            {/* Add more excise zone options for Thiruvananthapuram as needed */}
          </React.Fragment>
        )}
        {selectedDistrict === "Thrissur" && (
          <React.Fragment>
            <option value="ThrissurExciseZone1">Excise Zone 1</option>
            <option value="ThrissurExciseZone2">Excise Zone 2</option>
            <option value="ThrissurExciseZone3">Excise Zone 3</option>
            {/* Add more excise zone options for Thrissur as needed */}
          </React.Fragment>

        )}
        {selectedDistrict === "Wayanad" && (
            
          <React.Fragment>
            <option value="WayanadExciseZone1">Excise Zone 1</option>
            <option value="WayanadExciseZone2">Excise Zone 2</option>
            <option value="WayanadExciseZone3">Excise Zone 3</option>
            {/* Add more excise zone options for Wayanad as needed */}
          </React.Fragment>
        )}

      </select>
    </div>
  );
}
export default Location;

