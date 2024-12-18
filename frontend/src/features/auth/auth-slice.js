// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios-config';
import axios from "axios";

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/v1/register', userData);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Login işlemi
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/v1/login', userData);
      localStorage.setItem('token', response.data.token); // Token'ı localStorage'a kaydediyoruz
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const verifyRecaptcha = createAsyncThunk(
  "recaptcha/verify",
  async (captchaValue, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/verify-captcha", {
        captchaValue,
      });
      return response.data; // Backend'den gelen yanıt
    } catch (error) {
      return rejectWithValue(error.response?.data || "CAPTCHA doğrulama hatası"); 
    }
  }
);

// Initial state
const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  isVerified: false,
  loading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,             
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Kayıt başarısız';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Giriş başarısız';
      })
      .addCase(verifyRecaptcha.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyRecaptcha.fulfilled, (state) => {
        state.loading = false;
        state.isVerified = true;
      })
      .addCase(verifyRecaptcha.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "CAPTCHA doğrulaması başarısız.";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
