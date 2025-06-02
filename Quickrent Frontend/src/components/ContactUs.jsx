import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLocationArrow, FaPhoneAlt, FaEnvelope } from "react-icons/fa"; 
import "../styles/ContactUs.css"
import TopBar from "./TopBar";
import MainNavbar from "./MainNavbar";
import axios from "axios";
import { urlConfig } from "../configs/UrlConfig";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const URL = urlConfig.APP_URL;
  const PORT = urlConfig.APP_PORT;

  // Validation function
  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const messageRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!name || !email || !description) {
      toast.error("All fields are required!", { position: "top-center" });
      return false;
    }

    if (!nameRegex.test(name)) {
      toast.error("Please enter a valid name!", {
        position: "top-center",
      });
      return false;
    }

    if (!messageRegex.test(description)) {
      toast.error("Please enter a valid message!", {
        position: "top-center",
      });
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!", {
        position: "top-center",
      });
      return false;
    }

    /*
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number!", {
        position: "top-center",
      });
      return false;
    }
    */
    return true;
  };

  async function addQuery(){
    const response = await axios.post(`${URL}:${PORT}/api/query/add`, {
      name: name,
      email: email,
      description: description
    });
    if(response.status == 200){
      toast.success("Message sent successfully!", { position: "top-center" });
    }
    else{
      toast.success("Something went wrong, please try again", { position: "top-center" });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      //toast.success("Message sent successfully!", { position: "top-center" });
      // Handle successful form submission
      addQuery();
    }
  };

  return (
    <div>
        {/* <TopBar />
        <MainNavbar /> */}
    <div className="contact-us-container">
      {/* Left Section - Contact Info */}
      <div className="contact-info">
        <h3 className="title">Let's Get in Touch</h3>
        <p className="text">
          <b id="sub-text">
            We'd love to hear from you! Please fill out the form or contact us
            using the information below.
          </b>
        </p>

        <div className="info">
          <div className="information">
            <FaLocationArrow className="icon" />
            <p>Raintree Marg, near Bharati Vidyapeeth, Sector 7, CBD Belapur, Navi Mumbai, Maharashtra 400614</p>
          </div>
          <div className="information">
            <FaEnvelope className="icon" />
            <p>Quickrent@gmail.com</p>
          </div>
          <div className="information">
            <FaPhoneAlt className="icon" />
            <p>123-456-7890</p>
          </div>
        </div>
      </div>

      {/* Right Section - Contact Form */}
      <div className="contact-form">
        <form onSubmit={handleSubmit} autoComplete="off">
          <h3 className="form-title">Contact Us</h3>

          <div className="input-container">
            <input
              type="text"
              name="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="input-container">
            <input
              type="email"
              name="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* <div className="input-container">
            <input
              type="tel"
              name="phone"
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div> */}
          
          <div className="input-container">
            <textarea
              name="description"
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your message"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
    </div>
  );
};

export default ContactUs;
