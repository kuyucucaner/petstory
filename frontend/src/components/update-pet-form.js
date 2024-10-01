import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePet } from '../features/pet/pet-slice';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePetForm = () => {
  const { petId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPet } = useSelector((state) => state.pet);

  const [petData, setPetData] = useState({
    name: selectedPet ? selectedPet.name : '',
    species: selectedPet ? selectedPet.species : '',
    age: selectedPet ? selectedPet.age : '',
    description: selectedPet ? selectedPet.description : ''
  });

  const handleChange = (e) => {
    setPetData({
      ...petData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePet({ id: petId, updatedData: petData }));
    navigate('/pet');  // Güncelleme sonrası listeye dönmek için
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pet Güncelle</h2>
      <div>
        <label>İsim:</label>
        <input
          type="text"
          name="name"
          value={petData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Tür:</label>
        <input
          type="text"
          name="species"
          value={petData.species}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Yaş:</label>
        <input
          type="number"
          name="age"
          value={petData.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Açıklama:</label>
        <input
          type="text"
          name="description"
          value={petData.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Güncelle</button>
    </form>
  );
};

export default UpdatePetForm;
