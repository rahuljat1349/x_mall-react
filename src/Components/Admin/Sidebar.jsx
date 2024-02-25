import React from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StorageIcon from "@mui/icons-material/Storage";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { Link } from "react-router-dom";

export default function Sidebar({ color }) {
  return (
    <>
      <div className="border-solid text-xs sm:text-lg border-gray-200 border-r-[1px] py-6 bg-slate-100 flex justify-start sm:gap-12 items-center flex-row sm:flex-col  sm:w-[20%]">
        <hr />
        <Link
          to={"/dashboard"}
          className={`hover:scale-110 hover:text-red-400 ${
            color == "dashboard" ? "text-red-400" : "text-gray-500"
          } w-full duration-200  flex sm:flex-row flex-col sm:justify-start sm:px-4 justify-center items-center hover:cursor-pointer`}
        >
          <DashboardIcon />
          <span> Dashboard</span>
        </Link>
        <Link
          to={"/admin/products"}
          className={`hover:scale-110 hover:text-red-400 ${
            color == "products" ? "text-red-400" : "text-gray-500"
          } w-full duration-200  flex sm:flex-row flex-col sm:justify-start sm:px-4 justify-center items-center hover:cursor-pointer`}
        >
          <StorageIcon /> <span> Products</span>
        </Link>
        <Link
          to={"/admin/orders"}
          className={`hover:scale-110 hover:text-red-400 ${
            color == "orders" ? "text-red-400" : "text-gray-500"
          } w-full duration-200  flex sm:flex-row flex-col sm:justify-start sm:px-4 justify-center items-center hover:cursor-pointer`}
        >
          <ReceiptIcon />
          <span> Orders</span>
        </Link>
        <Link
          to={"/admin/add"}
          className={`hover:scale-110 hover:text-red-400 ${
            color == "add" ? "text-red-400" : "text-gray-500"
          } w-full duration-200  flex sm:flex-row flex-col sm:justify-start sm:px-4 justify-center items-center hover:cursor-pointer`}
        >
          <AddBoxIcon />
          <span>Add</span>
        </Link>
        <Link
          to={"/admin/users"}
          className={`hover:scale-110 hover:text-red-400 ${
            color == "users" ? "text-red-400" : "text-gray-500"
          } w-full duration-200  flex sm:flex-row flex-col sm:justify-start sm:px-4 justify-center items-center hover:cursor-pointer`}
        >
          <PeopleAltIcon />
          <span>Users</span>
        </Link>
        <Link
          to={"/admin/reviews"}
          className={`hover:scale-110 hover:text-red-400 ${
            color == "reviews" ? "text-red-400" : "text-gray-500"
          } w-full duration-200  flex sm:flex-row flex-col sm:justify-start sm:px-4 justify-center items-center hover:cursor-pointer`}
        >
          <ReviewsIcon />
          <span>Reviews</span>
        </Link>
      </div>
    </>
  );
}
