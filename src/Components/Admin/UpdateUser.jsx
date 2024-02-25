import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";

import Sidebar from "./Sidebar";
import { updateUser } from "../../Features/User/userSlice";

export default function UpdateUser() {
  const id = useParams().id;
  const { state } = useLocation();
  const { user, error, loading } = useSelector((state) => state.user || {});
  const [formData, setFormData] = useState({
    name: state && state.name,
    email: state && state.email,
    role: state && state.role,
  });
  //
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("login");
      alert("Please login to access this order.");
    }
  }, []);
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user]);
//   console.log(state);
  const handleUserUpdate = async () => {
   await dispatch(updateUser({id:id,formData:formData}))
   navigate("/admin/users")
  };
  useEffect(() => {}, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex sm:flex-row flex-col">
          {" "}
          <Sidebar color={""} />
          <div className="w-full flex justify-center bg-slate-200 items-center text-gray-500 py-4 px-8 sm:px-10">
            <div className="flex justify-center items-center sm:w-[90%] md:w-[70%] lg:w-[50%] w-full">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  //   createProductSubmitHandler();
                }}
                className="shadow-lg bg-white w-full rounded-xl p-8 gap-4 my-4 flex flex-col justify-center items-center "
              >
                <h2 className="text-2xl">Update User</h2>

                {/* Name */}
                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-person-fill z-10 absolute left-[4%] md:text-2xl"></i>
                  <input
                    name="name"
                    onChange={handleInputChange}
                    className="w-full border-solid duration-300  focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md"
                    placeholder="Name"
                    type="text"
                    required
                    value={formData.name}
                  />
                </div>
                {/* email */}
                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-envelope-fill z-10 absolute left-[4%] md:text-2xl"></i>
                  <input
                    name="email"
                    onChange={handleInputChange}
                    className="w-full border-solid duration-300  focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md"
                    placeholder="email"
                    type="email"
                    required
                    value={formData.email}
                  />
                </div>

                {/* role */}
                <div className="relative w-full items-center justify-center flex">
                  <i className="bi sm:text-lg cursor-pointer bi-shield-fill z-10 absolute left-[4%] md:text-2xl"></i>
                  <select
                    name="role"
                    onChange={handleInputChange}
                    className="w-full border-solid  duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 pl-12 outline-none rounded-md"
                    required
                    value={formData.role}
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <button
                  onClick={handleUserUpdate}
                  type="submit"
                  className="w-full p-2 bg-red-400 text-white hover:bg-red-500 duration-300 outline-none rounded-md"
                >
                  Save
                </button>
              </form>
            </div>
          </div>{" "}
        </div>
      )}
    </>
  );
}
