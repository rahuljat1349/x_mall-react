import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <>
      <h1 className=" w-full bg-gray-800 text-gray-300 text-2xl pt-20 text-center">
        {" "}
        Search Products
      </h1>

      <div className="w-full shadow-xl shadow-black bg-gray-800 h-[90vh] flex justify-center ">
        <div className="mt-20 flex justify-center rounded-lg bg-red-600 w-[60%] h-14 overflow-hidden">
          <input
            placeholder="Search for a product.."
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            className="p-6  outline-none placeholder:text-gray-500 bg-gray-700 text-gray-200 w-full"
            type="text"
          />
          <button
            onClick={handleSearchSubmit}
            className="p-4 hover:bg-red-600 duration-200 active:bg-red-700 bg-red-500 text-white"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}
