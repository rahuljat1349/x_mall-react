import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";

export default function OrderDetails() {
  const { user, loading, error } = useSelector((state) => state.user || {});

  let { state } = useLocation();
  useEffect(() => {
    console.log(state);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {!state ? (
            <div className="h-screen text-gray-500 gap-2 flex flex-col justify-center px-10 items-center text-xl font-semibold ">
              <i className="bi text-red-400 text-[50px] bi-exclamation-circle-fill"></i>
              <span>
                You can only access this page from your orders section due to
                security concerns!.{" "}
              </span>
            </div>
          ) : (
            <div className="h-screen px-12 py-8">
              <div className="text-red-500 px-8 text-2xl">
                Order #{state._id}
              </div>
              <div className="md:w-[55%] lg:w-[65%]  flex flex-col gap-6 text-gray-800 px-8 py-2">
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
                      <h1 className="text-gray-500">
                        {state.shippingInfo.phoneNo}
                      </h1>
                    </div>
                    <div className="flex gap-8">
                      {" "}
                      <h1 className="w-[10%]">Address:</h1>
                      <h1 className="text-gray-500">
                        {state.shippingInfo.address}
                      </h1>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xl mb-2">
                    <h1 className="">Payment</h1>
                  </div>
                  <div className=" p-2 gap-4 flex flex-col md:text-[17px] text-sm ">
                    <div className="flex  gap-8 ">
                      {" "}
                      <h1 className="w-[10%]">Status</h1>
                      <h1
                        className={
                          state.paymentInfo.status == "succeed"
                            ? "text-green-600"
                            : "text-red-500"
                        }
                      >
                        {state.paymentInfo.status == "succeed" ? "PAID" : "DUE"}
                      </h1>
                    </div>
                    <div className="flex gap-8">
                      {" "}
                      <h1 className="w-[10%]">Amount</h1>
                      <h1 className="text-gray-500">₹{state.totalPrice}</h1>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xl mb-2">
                    <h1 className="">Order Status</h1>
                  </div>
                  <div className=" p-2 gap-4 flex flex-col md:text-[17px] text-sm ">
                    <h1
                      className={
                        state.orderStatus == "Delivered"
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {state.orderStatus}{" "}
                    </h1>
                  </div>
                </div>
                <div>
                  <div className="text-xl">
                    <h1 className="">Order Items</h1>
                  </div>
                  <div>
                    <ul className="py-2 text-xs sm:text-sm gap-4 flex flex-col">
                      {state.orderItems.map((item) => (
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
            </div>
          )}
        </div>
      )}
    </>
  );
}
