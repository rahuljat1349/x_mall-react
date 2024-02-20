import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Features/Cart/cartSlice";
import productsReducer from "../Features/Products/productSlice";
import userSlice from "../Features/User/userSlice";


// 
// 
// 


const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    user:userSlice,
  },
});

export default store;
