import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopBar from "./TopBar";
import MainNavbar from "./MainNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Authform({ initialMode = "login" }) {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [role, setRole] = useState("Customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode]);

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password || (!isLogin && !confirmPassword)) {
      toast.error("All fields are required!", { position: "top-center" });
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!", {
        position: "top-center",
      });
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!", {
        position: "top-center",
      });
      return false;
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      if (isLogin) {
        // Call backend API to authenticate user using axios
        try {
          const response = await axios.post("http://localhost:5087/auth/login", {
            email,
            password,
            role,
          });

          if (response.status === 200) {
            const token = response.data; // Assuming token is returned as plain text or JSON
            toast.success("Login successful!", { position: "top-center" });
            //console.log("Token:", token);
            // Store the token in localStorage or state for further use
            localStorage.setItem("JwtToken", token);
            // Redirect based on the role
            const decodedToken = token ? jwtDecode(token) : null;
            let role = decodedToken?.role;
            if (role === "Seller") {
              navigate("/seller"); // Redirect to seller dashboard
            } else if (role === "Customer") {
              navigate("/"); // Redirect to customer dashboard
            }
          }

        } catch (error) {
          if (error.response && error.response.status === 401) {
            toast.error(error.response.data.message || "Invalid credentials!", {
              position: "top-center",
            });
          } else if (error.response && error.response.status === 500) {
            toast.error(error.response.data.error || "Something went wrong!", {
              position: "top-center",
            });
          } else {
            toast.error("Failed to connect to the server!", {
              position: "top-center",
            });
            console.error(error);
          }
        }
      } else {
        // Logic for Sign Up (if needed)
        toast.info("Sign-up functionality is not implemented yet.", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div>
      {/* <TopBar />
      <MainNavbar /> */}
      <div className="auth-container">
        <ToastContainer />
        <div className="form-container">
          <div className="form-toggle">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => {
                setIsLogin(true);
                resetForm();
              }}
            >
              Login
            </button>
            <button
              class="contactformbtn"
              className={!isLogin ? "active" : ""}
              onClick={() => {
                setIsLogin(false);
                resetForm();
              }}
            >
              Sign Up
            </button>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <h2>{isLogin ? "Login Form" : "Sign Up Form"}</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            {isLogin && (
              <div className="forgot-password">
                <a href="/forgot-password">Forgot Password?</a>
              </div>
            )}
            <button className="login-button" type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <div className="dropdown">
              <label htmlFor="role-select">Select Role:</label>
              <select
                id="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="0">Customer</option>
                <option value="1">Seller</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
