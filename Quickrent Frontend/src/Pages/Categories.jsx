import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BsHeart, BsCart3 } from 'react-icons/bs';
import TopBar from '../components/TopBar';
import MainNavbar from '../components/MainNavbar';
import Footer from '../components/Footer';
import '../styles/Categories.css';
import products from '../components/ProductsData';
import { Link } from 'react-router-dom';
import { Products } from '../components/Products';

function Categories() {
  const [activeCategory, setActiveCategory] = useState('Electronics');
  const [index, setIndex] = useState(0);
  
  const categories = ['Electronics', 'Appliances', 'Furnitures', 'H/W Tools', 'Events/Decors', 'Sports/Gears'];
  const category_ids= [1,2,3,4,5,6];

  return (
    <div className="app">
      {/* <TopBar />
      <MainNavbar /> */}
      
      <div className="categories-banner">
        <h1>CATEGORIES</h1>
      </div>

      <div className="categories-page">
        <Container fluid="lg">
          {/* Category buttons */}
          <div className="category-buttons">
            {categories.map((category, index1) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'primary' : 'outline-primary'}
                className="category-button"
                onClick={() => {setActiveCategory(category); setIndex(index1)}}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <Row className="g-4 mt-3">
            <Products categoryId={category_ids[index]} />
          </Row>
        </Container>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default Categories;
