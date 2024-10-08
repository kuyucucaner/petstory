import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../features/item/item-slice';
import { useNavigate } from 'react-router-dom';
import CreateItemForm from '../components/create-item-form';

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

  return (
    <div>
      <h1>Evcil Hayvanlar</h1>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item._id} onClick={() => navigate(`/items/${item._id}`)}>
              {item.name} - {item.category}
            </li>
          ))
        ) : (
          <li>No items available</li>
        )}
      </ul>
      <CreateItemForm />
    </div>
  );
};

export default ItemList;
