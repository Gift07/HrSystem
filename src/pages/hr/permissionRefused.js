import React, { useState, useEffect } from "react";

import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import axiosInstance from "../../axios";

import { IoChevronBackSharp } from "react-icons/io5";
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

const PermissionRefused = () => {
  const [reason, setReason] = useState("");
  const [permissionData, setPermissionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = React.useState(false);
  const classes = useStyles();

  useEffect(() => {
    const dataFetch = async () => {
      setLoading(true);
      await axiosInstance.get("auth/permission-read/").then((res) => {
        setPermissionData(res.data);
        console.log(res.data)
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

      <Backdrop className={classes.backdrop} open={detail}>
        <div className=" grid grid-cols-12  w-screen">
          <div
            className="rounded-xl shadow p-4 col-span-10  col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4"
            style={{
              background: "rgba(255,255,255,.4)",
            }}
          >
            <div className="text-xl mb-2 font-medium text-white flex justify-between">
              Reason
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

      <div className="my-4">
        <div className="ml-10 text-lg font-medium text-blue-500 flex items-center my-2">
          <NavLink
            to="/hr/permission"
            className="h-10 w-10 rounded-full bg-gray-300 flex justify-center mr-2 items-center"
          >
            <IoChevronBackSharp />
          </NavLink>
          <div className="ml-8 text-3xl text-gray-400 font-bold">
            Permission Refused
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
                      Reason
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  {permissionData
                    .filter(
                      (item) =>
                       item.is_accepted === false
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
                              setDetail(true);
                              setReason(permitt.description);
                            }}
                            className="px-2 cursor-pointer mx-1 py-1 items-center justify-around flex text-base leading-5  rounded-lg   bg-yellow-500 text-white"
                          >
                            description
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                          <div
                            onClick={() => {
                              setDetail(true);
                              setReason(permitt.refused_reason);
                            }}
                            className="px-2 cursor-pointer mx-1 py-1 items-center justify-around flex text-base leading-5  rounded-lg   bg-purple-500 text-white"
                          >
                            Refused_Reason
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

export default PermissionRefused;
