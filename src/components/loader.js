import React from "react";
import { motion } from "framer-motion";


function Loader() {
  
  return (
    <div
      className=" flex  w-screen h-screen items-center justify-center absolute top-0 "
      style={{
        zIndex: 100,
        background: "whitesmoke",
      }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <img
            src="../../green.png"
            width="100"
            alt="green logo"
            className="my-4 animate-bounce "
          />
        </motion.div>
        <div className="bg-blue-500 text-white animate-pulse rounded-xl px-4 py-2 flex text-base justify-center items-center text-white">
        <div className="flex">
                  <img src="loader.svg" alt="loader" className="mx-1" />
                </div>
          <div className="ml-2">Loading</div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
