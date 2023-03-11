import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// material ui

import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

// icons
import { IoIosMale } from "react-icons/io";
import { IoFemale } from "react-icons/io5";
import { BsEyeFill } from "react-icons/bs";
import { MdWork } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

import UserDetail from "../../components/userDetail";
import TimeDetail from "../../components/timeDetail";

import axiosInstance from "../../axios";
import Loader from "../../components/loader";
import { Link } from "react-router-dom";
import { CircularProgress, TablePagination } from "@material-ui/core";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// material ui stying
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(0,0,0,.4)",
    backdropFilter: "blur(4px)",
  },
}));

const HrDashBoard = () => {
  const classes = useStyles();
  const [openUser, setOpenUser] = useState(false);
  const [openContract, setOpenContract] = useState(false);
  const [openPermission, setOpenPermission] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [search, setSearch] = useState("");

  const [userData, setUserData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [contractData, setContractData] = useState([]);
  const [permissionData, setPermissionData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [contractInfo, setContractInfo] = useState({});
  const [deleteItem, setDeleteItem] = useState({});
  const [userPermitted, setUserPermitted] = useState({});
  const [permissionInfo, setPermissionInfo] = useState({});

  const [loading, setLoading] = useState(false);
  const [firstAnime, setFirstAnime] = useState(false);
  const [secondAnime, setSecondAnime] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);

  const [noteLoading, setNoteLoading] = useState(false);

  const [note, setNote] = useState("");
  const [end_date, setEnd_date] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const dataFetch = async () => {
      setLoading(true);
      await axiosInstance.get("auth/users/").then((res) => {
        setUserData(res.data);
      });

      await axiosInstance.get("auth/single-user/").then((res) => {
        setUserPermitted(res.data[0]);
      });

      await axiosInstance.get("auth/staffs/").then((res) => {
        setStaffData(res.data);
        setLoading(false);
        setTimeout(() => {
          setFirstAnime(true);
        }, 1000);
        setTimeout(() => {
          setSecondAnime(true);
        }, 100);
      });
      await axiosInstance.get("auth/contracts/").then((res) => {
        setContractData(res.data);
      });
      await axiosInstance.get("auth/permission/").then((res) => {
        setPermissionData(res.data);
      });
    };

    dataFetch();
  }, []);
  const year = new Date().getFullYear();

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        <Backdrop className={classes.backdrop} open={noteOpen}>
          <div className="w-screen flex justify-center">
            <div
              className="openPermission p-4 rounded-2xl"
              style={{
                background: "rgba(255,255,255,.5)",
              }}
            >
              <form
                onSubmit={async (event) => {
                  setNoteLoading(true);
                  event.preventDefault();
                  try {
                    await axiosInstance
                      .post("auth/notification/", {
                        sender: userPermitted.id,
                        note,
                        end_date,
                      })
                      .then(() => {
                        setNoteLoading(false);
                        toast.success("Message was Successfull Sent!", {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                        setNoteOpen(false);
                      });
                  } catch (error) {
                    setNoteLoading(false);
                    toast.error("Message Sent Failed", {
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
                  Notification Message
                </div>

                <div className="my-2 text-gray-500 text-base">
                  <CKEditor
                    editor={ClassicEditor}
                    data="<p></p>"
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    // value={note}
                    onChange={(event, editor) => {
                      setNote(editor.getData());
                    }}
                    // onFocus={(event, editor) => {
                    //   console.log("Focus.", editor);
                    // }}
                  />
                </div>

                <div className="my-2 text-gray-500 text-base">
                  <div>
                    <b>Note Deadline</b>
                  </div>
                  <input
                    required
                    type="date"
                    value={end_date}
                    onChange={(event) => {
                      setEnd_date(event.target.value);
                    }}
                    className="py-2 px-4 ring-1 ring-purple-200 focus:ring-purple-200 text-purple-500 w-full  rounded-xl ring-1 ring-gray-300 bg-gray-100 focus:outline-none focus:ring-gray-500"
                  />
                </div>

                <button
                  type="submit"
                  className="py-2 px-4  rounded-xl bg-purple-500 text-white cursor-pointer"
                >
                  {!noteLoading ? (
                    "Publish"
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
                    setNoteOpen(false);
                  }}
                >
                  Cancel
                </button>
              </form>
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

        {/* contract */}
        <Backdrop className={classes.backdrop} open={openContract}>
          <TimeDetail
            setOpenContract={setOpenContract}
            setContractInfo={setContractInfo}
            contractInfo={contractInfo}
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

        {/* delete */}
        <Backdrop className={classes.backdrop} open={openDelete}>
          <div
            className="md:w-3/6 w-full  bg-white p-4 rounded-xl"
            style={{ background: "rgba(255,255,255,.5)" }}
          >
            <div className="text-xl  text-white font-medium">Staff Delete</div>
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
          className=" text-3xl text-gray-400 font-bold flex items-center px-2"
          style={{
            opacity: firstAnime ? "1" : "0",
          }}
        >
          Hr DashBoard
        </div>
      </div>

      <div className="flex  grid md:grid-cols-4 lg:grid-cols-6 gap-3 px-2  my-3 md:px-8">
        <div className="rounded-b-xl transition duration-500 ease-in-out transform-gpu hover:scale-105 bg-white  flex flex-col shadow text-gray-400  items-center">
          <div className="text-base font-medium text-white bg-green-500 p-3 pb-4 w-full ">
            The Staff Count
          </div>

          <div className="mx-2 -mt-2 -space-x-4">
            {userData
              .filter((item, i) => i < 4)
              .map((user) => (
                <img
                  className="relative z-30 inline object-cover w-12 h-12 border-2 border-white rounded-full"
                  src={
                    user.thumbnail !== ""
                      ? user.thumbnail
                      : "https://leadpilates.com/wp-content/uploads/2019/04/avatar-male.jpg"
                  }
                  alt="Profile "
                />
              ))}
          </div>

          <div className="flex justify-around m-2">
            <div className="px-2 mr-1 py-1 bg-green-100 text-green-700 text-base flex items-center rounded-xl">
              Total Staff: {userData.length}
            </div>
          </div>
        </div>

        <div className="rounded-b-xl transition duration-500 ease-in-out transform-gpu hover:scale-105 bg-white  flex flex-col shadow text-gray-400  items-center">
          <div className="text-base font-medium text-white bg-purple-500 p-3 pb-4 w-full ">
            Male Count
          </div>

          <div className="mx-2 flex w-full -mt-2 justify-around">
            <div className="flex flex-col items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center border-2 border-white  text-white rounded-full bg-purple-500">
                <IoIosMale size={24} />
              </div>
              <div className="px-4 mr-1 py-1 bg-purple-100 text-purple-700 text-base flex items-center rounded-xl">
                Male : {userData.filter((item) => item.gender === "M").length}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-b-xl transition duration-500 ease-in-out transform-gpu hover:scale-105 bg-white  flex flex-col shadow text-gray-400  items-center">
          <div className="text-base font-medium text-white bg-pink-500 p-3 pb-4 w-full ">
            Female Count
          </div>

          <div className="mx-2 flex w-full -mt-2  justify-around">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center border-2 border-white  text-white rounded-full bg-pink-500">
                <IoFemale size={24} />
              </div>
              <div className="px-4 mr-1 py-1 mb-2 bg-pink-100 text-pink-700 text-base flex items-center rounded-xl">
                Female : {userData.filter((item) => item.gender === "F").length}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-b-xl transition duration-500 ease-in-out transform-gpu hover:scale-105 bg-white  flex flex-col shadow text-gray-400  items-center">
          <div className="text-base font-medium text-white bg-blue-500 p-3 pb-4 w-full ">
            Permission Requests
          </div>

          <Link
            to="/hr/permission/request/"
            className="mx-2 flex w-full -mt-2  justify-around"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center border-2 border-white  text-white rounded-full bg-blue-500">
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
              </div>
              <div className="px-4 mr-1 py-1 mb-2 bg-blue-100 text-blue-700 text-base flex items-center rounded-xl">
                Requests :
                {
                  permissionData.filter(
                    (item) =>
                      item.is_active === true && item.is_accepted === null
                  ).length
                }
              </div>
            </div>
          </Link>
        </div>

        <div className="rounded-b-xl transition duration-500 ease-in-out transform-gpu hover:scale-105 bg-white  flex flex-col shadow text-gray-400  items-center">
          <div className="text-base font-medium text-white bg-yellow-500 p-3 pb-4 w-full ">
            Notification Sender
          </div>

          <div
            onClick={() => {
              setNoteOpen(true);
            }}
            className="mx-2 flex w-full -mt-2  justify-around"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center border-2 border-white  text-white rounded-full bg-yellow-500">
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div
                style={{ borderWidth: 1 }}
                className="px-4 cursor-pointer mr-1 py-1 mb-2 bg-yellow-100  border-dashed border-yellow-300 text-yellow-500 text-base flex items-center rounded-xl"
              >
                + Create Note
              </div>
            </div>
          </div>
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
                      FULL NAME
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      CATEGORY
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      GENDER
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 flex text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      MARITAL STATUS
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      CHILDREN
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
                          .includes(search.toUpperCase())
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
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
                        {staffData
                          .filter((item) => item.staff === user.id)
                          .map((item) => (
                            <td className="p-4 whitespace-nowrap" key={item.id}>
                              <div
                                className="text-base px-4 py-2 rounded-xl text-white"
                                style={{
                                  background:
                                    item.category.category === "Wasafi Fm"
                                      ? "#43c483"
                                      : item.category.category === "Wasafi Tv"
                                      ? "#3ea9b8"
                                      : "#9c9c9c",
                                }}
                              >
                                {item.category.category}
                              </div>
                            </td>
                          ))}

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-base text-white bg-yellow-500">
                            {user.gender}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className=" p-2 px-4 rounded-xl flex items-center justify-center text-base text-white bg-gray-400">
                            {user.maritual_status !== "" &&
                            user.maritual_status !== null
                              ? user.maritual_status
                              : "no Info"}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className=" p-2 px-4 rounded-xl flex items-center justify-center text-base text-purple-600 bg-purple-100">
                            {user.number_of_kids !== "" &&
                            user.number_of_kids !== null
                              ? user.number_of_kids
                              : "no Info"}
                          </button>
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

                        {staffData
                          .filter((item) => item.staff === user.id)
                          .map((item) => (
                            <td
                              key={item.id}
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              <div className="text-base text-gray-900">
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
                                }}
                                className="cursor-pointer px-2 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg hover:bg-blue-500 hover:text-white bg-blue-100 text-blue-800"
                              >
                                <BsEyeFill className="mx-1" /> Contract
                              </div>
                            </td>
                          ))}
                        {permissionData.filter((item) => item.staff === user.id)
                          .length !== 0 ? (
                          permissionData
                            .filter((item) => item.staff === user.id)
                            .slice(-1)
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
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full ">
          <TablePagination
            className="bg-gray-200 text-gray-400  rounded-xl"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={Math.floor(
              userData.filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.username.toUpperCase().includes(search.toUpperCase())
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
                  item.phone_number.toUpperCase().includes(search.toUpperCase())
                ) {
                  return item;
                } else if (
                  item.nickname.toUpperCase().includes(search.toUpperCase())
                ) {
                  return item;
                } else if (
                  item.gender.toUpperCase().includes(search.toUpperCase())
                ) {
                  return item;
                }
                return false;
              }).length /
                rowsPerPage >=
                1
                ? Math.floor(
                    userData.filter((item) => {
                      if (search === "") {
                        return item;
                      } else if (
                        item.username
                          .toUpperCase()
                          .includes(search.toUpperCase())
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
                    }).length / rowsPerPage
                  )
                : 1
            )}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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

export default HrDashBoard;
