import React from "react";
import { Link } from "react-router-dom";
import SimpleModal from "./Modal";

export default function Profile() {
  return (
    <>
      <div className="w-[100vw] py-8 flex justify-center">
        <div className="sm:w-[70%] sm:p-8  mt-12 justify-between flex flex-col h-[45vh] w-[60%] md:h-[70vh] sm:h-[50vh] lg:w-[60%] shadow-2xl rounded-3xl">
          <div className="sm:-mb-14 -mb-6 gap-4 w-full p-2 flex justify-between ">
            <div>
              <Link
                to={"/cart"}
                className="flex text-[7px] sm:text-[10px] md:text-[12px] gap-1 border-2 border-solid border-red-400 sm:p-2 p-1 rounded-lg text-red-400 items-center hover:bg-red-400 hover:text-white duration-200"
              >
                <i className="bi hover:text-white text-sm sm:text-xl bi-cart"></i>
                <span>Go to Cart</span>
              </Link>
            </div>
            <div className=" shadow-lg shadow-gray-400 overflow-hidden relative sm:-top-20 -top-12 rounded-full">
              <img
                className="sm:w-36 sm:h-36 md:w-44 md:h-44 h-14 w-14 rounded-full "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ihS3fAvKqH5iJ5R3j5KR7VXd5aoYVlbk5cmTyy-y0vU90nCYkWvsRXdQfAy02AgoZ8k&usqp=CAU"
                alt=""
              />
            </div>
            <div>
              <button className="flex text-[7px] sm:text-[10px] md:text-[12px] gap-1 border-2 border-solid border-red-400 sm:p-2 p-1 rounded-lg text-red-400 items-center hover:bg-red-400 hover:text-white duration-200">
                <SimpleModal />
                <i className="bi hover:text-white text-sm sm:text-xl bi-pencil-square"></i>
              </button>
            </div>
          </div>
          {/*  */}
          <div className=" h-full text-center py-6 px-8 items-center justify-between flex-col flex">
            <div className="flex flex-col gap-2">
              <h1 className="md:text-3xl sm:text-2xl font-bold text-lg">
                Samantha Jones
              </h1>
              <span className="text-gray-600 font-semibold text-sm">
                New York, United States
              </span>
            </div>
            <div className="flex gap-14">
              <div className="flex flex-col">
                <span className="text-2xl font-semibold text-gray-500">28</span>
                <span className="font-semibold text-gray-800">Orders</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-semibold text-gray-500">16</span>
                <span className="font-semibold text-gray-800">Reviews</span>
              </div>
            </div>
            <div>
              <Link
                to={"/products"}
                className="hover:bg-red-500 duration-200 bg-red-400  shadow-lg px-3 sm:px-6 py-4 text-white text-xs rounded-[50px]"
              >
                Explore More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
