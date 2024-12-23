import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPetById, deletePet } from "../features/pet/pet-slice";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/pet-detail.css";
import NavbarComponent from "../components/navbar";
import { jwtDecode } from "jwt-decode"; // JWT'yi çözümlemek için

// Helper function to extract userId from token
const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken?.user?.id || null;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  return null;
};

const PetDetail = () => {
  const { petId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPet } = useSelector((state) => state.pet);

  const userId = getUserIdFromToken();

  useEffect(() => {
    dispatch(fetchPetById(petId));
  }, [dispatch, petId]);

  const handleUpdateClick = () => {
    navigate(`/pet/${petId}/update`);
  };

  const handleDelete = () => {
    dispatch(deletePet(petId));
    navigate("/pet");
  };

  return (
    <div>
      <NavbarComponent />
      <div className="container my-5">
        {selectedPet ? (
          <div>
            <h2 className="text-center mb-4">{selectedPet.name} Detayları</h2>
            <div className="card shadow p-4">
              <h5>Genel Bilgiler</h5>
              <p>
                <strong>Tür:</strong> {selectedPet.species}
              </p>
              <p>
                <strong>Yaş:</strong> {selectedPet.age}
              </p>
              <p>
                <strong>Açıklama:</strong> {selectedPet.description}
              </p>

              <h5 className="mt-4">Tıbbi Kayıtlar</h5>
              <ul className="list-group mb-3">
                {selectedPet.medicalRecords?.length > 0 ? (
                  selectedPet.medicalRecords.map((record, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        {record.visitDate} - {record.notes} (Vet: {record.vet})
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">
                    Bu evcil hayvan için tıbbi kayıt bulunamadı.
                  </li>
                )}
              </ul>

              <h5 className="mt-4">Fotoğraflar</h5>
              <div className="d-flex flex-wrap gap-3 mb-4">
                {selectedPet.photo?.slice(0, 6).map((photoUrl, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/${photoUrl}`}
                    alt={`Photo ${index + 1}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    crossOrigin="anonymous"
                  />
                ))}
              </div>

              {userId && (
                <div className="d-flex justify-content-between">
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Sil
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={handleUpdateClick}
                  >
                    Güncelle
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>Detaylar yükleniyor...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetDetail;
