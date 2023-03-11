import React from "react";
import { NavLink } from "react-router-dom";
function NotFound() {
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center -mt-20">
      <div className="text-6xl font-bold text-green-400 -mt-28 flex items-center">
        404
      </div>
      <div className="text-purple-400">
        Ooops Sorry! Page your looking not Found
      </div>
      <NavLink
        to="/"
        className="flex text-blue-400 bg-green-200 cursor-pointer hover:bg-blue-400 hover:text-white py-1 px-2 rounded-xl my-2 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mx-1  "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>{" "}
        Return Home
      </NavLink>
    </div>
  );
}

export default NotFound;
