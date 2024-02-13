import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";

import { useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
export default function Navbar() {
  const location = useLocation();
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <>
      {/* Sticky Navbar */}
      <div className="w-full sticky z-50 top-0 items-center bg-gray-900  flex gap-2 px-4 md:px-10  justify-between py-1">
        <div
          onClick={() => {
            console.log(menu);
            setMenu((state) => {
              return !state;
            });
          }}
          className="sm:hidden"
        >
          <i className={`bi text-gray-500 bi-${menu ? "x-lg" : "list"}`}></i>
        </div>

        <div className="text-lg items-center md:text-2xl">
          <Link to={"/"}>
            {" "}
            <h1 className="text-gray-300 sigle-day-regular">xMall</h1>{" "}
          </Link>
        </div>
        <div className="sm:block  hidden">
          <ul className="flex items-center gap-2 md:gap-6">
            <Link to={"/"}>
              {" "}
              <li
                className={`${
                  location.pathname === "/" ? "text-white" : "text-gray-500"
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
                    ? "text-white"
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
                    ? "text-white"
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
                    ? "text-white"
                    : "text-gray-500"
                }`}
              >
                Contact Us
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex lg:gap-8 items-center lg:text-xl md:text-xs py-2 gap-2">
          <div className="sm:hidden">
            <SearchIcon
              sx={{
                color: grey[700],
              }}
            />
          </div>
          <div className="hidden sm:block">
            <Search
              sx={{
                color: grey[400],
              }}
            >
              <SearchIconWrapper>
                <SearchIcon
                  sx={{
                    color: grey[700],
                  }}
                />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </div>

          <Link to={"/cart"}>
            <i
              className={`bi bi-cart3 ${
                location.pathname === "/cart" ? "text-white" : "text-gray-500"
              }`}
            ></i>
          </Link>
          <Link to={"/profile"}>
            <i
              className={`bi bi-person-circle ${
                location.pathname === "/profile"
                  ? "text-white"
                  : "text-gray-500"
              }`}
            ></i>
          </Link>
        </div>
      </div>
      <div
        className={`items-center ${
          menu ? "block" : "hidden"
        } sticky pb-2 duration-500 px-4 md:px-10 top-12 z-50 bg-gray-800 scroll-smooth  md:gap-6`}
      >
        <ul className=" ">
          <Link to={"/"}>
            {" "}
            <li
              className={`${
                location.pathname === "/" ? "text-white" : "text-gray-500"
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
                  ? "text-white"
                  : "text-gray-500"
              }`}
            >
              Products
            </li>
          </Link>
          <Link to={"/about"}>
            <li
              className={`${
                location.pathname === "/about" ? "text-white" : "text-gray-500"
              }`}
            >
              About Us
            </li>
          </Link>
          <Link to={"/contact"}>
            <li
              className={`${
                location.pathname === "/contact"
                  ? "text-white"
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