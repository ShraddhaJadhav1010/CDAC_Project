import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { urlConfig } from "../../configs/UrlConfig";
import { jwtDecode } from "jwt-decode";

const AddItem = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [item, setItem] = useState({
    title: "",
    brandName: "",
    modelName: "",
    description: "",
    specifications: "",
    price: "",
    advancePayment: "",
    categoryId: "",
    userId: "",
    imageFile: null,
    image: "xyz",
  });

  const URL = urlConfig.APP_URL;
  const PORT = urlConfig.APP_PORT;

  useState(()=>{
    var id = null;
    const token = localStorage.getItem("JwtToken");
    const decodedToken = token ? jwtDecode(token) : null;
    id = decodedToken?.Id;
    setItem((prevItem) => ({
      ...prevItem, // Preserve previous state values
      userId: id, // Set userId while keeping other fields unchanged
    }));
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(item).forEach(([key, value]) => {
      if (key === "price" || key === "advancePayment") {
        formData.append(capitalizeFirstLetter(key), parseFloat(value));
      } else {
        formData.append(capitalizeFirstLetter(key), value);
      }
    });

    console.log("Submitting form data:", formData);
    console.log(item);

    try {
      const response = await axios.post(`${URL}:${PORT}/api/product/add`, item, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Success:", response.data);
      setShowSuccess(true);
      setTimeout(() => navigate("/seller"), 1500);
    } catch (error) {
      console.error("Error submitting item:", error.response?.data || error.message);
      if (error.response?.data?.errors) {
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join("\n");
        alert(`Validation Errors:\n${errorMessages}`);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setItem((prev) => ({ ...prev, imageFile: e.target.files[0] }));
    } else {
      setItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Container fluid className="py-4 px-lg-5">
      {showSuccess && (
        <Alert variant="success" className="mb-3">
          Item added successfully! Redirecting to dashboard...
        </Alert>
      )}
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-3">
              <h2 className="h4 mb-3 text-center">Add New Item</h2>
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                {[{ label: "Title", name: "title" }, { label: "Brand Name", name: "brandName" }, { label: "Model Name", name: "modelName" }, { label: "Description", name: "description", as: "textarea", rows: 3 }, { label: "Specification", name: "specifications" }].map(({ label, name, as, rows }) => (
                  <Form.Group key={name} className="mb-3">
                    <Form.Label className="fw-bold small">{label}</Form.Label>
                    <Form.Control
                      type={as ? undefined : "text"}
                      as={as}
                      rows={rows}
                      name={name}
                      value={item[name]}
                      onChange={handleChange}
                      required
                      size="sm"
                      className="shadow-sm"
                    />
                  </Form.Group>
                ))}

                <Row className="mb-3">
                  {[{ label: "Price (₹)", name: "price" }, { label: "Advance Payment", name: "advancePayment" }].map(({ label, name }) => (
                    <Col md={6} key={name}>
                      <Form.Group>
                        <Form.Label className="fw-bold small">{label}</Form.Label>
                        <Form.Control
                          type="number"
                          name={name}
                          value={item[name]}
                          onChange={handleChange}
                          required
                          min="0"
                          step="0.01"
                          size="sm"
                          className="shadow-sm"
                        />
                      </Form.Group>
                    </Col>
                  ))}
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">Category</Form.Label>
                  <Form.Select
                    name="categoryId"
                    value={item.categoryId}
                    onChange={handleChange}
                    required
                    size="sm"
                    className="shadow-sm"
                  >
                    <option value="">Select Category</option>
                    <option value="1">Electronics</option>
                    <option value="2">Appliances</option>
                    <option value="3">Furnitures</option>
                    <option value="4">H/W Tools</option>
                    <option value="5">Events/Decors</option>
                    <option value="6">Sports/Gears</option>
                  </Form.Select>
                </Form.Group>

                {/* <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">User ID</Form.Label>
                  <Form.Control
                    type="number"
                    name="userId"
                    value={item.userId}
                    onChange={handleChange}
                    required
                    size="sm"
                    className="shadow-sm"
                  />
                </Form.Group> */}

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="imageFile"
                    accept="image/*"
                    onChange={handleChange}
                    required
                    size="sm"
                    className="shadow-sm"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="sm" className="py-2 fw-bold">
                    Add Item
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddItem;
