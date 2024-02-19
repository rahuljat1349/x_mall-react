// productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
  error: null,
  selectedProduct: {},
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (keyword) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/products/${
          keyword ? `search?key=${keyword}` : ""
        }`  
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data.products;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/product/${productId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch product with ID: ${productId}`);
      }
      const data = await response.json();
      return data.product;
    } catch (error) {
      throw error;
    }
  }
);
// export const searchProducts = createAsyncThunk(
//   "products/searchProducts",
//   async (keyword) => {
//     try {
//       const response = await fetch(
//         `http://localhost:4000/api/v1/product/${productId}`
//       );
//       if (!response.ok) {
//         throw new Error(`Failed to fetch product with ID: ${productId}`);
//       }
//       const data = await response.json();
//       return data.product;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Add any additional synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    // .addCase(searchProducts.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(searchProducts.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.selectedProduct = action.payload;
    // })
    // .addCase(searchProducts.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  },
});

export default productsSlice.reducer;
