import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, deleteUser } from '../features/user/user-slice';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/navbar';

const Profile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  const handleUpdateClick = () => {
    navigate(`/profile/${userId}/update`);
  };

  const handleDelete = () => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      dispatch(deleteUser(userId));
      navigate('/'); // Redirect after deletion
    }
  };

  return (
    <div>
      <NavbarComponent />
      <div className="container mt-5">
        {selectedUser ? (
          <div className="card shadow-lg p-4">
            <div className="row align-items-center">
              <div className="col-md-4 text-center">
                <img
                  src={`http://localhost:5000/${selectedUser.photo}`}
                  alt={`${selectedUser.firstName}'s profile`}
                  className="img-fluid rounded-circle mb-3"
                  style={{ maxWidth: '200px', height: 'auto' }}
                  crossOrigin="anonymous"
                />
              </div>
              <div className="col-md-8">
                <h2 className="text-primary">{selectedUser.firstName} {selectedUser.lastName}</h2>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Telefon:</strong> {selectedUser.phone}</p>
                <p><strong>Rol:</strong> {selectedUser.role}</p>
                <p><strong>Adres:</strong> {selectedUser.address.street}, {selectedUser.address.city}, {selectedUser.address.state}, {selectedUser.address.country}</p>
                <p><strong>Doğum Tarihi:</strong> {new Date(selectedUser.dateOfBirth).toLocaleDateString('tr-TR')}</p>
                <div className="mt-3">
                  <button className="btn btn-danger me-2" onClick={handleDelete}>Sil</button>
                  <button className="btn btn-primary" onClick={handleUpdateClick}>Güncelle</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>Detaylar yükleniyor...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
