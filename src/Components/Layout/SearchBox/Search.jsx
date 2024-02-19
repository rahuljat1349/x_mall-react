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
      <h1 className=" w-full bg-gray-700 text-gray-300 text-2xl p-4 text-center">
        {" "}
        Search Products
      </h1>

      <div className="w-full bg-gray-700 h-[90vh] flex justify-center ">
        <div className="mt-36 rounded bg-violet-200 h-10 overflow-hidden">
          <input
            placeholder="Search for a product.."
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            className="p-2 outline-none placeholder:text-gray-500 bg-gray-400 text-gray-200 w-64"
            type="text"
          />
          <button
            onClick={handleSearchSubmit}
            className="p-2 hover:bg-red-400 duration-200 active:bg-red-500 bg-red-300 text-white"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}
