import React,{useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";

import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function BasicCard({
  productId,
  rating,
  title,
  description,
  price,
  image,
}) {
  const  [productData, setproductData] = useState({title,description,price,image,rating})
  return (
    <>
      <div className=" p-2 mb-4 hover:text-red-300  cursor-pointer">
        <Link
          // to={`/product/${productId}`}
          to={"/product"}
          state={{ productData: productData }}
        >
          <div
            className={`h-[15vh] sm:h-[25vh] md:h-[30vh] lg:h-[40vh] rounded-t-xl border-red-200 border-solid border-[1px] border-b-white`}
          >
            <div className="w-full h-[100%] hover:scale-110 duration-300 flex justify-center items-center">
              <img
                className="sm:w-28 md:w-32 lg:w-28 w-16"
                src={image}
                alt=""
                srcSet=""
              />
            </div>
          </div>
        </Link>
        <div
          className={`md:h-[14vh] flex p-2 justify-between items-center h-[8vh] bg-white border-t-white  border-red-200 border-[1px]`}
        >
          <div>
            <h1 className=" text-xs md:text-lg text-gray-700 ">
              {title ? title : "title"}
            </h1>
            <p className="text-xs hidden md:block text-gray-500">
              {description ? description : "This is description"}
            </p>
            <span className="text-xs text-red-400">
              {price ? price : "29.00"}
            </span>
          </div>
          <div>
            <Checkbox
              {...label}
              icon={<FavoriteBorder />}
              sx={{
                color: red[400],
                "&.Mui-checked": {
                  color: red[400],
                },
              }}
              checkedIcon={<Favorite />}
            />
          </div>
        </div>
      </div>
    </>
  );
}
