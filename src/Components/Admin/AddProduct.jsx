import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AddProduct() {
  const { user } = useSelector((state) => state.user || {});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("login");
      alert("Please login to Add product.");
    }
  }, [navigate]);
  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagePreviews([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = ()=>{
        if (reader.readyState === 2) {
          setImagePreviews((old)=>[...old,reader.result])
          setImages((old)=>[...old,reader.result])
        }
      }
      reader.readAsDataURL(file);
    });
  };

  const createProductSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("price", price);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("stock", stock);

    images.forEach((image) => {
      myForm.append(`images`, image);
    });

    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/admin/product/new",
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
          body: myForm,
        }
      );

      const data = await response.json();
      console.log("Add Product Response:", data);
    } catch (error) {
      console.error("Error Adding Product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex sm:flex-row flex-col">
          <Sidebar color={"add"} />
          <div className="w-full flex justify-center bg-slate-200 items-center text-gray-500 py-4 px-8 sm:px-10">
            <div className="flex justify-center items-center sm:w-[90%] md:w-[70%] lg:w-[50%] w-full">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createProductSubmitHandler(e);
                }}
                className="shadow-lg bg-white w-full rounded-xl p-8 gap-4 my-4 flex flex-col justify-center items-center "
              >
                <h2 className="text-2xl">Add a Product</h2>

                {/* Product Name */}
                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-box z-10 absolute left-[4%] md:text-2xl"></i>
                  <input
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-solid duration-300  focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md"
                    placeholder="Product Name"
                    type="text"
                    required
                  />
                </div>

                {/* Price */}
                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-currency-rupee z-10 absolute left-[4%] md:text-2xl"></i>
                  <input
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border-solid  duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md"
                    placeholder="Price"
                    type="number"
                    required
                  />
                </div>

                {/* Description */}
                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-card-text z-10 absolute left-[4%] md:text-2xl"></i>
                  <textarea
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border-solid  duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md"
                    placeholder="Description"
                    required
                  ></textarea>
                </div>

                {/* Category */}
                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-tags z-10 absolute left-[4%] md:text-2xl"></i>
                  <select
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border-solid  duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Mobiles">Mobiles</option>
                    <option value="Watches">Watches</option>
                  </select>
                </div>

                {/* Stock */}
                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-database z-10 absolute left-[4%] md:text-2xl"></i>
                  <input
                    name="stock"
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full border-solid  duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md"
                    placeholder="Stock"
                    type="number"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-images z-10 absolute left-[4%] md:text-2xl"></i>
                  <label className="w-full border-solid  duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md cursor-pointer">
                    Choose Files
                    <input
                      type="file"
                      name="images"
                      onChange={createProductImageChange}
                      multiple
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>

                {/* Image Previews */}
                <div className="flex w-full mt-4 overflow-x-auto">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-16 h-16 mr-2 rounded-md"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full p-2 bg-red-400 text-white hover:bg-red-500 duration-300 outline-none rounded-md"
                >
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
