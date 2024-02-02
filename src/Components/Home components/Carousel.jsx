import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
import React from "react";

export default function SliderCarousel() {
  return (
    <>
      <div className="w-full px-4 md:px-20 -z-50 bg-red-200 py-6">
        <Carousel responsive={responsive}>
          <div>
            <div className="bg-gray-400 hover:scale-110 duration-500 rounded-sm -z-30 w-56 lg:w-80 lg:h-80 h-56"></div>
          </div>
          <div>
            <div className="bg-gray-400 hover:scale-110 duration-500 rounded-sm w-56 lg:w-80 lg:h-80 h-56"></div>
          </div>
          <div>
            <div className="bg-gray-400 hover:scale-110 duration-500 rounded-sm w-56 lg:w-80 lg:h-80 h-56"></div>
          </div>
          <div>
            <div className="bg-gray-400 hover:scale-110 duration-500 rounded-sm w-56 lg:w-80 lg:h-80 h-56"></div>
          </div>
          <div>
            <div className="bg-gray-400 hover:scale-110 duration-500 rounded-sm w-56 lg:w-80 lg:h-80 h-56"></div>
          </div>
        </Carousel>
      </div>
    </>
  );
}
