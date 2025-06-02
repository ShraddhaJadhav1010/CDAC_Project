import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MainNavbar from "../components/MainNavbar";
import TopBar from "../components/TopBar";
import { urlConfig } from "../configs/UrlConfig";
//import "./Auth.css"; // Optional, your custom styling can still be applied.

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const URL = urlConfig.APP_URL;
  const PORT = urlConfig.APP_PORT;

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      toast.error("All fields are required!", { position: "top-center" });
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!", { position: "top-center" });
      return false;
    }

    // if (password.length < 6) {
    //   toast.error("Password must be at least 6 characters long!", { position: "top-center" });
    //   return false;
    // }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      console.log(email, password);
      try {
        const response = await axios.post(`${URL}:${PORT}/auth/login`, {
          email,
          password,
        });

        if (response.status === 200) {
          const token = response.data;
          toast.success("Login successful!", { position: "top-center" });
          localStorage.setItem("JwtToken", token);

          const decodedToken = token ? jwtDecode(token) : null;
          const userRole = decodedToken?.role;

          if (userRole === "SELLER") {
            //handleLogin(true);
            //navigate("/seller");
            window.location.href = "/seller";
          } else if (userRole === "CUSTOMER") {
            //handleLogin(true);
            //navigate("/");
            window.location.href = "/";
          }else if (userRole === "ADMIN"){
            window.location.href = "/admin";
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error(error.response.data.message || "Invalid credentials!", { position: "top-center" });
        } else if (error.response && error.response.status === 500) {
          toast.error(error.response.data.error || "Something went wrong!", { position: "top-center" });
        } else {
          toast.error("Invalid Credentials!", { position: "top-center" });
          console.error(error);
        }
      }
    }
  };

  return (
    <div>
      {/* <TopBar />
      <MainNavbar /> */}
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Row className="w-100">
          <Col md={6} sm={12} className="mx-auto">
            <ToastContainer />
            <div className="form-container p-4 border shadow rounded">
              <h2 className="text-center mb-4">Login User</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-between mb-3">
                  <a href="/login">Forgot Password?</a>
                </div>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
