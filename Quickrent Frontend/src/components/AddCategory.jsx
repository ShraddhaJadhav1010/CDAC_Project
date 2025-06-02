import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AddCategory.css";
import { DashNav } from "./DashNav";

const AddCategory = () => {
  const [activeTab, setActiveTab] = useState("main");
  const [mainCategory, setMainCategory] = useState("");
  const [mainDescription, setMainDescription] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subMainCategory, setSubMainCategory] = useState("");
  const [subDescription, setSubDescription] = useState("");

  const nameRegex = /^[A-Za-z\s]+$/;
  const descriptionRegex = /^[A-Za-z\s]*$/;

  const handleMainCategorySubmit = () => {
    if (!mainCategory || !mainDescription) {
      toast.error("All fields are required for Main Category!");
      return;
    }
    if (!nameRegex.test(mainCategory)) {
      toast.error("Invalid category name. Only letters are allowed.");
      return;
    }
    if (!descriptionRegex.test(mainDescription)) {
      toast.error("Invalid description. Only letters and spaces are allowed.");
      return;
    }
    toast.success("Main Category added successfully!");
    setTimeout(() => {
      setMainCategory("");
      setMainDescription("");
    }, 1000);
  };

  const handleSubCategorySubmit = () => {
    if (!subCategory || !subMainCategory || !subDescription) {
      toast.error("All fields are required for Subcategory!");
      return;
    }
    if (!nameRegex.test(subCategory)) {
      toast.error("Invalid subcategory name. Only letters are allowed.");
      return;
    }
    if (!nameRegex.test(subMainCategory)) {
      toast.error("Invalid main category name. Only letters are allowed.");
      return;
    }
    if (!descriptionRegex.test(subDescription)) {
      toast.error("Invalid description. Only letters and spaces are allowed.");
      return;
    }
    toast.success("Subcategory added successfully!");
    setTimeout(() => {
      setSubCategory("");
      setSubMainCategory("");
      setSubDescription("");
    }, 1000);
  };

  return (
    <div>
    {/* <DashNav /> */}
    <div className="add-category-container">
      <h2 className="heading">Add New Categories</h2>

      <div className="toggle-container">
        <button
          className={`toggle-button ${activeTab === "main" ? "active" : ""}`}
          onClick={() => setActiveTab("main")}
        >
          Add Main Category
        </button>
        <button
          className={`toggle-button ${activeTab === "sub" ? "active" : ""}`}
          onClick={() => setActiveTab("sub")}
        >
          Add Subcategory
        </button>
      </div>

      {/* Main Category Form */}
      {activeTab === "main" && (
        <div className="form-container">
          <div className="form-group">
            <label>Category Name:</label>
            <input
              type="text"
              placeholder="Enter main category name"
              value={mainCategory}
              onChange={(e) => setMainCategory(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              placeholder="Enter description"
              value={mainDescription}
              onChange={(e) => setMainDescription(e.target.value)}
            ></textarea>
          </div>
          <button className="submit-button" onClick={handleMainCategorySubmit}>
            Add Main Category
          </button>
        </div>
      )}

      {/* Subcategory Form */}
      {activeTab === "sub" && (
        <div className="form-container">
          <div className="form-group">
            <label>Main Category Name:</label>
            <input
              type="text"
              placeholder="Enter main category name"
              value={subMainCategory}
              onChange={(e) => setSubMainCategory(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Subcategory Name:</label>
            <input
              type="text"
              placeholder="Enter subcategory name"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              placeholder="Enter description"
              value={subDescription}
              onChange={(e) => setSubDescription(e.target.value)}
            ></textarea>
          </div>
          <button className="submit-button" onClick={handleSubCategorySubmit}>
            Add Subcategory
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
    </div>
  );
};

export default AddCategory;
