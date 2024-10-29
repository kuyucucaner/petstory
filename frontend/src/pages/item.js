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
 
  const handleViewDetails = (itemId) => {
    navigate(`/item/${itemId}`);
  };
  return (
    <div>
      <h1>eşyalar</h1>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item._id}>
            <img
  src={`http://localhost:5000/${item.photo[0]}`}
  alt={`asas`}
  style={{ width: '200px', height: '200px' }} // Example styling
  crossorigin='anonymous' 
/>
            {item.name} - {item.category}
              <button onClick={() => handleViewDetails(item._id)}>Detayları Gör</button>

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
