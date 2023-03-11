import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import IconButton from "@material-ui/core/IconButton";
import axiosInstance from "./axios";

import { motion } from "framer-motion";
// aos

// react router domZ
import { NavLink } from "react-router-dom";

// icons
import { BsTools } from "react-icons/bs";
import { MdPersonPin } from "react-icons/md";
import { SiReadthedocs } from "react-icons/si";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import { GiTv } from "react-icons/gi";
import { GiPocketRadio } from "react-icons/gi";
import { FaCameraRetro } from "react-icons/fa";
import { IoCarSportOutline, IoVideocam } from "react-icons/io5";
import { GiNewspaper } from "react-icons/gi";
import { ImMusic } from "react-icons/im";
import { IoIosMicrophone } from "react-icons/io";
import { SiShopify } from "react-icons/si";
import { IoMdMicrophone } from "react-icons/io";

const drawerWidth = 270;

const Lister = ({ icon, title }) => {
  return (
    <div className="flex items-center m-0 py-2 text-gray-500 hover:bg-green-500 hover:text-white rounded-xl">
      <div className="ml-4 text-blue-600 hover:text-white">{icon}</div>

      <p className="mx-4 p-0  flex items-center text-base ">{title}</p>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    border: "none",
  },
  drawerPaper: {
    width: drawerWidth,
    padding: 10,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    background: "rgba(255,255,255,.8)",
    borderRadius: 20,
  },
}));

const Hoc = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [userData, setUserData] = useState({});
  const [staffData, setStaffData] = useState({});

  useEffect(() => {
    const dataFetch = async () => {
      const responseUser = await axiosInstance.get("auth/single-user/");
      setUserData(responseUser.data[0]);
      const responseStaff = await axiosInstance.get("auth/single-staff/");
      if (responseStaff.data.length === 0) {
        setStaffData({});
      } else {
        setStaffData(responseStaff.data[0]);
      }
    };

    dataFetch();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        style={{ background: "whitesmoke" }}
        elevation={0}
      >
        <Toolbar>
          {userData && userData.is_staff === true && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </IconButton>
          )}
          <div className="flex justify-between w-full items-center">
            {localStorage.getItem("token") !== null && (
              <NavLink
                to="/"
                className="text-gray-500 flex items-center font-medium  "
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ rotate: 360, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="w-full flex justify-center"
                >
                  <img
                    src="https://wasafimediagroup.co.tz/static/wasafiIcon.png"
                    style={{ width: 50 }}
                    alt="logo"
                  />
                </motion.div>
              </NavLink>
            )}
            <div className="flex items-center">
              {staffData.job_position &&
                staffData.job_position.position === "Head of Music" && (
                  <NavLink
                    to="/department/music/"
                    className="text-gray-500 mx-4"
                    activeStyle={{
                      color: "green",
                      borderBottom: "1px solid green",
                    }}
                  >
                    My Staffs
                  </NavLink>
                )}

              {staffData.job_position &&
                staffData.job_position.position === "Head of Production" && (
                  <NavLink
                    to="/department/production/"
                    className="text-gray-500 mx-4"
                    activeStyle={{
                      color: "green",
                      borderBottom: "1px solid green",
                    }}
                  >
                    My Staffs
                  </NavLink>
                )}
              {staffData.job_position &&
                staffData.job_position.position === "Sales Manager" && (
                  <NavLink
                    to="/department/marketing/"
                    className="text-gray-500 mx-4"
                    activeStyle={{
                      color: "green",
                      borderBottom: "1px solid green",
                    }}
                  >
                    My Staffs
                  </NavLink>
                )}
              {staffData.job_position &&
                staffData.job_position.position ===
                  "Head of Radio Programs" && (
                  <NavLink
                    to="/department/programming/"
                    className="text-gray-500 mx-4"
                    activeStyle={{
                      color: "green",
                      borderBottom: "1px solid green",
                    }}
                  >
                    My Staffs
                  </NavLink>
                )}
              {localStorage.getItem("token") !== null && (
                <div
                  className="py-1 px-4 bg-red-400 text-white rounded-lg cursor-pointer text-base"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/auth/login/";
                  }}
                >
                  Log Out
                </div>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {userData && userData.is_staff === true && (
        <Drawer
          className={classes.drawer}
          anchor="left"
          open={open}
          onClick={handleDrawerClose}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <div className="flex justify-between items-center w-full">
              <div className="text-gray-400 font-semibold text-xl poppins">
                Wasafi System
              </div>
              <IconButton
                onClick={handleDrawerClose}
                style={{ background: "#e8e8e8", boxShadow: "none" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
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
              </IconButton>
            </div>
          </div>

          <div className="flex flex-col  align-start header ">
            <div className="font-medium text-gray-500 m-3 text-left ">
              Dashboard
            </div>

            <div className="bg-gray-200 rounded-xl">
              <NavLink
                to="/hr"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister title="Admin" icon={<MdPersonPin size={25} />} />
              </NavLink>

              {/* /contract */}

              <NavLink
                to="/hr/wasafi-fm"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister title="Wasafi Fm" icon={<GiPocketRadio size={25} />} />
              </NavLink>

              <NavLink
                to="/hr/wasafi-tv"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister title="Wasafi Tv" icon={<GiTv size={25} />} />
              </NavLink>

              <NavLink
                to="/hr/reporters"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister
                  title="Reporters"
                  icon={<IoIosMicrophone size={25} />}
                />
              </NavLink>

              <NavLink
                to="/hr/sales"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister title="Sales" icon={<SiShopify size={25} />} />
              </NavLink>
              <div
                className="h-1 w-full border-gray-300"
                style={{
                  borderTopWidth: 1,
                }}
              />

              <NavLink
                to="/hr/docs"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister title="Documents" icon={<SiReadthedocs size={25} />} />
              </NavLink>
              <div
                className="h-1 w-full border-gray-300"
                style={{
                  borderTopWidth: 1,
                }}
              />
              <NavLink
                to="/hr/permission"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister
                  title="Permissions"
                  icon={<BsFillChatSquareQuoteFill size={25} />}
                />
              </NavLink>

              <NavLink
                to="/hr/permission/request"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister
                  title=" Requests"
                  icon={
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  }
                />
              </NavLink>
              <NavLink
                to="/hr/permission/refused"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister
                  title=" Refused"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
              </NavLink>
              <div
                className="h-1 w-full border-gray-300"
                style={{
                  borderTopWidth: 1,
                }}
              />
              <NavLink
                to="/hr/driver/"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister
                  title="Drivers"
                  icon={<IoCarSportOutline size={20} />}
                />
              </NavLink>
            </div>

            <h1 className="font-medium text-gray-500 m-3 text-left">
              Departments
            </h1>

            <div className="bg-gray-200 rounded-xl py-4 ">
              {/* prgram mamnager */}
              <NavLink
                to="/department/music"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister title="Music " icon={<ImMusic size={25} />} />
              </NavLink>
              {/* /prgram mamnager */}
              {/* digital */}
              <NavLink
                to="/department/digital"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister title="Digital " icon={<FaCameraRetro size={25} />} />
              </NavLink>
              {/* /digital */}
              {/* production */}
              <NavLink
                to="/department/production"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister title="Production " icon={<IoVideocam size={25} />} />
              </NavLink>

              {/* Assets */}
              <NavLink
                to="/department/marketing"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister
                  title="Marketing "
                  icon={
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
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  }
                />
              </NavLink>
              {/* /Assets */}
              {/* news */}
              <NavLink
                to="/department/programming"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister
                  title="Programming "
                  icon={<IoMdMicrophone size={25} />}
                />
              </NavLink>
              {/* /news */}
              <NavLink
                to="/department/technical"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister title="Technical " icon={<BsTools size={25} />} />
              </NavLink>
              <NavLink
                to="/department/news"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister title="News " icon={<GiNewspaper size={25} />} />
              </NavLink>

              <NavLink
                to="/department/news"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister
                  title="Finance "
                  icon={
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                />
              </NavLink>
              <NavLink
                to="/department/news"
                exact
                className="py-1"
                activeStyle={{
                  background: "#d4e2fc",
                  borderRadius: 20,
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Lister
                  title="Administration "
                  icon={
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
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      />
                    </svg>
                  }
                />
              </NavLink>
            </div>
          </div>
        </Drawer>
      )}
      <main className="w-screen overflow-hidden">
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};
export default Hoc;
