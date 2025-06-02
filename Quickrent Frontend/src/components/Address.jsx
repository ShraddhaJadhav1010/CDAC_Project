import { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import MainNavbar from "./MainNavbar";
import Footer from "./Footer";

function Address() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState({
    fullAddress: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsEditing(false);
    alert("Address Updated Successfully!");
  };

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!address.fullAddress.trim())
      newErrors.fullAddress = "Full Address is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.state) newErrors.state = "Please select a state";
    if (!address.country) newErrors.country = "Please select a country";
    if (!address.pinCode.match(/^\d{6}$/))
      newErrors.pinCode = "PIN Code must be a 6-digit number";
    return newErrors;
  };

  const countries = ["India"];
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <div>
      {/* <MainNavbar /> */}
      <div className="main-container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="card-title mb-0">Address Details</h2>
                  {!isEditing ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      <FaEdit className="me-2" /> Edit Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      <FaTimes className="me-2" /> Cancel
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Address</label>
                    <textarea
                      className={`form-control ${
                        errors.fullAddress ? "is-invalid" : ""
                      }`}
                      name="fullAddress"
                      value={address.fullAddress}
                      onChange={handleChange}
                      placeholder="Enter your complete address"
                      rows="3"
                      disabled={!isEditing}
                    />
                    {errors.fullAddress && (
                      <div className="invalid-feedback">
                        {errors.fullAddress}
                      </div>
                    )}
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.city ? "is-invalid" : ""
                        }`}
                        name="city"
                        value={address.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        disabled={!isEditing}
                      />
                      {errors.city && (
                        <div className="invalid-feedback">{errors.city}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">State</label>
                      <select
                        className={`form-select ${
                          errors.state ? "is-invalid" : ""
                        }`}
                        name="state"
                        value={address.state}
                        onChange={handleChange}
                        disabled={!isEditing}
                      >
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <div className="invalid-feedback">{errors.state}</div>
                      )}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Country</label>
                      <select
                        className={`form-select ${
                          errors.country ? "is-invalid" : ""
                        }`}
                        name="country"
                        value={address.country}
                        onChange={handleChange}
                        disabled={!isEditing}
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <div className="invalid-feedback">{errors.country}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">PIN Code</label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.pinCode ? "is-invalid" : ""
                        }`}
                        name="pinCode"
                        value={address.pinCode}
                        onChange={handleChange}
                        placeholder="Enter PIN code"
                        disabled={!isEditing}
                      />
                      {errors.pinCode && (
                        <div className="invalid-feedback">{errors.pinCode}</div>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <button type="submit" className="btn btn-success w-100">
                      <FaSave className="me-2" /> Save Address
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Address;
