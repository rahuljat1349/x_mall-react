import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { addProduct } from "../../Features/Products/productSlice";

const AddProduct = () => {
  const { user } = useSelector((state) => state.user || {});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("login");
      alert("Please login to Add product.");
    }
  }, [navigate]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const files = Array.from(e.target.files);
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...files],
      }));

      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
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
            <div className="flex justify-center  items-center sm:w-[90%] md:w-[70%] lg:w-[50%] w-full">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoading(true);
                  dispatch(addProduct({ productData: formData }));
                  setTimeout(() => {
                    setLoading(false);
                  }, 2000);
                }}
                className="shadow-lg bg-white w-full rounded-xl p-8 gap-4 my-4 flex flex-col justify-center items-center "
              >
                <h2 className="text-2xl">Add a Product</h2>

                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-box z-10 absolute left-[4%] md:text-2xl"></i>
                  <input
                    name="productName"
                    onChange={handleChange}
                    className="w-full border-solid duration-300  focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md"
                    placeholder="Product Name"
                    type="text"
                    required
                  />
                </div>

                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-currency-rupee z-10 absolute left-[4%] md:text-2xl"></i>
                  <input
                    name="price"
                    onChange={handleChange}
                    className="w-full border-solid  duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md"
                    placeholder="Price"
                    type="number"
                    required
                  />
                </div>

                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-card-text z-10 absolute left-[4%] md:text-2xl"></i>
                  <textarea
                    name="description"
                    onChange={handleChange}
                    className="w-full border-solid  duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md"
                    placeholder="Description"
                    required
                  ></textarea>
                </div>

                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-tags z-10 absolute left-[4%] md:text-2xl"></i>
                  <select
                    name="category"
                    onChange={handleChange}
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

                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-database z-10 absolute left-[4%] md:text-2xl"></i>
                  <input
                    name="stock"
                    onChange={handleChange}
                    className="w-full border-solid  duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md"
                    placeholder="Stock"
                    type="number"
                    required
                  />
                </div>

                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-images z-10 absolute left-[4%] md:text-2xl"></i>
                  <label className="w-full border-solid  duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md cursor-pointer">
                    Choose Files
                    <input
                      type="file"
                      name="images"
                      onChange={handleChange}
                      multiple
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>

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
};

export default AddProduct;
