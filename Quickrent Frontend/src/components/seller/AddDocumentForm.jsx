/********* */
import React, { useState } from "react";
import "../../styles/AddDocumentForm.css";
import { validateForm } from "../../utils/formValidation";

function AddDocumentForm() {
  const [activeTab, setActiveTab] = useState("add");
  const [formData, setFormData] = useState({
    aadharNo: "",
    panNo: "",
    aadharCard: null,
    panCard: null,
    searchAadhar: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // Simulated database for searching Aadhar numbers
  const database = [
    { aadharNo: "123456789012", name: "Sumant Reddy", panNo: "ABCDE1234F" },
    { aadharNo: "987654321098", name: "Ashwini Patil", panNo: "PQRSX5678Z" },
  ];

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
    setErrors({ ...errors, [name]: "" }); // Clear errors for the field being edited
  };

  // Handle form submission for Add Document
  const handleAddDocumentSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData, "add");

    if (Object.keys(validationErrors).length === 0) {
      setSuccessMessage("Document submitted successfully!");
      setFormData({
        aadharNo: "",
        panNo: "",
        aadharCard: null,
        panCard: null,
        searchAadhar: "",
      });
      setErrors({});
    } else {
      setSuccessMessage("");
      setErrors(validationErrors);
    }
  };

  // Handle form submission for Update Document
  const handleSearch = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData, "update");

    if (Object.keys(validationErrors).length === 0) {
      // Simulate search in database
      const result = database.find(
        (record) => record.aadharNo === formData.searchAadhar
      );

      if (result) {
        setSearchResult(result);
        setErrors({});
      } else {
        setErrors({
          searchAadhar: "No record found with this Aadhar number.",
        });
        setSearchResult(null);

        setActiveTab("add");
      }
    } else {
      setSearchResult(null);
      setErrors(validationErrors);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrors({});
    setSuccessMessage("");
  };

  return (
    <div className="add-document-container">
      {/* Tabs Header */}
      <div className="tabs-header">
        <button
          className={activeTab === "add" ? "active-tab" : ""}
          onClick={() => handleTabChange("add")}
        >
          Add Documents
        </button>
        <button
          className={activeTab === "update" ? "active-tab" : ""}
          onClick={() => handleTabChange("update")}
        >
          Update Documents
        </button>
      </div>

      {/* Tabs Content */}
      <div className="tabs-content">
        {activeTab === "add" && (
          <div className="tab-panel">
            <h2>Add Documents</h2>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            <form onSubmit={handleAddDocumentSubmit}>
              <div className="form-group">
                <label htmlFor="aadhar">Aadhar Number</label>
                <input
                  type="text"
                  id="aadhar"
                  name="aadharNo"
                  placeholder="Enter 12-digit Aadhar number"
                  value={formData.aadharNo}
                  onChange={handleInputChange}
                />
                {errors.aadharNo && (
                  <span className="error">{errors.aadharNo}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="pan">PAN Number</label>
                <input
                  type="text"
                  id="pan"
                  name="panNo"
                  placeholder="Enter 10-character PAN number"
                  value={formData.panNo}
                  onChange={handleInputChange}
                />
                {errors.panNo && <span className="error">{errors.panNo}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="aadharFile">Aadhar Card</label>
                <input
                  type="file"
                  id="aadharFile"
                  name="aadharCard"
                  onChange={handleFileChange}
                />
                {errors.aadharCard && (
                  <span className="error">{errors.aadharCard}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="panFile">PAN Card</label>
                <input
                  type="file"
                  id="panFile"
                  name="panCard"
                  onChange={handleFileChange}
                />
                {errors.panCard && (
                  <span className="error">{errors.panCard}</span>
                )}
              </div>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        )}
        {activeTab === "update" && (
          <div className="tab-panel">
            <h2>Update Documents</h2>
            <form onSubmit={handleSearch}>
              <div className="form-group">
                <label htmlFor="searchAadhar">Search by Aadhar Number</label>
                <input
                  type="text"
                  id="searchAadhar"
                  name="searchAadhar"
                  placeholder="Enter 12-digit Aadhar number"
                  value={formData.searchAadhar}
                  onChange={handleInputChange}
                />
                {errors.searchAadhar && (
                  <span className="error">{errors.searchAadhar}</span>
                )}
              </div>
              <button type="submit" className="search-btn">
                Search
              </button>
            </form>
            {searchResult && (
              <div className="search-result">
                <h3>Search Result:</h3>
                <p>
                  <strong>Name:</strong> {searchResult.name}
                </p>
                <p>
                  <strong>PAN Number:</strong> {searchResult.panNo}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddDocumentForm;
