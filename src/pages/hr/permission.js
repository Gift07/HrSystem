import React, { useState, useEffect } from "react";

import { Avatar } from "@material-ui/core";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

import { RiTimerFill } from "react-icons/ri";
import { RiTimerLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import axiosInstance from "../../axios";
import Loader from "../../components/loader";
import { Link } from "react-router-dom";

// material ui stying
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(0,0,0,.4)",
    backdropFilter: "blur(4px)",
  },
}));

const Permission = () => {
  const [open, setOpen] = React.useState(false);
  const [detail, setDetail] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState([]);
  const [permissionData, setPermissionData] = useState([]);
  const [userPermitted, setUserPermitted] = useState({});
  const [reason, setReason] = useState({});

  useEffect(() => {
    const dataFetch = async () => {
      setLoading(true);
      const responseUserPermitted = await axiosInstance.get(
        "auth/single-user/"
      );
      setUserPermitted(responseUserPermitted.data[0]);
      const responseUser = await axiosInstance.get("auth/users/");
      setUserData(responseUser.data);

      const responsePermission = await axiosInstance.get(
        "auth/permission-read/"
      );
      setPermissionData(responsePermission.data);
      setLoading(false);
    };

    dataFetch();
  }, []);

  const date_sub = (from_date, to_date) => {
    const date1 = new Date(from_date);
    const date2 = new Date(to_date);
    const differ = Math.abs(date1 - date2);

    return Math.ceil(differ / (1000 * 60 * 60 * 24));
  };

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  const leo = yyyy + "-" + mm + "-" + dd;
  useEffect(() => {
    if (userPermitted.is_staff === false) {
      window.location.href = "/";
    }
  }, [userPermitted]);

  // user info dropback
  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" overflow-hidden" style={{ width: "98vw" }}>
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
      {/* dropbacks */}
      <div>
        {/* edit */}
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
              className="rounded-xl shadow  p-4 col-span-10  col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4"
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
                    setReason({});
                  }}
                >
                  <AiOutlineClose />
                </div>
              </div>
              <div className="bg-gray-100 rounded-xl text-gray-500 text-base p-4 flex flex-col items-center">
                {reason.description}
                <div className="h-1 w-10 bg-blue-400 mt-4" />
              </div>
            </div>
          </div>
        </Backdrop>

        <Backdrop className={classes.backdrop} open={openDelete}>
          <div
            className="md:w-3/6 w-full  p-4 rounded-xl"
            style={{
              background: "rgba(255,255,255,.4)",
            }}
          >
            <div className="text-2xl text-white font-bold">Permission End</div>
            <div className="flex flex-col">
              <div className="text-lg text-white font-medium">
                Are you Sure you want to End Permission?
              </div>
              <div className="flex">
                <div
                  className="cursor-pointer hover:bg-red-500 hover:text-white flex px-2 py-1 bg-gray-100 text-gray-500 w-50 rounded my-2"
                  onClick={() => {
                    axiosInstance
                      .patch(`auth/permission/${reason.id}/`, {
                        is_active: false,
                      })
                      .then(async () => {
                        await axiosInstance
                          .get("auth/permission/")
                          .then((responsePermission) => {
                            setPermissionData(responsePermission.data);
                            setOpenDelete(false);
                            toast.success(`Ending Successfull!`, {
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
                  Yes
                </div>
                <div
                  className="mx-2 cursor-pointer hover:bg-blue-500 hover:text-white flex px-2 py-1 bg-gray-100 text-gray-500 w-50 rounded my-2"
                  onClick={() => {
                    setOpenDelete(false);
                  }}
                >
                  No
                </div>
              </div>
            </div>
          </div>
        </Backdrop>
      </div>

      <div className="ml-8 text-3xl text-gray-400 font-bold">Permission</div>
      <div className="my-4 ">
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
                      Time Remained
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      end Permission
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  {permissionData
                    .filter(
                      (item) =>
                        item.is_active === true && item.is_accepted === true
                    )
                    .map((person) => (
                      <tr key={person.id}>
                        {userData
                          .filter((item) => item.id === person.staff.id)
                          .map((item) => (
                            <td className="px-6 py-4 whitespace-nowrap ">
                              <div className="flex items-center">
                                <div className="cursor-pointer flex-shrink-0 h-14 w-14 border-2 border-red-400  rounded-full ">
                                  <img
                                    className="h-full w-full rounded-full border-2 border-gray-100 object-cover"
                                    src={item.thumbnail}
                                    alt="profile"
                                  />
                                </div>
                                <div className="ml-4 flex flex-col items-start">
                                  <Link
                                    to={`/hr/users/single-user${item.id}/`}
                                    className="text-base font-medium text-gray-900"
                                  >
                                    {item.username}
                                  </Link>

                                  <div className="text-tiny  px-2 inline-flex leading-5 font-medium rounded-full bg-blue-100 text-blue-800 ">
                                    {item.phone_number}
                                  </div>
                                </div>
                              </div>
                            </td>
                          ))}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-base text-gray-500">
                            {person.start_date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="cursor-pointer px-2 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg text-blue-800">
                            {person.to_date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className=" cursor-pointer px-2 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg  text-green-800">
                            {person.leave_type.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className=" cursor-pointer px-2 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg hover:bg-green-500 hover:text-white bg-green-100 text-green-800">
                            {date_sub(person.start_date, person.to_date)} Days
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                          <div className="px-2 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg bg-yellow-500 text-white ">
                            {date_sub(leo, person.to_date)} Days
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex ">
                            <div
                              onClick={() => {
                                setOpenDelete(true);
                                setReason(person);
                              }}
                              className="px-2 cursor-pointer mx-1 py-1 text-base items-center justify-around flex leading-5  rounded-lg hover:bg-red-500 hover:text-white bg-red-100 text-red-800"
                            >
                              End permission
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                          <div
                            onClick={() => {
                              setEdit(true);
                              setDetail(true);
                              setReason(person);
                            }}
                            className="px-2 cursor-pointer mx-1 py-1 items-center justify-around flex text-base leading-5  rounded-lg hover:bg-purple-500 hover:text-white bg-purple-100 text-purple-800"
                          >
                            Reason
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

export default Permission;
