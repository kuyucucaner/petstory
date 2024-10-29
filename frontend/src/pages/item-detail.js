import React, { useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemById , deleteItem } from '../features/item/item-slice';
import { useParams ,useNavigate } from 'react-router-dom';

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
  const handleDelete = (itemId) => {
    dispatch(deleteItem(itemId));
    navigate('/item');
  };

  return (
    <div>
      {selectedItem ? (
        <div>
          <h2>{selectedItem.name} Detayları</h2>
          <p>{selectedItem.category}</p>
          <p>{selectedItem.description}</p>
          <p>{selectedItem.condition}</p>
          <p>{selectedItem.price}</p>
          <p>{selectedItem.owner.firstName}</p>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {selectedItem.photo.slice(0, 6).map((photoUrl, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${photoUrl}`}
                alt={`Photos ${index + 1}`}
                style={{ width: '200px', height: '200px' }}
                crossOrigin="anonymous"
              />
            ))}
          </div>
                     <button onClick={() => handleDelete(itemId)}>Sil</button>
          <button onClick={handleUpdateClick}>Güncelle</button>
        </div>
      ) : (
        <p>Detaylar yükleniyor...</p>
      )}
    </div>
  );
};

export default ItemDetail;
