import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Evcil hayvanları getirme
export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await axios.get("http://localhost:5000/api/v1/item");
  return response.data;
});
export const fetchItemById = createAsyncThunk(
  "items/fetchItemById",
  async (id) => {
    const response = await axios.get(`http://localhost:5000/api/v1/item/${id}`);
    return response.data;
  }
);

// Evcil hayvan oluşturma
export const createItem = createAsyncThunk("items/createItem", async (newItem) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/item/create",
    newItem,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
});

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ id, updatedData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/v1/item/${id}`,
      updatedData
    );
    return response.data;
  }
);
// Evcil hayvan silme
export const deleteItem = createAsyncThunk("items/deleteItem", async (id) => {
  await axios.delete(`http://localhost:5000/api/v1/item/${id}`);
  return id;
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
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedItem = action.payload;
      })
      // Evcil hayvan ekleme
      .addCase(createItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Evcil hayvan silme
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
  },
});

export default itemSlice.reducer;
