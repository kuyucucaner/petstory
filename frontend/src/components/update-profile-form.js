import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/user/user-slice';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/navbar';
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
        dateOfBirth: selectedUser.dateOfBirth ? selectedUser.dateOfBirth.split('T')[0] : '',
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['street', 'city', 'state', 'country'].includes(name)) {
      setUserData({
        ...userData,
        address: { ...userData.address, [name]: value },
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

    const formData = new FormData();
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('email', userData.email);
    formData.append('phone', userData.phone);
    formData.append('address', JSON.stringify(userData.address));
    formData.append('dateOfBirth', userData.dateOfBirth);

    if (selectedFile) {
      formData.append('photo', selectedFile);
    }

    dispatch(updateUser({ id: userId, updatedData: formData }))
      .then(() => {
        navigate(`/profile/${userId}`);
      });
  };

  return (
    <div>
      <NavbarComponent/>
    <div className="container mt-5">
      <h2 className="text-center mb-4">Kullanıcı Güncelle</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">İsim:</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Soyisim:</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefon:</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Adres:</label>
          <div className="row">
            <div className="col-md-6 mb-2">
              <input
                type="text"
                name="street"
                placeholder="Sokak"
                value={userData.address.street}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                name="city"
                placeholder="Şehir"
                value={userData.address.city}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                name="state"
                placeholder="Eyalet"
                value={userData.address.state}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                name="country"
                placeholder="Ülke"
                value={userData.address.country}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Doğum Tarihi:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={userData.dateOfBirth}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fotoğraf:</label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Güncelle</button>
      </form>
    </div>
    </div>
  );
};

export default UpdateProfileForm;
