import Rating from "@mui/material/Rating";
import { red } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleProduct } from "../../Features/Products/productSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Add from "@mui/icons-material/Add";
import Loader from "../Loader";

export default function ProductDetails({}) {
  const [cartValue, setCartValue] = useState(1);
  const [imagenavigation, setImagenavigation] = useState(false);
  const id = useParams().id;
  const dispatch = useDispatch();

  const { selectedProduct: product, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    console.log(product.reviews.length);
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full font-semibold flex-col p-4 items-center flex ">
          <div className="w-[98%] flex flex-col sm:flex-row justify-center  items-center h-full gap-4 py-8 px-4">
            <div className="w-[90%] h-full  rounded overflow-hidden sm:w-[40%] text-black flex justify-center items-center ">
              <Swiper
                style={{
                  "--swiper-pagination-color": "#5e5e5e",
                  "--swiper-navigation-color": "#5e5e5e",
                  "--swiper-navigation-size": "30px",
                }}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {product.images
                  ? product.images.map((img, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={
                            img.url
                              ? img.url
                              : "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"
                          }
                          alt={`Slide ${index + 1}`}
                        />
                      </SwiperSlide>
                    ))
                  : "No images"}
              </Swiper>
            </div>

            <div className="sm:w-[45%]  flex px-8 h-full flex-col justify-center gap-2 ">
              <div>
                <h1 className="text-lg text-gray-600">{product.name}</h1>
                <p className="text-xs text-gray-400 text-wrap">
                  Product #{product._id}
                </p>
              </div>
              <hr />
              <div className="flex items-center">
                <Rating
                  name="half-rating"
                  sx={{
                    color: red[400],
                    "&.Mui-checked": {
                      color: red[600],
                    },
                  }}
                  precision={0.5}
                  defaultValue={product.ratings}
                  readOnly
                />
                <span className="text-gray-400">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <hr />
              <div className="flex items-center">
                <span className="text-gray-800 text-xl">
                  &#8377;{product.price}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <button
                    onClick={() => {
                      if (cartValue > 1) {
                        setCartValue((state) => {
                          state--;
                          return state;
                        });
                      }
                    }}
                    className="py-1 px-2 text-white text-xl bg-gray-600"
                  >
                    -
                  </button>
                  <input
                    className="w-10 outline-none py-1 px-2 text-gray-600 text-xl  bg-gray-200 "
                    defaultValue={cartValue}
                    Value={cartValue}
                    contentEditable={false}
                    type="number"
                    name="cartValue"
                    id=""
                  />
                  <button
                    onClick={() => {
                      if (cartValue < product.stock) {
                        setCartValue((state) => {
                          state++;
                          return state;
                        });
                      }
                    }}
                    className="py-1 px-2 text-white text-xl bg-gray-600"
                  >
                    +
                  </button>
                </div>
                <button
                  disabled={product.stock < 1}
                  className="text-white text-[11px] sm:text-xs py-1 disabled:bg-red-300 disabled:border-0 disabled:text-white px-2 bg-red-500 rounded-full flex items-center justify-center hover:bg-white hover:text-red-500 border-red-500 border-solid border-2 duration-200"
                >
                  Add to cart
                  <Add />
                </button>
              </div>
              <hr />
              <div>
                <span className="text-gray-700">Status : </span>
                <span
                  className={
                    product.stock < 1 ? "text-red-600" : "text-green-600"
                  }
                >
                  {product.stock < 1 ? "Out Of Stock" : "In Stock"}
                </span>
              </div>
              <hr />
              <div className="flex w-full justify-center"></div>
              <div className=" flex flex-col gap-2">
                <span className="text-gray-700">Description :</span>
                <p className="text-gray-500 text-sm">{product.description}</p>
                <button className="text-white w-32 text-[11px] sm:text-xs p-2 bg-red-500 rounded-full flex items-center justify-center hover:bg-white hover:text-red-500 border-red-500 border-solid border-2 duration-200">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <h1 className="md:text-xl p-2 md:w-[20vw] text-gray-800 font-medium mb-4 text-center border-gray-500 border-solid border-b-[1px]">
          REVIEWS
        </h1>
      </div>
      <div className="w-full font-semibold items-center overflow-auto p-4 flex flex-col justify-center ">
        <div className="p-4 w-full flex-wrap flex gap-4">
          {product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <Card
                sx={{
                  minWidth: 280,
                  maxWidth: "100%",
                  boxShadow: "lg",
                }}
              >
                <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
                  <Avatar
                    src="/static/images/avatar/1.jpg"
                    sx={{ "--Avatar-size": "4rem" }}
                  />

                  <Typography level="title-lg">{review.name}</Typography>
                  <Rating
                    name="half-rating"
                    sx={{
                      color: red[400],
                      "&.Mui-checked": {
                        color: red[600],
                      },
                    }}
                    precision={0.5}
                    defaultValue={review.rating}
                    readOnly
                  />
                  <Typography level="body-sm" sx={{ maxWidth: "24ch" }}>
                    {review.comment}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-gray-600 text-lg font-sans w-full">
              <span>No Reviews Yet</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
