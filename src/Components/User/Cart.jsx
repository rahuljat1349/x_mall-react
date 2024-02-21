import React, { useEffect, useState } from "react";

const Cart = () => {
  const cart = localStorage.getItem("cart");
  const [cartItems, setCartItems] = useState(cart ? JSON.parse(cart) : []);

  const handleCartQuantityhange = (itemId, sign) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        item.quantity += sign === "+" ? 1 : item.quantity > 1 && -1;
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
        <div className="flex px-6 w-full justify-between ">
          <h1>Product</h1>
          <div className="flex justify-start gap-[18%]  mr-[20%] w-[30%]">
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
              className="w-full flex relative text-gray-600 font-semibold px-2 py-3 bg-gray-100 rounded-lg"
              key={item.id}
            >
              <div className="flex w-full items-center">
                <div className="sm:w-[50%] w-[47%] flex gap-1 items-center">
                  <div className="w-10 rounded overflow-hidden">
                    <img src={item.imageUrl} alt="product" />
                  </div>
                  <h1 className="w-[50%] ">{item.name}</h1>
                </div>
                <div className="flex w-[50%] ">
                  <div className="rounded overflow-hidden w-16 flex justify-center">
                    <button
                      onClick={() => handleCartQuantityhange(item.id, "-")}
                      className="px-2 flex justify-center items-center bg-gray-700 text-white text-md"
                    >
                      -
                    </button>
                    <input
                      className="bg-white w-[60%] py-1 outline-none text-gray-700"
                      value={item.quantity}
                      type="text"
                      readOnly
                      name="cartQuantity"
                    />
                    <button
                      onClick={() => handleCartQuantityhange(item.id, "+")}
                      className="px-2 flex justify-center items-center bg-gray-700 text-white text-md"
                    >
                      +
                    </button>
                  </div>
                  <h1 className="pl-[8%] sm:pl-[10%]">
                    ₹{item.price * item.quantity}
                  </h1>
                </div>
              </div>
              <div className="absolute top-0 h-full right-[3%] flex justify-center">
                {" "}
                <button
                  className=" text-white"
                  onClick={() => removeFromCart(item.id)}
                >
                  <i className="bi text-gray-500 hover:text-red-400 duration-200 sm:text-xl text-lg bi-trash-fill"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="w-full mb-2 h-24 text-white  flex justify-around px-4 md:px-20 items-center font-bold  bg-slate-500">
        <p>Total: ₹{calculateTotal()}</p>
        <button className=" bg-gray-700 hover:bg-gray-800 duration-200 p-2 rounded">
          Order Now
        </button>
      </div>
    </>
  );
};

export default Cart;
