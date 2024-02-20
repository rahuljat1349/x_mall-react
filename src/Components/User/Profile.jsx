import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleModal from "./Modal";
import { getUserInfo } from "../../Features/User/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
export default function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user || {});
  useEffect(() => {
    console.log(user);
    setUserInfo(user);
  }, [user]);
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  return (
    <>
      <div className="w-[100vw] py-8 flex justify-center">
        <div className="sm:w-[70%] sm:p-8  mt-12 justify-between flex flex-col h-[45vh] w-[60%] md:h-[70vh] sm:h-[50vh] lg:w-[60%] shadow-lg rounded-3xl">
          {/*  */}
          <div className=" h-full text-center py-6 px-8 items-center justify-between flex-col flex">
            <div className="flex flex-col gap-2">
              <h1 className="md:text-3xl sm:text-2xl text-gray-600 font-bold text-lg">
                {user && user.name}
              </h1>
              <span className="text-gray-600 font-semibold text-sm">
                {user && user.email}
              </span>
            </div>

            <div>
              <Link
                to={"/products"}
                className="hover:bg-red-500 duration-200 bg-red-400  shadow-lg px-3 sm:px-6 py-4 text-white text-xs rounded-[50px]"
              >
                Explore More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
