import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import "../styles/AddAdmin.css";
import { DashNav } from "./DashNav";

const AddAdmin = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = [];

    if (!employeeId) {
      errors.push("Employee ID is required.");
    }
    if (!adminName) {
      errors.push("Admin Name is required.");
    } else if (!/^[A-Za-z\s]+$/.test(adminName)) {
      errors.push("Admin Name must contain only letters.");
    }
    if (!email) {
      errors.push("Email is required.");
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {
      errors.push("Please enter a valid email address.");
    }
    if (!password) {
      errors.push("Password is required.");
    } else if (password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.error(error);
      });
    } else {
      toast.success(`Admin ${adminName} added successfully!`);

      setEmployeeId("");
      setAdminName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
    {/* <DashNav /> */}
    <div className="add-admin-container">
      <h1>Add New Admin</h1>
      <form className="input-fields" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employeeId">Employee ID:</label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Enter employee ID"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="adminName">Admin Name:</label>
          <input
            type="text"
            id="adminName"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            placeholder="Enter admin name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter admin email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
          />
        </div>
        <button type="submit" className="submit-btn-admin">
          Add Admin
        </button>
      </form>

      {/* ToastContainer for Toastify messages */}
      <ToastContainer />
    </div>
    </div>
  );
};

export default AddAdmin;
