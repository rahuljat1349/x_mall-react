import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { deleteUser, getAdminUsers } from "../../Features/User/userSlice";

export default function UsersLIst() {
  const { user, loading, allUsers } = useSelector((state) => state.user || {});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("login");
      alert("Please login to access your orders.");
    }
  }, []);
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user]);

  const handleDeleteUser = async (id) => {
    if (confirm("Delete User?")) {
      await dispatch(deleteUser(id));
      dispatch(getAdminUsers());
    }
  };

  useEffect(() => {
    dispatch(getAdminUsers());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex sm:flex-row flex-col">
          <Sidebar color={"users"} />
          <div className="w-full min-h-screen">
            {allUsers && allUsers.length < 1 ? (
              <div className="flex justify-center items-center">
                <div className="flex flex-col gap-1 items-center">
                  <i className="bi text-[50px] text-red-400 bi-cart-x-fill"></i>
                  <h1 className="text-gray-700 font-semibold text-xl">
                    No Users yet.
                  </h1>
                </div>
              </div>
            ) : (
              <div className=" ">
                <div className="bg-red-500 sm:text-sm text-xs text-white py-3 font-semibold grid grid-cols-5 place-items-center w-full justify-around">
                  <h1>User ID</h1>
                  <h1>Email</h1>
                  <h1>Name</h1>
                  <h1>Role</h1>
                  <h1>Actions</h1>
                </div>

                <div>
                  {allUsers &&
                    allUsers.map((item) => (
                      <div
                        className=" sm:text-sm text-[8px] hover:bg-gray-100 text-gray-700 py-4 font-semibold grid grid-cols-5 place-items-center w-full justify-around"
                        key={item._id}
                      >
                        <h1 className="text-[5px] text-gray-500 lg:text-sm sm:text-[8px]">
                          #{item._id}
                        </h1>

                        <h1 className={`text-[7px] lg:text-xs sm:text-[9px]`}>
                          {item.email}
                        </h1>
                        <h1>{item.name}</h1>
                        <h1
                          className={item.role === "admin" && "text-green-500"}
                        >
                          {item.role}
                        </h1>
                        <div className="flex gap-4">
                          <Link
                            to={`/admin/user/${item._id}`}
                            state={{
                              name: item.name,
                              email: item.email,
                              role: item.role,
                            }}
                          >
                            {" "}
                            <i className="bi hover:text-red-500 duration-150 font-bold cursor-pointer bi-box-arrow-up-right"></i>
                          </Link>{" "}
                          <button onClick={() => handleDeleteUser(item._id)}>
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
