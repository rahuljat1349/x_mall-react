import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  loading: false,
  error: null,
};


export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, quantity }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/product/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }

      const data = await response.json();
      
      return { product: data.product, quantity };
    } catch (error) {
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const { product, quantity } = action.payload;
        const item = {
          name: product.name,
          id: product._id,
          imageUrl: product.images[0].url,
          price: product.price,
          stock: product.stock,
          quantity: quantity,
        };

        // Retrieve items from local storage
        const existingItems = JSON.parse(localStorage.getItem("cart")) || [];

        // Find the index of the item in the local storage items
        const existingIndex = existingItems.findIndex(
          (cartItem) => cartItem.id === item.id
        );

        if (existingIndex !== -1) {
          // If the item already exists, update the quantity
          existingItems[existingIndex].quantity += quantity;
        } else {
          // If the item is not in local storage, add it
          existingItems.push(item);
        }

        // Save the updated cart to local storage
        localStorage.setItem("cart", JSON.stringify(existingItems));

        // Update the state with the items from local storage
        state.items = existingItems;
        alert("Item Added to cart")
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
