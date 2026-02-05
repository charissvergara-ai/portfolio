import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <>
        <section className="page-header">
          <Container>
            <h1 className="display-4 fw-bold">Your Cart</h1>
            <p className="lead opacity-75">Review your selected items</p>
          </Container>
        </section>

        <section className="py-5">
          <Container>
            <div className="text-center py-5">
              <i className="bi bi-cart-x display-1" style={{ color: 'var(--primary-pink)' }}></i>
              <h3 className="mt-4">Your cart is empty</h3>
              <p className="text-muted mb-4">Looks like you haven't added any flowers yet.</p>
              <Button as={Link} to="/shop" className="btn-flower btn-lg">
                <i className="bi bi-flower1 me-2"></i>
                Browse Flowers
              </Button>
            </div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-header">
        <Container>
          <h1 className="display-4 fw-bold">Your Cart</h1>
          <p className="lead opacity-75">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row>
            <Col lg={8}>
              <div className="bg-white rounded-4 p-4 shadow-sm">
                <Table responsive className="align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-center">Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="rounded-3 me-3"
                              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                            />
                            <div>
                              <h6 className="mb-1" style={{ color: 'var(--primary-purple)' }}>{item.name}</h6>
                              <small className="text-muted">{item.category}</small>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <span style={{ color: 'var(--primary-pink)', fontWeight: '600' }}>
                            ${item.price.toFixed(2)}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="d-flex align-items-center justify-content-center">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              className="rounded-circle"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <i className="bi bi-dash"></i>
                            </Button>
                            <span className="mx-3 fw-bold">{item.quantity}</span>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              className="rounded-circle"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <i className="bi bi-plus"></i>
                            </Button>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="fw-bold" style={{ color: 'var(--primary-purple)' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </td>
                        <td className="text-center">
                          <Button
                            variant="link"
                            className="text-danger p-0"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <div className="d-flex justify-content-between mt-4">
                <Button as={Link} to="/shop" variant="outline-secondary" className="rounded-pill">
                  <i className="bi bi-arrow-left me-2"></i>
                  Continue Shopping
                </Button>
                <Button variant="outline-danger" className="rounded-pill" onClick={clearCart}>
                  <i className="bi bi-trash me-2"></i>
                  Clear Cart
                </Button>
              </div>
            </Col>

            <Col lg={4}>
              <div className="bg-white rounded-4 p-4 shadow-sm sticky-top" style={{ top: '100px' }}>
                <h5 className="mb-4" style={{ color: 'var(--primary-purple)' }}>Order Summary</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Shipping</span>
                  <span>{getCartTotal() >= 50 ? 'Free' : '$9.99'}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Tax (8%)</span>
                  <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold">Total</span>
                  <span className="fw-bold" style={{ color: 'var(--primary-pink)', fontSize: '1.25rem' }}>
                    ${(getCartTotal() + (getCartTotal() >= 50 ? 0 : 9.99) + getCartTotal() * 0.08).toFixed(2)}
                  </span>
                </div>

                {getCartTotal() < 50 && (
                  <div className="alert alert-info py-2 mb-3" style={{ fontSize: '0.875rem' }}>
                    <i className="bi bi-info-circle me-2"></i>
                    Add ${(50 - getCartTotal()).toFixed(2)} more for free shipping!
                  </div>
                )}

                <Button className="btn-flower w-100 btn-lg mb-3">
                  <i className="bi bi-lock me-2"></i>
                  Checkout
                </Button>

                <div className="text-center">
                  <small className="text-muted">
                    <i className="bi bi-shield-check me-1"></i>
                    Secure checkout powered by Stripe
                  </small>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Cart;
