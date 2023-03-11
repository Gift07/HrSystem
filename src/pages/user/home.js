import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CircularProgress from "@material-ui/core/CircularProgress";

import ReactHtmlParser from "react-html-parser";

// aos imports
import AOS from "aos";
import "../../../node_modules/aos/dist/aos.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "aos/dist/aos.css";
// data
import axiosInstance from "../../axios";
import { NavLink, useNavigate } from "react-router-dom";

import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../components/loader";
import Users from "../../components/allUsers";

import { Link } from "react-router-dom";
// install Swiper modules
SwiperCore.use([Pagination, Autoplay, Navigation]);
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

const Home = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [contractData, setContractData] = useState([]);
  const [permissionData, setPermissionData] = useState([]);

  // condition
  const [openPermission, setOpenPermission] = useState(false);
  const [hide, setHide] = useState(false);
  const [openUsers, setOpenUsers] = React.useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [secondAnime, setSecondAnime] = React.useState(false);
  const [openDriver, setOpenDriver] = React.useState(false);
  const [permissionLoading, setPermissionLoading] = React.useState(false);

  // permission
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [notification, setNotification] = useState([]);

  const [time_to, setTime_to] = useState("");
  const [time_from, setTime_from] = useState("");
  const [journey_from, setJourney_from] = useState("");
  const [journey_to, setJourney_to] = useState("");
  const [mileage_out, setMileage_out] = useState("");
  const [mileage_in, setMileage_in] = useState("");
  const [auth_staff, setAuth_staff] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  useEffect(() => {
    const dataFetch = async () => {
      setLoading(true);
      await axiosInstance.get("auth/single-user/").then((res) => {
        setUserData(res.data[0]);
      });

      await axiosInstance.get("auth/single-staff/").then((res) => {
        setStaffData(res.data[0]);
      });

      await axiosInstance.get("auth/notification-read/").then((res) => {
        setNotification(res.data);
      });
      await axiosInstance.get("auth/users/").then((res) => {
        setAllUsers(res.data);
      });

      setLoading(false);

      setTimeout(() => {
        setSecondAnime(true);
      }, 100);

      await axiosInstance.get("auth/single-contract/").then((res) => {
        setContractData(res.data[0]);
      });

      await axiosInstance.get("auth/single-permission/").then((res) => {
        setPermissionData(res.data.slice(-1)[0]);
      });

      await axiosInstance.get("auth/permission-types/").then((res) => {
        setLeaveTypes(res.data);
      });
    };

    dataFetch();
    setInterval(() => {
      setDate(new Date().toDateString());
      setHour(new Date().getHours());
      setMinute(new Date().getMinutes());
    }, 1000);
  }, []);

  AOS.init({
    duration: 1000,
  });

  const Lister = ({ title, content, color, mobile }) => {
    return (
      <div className="my-1 flex mx-2  rounded-xl overflow-hidden items-center light  justify-between">
        <div
          className={` pl-4 py-4  text-white h-full flex items-center justify-center`}
        >
          <div
            style={{ height: 28, width: 4 }}
            className={` bg-${color}-500 rounded-xl mr-2`}
          />
          <div className="text-gray-400 text-base font-semibold">{title}</div>
        </div>
        <div className=" flex flex-col justify-start md:w-1/3 w-2/3 py-5 px-6 bg-gray-200">
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
        <Backdrop className={classes.backdrop} open={openDriver}>
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
                      .post("auth/drivers-post/", {
                        driver: userData.id,
                        auth_staff,
                        time_to,
                        time_from,
                        journey_from,
                        journey_to,
                        mileage_out,
                        mileage_in,
                      })
                      .then(() => {
                        setPermissionLoading(false);
                        toast.success("Reporte was Successfull Saved!", {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                        setOpenDriver(false);
                      });
                  } catch (error) {
                    setPermissionLoading(false);
                    toast.error("Report saved Failed", {
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
                  Driver's Report
                </div>
                <div className="my-2 text-gray-500 text-base">
                  <input
                    required
                    placeholder="journey from"
                    value={journey_from}
                    onChange={(event) => {
                      setJourney_from(event.target.value);
                    }}
                    className="py-2 px-4 w-full  rounded-xl ring-1 ring-gray-300 bg-gray-100 focus:outline-none focus:ring-gray-500"
                  />
                </div>
                <div className="my-2 text-gray-500 text-base">
                  <input
                    required
                    placeholder="journey to"
                    value={journey_to}
                    onChange={(event) => {
                      setJourney_to(event.target.value);
                    }}
                    className="py-2 px-4 w-full  rounded-xl ring-1 ring-gray-300 bg-gray-100 focus:outline-none focus:ring-gray-500"
                  />
                </div>
                <div className="my-2 text-gray-500 text-base">
                  <div>time from</div>
                  <input
                    required
                    type="time"
                    value={time_from}
                    onChange={(event) => {
                      setTime_from(event.target.value);
                    }}
                    className="py-2 px-4 w-full  rounded-xl ring-1 ring-gray-300 bg-gray-100 focus:outline-none focus:ring-gray-500"
                  />
                </div>
                <div className="my-2 text-gray-500 text-base">
                  <div>time to</div>
                  <input
                    required
                    type="time"
                    value={time_to}
                    onChange={(event) => {
                      setTime_to(event.target.value);
                    }}
                    className="py-2 px-4 w-full  rounded-xl ring-1 ring-gray-300 bg-gray-100 focus:outline-none focus:ring-gray-500"
                  />
                </div>
                <div className="my-2 text-gray-500 text-base">
                  <input
                    placeholder="mileage out"
                    required
                    value={mileage_out}
                    onChange={(event) => {
                      setMileage_out(event.target.value);
                    }}
                    className="py-2 px-4 w-full  rounded-xl ring-1 ring-gray-300 bg-gray-100 focus:outline-none focus:ring-gray-500"
                  />
                </div>
                <div className="my-2 text-gray-500 text-base">
                  <input
                    required
                    placeholder="mileage in"
                    value={mileage_in}
                    onChange={(event) => {
                      setMileage_in(event.target.value);
                    }}
                    className="py-2 px-4 w-full  rounded-xl ring-1 ring-gray-300 bg-gray-100 focus:outline-none focus:ring-gray-500"
                  />
                </div>
                <div className="my-2 text-gray-500 text-base">
                  <select
                    required
                    placeholder="signed User"
                    value={auth_staff}
                    onChange={(event) => {
                      setAuth_staff(event.target.value);
                    }}
                    className="py-2 px-4 w-full  rounded-xl ring-1 ring-gray-300 bg-gray-100 focus:outline-none focus:ring-gray-500"
                  >
                    <option value="null" className="text-gray-500">
                      select Staff
                    </option>
                    {allUsers.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.username}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="py-2 px-4  rounded-xl bg-green-500 text-white cursor-pointer"
                >
                  {!permissionLoading ? (
                    "Save"
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
                <button
                  className="bg-gray-400 hover:bg-blue-500 py-2 px-4 rounded-xl ml-2 text-white"
                  onClick={() => {
                    setOpenDriver(false);
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </Backdrop>
        {/* permission */}
        <Backdrop className={classes.backdrop} open={openPermission}>
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
                    autoFocus
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
                    <option value="null" className="text-gray-500">
                      select Leave type
                    </option>
                    {leaveTypes.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
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
                <button
                  className="bg-gray-400 hover:bg-blue-500 py-2 px-4 rounded-xl ml-2 text-white"
                  onClick={() => {
                    setOpenPermission(false);
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </Backdrop>
        {/* user */}
        <Backdrop className={classes.backdrop} open={openUsers}>
          <Users setOpenUsers={setOpenUsers} />
        </Backdrop>
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
      {/* /backdrops */}

      {/* header */}
      <div className="col-span-12 grid md:grid-cols-2 flex justify-start items-center">
        {/* thumbnail */}
        <div className="flex flex-col justify-center  p-4 ">
          <div className="flex items-center ">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="cursor-pointer flex items-center h-20 w-20 border-2 border-purple-400  rounded-full "
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
              <div className="flex items-center">
                <button
                  style={{
                    transition: ".5s",
                    transform: secondAnime ? "scale(1)" : "scale(0)",
                    transitionDelay: ".4s",
                  }}
                  className="text-tiny px-4 py-1 flex items-center font-medium 
                rounded-lg cursor-pointer bg-blue-500
               text-white "
                  onClick={() => {
                    setOpenUsers(true);
                  }}
                >
                  View all staff
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <Link to="/settings">
                  <button
                    style={{
                      transition: ".5s",
                      transform: secondAnime ? "scale(1)" : "scale(0)",
                      transitionDelay: ".4s",
                    }}
                    className="text-tiny h-10 w-10 rounded-full flex items-center justify-center mx-1 flex items-center font-medium 
                rounded-lg cursor-pointer bg-green-500
               text-white "
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="ml-4">
            <hr className="my-2" />
            {staffData.job_title === "Driver" && (
              <div className="flex items-center">
                <button
                  style={{
                    transition: ".5s",
                    transform: secondAnime ? "scale(1)" : "scale(0)",
                    transitionDelay: ".4s",
                  }}
                  className="text-tiny px-4 py-2 flex items-center font-medium 
                rounded-lg cursor-pointer bg-purple-500 mr-2
               text-white "
                  onClick={() => {
                    setOpenDriver(true);
                  }}
                >
                  Assign Report
                </button>
                <NavLink to="/driver-report">
                  <button
                    style={{
                      transition: ".5s",
                      transform: secondAnime ? "scale(1)" : "scale(0)",
                      transitionDelay: ".4s",
                    }}
                    className="text-tiny px-4 ring-1 py-1 flex items-center font-medium 
                rounded-lg cursor-pointer bg-white
               text-blue-500 hover:bg-blue-500 hover:text-white "
                    onClick={() => {
                      setOpenDriver(true);
                    }}
                  >
                    View Reports
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* /thumbnail */}
        {/* calender */}
        <div className="flex flex-col md:items-end items-start lg:items-start px-4 my-2 ">
          <div className=" overflow-hidden flex items-center text-purple-500 bg-gray-200 py-2 pr-1 rounded-xl ">
            <div className="p-2  bg-gray-300 rounded-xl mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transition: ".5s",
                  transform: secondAnime
                    ? "translateY(0)"
                    : "translateY(100px)",
                  transitionDelay: ".4s",
                  transitionTimingFunction: "ease-out",
                }}
                className="h-7 w-7 mx-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div
              className="text-md flex flex-col text-purple-400 font-bold "
              style={{
                transition: ".5s",
                transform: secondAnime ? "translateY(0)" : "translateY(100px)",
                transitionDelay: ".4s",
                transitionTimingFunction: "ease-out",
              }}
            >
              <div>{date}</div>
              <div>
                <button className="px-2 mx-1 bg-purple-400 rounded-lg text-white">
                  {hour} : {minute}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* /calender */}
      </div>
      {/* /header */}
      {/* details */}
      <div className="col-span-12 md:col-start-2 mb-6 lg:col-start-1 xl:col-start-2 grid  grid-cols-1 lg:mx-5 lg:grid-cols-2 gap-4 lg:col-span-12 md:col-span-10 xl:col-span-10 flex flex-wrap">
        {/* notice */}
        <div className="rounded-2xl  overflow-hidden ">
          <div className="flex flex-wrap justify-center grid grid-cols-1 md:grid-cols-1 gap-2 rounded-2xl  ">
            {/* notice board */}
            <div className="bg-gray-50 rounded-xl  border border-gray-200 overflow-hidden">
              <div className="pl-2 py-2 text-gray-500 font-bold flex items-center bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-2 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                Notice Board
              </div>
              <div>
                <Swiper
                  pagination={{
                    dynamicBullets: true,
                    clickable: true,
                  }}
                  // navigation={true}
                  loop={true}
                  // autoplay={{
                  //   delay: 2500,
                  //   disableOnInteraction: false,
                  // }}
                  className="mySwiper"
                >
                  {notification
                    .filter(
                      (item) => date_sub(item.end_date, item.send_date) > 0
                    )
                    .map((item) => (
                      <SwiperSlide className="px-2 " key={item.id}>
                        <div>
                          <div className="light text-base  my-2 rounded-xl overflow-hidden text-gray-500">
                            <div className="border-l-4 border-purple-400 px-6 py-2">
                              <button className="text-purple-600 rounded-lg px-2 bg-purple-200">
                                {item.sender.username}
                              </button>
                              <div>{ReactHtmlParser(item.note)}</div>
                            </div>
                          </div>
                          <div className="text-purple-400 font-bold text-base">
                            {new Date(item.send_date).toDateString()}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
            {/* /notice board */}

            {/* permission */}
            <div className="rounded-2xl pb-14  ">
              <div className="flex md:bg-white justify-center ring-1 ring-gray-200 rounded-xl overflow-hidden grid grid-cols-1 items-center h-full ">
                <div className="pl-2 py-2 text-gray-500 font-bold flex items-center bg-gray-200 justify-between">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mx-2 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Permission
                  </div>

                  <div className=" mr-2 text-tiny md:text-base font-semibold text-white bg-purple-500 p-2 rounded-xl">
                    {permissionData !== undefined &&
                      ((permissionData.is_accepted === true &&
                        permissionData.is_active === true) ||
                      (permissionData.is_active === true &&
                        permissionData.is_accepted === null)
                        ? `${date_sub(
                            leo,
                            permissionData !== undefined &&
                              permissionData.to_date
                          )} Days Remain`
                        : null)}
                  </div>
                </div>
                <div className="m-2">
                  {permissionData !== undefined &&
                  permissionData.is_active === true ? (
                    <div className="rounded-3xl light md:p-4">
                      <div className="w-full justify-between flex items-center">
                        <div className="text-green-300 text-xl font-bold">
                          {permissionData.is_accepted === true ||
                          permissionData.is_accepted === null ? (
                            leaveTypes
                              .filter(
                                (item) => item.id === permissionData.leave_type
                              )
                              .map((item) => (
                                <div key={item.id}>{item.name}</div>
                              ))
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
                        {permissionData.is_accepted === true ||
                        permissionData.is_accepted === null ? (
                          `${
                            permissionData !== undefined &&
                            permissionData.description
                          } ...`
                        ) : (
                          <div className="text-red-400">
                            {permissionData.refused_reason}
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
                            permissionData.is_accepted === true ||
                            permissionData.is_accepted === null
                              ? "bg-green-300 "
                              : "bg-red-400"
                          } rounded-xl py-1 px-4 flex items-center `}
                        >
                          <div
                            className={` h-2 w-2 rounded-full bg-white  mr-2  `}
                          />
                          {permissionData.is_accepted
                            ? "Accepted"
                            : permissionData.is_accepted === false
                            ? "Declined"
                            : "In Waiting..."}
                        </div>
                        <div
                          className={`${
                            permissionData.is_accepted === true ||
                            permissionData.is_accepted === null
                              ? "text-green-400  bg-white"
                              : "text-white bg-green-400 cursor-pointer"
                          } rounded-xl  py-1 px-4`}
                          onClick={async () => {
                            if (permissionData.is_accepted === false) {
                              try {
                                await axiosInstance
                                  .patch(
                                    `auth/permission/${permissionData.id}/`,
                                    {
                                      is_active: false,
                                    }
                                  )
                                  .then(async () => {
                                    const responsePermission =
                                      await axiosInstance.get(
                                        "auth/single-permission/"
                                      );
                                    setPermissionData(
                                      responsePermission.data[0]
                                    );
                                  });
                              } catch (error) {
                                console.log(error);
                              }
                            }
                          }}
                        >
                          {permissionData.is_accepted === true ||
                          permissionData.is_accepted === null ? (
                            `${date_sub(
                              permissionData !== undefined &&
                                permissionData.to_date,
                              permissionData !== undefined &&
                                permissionData.start_date
                            )} Days`
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-purple-100 text-base text-purple-600 px-10 py-4 rounded-3xl relative">
                      <div className="absolute top-2  left-2 flex items-center justify-center ">
                        <div className="  font-bold text-white flex h-10 w-10 bg-purple-500 items-center justify-center rounded-full">
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
                              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                            />
                          </svg>
                        </div>
                        <div className="font-semibold ml-4 text-lg">Info</div>
                      </div>
                      <br />
                      <br />
                      Your Have No any Permission Yet, Kindly Wait For the
                      Permission according to the Schedule Provided or Apply in
                      the link below
                      <div className="flex justify-start">
                        {" "}
                        <div
                          className="bg-purple-500  py-1 mt-4 text-white px-2 rounded-lg cursor-pointer"
                          style={{
                            boxShadow: "0 0 10px rgba(99, 101, 241, .8)",
                          }}
                          onClick={() => {
                            setOpenPermission(true);
                          }}
                        >
                          Apply Permission
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* /permission */}
          </div>
        </div>
        {/* /notice */}

        {/* contacts */}
        <div className="rounded-2xl  overflow-hidden ">
          <div className="flex flex-wrap relative justify-center grid grid-cols-1 md:grid-cols-1 gap-2 bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
            <div className="pl-2 py-2 text-gray-500 font-bold flex items-center bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mx-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              Contract Info
            </div>

            <button
              onClick={() => {
                setHide(!hide);
              }}
              className="py-1 absolute top-6 right-2 border-2 border-gray-50 px-2 rounded-xl bg-blue-500 text-white"
            >
              {!hide ? "Show" : "Hide"}
            </button>

            <div className="my-2">
              <div data-aos="zoom-in">
                <Lister
                  title="Start"
                  content={
                    contractData !== undefined && !hide
                      ? "************"
                      : contractData.start_date
                  }
                  color="blue"
                />
              </div>
              <div data-aos="zoom-in">
                <Lister
                  title="End"
                  content={
                    contractData !== undefined && !hide
                      ? "************"
                      : contractData.to_date
                  }
                  color="blue"
                />
              </div>
              <div data-aos="zoom-in">
                <Lister
                  title="Basic"
                  content={`Tsh ${
                    contractData !== undefined && !hide
                      ? "********"
                      : contractData.basic
                  }/=`}
                  color="blue"
                />
              </div>
              <div data-aos="zoom-in">
                <Lister
                  title="Salary"
                  content={`Tsh ${
                    contractData !== undefined && !hide
                      ? "********"
                      : contractData.salary
                  }/=`}
                  color="blue"
                />
              </div>
              <div data-aos="zoom-in">
                <Lister
                  title="PAYE"
                  content={`Tsh ${
                    contractData !== undefined && !hide
                      ? "********"
                      : contractData.PAYE
                  }/=`}
                  color="blue"
                />
              </div>
              <div data-aos="zoom-in">
                <Lister
                  title="NSSF"
                  content={`Tsh ${
                    contractData !== undefined && !hide
                      ? "********"
                      : contractData.NSSF
                  }/=`}
                  color="blue"
                />
              </div>
            </div>
          </div>
        </div>
        {/* /contacts */}
      </div>
      <div className="col-span-12 md:col-start-2  lg:col-start-1 xl:col-start-2 grid  grid-cols-1 lg:mx-5 lg:grid-cols-2 gap-4 lg:col-span-12 md:col-span-10 xl:col-span-10 flex flex-wrap">
        <div className="">
          <div className="flex flex-wrap bg-gray-50 border border-gray-200 overflow-hidden justify-center grid grid-cols-1 md:grid-cols-1 gap-2 rounded-xl">
            <div className="pl-2 py-2 text-gray-500 font-bold flex items-center bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mx-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Staff Info
            </div>
            <div>
              <div data-aos="zoom-in">
                <Lister
                  title="Depart"
                  content={
                    staffData.department !== undefined &&
                    staffData.department.department
                  }
                  color="yellow"
                />
              </div>

              <div data-aos="zoom-in">
                <Lister
                  title="Position"
                  content={
                    staffData.job_position !== undefined &&
                    staffData.job_position.position
                  }
                  color="yellow"
                />
              </div>
              <div data-aos="zoom-in">
                <Lister
                  title="Job Title"
                  content={staffData !== undefined && staffData.job_title}
                  color="yellow"
                />
              </div>
              <div data-aos="zoom-in">
                <Lister
                  title="Staff ID"
                  content={staffData !== undefined && staffData.staffID}
                  color="yellow"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200  rounded-xl overflow-hidden">
          <div className="pl-2 py-2 text-gray-500 font-bold flex items-center bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-2 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Next of kin
          </div>
          <div className="my-2">
            <div data-aos="zoom-in">
              <Lister
                title="Name"
                content={`${
                  userData !== undefined && userData.next_of_kin_name
                } `}
                color="green"
              />
            </div>
            <div data-aos="zoom-in">
              <Lister
                title="Relation "
                content={
                  userData !== undefined && userData.next_of_kin_relationship
                }
                color="green"
              />
            </div>
            <div data-aos="zoom-in">
              <Lister
                title="Number "
                content={userData !== undefined && userData.next_of_kin_number}
                color="green"
              />
            </div>
          </div>
          <div className="pl-2 py-2 mx-2 text-gray-500 rounded-lg font-bold flex items-center bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-2 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>
            Personal Info
          </div>
          <div className="grid grid-cols-1 ">
            <div data-aos="zoom-in">
              <Lister
                title="Age"
                content={`${userData !== undefined && userData.age} Yrs`}
                color="purple"
              />
            </div>
            <div data-aos="zoom-in">
              <Lister
                title="marital "
                content={userData !== undefined && userData.maritual_status}
                color="purple"
              />
            </div>
            <div data-aos="zoom-in">
              <Lister
                title="kids"
                content={userData !== undefined && userData.number_of_kids}
                color="purple"
              />
            </div>
            <div data-aos="zoom-in">
              <Lister
                title="Place"
                content={userData !== undefined && userData.place}
                color="purple"
              />
            </div>
          </div>
        </div>
      </div>
      {/* details */}

      {/* footer */}
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
      {/* /footer */}
    </div>
  );
};

export default Home;
