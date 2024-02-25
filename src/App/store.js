import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Features/Cart/cartSlice";
import productsReducer from "../Features/Products/productSlice";
import userSlice from "../Features/User/userSlice";
import orderSlice from "../Features/Orders/orderSlice";
import ReviewSlice from "../Features/Reviews/ReviewSlice";

//
//
//

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    user: userSlice,
    orders: orderSlice,
    reviews:ReviewSlice
  },
});

export default store;
