import { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { FaEdit, FaSave, FaTimes, FaUser } from 'react-icons/fa';
import MainNavbar from './MainNavbar';
import Footer from './Footer';

function Seller() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    mobile: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate form data
    const errors = validateForm(); // Call the validation function
    if (Object.keys(errors).length > 0) {
      setErrors(errors); // Set validation errors
      return; // Stop submission if errors exist
    }
  
    setErrors({}); // Clear errors if validation passes
    setIsEditing(false); // Exit edit mode
    alert('Profile Updated Successfully!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Update the field value
    setFormData({
      ...formData,
      [name]: value
    });
  
    // Clear the error for the current field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '' // Clear the error for the field being updated
    }));
  };
  

  const validateForm = () => {
    const errors = {};
  
    // First Name
    if (!formData.firstName.trim()) {
      errors.firstName = 'First Name is required';
    } else if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
      errors.firstName = 'First Name must only contain letters';
    }
  
    // Last Name
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    } else if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
      errors.lastName = 'Last Name must only contain letters';
    }
  
    // Gender
    if (!formData.gender) {
      errors.gender = 'Gender is required';
    }
  
    // Mobile
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile Number is required';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.mobile)) {
      errors.mobile = 'Enter a valid mobile number(10-15 digits)';
    }
  
    // Email
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Enter a valid email address';
    }
  
    // Password
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'Password must include at least one uppercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      errors.password = 'Password must include at least one number';
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      errors.password = 'Password must include at least one special character';
    }
  
    return errors;
  };
  

  return (
    <div>
                {/* <MainNavbar /> */}

      <div className="profile-header mb-4">
        <h1 className="mb-0">
          <FaUser className="me-2" />
          Seller Personal Information
        </h1>
      </div>

      <Card>
        <Card.Body>
          <div className="d-flex justify-content-end mb-4">
            {!isEditing ? (
              <Button
                variant="primary"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit className="me-2" />
                Edit Profile
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
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
                    className={errors.firstName ? 'is-invalid' : ''}
                  />
                  {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
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
                    className={errors.lastName ? 'is-invalid' : ''}
                  />
                  {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
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
                    className={errors.gender ? 'is-invalid' : ''}
                  >
                    <option value="">Select Gender</option> {/* Placeholder option */}
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                  {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
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
                    className={errors.mobile ? 'is-invalid' : ''}
                  />
                  {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
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
                    className={errors.email ? 'is-invalid' : ''}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    disabled={!isEditing}
                    className={errors.password ? 'is-invalid' : ''}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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
      {/* <Footer /> */}
    </div>
  );
}

export default Seller;