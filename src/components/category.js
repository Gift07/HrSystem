import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// material ui

import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import { BsEyeFill } from "react-icons/bs";
import { MdWork } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

import UserDetail from "./userDetail";
import TimeDetail from "./timeDetail";

import axiosInstance from "../axios";
import Loader from "./loader";
import { Link } from "react-router-dom";

// material ui stying
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(0,0,0,.4)",
    backdropFilter: "blur(4px)",
  },
}));

const Category = ({ title }) => {
  const classes = useStyles();
  const [openUser, setOpenUser] = useState(false);
  const [userPermitted, setUserPermitted] = useState({});
  const [openContract, setOpenContract] = useState(false);
  const [openPermission, setOpenPermission] = useState(false);
  const [search, setSearch] = useState("");
  const [contractData, setContractData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);

  const [userData, setUserData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [contractInfo, setContractInfo] = useState({});
  const [permissionData, setPermissionData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [deleteItem, setDeleteItem] = useState({});
  const [permissionInfo, setPermissionInfo] = useState({});

  const [loading, setLoading] = useState(false);
  const [firstAnime, setFirstAnime] = React.useState(false);
  const [secondAnime, setSecondAnime] = React.useState(false);

  useEffect(() => {
    const dataFetch = async () => {
      setLoading(true);
      await axiosInstance.get("auth/single-user/").then((res) => {
        setUserPermitted(res.data[0]);
      });

      await axiosInstance.get("auth/users/").then((res) => {
        setUserData(res.data);
      });

      await axiosInstance.get("auth/staffs/").then((res) => {
        setStaffData(res.data);
      });

      await axiosInstance.get("auth/contracts/").then((res) => {
        setContractData(res.data);
      });

      await axiosInstance.get("auth/permission/").then((res) => {
        setLoading(false);
        setTimeout(() => {
          setFirstAnime(true);
        }, 1000);
        setTimeout(() => {
          setSecondAnime(true);
        }, 100);
        setPermissionData(res.data);
      });
    };

    dataFetch();
  }, []);

  useEffect(() => {
    if (userPermitted.is_staff === false) {
      window.location.href = "/";
    }
  }, [userPermitted]);

  // BROPBACKS
  // user info dropback
  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="relative"
      style={{
        width: "98vw",
        overflow: "hidden",
      }}
    >
      {/* drpbacks */}
      <div>
        {/* delete */}
        <Backdrop className={classes.backdrop} open={openDelete}>
          <div
            className="md:w-3/6 w-full  bg-white p-4 rounded-xl"
            style={{ background: "rgba(255,255,255,.5)" }}
          >
            <div className="text-xl text-white font-medium"> Delete Staff</div>
            <div className="flex flex-col">
              <div className="text-lg text-red-400 font-medium">
                Are Sure want to delete {deleteItem.username}?
              </div>
              <div className="flex">
                <div
                  className="cursor-pointer flex px-2 py-1 bg-gray-100 text-gray-500 w-50 rounded-full my-2"
                  onClick={() => {
                    axiosInstance
                      .patch(`auth/users/${deleteItem.id}/`, {
                        is_active: false,
                      })
                      .then(async () => {
                        await axiosInstance
                          .get("auth/users/")
                          .then((responseUser) => {
                            setUserData(responseUser.data);
                            setOpenDelete(false);
                            toast.success(
                              `deleting ${deleteItem.username} Successfull!`,
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
                >
                  Yes
                </div>
                <div
                  className="mx-2 cursor-pointer flex px-2 py-1 bg-gray-100 text-gray-500 w-50 rounded-full my-2"
                  onClick={() => {
                    setOpenDelete(false);
                  }}
                >
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </Backdrop>

        {/* user */}
        <Backdrop className={classes.backdrop} open={openUser}>
          <UserDetail
            setOpenUser={setOpenUser}
            data={userInfo}
            setUserInfo={setUserInfo}
          />
        </Backdrop>
        {/* permission */}
        <Backdrop className={classes.backdrop} open={openPermission}>
          <TimeDetail
            setOpenPermission={setOpenPermission}
            setPermissionInfo={setPermissionInfo}
            permissionInfo={permissionInfo}
          />
        </Backdrop>
        {/* contract */}
        <Backdrop className={classes.backdrop} open={openContract}>
          <TimeDetail
            setOpenContract={setOpenContract}
            setContractInfo={setContractInfo}
            contractInfo={contractInfo}
          />
        </Backdrop>
      </div>
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
      <div className="ml-2 md:ml-8 flex items-center ">
        <div
          className=" bg-gray-100 border-green-400 absolute"
          style={{
            transition: "1s",
            height: secondAnime ? "40px" : "0",
            borderRightWidth: 3,
            width: firstAnime ? "0" : "260px",
          }}
        />
        <div
          className=" text-3xl text-gray-400 font-bold  px-2"
          style={{
            opacity: firstAnime ? "1" : "0",
          }}
        >
          {title}
        </div>
      </div>

      <div className="my-4">
        <div className="ml-10 w-1/2">
          <form className="flex items-center text-blue-500 ">
            <input
              placeholder="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="py-2 px-2 lowercase my-4 rounded-xl border-2 border-blue-500 bg-blue-100 w-2/3 placeholder-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </form>
        </div>
        <div></div>
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
                      NAME
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      GENDER
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      ADRESS
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      NICKNAME
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      DEPARTMENT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      TITLE
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      CONTRACT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      PERMISSION
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      SALARY
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  {userData
                    .sort((a, b) => a.username.localeCompare(b.username))
                    .filter((item) => {
                      if (search === "") {
                        return item;
                      } else if (
                        item.username
                          .toUpperCase()
                          .includes(search.toLowerCase())
                      ) {
                        return item;
                      } else if (
                        item.place.toUpperCase().includes(search.toUpperCase())
                      ) {
                        return item;
                      } else if (
                        item.adress.toUpperCase().includes(search.toUpperCase())
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
                        item.gender.toUpperCase().includes(search.toUpperCase())
                      ) {
                        return item;
                      }
                      return false;
                    })
                    .filter((item) => item.is_active === true)

                    .map((user) =>
                      staffData
                        .filter(
                          (item) =>
                            item.staff === user.id &&
                            item.category.category === `${title}`
                        )
                        .map((item) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap ">
                              <div className="flex items-center">
                                <div
                                  className="cursor-pointer flex-shrink-0 h-14 w-14 border-2 border-red-400  rounded-full "
                                  onClick={() => {
                                    setOpenUser(true);
                                    setUserInfo(user);
                                  }}
                                >
                                  {user.thumbnail !== "" ? (
                                    <img
                                      className="h-full w-full rounded-full border-2 border-gray-100 object-cover"
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
                                  <Link
                                    to={`/hr/users/single-user${user.id}/`}
                                    className="text-base font-medium text-gray-600"
                                  >
                                    {user.username}
                                  </Link>
                                  <div className="text-tiny text-gray-500">
                                    {user.email}
                                  </div>
                                  <div className="text-tiny  px-2 inline-flex leading-5 font-medium rounded-full bg-red-100 text-red-800 ">
                                    {user.phone_number}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="w-10 h-10 rounded-full flex items-center justify-center text-base text-white bg-yellow-500">
                                {user.gender}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-base text-gray-500">
                                {user.adress}
                              </div>
                              <div className="flex justify-start">
                                <div className="flex text-base text-gray-500 bg-gray-300 px-2 rounded-full">
                                  {user.place}
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-base text-gray-500">
                                {user.nickname.toUpperCase()}
                              </div>
                            </td>
                            {staffData
                              .filter((item) => item.staff === user.id)
                              .map((item) => (
                                <td
                                  key={item.id}
                                  className="px-6 py-4 whitespace-nowrap"
                                >
                                  <div className="text-base text-gray-500">
                                    {item.department.department.toUpperCase()}
                                  </div>
                                </td>
                              ))}
                            {staffData
                              .filter((item) => item.staff === user.id)
                              .map((item) => (
                                <td
                                  key={item.id}
                                  className="px-6 py-4 whitespace-nowrap "
                                >
                                  <div className="text-base text-gray-500">
                                    {item.job_title.toUpperCase()}
                                  </div>
                                </td>
                              ))}

                            {contractData
                              .filter((item) => item.staff === user.id)
                              .map((item) => (
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div
                                    onClick={() => {
                                      setOpenContract(true);
                                      setContractInfo(item);
                                      console.log("the work", contractInfo);
                                    }}
                                    className="cursor-pointer px-2 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg hover:bg-blue-500 hover:text-white bg-blue-100 text-blue-800"
                                  >
                                    <BsEyeFill className="mx-1" /> Contract
                                  </div>
                                </td>
                              ))}

                            {permissionData.filter(
                              (item) => item.staff === user.id
                            ).length !== 0 ? (
                              permissionData
                                .filter((item) => item.staff === user.id)
                                .map((item) => (
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div
                                      onClick={() => {
                                        if (item.is_active === true) {
                                          setOpenPermission(true);
                                          setPermissionInfo(item);
                                        }
                                      }}
                                      className=" cursor-pointer px-2 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg hover:bg-green-500 hover:text-white bg-green-100 text-green-800"
                                    >
                                      <MdWork className="mx-1" />
                                      {item.is_active === true
                                        ? "Permitted"
                                        : "At Work"}
                                    </div>
                                  </td>
                                ))
                            ) : (
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className=" cursor-pointer px-2 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg hover:bg-green-500 hover:text-white bg-green-100 text-green-800">
                                  <MdWork className="mx-1" />
                                  At Work
                                </div>
                              </td>
                            )}

                            {contractData
                              .filter((item) => item.staff === user.id)
                              .map((item) => (
                                <td
                                  className="px-6 py-4 whitespace-nowrap"
                                  key={item.id}
                                >
                                  <div className="text-base text-gray-900">
                                    Tshs {item.basic} /=
                                  </div>
                                </td>
                              ))}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className=" ">
                                <div
                                  onClick={() => {
                                    setOpenDelete(true);
                                    setDeleteItem(user);
                                  }}
                                  className="px-2 cursor-pointer mx-1 py-1 items-center justify-around flex text-lg leading-5 font-medium rounded-lg hover:bg-red-500 hover:text-white bg-red-100 text-red-800"
                                >
                                  <AiFillDelete className="mx-1" />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
