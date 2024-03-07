import Rating from "@mui/material/Rating";
import { red } from "@mui/material/colors";
import Avatar from "@mui/joy/Avatar";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleProduct } from "../../Features/Products/productSlice";
import { productReview } from "../../Features/Products/productSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { addToCart } from "../../Features/Cart/cartSlice";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Add from "@mui/icons-material/Add";
import Loader from "../Layout/Loader/Loader";

export default function ProductDetails({}) {
  const id = useParams().id;
  const { selectedProduct: product, loading } = useSelector(
    (state) => state.products
  );
  const navigate = useNavigate();
  const [itemExists, setItemExists] = useState(false);
  const [open, setOpen] = useState(false);
  const [productReviews, setProductReviews] = useState({
    productId: id,
    comment: "",
    rating: "",
  });
  const [cartValue, setCartValue] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    if (itemExists) {
      navigate("/cart");
      return;
    }
    dispatch(addToCart({ id, quantity: cartValue }));
    await setItemExists(true);
  };
  const handleReviewChange = (e) => {
    setProductReviews({ ...productReviews, [e.target.name]: e.target.value });
  };
  const handleProductReviewSubmit = async () => {
    console.log("submit review trigger");
    await dispatch(productReview(productReviews));
    setOpen(false);
    dispatch(fetchSingleProduct(id));
  };

  useEffect(() => {
    const existingItems = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = existingItems.findIndex(
      (cartItem) => cartItem.id === id
    );
    if (existingIndex !== -1) {
      setItemExists(true);
    } else {
      setItemExists(false);
    }
  }, []);

  useEffect(() => {
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
                  }}
                  precision={0.5}
                  value={product.ratings}
                  readOnly
                />
                <span className="text-gray-400">
                  ({product.numOfReviews}{" "}
                  {product.numOfReviews < 2 ? "Review" : "Reviews"})
                </span>
              </div>
              <hr />
              <div className="flex items-center">
                <span className="text-gray-800 text-xl">₹{product.price}</span>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <button
                    onClick={() => {
                      if (cartValue > 1) {
                        setCartValue((state) => {
                          --state;
                          return state;
                        });
                      }
                    }}
                    className="py-1 px-2 text-white text-xl bg-gray-600"
                  >
                    -
                  </button>
                  <input
                    readOnly
                    className="w-10 outline-none py-1 px-2 text-gray-600 text-xl  bg-gray-200 "
                    value={cartValue}
                    contentEditable={false}
                    type="number"
                    name="cartValue"
                    id=""
                  />
                  <button
                    onClick={() => {
                      if (cartValue < product.stock) {
                        setCartValue((state) => {
                          ++state;
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
                  onClick={handleAddToCart}
                  disabled={product.stock < 1}
                  className="text-white text-[11px] sm:text-xs py-1 disabled:bg-red-300 disabled:border-0 disabled:text-white px-2 bg-red-500 rounded-full flex items-center justify-center hover:bg-white hover:text-red-500 border-red-500 border-solid border-2 duration-200"
                >
                  {itemExists ? "Go to cart" : "Add to cart"}
                  {itemExists ? <KeyboardArrowRightIcon /> : <Add />}
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
                <button
                  // disabled={product&&product.stock}
                  onClick={() => setOpen(true)}
                  className="text-white w-32 text-[11px] sm:text-xs p-2 bg-red-500 rounded-full flex items-center justify-center hover:bg-white hover:scale-105 hover:text-red-500 border-red-500 border-solid border-2 duration-200"
                >
                  Submit review
                </button>
                <Modal open={open} onClose={() => setOpen(false)}>
                  <ModalDialog>
                    <DialogTitle>Submit a Review </DialogTitle>
                    <DialogContent>
                      How would you like to Rate this product?!
                    </DialogContent>
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        setOpen(false);
                      }}
                    >
                      <Stack spacing={2}>
                        <FormControl>
                          <Rating
                            value={Number.parseInt(productReviews.rating)}
                            onChange={handleReviewChange}
                            name="rating"
                            precision={0.5}
                            sx={{
                              color: red[400],
                            }}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Description</FormLabel>
                          <textarea
                            value={productReviews.comment}
                            name="comment"
                            onChange={handleReviewChange}
                            className="outline-none focus:border-red-400 border-solid border-2 duration-200 rounded p-2"
                            type="text"
                          />
                        </FormControl>
                        <button
                          onClick={handleProductReviewSubmit}
                          disabled={
                            productReviews.rating < 1 &&
                            productReviews.comment.length < 3
                          }
                          className="bg-red-400 text-white p-2 rounded disabled:bg-red-300 hover:bg-red-500 duration-200"
                        >
                          Submit
                        </button>
                      </Stack>
                    </form>
                  </ModalDialog>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      )}
      <hr />
      <div className=" w-full text-gray-500 md:px-32 p-4 bg-slate-100">
        <h1 className="font-semibold py-2"> Product Details</h1>
        <p te>{product.details}</p>
      </div>
      <div className="flex justify-center">
        <h1 className="md:text-xl p-2 md:w-[20vw] text-gray-800 font-medium mb-4 text-center border-gray-500 border-solid border-b-[1px]">
          REVIEWS
        </h1>
      </div>
      <div className="w-full font-semibold items-center overflow-auto p-4 flex flex-col justify-center ">
        <div className="p-4 w-full flex-wrap flex gap-4">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <Card
                key={index}
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
