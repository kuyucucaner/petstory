import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets  } from '../features/pet/pet-slice';
import { useNavigate } from 'react-router-dom';
import CreatePetForm from '../components/create-pet-form';

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
      <h1>Evcil Hayvanlar</h1>
      <ul>
        {pets.map((pet) => (
          <li key={pet._id}>
                        <img
  src={`http://localhost:5000/${pet.photo[0]}`}
  alt={`asas`}
  style={{ width: '200px', height: '200px' }} // Example styling
  crossorigin='anonymous' 
/>
            {pet.name} - {pet.species}
            <button onClick={() => handleViewDetails(pet._id)}>Detayları Gör</button>

          </li>
        ))}
      </ul>
      <CreatePetForm />
    </div>
  );
};

export default PetList;
