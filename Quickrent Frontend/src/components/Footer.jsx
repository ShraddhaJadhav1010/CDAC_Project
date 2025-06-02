import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="footer">
      <Container fluid="lg">
        <Row>
          {/* Logo and Description */}
          <Col md={4} className="footer-section">
            <div className="footer-logo">
              <img src="../public/QUICKRENT LOGOS/wh.png" alt="Quick Rent" width="100" height="100" />
            </div>
            <p className="footer-description">
              Experience the fastest and most convenient way to rent items. 
              Available anytime, anywhere.
            </p>
          </Col>

          {/* Categories */}
          <Col md={4} className="footer-section">
            <h3 className="footer-heading">Categories</h3>
            <ul className="footer-links">
              <li><a href="/category/electronics">Electronics</a></li>
              <li><a href="/category/furniture">Furniture</a></li>
              <li><a href="/category/tools">Tools</a></li>
              <li><a href="/category/sports">Sports Equipment</a></li>
              <li><a href="/categories">View All Categories</a></li>
            </ul>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </Col>
        </Row>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Quick Rent. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;