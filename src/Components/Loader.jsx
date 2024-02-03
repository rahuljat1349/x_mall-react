import React from "react";

export default function Loader() {
  return (
    <div className="flex w-[100vw] justify-center h-[30vh] items-center">
      <div className=" border-[1px] border-red-200 rounded-full h-20 w-20 animate-spin border-t-red-500"></div>
    </div>
  );
}
