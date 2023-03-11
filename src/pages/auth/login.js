import React from "react";
import axiosInstance from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReactTypingEffect from "react-typing-effect";

import { motion } from "framer-motion";
function Login() {
  // hooks
  const [username, setUsername] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [is_passwordOn, setIs_passwordOn] = React.useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axiosInstance
        .post("/token/", { username, password })
        .then((res) => {
          localStorage.setItem("token", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);
          localStorage.setItem("refresh_token", res.data.refresh);
          axiosInstance.defaults.headers["Authorization"] =
            "JWT " + localStorage.getItem("token");
          setLoading(false);
          window.location.href = "/";
        });
    } catch (error) {
      toast.error(`Ooops Login failed, wrong Credentials`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    }
  };
  const year = new Date().getFullYear();

  return (
    <div className="w-screen grid grid-cols-12 h-screen flex items-center justify-center -mt-20">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="col-span-10 300 col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4  2xl:col-span-4 2xl:col-start-5 rounded-2xl">
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
            src="../../green.png"
            style={{ width: 100, height: 50, objectFit: "cover" }}
            alt="logo"
          />
        </motion.div>

        <div className="text-xl hidden md:flex w-full  justify-center text-gray-600 my-3">
          <ReactTypingEffect
            text={[
              " Hello, welcome to WASAFI PORTAL",
              "The Wasafi company Staff System",
            ]}
            cursorRenderer={(cursor) => (
              <h1 className="font-black text-blue-500">.</h1>
            )}
            typingDelay={0}
            eraseSpeed={10}
            displayTextRenderer={(text, i) => {
              return (
                <h1>
                  {text.split("").map((char, i) => {
                    const key = `${i}`;
                    return (
                      <span
                        key={key}
                        style={
                          i > 17
                            ? { color: "#3B82F6", fontWeight: "bolder" }
                            : {}
                        }
                      >
                        {char}
                      </span>
                    );
                  })}
                </h1>
              );
            }}
          />
        </div>

        <div
          className="border-gray-200 bg-gray-200 ring-1 ring-gray-300 p-4 my-10 md:my-1 rounded-2xl"
          style={{ borderWidth: 1 }}
        >
          <form className="w-full" onSubmit={handleSubmit}>
            <div>
              <div className="font-semibold"> Username </div>
              <input
                placeholder=" Username "
                className="outline-none my-2 ring-1 ring-gray-300 border-none bg-gray-50 placeholder-gray-400 py-2 px-4 rounded-lg w-full"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value.toUpperCase());
                }}
              />
            </div>

            <div>
              <div className="font-semibold">Password</div>
              <div className="relative">
                <input
                  placeholder="Password"
                  type={!is_passwordOn && "password"}
                  className="outline-none my-2 ring-1 ring-gray-300 border-none bg-gray-50 placeholder-gray-400 py-2 px-4 rounded-lg w-full"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div className="absolute right-2 top-0 h-full text-blue-500 flex items-center">
                  {is_passwordOn ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      onClick={() => {
                        setIs_passwordOn(!is_passwordOn);
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      onClick={() => {
                        setIs_passwordOn(!is_passwordOn);
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 px-4 rounded-lg flex justify-center my-4"
              style={{
                boxShadow: "0 0 10px rgba(59, 131, 246, .8)",
              }}
            >
              {loading ? (
                <div className="flex">
                  <img src="../../loader.svg" alt="loader" className="mx-1" />
                  Loading
                </div>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
        <a
          href="https://wasafimediagroup.co.tz"
          rel="noreferrer"
          target="_blank"
          className="flex justify-center  text-base mt-10 text-red-700"
        >
          {`Wasafi Media Copyright © ${year}.`}
        </a>
      </div>
    </div>
  );
}

export default Login;
