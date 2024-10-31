import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePet } from '../features/pet/pet-slice';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePetForm = () => {
  const { petId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPet } = useSelector((state) => state.pet);

  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
  });
  const [selectedFiles, setSelectedFiles] = useState([]); // Dosyaları bir dizi olarak saklıyoruz
 
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
    setPetData({
      ...petData,
      [e.target.name]: e.target.value
    });
  };
  const handleFileChange = (e) => {
    // En fazla 5 dosya eklemek için mevcut dosyalarla birleştiriyoruz
    const filesArray = Array.from(e.target.files);
    if (selectedFiles.length + filesArray.length > 5) {
      alert("En fazla 5 fotoğraf yükleyebilirsiniz.");
      return;
    }
    setSelectedFiles(prevFiles => [...prevFiles, ...filesArray]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", petData); // Form verisini kontrol edin

    // FormData kullanarak dosya ve form verisini bir arada gönder
    const formData = new FormData();
    formData.append("name", petData.name);
    formData.append("species", petData.species);
    formData.append("breed", petData.breed);
    formData.append("age", petData.age);
    formData.append("gender", petData.gender);

  // Fotoğrafları FormData'ya ekle
  selectedFiles.forEach((file, index) => {
    formData.append('photo', file);
  });
    // updateUser işlemini başlat
    dispatch(updatePet({ id: petId, updatedData: formData })).then(() => {
      navigate(`/pet/${petId}`);
    });
  };



  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          name="breed"
          value={petData.breed}
          onChange={handleChange}
        />
      </div>     
       <div>
        <label>Açıklama:</label>
        <input
          type="text"
          name="gender"
          value={petData.gender}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Fotoğraf:</label>
        <input type="file" name="photo" onChange={handleFileChange} />
      </div>
      <button type="submit">Güncelle</button>
    </form>
  );
};

export default UpdatePetForm;
