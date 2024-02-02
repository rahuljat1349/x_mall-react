import React from "react";

export default function Footer() {
  return (
    <>
      <div className="bg-red-100 border-red-200 border-solid border-t-[2px] px-4 md:px-20 grid grid-cols-4 content-center pb-12 pt-6 text-red-600 font-semibold text-xs md:text-sm ">
        <div>
          <ul>
            <li className="text-gray-700 mb-2 text-sm font-bold m:text-lg">
              ABOUT
            </li>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Wholesalers</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="text-gray-700 mb-2 text-sm font-bold m:text-lg">
              HELP
            </li>
            <li>Payments</li>
            <li>Shipping</li>
            <li>Return Policy</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="text-gray-700 mb-2 text-sm font-bold m:text-lg">
              Policy
            </li>
            <li>Cancellation</li>
            <li>Terms Of Use</li>
            <li>Security</li>
            <li>Privacy</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="text-gray-700 mb-2 text-sm font-bold m:text-lg">
              Social
            </li>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Youtube</li>
          </ul>
        </div>
      </div>
    </>
  );
}
