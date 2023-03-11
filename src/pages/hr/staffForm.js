import React from "react";
import Avatar from "@material-ui/core/Avatar";

import { MdSubtitles } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { MdEmail } from "react-icons/md";
import { HiPhone } from "react-icons/hi";
import { RiTimerFill } from "react-icons/ri";
import { RiTimerLine } from "react-icons/ri";
import { BiDollar } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";
import { CgGenderMale } from "react-icons/cg";
import { IoChevronBackSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const UserForm = () => {
  return (
    <div className="grid grid-cols-12 w-screen">
      <div className="ml-10 text-lg font-medium text-blue-500 flex items-center my-2 absolute hidden md:flex">
        <NavLink
          to="/hr"
          className="h-10 w-10 rounded-full bg-gray-300 flex justify-center mr-2 items-center"
        >
          <IoChevronBackSharp />
        </NavLink>
        User Registration
      </div>

      <div className="col-span-10 col-start-2  rounded-xl  md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-4 xl:col-start-5">
        <form>
          <div className="rounded-t-xl bg-white overflow-hidden shadow  my-2">
            <div className="font-semibold text-white text-xl bg-purple-500 pt-10 p-4">
              Personal Info
            </div>
            <div className="p-4">
              <div className="flex items-center">
                <Avatar className="bg-gray-200 mr-2" />
                <input
                  placeholder="Name"
                  className="py-2 px-2 my-2 text-purple-500 placeholder-purple-700 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-lg bg-purple-100  w-full"
                />
              </div>
              <div className="flex items-center">
                <Avatar className="bg-gray-200 mr-2">
                  <RiTimerFill />
                </Avatar>
                <input
                  placeholder="Age"
                  className="py-2 px-2 my-2 text-purple-500 placeholder-purple-700 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-lg bg-purple-100  w-full"
                />
              </div>
              <label className="w-64 flex mt-2 items-start px-2 py-2 bg-white rounded-xl  tracking-wide uppercase  cursor-pointer hover:bg-purple-500 hover:text-white text-purple-600 ease-linear transition-all duration-150">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                  <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  Upload Thumbnail
                </span>
                <input type="file" className="hidden" />
              </label>

              <div className="flex items-center">
                <Avatar className="bg-gray-200 mr-2">
                  <CgGenderMale />
                </Avatar>

                <select className="form-select text-purple-700 p-2 bg-gray-100 rounded-lg pr-4 w-full ml-2 py-2 px-2 my-2 placeholder-purple-700 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-lg bg-purple-100  w-full">
                  <option selected className="text-purple-700">
                    Select Gender
                  </option>
                  <option value="1" className="text-purple-700">
                    Male
                  </option>
                  <option value="2">Female</option>
                  <option value="3">Others</option>
                </select>
              </div>
              <div className="flex items-center">
                <Avatar className="bg-gray-200 mr-2">
                  <MdSubtitles />
                </Avatar>
                <input
                  placeholder="Title"
                  className="py-2 px-2 text-purple-500 placeholder-purple-700 my-2 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-lg bg-purple-100  w-full"
                />
              </div>

              <div className="flex items-center">
                <Avatar className="bg-blue-400 mr-2 text-red-300">
                  <TiLocation />
                </Avatar>
                <input
                  placeholder="Email"
                  className="py-2 px-2 my-2 text-purple-500 placeholder-purple-700 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-lg bg-purple-100  w-full"
                />
              </div>

              <div className="flex items-center">
                <Avatar className="bg-blue-400 mr-2 text-red-300">
                  <MdEmail />
                </Avatar>
                <input
                  placeholder="Adress"
                  className="py-2 px-2 my-2 text-purple-500 focus:ring-2 placeholder-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-lg bg-purple-100  w-full"
                />
              </div>

              <div className="flex items-center">
                <Avatar className="bg-blue-400 mr-2 text-red-300">
                  <HiPhone />
                </Avatar>
                <input
                  placeholder="Phone Number"
                  className="py-2 px-2 my-2 text-purple-500 focus:ring-2 placeholder-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-lg bg-purple-100  w-full"
                />
              </div>
            </div>
          </div>

          <div className="rounded-t-xl bg-white overflow-hidden shadow  my-2">
            <div className="font-semibold text-white text-xl bg-green-400 pt-10 p-4">
              Contract
            </div>
            <div className="p-4">
              <div>
                <div className="flex items-center">
                  <Avatar className="bg-gray-200 mr-2">
                    <RiTimerFill />
                  </Avatar>
                  <input
                    placeholder="Start Time"
                    type="date"
                    className="py-2 text-green-700 px-2 placeholder-green-700 my-2 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent rounded-lg bg-green-100  w-full"
                  />
                </div>

                <div className="flex items-center">
                  <Avatar className="bg-blue-400 mr-2 text-red-300">
                    <RiTimerLine />
                  </Avatar>
                  <input
                    placeholder="End Time"
                    type="date"
                    className="py-2 px-2 my-2 text-green-700 placeholder-green-700 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent rounded-lg bg-green-100  w-full"
                  />
                </div>
                <label className="w-64 flex mt-2 items-start px-2 py-2 bg-white rounded-xl  tracking-wide uppercase  cursor-pointer hover:bg-green-500 hover:text-white text-green-600 ease-linear transition-all duration-150">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                    <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal">
                    Upload Contract PDF
                  </span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-t-xl bg-white overflow-hidden shadow  my-2">
            <div className="font-semibold text-white text-xl bg-blue-400 pt-10 p-4">
              Salary
            </div>
            <div className="p-4">
              <div>
                <div className="flex items-center">
                  <Avatar className="bg-gray-200 mr-2">
                    <BiDollar />
                  </Avatar>
                  <input
                    placeholder="Gross Salary"
                    className="py-2 text-purple-700 px-2 placeholder-purple-700 my-2 focus:ring-2 focus:outline-none  focus:ring-purple-600 focus:border-transparent rounded-lg bg-purple-100  w-full"
                  />
                </div>

                <div className="flex items-center">
                  <Avatar className="bg-blue-400 mr-2 text-red-300">
                    <GiTakeMyMoney />
                  </Avatar>
                  <input
                    placeholder="Basic Salary"
                    className="py-2 px-2 my-2 text-purple-500 placeholder-purple-700 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-lg bg-purple-100  w-full"
                  />
                </div>

                <div className="flex items-center">
                  <Avatar className="bg-blue-400 mr-2 text-red-300">N</Avatar>
                  <input
                    placeholder="NSSF"
                    className="py-2 px-2 my-2 text-purple-500 placeholder-purple-700 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-lg bg-purple-100  w-full"
                  />
                </div>

                <div className="flex items-center">
                  <Avatar className="bg-blue-400 mr-2 text-red-300">P</Avatar>
                  <input
                    placeholder="PayE"
                    className="py-2 px-2 my-2 text-purple-500 placeholder-purple-700 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-lg bg-purple-100  w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-lg"
            type="submit"
          >
            Save User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
