import "./App.css";
import Footer from "./Components/Layout/Footer/Footer";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Layout/Header/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./Components/Cart/Cart";
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

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
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
