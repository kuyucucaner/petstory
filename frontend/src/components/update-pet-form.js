import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePet, addMedicalRecord, deleteMedicalRecord } from "../features/pet/pet-slice";
import { useParams, useNavigate } from "react-router-dom";
import NavbarComponent from '../components/navbar';
const UpdatePetForm = () => {
  const { petId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPet } = useSelector((state) => state.pet);

  const [petData, setPetData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
  });

  const [newRecord, setNewRecord] = useState({ visitDate: "", notes: "", vet: "" });
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (selectedPet) {
      setPetData({
        name: selectedPet.name || "",
        species: selectedPet.species || "",
        breed: selectedPet.breed || "",
        age: selectedPet.age || "",
        gender: selectedPet.gender || "",
      });
    }
  }, [selectedPet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    if (selectedFiles.length + filesArray.length > 5) {
      alert("En fazla 5 fotoğraf yükleyebilirsiniz.");
      return;
    }
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(petData).forEach(([key, value]) => formData.append(key, value));
    selectedFiles.forEach((file) => formData.append("photo", file));

    dispatch(updatePet({ id: petId, updatedData: formData })).then(() => {
      navigate(`/pet/${petId}`);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prevRecord) => ({ ...prevRecord, [name]: value }));
  };

  const handleAddRecord = () => {
    dispatch(addMedicalRecord({ petId, medicalRecord: newRecord }));
    setNewRecord({ visitDate: "", notes: "", vet: "" });
  };

  const handleDeleteRecord = (recordId) => {
    dispatch(deleteMedicalRecord({ petId, recordId }));
  };

  return (
    <div>
        <NavbarComponent/>
    <div className="container my-5">
      <h2 className="mb-4">Evcil Hayvanı Güncelle</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">İsim:</label>
          <input
            type="text"
            name="name"
            value={petData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tür:</label>
          <input
            type="text"
            name="species"
            value={petData.species}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Yaş:</label>
          <input
            type="number"
            name="age"
            value={petData.age}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cins:</label>
          <input
            type="text"
            name="breed"
            value={petData.breed}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cinsiyet:</label>
          <input
            type="text"
            name="gender"
            value={petData.gender}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fotoğraf:</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Güncelle
        </button>
      </form>

      <h3 className="mt-5">Yeni Tıbbi Kayıt Ekle</h3>
      <form onSubmit={(e) => e.preventDefault()} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Ziyaret Tarihi:</label>
          <input
            type="date"
            name="visitDate"
            value={newRecord.visitDate}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Notlar:</label>
          <input
            type="text"
            name="notes"
            value={newRecord.notes}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Veteriner:</label>
          <input
            type="text"
            name="vet"
            value={newRecord.vet}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button className="btn btn-success" onClick={handleAddRecord}>
          Tıbbi Kayıt Ekle
        </button>
      </form>

      {selectedPet?.medicalRecords?.length > 0 && (
        <div>
          <h3>Mevcut Tıbbi Kayıtlar</h3>
          <ul className="list-group">
            {selectedPet.medicalRecords.map((record) => (
              <li
                key={record.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {record.visitDate} - {record.notes} (Vet: {record.vet})
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteRecord(record.id)}
                >
                  Sil
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
};

export default UpdatePetForm;