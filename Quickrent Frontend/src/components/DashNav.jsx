import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";

export function DashNav(){
    const navigate = useNavigate();

    function adminLogout(){
      alert("admin logged out successfully");
      localStorage.removeItem("JwtToken");
      navigate("/");
    }

    return (
        <Navbar bg="light" data-bs-theme="light" style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="me-5"><img 
              src="/QUICKRENT LOGOS/cv.png" 
              alt="Quick Rent" 
              height="50"
            /></Navbar.Brand>
          <Nav className="ms-auto align-items-center nav-links">
            {/* <Nav.Link as={Link} to="/admin/add-admin" style={{ fontSize: "1.4rem" }}>Add Admin</Nav.Link>
            <Nav.Link as={Link} to="/admin/add-category" style={{ fontSize: "1.4rem" }}>Add Category</Nav.Link> */}
            <Nav.Link onClick={adminLogout} style={{ fontSize: "1.4rem" }}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}