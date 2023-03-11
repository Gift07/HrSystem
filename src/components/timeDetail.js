import React from "react";

import { MdUpdate } from "react-icons/md";

import { RiTimerFill } from "react-icons/ri";
import { RiTimerLine } from "react-icons/ri";

const TimeDetail = ({
  setOpenContract,
  setOpenPermission,
  setOpenLoan,
  setOpenSalary,
  contractInfo,
  setPermissionInfo,
  permissionInfo,
  setContractInfo,
}) => {
  const Lister = ({ icon, title, content, color }) => {
    return (
      <div className="flex m-2 rounded-md overflow-hidden   bg-white">
        <div
          className={`bg-${color}-500 w-10 text-white h-full flex items-center justify-center`}
        >
          {icon}
        </div>
        <div className=" flex flex-col justify-start pl-4 pr-6 py-2 ">
          <div className="text-gray-400 font-semibold">{title}</div>
          <div className={`text-${color}-400 text-base flex items-center `}>
            {content}
            <div className={` h-2 w-2 rounded-full bg-${color}-500  ml-2 `} />
          </div>
        </div>
      </div>
    );
  };

  const date_sub = (from_date, to_date) => {
    const date1 = new Date(from_date);
    const date2 = new Date(to_date);
    const differ = Math.abs(date1 - date2);
    let result = Math.ceil(differ / (1000 * 60 * 60 * 24 * 30 * 12) - 1);
    if (result < 1) {
      result = 1;
      return result;
    }

    return result;
  };

  return (
    <div
      className="md:w-3/6 w-full   rounded-xl overflow-hidden relative pb-4"
      style={{ background: "rgba(255,255,255,.5)" }}
    >
      <div className="font-semibold text-xl text-white p-3  w-full">
        {setOpenContract && "Contract"}
        {setOpenLoan && "Loan"}
        {setOpenPermission && "Permission"}
      </div>
      <div className="flex justify-stetch px-2">
        <div
          className="mt-2 text-gray-500 text-medium rounded-xl p-2 "
          style={{ background: "rgba(255,255,255,.5)" }}
        >
          <div className="font-semibold text-xl text-gray-400"> Time</div>
          <div className="flex flex-wrap">
            <Lister
              title="From Date"
              content={
                contractInfo
                  ? contractInfo.start_date
                  : permissionInfo.start_date
              }
              color="pink"
              icon={<RiTimerFill size={20} />}
            />
            <Lister
              title="To Date"
              content={
                contractInfo ? contractInfo.to_date : permissionInfo.to_date
              }
              color="purple"
              icon={<RiTimerLine size={20} />}
            />
          </div>
        </div>

        <div
          className="mt-2 text-gray-500 text-medium  ml-1 rounded-xl p-2 "
          style={{ background: "rgba(255,255,255,.6)" }}
        >
          <div className="font-semibold text-xl text-gray-400"> Duration</div>
          <div className="flex flex-wrap">
            {contractInfo && (
              <Lister
                title="Duration"
                content={`${date_sub(
                  contractInfo && contractInfo.start_date,
                  contractInfo && contractInfo.to_date
                )} Years`}
                color="green"
                icon={<MdUpdate size={20} />}
              />
            )}
            {permissionInfo && (
              <Lister
                title="Duration"
                content={`${date_sub(
                  permissionInfo && permissionInfo.start_date,
                  permissionInfo && permissionInfo.to_date
                )} Years`}
                color="green"
                icon={<MdUpdate size={20} />}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className="cursor-pointer absolute top-0 right-2 ml-2 w-10 h-10 rounded-full flex items-center justify-center text-black  rounded my-2"
          style={{ background: "rgba(255,255,255,.6)" }}
          onClick={() => {
            if (setOpenPermission) {
              setOpenPermission(false);
              setPermissionInfo({});
            }
            if (setOpenLoan) {
              setOpenLoan(false);
            }
            if (setOpenSalary) {
              setOpenSalary(false);
            }
            if (setOpenContract) {
              setOpenContract(false);
              setContractInfo({});
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TimeDetail;
