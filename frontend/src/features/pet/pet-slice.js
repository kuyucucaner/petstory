import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Evcil hayvanları getirme
export const fetchPets = createAsyncThunk("pets/fetchPets", async () => {
  const response = await axios.get("http://localhost:5000/api/v1/pet");
  return response.data;
});

// Tek bir evcil hayvanı getirme
export const fetchPetById = createAsyncThunk(
  "pets/fetchPetById",
  async (id) => {
    const response = await axios.get(`http://localhost:5000/api/v1/pet/${id}`);
    return response.data;
  }
);

export const createPet = createAsyncThunk("pets/createPet", async (newPet) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/pet/create",
    newPet,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
});

// Evcil hayvan güncelleme
export const updatePet = createAsyncThunk(
  "pets/updatePet",
  async ({ id, updatedData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/v1/pet/${id}`,
      updatedData
    );
    return response.data;
  }
);

// Evcil hayvan silme
export const deletePet = createAsyncThunk("pets/deletePet", async (id) => {
  await axios.delete(`http://localhost:5000/api/v1/pet/${id}`);
  return id;
});
// Tıbbi kayıt ekleme
export const addMedicalRecord = createAsyncThunk(
  "pets/addMedicalRecord",
  async ({ petId, medicalRecord }) => {
    const response = await axios.post(
      `http://localhost:5000/api/v1/pet/${petId}/medical-records`,
      medicalRecord
    );
    return response.data;
  }
);
// Tıbbi kayıt silme
export const deleteMedicalRecord = createAsyncThunk(
  'pets/deleteMedicalRecord',
  async ({ petId, recordId }) => {
    const response = await axios.delete(`http://localhost:5000/api/v1/pet/${petId}/medical-records/${recordId}`);
    return response.data; // Silinen tıbbi kayıtları geri dönebilir
  }
);
const petSlice = createSlice({
  name: "pets",
  initialState: {
    pets: [],
    selectedPet: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Evcil hayvanları fetch işlemleri
      .addCase(fetchPets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Tek bir evcil hayvanı fetch işlemleri
      .addCase(fetchPetById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedPet = action.payload;
      })
      // Evcil hayvan ekleme
      .addCase(createPet.fulfilled, (state, action) => {
        state.pets.push(action.payload);
      })
      // Evcil hayvan güncelleme
      .addCase(updatePet.fulfilled, (state, action) => {
        const index = state.pets.findIndex(
          (pet) => pet._id === action.payload._id
        );
        if (index !== -1) {
          state.pets[index] = action.payload;
        }
      })
      // Evcil hayvan silme
      .addCase(deletePet.fulfilled, (state, action) => {
        state.pets = state.pets.filter((pet) => pet._id !== action.payload);
      })
      // Tıbbi kayıt ekleme işlemi
      .addCase(addMedicalRecord.fulfilled, (state, action) => {
        if (state.selectedPet && state.selectedPet._id === action.payload._id) {
          state.selectedPet.medicalRecords = action.payload.medicalRecords; // Güncel tıbbi kayıtları ekle
        }
      })   // Tıbbi kayıt silme işlemi
      .addCase(deleteMedicalRecord.fulfilled, (state, action) => {
        if (state.selectedPet && state.selectedPet._id === action.payload._id) {
          state.selectedPet.medicalRecords = action.payload.medicalRecords; // Silinen kayıtlardan sonra güncelle
        }
      });
  },
});

export default petSlice.reducer;
