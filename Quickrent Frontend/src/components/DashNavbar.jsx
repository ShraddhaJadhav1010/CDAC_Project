import { Link, useLocation } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container } from 'react-bootstrap';
import { FaUser, FaMapMarkerAlt, FaShoppingBag } from 'react-icons/fa';

function DashNavbar() {
  const location = useLocation();

  return (
    <BsNavbar expand="lg" className="nav-custom sticky-top">
      <Container fluid="lg">
        <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaUser className="me-2" />
          <span className="fw-bold">QuickRent</span>
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={location.pathname === '/accounts' ? 'active' : ''}
            >
              <FaUser className="me-2" />
              Customer Personal Info
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/seller"
              className={location.pathname === '/' ? 'active' : ''}
            >
              <FaUser className="me-2" />
              Seller Personal Info
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/address"
              className={location.pathname === '/address' ? 'active' : ''}
            >
              <FaMapMarkerAlt className="me-2" />
              Address
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/orders"
              className={location.pathname === '/orders' ? 'active' : ''}
            >
              <FaShoppingBag className="me-2" />
              My Orders
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default DashNavbar;