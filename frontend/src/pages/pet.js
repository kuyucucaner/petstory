import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets  } from '../features/pet/pet-slice';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from "../components/navbar"; // Navbar bileşeniniz varsa ekleyin
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/pet.css';
import { Link } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'; // JWT'yi çözümlemek için

  const token = localStorage.getItem("token"); // localStorage'dan tokeni al
  console.log("Token:", token); // Tokeni konsola yazdır
  let userId;

  if (token) {
    try {
      const decodedToken = jwtDecode(token); // JWT'yi çözümle
      console.log("Decoded Token:", decodedToken); // Token çözümlemesini kontrol et
      userId = decodedToken.user.id; // decodedToken içindeki user id'yi al
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

const PetList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pets, status, error } = useSelector((state) => state.pet);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPets());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;
  
  const handleViewDetails = (petId) => {
    navigate(`/pet/${petId}`);
  };
  return (
    <div>
            <NavbarComponent />

            <Container className="my-5 container-xl">
                {userId ? (
            <Link to="/create-pet" className="btn btn-success mx-3 ">
            Pet Ekle
          </Link> 
              ) : (
                <>

                </>
              )}
 <Row className="g-4">
  <h1 className="text-center mb-4">Evcil Hayvanlar</h1>
    {pets.map((pet) => (
      <Col key={pet._id} xs={12} sm={6} md={4} lg={3}>
        <Card className="h-100 text-center shadow pet-card">
          <Card.Img
            variant="top"
            src={`http://localhost:5000/${pet.photo[0]}`}
            alt={pet.name}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title>{pet.name}</Card.Title>
            <Card.Text>{pet.species}</Card.Text>
            <Button variant="primary" onClick={() => handleViewDetails(pet._id)}>
              Detayları Gör
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>
    </div>
  );
};

export default PetList;
