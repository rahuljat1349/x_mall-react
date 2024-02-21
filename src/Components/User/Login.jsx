import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Features/User/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";

export default function () {
  const navigate = useNavigate()
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { token, error, loading } = useSelector((state) => state.user || {});

  useEffect(() => {
    if (token) {
      if (localStorage.getItem("token")) {
        navigate("/profile");
      }
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // console.log("User:", user.authToken);

    // if (user) {
    // localStorage.setItem()
    // }
    // Dispatch the action to register the user
    dispatch(loginUser(formData));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full flex justify-center items-center text-gray-500  py-4 px-8 sm:px-10">
          <div className="flex justify-center items-center sm:w-[80%] md:w-[60%] lg:w-[40%] w-full">
            <form
              action=""
              className="shadow-lg  w-full rounded-xl p-4 gap-10 my-4 flex flex-col justify-center items-center "
            >
              <h2 className="text-2xl ">
                Login to <span className="sigle-day-regular">xMall</span>
              </h2>

              <div className="relative w-full items-center justify-center flex">
                <i
                  className={`bi sm:text-lg cursor-pointer bi-envelope-fill z-10 absolute left-[13%] md:text-2xl`}
                ></i>
                <input
                  name="email"
                  onChange={handleChange}
                  className="w-[80%]  border-solid duration-300 px-12 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 outline-none rounded-md"
                  placeholder="Email"
                  type="email"
                  required
                />
              </div>
              <div className="w-[80%] relative items-center flex">
                <i
                  className={`bi sm:text-lg cursor-pointer bi-key-fill z-10 absolute left-[4%] md:text-2xl`}
                ></i>
                <input
                  name="password"
                  onChange={handleChange}
                  className="w-full border-solid px-12 duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 outline-none rounded-md"
                  placeholder="Password"
                  type={passwordType}
                  required
                />
                <i
                  onClick={() => {
                    setPasswordType((type) =>
                      type === "text" ? "password" : "text"
                    );
                  }}
                  className={`bi sm:text-lg cursor-pointer -ml-8 md:text-2xl ${
                    passwordType === "password"
                      ? "bi-eye-fill"
                      : "bi-eye-slash-fill"
                  }`}
                ></i>{" "}
              </div>
              <div className="w-[80%] text-[10px] sm:text-sm items-center flex justify-between">
                <div className="flex  items-center">
                  {/* <label htmlFor="check">Remember Me</label> */}
                </div>
                <Link to={""}>Forgot password?</Link>
              </div>

              <button
                onClick={handleSignUp}
                className="w-[80%] p-2 bg-red-400 text-white hover:bg-red-500 duration-300 outline-none rounded-md"
              >
                LogIn
              </button>
              <h2 className="text-xs      ">
                Don't have an Account?{" "}
                <Link className="text-red-400" to={"/signup"}>
                  SignUp here
                </Link>
                .
              </h2>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
