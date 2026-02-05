import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import FlowerCard from '../components/FlowerCard';

const featuredFlowers = [
  {
    id: 1,
    name: 'Red Rose Bouquet',
    description: 'A stunning arrangement of fresh red roses, perfect for expressing love.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Spring Garden Mix',
    description: 'Colorful blend of seasonal flowers to brighten any room.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Elegant Orchid',
    description: 'Exotic purple orchid in a decorative ceramic pot.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Sunflower Sunshine',
    description: 'Bright and cheerful sunflowers to spread happiness.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&h=300&fit=crop'
  }
];

const categories = [
  { icon: '🌹', name: 'Roses', count: 45 },
  { icon: '💐', name: 'Bouquets', count: 32 },
  { icon: '🌷', name: 'Tulips', count: 28 },
  { icon: '🌻', name: 'Sunflowers', count: 15 },
  { icon: '🌸', name: 'Orchids', count: 22 },
  { icon: '🪴', name: 'Plants', count: 38 }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    text: 'The flowers were absolutely stunning! They lasted over two weeks and the delivery was right on time.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    text: 'Best flower shop in town! The arrangements are always creative and beautiful. Highly recommend!',
    rating: 5
  },
  {
    name: 'Emily Davis',
    text: 'Ordered flowers for my wedding and they exceeded all expectations. Truly magical!',
    rating: 5
  }
];

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-3 fw-bold mb-4">
                Fresh Flowers <br />
                <span style={{ color: '#ffd700' }}>Delivered Daily</span>
              </h1>
              <p className="lead mb-4 opacity-75">
                Discover our handcrafted floral arrangements, made with love
                and the freshest blooms. Perfect for any occasion.
              </p>
              <div className="d-flex gap-3">
                <Button as={Link} to="/shop" className="btn-flower btn-lg">
                  Shop Now
                </Button>
                <Button as={Link} to="/about" className="btn-outline-flower btn-lg">
                  Learn More
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center mt-5 mt-lg-0">
              <img
                src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500&h=500&fit=crop"
                alt="Beautiful Flowers"
                className="img-fluid rounded-circle"
                style={{
                  maxWidth: '400px',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                  border: '8px solid rgba(255,255,255,0.3)'
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="feature-icon">
                <i className="bi bi-truck"></i>
              </div>
              <h5>Free Delivery</h5>
              <p className="text-muted">On orders over $50</p>
            </Col>
            <Col md={3} className="mb-4">
              <div className="feature-icon">
                <i className="bi bi-flower2"></i>
              </div>
              <h5>Fresh Flowers</h5>
              <p className="text-muted">Sourced daily</p>
            </Col>
            <Col md={3} className="mb-4">
              <div className="feature-icon">
                <i className="bi bi-heart"></i>
              </div>
              <h5>Made with Love</h5>
              <p className="text-muted">Handcrafted arrangements</p>
            </Col>
            <Col md={3} className="mb-4">
              <div className="feature-icon">
                <i className="bi bi-shield-check"></i>
              </div>
              <h5>Satisfaction</h5>
              <p className="text-muted">100% guaranteed</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Shop by Category</h2>
            <p className="text-muted mt-4">Find the perfect flowers for every moment</p>
          </div>
          <Row>
            {categories.map((cat, index) => (
              <Col lg={2} md={4} sm={6} key={index} className="mb-4">
                <Link to="/shop" style={{ textDecoration: 'none' }}>
                  <div className="category-card">
                    <div className="category-icon">{cat.icon}</div>
                    <h6 className="mb-1">{cat.name}</h6>
                    <small className="text-muted">{cat.count} items</small>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Featured Arrangements</h2>
            <p className="text-muted mt-4">Our most popular handpicked selections</p>
          </div>
          <Row>
            {featuredFlowers.map(flower => (
              <Col lg={3} md={6} key={flower.id} className="mb-4">
                <FlowerCard flower={flower} />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button as={Link} to="/shop" className="btn-flower btn-lg">
              View All Products
            </Button>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="text-muted mt-4">Real reviews from happy customers</p>
          </div>
          <Row>
            {testimonials.map((test, index) => (
              <Col lg={4} key={index} className="mb-4">
                <div className="testimonial-card">
                  <div className="mb-3">
                    {[...Array(test.rating)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill text-warning me-1"></i>
                    ))}
                  </div>
                  <p className="mb-3">"{test.text}"</p>
                  <h6 className="mb-0">- {test.name}</h6>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} className="text-center">
              <h3 className="mb-3">Subscribe to Our Newsletter</h3>
              <p className="mb-4 opacity-75">
                Get exclusive offers, new arrivals, and floral inspiration delivered to your inbox.
              </p>
              <div className="d-flex">
                <input
                  type="email"
                  className="form-control newsletter-input"
                  placeholder="Enter your email"
                />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;
