import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Features/Cart/cartSlice";
import productsReducer from "../Features/Products/productSlice";
import userSlice from "../Features/User/userSlice";
import orderSlice from "../Features/Orders/orderSlice";

//
//
//

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    user: userSlice,
    orders: orderSlice,
  },
});

export default store;
