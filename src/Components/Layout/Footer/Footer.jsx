import React from "react";

export default function Footer() {
  return (
    <>
      <div className="bg-gray-900 items-start p-4 flex justify-around w-full md:px-10 text-white font-semibold md:text-sm ">
        <div className="w-full p-2 flex flex-col gap-2 justify-start items-center">
          <h1 className="sm:text-sm md:text-lg text-[10px]">
            DOWNLOAD OUR APP
          </h1>
          <p className="text-[8px] md:text-xs mb-4">
            Download App for Android and IOS mobile phone.
          </p>
          <div className="flex justify-center items-center">
            <img
              className="w-16 cursor-pointer sm:w-36"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fuploads-ssl.webflow.com%2F5b4a11e42d24ef65774660bb%2F5e7f8ad0dc544571a7ed6923_AppStore_Icon-p-800.png&f=1&nofb=1&ipt=570296b04173e7e361cc136e7c194ad4f920f840fc8c78e8453d04da0a21f73a&ipo=images"
              alt="Apple Store"
            />
            <img
              className="w-16 cursor-pointer sm:w-32"
              src="http://www.pngmart.com/files/10/Get-It-On-Google-Play-PNG-Clipart.png"
              alt="Google Play"
            />
          </div>
        </div>
        <div className="w-full p-2 flex flex-col gap-2 justify-start items-center">
          <h1 className="sigle-day-regular text-red-400 sm:text-lg md:text-xl text-[10px]">
            xMall
          </h1>
          <p className="text-[8px] md:text-xs">Honesty is Our first Policy.</p>
          <p className="text-[8px] md:text-xs font-serif font-thin">
            Copyrights 2024 &#169; msInfotech.
          </p>
        </div>
        <div className="w-full p-2 cursor-pointer flex flex-col gap-2 justify-start items-center">
          <h1 className="sm:text-sm md:text-lg text-[10px] underline ">
            Follow Us
          </h1>
          <div className="text-[8px] md:text-xs flex gap-2 flex-col">
            <a>Twitter</a>
            <a>Instagram</a>
            <a>Facebook</a>
          </div>
        </div>
      </div>
    </>
  );
}
