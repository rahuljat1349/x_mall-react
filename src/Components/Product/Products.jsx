import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../Features/Products/productSlice";
// import { searchProducts } from "../../Features/Products/productSlice";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import Pagination from "@mui/material/Pagination";
import { Link, useParams } from "react-router-dom";
import { red } from "@mui/material/colors";
import Loader from "../Loader";
let categories = ["Electronics", "Fashion", "mobiles", "watches"];
export default function Products() {
  const dispatch = useDispatch();

  const [price, setPrice] = useState([0, 25]);
  const [category, setCategory] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    list: products,
    page,
    loading,
    totalPages,
  } = useSelector((state) => state.products);

  const handlePriceChange = (e, newValue) => {
    setPrice(newValue);
  };
  // const handleCategoryChange =  (selectedCategory) => {
  //    setCategory(selectedCategory);
  // };
  const keyword = useParams().keyword;


  useEffect(() => {
    // console.log("Keyword:", keyword);
    // console.log("Price:", price);
    // console.log("Category:", category);
    dispatch(fetchProducts(keyword, price, category));
  }, [dispatch, keyword, price, category]);
  return (
    <>
      <div className="flex justify-center">
        <div>
          <h1 className="md:text-xl p-2 md:w-[20vw] text-gray-800 font-medium mb-4 text-center border-gray-500 border-solid border-b-[1px]">
            Products
          </h1>
        </div>
      </div>
      <div className="flex sm:flex-row relative flex-col items-center sm:items-start justify-center">
        <div className="p-2 sm:absolute top-10 left-0">
          <div>
            <h1 className=" font-semibold text-gray-700">
              price (in thousands)
            </h1>
            <Slider
              sx={{
                color: red[400],
              }}
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              size="small"
            />
            <h1 className=" font-semibold text-gray-700">Categories</h1>
            <ul>
              {categories.map((category, i) => (
                <li
                  className="text-sm hover:text-red-300 cursor-pointer font-sans text-gray-500"
                  onClick={() => setCategory(category)}
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
          ) : (
            products &&
            products.map((product) => (
              <Link
                className="flex hover:shadow-lg w-40 justify-center text-xs sm:text-sm sm:w-60 items-center rounded duration-200 hover:-translate-y-2 flex-col gap-4 p-2"
                to={`product/${product._id}`}
                key={product._id}
              >
                <div className="w-12 sm:w-28 lg:w-36">
                  <img
                    src={
                      product.images[0].url
                        ? product.images[0].url
                        : "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                    }
                    alt="image"
                  />
                </div>
                <div className="flex ml-4 gap-2 flex-col">
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
      {/* <div className="w-full flex justify-center my-4">
        <Pagination count={10} />
      </div> */}
    </>
  );
}
