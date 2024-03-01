import React from "react";

export default function Loader() {
  return (
    <div className="flex w-[100vw] justify-center h-[100vh] items-center">
      <div className=" border-t-4 rounded-full h-20 w-20 animate-spin border-t-black"></div>
    </div>
  );
}
