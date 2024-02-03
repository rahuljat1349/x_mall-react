import React from "react";
import BasicCard from "./Home components/BasicCard";
import ProductsContainer from "./Home components/ProductsContainer";
import SliderCarousel from "./Home components/Carousel";

export default function Home() {
  return (
    <>
      <div className="w-full text-[12px] text-gray-500 md:px-20 px-4 py-3 flex ">
        <ul className="flex w-full py-4 justify-around">
          <li className="rounded-full shadow-md hover:bg-red-400 duration-200 bg-red-300 w-10 h-10 md:w-16 md:h-16 border-solid border-2 border-gray-400">
            <img src="" alt="" />
          </li>
          <li className="rounded-full shadow-md hover:bg-red-400 duration-200 bg-red-300 w-10 h-10 md:w-16 md:h-16 border-solid border-2 border-gray-400">
            <img src="" alt="" />
          </li>
          <li className="rounded-full shadow-md hover:bg-red-400 duration-200 bg-red-300 w-10 h-10 md:w-16 md:h-16 border-solid border-2 border-gray-400">
            <img src="" alt="" />
          </li>
          <li className="rounded-full shadow-md hover:bg-red-400 duration-200 bg-red-300 w-10 h-10 md:w-16 md:h-16 border-solid border-2 border-gray-400">
            <img src="" alt="" />
          </li>
          <li className="rounded-full shadow-md hover:bg-red-400 duration-200 bg-red-300 w-10 h-10 md:w-16 md:h-16 border-solid border-2 border-gray-400">
            <img src="" alt="" />
          </li>
          <li className="rounded-full shadow-md hover:bg-red-400 duration-200 bg-red-300 w-10 h-10 md:w-16 md:h-16 border-solid border-2 border-gray-400">
            <img src="" alt="" />
          </li>
        </ul>
      </div>
      {/* Slider */}

      <SliderCarousel />

      {/* Slider Ends */}

      <div className="w-full text-gray-700 justify-around text-center md:px-10 px-4 py-12 flex">
        <div>
          <i className="bi md:text-3xl sm:text-2xl bi-truck"></i>
          <h1 className="md:text-2xl text-sm">Fast, Free shipping</h1>
          <p className="text-gray-500 text-sm md:text-xl">On order over $100</p>
        </div>
        <div>
          <i className="bi md:text-3xl sm:text-2xl bi-arrow-return-left"></i>
          <h1 className="md:text-2xl text-sm">30-Day Free Returns</h1>
          <p className="text-gray-500 text-sm md:text-xl">
            All shipping methods
          </p>
        </div>
        <div>
          <i className="bi md:text-3xl sm:text-2xl bi-headset"></i>
          <h1 className="md:text-2xl text-sm">Ecpert Customer Service</h1>
          <p className="text-gray-500 text-sm md:text-xl">
            Choose chat or call us
          </p>
        </div>
      </div>

      {/* BestDellers */}
      <div className="bg-slate-100 px-4 justify-around py-16 items-center gap-2 flex w-full h-[40vh] sm:h-[60vh]">
        <div className=" gap-2 flex  w-[30vw] flex-col">
          <h1 className="md:text-2xl text-gray-700">#BestSellers</h1>
          <p className="hidden text-xs text-gray-500 text-wrap md:text-sm sm:block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum aliquid
            porro quo nihil rem laboriosam dolorem, assumenda ipsam vitae
            delectus.
          </p>
        </div>

        <BasicCard />

        <BasicCard />

        <BasicCard />
      </div>
      {/*  */}
      <div className="w-full md:text-4xl  gap-1 items-center text-gray-700 px-6 py-16 flex justify-evenly">
        <h1 className="shadow-sm py-4 px-2 text-center rounded-xl bg-red-50 duration-200">
          New Arrival
        </h1>
        <h1 className="shadow-sm py-4 px-2 text-center rounded-xl bg-red-50 duration-200">
          Top Rated
        </h1>
        <h1 className="shadow-sm py-4 px-2 text-center rounded-xl bg-red-50 duration-200">
          On Sale
        </h1>
      </div>
      {/*  */}

      <ProductsContainer />
      {/*  */}
      <div className="flex mt-[1rem] mb-[1rem] w-full text-center justify-center ">
        <button className="border-[1px] text-gray-700 border-solid border-red-300 rounded-md p-2 hover:text-white font-semibold hover:bg-red-300 duration-200">
          View more products
        </button>
      </div>
      {/*  */}
      <div className="px-4 py-6 w-full ">
        <div className=" flex flex-col gap-8 border-gray-500 w-full p-12 border-solid border-2">
          <div>
            <h1 className="text-3xl font-semibold text-gray-600">
              Hot Deal This Week
            </h1>
            <p className="text-gray-400">Remains untill the end of offer</p>
          </div>
          <div className="flex justify-between">
            <BasicCard />
            <BasicCard />
            <BasicCard />
          </div>
        </div>
      </div>

      {/* 
      
      */}
    </>
  );
}
