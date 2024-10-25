import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createItem } from '../features/item/item-slice';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const CreateItemForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]); // Birden fazla dosya için dizi olarak ayarladık

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.user.id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("No token found");
    }
  }, []);

  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    category: '',
    condition: '',
    price: '',
    owner: '',
  });

  useEffect(() => {
    if (userId) {
      setItemData((prevData) => ({ ...prevData, owner: userId }));
    }
  }, [userId]);

  const handleInputChange = (e) => {
    setItemData({
      ...itemData,
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
  
    const formData = new FormData();
    formData.append('name', itemData.name);
    formData.append('description', itemData.description);
    formData.append('category', itemData.category);
    formData.append('condition', itemData.condition);
    formData.append('price', itemData.price);
    formData.append('owner', itemData.owner);
  
    // Birden fazla fotoğraf ekleme
    selectedFiles.forEach((file, index) => {
      formData.append(`photo`, file); // Dosyaları photos olarak ekle
    });
  
    try {
      dispatch(createItem(formData))
      .unwrap()
      .then(() => navigate('/item'))
      .catch((error) => console.error("Error creating item:", error));
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };
  
  return (
    <div>
      <h1>Eşya Oluştur</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>İsim:</label>
          <input
            type="text"
            name="name"
            value={itemData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Açıklama:</label>
          <input
            type="text"
            name="description"
            value={itemData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Kategori:</label>
          <select name="category" value={itemData.category} onChange={handleInputChange} required>
            <option value="">Kategori Seç</option>
            <option value="bed">bed</option>
            <option value="toy">toy</option>
            <option value="food bowl">food</option>
            <option value="leash">leash</option>
            <option value="other">other</option>
          </select>
        </div>
        <div>
          <label>Durum:</label>
          <select name="condition" value={itemData.condition} onChange={handleInputChange} required>
            <option value="">Durum Seç</option>
            <option value="new">new</option>
            <option value="used">used</option>
          </select>
        </div>
        <div>
          <label>Fiyat:</label>
          <input
            type="number"
            name="price"
            value={itemData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Fotoğraf:</label>
          <input
            type="file"
            name="photos"
            multiple // Birden fazla dosya seçilmesini sağlamak için multiple ekledik
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Oluştur</button>
      </form>
    </div>
  );
};

export default CreateItemForm;
