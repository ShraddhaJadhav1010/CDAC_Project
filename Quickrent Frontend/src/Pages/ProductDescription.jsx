import React, { useEffect, useState } from "react";
import { Container, Card, CardBody, Row, Col, Carousel, Button } from "react-bootstrap";
import { useLocation, Link } from 'react-router-dom';
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { urlConfig } from "../configs/UrlConfig";

const ProductDescription = () => {
  const location = useLocation();
  const productId = location.state;

  const [product, setProduct] = useState();
  const [visibleButton, setVisibleButton] = useState();

  const URL = urlConfig.APP_URL;
  const PORT = urlConfig.APP_PORT;

  async function fetchData(){
    //console.log(productId);
    const response = await axios.get(`${URL}:${PORT}/api/product/${productId}`);
    //console.log("response data", response.data);
    let productData = await response.data;
    productData = {...productData, image: `${URL}:${PORT}/${productData.image}`};
    console.log("product data: ", productData);
    setProduct(productData);
    //console.log("Product:", product);
  }

  useEffect(()=>{
    fetchData();
    var role = null;
    const token = localStorage.getItem("JwtToken");
    const decodedToken = token ? jwtDecode(token) : null;
    role = decodedToken?.role;
    console.log(role);
    if(role === undefined || role==="SELLER" || role==="ADMIN"){
      setVisibleButton(false);
    }else{
      setVisibleButton(true);
    }
  }, 
  []);

  if (!product) {
    return <div>Product details are not available.</div>;
  }
  
  return (
    <>
    {/* <MainNavbar /> */}
    <Container fluid className="mt-4 mb-4" >
      <Card className="shadow-lg border-1">
        <CardBody>
          <Row className="align-items-center p-4">
            {/* Carousel for Images */}
            <Col lg={6} className="mb-4 mb-lg-0">
              <Carousel interval={null} data-bs-theme="dark" className="mb-3">
                <Carousel.Item>
                  <img
                    className="d-block w-100 rounded shadow-sm"
                    src={product.image}
                    alt={"product image"}
                    style={{ height: "700px", objectFit: "fill" }}
                  />
                </Carousel.Item>
              </Carousel>
            </Col>

            {/* Product Information */}
            <Col lg={6}>
              <h3 className="mb-3 text-primary">{product.title}</h3>
              <p className="text-muted mb-1">{product.brandName}</p>
              <p className="text-muted">{product.modelName}</p>
              
              <h3 className="mt-4 text-secondary">Rent per Day:</h3>
              <p className="text-dark">₹{product.price}</p>

              <h3 className="mt-4 text-secondary">Deposite:</h3>
              <p className="text-dark">₹{product.advancePayment}</p>

              <h5 className="mt-4 text-secondary">Product Description:</h5>
              <p className="text-dark">{product.description}</p>

              <h5 className="mt-4 text-secondary">Product Specifications:</h5>
              <p className="text-dark">{product.specifications}</p>
              {/* <ul>
                {product.specifications.map((spec, index) => (
                  <li key={index} className="text-dark">
                    {spec}
                  </li>
                ))}
              </ul> */}

              <h5 className="mt-4 text-secondary">Renter Information:</h5>
              <p className="text-dark">
                <strong>{product.sellerName}</strong>
              </p>

              {visibleButton &&
              <div className="text-center mt-3 float-left">
                <Link to="/checkout" state= {product}>
                  <Button
                    color="primary"
                    className="px-4 py-2"
                    style={{
                      backgroundColor: "#007bff",
                      width:"100%",
                      border: "none",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Rent Now
                  </Button>
                </Link>
              </div>}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
    {/* <Footer /> */}
    </>
  );
};

export default ProductDescription;