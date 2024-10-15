import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/user/user-slice';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProfileForm = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser } = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    firstName: selectedUser ? selectedUser.firstName : '',
    lastName: selectedUser ? selectedUser.lastName : '',
    email: selectedUser ? selectedUser.email : '',

  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", userData);  // Veriyi burada kontrol edin
    dispatch(updateUser({ id: userId, updatedData: userData }))
      .then(() => {
        navigate(`/profile/${userId}`);
      });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Kullanıcı Güncelle</h2>
      <div>
        <label>İsim:</label>
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>soyisim:</label>
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Yaş:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Güncelle</button>
    </form>
  );
};

export default UpdateProfileForm;
