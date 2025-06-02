import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TopBar() {
  return (
    <div className="top-bar">
      <Container fluid="lg">
        <div className="d-flex justify-content-between align-items-center py-2">
          <div>
            <Link to="/login" className="text-white me-3">Login</Link>
            <span className="text-white">|</span>
            <Link to="/register" className="text-white mx-3">Register</Link>
            {/* <span className="text-white">|</span> */}
            {/* <Link to="/adminlogin" className="text-white ms-3">Admin</Link>
             <span className="text-white">|</span>
            <Link to="/conflicthandlingform" className="text-white ms-3">Conflict Handling</Link>  */}
          </div>
          <div className="text-white">123-456-7890</div>
        </div>
      </Container>
    </div>
  );
}

export default TopBar;