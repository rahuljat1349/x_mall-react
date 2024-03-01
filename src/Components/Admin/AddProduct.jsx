import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { addProduct } from "../../Features/Products/productSlice";

export default function AddProduct() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user || {});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user]);

  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    details: "",
    price: "",
    category: "",
    images: [],
  });
  const [imagesBox, setImagesBox] = useState([]);
  const handleProductDetailsChange = (e) => {
    e.preventDefault();
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      alert("Please login to Add product.");
    }
  }, [navigate]);
  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagePreviews([]);
    setImagesBox([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreviews((old) => [...old, reader.result]);
          setImagesBox((old) => [...old, file]); // Store the actual file object
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const createProductSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImages = await Promise.all(
        imagesBox.map(async (file) => {
          const myForm = new FormData();
          myForm.append("file", file);
          myForm.append("upload_preset", "xmall-react");
          myForm.append("cloud_name", "dgcvhlyg9");

          const result = await fetch(
            "https://api.cloudinary.com/v1_1/dgcvhlyg9/image/upload",
            {
              method: "POST",
              body: myForm,
            }
          );

          const json = await result.json();
          return { url: json.url, public_id: json.public_id };
        })
      );

      const updatedProductDetails = {
        ...productDetails,
        images: uploadedImages,
      };

      // Dispatch the action directly with the updated product details
      dispatch(addProduct(updatedProductDetails));

      setImagePreviews([]);
      console.log("Updated Product Details:", updatedProductDetails);
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
                    // value={productDetails.name}
                    onChange={handleProductDetailsChange}
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
                    // value={productDetails.price}
                    onChange={handleProductDetailsChange}
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
                    // value={productDetails.description}
                    onChange={handleProductDetailsChange}
                    className="w-full border-solid  duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md"
                    placeholder="Description"
                    required
                  ></textarea>
                </div>
                {/* Details */}
                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-card-text z-10 absolute left-[4%] md:text-2xl"></i>
                  <textarea
                    rows={8}
                    name="details"
                    // value={productDetails.description}
                    onChange={handleProductDetailsChange}
                    className="w-full border-solid  duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md"
                    placeholder="Product Details"
                    required
                  ></textarea>
                </div>

                {/* Category */}
                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-tags z-10 absolute left-[4%] md:text-2xl"></i>
                  <select
                    name="category"
                    // value={productDetails.category}
                    onChange={handleProductDetailsChange}
                    className="w-full border-solid  duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Fashion</option>
                    <option value="Home">Mobiles</option>
                    <option value="Books">Books</option>
                    <option value="Toys">Toys</option>
                    <option value="Health">Health</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Watches">Watches</option>
                  </select>
                </div>

                {/* Stock */}
                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-database z-10 absolute left-[4%] md:text-2xl"></i>
                  <input
                    name="stock"
                    // value={productDetails.stock}
                    onChange={handleProductDetailsChange}
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
                      // value={productDetails.images}
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
