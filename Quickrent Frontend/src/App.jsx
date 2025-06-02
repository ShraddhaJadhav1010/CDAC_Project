import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import TopBar from './components/TopBar';
import MainNavbar from './components/MainNavbar';
import Footer from './components/Footer';
import { Link, useNavigate } from "react-router-dom";
import './App.css';

function App() {
  const navigate = useNavigate();
  
  const anotherPage = () => navigate("/Categories");

  const categories = [
    { title: 'Electronics', image: '../public/images/electronics.jpg' },
    { title: 'Appliances', image: '../public/images/appliances.jpg' },
    { title: 'Furniture', image: '../public/images/furniture.jpg' },
    { title: 'Tools', image: '../public/images/tools.jpg' },
    { title: 'Events & Decors', image: '../public/images/tools.jpg' },
    { title: 'Sports & Gears', image: '../public/images/sports.jpg' }
  ];

  return (
    <div className="app">
      {/* <TopBar />
      <MainNavbar /> */}

      {/* Hero Section */}
      <div className="hero-section">
        <Container fluid="lg" className="h-50">
          <div className="hero-content text-center">
            <h1>Experience the Fastest Way to<br />Rent Anytime Anywhere.</h1>
            <Button onClick={anotherPage} variant="primary" size="lg" className="get-started-btn">
              Get Started
            </Button>
          </div>
        </Container>
      </div>

      {/* Categories Section */}
      <section className="categories-section">
        <Container fluid="lg">
          <h2 className="text-center mb-6">Popular Categories</h2>
          <Row className="g-4">
            {categories.map((category, index) => (
              <Col key={index} xs={12} sm={6} md={3}>
                <Card className="category-card">
                  <Card.Img variant="top" src={category.image} />
                  <Card.Body>
                    <Card.Title className="text-center">{category.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* <Footer /> */}
    </div>
  );
}

export default App;