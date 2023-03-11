import React from "react";

import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { Avatar } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

import { BiEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { AiOutlineClose } from "react-icons/ai";
import { RiTimerFill } from "react-icons/ri";
import { RiTimerLine } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";

// material ui stying
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(0,0,0,.02)",
    backdropFilter: "blur(4px)",
  },
}));
const Contracts = () => {
  const people = [0, 2, 3, 4, 6, 7, 8, 3];
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [lack, setLack] = React.useState(false);
  const [expired, setExpired] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const classes = useStyles();
  return (
    <div className=" overflow-hidden" style={{ width: "98vw" }}>
      {/* edit */}
      <Backdrop className={classes.backdrop} open={open}>
        <div className=" grid grid-cols-12  w-screen">
          <div className="rounded-lg  col-span-10  col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4">
            <form className="flex flex-col">
              <div className="rounded-t-xl bg-white overflow-hidden shadow  my-2">
                <div className="font-semibold text-white text-xl bg-green-400 pt-10 p-4">
                  Contract
                </div>
                <div className="p-4">
                  <div>
                    {!edit && (
                      <div className="flex">
                        <Avatar />
                        <select className="form-select text-green-700 p-2 bg-gray-100 rounded-lg pr-4 w-full ml-2 placeholder-green-700 bg-green-100  focus:ring-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent">
                          <option selected>Select the User</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Avatar className="bg-gray-200 mr-2">
                        <RiTimerFill />
                      </Avatar>
                      <input
                        placeholder="Start Time"
                        type="date"
                        className="py-2 text-green-700 px-2 placeholder-green-700 my-2 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent rounded-lg bg-green-100  w-full"
                      />
                    </div>

                    <div className="flex items-center">
                      <Avatar className="bg-blue-400 mr-2 text-red-300">
                        <RiTimerLine />
                      </Avatar>
                      <input
                        placeholder="End Time"
                        type="date"
                        className="py-2 px-2 my-2 text-green-700 placeholder-green-700 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent rounded-lg bg-green-100  w-full"
                      />
                    </div>
                    <label className="w-64 flex mt-2 items-start px-2 py-2 bg-white rounded-xl  tracking-wide uppercase  cursor-pointer hover:bg-green-500 hover:text-white text-green-600 ease-linear transition-all duration-150">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                        <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                      </svg>
                      <span className="mt-2 text-base leading-normal">
                        Upload Image
                      </span>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-start mt-3">
                <div className="h-8 py-1 px-2 rounded-lg hover:bg-green-500 hover:text-white bg-green-100 text-green-600 mr-2 cursor-pointer">
                  + Add
                </div>

                <div
                  className="h-10 w-10 rounded-full flex animate-bounce items-center justify-center  bg-red-500 text-white  cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    setEdit(false);
                  }}
                >
                  <AiOutlineClose />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Backdrop>
      <Backdrop className={classes.backdrop} open={lack}>
        <div className=" grid grid-cols-12  w-screen">
          <div className="rounded-lg  col-span-10  col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4">
            <form className="flex flex-col">
              <div className="rounded-t-xl bg-white overflow-hidden shadow  my-2 ">
                <div
                  className={`font-semibold text-white text-xl  pt-10 p-4 ${
                    expired ? "bg-red-500" : "bg-purple-400"
                  }`}
                >
                  {expired ? "Expired Contract" : " Users Lack Contract"}
                </div>
                <div className="p-4 h-80 overflow-y-scroll">
                  <div>
                    {people.map((item) => (
                      <div className="flex justify-between">
                        <div className="flex items-center ">
                          <div className="cursor-pointer flex-shrink-0 h-14 w-14 border-2 border-red-400  rounded-full ">
                            <img
                              className="h-13 w-13 rounded-full border-2 border-gray-100"
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                              alt="profile"
                            />
                          </div>
                          <div className="m-4">
                            <div className="text-base font-medium text-gray-900">
                              Diamond Platnumz
                            </div>

                            <div className="text-tiny  px-2 inline-flex leading-5 font-medium rounded-full bg-red-100 text-red-800 ">
                              0787 064 145
                            </div>
                          </div>
                        </div>
                        <div className=" flex items-center">
                          <div
                            style={{ borderWidth: 1 }}
                            onClick={() => {
                              setLack(false);
                              setTimeout(() => {
                                setEdit(true);
                                setOpen(true);
                                setExpired(false);
                              }, 500);
                            }}
                            className="h-8 bg-purple-100 cursor-pointer text-purple-500 border-dashed border-purple-500 flex items-center px-4 text-white rounded-xl"
                          >
                            + Add
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-start mt-3">
                <div
                  className="h-10 animate-bounce w-10 rounded-full text-white  bg-purple-500 flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setLack(false);
                    setExpired(false);
                  }}
                >
                  <AiOutlineClose />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Backdrop>
      <Backdrop className={classes.backdrop} open={openDelete}>
        <div className="md:w-3/6 w-full  bg-white  rounded-xl overflow-hidden">
          <div className="text-xl text-white font-medium bg-red-500 p-3">
            Contract Delete
          </div>
          <div className="flex flex-col p-4">
            <div className="text-lg text-red-400 font-medium  ">
              Are you Sure you want to Delete keyz Contract?
            </div>
            <div className="flex">
              <div
                className="cursor-pointer hover:bg-red-500 hover:text-white flex px-2 py-1 bg-gray-100 text-gray-500 w-50 rounded my-2"
                onClick={() => {
                  setOpenDelete(false);
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

      <div className="ml-8 text-3xl text-gray-400 font-bold">Contracts</div>
      <div className="flex  grid md:grid-cols-4 lg:grid-cols-6 gap-3 px-2  my-3 md:px-8">
        <div className="rounded-b-xl transition duration-500 ease-in-out transform-gpu hover:scale-105  bg-white  flex flex-col shadow text-gray-400  items-center">
          <div className="text-base font-medium flex justify-center p-3 w-full bg-green-500 text-white">
            Contract Count
          </div>

          <AvatarGroup max={4} className="mx-2 mt-4">
            <Avatar
              alt="Remy Sharp"
              style={{ border: "2px solid whitesmoke" }}
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Avatar
              alt="Travis Howard"
              style={{ border: "2px solid whitesmoke" }}
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Avatar
              alt="Cindy Baker"
              style={{ border: "2px solid whitesmoke" }}
              src="https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Avatar
              alt="Agnes Walker"
              style={{ border: "2px solid whitesmoke" }}
              src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Avatar
              style={{ border: "2px solid whitesmoke" }}
              alt="Trevor Henderson"
              src="https://images.pexels.com/photos/6389355/pexels-photo-6389355.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
          </AvatarGroup>

          <div
            onClick={() => {
              setOpen(true);
            }}
            className=" hover:bg-green-500 mt-4 mb-2 cursor-pointer  hover:text-white px-2 py-1 bg-green-100 mt-3 text-base text-green-600  rounded-lg    flex justify-center"
          >
            + Add Contract
          </div>
        </div>
        <div className="rounded-b-xl transition duration-500 ease-in-out transform-gpu hover:scale-105  bg-white  flex flex-col shadow text-purple-500  items-center">
          <div className="text-base font-medium text-white bg-purple-500 w-full p-3">
            Staffs lack Contracts
          </div>

          <AvatarGroup max={4} className="mx-2 mt-4">
            <Avatar
              alt="Remy Sharp"
              style={{ border: "2px solid whitesmoke" }}
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Avatar
              alt="Travis Howard"
              style={{ border: "2px solid whitesmoke" }}
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Avatar
              alt="Cindy Baker"
              style={{ border: "2px solid whitesmoke" }}
              src="https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Avatar
              alt="Agnes Walker"
              style={{ border: "2px solid whitesmoke" }}
              src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Avatar
              style={{ border: "2px solid whitesmoke" }}
              alt="Trevor Henderson"
              src="https://images.pexels.com/photos/6389355/pexels-photo-6389355.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
          </AvatarGroup>

          <div className="flex justify-around">
            <div
              onClick={() => {
                setLack(true);
              }}
              className="px-2 cursor-pointer mr-1 mt-4 hover:bg-purple-500 hover:text-white py-1 bg-purple-100 text-purple-700 text-base flex items-center rounded-xl"
            >
              View All
            </div>
          </div>
        </div>
        <div className="rounded-b-xl transition duration-500 ease-in-out transform-gpu hover:scale-105  bg-white  flex flex-col shadow text-red-500  items-center">
          <div className="text-base font-medium text-white bg-red-500 w-full p-3">
            Expired Contracts
          </div>
          <AvatarGroup max={4} className="mx-2 mt-4">
            <Avatar
              alt="Remy Sharp"
              style={{ border: "2px solid whitesmoke" }}
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Avatar
              alt="Travis Howard"
              style={{ border: "2px solid whitesmoke" }}
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Avatar
              alt="Cindy Baker"
              style={{ border: "2px solid whitesmoke" }}
              src="https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Avatar
              alt="Agnes Walker"
              style={{ border: "2px solid whitesmoke" }}
              src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Avatar
              style={{ border: "2px solid whitesmoke" }}
              alt="Trevor Henderson"
              src="https://images.pexels.com/photos/6389355/pexels-photo-6389355.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
          </AvatarGroup>

          <div className="flex justify-around">
            <div
              onClick={() => {
                setExpired(true);
                setLack(true);
              }}
              className="px-2 mr-1 mt-4 py-1 hover:bg-red-500 hover:text-white cursor-pointer hoverpy-1 bg-red-100 text-red-700 text-base flex items-center rounded-xl"
            >
              View All
            </div>
          </div>
        </div>
      </div>
      <div className="my-4">
        <div className="ml-10 w-1/2">
          <form className="flex items-center text-blue-500 ">
            <input
              placeholder="search"
              className="py-2 px-2 my-4 rounded-xl  border-blue-500 bg-blue-100 w-2/3 placeholder-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex justify-center items-center h-10 w-10 rounded-full ml-2 bg-blue-400 text-white ">
              <RiSearchLine />
            </div>
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  {people.map((person) => (
                    <tr key={person.email}>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        <div className="flex items-center">
                          <div className="cursor-pointer flex-shrink-0 h-14 w-14 border-2 border-red-400  rounded-full ">
                            <img
                              className="h-13 w-13 rounded-full border-2 border-gray-100"
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                              alt="profile"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-base font-medium text-gray-900">
                              Diamond Platnumz
                            </div>

                            <div className="text-tiny  px-2 inline-flex leading-5 font-medium rounded-full bg-red-100 text-red-800 ">
                              0787 064 145
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base text-gray-900">
                          22 July, 2021
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="cursor-pointer px-2 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg hover:bg-blue-500 hover:text-white bg-blue-100 text-blue-800">
                          22 July, 2022
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className=" cursor-pointer px-2 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg hover:bg-green-500 hover:text-white bg-green-100 text-green-800">
                          1 Year
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                        <div className="px-2 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg bg-yellow-500 text-white ">
                          4 Months
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex ">
                          <div
                            onClick={() => {
                              setEdit(true);
                              setOpen(true);
                            }}
                            className="px-2 cursor-pointer mx-1 py-1 items-center justify-around flex text-lg leading-5 font-medium rounded-lg hover:bg-purple-500 hover:text-white bg-purple-100 text-purple-800"
                          >
                            <BiEditAlt className="mx-1" />
                          </div>
                          <div
                            onClick={() => {
                              setOpenDelete(true);
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
              <div className="flex">
                {people.map((item, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 mx-1 text-white rounded-full bg-blue-400 flex items-center justify-center"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contracts;
