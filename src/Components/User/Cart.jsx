import React, { useEffect, useState } from "react";

const Cart = () => {
  const cart = localStorage.getItem("cart");
  const [cartItems, setCartItems] = useState(cart ? JSON.parse(cart) : []);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  useEffect(() => {
    // console.log(cartItems);
  }, [cartItems]);

  return (
    <>
      <div className="bg-red-500 sm:text-sm text-xs text-white font-semibold rounded mx-4 my-2 flex sm:justify-between py-4">
        <div className="flex px-2 w-full justify-between ">
          <h1>Product</h1>
          <div className="flex justify-start gap-[10%]  mr-[20%] w-[30%]">
            <h1>Quantity</h1>
            <h1>Subtotal</h1>
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="pb-4 py-1 mx-4 text-xs sm:text-sm gap-2 flex flex-col">
          {cartItems.map((item) => (
            <li
              className="w-full flex relative text-gray-600 font-semibold justify-start px-2 py-3 bg-gray-100 rounded-lg"
              key={item.id}
            >
              <div className="flex w-full gap-1 items-center justify-between ">
                <div className="w-[50%] flex gap-2 items-center">
                  <div className="w-14 rounded overflow-hidden">
                    <img src={item.imageUrl} alt="product" />
                  </div>
                  <h1 className="w-[50%] ">{item.name}</h1>
                </div>
                <div className="flex gap-[10%] px-6 justify-start mr-[20%] w-[30%]">
                  <h1>{item.quantity}</h1>
                  <h1 className="pl-6">{item.price * item.quantity}</h1>
                </div>
              </div>
              <div className="absolute top-0 h-full right-[3%] flex justify-center">
                {" "}
                <button
                  className=" text-white"
                  onClick={() => removeFromCart(item.id)}
                >
                  <span className="bg-gray-700 text-[9px] sm:p-2 sm:text-xs px-1 py-2 rounded">
                    Remove
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="w-full mb-2 h-24 flex justify-around px-4 md:px-20 items-center font-bold text-red-500 bg-red-200">
        <p>Total: ₹{calculateTotal()}</p>
        <button className="border-red-600 border-solid border-[1px] hover:bg-red-300 duration-200 p-2 rounded-xl">
          Order Now
        </button>
      </div>
    </>
  );
};

export default Cart;
