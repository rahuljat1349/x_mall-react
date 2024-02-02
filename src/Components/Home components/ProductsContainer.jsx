import React, { useEffect, useState } from "react";
import BasicCard from "./BasicCard";

export default function ProductsContainer() {
  const [newData, setNewData] = useState([]);

  const getData = async () => {
    try {
      const data = await fetch("https://fakestoreapi.com/products");
      const fetchedData = await data.json();
      const slicedData = fetchedData.slice(0, 9);
      setNewData(slicedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {newData && newData.map((product, i) => (
        <BasicCard
          key={product.id}
          title={product.title.slice(0, 20) + "..."}
          price={"$" + product.price}
          description={product.description.slice(0, 50) + "..."}
          image={product.image}
        />
      ))}
    </>
  );
}
