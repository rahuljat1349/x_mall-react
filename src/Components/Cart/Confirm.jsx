import React, { useEffect, useState } from "react";
import CheckoutStepper from "./Stepper";
import { useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { useNavigate } from "react-router-dom";

export default function Confirm() {
  const navigate = useNavigate();
  const cart = localStorage.getItem("cart");
  const [cartItems, setCartItems] = useState(cart ? JSON.parse(cart) : []);
  const { user, loading, error } = useSelector((state) => state.user || {});
  const details = localStorage.getItem("shippingDetails");
  const [shippingDetails, setShippingDetails] = useState(
    details ? JSON.parse(details) : []
  );

  const subTotal = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const tax = (subTotal * 0.18).toFixed(2);
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const totalPrice = (
    parseFloat(subTotal) +
    parseFloat(tax) +
    shippingCharges
  ).toFixed(2);
  const address = `${shippingDetails.address},${shippingDetails.city},${shippingDetails.state},${shippingDetails.pinCode},${shippingDetails.country}`;

  const proceedToPayment = () => {
    const letLoginCheck = (async () => {
      let loggedIn = await localStorage.getItem("token");
      if (loggedIn) {
        navigate("/payment");
      } else {
        navigate("/login");
        alert("Please login to confirm your order.");
      }
    })();
    const data = { subTotal, shippingCharges, tax, totalPrice };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="py-4 md:px-6 min-h-screen">
          <div className="py-4">
            <CheckoutStepper currentStep={1} />
          </div>
          <div className="flex md:flex-row justify-between flex-col">
            <div className="md:w-[55%] lg:w-[65%] border-b-[1px] md:border-b-0 md:border-r-[1px] border-gray-300 border-solid flex flex-col gap-6 text-gray-800 px-8 py-2">
              <div>
                <div className="text-xl mb-2">
                  <h1 className="">Shipping Info</h1>
                </div>
                <div className=" p-2 gap-4 flex flex-col md:text-[17px] text-sm ">
                  <div className="flex  gap-8 ">
                    {" "}
                    <h1 className="w-[10%]">Name:</h1>
                    <h1 className="text-gray-500">{user && user.name}</h1>
                  </div>
                  <div className="flex gap-8">
                    {" "}
                    <h1 className="w-[10%]">Phone:</h1>
                    <h1 className="text-gray-500">{shippingDetails.phone}</h1>
                  </div>
                  <div className="flex gap-8">
                    {" "}
                    <h1 className="w-[10%]">Address:</h1>
                    <h1 className="text-gray-500">{address}</h1>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xl">
                  <h1 className="">Your Cart Items:</h1>
                </div>
                <div>
                  <ul className="py-2 text-xs sm:text-sm gap-4 flex flex-col">
                    {cartItems.map((item) => (
                      <li
                        className="w-full flex text-gray-500 font-semibold py-4 rounded-lg"
                        key={item.id}
                      >
                        <div className="flex w-[50%] gap-[5%] items-center">
                          <div className="md:w-20 w-16">
                            <img src={item.imageUrl} alt="product" />
                          </div>

                          <div className="flex items-start">
                            <h1 className=" ">{item.name}</h1>
                          </div>
                        </div>
                        <div className="flex w-[50%] items-center justify-around">
                          <div className="flex gap-2">
                            <h1>
                              {" "}
                              {item.quantity} x ₹{item.price} =
                            </h1>
                            <h1 className="text-gray-700">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="md:w-[40%]  lg:w-[30%] p-2 text-gray-700 font-medium ">
              <div className="flex justify-center items-center gap-4 py-2 px-6 flex-col">
                <h1 className="text-2xl text-gray-700 pb-2 border-solid border-gray-300 border-b-[1px] w-full text-center">
                  Order Summery
                </h1>
                <div className="flex w-full justify-between">
                  <span>Subtotal</span>
                  <span className="text-gray-500">₹{subTotal}</span>
                </div>
                <div className="flex w-full justify-between">
                  <span>Shipping Charges</span>
                  <span className="text-gray-500">₹{shippingCharges}</span>
                </div>
                <div className="flex border-gray-300 border-solid border-b-[1px] pb-4 w-full justify-between">
                  <span>GST</span>
                  <span className="text-gray-500">₹{tax}</span>
                </div>
                <div className="flex my-2 w-full justify-between">
                  <span className="text-gray-700 font-semibold">Total</span>
                  <span className="text-gray-800">₹{totalPrice}</span>
                </div>
                <div className="w-full">
                  <button
                    onClick={proceedToPayment}
                    className="w-full bg-red-500 hover:bg-red-600 duration-200 text-white rounded p-2"
                  >
                    Proceed to payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
