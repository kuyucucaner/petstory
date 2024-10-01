import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Evcil hayvanları getirme
export const fetchPets = createAsyncThunk('pets/fetchPets', async () => {
  const response = await axios.get('http://localhost:5000/api/v1/pet');
  return response.data;
});

// Tek bir evcil hayvanı getirme
export const fetchPetById = createAsyncThunk('pets/fetchPetById', async (id) => {
  const response = await axios.get(`http://localhost:5000/api/v1/pet/${id}`);
  return response.data;
});

// Evcil hayvan oluşturma
export const createPet = createAsyncThunk('pets/createPet', async (newPet) => {
  const response = await axios.post('http://localhost:5000/api/v1/pet/create', newPet);
  return response.data;
});

// Evcil hayvan güncelleme
export const updatePet = createAsyncThunk('pets/updatePet', async ({ id, updatedData }) => {
  const response = await axios.put(`http://localhost:5000/api/v1/pet/${id}`, updatedData);
  return response.data;
});

// Evcil hayvan silme
export const deletePet = createAsyncThunk('pets/deletePet', async (id) => {
  await axios.delete(`http://localhost:5000/api/v1/pet/${id}`);
  return id;
});

const petSlice = createSlice({
  name: 'pets',
  initialState: {
    pets: [],
    selectedPet: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Evcil hayvanları fetch işlemleri
      .addCase(fetchPets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Tek bir evcil hayvanı fetch işlemleri
      .addCase(fetchPetById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedPet = action.payload;
      })
      // Evcil hayvan ekleme
      .addCase(createPet.fulfilled, (state, action) => {
        state.pets.push(action.payload);
      })
      // Evcil hayvan güncelleme
      .addCase(updatePet.fulfilled, (state, action) => {
        const index = state.pets.findIndex(pet => pet._id === action.payload._id);
        if (index !== -1) {
          state.pets[index] = action.payload;
        }
      })
      // Evcil hayvan silme
      .addCase(deletePet.fulfilled, (state, action) => {
        state.pets = state.pets.filter(pet => pet._id !== action.payload);
      });
  }
});

export default petSlice.reducer;