import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Features/Cart/cartSlice";
import productsReducer from "../Features/Products/productSlice";


// 
// 
// 


const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

export default store;
