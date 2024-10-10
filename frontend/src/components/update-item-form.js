import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem } from '../features/item/item-slice';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePetForm = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedItem } = useSelector((state) => state.item);

  const [itemData, setItemData] = useState({
    name: selectedItem ? selectedItem.name : '',
    species: selectedItem ? selectedItem.category : '',
  });

  const handleChange = (e) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateItem({ id: itemId, updatedData: itemData }));
    navigate('/item');  // Güncelleme sonrası listeye dönmek için
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pet Güncelle</h2>
      <div>
        <label>İsim:</label>
        <input
          type="text"
          name="name"
          value={itemData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>kategori:</label>
        <input
          type="text"
          name="category"
          value={itemData.category}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Güncelle</button>
    </form>
  );
};

export default UpdatePetForm;
