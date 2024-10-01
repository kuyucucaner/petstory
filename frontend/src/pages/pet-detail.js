import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPetById , deletePet } from '../features/pet/pet-slice';
import { useParams ,useNavigate } from 'react-router-dom';

const PetDetail = () => {
  const { petId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPet} = useSelector((state) => state.pet);

  useEffect(() => {
    dispatch(fetchPetById(petId));
  }, [dispatch, petId]);

  const handleUpdateClick = () => {
    navigate(`/pet/${petId}/update`);
  };
  const handleDelete = (petId) => {
    dispatch(deletePet(petId));
  };

  return (
    <div>
      {selectedPet ? (
        <div>
          <h2>{selectedPet.name} Detayları</h2>
          <p>Tür: {selectedPet.species}</p>
          <p>Yaş: {selectedPet.age}</p>
          <p>Açıklama: {selectedPet.description}</p>
          <button onClick={() => handleDelete(petId)}>Sil</button>
          <button onClick={handleUpdateClick}>Güncelle</button>
        </div>
      ) : (
        <p>Detaylar yükleniyor...</p>
      )}
    </div>
  );
};

export default PetDetail;
