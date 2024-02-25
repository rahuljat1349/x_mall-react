import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { deleteReviews, getReviews } from "../../Features/Reviews/ReviewSlice";

export default function ReviewsList() {
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("login");
      alert("Please login to access your orders.");
    }
  }, []);
  const { user, error } = useSelector((state) => state.user || {});
  const { Reviews, loading } = useSelector((state) => state.reviews || {});
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user]);

  const handleSearchReviews = async (e) => {
    e.preventDefault();
    await dispatch(getReviews(productId));
   await setReviews(Reviews);
  };
useEffect(() => {
  setReviews(Reviews);
}, [reviews, productId]);

  const handleDeleteReview = async (productId, id) => {
    await dispatch(deleteReviews({productId:productId,id:id}));
    await dispatch(getReviews(productId));
   await setReviews(Reviews);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex sm:flex-row flex-col">
          <Sidebar color={"products"} />
          <div className="w-full min-h-screen">
            <div className="flex justify-center items-center w-full200 my-4">
              <div>
                <div className="flex w-full flex-col items-center gap-4">
                  <div className="relative w-full items-center justify-center flex">
                    <i className="bi sm:text-lg cursor-pointer bi-star-fill text-gray-400 z-10 absolute left-[4%] md:text-2xl"></i>
                    <input
                      name="name"
                      onChange={(e) => setProductId(e.target.value)}
                      className="w-full border-solid duration-300  focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md"
                      placeholder="Product ID"
                      type="text"
                      required
                    />
                  </div>
                  <button
                    disabled={productId.length < 24}
                    onClick={handleSearchReviews}
                    className="text-white disabled:bg-red-300 bg-red-400 w-full py-1 rounded-md hover:bg-red-600 duration-200"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            {reviews.length < 1 ? (
              <div className="flex justify-center items-center">
                <div className="flex flex-col gap-1 items-center">
                  <h1 className="text-gray-700 font-semibold text-xl">
                    No Reviews found.
                  </h1>
                </div>
              </div>
            ) : (
              <div className=" ">
                <div className="bg-red-500 sm:text-sm text-xs text-white py-3 font-semibold grid grid-cols-5 place-items-center w-full justify-around">
                  <h1>Review ID</h1>
                  <h1>User</h1>
                  <h1>Comment</h1>
                  <h1>Rating</h1>
                  <h1>Actions</h1>
                </div>

                <div>
                  {reviews &&
                    reviews.reviews.map((item) => (
                      <div
                        className=" sm:text-sm text-[8px] hover:bg-gray-100 text-gray-700 py-4 font-semibold grid grid-cols-5 place-items-center w-full justify-around"
                        key={item._id}
                      >
                        <h1 className="text-[5px] text-gray-500 lg:text-sm sm:text-[8px]">
                          #{item._id}
                        </h1>

                        <h1>{item.name}</h1>
                        <h1 className="text-[7px] lg:text-xs sm:text-[9px]">
                          {item.comment}
                        </h1>
                        <h1 className={item.stock < 1 && "text-red-500"}>
                          {item.rating}
                        </h1>
                        <div className="flex gap-4">
                          {/* <button disabled>
                            {" "}
                            <i className="bi hover:text-red-500 duration-150 font-bold cursor-pointer bi-pencil-square"></i>
                          </button>{" "} */}
                          <button onClick={() => handleDeleteReview(productId,item._id)}>
                            {" "}
                            <i className="bi hover:text-red-500 duration-150 font-bold cursor-pointer bi-trash3-fill"></i>
                          </button>{" "}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
