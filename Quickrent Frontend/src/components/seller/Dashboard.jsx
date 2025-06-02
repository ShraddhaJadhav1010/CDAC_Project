import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DashboardSummary from './DashboardSummary';
import ItemGrid from './ItemGrid';

const Dashboard = () => {
  return (
    <Container fluid className="p-4 px-lg-5">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="mb-0 display-6">Seller Dashboard</h2>
        </Col>
        {/* <Col xs="auto">
          <Button 
            as={Link} 
            to="/seller/add-item" 
            variant="primary"
            size="lg"
            className="px-4"
          >
            + Add New Item
          </Button>
        </Col> */}
      </Row>
      
      {/* <DashboardSummary /> */}
      
      <Row className="mb-4 align-items-center">
        <Col>
          <h3 className="border-bottom pb-2">My Listed Items</h3>
        </Col>
      </Row>
      
      <ItemGrid />
    </Container>
  );
};

export default Dashboard;