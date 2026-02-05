import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

function FlowerCard({ flower }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(flower);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Card className="flower-card h-100">
      <Card.Img variant="top" src={flower.image} alt={flower.name} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{flower.name}</Card.Title>
        <Card.Text className="text-muted flex-grow-1">
          {flower.description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="price">${flower.price}</span>
          <Button
            className={`btn-flower btn-sm ${added ? 'btn-added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <i className="bi bi-check-lg me-1"></i>
                Added!
              </>
            ) : (
              <>
                <i className="bi bi-cart-plus me-1"></i>
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default FlowerCard;
