import React from "react";

import { Avatar } from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

import { AiOutlineClose } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";

// material ui stying
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(0,0,0,.02)",
    backdropFilter: "blur(4px)",
  },
}));
const Assets = () => {
  const people = [0, 2, 3, 4, 6, 7, 8, 3];
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState(false);
  const [lack, setLack] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [firstAnime, setFirstAnime] = React.useState(false);
  const [secondAnime, setSecondAnime] = React.useState(false);

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setFirstAnime(true);
    }, 1000);
    setTimeout(() => {
      setSecondAnime(true);
    }, 100);
  }, []);

  const classes = useStyles();
  return (
    <div className=" overflow-hidden" style={{ width: "98vw" }}>
      {/* edit */}
      <Backdrop className={classes.backdrop} open={items}>
        <div className=" grid grid-cols-12  w-screen">
          <div className="rounded-lg  col-span-10  col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4">
            <form className="flex flex-col">
              <div className="rounded-t-xl bg-white overflow-hidden shadow  my-2 ">
                <div className="font-semibold text-white text-xl  pt-10 p-4  bg-gray-400">
                  Vifaa
                </div>
                <div className="p-4 h-80 overflow-y-scroll">
                  <div>
                    {people.map((item) => (
                      <div className="flex m-2  rounded-md overflow-hidden   light  justify-between">
                        <div
                          className={`border-l-4 pl-4 py-4 border-gray-500  text-white h-full flex items-center justify-between  w-full`}
                        >
                          <div className="text-gray-400 font-semibold">
                            Cameran
                          </div>
                          <div className="text-green-400 font-semibold mx-2">
                            Canon
                          </div>
                        </div>
                        <div className=" flex flex-col justify-start md:w-1/3 w-2/3 pl-4 pr-6 py-4 bg-gray-200">
                          <div className="text-gray-400 text-base flex items-center ">
                            <div
                              className={` h-2 w-2 rounded-full bg-gray-500  mr-2 `}
                            />
                            3
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-start mt-3">
                <div
                  className="h-10  w-10 rounded-full text-white  bg-gray-500 flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setItems(false);
                  }}
                >
                  <AiOutlineClose />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Backdrop>

      <Backdrop className={classes.backdrop} open={open}>
        <div className=" grid grid-cols-12  w-screen">
          <div className="rounded-lg  col-span-10  col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4">
            <form className="flex flex-col">
              <div className="rounded-t-xl bg-white overflow-hidden shadow  my-2">
                <div className="font-semibold text-white text-xl bg-green-400 pt-10 p-4">
                  Assign Tools
                </div>
                <div className="p-4">
                  <div>
                    <div className="flex">
                      <Avatar />
                      <select className="form-select text-green-700 p-2 bg-gray-100 rounded-lg pr-4 w-full ml-2 placeholder-green-700 bg-green-100  focus:ring-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent">
                        <option selected>Chagua Mchukuaji</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="flex my-2">
                      <Avatar />
                      <select className="form-select text-green-700 p-2 bg-gray-100 rounded-lg pr-4 w-full ml-2 placeholder-green-700 bg-green-100  focus:ring-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent">
                        <option selected>Chagua Vifaa</option>
                        <option value="1">Camera</option>
                        <option value="2">Card</option>
                        <option value="3">Lamp</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="bg-gray-200 mr-2">
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </Avatar>
                      <input
                        placeholder="Place"
                        className="py-2 text-green-700 px-2 placeholder-green-700 my-2 focus:ring-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent rounded-lg bg-green-100  w-full"
                      />
                    </div>
                    <div className="flex ">
                      <div
                        className="w-10 h-10 rounded-full cursor-pointer text-gray-500 flex bg-gray-200 items-center justify-center"
                        onClick={() => {
                          if (count > 0) {
                            setCount(count - 1);
                          }
                        }}
                      >
                        -
                      </div>
                      <div className="w-10 h-10 rounded-full text-gray-500 flex  items-center justify-center">
                        {count}
                      </div>
                      <div
                        className="w-10 h-10 rounded-full cursor-pointer text-gray-500 flex bg-gray-200 items-center justify-center"
                        onClick={() => {
                          if (count <= 5) {
                            setCount(count + 1);
                          }
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-3">
                <div className="h-8 py-1 px-2 rounded-lg hover:bg-green-500 hover:text-white bg-green-200 text-blue-600 mr-2 cursor-pointer">
                  + Add
                </div>

                <div
                  className="h-10 w-10 rounded-full flex  items-center justify-center  bg-red-500 text-white  cursor-pointer"
                  onClick={() => {
                    setOpen(false);
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
                <div className="font-semibold text-white text-xl  pt-10 p-4  bg-gray-400">
                  Vifaa Vilivyochukuliwa
                </div>
                <div className="p-4 h-80 overflow-y-scroll">
                  <div>
                    {people.map((item) => (
                      <div className="flex m-2  rounded-md overflow-hidden   light  justify-between">
                        <div
                          className={`border-l-4 pl-4 py-4 border-gray-500  text-white h-full flex items-center justify-center`}
                        >
                          <div className="text-gray-400 font-semibold">
                            Camera
                          </div>
                        </div>
                        <div className=" flex flex-col justify-start md:w-1/3 w-2/3 pl-4 pr-6 py-4 bg-gray-200">
                          <div className="text-gray-400 text-base flex items-center ">
                            <div
                              className={` h-2 w-2 rounded-full bg-gray-500  mr-2 `}
                            />
                            3
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-start mt-3">
                <div
                  className="h-10  w-10 rounded-full text-white  bg-gray-500 flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setLack(false);
                  }}
                >
                  <AiOutlineClose />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Backdrop>
      <Backdrop
        className={classes.backdrop}
        open={openDelete}
        onClick={() => {
          setOpenDelete(false);
        }}
      >
        <div className="md:w-2/6 w-full  bg-white  rounded-xl overflow-hidden">
          <div className="text-xl text-white font-medium bg-green-500 p-3">
            Diamond Platnumz
          </div>
          <div className="flex flex-col ">
            <img
              className=" w-full  "
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
              alt="profile"
            />
          </div>
        </div>
      </Backdrop>
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
          Assets
        </div>
      </div>
      <div className="flex  grid md:grid-cols-4 lg:grid-cols-6 gap-3 px-2  my-3 md:px-8">
        <div className="rounded-xl overflow-hidden transition duration-500 ease-in-out transform-gpu hover:scale-105  bg-white  flex flex-col shd text-gray-400  items-center">
          <div className="text-base font-medium flex justify-center p-3 w-full bg-green-500 text-white">
            Borrowed Tools
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
            className=" hover:bg-green-500 mt-4 mb-2 cursor-pointer  hover:text-white px-2 py-1 bg-green-200 mt-3 text-base text-blue-600  rounded-lg    flex justify-center"
          >
            Idadi | 10
          </div>
        </div>
        <div className="rounded-xl overflow-hidden transition duration-500 ease-in-out transform-gpu hover:scale-105  bg-white  flex flex-col shd text-purple-500  items-center">
          <div className="text-base font-medium text-white bg-purple-500 w-full p-3">
            Total Items
          </div>

          <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex justify-center items-center my-1">
            12
          </div>
          <div className="flex justify-around">
            <div
              onClick={() => {
                setItems(true);
              }}
              className="px-2 cursor-pointer mr-1 mt-4 hover:bg-purple-500 hover:text-white py-1 bg-purple-100 text-purple-700 text-base flex items-center rounded-xl"
            >
              View All
            </div>
          </div>
        </div>
      </div>

      <div className="my-4">
        <div className="flex justify-between items-center">
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
          <div
            onClick={() => {
              setOpen(true);
            }}
            className="mr-10 text-base text-blue-500 border-blue-400 py-1 px-4 border-dashed rounded-xl hover:bg-blue-400 hover:text-white cursor-pointer"
            style={{
              borderWidth: 1,
            }}
          >
            add
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
                      Staff
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      Place
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      Tools
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      Returned
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  {people.map((person) => (
                    <tr key={person.email}>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        <div className="flex items-center">
                          <div
                            className="cursor-pointer flex-shrink-0 h-14 w-14 border-2 border-red-400  rounded-full "
                            onClick={() => {
                              setOpenDelete(true);
                            }}
                          >
                            <img
                              className="h-13 w-13 rounded-full border-2 border-gray-100"
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                              alt="profile"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-base font-medium text-gray-900">
                              Naseeb Abdul
                            </div>

                            <div className="text-tiny   inline-flex leading-5 font-medium rounded-full  text-purple-800 ">
                              Diamond Platnumz
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base text-green-500">
                          11 March,2020
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href="tel:0787064145"
                          className="text-base text-gray-900 bg-purple-200 text-purple-500 py-1 px-2 rounded-xl"
                        >
                          0787064145
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base text-green-500">Zoom</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          onClick={() => {
                            setLack(true);
                          }}
                          className="cursor-pointer px-2 py-1 items-center justify-around flex text-base leading-5 font-medium rounded-lg hover:bg-blue-500 hover:text-white bg-blue-100 text-blue-800"
                        >
                          View Tools
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="cursor-pointer px-2 py-1 flex items-center justify-around flex text-base leading-5 font-medium rounded-lg bg-green-200 text-blue-500">
                          Return
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
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

export default Assets;
