import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaCalendarAlt, FaStore } from "react-icons/fa";
import MainNavbar from "./MainNavbar";
import Footer from "./Footer";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { urlConfig } from "../configs/UrlConfig";

function Orders() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]); // State to store fetched orders
  const [loading, setLoading] = useState(true); // State to handle loading

  const URL = urlConfig.APP_URL;
  const PORT = urlConfig.APP_PORT;

  // Fetch orders from backend API
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("JwtToken");
      const decodedToken = token ? jwtDecode(token) : null;
      const Id = decodedToken?.Id;
      try {
        const response = await axios.get(
          `${URL}:${PORT}/api/order/user/${Id}`
        ); // Update API URL
        setOrders(response.data); // Store the response data in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on search input
  const filteredOrders = orders.filter(
    (order) =>
      order.productName.toLowerCase().includes(search.toLowerCase()) ||
      order.seller.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* <MainNavbar /> */}
      <div className="profile-header mb-4">
        <h1 className="mb-0">
          <FaStore className="me-2" />
          My Orders
        </h1>
      </div>

      {/* <input
        type="text"
        placeholder="Search orders..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control mb-4"
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "10px",
          fontSize: "16px",
        }}
      /> */}

      {loading ? (
        <p>Loading orders...</p> // Show a loading message while data is fetched
      ) : (
        <Row style={{ margin: "0", justifyContent: "center" }}>
          {filteredOrders.map((order) => (
            <Col
              key={order.id}
              xs={12}
              md={3}
              className="mb-4"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                className="order-card"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <Row className="g-0">
                  <Col xs={12} sm={4}>
                    <img
                      src={`${URL}:${PORT}/${order.image}`}
                      className="order-image"
                      alt={order.productName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </Col>
                  <Col xs={12} sm={8}>
                    <Card.Body style={{ padding: "20px" }}>
                      <Card.Title className="h5 mb-3" style={{ fontWeight: "bold" }}>
                        {order.productName}
                      </Card.Title>
                      <Card.Text className="text-muted mb-3" style={{ fontSize: "14px" }}>
                        {order.description}
                      </Card.Text>
                      <div className="mt-auto">
                        <p className="mb-2" style={{ fontSize: "14px" }}>
                          <FaCalendarAlt className="me-2 text-primary" />
                          <small>Start: {order.startDate}</small>
                        </p>
                        <p className="mb-2" style={{ fontSize: "14px" }}>
                          <FaCalendarAlt className="me-2 text-danger" />
                          <small>Return: {order.endDate}</small>
                        </p>
                        <p className="mb-0" style={{ fontSize: "14px" }}>
                          <FaStore className="me-2 text-success" />
                          <small>{order.userName}</small>
                        </p>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* <Footer
        style={{
          marginTop: "60px",
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#343a40",
          color: "white",
        }}
      /> */}
    </div>
  );
}

export default Orders;
