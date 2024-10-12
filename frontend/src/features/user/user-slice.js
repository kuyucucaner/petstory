import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Tek bir evcil hayvanı getirme
export const fetchUserById = createAsyncThunk(
  "users/fetchPetById",
  async (id) => {
    const response = await axios.get(`http://localhost:5000/api/v1/user/${id}`);
    return response.data;
  }
);

// Evcil hayvan güncelleme
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updatedData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/v1/user/${id}`,
      updatedData
    );
    return response.data;
  }
);
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
    await axios.delete(`http://localhost:5000/api/v1/user/${id}`);
    return id;
  });
const userSlice = createSlice({
  name: "users",
  initialState: {
    selectedUser: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Tek bir evcil hayvanı fetch işlemleri
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedUser = action.payload;
      })
      // Evcil hayvan güncelleme
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      // Evcil hayvan silme
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((pet) => pet._id !== action.payload);
      })
  },
});

export default userSlice.reducer;
