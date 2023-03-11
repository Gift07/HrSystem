import React, { useState, useEffect } from "react";

import axiosInstance from "../../axios";
import Loader from "../../components/loader";
import { Link } from "react-router-dom";
import { TablePagination } from "@material-ui/core";

const SingleDriver = () => {
  const [search, setSearch] = useState("");
  const [drivers, setDrivers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [firstAnime, setFirstAnime] = useState(false);
  const [secondAnime, setSecondAnime] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const dataFetch = async () => {
      setLoading(true);

      await axiosInstance.get("auth/single-driver-read/").then((res) => {
        setDrivers(res.data);
        setLoading(false);
        setTimeout(() => {
          setFirstAnime(true);
        }, 1000);
        setTimeout(() => {
          setSecondAnime(true);
        }, 100);
      });
    };

    dataFetch();
  }, []);
  const year = new Date().getFullYear();

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
          My Reports
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
                      DRIVER
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      JOURNEY_FROM
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      JOURNEY_TO
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      TIME_FROM
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      TIME_TO
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      MILEAGE_OUT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      MILEAGE_IN
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      MILEAGE_USED
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      DATE
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-base font-medium text-gray-500  tracking-wider"
                    >
                      SIGNED_BY
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  {drivers
                    .filter((item) => {
                      if (search === "") {
                        return item;
                      } else if (
                        item.driver.username
                          .toUpperCase()
                          .includes(search.toUpperCase())
                      ) {
                        return item;
                      } else if (
                        item.driver.place
                          .toUpperCase()
                          .includes(search.toUpperCase())
                      ) {
                        return item;
                      } else if (
                        item.journey_from
                          .toUpperCase()
                          .includes(search.toUpperCase())
                      ) {
                        return item;
                      } else if (
                        item.journey_to
                          .toUpperCase()
                          .includes(search.toUpperCase())
                      ) {
                        return item;
                      } else if (
                        item.driver.nickname
                          .toUpperCase()
                          .includes(search.toUpperCase())
                      ) {
                        return item;
                      } else if (
                        item.date.toUpperCase().includes(search.toUpperCase())
                      ) {
                        return item;
                      }
                      return false;
                    })
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap ">
                          <div className="flex items-center">
                            <div className="cursor-pointer flex-shrink-0 h-14 w-14 border-2 border-purple-400  rounded-full ">
                              {user.driver.thumbnail !== "" ? (
                                <img
                                  className="h-full w-full rounded-full border-2 border-gray-100 object-cover"
                                  src={user.driver.thumbnail}
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
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="p-2 rounded-xl flex items-center justify-center text-base text-white bg-yellow-500">
                            {user.journey_from}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap ">
                          <div className="text-base text-white flex items-center justify-center bg-purple-500 p-2 rounded-xl">
                            {user.journey_to}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="p-2 rounded-xl flex items-center justify-center text-base text-gray-500 bg-gray-200">
                            {user.time_from}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap ">
                          <div className="text-base  flex items-center justify-center  text-gray-500 bg-gray-200 p-2 rounded-xl">
                            {user.time_to}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="p-2 rounded-xl flex items-center justify-center text-base text-green-600 bg-green-100">
                            {user.mileage_out}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap ">
                          <div className="text-base  flex items-center justify-center  text-pink-600 bg-pink-100 p-2 rounded-xl">
                            {user.mileage_in}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap ">
                          <div className="text-base  flex items-center justify-center  text-purple-600 bg-purple-100 p-2 rounded-xl">
                            {parseInt(user.mileage_in) -
                              parseInt(user.mileage_out)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap ">
                          <div className="text-base  flex items-center justify-center  text-gray-500 bg-gray-200 p-2 rounded-xl">
                            {user.date}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap ">
                          <div className="flex items-center">
                            <div className="cursor-pointer flex-shrink-0 h-14 w-14 border-2 border-purple-400  rounded-full ">
                              {user.auth_staff.thumbnail !== "" ? (
                                <img
                                  className="h-full w-full rounded-full border-2 border-gray-100 object-cover"
                                  src={user.auth_staff.thumbnail}
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
                                className="text-base font-medium text-gray-400"
                              >
                                {user.auth_staff.username}
                              </Link>
                              <div className="text-tiny text-purple-400">
                                {user.auth_staff.email}
                              </div>
                              <div className="text-tiny  px-2 inline-flex leading-5 font-medium rounded-full bg-purple-100 text-purple-600 ">
                                {user.auth_staff.phone_number}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex justify-center w-full">
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={Math.floor(
                    drivers.filter((item) => {
                      if (search === "") {
                        return item;
                      } else if (
                        item.driver.username
                          .toUpperCase()
                          .includes(search.toUpperCase())
                      ) {
                        return item;
                      } else if (
                        item.driver.place
                          .toUpperCase()
                          .includes(search.toUpperCase())
                      ) {
                        return item;
                      } else if (
                        item.journey_from
                          .toUpperCase()
                          .includes(search.toUpperCase())
                      ) {
                        return item;
                      } else if (
                        item.journey_to
                          .toUpperCase()
                          .includes(search.toUpperCase())
                      ) {
                        return item;
                      } else if (
                        item.driver.nickname
                          .toUpperCase()
                          .includes(search.toUpperCase())
                      ) {
                        return item;
                      } else if (
                        item.date.toUpperCase().includes(search.toUpperCase())
                      ) {
                        return item;
                      }
                      return false;
                    }).length /
                      rowsPerPage >=
                      1
                      ? Math.floor(
                          drivers.filter((item) => {
                            if (search === "") {
                              return item;
                            } else if (
                              item.driver.username
                                .toUpperCase()
                                .includes(search.toUpperCase())
                            ) {
                              return item;
                            } else if (
                              item.driver.place
                                .toUpperCase()
                                .includes(search.toUpperCase())
                            ) {
                              return item;
                            } else if (
                              item.journey_from
                                .toUpperCase()
                                .includes(search.toUpperCase())
                            ) {
                              return item;
                            } else if (
                              item.journey_to
                                .toUpperCase()
                                .includes(search.toUpperCase())
                            ) {
                              return item;
                            } else if (
                              item.driver.nickname
                                .toUpperCase()
                                .includes(search.toUpperCase())
                            ) {
                              return item;
                            } else if (
                              item.date
                                .toUpperCase()
                                .includes(search.toUpperCase())
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
          </div>
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

export default SingleDriver;
