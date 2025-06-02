import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/Otp.css';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { urlConfig } from "../configs/UrlConfig";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  const URL = urlConfig.APP_URL;
  const PORT = urlConfig.APP_PORT;

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (/^[0-9]?$/.test(value)) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (event) => {
    const email = location.state;
    event.preventDefault();
    const otpValue = otp.join("");
    const data = {email: email, otp: otpValue};
    console.log(data);

    if (otpValue.length === 6) {
        try {
            // Sending POST request using Axios
            const response = await axios.post(`${URL}:${PORT}/auth/verify`, data, {
              headers: {
                "Content-Type": "application/json",
              },
            });
    
            if (response.status === 200) {
              navigate("/login");
              /*if (alert("User Registered Successfully !!")) {
                navigate("/login");
              }*/
              //toast.success("Registration successful!", { position: "top-center" });
              // Optional: Navigate to login or home page
              //navigate("/login");
            } else {
              toast.error("Registration failed. Please try again.", { position: "top-center" });
            }
          } catch (error) {
            toast.error("An error occurred. Please try again later.", { position: "top-center" });
            console.error("Error during registration:", error);
          }
    } else {
      setError("Please enter a valid 6-digit OTP.");
    }
  };

  const handleReset = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0].focus();
  };

  return (
    <div className="container otp-container">
      <h2 className="text-center">Email Verification</h2>
      <p className="text-center">Enter the 6-digit OTP sent to your email.</p>
      <form onSubmit={handleSubmit} className="otp-form">
        <div className="d-flex justify-content-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              className="otp-input form-control"
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength="1"
            />
          ))}
        </div>
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary me-2">
            Submit
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default Otp;