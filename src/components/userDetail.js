import React from "react";

import { BiPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

const UserDetail = ({ setOpenUser, data, setUserInfo }) => {
  return (
    <div
      className=" xm:w-full md:w-80  shadow-lg  rounded-xl overflow-hidden relative"
      style={{ background: "rgba(255,255,255,.5)" }}
    >
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <div className="flex-shrink-0  relative  ">
            <img
              className="h-full w-full object-cover "
              src={
                data.thumbnail !== ""
                  ? data.thumbnail
                  : "https://floodhomesinc.com/wp-content/uploads/2016/12/male-profile-image-placeholder.png"
              }
              alt="profile"
            />
          </div>
          <div className="ml-4">
            <div className="text-base flex items-center font-medium text-gray-700">
              {data.username}
              <div className="h-1 w-1 rounded-full bg-green-500  mx-1  " />
              {data.nickname}
            </div>

            <div className=" py-1 items-center  flex text-base  font-medium   text-blue-500">
              <a
                href={`tel:${data.phone_number}`}
                className="p-2 mx-1 rounded-full cursor-pointer bg-green-400 text-white"
              >
                <BiPhoneCall size={25} />
              </a>
              <a
                href={`mailto:${data.email}`}
                className="p-2 mx-1 rounded-full cursor-pointer bg-blue-400 text-white"
              >
                <MdEmail size={25} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex absolute right-4 top-0 ">
        <div
          className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center  text-black  rounded my-2"
          style={{ background: "rgba(255,255,255,.5)" }}
          onClick={() => {
            setOpenUser(false);
            setUserInfo({});
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
