import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Avatar } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import axiosInstance from "../../axios";

import { IoChevronBackSharp } from "react-icons/io5";
import { RiTimerFill } from "react-icons/ri";
import { RiTimerLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

import { Link, NavLink } from "react-router-dom";
import Loader from "../../components/loader";

// material ui stying
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(0,0,0,.3)",
    backdropFilter: "blur(4px)",
  },
}));

const PermissionRequest = () => {
  const [reason, setReason] = useState("");
  const [permissionData, setPermissionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);
  const [declineRequest, setDeclineRequest] = useState({});
  const [staffName, setStaffName] = useState("");
  const [openRefuse, setOpenRefuse] = useState(false);
  const [refused_reason, setRefused_reason] = useState("");

  const [open, setOpen] = React.useState(false);
  const [detail, setDetail] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const classes = useStyles();

  useEffect(() => {
    const dataFetch = async () => {
      setLoading(true);
      await axiosInstance.get("auth/permission-read/").then((res) => {
        setPermissionData(res.data);
        setLoading(false);
      });
    };

    dataFetch();
  }, []);

  const date_sub = (from_date, to_date) => {
    const date1 = new Date(from_date);
    const date2 = new Date(to_date);
    const differ = Math.abs(date1 - date2);
    return Math.ceil(differ / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className=" overflow-hidden" style={{ width: "98vw" }}>
      {/* edit */}
      {/* delete */}
      <Backdrop className={classes.backdrop} open={openDecline}>
        <div
          className="md:w-3/6 w-full   p-4 rounded-xl"
          style={{
            background: "rgba(255,255,255,.4)",
          }}
        >
          <div className="text-xl text-white font-semibold">
            Permission decline
          </div>
          <div className="flex flex-col">
            <div className="text-lg text-gray-500 font-medium">
              Are Sure want to declined {staffName} request?
            </div>
            {!openRefuse ? (
              <div className="flex">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer bg-gray-100 text-gray-500 hover:bg-gray-300 m-2"
                  onClick={() => {
                    setOpenRefuse(true);
                  }}
                >
                  YES
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer bg-gray-100 text-gray-500  m-2"
                  onClick={() => {
                    setOpenDecline(false);
                  }}
                >
                  NO
                </div>
              </div>
            ) : (
              <form
                className="flex  flex-col"
                onSubmit={(e) => {
                  e.preventDefault();
                  axiosInstance
                    .patch(`auth/permission/${declineRequest.id}/`, {
                      is_accepted: false,
                      refused_reason,
                    })
                    .then(async () => {
                      await axiosInstance
                        .get("auth/permission-read/")
                        .then((res) => {
                          setPermissionData(res.data);
                          setOpenRefuse(false);
                          setOpenDecline(false);
                          toast.success(` ${staffName}  Request  declined!`, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        });
                    });
                }}
              >
                <textarea
                  placeholder="Refused Reason"
                  value={refused_reason}
                  onChange={(e) => {
                    setRefused_reason(e.target.value);
                  }}
                  className="py-2 px-2 my-4 text-gray-500 rounded-2xl  placeholder-purple-700 focus:ring-1 focus:outline-none focus:ring-purple-600 focus:border-transparent rounded-lg   w-full"
                  style={{
                    background: "rgba(255,255,255,.4)",
                  }}
                />
                <div className="flex">
                  <button
                    type="submit"
                    className="p-2 rounded-full flex items-center justify-center cursor-pointer bg-gray-100 text-gray-500 hover:bg-gray-300 m-2"
                  >
                    Save
                  </button>
                  <div
                    className="p-2 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer bg-gray-100 text-gray-500  m-2"
                    onClick={() => {
                      setOpenRefuse(false);
                      setOpenDecline(false);
                    }}
                  >
                    cancel
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </Backdrop>

      <Backdrop className={classes.backdrop} open={open}>
        <div className=" grid grid-cols-12  w-screen">
          <div className="rounded-lg shadow bg-white p-4 col-span-10  col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4">
            <div className="text-xl mb-2 font-medium text-blue-400">
              Contract Info
            </div>
            <form className="flex flex-col">
              {!edit && (
                <div className="flex">
                  <Avatar />
                  <select className="form-select  p-2 bg-gray-100 rounded-lg pr-4 w-full ml-2">
                    <option selected>Select the User</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              )}
              <div className="flex items-center">
                <div className="h-10 w-12 text-gray-400 rounded-full bg-gray-100 flex justify-center items-center">
                  <RiTimerFill size={23} />
                </div>

                <input
                  placeholder="start date"
                  className="bg-gray-100 py-2 px-4 rounded-lg my-2 ml-2 w-full"
                />
              </div>
              <div className="flex items-center">
                <div className="h-10 w-12 text-gray-400 rounded-full bg-gray-100 flex justify-center items-center">
                  <RiTimerLine size={23} />
                </div>

                <input
                  placeholder="End date"
                  className="bg-gray-100 py-2 px-4 rounded-lg my-2 ml-2 w-full"
                />
              </div>
              <input
                type="file"
                id="myFile"
                name="filename"
                className=" my-2"
              />

              <div className="flex justify-start mt-3">
                <div className="py-1 px-2 rounded-lg bg-blue-200 text-blue-600 mr-2 cursor-pointer">
                  + Add
                </div>
                <div
                  className="py-1 px-2 rounded-lg bg-red-200 text-red-600 cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    setEdit(false);
                  }}
                >
                  Delete
                </div>
              </div>
            </form>
          </div>
        </div>
      </Backdrop>

      <Backdrop className={classes.backdrop} open={detail}>
        <div className=" grid grid-cols-12  w-screen">
          <div
            className="rounded-xl shadow p-4 col-span-10  col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4"
            style={{
              background: "rgba(255,255,255,.4)",
            }}
          >
            <div className="text-xl mb-2 font-medium text-white flex justify-between">
              Permission Reason
              <div
                className="h-10 w-10 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer"
                onClick={() => {
                  setDetail(false);
                }}
              >
                <AiOutlineClose />
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl text-gray-500 text-base p-4 flex flex-col items-center">
              {reason}
              <div className="h-1 w-10 bg-gray-400 rounded-full mt-4" />
            </div>
          </div>
        </div>
      </Backdrop>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="my-4">
        <div className="ml-10 text-lg font-medium text-blue-500 flex items-center my-2">
          <NavLink
            to="/hr/permission"
            className="h-10 w-10 rounded-full bg-gray-300 flex justify-center mr-2 items-center"
          >
            <IoChevronBackSharp />
          </NavLink>
          <div className="ml-8 text-3xl text-gray-400 font-bold">
            Permission Request
          </div>
        </div>

        <div className="-my-2 overflow-x-auto ">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 ">
            <div className=" overflow-hidden  sm:rounded-lg ">
              <table className="min-w-full divide-y ">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      start
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      End
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      Duration
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  {permissionData
                    .filter(
                      (item) =>
                        item.is_active === true && item.is_accepted === null
                    )
                    .map((permitt) => (
                      <tr key={permitt.id}>
                        <td className="px-6 py-4 whitespace-nowrap ">
                          <div className="flex items-center">
                            <div className="cursor-pointer flex-shrink-0 h-14 w-14 border-2 border-red-400  rounded-full ">
                              {permitt.staff.thumbnail !== "" ? (
                                <img
                                  className="h-full w-full rounded-full border-2 border-gray-100 object-cover"
                                  src={permitt.staff.thumbnail}
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
                            <div className="ml-4 flex flex-col items-start">
                              <Link
                                to={`/hr/users/single-user${permitt.staff.id}/`}
                                className="text-base font-medium text-gray-900"
                              >
                                {permitt.staff.username}
                              </Link>

                              <div className="text-tiny  px-2 inline-flex leading-5 font-medium rounded-full bg-blue-100 text-blue-800 ">
                                {permitt.staff.phone_number}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-base  text-gray-500">
                            {permitt.start_date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="cursor-pointer px-2 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg  text-blue-800">
                            {permitt.to_date}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className=" cursor-pointer px-2 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg  text-green-800">
                            {permitt.leave_type.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className=" cursor-pointer px-2 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg hover:bg-green-500 hover:text-white bg-green-100 text-green-800">
                            {date_sub(
                              permitt !== undefined && permitt.to_date,
                              permitt !== undefined && permitt.start_date
                            )}{" "}
                            Days
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                          <div
                            onClick={() => {
                              setEdit(true);
                              setDetail(true);
                              setReason(permitt.description);
                            }}
                            className="px-2 cursor-pointer mx-1 py-1 items-center justify-around flex text-base leading-5  rounded-lg   bg-yellow-500 text-white"
                          >
                            Reason
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex ">
                            <div
                              onClick={() => {
                                axiosInstance
                                  .patch(`auth/permission/${permitt.id}/`, {
                                    is_accepted: true,
                                  })
                                  .then(async () => {
                                    await axiosInstance
                                      .get("auth/permission-read/")
                                      .then((res) => {
                                        setPermissionData(res.data);
                                        setOpenDecline(false);
                                        toast.success(
                                          ` ${permitt.staff.username}  Request Accepted !`,
                                          {
                                            position: "top-center",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                          }
                                        );
                                      });
                                  });
                              }}
                              className="px-2 cursor-pointer mx-1 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg hover:bg-purple-500 hover:text-white bg-purple-100 text-purple-800"
                            >
                              Accept
                            </div>
                            <div
                              onClick={() => {
                                setOpenDecline(true);
                                setDeclineRequest(permitt);
                                setStaffName(permitt.staff.username);
                              }}
                              className="px-2 cursor-pointer mx-1 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg hover:bg-red-500 hover:text-white bg-red-100 text-red-800"
                            >
                              Decline
                            </div>
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
  );
};

export default PermissionRequest;
