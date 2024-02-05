import Rating from "@mui/material/Rating";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

export default function ProductDetails() {
  const { id } = useParams();
  const [newData, setNewData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const data = await fetch(`https://fakestoreapi.com/products/${id}`);
      const fetchedData = await data.json();

      setNewData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {newData && loading ? (
        <Loader />
      ) : (
        <div className="w-full text-red-400 font-semibold flex-col  h-[80vh] p-4 items-center sm:px-20 flex ">
          <div className="w-[90%]  flex flex-col sm:flex-row justify-center items-center p-2 rounded-lg shadow-2xl h-full">
            <div className="w-[50%]  flex justify-center items-center ">
              <img className="w-[50%]" src={newData.image} alt="" />
            </div>
            <div className="w-[50%]  flex p-2 flex-col  justify-center gap-2 sm:gap-8  ">
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
                <button className="p-3 shadow-3xl text-xs sm:text-sm duration-200 hover:bg-red-500 bg-red-400 rounded-xl text-white w-[60%]">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
