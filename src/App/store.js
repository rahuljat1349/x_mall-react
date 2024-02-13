import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Features/Cart/cartSlice"; // You'll need to create this file
import productsReducer from "../Features/Products/productSlice"; // You'll need to create this file

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    // Add more reducers as needed
  },
});

export default store;
