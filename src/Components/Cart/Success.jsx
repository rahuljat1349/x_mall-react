import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-screen bg-slate-200 flex justify-center items-center w-full">
        <div className="flex  flex-col justify-center items-center">
          <i className="bi text-red-500 text-[70px] bi-check-circle-fill" />
          <p>
            Your order has been placed, You can{" "}
            <Link to={"/products"} className="text-red-500 underline">
              Continue
            </Link>{" "}
            shopping.
          </p>
          <Link
            to={"/orders"}
            className="bg-red-500 hover:bg-red-600 rounded-md p-2 text-white my-3"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </>
  );
}
