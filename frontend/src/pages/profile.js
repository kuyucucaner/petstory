import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, deleteUser } from '../features/user/user-slice';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser } = useSelector((state) => state.user);
console.log('Selected User : ' , selectedUser) ;
  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  const handleUpdateClick = () => {
    navigate(`/profile/${userId}/update`);
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
    navigate('/'); // Redirect after deletion
  };


  return (
    <div>
      {selectedUser ? (
        <div>
          <h2>{selectedUser.firstName}</h2>
          <p>{selectedUser.lastName}</p>
          <p>{selectedUser.email}</p>
          <p>{selectedUser.phone}</p>
          <p>{selectedUser.role}</p>
          <p>{selectedUser.address.street}</p>
          <p>{selectedUser.address.city}</p>
          <p>{selectedUser.address.state}</p>
          <p>{selectedUser.address.country}</p>
          <p>{new Date(selectedUser.dateOfBirth).toLocaleDateString('tr-TR')}</p>
          <img
  src={`http://localhost:5000/${selectedUser.photo}`}
  alt={`${selectedUser.firstName}'s `}
  style={{ width: '200px', height: '200px' }} // Example styling
  crossorigin='anonymous' 
/>





          <button onClick={() => handleDelete(userId)}>Sil</button>
          <button onClick={handleUpdateClick}>Güncelle</button>
        </div>
      ) : (
        <p>Detaylar yükleniyor...</p>
      )}
    </div>
  );
};

export default Profile;
