import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MainNavbar from "../components/MainNavbar";
import TopBar from "../components/TopBar";
import { urlConfig } from "../configs/UrlConfig";
//import "./Auth.css"; // Optional: Your custom styling for the form

export default function SignupForm() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[gender, setGender] = useState("");
  const[contact, setContact] = useState("");
  const navigate = useNavigate();

  const URL = urlConfig.APP_URL;
  const PORT = urlConfig.APP_PORT;

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s]+$/; // Regex for first and last name (only letters and spaces)
    const contactRegex = /^[6789]\d{9}$/;

    // Check if all fields are filled out
    if (!fname || !lname || !email || !password || !confirmPassword || !role) {
      toast.error("All fields are required!", { position: "top-center" });
      return false;
    }

    // Validate First Name and Last Name (only letters and spaces)
    if (!nameRegex.test(fname)) {
      toast.error("First name can only contain letters and spaces.", { position: "top-center" });
      return false;
    }

    if (!nameRegex.test(lname)) {
      toast.error("Last name can only contain letters and spaces.", { position: "top-center" });
      return false;
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!", { position: "top-center" });
      return false;
    }

    // Validate contact format
    if (!contactRegex.test(contact)) {
      toast.error("Please enter a valid phone number!", { position: "top-center" });
      return false;
    }

    // Validate password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!", { position: "top-center" });
      return false;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (validateFields()) {
      const userData = {
        firstname: fname,
        lastname: lname,
        email: email,
        phoneNo: contact,
        password: password,
        userRole: role === "Customer" ? 1 : 0, // Convert role to integer (Customer: 0, Seller: 1)
      };

      console.log(userData);

      try {
        // Sending POST request using Axios
        const response = await axios.post(`${URL}:${PORT}/auth/signup`, userData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          navigate("/verifyemail", {state : userData.email});
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
    }
  };

  return (
    <div>
      {/* <TopBar />
      <MainNavbar/> */}
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Row className="w-100">
          <Col md={6} sm={12} className="mx-auto">
            <ToastContainer />
            <div className="form-container p-4 border shadow rounded">
              <h2 className="text-center mb-4">Sign Up User</h2>
              <Form onSubmit={handleSignup}>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Firstname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Lastname"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formBasicRole">
                  <Form.Label>Select Role</Form.Label>
                  <Form.Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select a role</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </Form.Select>
                </Form.Group> */}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicContact">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter your contact number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRole">
                  <Form.Label>Select Role</Form.Label>
                  <Form.Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select a role</option>
                    <option value="Customer">Customer</option>
                    <option value="Seller">Seller</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Sign Up
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
