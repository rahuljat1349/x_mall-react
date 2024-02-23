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
import ContactUs from "./Components/ContactUs";
import AboutUs from "./Components/AboutUs";
import ProductDetails from "./Components/Product/ProductDetails";
import Search from "./Components/Layout/SearchBox/Search";
import Logout from "./Components/User/Logout";
import Shipping from "./Components/Cart/Shipping";
import Confirm from "./Components/Cart/Confirm";

import Payment from "./Components/Cart/Payment";

import { useEffect, useState } from "react";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const getStripeApiKey = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/stripeapikey`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch api key");
      }

      const data = await response.json();
      console.log(data);
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
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment stripeApiKey={stripeApiKey} />
                </Elements>
              }
            />
          )}
          <Route path="/" element={<Home />} />
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
