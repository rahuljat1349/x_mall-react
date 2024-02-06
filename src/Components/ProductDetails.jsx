import Rating from "@mui/material/Rating";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/joy/Button";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export default function ProductDetails() {
  let { state } = useLocation();
  const [newData, setNewData] = useState(state.productData);

  return (
    <>
      <div className="w-full text-red-400 font-semibold flex-col  h-[80vh] p-4 items-center sm:px-20 flex ">
        <div className="w-[90%]  flex flex-col sm:flex-row justify-center items-center p-2 rounded-lg shadow-2xl h-full">
          <div className="w-[50%]  flex justify-center items-center ">
            <img className="w-[50%]" src={newData.image} alt="" />
          </div>
          <div className="sm:w-[50%]  flex p-2 flex-col  justify-center gap-2 sm:gap-8  ">
            <div>
              <h1 className="text-lg">{newData.title}</h1>
              <p className="text-xs text-wrap">{newData.description}</p>
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
                value={newData.rating.rate}
                readOnly
              />
              <span>({newData.rating.count})</span>
            </div>
            <div className="flex items-center">
              <span className="text-red-400">${newData.price}</span>
            </div>
            <div className="flex w-full  mt-10 justify-center">
              <Button endDecorator={<KeyboardArrowRight />} color="danger">
                Go to checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
