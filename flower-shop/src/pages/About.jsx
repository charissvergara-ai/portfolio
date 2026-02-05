import { Container, Row, Col } from 'react-bootstrap';

const stats = [
  { number: '14+', label: 'Years Experience' },
  { number: '50K+', label: 'Happy Customers' },
  { number: '200+', label: 'Flower Varieties' },
  { number: '99%', label: 'Satisfaction Rate' }
];

const team = [
  {
    name: 'Emma Thompson',
    role: 'Founder & Head Florist',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
  },
  {
    name: 'David Park',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
  },
  {
    name: 'Sophie Chen',
    role: 'Senior Florist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
  },
  {
    name: 'James Wilson',
    role: 'Operations Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
  }
];

function About() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <Container>
          <h1 className="display-4 fw-bold">About Us</h1>
          <p className="lead opacity-75">Our story of passion for beautiful blooms</p>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop"
                alt="Our Story"
                className="img-fluid about-image"
              />
            </Col>
            <Col lg={6}>
              <h2 className="section-title mb-4">Our Story</h2>
              <p className="text-muted mt-4">
                Founded in 2010, Bloom & Blossom started as a small family-owned flower shop
                with a simple mission: to bring the beauty of nature into people's lives through
                stunning floral arrangements.
              </p>
              <p className="text-muted">
                What began as a passion project has blossomed into one of the city's most beloved
                flower shops, known for our creative designs, exceptional quality, and heartfelt
                customer service.
              </p>
              <p className="text-muted">
                Every arrangement we create tells a story. Whether it's a birthday celebration,
                a wedding, or a simple "thinking of you" gesture, we pour our hearts into making
                each bouquet special and memorable.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-5 bg-white">
        <Container>
          <Row>
            {stats.map((stat, index) => (
              <Col md={3} sm={6} key={index} className="mb-4">
                <div className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Our Values</h2>
            <p className="text-muted mt-4">What drives us every day</p>
          </div>
          <Row>
            <Col md={4} className="mb-4">
              <div className="info-card info-card-grid">
                <div className="info-icon">
                  <i className="bi bi-heart-fill"></i>
                </div>
                <h5>Passion</h5>
                <p className="text-muted">
                  We love what we do, and it shows in every arrangement we create.
                  Flowers are our life's work and greatest joy.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="info-card info-card-grid">
                <div className="info-icon">
                  <i className="bi bi-star-fill"></i>
                </div>
                <h5>Quality</h5>
                <p className="text-muted">
                  We source only the freshest, most beautiful blooms and never
                  compromise on the quality of our products.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="info-card info-card-grid">
                <div className="info-icon">
                  <i className="bi bi-people-fill"></i>
                </div>
                <h5>Community</h5>
                <p className="text-muted">
                  We're proud to be part of this community and support local growers
                  and sustainable practices.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Team */}
      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="text-muted mt-4">The talented people behind the blooms</p>
          </div>
          <Row>
            {team.map((member, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <div className="team-card">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-image"
                  />
                  <h5 className="mb-1">{member.name}</h5>
                  <p className="text-muted">{member.role}</p>
                  <div className="social-icons justify-content-center d-flex">
                    <a href="#" style={{ background: 'rgba(196, 77, 255, 0.1)', color: '#c44dff' }}>
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="#" style={{ background: 'rgba(255, 107, 157, 0.1)', color: '#ff6b9d' }}>
                      <i className="bi bi-instagram"></i>
                    </a>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Mission */}
      <section className="newsletter-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h3 className="mb-3">Our Mission</h3>
              <p className="lead opacity-75">
                "To spread joy and beauty through nature's most precious gift - flowers.
                We believe every bloom has the power to brighten someone's day, celebrate
                life's moments, and connect hearts across distances."
              </p>
              <p className="mt-4 opacity-50">- Emma Thompson, Founder</p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default About;
