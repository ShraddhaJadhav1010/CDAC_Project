import React, { useState } from "react";
import "../styles/ConflictHandlingPage.css"
import TopBar from "./TopBar";
import MainNavbar from "./MainNavbar";


const ConflictHandlingPage = () => {
  const [formData, setFormData] = useState({
    orderId: "",
    title: "",
    description: "",
    file: null, 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const validateForm = () => {
    const { orderId, title, description, file } = formData;

    // Check required fields
    if (!orderId || !title || !description || !file) {
        alert("Please fill in all the fields.");
        return false;
      }
  
      // Validate Order ID - Must start with "OR" and followed by numbers
      const orderIdPattern = /^OR\d+$/;
      if (!orderIdPattern.test(orderId)) {
        alert("Order ID must start with 'OR' followed by numbers.");
        return false;
      }
  
      // Validate Title and Description - Minimum length of 3 characters
      if (title.length < 3 || description.length < 3) {
        alert("Title and Description must each be at least 3 characters long.");
        return false;
      }
  
      // Validate File Type - Must be an image, PDF, or Word file
      const allowedFileTypes = ["image/png", "image/jpeg", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowedFileTypes.includes(file.type)) {
        alert("Only image files (PNG, JPEG), PDFs, or Word documents are allowed.");
        return false;
      }
  
      return true;
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
    console.log(formData);
    alert("Form submitted successfully!");
  }
  };

  return (
    <div>
        {/* <TopBar />
        <MainNavbar /> */}
        <div className="conflict-handling-container">
        <h2 className="conflict-handling-header">Conflict Handling Form</h2>
        <form className="conflict-handling-form" onSubmit={handleSubmit}>
          <div className="conflict-form-group">
            <label className="conflict-form-label">Order ID:</label>
            <input
              type="text"
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
              className="conflict-form-input"
              required
            />
          </div>
          <div className="conflict-form-group">
            <label className="conflict-form-label">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="conflict-form-input"
              required
            />
          </div>
          <div className="conflict-form-group">
            <label className="conflict-form-label">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="conflict-form-textarea"
              required
            ></textarea>
          </div>
          <div className="conflict-form-group">
            <label className="conflict-form-label">Upload File:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="conflict-form-file"
            />
          </div>
          <button type="submit" className="conflict-form-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConflictHandlingPage;
