import React, { useState } from 'react';
import { Row, Col, Card, Badge, Button } from 'react-bootstrap';
import EditItemModal from './EditItemModal';
import DeleteConfirmation from './DeleteConfirmation';
import { useItems } from '../../context/ItemContext';
import { formatCurrency } from '../../utils/currency';

const ItemGrid = () => {
  const { items, updateItem, deleteItem } = useItems();
  const [showEditModal, setShowEditModal] = useState(false);
  //const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedItemForDelete, setSelectedItemForDelete] = useState(null);


  const handleEdit = (item) => {
    if (!item.productId) {
      console.error("Product ID is missing for the selected item.",item);
      return;
    }
    console.log("Editing item:", item);
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleSaveEdit = (editedItem) => {
    updateItem(editedItem);
    setShowEditModal(false);
  };

  const handleConfirmDelete = () => {
    deleteItem(selectedItem.productId);
    setShowDeleteModal(false);
  };

  return (
    <>
      <Row className="g-4">
        {items.map((item) => (
          <Col key={item.productId} xs={12} md={6} xl={4}>
            <Card className="h-100 shadow-sm hover-shadow transition-all">
              <Card.Img 
                variant="top" 
                src={item.image} 
                style={{ height: '250px', objectFit: 'contain' }}
              />
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <Card.Title className="h4 mb-0">{item.title}</Card.Title>
                  <Badge bg="primary" className="px-3 py-2 rounded-pill">
                    {formatCurrency(item.price)}
                  </Badge>
                </div>
                <Card.Text className="text-muted mb-2"><strong>Brand:</strong> {item.brandName}</Card.Text>
                <Card.Text className="text-muted mb-2"><strong>Model:</strong> {item.modelName}</Card.Text>
                <Card.Text className="text-muted mb-2"><strong>Category ID:</strong> {item.categoryId}</Card.Text>
                <Card.Text className="text-muted mb-2"><strong>Specifications:</strong> {item.specifications}</Card.Text>
                <Card.Text className="text-muted mb-2"><strong>Advance Payment:</strong> {formatCurrency(item.advancePayment)}</Card.Text>
                <Card.Text className="text-muted mb-4">{item.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(item)} style={{ width: "100px" }}>
                      Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item)} style={{ width: "100px" }} >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <EditItemModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        item={selectedItem}
        onSave={handleSaveEdit}
      />

      <DeleteConfirmation
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedItem?.title}
      />
    </>
  );
};

export default ItemGrid;