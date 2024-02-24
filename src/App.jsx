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
import Payment from "./Components/Cart/payment";
import MyOrders from "./Components/Order/MyOrders";
import OrderDetails from "./Components/Order/OrderDetails";
import Dashboard from "./Components/Admin/Dashboard";
import ProductList from "./Components/Admin/ProductList";
import OrdersList from "./Components/Admin/OrdersList";
import AddProduct from "./Components/Admin/AddProduct";
function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/stripeapikey`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch api key");
      }

      const data = await response.json();
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getStripeApiKey();
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {stripeApiKey && (
            <Route
              path="/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey && stripeApiKey)}>
                  <Payment stripeApiKey={stripeApiKey} />
                </Elements>
              }
            />
          )}
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/productslist" element={<ProductList />} />
          <Route path="/admin/orders" element={<OrdersList />} />
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
          {/* <Route exact path="/about" element={<AboutUs />} /> */}
          {/* <Route exact path="/contact" element={<ContactUs />} /> */}
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
