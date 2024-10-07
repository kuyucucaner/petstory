import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Evcil hayvanları getirme
export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await axios.get("http://localhost:5000/api/v1/item");
  return response.data;
});
// Evcil hayvan oluşturma
export const createItem = createAsyncThunk("items/createItem", async (newItem) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/item/create",
    newItem
  );
  return response.data;
});

const itemSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    selectedItem: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Evcil hayvanları fetch işlemleri
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Evcil hayvan ekleme
      .addCase(createItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

  },
});

export default itemSlice.reducer;
