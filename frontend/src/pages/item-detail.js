import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemById, deleteItem } from '../features/item/item-slice';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/navbar';
const ItemDetail = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedItem } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(fetchItemById(itemId));
  }, [dispatch, itemId]);

  const handleUpdateClick = () => {
    navigate(`/item/${itemId}/update`);
  };

  const handleDelete = () => {
    dispatch(deleteItem(itemId)).then(() => {
      navigate('/item');
    });
  };

  return (
    <div>
<NavbarComponent/>
    <div className="container mt-5">
      {selectedItem ? (
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title">{selectedItem.name} Detayları</h2>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item"><strong>Kategori:</strong> {selectedItem.category}</li>
              <li className="list-group-item"><strong>Açıklama:</strong> {selectedItem.description}</li>
              <li className="list-group-item"><strong>Durum:</strong> {selectedItem.condition}</li>
              <li className="list-group-item"><strong>Fiyat:</strong> {selectedItem.price} ₺</li>
              <li className="list-group-item">
                <strong>Sahibi:</strong> {selectedItem.owner?.firstName}
              </li>
            </ul>

            <h5 className="mt-4">Fotoğraflar:</h5>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {selectedItem.photo.slice(0, 6).map((photoUrl, index) => (
                <div key={index} className="col">
                  <img
                    src={`http://localhost:5000/${photoUrl}`}
                    alt={`Photo ${index + 1}`}
                    className="img-fluid rounded shadow"
                    crossOrigin="anonymous"
                  />
                </div>
              ))}
            </div>

            <div className="d-flex gap-3 mt-4">
              <button
                onClick={handleDelete}
                className="btn btn-danger"
              >
                <i className="bi bi-trash"></i> Sil
              </button>
              <button
                onClick={handleUpdateClick}
                className="btn btn-primary"
              >
                <i className="bi bi-pencil"></i> Güncelle
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ItemDetail;
