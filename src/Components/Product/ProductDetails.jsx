import Rating from "@mui/material/Rating";
import { red } from "@mui/material/colors";
import { grey } from "@mui/material/colors";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleProduct } from "../../Features/Products/productSlice";
import Button from "@mui/joy/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Add from "@mui/icons-material/Add";
import Loader from "../Loader";

export default function ProductDetails({}) {
  const id = useParams().id;
  const dispatch = useDispatch();

  const { selectedProduct: product, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    // console.log(product);
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full font-semibold flex-col  h-[80vh] p-4 items-center sm:px-20 flex ">
          <div className="w-[90%] flex flex-col sm:flex-row justify-evenly items-center p-2 rounded-lg shadow-2xl h-full">
            <div className="w-[70%] sm:w-[40%] text-black flex justify-center items-center ">
              <Swiper
                modules={[Pagination]}
                spaceBetween={3}
                slidesPerView={1}
                loop={true}
                color="red"
                pagination={{ clickable: true }}
              >
                <SwiperSlide>
                  <img src="https://pixy.org/src/480/4800346.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://wallpaperaccess.com/full/1356284.jpg"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://faradayshielding.com.au/wp-content/uploads/2021/05/Image_039.jpg"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="http://thewowstyle.com/wp-content/uploads/2015/07/autunm-desktop-natural-hd-wallpapers.jpg"
                    alt=""
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="sm:w-[50%]  flex p-2 flex-col  justify-center gap-2 sm:gap-8  ">
              <div>
                <h1 className="text-lg text-gray-700">{product.name}</h1>
                <p className="text-xs text-gray-700 text-wrap">
                  {product.description}
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
                  v
                  defaultValue={product.rating}
                  readOnly
                />
                <span className="text-red-400">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-red-400">&#8377;{product.price}</span>
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
      )}
    </>
  );
}
