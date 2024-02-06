import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <>
      <nav className="w-full hidden sm:flex text-[12px] text-gray-500 md:px-20 px-4 py-2  justify-between">
        <div>
          <ul className="flex gap-8">
            <li>
              <i className="bi bi-geo-alt"></i>
              <span> Store location</span>
            </li>
            <li>Gift Card</li>
            <li>Teams</li>
            <li>Investors</li>
          </ul>
        </div>
        <div>
          <ul className="flex gap-2">
            <li>
              <select name="" id="">
                <option value="Eng">English</option>
                <option value="Hin">Hindi</option>
                <option value="Ger">Germen</option>
              </select>
            </li>
            <li>
              <select name="" id="">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="cad">CAD</option>
              </select>
            </li>
          </ul>
        </div>
      </nav>
      <hr />

      {/* Sticky Navbar */}
      <div className="w-full sticky z-50 top-0 bg-white items-center flex gap-2 px-4 md:px-20  justify-between py-2">
        <div className="md:text-4xl">
          <Link to={"/"}>
            {" "}
            <h1 className="text-red-400 sigle-day-regular">pinkMall</h1>{" "}
          </Link>
        </div>
        <div className=" hover:border-red-200 gap-2 justify-between flex items-center px-3 sm:w-72 lg:w-96 xl:w-[40vw] border-solid border-[0.5px] rounded-sm border-gray-300">
          <select className="text-gray-500 text-xs" name="" id="">
            <option value="All">All</option>
          </select>
          <input
            className="outline-none text-gray-600  w-[90%] p-3 text-xs"
            placeholder="Search for anything"
            type="text"
          />
          <div className=" w-4 relative right-0">
            <i className="bi float-right bi-search"></i>
          </div>
        </div>

        <div className="flex lg:gap-8 lg:text-xl md:text-xs gap-2">
          <Link to={"/wishlist"}>
            <i
              className={`bi bi-heart ${
                location.pathname === "/wishlist"
                  ? "text-red-500"
                  : "text-gray-900"
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
          <Link to={"/cart"}>
            <i
              className={`bi bi-cart3 ${
                location.pathname === "/cart" ? "text-red-500" : "text-gray-900"
              }`}
            ></i>
          </Link>
        </div>
      </div>

      {/* Bottom navbar */}
      <div className="px-2 sticky top-14 md:top-14 z-50 bg-white md:px-20">
        <div
          className={`w-full text-[12px] items-center flex gap-2  justify-between py-1 md:py-2 border-gary-200 border-solid border-y-[1px]`}
        >
          <div>
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
          <div className="hidden md:block">
            <ul className="flex items-center gap-2 md:gap-6">
              <li>
                <i className="bi bi-chat-square"></i>
                <span> Online Support</span>
              </li>
              <li>
                <i className="bi bi-person-rolodex"></i>
                <span> Hotline: (505) 555-0125</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
