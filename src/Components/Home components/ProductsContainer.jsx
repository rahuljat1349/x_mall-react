import React, { useEffect, useState } from "react";
import BasicCard from "./BasicCard";

import Loader from "../Loader";

export default function ProductsContainer({ productsLength }) {
  const [newData, setNewData] = useState([]);
  const [length, setLength] = useState(productsLength);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const data = await fetch("https://fakestoreapi.com/products");
      const fetchedData = await data.json();
      const filteredData =
        (await length) > 0 ? fetchedData.slice(0, length) : fetchedData;
      setNewData(filteredData);
      console.log(filteredData.id);
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
        <div className="grid grid-cols-2 justify-center md:px-10 items-center sm:grid-cols-3 lg:grid-cols-4 px-2 ">
          {newData.map((product, i) => (
            <BasicCard
              key={i}
              productId ={product.id}
              title={product.title.slice(0, 20) + "..."}
              price={"$" + product.price}
              description={product.description.slice(0, 50) + "..."}
              image={product.image}
            />
          ))}
        </div>
      )}
    </>
  );
}
