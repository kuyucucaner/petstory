import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets } from '../features/pet/pet-slice';
import CreatePetForm from '../components/create-pet-form';

const PetList = () => {
  const dispatch = useDispatch();
  const { pets, status, error } = useSelector((state) => state.pet);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPets());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Evcil Hayvanlar</h1>
      <ul>
        {pets.map((pet) => (
          <li key={pet._id}>
            {pet.name} - {pet.species}
          </li>
        ))}
      </ul>
      <CreatePetForm />
    </div>
  );
};

export default PetList;
