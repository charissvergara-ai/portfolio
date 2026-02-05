import { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import FlowerCard from '../components/FlowerCard';

const allFlowers = [
  {
    id: 1,
    name: 'Red Rose Bouquet',
    description: 'A stunning arrangement of fresh red roses, perfect for expressing love.',
    price: 49.99,
    category: 'roses',
    image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Spring Garden Mix',
    description: 'Colorful blend of seasonal flowers to brighten any room.',
    price: 39.99,
    category: 'bouquets',
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Elegant Orchid',
    description: 'Exotic purple orchid in a decorative ceramic pot.',
    price: 59.99,
    category: 'orchids',
    image: 'https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Sunflower Sunshine',
    description: 'Bright and cheerful sunflowers to spread happiness.',
    price: 34.99,
    category: 'sunflowers',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Pink Rose Collection',
    description: 'Delicate pink roses for tender moments.',
    price: 44.99,
    category: 'roses',
    image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Tulip Festival',
    description: 'Vibrant tulips in assorted colors.',
    price: 36.99,
    category: 'tulips',
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400&h=300&fit=crop'
  },
  {
    id: 7,
    name: 'Wedding Elegance',
    description: 'Sophisticated white flower arrangement for special occasions.',
    price: 89.99,
    category: 'wedding',
    image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&h=300&fit=crop'
  },
  {
    id: 8,
    name: 'Succulent Garden',
    description: 'Low-maintenance succulent arrangement in stylish planter.',
    price: 42.99,
    category: 'plants',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=300&fit=crop'
  },
  {
    id: 9,
    name: 'White Lily Serenity',
    description: 'Pure white lilies symbolizing peace and tranquility.',
    price: 54.99,
    category: 'bouquets',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop'
  },
  {
    id: 10,
    name: 'Rainbow Roses',
    description: 'Unique multi-colored roses for a magical touch.',
    price: 64.99,
    category: 'roses',
    image: 'https://images.unsplash.com/photo-1495231916356-a86217efff12?w=400&h=300&fit=crop'
  },
  {
    id: 11,
    name: 'Lavender Dreams',
    description: 'Fragrant lavender bundles for relaxation.',
    price: 29.99,
    category: 'plants',
    image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=400&h=300&fit=crop'
  },
  {
    id: 12,
    name: 'Tropical Paradise',
    description: 'Exotic tropical flowers for a vacation vibe.',
    price: 69.99,
    category: 'bouquets',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&h=300&fit=crop'
  }
];

const categories = ['all', 'roses', 'bouquets', 'tulips', 'sunflowers', 'orchids', 'plants', 'wedding'];

function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  let filteredFlowers = activeCategory === 'all'
    ? allFlowers
    : allFlowers.filter(f => f.category === activeCategory);

  if (sortBy === 'price-low') {
    filteredFlowers = [...filteredFlowers].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredFlowers = [...filteredFlowers].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    filteredFlowers = [...filteredFlowers].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <Container>
          <h1 className="display-4 fw-bold">Our Shop</h1>
          <p className="lead opacity-75">Discover our beautiful collection of fresh flowers</p>
        </Container>
      </section>

      {/* Shop Content */}
      <section className="py-5">
        <Container>
          {/* Filters */}
          <Row className="mb-5">
            <Col lg={9}>
              <div className="d-flex flex-wrap">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Button>
                ))}
              </div>
            </Col>
            <Col lg={3} className="mt-3 mt-lg-0">
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-pill"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Products Grid */}
          <Row>
            {filteredFlowers.map(flower => (
              <Col lg={3} md={4} sm={6} key={flower.id} className="mb-4">
                <FlowerCard flower={flower} />
              </Col>
            ))}
          </Row>

          {filteredFlowers.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-flower1 display-1 text-muted"></i>
              <h4 className="mt-3 text-muted">No flowers found in this category</h4>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

export default Shop;
