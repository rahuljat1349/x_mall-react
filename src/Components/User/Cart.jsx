import React, { useState } from "react";
import ProductsContainer from "../Home components/ProductsContainer";

const Cart = () => {
  const [cartItems, setCartItems] = useState([2]);

  // Function to add an item to the cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };

  // Function to calculate the total price of items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <>
      <h2 className="text-center text-3xl my-3">Your Cart</h2>
      <div className="w-full px-4 md:px-20 py-4 justify-between gap-2 flex flex-wrap">
        {/* {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} - ${item.price}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )} */}

        {/* Static */}

        <ProductsContainer />
      </div>
      <div className="w-full mb-2 h-24 flex justify-around px-4 md:px-20 items-center font-bold text-red-500 bg-red-200">
        <p>Total: ${calculateTotal()}</p>
        <button className="border-red-600 border-solid border-[1px] hover:bg-red-300 duration-200 p-2 rounded-xl">
          Order Now
        </button>
      </div>
    </>
  );
};

export default Cart;
