import Rating from "@mui/material/Rating";
import { red } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Button from "@mui/joy/Button";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Add from "@mui/icons-material/Add";
import Loader from "../Loader";

export default function ProductDetails() {
  const { state } = useLocation();

  return (
    <>
      <div className="w-full font-semibold flex-col  h-[80vh] p-4 items-center sm:px-20 flex ">
        <div className="w-[90%] flex flex-col sm:flex-row justify-evenly items-center p-2 rounded-lg shadow-2xl h-full">
          <div className="w-[70%] sm:w-[40%] flex justify-center items-center ">
            <img
              className=""
              src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
              alt=""
            />
          </div>
          <div className="sm:w-[50%]  flex p-2 flex-col  justify-center gap-2 sm:gap-8  ">
            <div>
              <h1 className="text-lg text-gray-700">{state.product.name}</h1>
              <p className="text-xs text-gray-700 text-wrap">
                {state.product.description}
              </p>
            </div>
            <div className="flex items-center">
              <Rating
                name="read-only"
                sx={{
                  color: red[400],
                  "&.Mui-checked": {
                    color: red[600],
                  },
                }}
                defaultValue={state.product.rating}
                readOnly
              />
              <span className="text-red-400">
                ({state.product.numOfReviews} Reviews)
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-red-400">&#8377;{state.product.price}</span>
            </div>
            <div className="flex w-full justify-center gap-12 mt-10 ">
              <button className="text-white text-[11px] sm:text-xs p-1 shadow-lg bg-red-500 md:p-2 rounded flex items-center justify-center hover:bg-white hover:text-red-500 border-red-500 border-solid border-2 duration-200">
                Add to cart
                <Add />
              </button>
              <Link className="flex " to={"/checkout"}>
                <button className="text-white text-[11px] sm:text-xs p-1 shadow-lg bg-red-500 md:p-2 rounded flex items-center justify-center hover:bg-white hover:text-red-500 border-red-500 border-solid border-2 duration-200">
                  Go to checkout <KeyboardArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
