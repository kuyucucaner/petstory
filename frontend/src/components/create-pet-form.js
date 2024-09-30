import React, { useState } from 'react';
import axios from 'axios';

const CreatePetForm = () => {
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    ownerId: '',
  });

  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  // Form inputlarını handle eden fonksiyon
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({
      ...petData,
      [name]: value,
    });
  };

  // Form submit edildiğinde API çağrısı yapan fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Pet Data:', petData); // Gönderilen veriyi kontrol edin

    try {
      setStatus('loading');
      const response = await axios.post('http://localhost:5000/api/v1/pet/create', petData);
      setStatus('success');
      console.log('Evcil hayvan oluşturuldu:', response.data);
    } catch (error) {
      setStatus('failed');
      setError(error.response?.data?.message || 'Bir hata oluştu');
    }
  };

  return (
    <div>
      <h1>Evcil Hayvan Oluştur</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>İsim:</label>
          <input
            type="text"
            name="name"
            value={petData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Tür:</label>
          <input
            type="text"
            name="species"
            value={petData.species}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Cins:</label>
          <input
            type="text"
            name="breed"
            value={petData.breed}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Yaş:</label>
          <input
            type="number"
            name="age"
            value={petData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Cinsiyet:</label>
          <select name="gender" value={petData.gender} onChange={handleInputChange} required>
            <option value="">Cinsiyet Seç</option>
            <option value="male">Erkek</option>
            <option value="female">Dişi</option>
          </select>
        </div>
        <div>
          <label>Sahip ID:</label>
          <input
            type="text"
            name="ownerId"
            value={petData.ownerId}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Oluştur</button>
      </form>

      {/* Durum mesajları */}
      {status === 'loading' && <p>Evcil hayvan oluşturuluyor...</p>}
      {status === 'success' && <p>Evcil hayvan başarıyla oluşturuldu!</p>}
      {status === 'failed' && <p>Hata: {error}</p>}
    </div>
  );
};

export default CreatePetForm;
