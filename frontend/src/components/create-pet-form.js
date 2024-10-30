import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPet } from '../features/pet/pet-slice';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // JWT'yi çözümlemek için

const CreatePetForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null); // Token'dan gelecek kullanıcı ID'si
  const [selectedFiles, setSelectedFiles] = useState([]); // Birden fazla dosya için dizi olarak ayarladık

  useEffect(() => {
    const token = localStorage.getItem("token"); // Tokeni localStorage'dan alıyoruz

    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Token'i decode ediyoruz
        setUserId(decodedToken.user.id); // user.id'yi ownerId olarak ayarlıyoruz
      } catch (error) {
        console.error("Invalid token:", error); // Hataları konsola yazdırıyoruz
      }
    } else {
      console.error("No token found");
    }
  }, []);

  // Form verisi
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    ownerId: '', // Başlangıçta boş, token'dan gelecek
  });

  useEffect(() => {
    if (userId) {
      setPetData((prevData) => ({ ...prevData, ownerId: userId })); // ownerId'yi userId ile güncelle
    }
  }, [userId]);

  // Form inputlarını handle eden fonksiyon
  const handleInputChange = (e) => {
    setPetData({
      ...petData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") && file.size < 5 * 1024 * 1024 // max 5MB
    );
    if (validFiles.length !== files.length) {
      console.error("Some files were invalid and not selected.");
    }
    setSelectedFiles(validFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
   // Gönderilen veriyi kontrol edin
   console.log('Pet Data:', petData); // ownerId'yi kontrol edin
 
   const formData = new FormData();
    formData.append('name', petData.name);
    formData.append('species', petData.species);
    formData.append('breed', petData.breed);
    formData.append('age', petData.age);
    formData.append('gender', petData.gender);
    formData.append('ownerId', petData.ownerId);
  
    // Birden fazla fotoğraf ekleme
    selectedFiles.forEach((file, index) => {
      formData.append(`photo`, file); // Dosyaları photos olarak ekle
    });
  
    try {
      dispatch(createPet(formData))
      .unwrap()
      .then(() => navigate('/pet'))
      .catch((error) => console.error("Error creating item:", error));
    } catch (error) {
      console.error("Error creating item:", error);
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
          <input
            type="text"
            name="ownerId"
            value={petData.ownerId || ''} // ownerId'yi gösteriyoruz
            readOnly // Kullanıcı tarafından değiştirilemez yapıyoruz
            hidden
          />
        </div>
        <div>
          <label>Fotoğraf:</label>
          <input
            type="file"
            name="photo"
            multiple // Birden fazla dosya seçilmesini sağlamak için multiple ekledik
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Oluştur</button>
      </form>
    </div>
  );
};

export default CreatePetForm;
