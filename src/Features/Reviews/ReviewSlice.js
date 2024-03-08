// productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  Reviews: [],
  error: null,
};

const apiUrl = import.meta.env.VITE_API_URL;

// Get  Reviews
export const getReviews = createAsyncThunk(
  "products/getReviews",
  async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token available");
    }
    try {
      const response = await fetch(
        `${apiUrl}/api/v1/reviews?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get product reviews");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);
// Delete  Reviews
export const deleteReviews = createAsyncThunk(
  "products/deleteReviews",
  async ({productId, id}) => {
    console.log(productId,id);
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token available");
    }
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/reviews?productId=${productId}&id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product reviews");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    // Add any additional synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.Reviews = action.payload;
      })

      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(deleteReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reviewSlice.reducer;
