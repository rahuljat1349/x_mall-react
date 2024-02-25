import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";
import { getSingleOrder } from "../../Features/Orders/orderSlice";
import { updateOrder } from "../../Features/Orders/orderSlice";
import Sidebar from "./Sidebar";

export default function ProcessOrder() {
  const id = useParams().id;
  const { user, error } = useSelector((state) => state.user || {});
  const { singleOrder, loading } = useSelector((state) => state.orders || []);
  const [status, setStatus] = useState({ status: "" });
  //
  const address = `${singleOrder.order?.shippingInfo.address},${singleOrder?.order?.shippingInfo.city},${singleOrder?.order?.shippingInfo.state},${singleOrder?.order?.shippingInfo.pinCode},${singleOrder?.order?.shippingInfo.country}`;
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("login");
      alert("Please login to access this order.");
    }
  }, []);
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user]);

  const handleStatusUpdate = async () => {
    console.log("trigger status update");
    await dispatch(updateOrder({ id: id, status: status }));
    dispatch(getSingleOrder(id));
  };
  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex sm:flex-row flex-col">
          {" "}
          <Sidebar color={""} />
          <div className="flex md:flex-row min-h-screen w-full justify-between flex-col">
            <div
              className={`${
                singleOrder.order?.orderStatus === "Delivered" &&
                "md:w-full lg:w-full px-8"
              } md:w-[70%] lg:w-[75%] gap-6 w-full border-b-[1px] md:border-b-0 md:border-r-[1px] border-gray-300 border-solid flex flex-col text-gray-800 px-2 py-8`}
            >
              <div>
                <div className="text-xl mb-2">
                  <h1 className="">Shipping Info</h1>
                </div>
                <div className=" p-2 gap-4 flex flex-col lg:text-[17px] text-sm ">
                  <div className="flex  gap-8 ">
                    {" "}
                    <h1 className="w-[10%]">Name:</h1>
                    <h1 className="text-gray-500">{user && user.name}</h1>
                  </div>
                  <div className="flex gap-8">
                    {" "}
                    <h1 className="w-[10%]">Phone:</h1>
                    <h1 className="text-gray-500">
                      {singleOrder.order &&
                        singleOrder.order.shippingInfo.phoneNo}
                    </h1>
                  </div>
                  <div className="flex gap-8">
                    {" "}
                    <h1 className="w-[10%]">Address:</h1>
                    <h1 className="text-gray-500">{address}</h1>
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
                        singleOrder.order?.paymentInfo.status == "succeed"
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {singleOrder.order?.paymentInfo.status == "succeed"
                        ? "PAID"
                        : "DUE"}
                    </h1>
                  </div>
                  <div className="flex gap-8">
                    {" "}
                    <h1 className="w-[10%]">Amount</h1>
                    <h1 className="text-gray-500">
                      ₹{singleOrder.order?.totalPrice}
                    </h1>
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
                      singleOrder.order?.orderStatus == "Delivered"
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {singleOrder.order?.orderStatus}{" "}
                  </h1>
                </div>
              </div>
              <div>
                <div className="text-xl">
                  <h1 className="">Order Items:</h1>
                </div>
                <div>
                  <ul className="py-2 text-xs sm:text-sm gap-4 flex flex-col">
                    {singleOrder.order?.orderItems.map((item) => (
                      <li
                        className="w-full flex text-gray-500 font-semibold py-4 rounded-lg"
                        key={item._id}
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

            <div
              className={`md:w-[40%] ${
                singleOrder.order?.orderStatus === "Delivered" && "hidden"
              } lg:w-[30%] text-gray-700 font-medium `}
            >
              <div className="flex justify-center items-center gap-4 py-2 px-6 flex-col">
                <h1 className="text-2xl text-gray-700 pb-2 border-solid border-gray-300 border-b-[1px] w-full text-center">
                  Process Order
                </h1>

                <div className="flex border-gray-300 border-solid border-b-[1px] pb-4 w-full justify-between">
                  <select
                    onChange={(e) => {
                      setStatus({ status: e.target.value });
                      console.log(status);
                    }}
                    className="w-full"
                  >
                    <option value="">Choose option</option>

                    {singleOrder.order?.orderStatus === "Processing" && (
                      <option value="Shipped">Shipped</option>
                    )}
                    {singleOrder.order?.orderStatus === "Shipped" && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>
                </div>

                <div className="w-full">
                  <button
                    disabled={status.status === ""}
                    onClick={handleStatusUpdate}
                    className="w-full disabled:bg-red-300 bg-red-500 hover:bg-red-600 duration-200 text-white rounded p-2"
                  >
                    Process
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
