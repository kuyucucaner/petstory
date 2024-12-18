import React from "react";
import NavbarComponent from "../components/navbar"; // Navbar bileşeniniz varsa ekleyin
import Carousel from 'react-bootstrap/Carousel';
import '../styles/home.css'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Footer from '../components/footer';

const Home = () => {
  return (
    <div className="home-container">
      <NavbarComponent />
      <Carousel fade>
        <Carousel.Item>
          <img
            src="https://via.placeholder.com/600x400" // Geçici bir resim kullanabilirsiniz
            alt="First Slide"
            className="home-carousel-image"
          />
          <Carousel.Caption>
            <h3>İlk Görsel</h3>
            <p>Görselin açıklaması buraya gelecek.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="https://via.placeholder.com/600x400"
            alt="Second Slide"
            className="home-carousel-image"
          />
          <Carousel.Caption>
            <h3>İkinci Görsel</h3>
            <p>İkinci görsel açıklaması buraya gelecek.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="https://via.placeholder.com/600x400"
            alt="Third Slide"
            className="home-carousel-image"
          />
          <Carousel.Caption>
            <h3>Üçüncü Görsel</h3>
            <p>Üçüncü görsel açıklaması buraya gelecek.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container fluid className="home-number-container">
  <Row className="g-3" style={{ maxWidth: '1600px' }}>

      <Col className="home-number-col">
      <Card className="text-center shadow-md home-number-card">
        <Card.Body>
          <Card.Title>Sahiplenen Hayvanlar</Card.Title>
          <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
            25
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col>
    <Card className="text-center shadow-md home-number-card">
        <Card.Body>
          <Card.Title>Bekleyen Hayvanlar</Card.Title>
          <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>
            40
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col>

      <Card className="text-center shadow-md home-number-card">
        <Card.Body>
          <Card.Title>Toplam Hayvanlar</Card.Title>
          <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>
            65
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col>

      <Card className="text-center shadow-md home-number-card">
        <Card.Body>
          <Card.Title>Gönüllü Sayısı</Card.Title>
          <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>
            15
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>

<Container className="my-5  home-about container-xl">
  <Row className="align-items-center">
    <Col md={4}>
      <img
        src="https://via.placeholder.com/600x400"
        alt="Hayvan"
        className="img-fluid rounded shadow"
      />
    </Col>
    <Col md={8}>
      <h2 className="fw-bold">Amacımız</h2>
      <p className="lead">
        Sokakta yardıma muhtaç hayvanlara yuva bulmak ve hayvan sevgisini
        topluma yaymak. Siz de bu yolculukta bizimle olun!
      </p>
    </Col>
  </Row>
  <Row className="align-items-center">
    <Col md={8} className="home-about-col">
      <h2 className="fw-bold">Hedefimiz</h2>
      <p className="lead">
        Sokakta yardıma muhtaç hayvanlara yuva bulmak ve hayvan sevgisini
        topluma yaymak. Siz de bu yolculukta bizimle olun!
      </p>
    </Col>
    <Col md={4} className="home-about-col">
      <img
        src="https://via.placeholder.com/600x400"
        alt="Hayvan"
        className="img-fluid rounded shadow"
      />
    </Col>
  </Row>
  <Row className="align-items-center">
    <Col md={4} className="home-about-col">
      <img
        src="https://via.placeholder.com/600x400"
        alt="Hayvan"
        className="img-fluid rounded shadow"
      />
    </Col>
    <Col md={8} className="home-about-col">
      <h2 className="fw-bold">Umudumuz</h2>
      <p className="lead">
        Sokakta yardıma muhtaç hayvanlara yuva bulmak ve hayvan sevgisini
        topluma yaymak. Siz de bu yolculukta bizimle olun!
      </p>
    </Col>
  </Row>
</Container>

<Footer/>

    </div>
  );
};

export default Home;
