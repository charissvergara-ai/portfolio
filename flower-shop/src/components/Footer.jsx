import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="footer-custom">
      <Container>
        <Row className="mb-4">
          <Col lg={4} md={6} className="mb-4">
            <h4 className="mb-3">
              <i className="bi bi-flower1 me-2"></i>
              Bloom & Blossom
            </h4>
            <p className="text-white-50">
              Bringing nature's beauty to your doorstep since 2010.
              We craft stunning floral arrangements for every occasion.
            </p>
            <div className="social-icons">
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-twitter"></i></a>
              <a href="#"><i className="bi bi-pinterest"></i></a>
            </div>
          </Col>
          <Col lg={2} md={6} className="mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/">Home</Link></li>
              <li className="mb-2"><Link to="/shop">Shop</Link></li>
              <li className="mb-2"><Link to="/about">About Us</Link></li>
              <li className="mb-2"><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <h5 className="mb-3">Categories</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/shop">Roses</Link></li>
              <li className="mb-2"><Link to="/shop">Bouquets</Link></li>
              <li className="mb-2"><Link to="/shop">Wedding</Link></li>
              <li className="mb-2"><Link to="/shop">Plants</Link></li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <h5 className="mb-3">Contact Info</h5>
            <ul className="list-unstyled text-white-50">
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                123 Flower Street, Garden City
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                (555) 123-4567
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                hello@bloomblossom.com
              </li>
              <li className="mb-2">
                <i className="bi bi-clock me-2"></i>
                Mon-Sat: 9AM - 7PM
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <Row>
          <Col className="text-center text-white-50">
            <p className="mb-0">
              &copy; 2024 Bloom & Blossom. All rights reserved. Made with
              <i className="bi bi-heart-fill text-danger mx-1"></i>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
