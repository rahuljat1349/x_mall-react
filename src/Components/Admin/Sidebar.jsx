import React from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StorageIcon from "@mui/icons-material/Storage";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link } from "react-router-dom";

export default function Sidebar({ color }) {
  return (
    <>
      <div className="border-solid border-gray-200 border-r-[1px] py-6 bg-slate-100 flex justify-start sm:gap-12 items-center flex-row sm:flex-col  sm:w-[20%]">
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
          to={"/admin/productslist"}
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
          <span>Add Product</span>
        </Link>
      </div>
    </>
  );
}
