import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Setting = () => {
  const [userData, setUserData] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [maritual_status, setMaritual_status] = useState("");
  const [number_of_kids, setNumber_of_kids] = useState("");
  const [place, setPlace] = useState("");

  const [openPassword, setOpenPassword] = useState(false);
  const [old_password, setOld_password] = useState("");
  const [new_password, setNew_password] = useState("");

  // loadings
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const dataFetch = async () => {
      await axiosInstance.get("auth/single-user/").then((res) => {
        setUserData(res.data[0]);
        setUsername(res.data[0].username);
        setEmail(res.data[0].email);
        setPhone_number(res.data[0].phone_number);
        setAge(res.data[0].age);
        setGender(res.data[0].gender);
        setMaritual_status(res.data[0].maritual_status);
        setNumber_of_kids(res.data[0].number_of_kids);
        setPlace(res.data[0].place);
      });
    };

    dataFetch();
  }, []);

  const handleOnSubmit = async (e) => {
    setUpdateLoading(true);
    e.preventDefault();
    await axiosInstance
      .patch(`auth/users/${userData.id}/`, {
        username,
        gender,
        age,
        email,
        phone_number,
        place,
        maritual_status,
        number_of_kids,
      })
      .then((res) => {
        console.log(res);
        toast.success("successful updated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setUpdateLoading(false);
      })
      .catch((err) => {
        toast.error(err, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setUpdateLoading(false);
      });
  };

  return (
    <div className="grid grid-cols-12 w-screen mb-10">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="col-span-12 mx-4   md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-4 xl:col-start-5">
        <div className="text-3xl font-bold text-gray-400">Profile Edit</div>
        {openPassword === false && (
          <button
            onClick={() => {
              setOpenPassword(true);
            }}
            className="  text-blue-500  flex"
          >
            Change Password
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        )}
        {openPassword && (
          <form
            onSubmit={async (e) => {
              setPasswordLoading(true);
              e.preventDefault();
              await axiosInstance
                .put("auth/change-password/", {
                  old_password,
                  new_password,
                })
                .then((res) => {
                  setOpenPassword(false);
                  toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  setPasswordLoading(false);
                  setOld_password("");
                  setNew_password("");
                })
                .catch((err) => {
                  setOpenPassword(false);
                  setPasswordLoading(false);
                  toast.error(err.response.data.old_password[0], {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                });
            }}
          >
            <input
              placeholder="Old password"
              value={old_password}
              onChange={(e) => {
                setOld_password(e.target.value);
              }}
              className="py-2 px-2 my-2 ring-1 ring-gray-300 text-gray-500 focus:ring-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent rounded-lg bg-gray-200  w-full"
            />
            <input
              placeholder="New password"
              value={new_password}
              onChange={(e) => {
                setNew_password(e.target.value);
              }}
              className="py-2 px-2 my-2 ring-1 ring-gray-300 text-gray-500 focus:ring-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent rounded-lg bg-gray-200  w-full"
            />
            <button
              type="submit"
              className={` ${
                passwordLoading
                  ? "h-10 w-10 flex justify-center items-center rounded-full"
                  : "px-2 py-1 rounded-xl"
              } text-green-500  hover:bg-green-500 hover:text-white ring-1 ring-green-200  bg-green-100 `}
            >
              {passwordLoading ? (
                <div className="flex">
                  <img src="loader.svg" alt="loader" className="mx-1" />
                </div>
              ) : (
                "Change"
              )}
            </button>
            <button
              className="px-2 py-1 rounded-xl
               text-white  hover:bg-blue-500 mx-2  bg-gray-300 "
              onClick={() => {
                setOpenPassword(false);
              }}
            >
              Cancel
            </button>
          </form>
        )}
        <hr className="my-4" />
        <form onSubmit={handleOnSubmit}>
          <div className="rounded-xl     my-2">
            <div className="font-semibold rounded-xl flex items-center text-white text-xl ring-1 ring-green-400 bg-green-300  p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
              Personal Info
            </div>

            <div className="p-4">
              <div className="flex items-center">
                <input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className="py-2 px-2 my-2 ring-1 ring-gray-300 text-gray-500 placeholder-gray-500 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent rounded-lg bg-gray-200  w-full"
                />
              </div>

              <div className="flex items-center">
                <input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="py-2 px-2 my-2 ring-1 ring-gray-300 text-gray-500 focus:ring-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent rounded-lg bg-gray-200  w-full"
                />
              </div>

              <div className="flex items-center">
                <input
                  placeholder="Phone Number"
                  value={phone_number}
                  onChange={(e) => {
                    setPhone_number(e.target.value);
                  }}
                  className="py-2 px-2 my-2 ring-1 ring-gray-300 text-gray-500 focus:ring-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent rounded-lg bg-gray-200  w-full"
                />
              </div>

              <div className="flex items-center">
                <input
                  placeholder="Age"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  className="py-2 px-2 my-2 ring-1 ring-gray-300 text-gray-500 placeholder-gray-500 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent rounded-lg bg-gray-200  w-full"
                />
              </div>

              <div className="flex items-center">
                <select
                  value={gender !== null ? gender : "gender"}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  className="form-select ring-1 ring-gray-300 text-gray-500 p-2 bg-gray-200 rounded-lg pr-4 w-full  py-2 px-2 my-2 placeholder-gray-500 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent rounded-lg bg-gray-200  w-full"
                >
                  <option value="null" className="text-gray-500">
                    select Gender
                  </option>
                  <option value="M" className="text-gray-500">
                    Male
                  </option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div className="flex items-center">
                <select
                  value={maritual_status}
                  onChange={(e) => {
                    setMaritual_status(e.target.value);
                  }}
                  className="form-select ring-1 ring-gray-300 text-gray-500 p-2 bg-gray-200 rounded-lg pr-4 w-full  py-2 px-2 my-2 placeholder-gray-500 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent rounded-lg bg-gray-200  w-full"
                >
                  <option value="null" className="text-gray-500">
                    select
                  </option>
                  <option value="Single" className="text-gray-500">
                    Single
                  </option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Separated">Separated</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  placeholder="Number of kids "
                  value={number_of_kids}
                  onChange={(e) => {
                    setNumber_of_kids(e.target.value);
                  }}
                  className="py-2 px-2 ring-1 ring-gray-300 text-gray-500 placeholder-gray-500 my-2 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent rounded-lg bg-gray-200  w-full"
                />
              </div>

              <div className="flex items-center">
                <input
                  placeholder="Place"
                  value={place}
                  onChange={(e) => {
                    setPlace(e.target.value);
                  }}
                  className="py-2 px-2 my-2 ring-1 ring-gray-300 text-gray-500 placeholder-gray-500 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent rounded-lg bg-gray-200  w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex">
            <button
              className={` ${
                updateLoading
                  ? "h-10 w-10 flex justify-center items-center rounded-full"
                  : "px-2 py-1 rounded-xl"
              } text-blue-500  hover:bg-blue-500 hover:text-white ring-1 ring-blue-200  bg-blue-100 `}
              type="submit"
            >
              {updateLoading ? (
                <div className="flex">
                  <img src="loader.svg" alt="loader" className="mx-1" />
                </div>
              ) : (
                "Update"
              )}
            </button>
            <Link to="/">
              <button className="bg-gray-300 mx-2 text-white px-2 py-1 rounded-lg flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
                </svg>
                Home
              </button>
            </Link>
          </div>
        </form>
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

export default Setting;
