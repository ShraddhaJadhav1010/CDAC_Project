import React from 'react';
import { Container, Table, Image } from 'react-bootstrap';
import { useItems } from '../../context/ItemContext';
import { formatCurrency } from '../../utils/currency';

const ItemList = () => {
  const { items } = useItems();

  const imageStyle = {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">My Listed Items</h2>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Title</th>
            <th>Brand Name</th>
            <th>Model Name</th>
            <th>Description</th>
            <th>Category ID</th>
            <th>Specifications</th>
            <th>Price</th>
            <th>Advance Payment</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.productId}>
              <td>
              <Image src={`http://localhost:5087/${item.image}`} alt={item.title} style={imageStyle} rounded />
              </td>
              <td>{item.title}</td>
              <td>{item.brandName}</td>
              <td>{item.modelName}</td>
              <td>{item.description}</td>
              <td>{item.categoryId}</td>
              <td>{item.specifications}</td>
              <td>{formatCurrency(item.price)}</td>
              <td>{formatCurrency(item.advancePayment)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ItemList;
