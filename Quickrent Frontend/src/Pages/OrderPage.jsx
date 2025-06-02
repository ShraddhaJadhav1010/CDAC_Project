import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Image, Badge } from 'react-bootstrap';
import MainNavbar from '../components/MainNavbar';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { urlConfig } from '../configs/UrlConfig';

const OrderPage = ({
}) => {
  const [order, setOrder] = useState();
  const location = useLocation();
  const orderId = location.state;

  const URL = urlConfig.APP_URL;
  const PORT = urlConfig.APP_PORT;

  const fetchData = async () =>{
    try {
      console.log(orderId);
      const response = await axios.get(`${URL}:${PORT}/api/order/getorder/${orderId.orderId}`);
      setOrder(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(()=>{
    fetchData();
  }
  ,[])

  if(!order){
    return(
      <div>
        <MainNavbar />
        No Data
        <Footer />
      </div>
    )
  }

  return (
    <>
    {/* <MainNavbar /> */}
    <Container fluid className="mt-5 mb-5">
      <Card className="shadow border-0">
        <Card.Body>
          {/* Header Section */}
          <Row className="text-center mb-4">
            <Col>
              <div className="d-flex align-items-center justify-content-center">
                <span
                  className="text-success"
                  style={{ fontSize: '2rem', marginRight: '10px' }}
                >
                  ✔
                </span>
                <h2 className="text-primary fw-bold">Congratulations!</h2>
              </div>
              <p className="text-muted fs-5">Your Order Has Been Placed Successfully</p>
            </Col>
          </Row>

          {/* Product and Order Details */}
          <Row className="align-items-center mb-4" >
            <Col md={4} className="text-center">
              <Image src={`http://localhost:8080/${order.productImage}`} alt="Product" fluid className="rounded shadow-sm" />
            </Col>
            <Col md={4}>
              <h5 className="fw-bold text-dark">{order.productTitle}</h5>
              <p className="mb-1">
                <Badge bg="info" className="me-1">
                  Brand
                </Badge>
                {order.productBrand}
              </p>
              <p className="mb-1">
                <Badge bg="secondary" className="me-1">
                  Model
                </Badge>
                {"High Class"}
              </p>
              <p className="text-muted">
                <span className="fw-bold">Sold by:</span> {order.productSellerName}
              </p>
            </Col>
            <Col md={4} className="text-muted">
              <h5 className="fw-bold">Order Details</h5>
              <p>
                <span className="fw-bold">Order Number:</span> {"ORD502575" + order.orderId}
              </p>
              <p>
                <span className="fw-bold">Placed On:</span> {"2024-12-09"}
              </p>
              <p>
                <span className="fw-bold">Duration:</span>{' '}
                {order.startDate} - {order.endDate}
              </p>
            </Col>
          </Row>
          <hr />

          {/* Renter and Address Details */}
          <Row className="align-items-center mt-4 mx-5" style={{textAlign:'center'}}>
            <Col md={4} className="text-muted mb-3">
              <h6 className="fw-bold">Rented By:</h6>
              <p className="mb-1">{order.customerName}</p>
              <p className="mb-1">{"reddysumant25@gmail.com"}</p>
              <p>{"9970222965"}</p>
            </Col>
            <Col md={4} className="text-muted mb-3">
              <h6 className="fw-bold">Address:</h6>
              <p>{order.address + " " + order.city + " " + order.state + " " + order.country + " " + order.pincode}</p>
            </Col>
            <Col md={4} className="text-muted">
              <h6 className="fw-bold">Rented By Seller:</h6>
              <p>{order.productSellerName}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
    {/* <Footer /> */}
    </>
  );
};

export default OrderPage;