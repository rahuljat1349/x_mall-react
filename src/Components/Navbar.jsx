import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <>
      {/* Sticky Navbar */}
      <div className="w-full sticky z-50 top-0 bg-pink-50 items-center flex gap-2 px-4 md:px-10  justify-between py-3">
        <div
          onClick={() => {
            console.log(menu);
            setMenu((state) => {
              return !state;
            });
          }}
          className="sm:hidden"
        >
          <i className={`bi bi-${menu ? "x-lg" : "list"}`}></i>
        </div>

        <div className="text-lg md:text-2xl">
          <Link to={"/"}>
            {" "}
            <h1 className="text-red-400 sigle-day-regular">pinkMall</h1>{" "}
          </Link>
        </div>
        <div className="sm:block hidden">
          <ul className="flex items-center gap-2 md:gap-6">
            <Link to={"/"}>
              {" "}
              <li
                className={`${
                  location.pathname === "/" ? "text-red-500" : "text-gray-500"
                }`}
              >
                Home
              </li>
            </Link>
            <Link to={"/products"}>
              {" "}
              <li
                className={`${
                  location.pathname === "/products"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                Products
              </li>
            </Link>
            <Link to={"/about"}>
              <li
                className={`${
                  location.pathname === "/about"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                About Us
              </li>
            </Link>
            <Link to={"/contact"}>
              <li
                className={`${
                  location.pathname === "/contact"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                Contact Us
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex lg:gap-8 lg:text-xl md:text-xs py-2 gap-2">
          <Link to={"/profile"}>
            <i className={`bi bi-search`}></i>
          </Link>
          <Link to={"/cart"}>
            <i
              className={`bi bi-cart3 ${
                location.pathname === "/cart" ? "text-red-500" : "text-gray-900"
              }`}
            ></i>
          </Link>
          <Link to={"/profile"}>
            <i
              className={`bi bi-person-circle ${
                location.pathname === "/profile"
                  ? "text-red-500"
                  : "text-gray-900"
              }`}
            ></i>
          </Link>
        </div>
      </div>
      <div
        className={`items-center ${
          menu ? "block" : "hidden"
        } sticky pb-2 duration-500 px-4 md:px-10 top-12 z-50 bg-pink-50 md:gap-6`}
      >
        <ul className=" ">
          <Link to={"/"}>
            {" "}
            <li
              className={`${
                location.pathname === "/" ? "text-red-500" : "text-gray-500"
              }`}
            >
              Home
            </li>
          </Link>
          <Link to={"/products"}>
            {" "}
            <li
              className={`${
                location.pathname === "/products"
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              Products
            </li>
          </Link>
          <Link to={"/about"}>
            <li
              className={`${
                location.pathname === "/about"
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              About Us
            </li>
          </Link>
          <Link to={"/contact"}>
            <li
              className={`${
                location.pathname === "/contact"
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              Contact Us
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}
