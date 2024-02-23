// productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const getMyOrders = createAsyncThunk(
  "products/getMyOrders",
  async () => {
 const token = localStorage.getItem("token");

 if (!token) {
   // Handle the case when the token is not available
   throw new Error("No token available");
 }
    try {
      const response = await fetch("http://localhost:4000/api/v1/orders/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to Load user info");
      }

      const data = await response.json();

      return data; 
    } catch (error) {
      throw error;
    }
  }
);


const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Add any additional synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload.orders;
      })

      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
