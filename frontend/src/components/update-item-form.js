import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateItem } from "../features/item/item-slice";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePetForm = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedItem } = useSelector((state) => state.item);

  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    category: "",
    condition: "",
    price: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]); // Dosyaları bir dizi olarak saklıyoruz

  useEffect(() => {
    if (selectedItem) {
      setItemData({
        name: selectedItem.name || "",
        description: selectedItem.description || "",
        category: selectedItem.category || "",
        condition: selectedItem.condition || "",
        price: selectedItem.price || "",
      });
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    // En fazla 5 dosya eklemek için mevcut dosyalarla birleştiriyoruz
    const filesArray = Array.from(e.target.files);
    if (selectedFiles.length + filesArray.length > 5) {
      alert("En fazla 5 fotoğraf yükleyebilirsiniz.");
      return;
    }
    setSelectedFiles(prevFiles => [...prevFiles, ...filesArray]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", itemData); // Form verisini kontrol edin

    // FormData kullanarak dosya ve form verisini bir arada gönder
    const formData = new FormData();
    formData.append("name", itemData.name);
    formData.append("description", itemData.description);
    formData.append("category", itemData.category);
    formData.append("condition", itemData.condition);
    formData.append("price", itemData.price);

  // Fotoğrafları FormData'ya ekle
  selectedFiles.forEach((file, index) => {
    formData.append('photo', file);
  });
    // updateUser işlemini başlat
    dispatch(updateItem({ id: itemId, updatedData: formData })).then(() => {
      navigate(`/item/${itemId}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>item Güncelle</h2>
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
          name="description"
          value={itemData.description}
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
      <div>
        <label>kategori:</label>
        <input
          type="text"
          name="condition"
          value={itemData.condition}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>kategori:</label>
        <input
          type="text"
          name="price"
          value={itemData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Fotoğraf:</label>
        <input type="file" name="photo" onChange={handleFileChange} />
      </div>
      <button type="submit">Güncelle</button>
    </form>
  );
};

export default UpdatePetForm;
