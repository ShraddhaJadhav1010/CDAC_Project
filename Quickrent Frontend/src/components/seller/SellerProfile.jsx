import { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { FaEdit, FaSave, FaTimes, FaUser } from "react-icons/fa";


function sellerprofile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Shradha",
    lastName: "Jadhav",
    gender: "female",
    email: "Shraddha@gmail.com",
    mobile: "+919123456789",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile Updated Successfully!");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="profile-header mb-4">
        <h1 className="mb-0">
          <FaUser className="me-2" />
          Personal Information
        </h1>
      </div>

      <Card>
        <Card.Body>
          <div className="d-flex justify-content-end mb-4">
            {!isEditing ? (
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                <FaEdit className="me-2" />
                Edit Profile
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                <FaTimes className="me-2" />
                Cancel
              </Button>
            )}
          </div>

          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>

              {isEditing && (
                <Col md={12} className="mt-4">
                  <Button type="submit" variant="success" className="w-100">
                    <FaSave className="me-2" />
                    Save Changes
                  </Button>
                </Col>
              )}
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default sellerprofile;
