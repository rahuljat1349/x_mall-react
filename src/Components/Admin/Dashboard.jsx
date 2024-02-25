import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { getAdminProducts } from "../../Features/Products/productSlice";
import { getAdminOrders } from "../../Features/Orders/orderSlice";
import { getAdminUsers } from "../../Features/User/userSlice";
Chart.register(CategoryScale);
export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allOrders } = useSelector((state) => state.orders || []);
  const { allProductsList } = useSelector((state) => state.products || {});
  const { user, loading, allUsers, error } = useSelector(
    (state) => state.user || {}
  );

  let outOfStock = 0;
  allProductsList &&
    allProductsList.map((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["rgb(248,113,113)"],
        hoverBackgroundColor: ["rgb(197,72,49)"],
        data: [0, allOrders.totalAmount && allOrders.totalAmount],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of stock", "In stock"],
    datasets: [
      {
        backgroundColor: ["rgb(248,113,113)", "rgb(107,114,128)"],
        hoverBackgroundColor: ["rgb(239,68,68)", "rgb(75,85,99)"],
        data: [outOfStock, allProductsList.length - outOfStock],
      },
    ],
  };

  useEffect(() => {
    dispatch(getAdminUsers());
    dispatch(getAdminOrders());
    dispatch(getAdminProducts());
    if (!localStorage.getItem("token")) {
      navigate("login");
      alert("Please login to access your products.");
    }
  }, []);
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex sm:flex-row flex-col">
          {/* Sidebar (w-[25%]) */}
          <Sidebar color={"dashboard"} />

          <div className="px-8 flex flex-col gap-4 w-full py-10">
            {/* total amount box */}
            <div className="flex flex-col items-center bg-gray-700 text-white p-2 justify-center w-full">
              <h1>Total Amount:</h1>
              <span className="font-semibold">
                ₹{allOrders.totalAmount && allOrders.totalAmount}/-
              </span>
            </div>
            {/* round boxes */}
            <div className="flex sm:text-lg items-center p-2 justify-evenly w-full">
              <Link
                to={"/admin/products"}
                className="text-white rounded-full bg-red-500 sm:w-32 lg:w-40 w-20 sm:h-32 lg:h-40 h-20 flex justify-center items-center flex-col"
              >
                <span>Products</span>{" "}
                <span>{allProductsList && allProductsList.length}</span>
              </Link>
              <Link
                to={"/admin/users"}
                className="text-white rounded-full bg-violet-500 sm:w-32 lg:w-40 w-20 sm:h-32 lg:h-40 h-20 flex justify-center items-center flex-col"
              >
                <span>Users</span>
                <span>{allUsers && allUsers.length}</span>
              </Link>
              <Link
                to={"/admin/orders"}
                className="text-white rounded-full bg-yellow-500 sm:w-32 lg:w-40 w-20 sm:h-32 lg:h-40 h-20 flex justify-center items-center flex-col"
              >
                <span>Orders</span>
                {allOrders.orders && allOrders.orders.length}
                <span></span>
              </Link>
            </div>
            {/*line chart */}
            <div className="flex justify-center p-4 w-full">
              <Line data={lineState} />
            </div>
            {/* doughnut chart */}
            <div className="flex w-full justify-center">
              <div className="w-[50%]">
                {" "}
                <Doughnut data={doughnutState} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
