import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <Container>
          <h1 className="display-4 fw-bold">Contact Us</h1>
          <p className="lead opacity-75">We'd love to hear from you</p>
        </Container>
      </section>

      {/* Contact Info Cards */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col md={4} className="mb-4">
              <div className="info-card info-card-grid">
                <div className="info-icon">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <h5>Visit Us</h5>
                <p className="text-muted mb-0">
                  123 Flower Street<br />
                  Garden City, GC 12345
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="info-card info-card-grid">
                <div className="info-icon">
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <h5>Call Us</h5>
                <p className="text-muted mb-0">
                  Phone: (555) 123-4567<br />
                  Toll Free: 1-800-FLOWERS
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="info-card info-card-grid">
                <div className="info-icon">
                  <i className="bi bi-clock-fill"></i>
                </div>
                <h5>Business Hours</h5>
                <p className="text-muted mb-0">
                  Mon - Sat: 9AM - 7PM<br />
                  Sunday: 10AM - 5PM
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Form & Map */}
      <section className="py-5 bg-white">
        <Container>
          <Row>
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="contact-form">
                <h3 className="section-title mb-4">Send us a Message</h3>

                {submitted && (
                  <Alert variant="success" className="mt-4" onClose={() => setSubmitted(false)} dismissible>
                    Thank you for your message! We'll get back to you soon.
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} className="mt-4">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="rounded-pill"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="rounded-pill"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(555) 123-4567"
                          className="rounded-pill"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Subject</Form.Label>
                        <Form.Select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="rounded-pill"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="order">Order Question</option>
                          <option value="wedding">Wedding Consultation</option>
                          <option value="corporate">Corporate Events</option>
                          <option value="feedback">Feedback</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-4">
                    <Form.Label>Your Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      required
                      style={{ borderRadius: '20px' }}
                    />
                  </Form.Group>
                  <Button type="submit" className="btn-flower btn-lg w-100">
                    <i className="bi bi-send me-2"></i>
                    Send Message
                  </Button>
                </Form>
              </div>
            </Col>
            <Col lg={6}>
              <div style={{ height: '500px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.98!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzAwLjAiTiA3M8KwNTgnNDguMCJX!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '20px' }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Store Location"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="text-muted mt-4">Quick answers to common questions</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="info-card mb-3">
                <h5 className="text-start" style={{ color: 'var(--primary-purple)' }}>
                  <i className="bi bi-question-circle me-2"></i>
                  Do you offer same-day delivery?
                </h5>
                <p className="text-muted text-start mb-0">
                  Yes! We offer same-day delivery for orders placed before 2 PM within our delivery area.
                </p>
              </div>
              <div className="info-card mb-3">
                <h5 className="text-start" style={{ color: 'var(--primary-purple)' }}>
                  <i className="bi bi-question-circle me-2"></i>
                  Can I customize my bouquet?
                </h5>
                <p className="text-muted text-start mb-0">
                  Absolutely! We love creating custom arrangements. Contact us with your vision and we'll make it happen.
                </p>
              </div>
              <div className="info-card mb-3">
                <h5 className="text-start" style={{ color: 'var(--primary-purple)' }}>
                  <i className="bi bi-question-circle me-2"></i>
                  What if I'm not satisfied with my order?
                </h5>
                <p className="text-muted text-start mb-0">
                  Your satisfaction is our priority. If you're not happy with your flowers, contact us within 24 hours for a full refund or replacement.
                </p>
              </div>
              <div className="info-card">
                <h5 className="text-start" style={{ color: 'var(--primary-purple)' }}>
                  <i className="bi bi-question-circle me-2"></i>
                  Do you provide flowers for weddings and events?
                </h5>
                <p className="text-muted text-start mb-0">
                  Yes! We specialize in wedding and event floristry. Book a free consultation to discuss your special day.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Contact;
