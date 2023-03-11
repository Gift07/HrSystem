import React, { useState, useEffect } from "react";

import axiosInstance from "../axios";
import { BiPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

const Users = ({ setOpenUsers }) => {
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      await axiosInstance.get("auth/users/").then((res) => {
        setUserData(res.data);
      });
    };
    dataFetch();
  }, []);

  const year = new Date().getFullYear();

  return (
    <div
      className="relative h-screen"
      style={{
        width: "98vw",
        overflow: "hidden",
      }}
    >
      <div className="my-4">
        <div className="ml-10 md:w-1/2 w-full">
          <form className="flex items-center text-gray-500 ">
            <div className="flex absolute right-4 top-6 ">
              <div
                className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center  text-black  rounded my-2"
                style={{ background: "rgba(255,255,255,.5)" }}
                onClick={() => {
                  setOpenUsers(false);
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
            <input
              placeholder="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              style={{
                background: "rgba(255,255,255,.4)",
              }}
              className="py-2 px-2 lowercase my-4 rounded-xl     w-2/3 placeholder-gray-500 focus:outline-none focus:border-transparent"
            />
          </form>
        </div>
        <div
          style={{
            width: "98vw",
            height: "90vh",
          }}
          className="-my-2  overflow-x-auto"
        >
          <div className="-my-2  overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 ">
              <div className=" overflow-hidden  sm:rounded-2xl ">
                <table
                  className="min-w-full "
                  style={{
                    background: "rgba(255,255,255,.4)",
                  }}
                >
                  <thead
                    style={{
                      background: "rgba(255,255,255,.4)",
                    }}
                  >
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                      >
                        NAME
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                      >
                        ALIAS
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                      >
                   CONTACTS
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                      >
                              EMAIL
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-400  ">
                    {userData
                      .sort((a, b) => a.username.localeCompare(b.username))
                      .filter((item) => {
                        if (search === "") {
                          return item;
                        } else if (
                          item.username
                            .toUpperCase()
                            .includes(search.toUpperCase())
                        ) {
                          return item;
                        } else if (
                          item.place
                            .toUpperCase()
                            .includes(search.toUpperCase())
                        ) {
                          return item;
                        } else if (
                          item.adress
                            .toUpperCase()
                            .includes(search.toUpperCase())
                        ) {
                          return item;
                        } else if (
                          item.phone_number
                            .toUpperCase()
                            .includes(search.toUpperCase())
                        ) {
                          return item;
                        } else if (
                          item.nickname
                            .toUpperCase()
                            .includes(search.toUpperCase())
                        ) {
                          return item;
                        } else if (
                          item.gender
                            .toUpperCase()
                            .includes(search.toUpperCase())
                        ) {
                          return item;
                        }
                        return false;
                      })
                      .filter((item) => item.is_active === true)
                      .map((user) => (
                        <tr key={user.id} >
                          <td className="px-6 py-4 whitespace-nowrap ">
                            <div className="flex items-center">
                              <div className="cursor-pointer flex-shrink-0 h-14 w-14  rounded-full ">
                                {user.thumbnail !== "" ? (
                                  <img
                                    className="h-full w-full rounded-3xl  object-cover"
                                    src={user.thumbnail}
                                    alt="profile"
                                  />
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-full w-full text-gray-300"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                              <div className="ml-4">
                                <div
                                  className="text-base font-medium text-white"
                                >
                                  {user.username}
                                </div>
                                <div className="text-tiny text-gray-600">
                                  {user.email}
                                </div>
                                <div className="text-tiny  px-2 inline-flex leading-5 font-medium rounded-full bg-white text-gray-800 ">
                                  {user.phone_number}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className=" ">
                              <button className="bg-purple-500 text-white rounded-lg py-1 px-2 " style={{
                                boxShadow:"0 0 10px rgba(138, 92, 246, .6)"
                              }}>{user.nickname}</button>
                            </div>
                          </td>
                          <td >
                            <div className=" flex justify-center items-center  ">
         
                            <div className=" rounded-full h-12 w-12 relative  cursor-pointer bg-green-400 text-white flex justify-center items-center">
                            <span class="animate-ping absolute opacity-5 hover:opacity-100 flex h-full w-full rounded-full bg-green-400 "/>
                      <a href={`tel:${user.phone_number}`}>
                                <BiPhoneCall size={25} />
                              </a>
                            </div>
                            </div>
                          </td>
                          <td>
                            <div className=" rounded-full h-12 w-12 cursor-pointer bg-blue-400 text-white flex justify-center items-center">
                              <a href={`mailto:${user.email}`}>
                                <MdEmail size={25} />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" col-span-12  py-10  flex flex-wrap justify-center ">
        <a
          href="https://wasafimediagroup.co.tz"
          rel="noreferrer"
          target="_blank"
          className="flex justify-center  text-base mt-10 text-green-500"
        >
          {`Wasafi Media Copyright © ${year}.`}
        </a>
      </div>
    </div>
  );
};

export default Users;
