import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { urlConfig } from "../configs/UrlConfig";
import { useNavigate } from "react-router-dom";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const URL = urlConfig.APP_URL;
  const PORT = urlConfig.APP_PORT;

  const validateFields = () => {
    if (!username && !password) {
      toast.error("All fields are required!", { position: "top-center" });
      return false;
    }

    if (!username) {
      toast.error("Username is required!", { position: "top-center" });
      return false;
    }

    if (!password) {
      toast.error("Password is required!", { position: "top-center" });
      return false;
    }

    // const usernameRegex = /^[a-zA-Z]+$/;
    // if (!usernameRegex.test(username)) {
    //   toast.error("Username must contain only letters!", {
    //     position: "top-center",
    //   });
    //   return false;
    // }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 6 characters and include letters, numbers, and special characters!", {
        position: "top-center",
      });
      return false;
    }

    return true;
  };

  async function handleSubmit() {
    e.preventDefault();
    const credentials = {
      email : username,
      password: password
    }

    console.log(credentials);
    const response = await axios.post(`${URL}:${PORT}/auth/admin`, credentials);
    const token = await response.data;
    console.log(token);
    toast.success("Admin Logged successfully", { position: "top-center" });
    
    if (validateFields()) {

      //localStorage.setItem("JwtToken", token);

      if(response.status == 200)
      {

        //navigate("/admin");
      }
      else
      {
        toast.success("Invalid Credentials", { position: "top-center" });
      }
    }
  };

  return (
    <div>
        {/* <TopBar />
        <MainNavbar /> */}
    <div className="admin-login-container">
      <ToastContainer />
      <div className="form-container">
        <h2>Admin Login</h2>
        <form className="admin-form">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="ad-login-btn" onClick={()=>{handleSubmit()}}>Login</button>
        </form>
      </div>
    </div>
    </div>
  );
}