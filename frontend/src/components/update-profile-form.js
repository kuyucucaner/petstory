import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/user/user-slice';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProfileForm = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser } = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
    },
    dateOfBirth: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      setUserData({
        firstName: selectedUser.firstName || '',
        lastName: selectedUser.lastName || '',
        email: selectedUser.email || '',
        phone: selectedUser.phone || '',
        address: selectedUser.address || { street: '', city: '', state: '', country: '' },
        dateOfBirth: selectedUser.dateOfBirth ? selectedUser.dateOfBirth.split('T')[0] : '', // Format date for input field
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address')) {
      const field = name.split('.')[1];
      setUserData({
        ...userData,
        address: { ...userData.address, [field]: value },
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", userData);  // Form verisini kontrol edin

    // FormData kullanarak dosya ve form verisini bir arada gönder
    const formData = new FormData();
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('email', userData.email);
    formData.append('phone', userData.phone);
    formData.append('address.street', userData.address.street);
    formData.append('address.city', userData.address.city);
    formData.append('address.state', userData.address.state);
    formData.append('address.country', userData.address.country);
    formData.append('dateOfBirth', userData.dateOfBirth);

    // Eğer bir dosya seçildiyse FormData'ya ekle
    if (selectedFile) {
      formData.append('photo', selectedFile);
    }

    // updateUser işlemini başlat
    dispatch(updateUser({ id: userId, updatedData: formData }))
      .then(() => {
        navigate(`/profile/${userId}`);
      });
  };  

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Kullanıcı Güncelle</h2>
      <div>
        <label>İsim:</label>
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Soyisim:</label>
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Telefon:</label>
        <input
          type="text"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Adres:</label>
        <div>
          <input
            type="text"
            name="address.street"
            placeholder="Sokak"
            value={userData.address.street}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address.city"
            placeholder="Şehir"
            value={userData.address.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address.state"
            placeholder="Eyalet"
            value={userData.address.state}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address.country"
            placeholder="Ülke"
            value={userData.address.country}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label>Doğum Tarihi:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={userData.dateOfBirth}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Fotoğraf:</label>
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
        />
      </div>
      
      <button type="submit">Güncelle</button>
    </form>
  );
};

export default UpdateProfileForm;
