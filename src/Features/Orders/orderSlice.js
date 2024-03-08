// productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  allOrders: [],
  singleOrder: {},
  error: null,
};
const apiUrl = import.meta.env.VITE_API_URL;


export const getMyOrders = createAsyncThunk(
  "products/getMyOrders",
  async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token available");
    }
    try {
      const response = await fetch(`${apiUrl}/api/v1/orders/me`, {
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

export const getAdminOrders = createAsyncThunk(
  "products/getAdminOrders",
  async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token available");
    }
    try {
      const response = await fetch(
        `${apiUrl}/api/v1/admin/orders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

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

// delete order [admin]
export const deleteOrder = createAsyncThunk(
  "products/deleteOrder",
  async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token available");
    }
    try {
      const response = await fetch(
        `${apiUrl}/api/v1/admin/order/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);

// get single order [admin]
export const getSingleOrder = createAsyncThunk(
  "products/getSingleOrder",
  async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token available");
    }
    try {
      const response = await fetch(
        `${apiUrl}/api/v1/admin/order/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to find order");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);

// Update order status [admin]
export const updateOrder = createAsyncThunk(
  "products/updateOrder",
  async ({ id, status }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token available");
    }
    try {
      const response = await fetch(
        `${apiUrl}/api/v1/admin/order/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify(status),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);
// Create an order
export const createOrder = createAsyncThunk(
  "products/createOrder",
  async (orderDetails) => {
    // console.log(orderDetails);
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token available");
    }
    try {
      const response = await fetch(`${apiUrl}/api/v1/order/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      console.log(data);

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
      })
      .addCase(getAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allOrders = action.payload;
      })

      .addCase(getAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSingleOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.singleOrder = action.payload;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(action.error.message);
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(action.error.message);
      });
  },
});

export default orderSlice.reducer;
