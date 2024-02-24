import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../Features/Products/productSlice";
// import { searchProducts } from "../../Features/Products/productSlice";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import Pagination from "@mui/material/Pagination";
import { Link, useParams } from "react-router-dom";
import { red } from "@mui/material/colors";
import Loader from "../Layout/Loader/Loader";
let categories = ["ALL", "Electronics", "Fashion", "Mobiles", "Watches"];
export default function Products() {
  const dispatch = useDispatch();

  const [price, setPrice] = useState([0, 25]);
  const [category, setCategory] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    list: products,
    page,
    loading,
  } = useSelector((state) => state.products);

  const handlePriceChange = (e, newValue) => {
    setPrice(newValue);
  };
  const handleCategoryChange = (category) => {
    setCategory(category);
    setSelectedCategory(category);
  };
  const keyword = useParams().keyword;

  useEffect(() => {
    console.log(category);
    dispatch(fetchProducts({ keyword, price, category, page: currentPage }));
  }, [dispatch, keyword, price, category, currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <>
      <div className="flex justify-center">
        <div>
          <h1 className="md:text-2xl py-6 md:w-[20vw] text-gray-500  mb-4 text-center border-gray-400 border-solid border-b-[1px]">
            Products
          </h1>
        </div>
      </div>
      <div className="flex sm:flex-row relative flex-col -6 items-center sm:items-start justify-center">
        <div className="px-4 sm:w-44 p-6 rounded-r-md left-0 sm:absolute">
          <div>
            <h1 className=" font-semibold text-sm text-gray-700">
              Price (in k)
            </h1>
            <Slider
              sx={{
                color: red[600],
              }}
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              size="small"
            />
            <h1 className=" font-semibold py-1 px-2 text-gray-600">
              Categories
            </h1>
            <ul className="px-4 flex flex-row sm:flex-col gap-2">
              {categories.map((category, i) => (
                <li
                  className={`text-sm hover:text-red-500 ${
                    category === selectedCategory ? "text-red-500" : ""
                  } cursor-pointer text-gray-500`}
                  onClick={() => handleCategoryChange(category)}
                  key={i}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex w-[100vw] md:w-[90vw] justify-center flex-wrap p-4 gap-4">
          {loading ? (
            <Loader /> // Display loader while loading
          ) : products && products.length < 1 ? (
            <div className="text-gray-600 font-medium">No products found.</div>
          ) : (
            products.map((product) => (
              <Link
                className="flex hover:shadow-lg w-40 justify-center text-xs sm:text-sm sm:w-60 items-center rounded duration-200 hover:-translate-y-2 flex-col gap-4 py-2"
                to={`product/${product._id}`}
                key={product._id}
              >
                <div className="w-24 h-28 items-center flex sm:w-28 lg:w-36">
                  <img
                    className="w-full"
                    src={
                      product.images[0].url
                        ? product.images[0].url
                        : "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                    }
                    alt="image"
                  />
                </div>
                <div className="flex gap-4 font-semibold text-gray-500 flex-col">
                  <p>{product.name}</p>
                  <div className="flex items-center text-gray-600">
                    {" "}
                    <Rating
                      sx={{
                        color: red[400],
                      }}
                      name="half-rating-read"
                      value={product.rating}
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
            ))
          )}
        </div>
      </div>
      <div className="w-full mb-28 mt-16 flex justify-center ">
        <Pagination
          count={page.totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
