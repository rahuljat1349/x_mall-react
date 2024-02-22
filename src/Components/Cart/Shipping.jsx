import React, { useState, useEffect } from "react";
import { Country, State } from "country-state-city";

export default function Shipping() {
  const [orderDetails, setOrderDetails] = useState({
    address: "",
    city: "",
    pinCode: "",
    phone: "",
    country: "",
    state: "",
  });

  useEffect(() => {
    // You can perform any side effects or initialization here
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    // Implement logic for handling the "Continue" button click
    console.log("Order Details:", orderDetails);
    // Add further logic such as form submission, validation, etc.
  };

  return (
    <>
      <div className="w-full flex justify-center items-center text-gray-500  py-4 px-8 sm:px-10">
        <div className="flex justify-center items-center sm:w-[80%] md:w-[60%] lg:w-[40%] w-full">
          <form
            action=""
            className="shadow-lg  w-full rounded-xl p-4 gap-4 my-4 flex flex-col justify-center items-center "
          >
            <h2 className="text-2xl border-solid border-gray-400 border-b-[1px] w-[60%] text-center p-4">
              Shipping Details
            </h2>

            {/* Address Input */}
            <div className="relative w-full items-center justify-center flex">
              <i
                className={`bi sm:text-lg cursor-pointer bi-house-fill z-10 absolute left-[13%] md:text-2xl`}
              ></i>
              <input
                name="address"
                onChange={handleChange}
                value={orderDetails.address}
                className="w-[80%]  border-solid duration-300 px-12 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 outline-none rounded-md"
                placeholder="Address"
                type="text"
                required
              />
            </div>

            {/* City Input */}
            <div className="w-[80%] relative items-center flex">
              <i
                className={`bi sm:text-lg cursor-pointer bi-building-fill z-10 absolute left-[4%] md:text-2xl`}
              ></i>
              <input
                name="city"
                onChange={handleChange}
                value={orderDetails.city}
                className="w-full border-solid px-12 duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 outline-none rounded-md"
                placeholder="City"
                type="text"
                required
              />
            </div>

            {/* Pin Code Input */}
            <div className="w-[80%] relative items-center flex">
              <i
                className={`bi sm:text-lg cursor-pointer bi-geo-alt-fill z-10 absolute left-[4%] md:text-2xl`}
              ></i>
              <input
                name="pinCode"
                onChange={handleChange}
                value={orderDetails.pinCode}
                className="w-full border-solid px-12 duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 outline-none rounded-md"
                placeholder="Pin Code"
                type="number"
                required
              />
            </div>

            {/* Phone Input */}
            <div className="w-[80%] relative items-center flex">
              <i
                className={`bi sm:text-lg cursor-pointer bi-telephone-fill z-10 absolute left-[4%] md:text-2xl`}
              ></i>
              <input
                name="phone"
                onChange={handleChange}
                value={orderDetails.phone}
                className="w-full border-solid px-12 duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 outline-none rounded-md"
                placeholder="Phone"
                type="number"
                required
              />
            </div>

            {/* Country Dropdown */}
            <div className="w-[80%] relative items-center flex">
              <i
                className={`bi sm:text-lg cursor-pointer bi-globe-central-south-asia z-10 absolute left-[4%] md:text-2xl`}
              ></i>
              <select
                name="country"
                onChange={handleChange}
                value={orderDetails.country}
                className="w-full border-solid px-12 duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 outline-none rounded-md"
                required
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* State Dropdown */}
            <div className="w-[80%] relative items-center flex">
              <i
                className={`bi sm:text-lg cursor-pointer bi-map-fill z-10 absolute left-[4%] md:text-2xl`}
              ></i>
              <select
                disabled={!orderDetails.country}
                name="state"
                onChange={handleChange}
                value={orderDetails.state}
                className="w-full border-solid px-12 duration-300 focus:border-gray-400 border-gray-200 border-2 text-gray-500 p-2 outline-none rounded-md"
                required
              >
                <option value="">State</option>
                {orderDetails &&
                  State.getStatesOfCountry(orderDetails.country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Continue Button */}
            <button
              disabled={!orderDetails.state}
              onClick={handleContinue}
              className="w-[80%] disabled:bg-red-300 p-2 bg-red-500 text-white hover:bg-red-600 duration-300 outline-none rounded-md"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
