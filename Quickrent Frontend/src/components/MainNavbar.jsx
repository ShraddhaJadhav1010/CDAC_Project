import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Container, Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

function MainNavbar() {
  //const [url, setUrl] = useState();

  function handleLogOut() {
    localStorage.removeItem("JwtToken");
    //handleLogin(false);
    alert("User Logged Out Successfully");
    //navigate(0);
    window.location.href = "/";
  }

  function shouldRenderAccount() {
    if (!localStorage.getItem("JwtToken")) {
      return false;
    }
    const token = localStorage.getItem("JwtToken");
    const decodedToken = token ? jwtDecode(token) : null;
    const role = decodedToken?.role;
    if (role === "CUSTOMER") {
      return true;
    } else {
      return false;
    }
  }

  function shouldRenderSellerDashboard() {
    if (!localStorage.getItem("JwtToken")) {
      return false;
    }
    const token = localStorage.getItem("JwtToken");
    const decodedToken = token ? jwtDecode(token) : null;
    const role = decodedToken?.role;
    if (role === "SELLER") {
      return true;
    } else {
      return false;
    }
  }

  function shouldRenderAdminDashboard() {
    if (!localStorage.getItem("JwtToken")) {
      return false;
    }
    const token = localStorage.getItem("JwtToken");
    const decodedToken = token ? jwtDecode(token) : null;
    const role = decodedToken?.role;
    if (role === "ADMIN") {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="navbar-wrapper">
      <Navbar bg="white" expand="lg" className="py-3 shadow-sm">
        <Container fluid="lg">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src="/QUICKRENT LOGOS/cv.png" alt="Quick Rent" height="50" />
            <div className="ms-2"></div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center nav-links">
              {shouldRenderSellerDashboard() && (
                <Nav.Link
                  as={Link}
                  to="/seller"
                  className={location.pathname === "/dashboard" ? "active" : ""}
                >
                  Dashboard
                </Nav.Link>
              )}

              {shouldRenderAdminDashboard() && (
                <Nav.Link
                  as={Link}
                  to="/admin"
                  className={location.pathname === "/dashboard" ? "active" : ""}
                >
                  Dashboard
                </Nav.Link>
              )}
              <Nav.Link
                as={Link}
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/categories"
                className={location.pathname === "/categories" ? "active" : ""}
              >
                Categories
              </Nav.Link>
              {/* <Nav.Link 
                as={Link} 
                to="/about" 
                className={location.pathname === '/about' ? 'active' : ''}
              >
                About Us
              </Nav.Link> */}
              <Nav.Link
                as={Link}
                to="/contact"
                className={location.pathname === "/contact" ? "active" : ""}
              >
                Contact Us
              </Nav.Link>

              {shouldRenderAccount() && (
                <NavDropdown
                  title="Account"
                  id="basic-nav-dropdown"
                  className="account-nav-btn"
                >
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to="/userinfo">
                      Personal Information
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    {/* <Nav.Link as={Link} to="/useraddr">
                  Address
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item> */}
                    <Nav.Link as={Link} to="/userorders">
                      My Orders
                    </Nav.Link>
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item>
                    <Nav.Link as={Link} to="/" onClick={handleLogOut}>
                      Conflicts
                    </Nav.Link>
                  </NavDropdown.Item> */}
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to="/" onClick={handleLogOut}>
                      Logout
                    </Nav.Link>
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item>
                    <Nav.Link as={Link} to="/" onClick={handleLogOut}>
                      Delete Account
                    </Nav.Link>
                  </NavDropdown.Item> */}
                </NavDropdown>
              )}

              {/* <div className="search-box d-flex align-items-center">
                <input type="text" placeholder="Search" className="form-control" />
                <Button variant="link">
                  <BsSearch />
                </Button>
              </div>
              <Nav.Link as={Link} to="/cart">
                <FiShoppingBag size={24} />
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MainNavbar;
