import React, { useEffect, useState } from "react";

const Cart = () => {
  const cart = localStorage.getItem("cart");
  const [cartItems, setCartItems] = useState(cart ? JSON.parse(cart) : []);

  const handleCartQuantityhange = (itemId, sign) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        item.quantity += sign === "+" ? (item.stock > item.quantity && 1) : item.quantity > 1 && -1;
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  useEffect(() => {
    // console.log(cartItems);
  }, [cartItems]);

  return (
    <>
      <div className="bg-red-500 sm:text-sm text-xs text-white font-semibold flex sm:justify-between py-4">
        <div className="flex w-full justify-between ">
          <h1 className="pl-4">Product</h1>
          <div className="flex justify-around w-[50%]">
            <h1>Quantity</h1>
            <h1>Subtotal</h1>
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="py-2 mx-2 text-xs sm:text-sm gap-2 flex flex-col">
          {cartItems.map((item) => (
            <li
              className="w-full flex text-gray-600 font-semibold px-2 py-2 rounded-lg"
              key={item.id}
            >
              <div className="flex w-[50%] gap-[5%] items-center">
                <div className="sm:w-24 w-16">
                  <img src={item.imageUrl} alt="product" />
                </div>

                <div className="flex flex-col gap-1 items-start">
                  <h1 className=" ">{item.name}</h1>
                  <h1 className=" ">Price : {item.price}</h1>
                  <button
                    className="hover:text-red-400 duration-200 text-red-300"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex w-[50%] items-center justify-around">
                <div className="rounded overflow-hidden bg-red-200 w-16 sm:w-28 flex">
                  <button
                    onClick={() => handleCartQuantityhange(item.id, "-")}
                    className="sm:px-4 px-2 flex justify-center items-center bg-gray-500 hover:bg-gray-600 text-white"
                  >
                    -
                  </button>
                  <input
                    className="bg-gray-100 w-full py-1 sm:py-2 outline-none text-gray-700"
                    value={item.quantity}
                    type="text"
                    readOnly
                    name="cartQuantity"
                  />
                  <button
                    onClick={() => handleCartQuantityhange(item.id, "+")}
                    className="sm:px-4 px-2 flex justify-center items-center bg-gray-500 hover:bg-gray-600 text-white"
                  >
                    +
                  </button>
                </div>
                <div>
                  <h1 className="">₹{(item.price * item.quantity).toFixed(2)}</h1>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex sm:items-end flex-col p-4">
        <div className="sm:w-[50%] w-full mb-2 h-24 flex justify-between sm:justify-around items-center border-solid border-red-400  border-t-2 my-2">
          <p className="sm:text-lg text-gray-700 font-bold">Gross Total:</p>
          <span>₹{calculateTotal()}</span>
        </div>
        <div className="flex sm:w-[50%]  justify-center">
          <button className=" bg-red-500 w-full sm:w-[70%] text-white hover:bg-gray-800 duration-200 p-2 rounded-full">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
