import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPetById , deletePet , addMedicalRecord , deleteMedicalRecord} from '../features/pet/pet-slice';
import { useParams ,useNavigate } from 'react-router-dom';

const PetDetail = () => {
  const { petId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPet} = useSelector((state) => state.pet);
  const [newRecord, setNewRecord] = useState({ visitDate: '', notes: '', vet: '' });

  useEffect(() => {
    dispatch(fetchPetById(petId));
  }, [dispatch, petId]);

  const handleUpdateClick = () => {
    navigate(`/pet/${petId}/update`);
  };
  const handleDelete = (petId) => {
    dispatch(deletePet(petId));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({ ...newRecord, [name]: value });
  };
  const handleAddRecord = () => {
    dispatch(addMedicalRecord({ petId, medicalRecord: newRecord }));
    setNewRecord({ visitDate: '', notes: '', vet: '' }); // Formu temizle
  };
  const handleDeleteRecord = (recordId) => {
    dispatch(deleteMedicalRecord({ petId, recordId }));
  };

  return (
    <div>
      {selectedPet ? (
        <div>
          <h2>{selectedPet.name} Detayları</h2>
          <p>Tür: {selectedPet.species}</p>
          <p>Yaş: {selectedPet.age}</p>
          <p>Açıklama: {selectedPet.description}</p>
          <h3>Tıbbi Kayıtlar</h3>
          <ul>
            {selectedPet.medicalRecords && selectedPet.medicalRecords.length > 0 ? (
              selectedPet.medicalRecords.map((record, index) => (
                <li key={index}>
                  {record.visitDate} - {record.notes} (Vet: {record.vet})
                  <button onClick={() => handleDeleteRecord(record._id)}>Sil</button>

                </li>
              ))
            ) : (
              <p>Bu evcil hayvan için tıbbi kayıt bulunamadı.</p>
            )}
          </ul>
          <h3>Yeni Tıbbi Kayıt Ekle</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Ziyaret Tarihi:
              <input
                type="date"
                name="visitDate"
                value={newRecord.visitDate}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Notlar:
              <input
                type="text"
                name="notes"
                value={newRecord.notes}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Veteriner:
              <input
                type="text"
                name="vet"
                value={newRecord.vet}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={handleAddRecord}>Tıbbi Kayıt Ekle</button>
          </form>
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
