import React from "react";
import ProductsContainer from "../Home components/ProductsContainer";

export default function Wishlist() {
  return (
    <>
      <h2 className="text-center text-gray-600 font-semibold text-3xl my-3">
        Your Wishlist
      </h2>
      <ProductsContainer productsLength={12} />
    </>
  );
}
