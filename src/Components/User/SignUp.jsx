import React, { useState } from "react";
import { Link } from "react-router-dom";
import { red } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function () {
  const [passwordType, setPasswordType] = useState("password");
  return (
    <>
      <div className="w-full flex justify-center items-center  text-red-500  py-4 px-8 sm:px-10">
        <div className="flex justify-center sm:w-[80%] md:w-[60%] lg:w-[40%] w-full">
          <form
            action=""
            className="shadow-2xl w-full rounded-xl p-4 gap-6 flex flex-col justify-center items-center "
          >
            <h2 className="text-2xl ">
              SignUp to <span className="sigle-day-regular">pinkMall</span>
            </h2>
            <input
              className="w-[80%]  border-solid duration-300 focus:border-red-500 border-red-200 border-2 text-red-500 p-2 outline-none rounded-md"
              placeholder="John Doe"
              type="text"
              required
            />
            <input
              className="w-[80%]  border-solid duration-300 focus:border-red-500 border-red-200 border-2 text-red-500 p-2 outline-none rounded-md"
              placeholder="john@example.com"
              type="email"
              required
            />
            <div className="w-[80%] items-center flex">
              <input
                className="w-full border-solid  duration-300 focus:border-red-500 border-red-200 border-2 text-red-500 p-2 outline-none rounded-md"
                placeholder="Create a Password"
                type={passwordType}
                required
              />
              <i
                onClick={() => {
                  setPasswordType((type) =>
                    type === "text" ? "password" : "text"
                  );
                }}
                className={`bi sm:text-lg -ml-8 md:text-2xl ${
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
                  color: red[900],
                  "&.Mui-checked": {
                    color: red[600],
                  },
                }}
              />{" "}
              <label htmlFor="check">Remember Me</label>
            </div>

            <button className="w-[80%] p-2  border-solid hover:bg-red-400 hover:text-white duration-300 border-red-400 border-2 outline-none rounded-md">
              SignUp
            </button>
            <h2 className="text-xs      ">
              Already have an Account?{" "}
              <Link className="text-red-700" to={"/login"}>
                Login here
              </Link>
              .
            </h2>
          </form>
        </div>
      </div>
    </>
  );
}
