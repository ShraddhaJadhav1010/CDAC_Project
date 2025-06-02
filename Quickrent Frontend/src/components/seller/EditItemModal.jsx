import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

const EditItemModal = ({ show, onHide, item, onSave }) => {
  const [editedItem, setEditedItem] = useState({ ...item, imageFile: null });

  useEffect(() => {
    setEditedItem({ ...item, imageFile: null });
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setEditedItem(prev => ({ ...prev, imageFile: files[0] }));
    } else {
      setEditedItem(prev => ({
        ...prev,
        [name]: name === 'price' || name === 'advancePayment' ? Number(value) : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editedItem.productId) {
      console.error("Product ID is missing for the item being edited.");
      return;
    }
    onSave(editedItem);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={editedItem?.title || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Brand Name</Form.Label>
            <Form.Control
              type="text"
              name="brandName"
              value={editedItem?.brandName || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Model Name</Form.Label>
            <Form.Control
              type="text"
              name="modelName"
              value={editedItem?.modelName || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={editedItem?.description || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Specification</Form.Label>
            <Form.Control
              type="text"
              name="specifications"
              value={editedItem?.specifications || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={editedItem?.price || ''}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Advance Payment (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="advancePayment"
                  value={editedItem?.advancePayment || ''}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="categoryId"
              value={editedItem?.categoryId || ''}
              onChange={handleChange}
              required
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

          <Form.Group className="mb-3">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="number"
              name="userId"
              value={editedItem?.userId || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleChange}
            />
            {editedItem?.image && (
              <img
                src={editedItem.image}
                alt="Current"
                style={{ width: '100%', marginTop: '10px' }}
              />
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditItemModal;