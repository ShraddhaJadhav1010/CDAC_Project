import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, Link, useLocation } from "react-router-dom";

const SellerLayout = () => {
  const location = useLocation();

  function handleLogOut(){
    localStorage.removeItem("JwtToken");
    alert("Seller Logged Out Successfully");
  }

  return (
    <div className="min-vh-100 bg-light">
      <Navbar
        bg="light"
        expand="lg"
        className="mb-4 py-3 shadow-sm"
        fixed="top"
      >
        <Container fluid className="px-lg-5 d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="fs-4 text-start">
            <img 
              src="/QUICKRENT LOGOS/cv.png" 
              alt="Quick Rent" 
              height="50"
            />
          </Navbar.Brand>

          {/* Navigation Links */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/seller"
                active={location.pathname === "/seller"}
                className="px-3"
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/seller/add-item"
                active={location.pathname === "/seller/add-item"}
                className="px-3"
              >
                Add Item
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/seller/profile"
                active={location.pathname === "/seller/profile"}
                className="px-3"
              >
                Profile
              </Nav.Link>
              {/* <Nav.Link
                as={Link}
                to="/seller/add-document-form"
                active={location.pathname === "/seller/add-document-form"}
                className="px-3"
              >
                Documents
              </Nav.Link> */}
              <Nav.Link
                as={Link}
                to="/"
                onClick={handleLogOut}
                className="px-3"
              >
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ paddingTop: "76px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default SellerLayout;
