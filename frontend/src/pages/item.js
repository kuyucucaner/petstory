import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../features/item/item-slice';
import { useNavigate, Link } from 'react-router-dom';
import NavbarComponent from '../components/navbar';
const ItemList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((state) => state.item);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  const handleViewDetails = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  return (
    <div>

        <NavbarComponent />
    <div className="container my-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Eşyalar</h1>
        <Link to="/create-item" className="btn btn-success">
          Eşya Ekle
        </Link>
      </div>

      <ul className="list-group">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item._id} className="list-group-item d-flex align-items-center">
              <img
                src={`http://localhost:5000/${item.photo[0]}`}
                alt={item.name}
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  marginRight: '15px',
                }}
              />
              <div className="flex-grow-1">
                <h5>{item.name}</h5>
                <p>Kategori: {item.category}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewDetails(item._id)}
                >
                  Detayları Gör
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item">Eşya bulunamadı</li>
        )}
      </ul>
    </div>
    </div>
  );
};

export default ItemList;
