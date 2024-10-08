import React, { useState } from 'react';
import axios from 'axios';

const CreateItemForm = () => {
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    category: '',
    condition: '',
    price: '',
    owner: '',
  });

  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  // Form inputlarını handle eden fonksiyon
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  // Form submit edildiğinde API çağrısı yapan fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Item Data:', itemData); // Gönderilen veriyi kontrol edin

    try {
      setStatus('loading');
      const response = await axios.post('http://localhost:5000/api/v1/item/create', itemData);
      setStatus('success');
      console.log('Eşya oluşturuldu:', response.data);
    } catch (error) {
      setStatus('failed');
      setError(error.response?.data?.message || 'Bir hata oluştu');
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
          <label>Sahip ID:</label>
          <input
            type="text"
            name="owner"
            value={itemData.owner}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Oluştur</button>
      </form>

      {/* Durum mesajları */}
      {status === 'loading' && <p>Eşya oluşturuluyor...</p>}
      {status === 'success' && <p>Eşya başarıyla oluşturuldu!</p>}
      {status === 'failed' && <p>Hata: {error}</p>}
    </div>
  );
};

export default CreateItemForm;
