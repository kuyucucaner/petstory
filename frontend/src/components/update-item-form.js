import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateItem } from "../features/item/item-slice";
import { useParams, useNavigate } from "react-router-dom";
import NavbarComponent from "../components/navbar";
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
  const [selectedFiles, setSelectedFiles] = useState([]);

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
    const filesArray = Array.from(e.target.files);
    if (selectedFiles.length + filesArray.length > 5) {
      alert("En fazla 5 fotoğraf yükleyebilirsiniz.");
      return;
    }
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", itemData.name);
    formData.append("description", itemData.description);
    formData.append("category", itemData.category);
    formData.append("condition", itemData.condition);
    formData.append("price", itemData.price);

    selectedFiles.forEach((file) => {
      formData.append("photo", file);
    });

    dispatch(updateItem({ id: itemId, updatedData: formData })).then(() => {
      navigate(`/item/${itemId}`);
    });
  };

  return (
    <div>
<NavbarComponent/>
    <div className="container mt-5">
      <h2 className="text-center mb-4">Item Güncelle</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="shadow p-4 bg-light rounded"
      >
        <div className="mb-3">
          <label className="form-label">İsim:</label>
          <input
            type="text"
            name="name"
            value={itemData.name}
            onChange={handleChange}
            className="form-control"
            placeholder="İsim giriniz"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Açıklama:</label>
          <input
            type="text"
            name="description"
            value={itemData.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Açıklama giriniz"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Kategori:</label>
          <input
            type="text"
            name="category"
            value={itemData.category}
            onChange={handleChange}
            className="form-control"
            placeholder="Kategori giriniz"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Durum:</label>
          <input
            type="text"
            name="condition"
            value={itemData.condition}
            onChange={handleChange}
            className="form-control"
            placeholder="Durum giriniz"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fiyat:</label>
          <input
            type="number"
            name="price"
            value={itemData.price}
            onChange={handleChange}
            className="form-control"
            placeholder="Fiyat giriniz"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fotoğraflar:</label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            multiple
            className="form-control"
          />
          <small className="text-muted">En fazla 5 fotoğraf yükleyebilirsiniz.</small>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Güncelle
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UpdatePetForm;
