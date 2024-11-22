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
      console.log("Response from server:", response.data); // Verinin gelip gelmediğini kontrol edin
      return response.data;
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Kullanıcı silme
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`http://localhost:5000/api/v1/user/${id}`);
  return id;
});
export const requestPasswordReset = createAsyncThunk(
  "user/requestPasswordReset",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/user/password-reset/request`,
        {
          email,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/user/password-reset/confirm/${token}`,
        { password }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [], // users state'i burada tanımlanmış
    selectedUser: null,
    status: "idle",
    error: null,
    passwordResetRequestStatus: null,
    passwordResetRequestError: null,
    passwordResetStatus: null,
    passwordResetError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestPasswordReset.pending, (state) => {
        state.passwordResetRequestStatus = "loading";
        state.passwordResetRequestError = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.passwordResetRequestStatus = "success";
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.passwordResetRequestStatus = "failed";
        state.passwordResetRequestError = action.payload || "Request failed";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedUser = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.passwordResetStatus = "loading";
        state.passwordResetError = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.passwordResetStatus = "success";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.passwordResetStatus = "failed";
        state.passwordResetError = action.payload || "Reset failed";
      })
      // Kullanıcı güncelleme
      .addCase(updateUser.fulfilled, (state, action) => {
        // Güncelleme başarılı olduğunda
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
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
          state.users = state.users.filter(
            (user) => user._id !== action.payload
          );
        }
      });
  },
});

export default userSlice.reducer;
