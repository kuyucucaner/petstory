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
          <p>Kategori: {selectedItem.category}</p>
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
