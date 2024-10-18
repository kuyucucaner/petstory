import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createItem } from '../features/item/item-slice';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // JWT'yi çözümlemek için


const CreateItemForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
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
      setItemData((prevData) => ({ ...prevData, owner: userId })); // ownerId'yi userId ile güncelle
    }
  }, [userId]);


  // Form inputlarını handle eden fonksiyon
  const handleInputChange = (e) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      console.error("User ID is missing"); // Eğer userId yoksa hata yazdır
      return;
    }

    // Gönderilen veriyi kontrol edin
    console.log('Item Data:', itemData); // ownerId'yi kontrol edin
    try {
      await dispatch(createItem({ newItem: itemData })).unwrap(); // Redux thunk ile createPet dispatch ediyoruz
      navigate('/item');  // Başarılı olursa listeye dönmek için yönlendirme
    } catch (error) {
      console.error('Error creating pet:', error); // Hataları yazdırıyoruz
    }
  };

  return (
    <div>
      <h1>Eşya Oluştur</h1>
      <form onSubmit={handleSubmit}>
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
          <input
            type="text"
            name="owner"
            value={itemData.owner}
            onChange={handleInputChange}
            hidden
          />
        </div>
        <button type="submit">Oluştur</button>
      </form>


    </div>
  );
};

export default CreateItemForm;
