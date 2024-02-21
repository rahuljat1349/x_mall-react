import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import { registerUser } from "../../Features/User/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";

export default function () {
  const navigate = useNavigate()
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setFormData] = useState({
    name: "",
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
    console.log(token);
    e.preventDefault();
    // Dispatch the action to register the user
    dispatch(registerUser(formData));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full flex justify-center items-center  text-gray-500  py-4 px-8 sm:px-10">
          <div className="flex justify-center sm:w-[80%] md:w-[60%] lg:w-[40%] w-full">
            <form
              action=""
              className="shadow-lg w-full my-4 rounded-xl p-4 gap-8 flex flex-col justify-center items-center "
            >
              <h2 className="text-2xl ">
                SignUp to <span className="sigle-day-regular">xMall</span>
              </h2>
              <div className="relative w-full items-center justify-center flex">
                <i
                  className={`bi sm:text-lg cursor-pointer bi-person-fill z-10 absolute left-[13%] md:text-2xl`}
                ></i>
                <input
                  name="name"
                  onChange={handleChange}
                  className="w-[80%]  border-solid duration-300 px-12 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 outline-none rounded-md"
                  placeholder="Name"
                  type="text"
                  required
                />
              </div>
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
                ></i>
              </div>
              <div className="w-[80%] text-[10px] sm:text-sm items-center flex">
                <Checkbox
                  id="check"
                  {...label}
                  defaultChecked
                  sx={{
                    color: grey[700],
                    "&.Mui-checked": {
                      color: grey[600],
                    },
                  }}
                />{" "}
                <label htmlFor="check">Remember Me</label>
              </div>

              <button
                onClick={handleSignUp}
                className="w-[80%] p-2 bg-red-400 hover:bg-red-500 text-white duration-300 outline-none rounded-md"
              >
                SignUp
              </button>
              <h2 className="text-xs      ">
                Already have an Account?{" "}
                <Link className="text-red-400" to={"/login"}>
                  Login here
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
