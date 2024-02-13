import "./App.css";
import Footer from "./Components/Layout/Footer/Footer";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Layout/Header/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./Components/User/Cart";
import Profile from "./Components/User/Profile";
import Products from "./Components/Products";
import Login from "./Components/User/Login";
import SignUp from "./Components/User/SignUp";
import ContactUs from "./Components/ContactUs";
import AboutUs from "./Components/AboutUs";
import ProductDetails from "./Components/ProductDetails";
import CheckoutPage from "./Components/Checkout";

function App() {
  return (
    <>
      <Router >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route exact path="/cart" element={<Cart />} /> */}
          {/* <Route exact path="/profile" element={<Profile />} /> */}
          {/* <Route exact path="/products" element={<Products />} /> */}
          {/* <Route exact path="/login" element={<Login />} /> */}
          {/* <Route exact path="/signup" element={<SignUp />} /> */}
          {/* <Route exact path="/about" element={<AboutUs />} /> */}
          {/* <Route exact path="/contact" element={<ContactUs />} /> */}
          {/* <Route exact path="/product/:id" element={<ProductDetails />} /> */}
          {/* <Route exact path="/product" element={<ProductDetails />} /> */}
          {/* <Route exact path="/checkout" element={<CheckoutPage />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
