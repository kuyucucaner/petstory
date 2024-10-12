import React, { useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById , deleteUser} from '../features/user/user-slice';
import { useParams ,useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  const handleUpdateClick = () => {
    navigate(`/user/${userId}/update`);
  };
  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div>
      {selectedUser ? (
        <div>
          <h2>{selectedUser.firstName}</h2>
          <p>{selectedUser.lastName}</p>
          <p> {selectedUser.email}</p>
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
