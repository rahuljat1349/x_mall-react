// productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
  error: null,
  page: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    totalProducts: 0,
  },
  selectedProduct: {},
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ keyword, price = [0, 25], category, page }) => {
    // console.log("Keyword:", keyword);
    // console.log("Price:", price);
    // console.log("Category:", category);
    try {
      const url = new URL("http://localhost:4000/api/v1/products");
      if (keyword) {
        url.searchParams.append("key", keyword);
      }
      if (category && category !== "ALL") {
        url.searchParams.append("category", category);
      }
      if (price[0] !== 0 || price[1] !== 25) {
        // Assuming 0 and 25 are default values; adjust as needed
        url.searchParams.append("minPrice", price[0] * 1000);
        url.searchParams.append("maxPrice", price[1] * 1000);
      }
      url.searchParams.append("page", page);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return {
        products: data.products,
        page: data.page,
        pageSize: data.pageSize,
        totalPages: data.totalPages,
        totalProducts: data.totalProducts,
      };
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

export const productReview = createAsyncThunk(
  "auth/productReview",
  async ({formData}) => {
    console.log("product review function trigger");
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:4000/api/v1/review", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        alert("Please Enter valid details");
        throw new Error("Failed to update user");
      }

      const data = await response.json();
      alert("Review added successfully.");
      return data;
    } catch (error) {
      throw error;
    }
  }
);

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
        state.list = action.payload.products;
        state.page = {
          currentPage: action.payload.page,
          pageSize: action.payload.pageSize,
          totalPages: action.payload.totalPages,
          totalProducts: action.payload.totalProducts,
        };
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
      })
      .addCase(productReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productReview.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action.payload);
      })
      .addCase(productReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
