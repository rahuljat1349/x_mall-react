import React from "react";
import BasicCard from "../Home components/BasicCard";
import ProductsContainer from "../Home components/ProductsContainer";
import SliderCarousel from "../Home components/Carousel";
import { Link } from "react-router-dom";
import Product from "./Product";

const product = {
  name: "Blue T-shirt for Men",
  images: [
    {
      url: "https://i.etsystatic.com/28984889/r/il/4b3c00/3184764971/il_1140xN.3184764971_fyqq.jpg",
    },
  ],
  _id: "abhishek",
  price: "3000",
};

export default function Home() {
  return (
    <>
      <div className="flex home-scroll flex-col pt-24 h-screen gap-20 w-full justify-center items-center bg-gray-900 text-white">
        <h3 className="font-semibold">Welcome to xMall.</h3>
        <h1 className="text-3xl text-center font-semibold">
          Find Amazing products Below.
        </h1>
        <a href="#featured-products">
          <button
            href="#featured-products"
            className="bg-white px-6 py-2 border-white border-[1px] rounded-sm border-solid duration-200 text-black hover:bg-transparent hover:text-white"
          >
            <span> Scroll </span>
            <i className="bi bi-mouse"></i>
          </button>
        </a>
      </div>
      <div className=" flex justify-center">
        <div>
          <h1
            id="featured-products"
            className=" md:text-xl p-2 md:w-[20vw] text-gray-700 font-medium mb-4 text-center border-gray-500 border-solid border-b-[1px]"
          >
            Featured Products
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 place-items-center w-[90vw] lg:grid-cols-4 p-4 gap-4">
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
        </div>
      </div>
    </>
  );
}
