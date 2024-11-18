// src/actions/searchActions.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const searchItems = createAsyncThunk(
  'search/searchItems',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/search/search-datas?query=${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
const searchSlice = createSlice({
    name: 'search',
    initialState: {
      results: { items: [], users: [], pets: [] },
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(searchItems.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(searchItems.fulfilled, (state, action) => {
          state.loading = false;
          state.results = action.payload;
        })
        .addCase(searchItems.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default searchSlice.reducer;