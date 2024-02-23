import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { getMyOrders } from "../../Features/Orders/orderSlice";
import { Link, useNavigate } from "react-router-dom";

export default function MyOrders() {
  const navigate = useNavigate;
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders || []);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("login");
      alert("Please login to access your orders.");
    }
  }, []);

  useEffect(() => {
    console.log(orders);
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          {orders.length < 1 ? (
            <div className="flex justify-center items-center">
              <div className="flex flex-col gap-1 items-center">
                <i className="bi text-[50px] text-red-400 bi-cart-x-fill"></i>
                <h1 className="text-gray-700 font-semibold text-xl">
                  You have not ordered any product yet.
                </h1>
                <Link
                  to={"/products"}
                  className="p-2 mt-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 duration-200"
                >
                  View products
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-red-500 sm:text-sm text-xs text-white py-2 font-semibold grid grid-cols-5 place-items-center w-full justify-around">
                <h1>Order ID</h1>
                <h1>Status</h1>
                <h1>Items Qty</h1>
                <h1>Amount</h1>
                <h1>Actions</h1>
              </div>

              <div>
                {orders &&
                  orders.map((item) => (
                    <div
                      className=" sm:text-sm text-[8px] text-gray-700 py-4 font-semibold grid grid-cols-5 place-items-center w-full justify-around"
                      key={item.id}
                    >
                      <h1 className="text-[5px] lg:text-sm sm:text-[8px]">
                        #{item._id}
                      </h1>
                      <h1
                        className={
                          item.orderStatus == "Processing"
                            ? "text-red-400"
                            : "text-green-600"
                        }
                      >
                        {item.orderStatus}
                      </h1>
                      <h1>{item.orderItems.length}</h1>
                      <h1>₹{item.totalPrice}</h1>
                      <h1>
                        <Link to={`order/${item._id}`} state={item}>
                          {" "}
                          <i className="bi hover:text-red-500 duration-150 font-bold cursor-pointer bi-box-arrow-up-right"></i>
                        </Link>{" "}
                      </h1>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
