import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CircularProgress from "@material-ui/core/CircularProgress";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// aos improts
import AOS from "aos";
import "aos/dist/aos.css";
// data
import axiosInstance from "../../axios";
import { Link, useNavigate } from "react-router-dom";

import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../components/loader";

// material ui stying
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(0,0,0,.4)",
    backdropFilter: "blur(8px)",
  },
  circle: {
    strokeLinecap: "round",
  },
  top: {
    color: "white",
    animationDuration: "550ms",
  },
}));

const User = ({ match }) => {
  const classes = useStyles();
  const [userData, setUserData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [contractData, setContractData] = useState([]);
  const [permissionData, setPermissionData] = useState([]);
  const [userPermitted, setUserPermitted] = useState({});

  // condition
  const [openPermission, setOpenPermission] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstAnime, setFirstAnime] = React.useState(false);
  const [secondAnime, setSecondAnime] = React.useState(false);
  const [permissionLoading, setPermissionLoading] = React.useState(false);

  // permission
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [leaveTypes, setLeaveTypes] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      setLoading(true);
      const responseUser = await axiosInstance.get(
        `auth/users/${match.params.user_id}/`
      );
      setUserData(responseUser.data);
      await axiosInstance.get(`auth/staffs/`).then((res) => {
        setStaffData(res.data);
      });

      await axiosInstance.get("auth/single-user/").then((res) => {
        setUserPermitted(res.data);
      });

      await axiosInstance.get(`auth/contracts/`).then((res) => {
        setContractData(res.data);
      });

      await axiosInstance.get(`auth/permission/`).then((res) => {
        setPermissionData(res.data);
        setLoading(false);
        setTimeout(() => {
          setFirstAnime(true);
        }, 1000);
        setTimeout(() => {
          setSecondAnime(true);
        }, 100);
      });

      await axiosInstance.get("auth/permission-types/").then((res) => {
        setLeaveTypes(res.data);
      });
    };

    dataFetch();
  }, [match]);

  const Lister = ({ title, content, color }) => {
    return (
      <div className="flex mx-2  rounded-md overflow-hidden   light  justify-between">
        <div
          className={`border-l-4 pl-4 py-4 border-${color}-500  text-white h-full flex items-center justify-center`}
        >
          <div className="text-gray-400 font-semibold">{title}</div>
        </div>
        <div className=" flex flex-col justify-start md:w-1/3 w-2/3 pl-4 pr-6 py-4 bg-gray-200">
          <div className="text-gray-400 text-base flex items-center ">
            <div className={` h-2 w-2 rounded-full bg-${color}-500  mr-2 `} />
            {content}
          </div>
        </div>
      </div>
    );
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token === null) {
    navigate("/auth/login/");
  }

  AOS.init({
    duration: 1000,
  });

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

  const year = new Date().getFullYear();

  useEffect(() => {
    if (userPermitted.is_staff === false) {
      window.location.href = "/";
    }
  }, [userPermitted]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="grid grid-cols-12 w-screen overflow-hidden">
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
      {/* backdrops */}
      <div>
        {/* permission */}
        <Backdrop
          className={classes.backdrop}
          open={openPermission}
          // onClick={() => {
          //   setOpenPermission(false);
          // }}
        >
          <div className="w-screen flex justify-center">
            <div
              className="openPermission p-4 rounded-2xl"
              style={{
                background: "rgba(255,255,255,.5)",
              }}
            >
              <form
                onSubmit={async (event) => {
                  setPermissionLoading(true);
                  event.preventDefault();
                  try {
                    await axiosInstance
                      .post("auth/permission/", {
                        start_date: startDate,
                        to_date: endDate,
                        description: reason,
                        staff: userData.id,
                        leave_type: leaveType,
                      })
                      .then(async () => {
                        await axiosInstance
                          .get("auth/single-permission/")
                          .then((res) => {
                            setPermissionData(res.data[0]);
                            setPermissionLoading(false);
                            toast.success(
                              "Permission Request was Successfull sent!",
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
                            setOpenPermission(false);
                          });
                      });
                  } catch (error) {
                    setPermissionLoading(false);
                    toast.error("Permission Request Failed", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                }}
              >
                <div className="text-2xl font-semibold text-white">
                  Permission Form
                </div>
                <div className="my-2 text-gray-500 text-base">
                  <div>Start At</div>
                  <input
                    required
                    type="date"
                    value={startDate}
                    onChange={(event) => {
                      setStartDate(event.target.value);
                    }}
                    className="py-2 px-4 w-full  rounded-xl ring-1 ring-gray-300 bg-gray-100 focus:outline-none focus:ring-gray-500"
                  />
                </div>
                <div className="my-2 text-gray-500 text-base">
                  <div>End At</div>
                  <input
                    required
                    type="date"
                    value={endDate}
                    onChange={(event) => {
                      setEndDate(event.target.value);
                    }}
                    className="py-2 px-4 w-full  rounded-xl ring-1 ring-gray-300 bg-gray-100 focus:outline-none focus:ring-gray-500"
                  />
                </div>
                <div className="my-2 text-gray-500 text-base">
                  <select
                    required
                    placeholder="leave type"
                    value={leaveType}
                    onChange={(event) => {
                      setLeaveType(event.target.value);
                    }}
                    className="py-2 px-4 w-full  rounded-xl ring-1 ring-gray-300 bg-gray-100 focus:outline-none focus:ring-gray-500"
                  >
                    {leaveTypes.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div className="my-2 text-gray-500 text-base">
                  <textarea
                    placeholder="permission reason "
                    required
                    value={reason}
                    onChange={(event) => {
                      setReason(event.target.value);
                    }}
                    className="py-2 px-4 w-full  rounded-xl ring-1 ring-gray-300 bg-gray-100 focus:outline-none focus:ring-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  className="py-2 px-4  rounded-xl bg-green-500 text-white cursor-pointer"
                >
                  {!permissionLoading ? (
                    "Send Request"
                  ) : (
                    <div className="flex items-center">
                      <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        className={classes.top}
                        classes={{
                          circle: classes.circle,
                        }}
                        size={24}
                        thickness={4}
                      />
                      <div className="mx-2"> Loading...</div>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </Backdrop>
        {/* user */}
        <Backdrop
          className={classes.backdrop}
          open={openUser}
          onClick={() => {
            setOpenUser(false);
          }}
        >
          <div className="w-80 rounded-3xl bg-red-400 overflow-hidden flex flex-col relative">
            {userData.thumbnail !== "" ? (
              <img
                className=" w-full  object-cover"
                src={userData.thumbnail}
                alt="profile"
              />
            ) : (
              <div className="bg-green-100 text-base text-green-600 px-10 py-4 rounded-3xl relative">
                <div className="absolute top-2  left-2 flex items-center justify-center ">
                  <div className="  font-bold text-white flex h-10 w-10 bg-green-500 items-center justify-center rounded-full">
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="font-semibold ml-4 text-lg">Info</div>
                </div>
                <br />
                <br />
                No image to be viewed!, seems like you did'nt upload the profile
                image for your account. <br />
                Contact the IT for more help.
              </div>
            )}
            {userData.thumbnail !== "" && (
              <div className="font-black absolute bottom-1 left-4 backdrop-filter  backdrop-blur-md  py-1 px-4 rounded-full">
                <div className="text-base flex items-center font-medium text-white">
                  <div className="font-black">{userData.username}</div>
                  <div className="h-1 w-1 rounded-full bg-green-500  mx-1  " />
                  {userData.nickname}
                </div>
              </div>
            )}
          </div>
        </Backdrop>
      </div>
      <div className="col-start-2 flex items-center  col-span-10">
        <Link
          to="/hr"
          className="h-10 w-10 text-white rounded-full bg-gray-300 flex justify-center mr-2 items-center fixed left-4 hidden md:flex"
        >
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
        </Link>
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
          className="mt-1 md:mt-0 text-md md:text-3xl text-gray-400 font-bold  px-2"
          style={{
            opacity: firstAnime ? "1" : "0",
          }}
        >
          {userData.nickname !== "" ? userData.nickname : userData.username}
        </div>
      </div>
      <div className="col-span-12 md:col-start-2 lg:col-start-1 xl:col-start-2 grid  grid-cols-1 lg:mx-5 lg:grid-cols-2 gap-4 lg:col-span-12 md:col-span-10 xl:col-span-10 flex flex-wrap">
        <div className="rounded-2xl  overflow-hidden ">
          <div className="flex items-center bg-gray-100 p-4 ">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="cursor-pointer flex items-center h-14 w-14 md:h-20 md:w-20 border-2 border-red-400  rounded-full "
              onClick={() => {
                setOpenUser(true);
              }}
            >
              {userData.thumbnail !== "" ? (
                <img
                  className="h-full w-full rounded-full border-2 md:border-4 border-gray-100 object-cover"
                  src={userData.thumbnail}
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
            </motion.div>
            <div className="ml-4">
              <div
                className="text-base font-semibold text-gray-500"
                style={{
                  transition: ".5s",
                  transform: secondAnime ? "scale(1)" : "scale(0)",
                }}
              >
                {userData !== undefined && userData.username}
              </div>

              <div
                style={{
                  transition: ".5s",
                  transform: secondAnime ? "scale(1)" : "scale(0)",
                  transitionDelay: ".2s",
                }}
              >
                <a
                  className="text-tiny md:text-base text-gray-400"
                  href={`mailto:${userData !== undefined && userData.email}`}
                >
                  {userData !== undefined && userData.email}
                </a>
              </div>
              <div
                style={{
                  transition: ".5s",
                  transform: secondAnime ? "scale(1)" : "scale(0)",
                  transitionDelay: ".4s",
                }}
                className="text-tiny px-4 py-1 inline-flex font-medium border-2 border-blue-500
                rounded-full cursor-pointer hover:bg-blue-500 text-blue-500
                hover:text-white "
              >
                {userData !== undefined && userData.phone_number}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center my-4 grid grid-cols-1 md:grid-cols-1 gap-2 rounded-2xl bg-white py-6 ">
            <Lister
              title="Age"
              content={`${userData !== undefined && userData.age} Yrs`}
              color="blue"
              delay={0}
            />
            <Lister
              title="Adress"
              content={userData !== undefined && userData.adress}
              color="purple"
              delay={0.3}
            />
            <Lister
              title="Place"
              content={userData !== undefined && userData.place}
              color="pink"
              delay={0.3}
            />

            <Lister
              title="Permission"
              content="At Work"
              color="yellow"
              delay={0.9}
            />
            <Lister
              title="Staff ID"
              content={staffData !== undefined && staffData.staffID}
              color="red"
              delay={1.2}
            />
          </div>
        </div>

        {contractData
          .filter((items) => items.staff === userData.id)
          .map((item) => (
            <div className="rounded-2xl  overflow-hidden ">
              <div className="flex flex-col items-start bg-gray-100 p-6  ">
                <div
                  className="cursor-pointer font-bold font-3xl text-gray-500"
                  style={{
                    transition: ".5s",
                    transform: secondAnime ? "scale(1)" : "scale(0)",
                    transitionDelay: ".2s",
                  }}
                >
                  Contract info:
                </div>

                <div className="h-12 overflow-hidden">
                  <div
                    className="text-3xl text-blue-400 font-black "
                    style={{
                      transition: ".5s",
                      transform: secondAnime
                        ? "translateY(0)"
                        : "translateY(100px)",
                      transitionDelay: ".4s",
                      transitionTimingFunction: "ease-out",
                    }}
                  >
                    Tsh: {item !== undefined && item.basic}/=
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center  my-2 grid grid-cols-1 md:grid-cols-1 gap-2 bg-white  py-6 rounded-2xl">
                <Lister
                  title="start"
                  content={item !== undefined && item.start_date}
                  color="blue"
                />
                <Lister
                  title="End"
                  content={item !== undefined && item.to_date}
                  color="purple"
                />
                <Lister
                  title="Salary"
                  content={`Tsh ${item !== undefined && item.salary}/=`}
                  color="green"
                />
                <Lister
                  title="PayE"
                  content={`Tsh ${item !== undefined && item.PAYE}/=`}
                  color="yellow"
                />
                <Lister
                  title="NSSF"
                  content={`Tsh ${item !== undefined && item.NSSF}/=`}
                  color="red"
                />
              </div>
            </div>
          ))}
      </div>
      <div className="col-span-12 md:col-start-2 lg:col-start-1 xl:col-start-2 grid  grid-cols-1 lg:mx-5 lg:grid-cols-2 gap-4 lg:col-span-12 md:col-span-10 xl:col-span-10 flex flex-wrap">
        <div className="  overflow-hidden ">
          <div className="flex items-center bg-gray-100 p-4 ">
            <div className="ml-4">
              <div className="text-xl font-semibold text-gray-500">
                Staff Info
              </div>
            </div>
          </div>
          {staffData
            .filter((items) => items.staff === userData.id)
            .map((item) => (
              <div className="flex flex-wrap bg-white p-4 justify-center grid grid-cols-1 md:grid-cols-1 gap-2 rounded-3xl">
                <Lister
                  title="Depart"
                  content={
                    item.department !== undefined && item.department.department
                  }
                  color="gray"
                />

                <Lister
                  title="Position"
                  content={
                    item.job_position !== undefined &&
                    item.job_position.position
                  }
                  color="gray"
                />
                <Lister
                  title="Job Title"
                  content={item !== undefined && item.job_title}
                  color="gray"
                />
                <Lister
                  title="Staff ID"
                  content={item !== undefined && item.staffID}
                  color="gray"
                />
              </div>
            ))}
        </div>

        <div className="rounded-2xl pb-14  ">
          <div className="flex items-center bg-gray-100 p-4 justify-between">
            <div className="ml-4">
              <div className="text-xl font-semibold text-gray-500">
                Permission
              </div>
            </div>
            <div className="text-tiny md:text-base font-semibold text-white bg-green-500 p-2 rounded-full">
              {permissionData
                .filter(
                  (items) =>
                    items.staff === userData.id && items.is_active === true
                )
                .map((item) => (
                  <div>
                    {item.is_accepted === true || item.is_accepted === null
                      ? `${date_sub(
                          leo,
                          item !== undefined && item.to_date
                        )} Days Remain`
                      : null}
                  </div>
                ))}
            </div>
          </div>
          {permissionData.filter((items) => items.staff === userData.id)
            .length !== 0 ? (
            permissionData
              .filter((items) => items.staff === userData.id)
              .map((item) => (
                <div className="flex md:bg-white justify-center rounded-3xl md:p-4 grid grid-cols-1 mx-2 items-center h-full ">
                  {item.is_active === true && (
                    <div className="rounded-3xl light md:p-4">
                      <div className="w-full justify-between flex items-center">
                        <div className="text-green-300 text-xl font-bold">
                          {item.is_accepted === true ||
                          item.is_accepted === null ? (
                            leaveTypes
                              .filter((leaves) => leaves.id === item.leave_type)
                              .map((leave) => leave.name)
                          ) : (
                            <div className="text-red-400">
                              Permission Declined
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        className="text-gray-500 text-base bg-gray-200 p-2 rounded-xl"
                        align="justify"
                      >
                        {item.is_accepted === true ||
                        item.is_accepted === null ? (
                          `${item !== undefined && item.description} ...`
                        ) : (
                          <div className="text-red-400">
                            Your permission have been declined go and visit HR
                            for more information or wait for all staff
                            permission according to the schedule
                            <br />
                            <b>happy working!</b>
                          </div>
                        )}

                        <div className="flex justify-center w-full">
                          <div className="bg-white rounded-full w-10 h-1 mt-2" />
                        </div>
                      </div>

                      <div className="flex justify-between mt-8">
                        <div
                          className={`${
                            item.is_accepted === true ||
                            item.is_accepted === null
                              ? "bg-green-300 "
                              : "bg-red-400"
                          } rounded-xl py-1 px-4 flex items-center `}
                        >
                          <div
                            className={` h-2 w-2 rounded-full bg-white  mr-2  `}
                          />
                          {item.is_accepted
                            ? "Accepted"
                            : item.is_accepted === false
                            ? "Declined"
                            : "In Waiting..."}
                        </div>
                        <div
                          className={`${
                            item.is_accepted === true ||
                            item.is_accepted === null
                              ? "text-green-400  bg-white"
                              : "text-white bg-green-400 cursor-pointer"
                          } rounded-xl  py-1 px-4`}
                        >
                          {permissionData.is_accepted === true ||
                          permissionData.is_accepted === null
                            ? `${date_sub(
                                permissionData !== undefined &&
                                  permissionData.to_date,
                                permissionData !== undefined &&
                                  permissionData.start_date
                              )} Days`
                            : "Okay"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
          ) : (
            <div className="flex md:bg-white justify-center rounded-3xl md:p-4 grid grid-cols-1 mx-2 items-center h-full ">
              <div className="bg-green-100 text-base text-green-600 px-10 py-4 rounded-3xl relative">
                <div className="absolute top-2  left-2 flex items-center justify-center ">
                  <div className="  font-bold text-white flex h-10 w-10 bg-green-500 items-center justify-center rounded-full">
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="font-semibold ml-4 text-lg">Info</div>
                </div>
                <br />
                <br />
                {userData.username} Have No any Permission Yet, he should Kindly
                Wait For the Permission according to the Schedule Provided or He
                should Apply
                <div className="flex justify-start">
                  <div className="bg-green-500 py-1 mt-4 text-white px-2 rounded-xl cursor-pointer">
                    No Permission
                  </div>
                </div>
              </div>
            </div>
          )}
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

export default User;
