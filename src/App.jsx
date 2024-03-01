import "./App.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "./Components/Layout/Footer/Footer";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Layout/Header/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./Components/User/Cart";
import Profile from "./Components/User/Profile";
import Products from "./Components//Product/Products";
import Login from "./Components/User/Login";
import SignUp from "./Components/User/SignUp";
import ContactUs from "./Components/Layout/Extra/ContactUs";
import AboutUs from "./Components/Layout/Extra/AboutUs";
import ProductDetails from "./Components/Product/ProductDetails";
import Search from "./Components/Layout/SearchBox/Search";
import Logout from "./Components/User/Logout";
import Shipping from "./Components/Cart/Shipping";
import Confirm from "./Components/Cart/Confirm";

import { useEffect, useState } from "react";
import Payment from "./Components/Cart/Payment";
import MyOrders from "./Components/Order/MyOrders";
import OrderDetails from "./Components/Order/OrderDetails";
import Dashboard from "./Components/Admin/Dashboard";
import ProductList from "./Components/Admin/ProductList";
import OrdersList from "./Components/Admin/OrdersList";
import AddProduct from "./Components/Admin/AddProduct";
import ProcessOrder from "./Components/Admin/ProcessOrder";
import UsersLIst from "./Components/Admin/UsersLIst";
import UpdateUser from "./Components/Admin/UpdateUser";
import ReviewsList from "./Components/Admin/ReviewsList";
function App() {
  // const [stripeApiKey, setStripeApiKey] = useState("");

  
  const stripePromise = loadStripe(
    "pk_test_51OmbTCSAfvlVDoiIudw7sPpMU7Ql4kx9JxA4c6igLUHz2rrTGozjhBgzIjQ23w3RMrX6PsAulOuo6BQB2KoYMZgw00pjmy4T5q"
  );

 
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/orders" element={<OrdersList />} />
          <Route path="/admin/reviews" element={<ReviewsList />} />
          <Route path="/admin/users" element={<UsersLIst />} />
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
          <Route path="/admin/user/:id" element={<UpdateUser />} />
          <Route path="/admin/add" element={<AddProduct />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/orders/order/:id" element={<OrderDetails />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/confirm" element={<Confirm />} />
          <Route exact path="/profile" element={<Profile />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/about" element={<AboutUs />} />
          <Route exact path="/contact" element={<ContactUs />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="products/product/:id" element={<ProductDetails />} />
          <Route
            path="products/:keyword/product/:id"
            element={<ProductDetails />}
          />
          {/* <Route exact path="/product" element={<ProductDetails />} /> */}
          <Route exact path="/shipping" element={<Shipping />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
