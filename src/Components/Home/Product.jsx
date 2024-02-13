import React from "react";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { red } from "@mui/material/colors";

export default function Product({ product }) {
  return (
    <>
      <Link
        className="flex hover:shadow-lg w-36 justify-center text-xs sm:text-sm sm:w-60 items-center rounded duration-200 hover:-translate-y-2 flex-col gap-4 p-2"
        to={product._id}
      >
        <div className="w-12 sm:w-28 lg:w-36">
          <img src={product.images[0].url} alt="image" />
        </div>
        <div className="flex ml-4 gap-2 flex-col justify-center">
          <p>{product.name}</p>
          <div className="flex items-center text-gray-600">
            {" "}
            <Rating
              sx={{
                color: red[400],
              }}
              size="xs"
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />{" "}
            {/* <span>(256)</span> */}
          </div>
          <span className="text-red-400 font-semibold">
            &#8377;{product.price}/-
          </span>
        </div>
      </Link>
    </>
  );
}
