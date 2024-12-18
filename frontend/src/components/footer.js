import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/footer.css';
const Footer = () => {

  return (
<footer className="bg-dark text-light py-4">
  <Container>
    <Row>
      <Col md={4}>
        <h5 className="fw-bold">Hakkımızda</h5>
        <p>Hayvan dostlarımız için sevgi dolu yuvalar bulmayı amaçlayan bir platformuz.</p>
      </Col>

      <Col md={4}>
        <h5 className="fw-bold">Bağlantılar</h5>
        <ul className="list-unstyled">
          <li><a href="/" className="text-light text-decoration-none">Anasayfa</a></li>
          <li><a href="/about" className="text-light text-decoration-none">Hakkımızda</a></li>
          <li><a href="/contact" className="text-light text-decoration-none">İletişim</a></li>
        </ul>
      </Col>

      <Col md={4}>
        <h5 className="fw-bold">Bize Ulaşın</h5>
        <p>Email: info@hayvansevgisi.com</p>
        <p>Telefon: +90 555 555 55 55</p>
      </Col>
    </Row>
    <hr className="border-light" />
    <p className="text-center mb-0">© 2024 HayvanSevgisi. Tüm hakları saklıdır.</p>
  </Container>
</footer>

  );
};

export default Footer;
