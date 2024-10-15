import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Tek bir kullanıcıyı getirme
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id) => {
    const response = await axios.get(`http://localhost:5000/api/v1/user/${id}`);
    return response.data;
  }
);

// Kullanıcı güncelleme
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/user/${id}`,
        updatedData
      );
      console.log("Response from server:", response.data);  // Verinin gelip gelmediğini kontrol edin
      return response.data;
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// Kullanıcı silme
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id) => {
    await axios.delete(`http://localhost:5000/api/v1/user/${id}`);
    return id;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [], // users state'i burada tanımlanmış
    selectedUser: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Tek bir kullanıcıyı fetch işlemleri
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedUser = action.payload;
      })
      // Kullanıcı güncelleme
      .addCase(updateUser.fulfilled, (state, action) => {
        // Güncelleme başarılı olduğunda
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        // Güncelleme başarısız olduğunda
        state.error = action.payload || "Güncelleme başarısız oldu.";
      })
      // Kullanıcı silme
      .addCase(deleteUser.fulfilled, (state, action) => {
        if (state.users && state.users.length > 0) {
          state.users = state.users.filter((user) => user._id !== action.payload);
        }
      });
  },
});

export default userSlice.reducer;
