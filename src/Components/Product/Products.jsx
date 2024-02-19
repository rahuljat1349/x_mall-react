import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../Features/Products/productSlice";
// import { searchProducts } from "../../Features/Products/productSlice";
import Rating from "@mui/material/Rating";
import { Link, useParams } from "react-router-dom";
import { red } from "@mui/material/colors";
import Loader from "../Loader";

export default function Products() {
  const dispatch = useDispatch();
  const { list: products, loading } = useSelector((state) => state.products);

  const keyword = useParams().keyword;

  useEffect(() => {
    console.log(products);
    // Fetch products when the component mounts
    dispatch(fetchProducts(keyword));
  }, [dispatch, keyword]);
  return (
    <>
      <div className="flex justify-center">
        <div>
          <h1
            id="featured-products"
            className="md:text-xl p-2 md:w-[20vw] text-gray-800 font-medium mb-4 text-center border-gray-500 border-solid border-b-[1px]"
          >
            Products
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex w-[100vw] md:w-[90vw] justify-center flex-wrap p-4 gap-4">
          {loading ? (
            <Loader /> // Display loader while loading
          ) : (
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
    </>
  );
}
