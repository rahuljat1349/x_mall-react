import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <nav className="w-full hidden sm:flex text-[12px] text-gray-500 md:px-20 px-4 py-3  justify-between">
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
      <div className="w-full sticky z-50 top-0 bg-white items-center flex gap-2 px-4 md:px-20  justify-between py-2 md:py-8">
        <div className="md:text-4xl">
          <h1 className="text-gray-600">Lumburr</h1>{" "}
        </div>
        <div className=" hover:border-red-200 gap-3 justify-between flex items-center px-3 sm:w-72 lg:w-96 xl:w-[40vw] border-solid border-[0.5px] rounded-sm border-gray-300">
          <select className="text-gray-500 text-xs" name="" id="">
            <option value="All">All</option>
          </select>
          <input
            className="outline-none w-[80%] p-3 text-xs"
            placeholder="Search for anything"
            type="text"
          />
          <div className=" w-4 relative right-0">
            <i className="bi float-right bi-search"></i>
          </div>
        </div>

        <div className="flex lg:gap-8 lg:text-xl md:text-xs gap-2">
          <i className="bi bi-heart"></i>
          <Link to={"/profile"}>
            <i className="bi bi-person-circle"></i>
          </Link>
          <Link to={"/cart"}>
            <i className="bi bi-cart3"></i>
          </Link>
        </div>
      </div>

      {/* Bottom navbar */}
      <div className="px-2 sticky top-14 md:top-24 z-50 bg-white md:px-20">
        <div className="w-full text-[12px] text-gray-500 items-center flex gap-2  justify-between py-3 md:py-4 border-gray-200 border-solid border-y-[1px]">
          <div>
            <ul className="flex items-center gap-2 md:gap-6">
              <li>
                <select name="" id="">
                  <option value="DEMOS">DEMOS</option>
                </select>
              </li>
              <li>
                <select name="" id="">
                  <option value="PAGES">PAGES</option>
                </select>
              </li>
              <li>
                <select name="" id="">
                  <option value="SHOP">SHOP</option>
                </select>
              </li>
              <li>
                <select name="" id="">
                  <option value="COLLECTIONS">COLLECTIONS</option>
                </select>
              </li>
              <li>
                <select name="" id="">
                  <option value="BLOG">BLOG</option>
                </select>
              </li>
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
