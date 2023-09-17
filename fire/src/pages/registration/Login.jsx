import React, { useContext } from "react";
import { ContextData } from "../../context/data/ContextData";
import { Link } from "react-router-dom";

const Login = () => {
  const { mode } = useContext(ContextData);
  return (
    <>
      <div className=" flex justify-center items-center h-screen">
        <div className=" bg-gray-900 px-16 py-10 rounded-lg">
          <div className="">
            <h1 className="text-center text-blue-200 text-2xl mb-6 font-bold">
              Login
            </h1>
          </div>
          <div>
            <input
              type="email"
              name="email"
              className=" bg-gray-700 mb-4 px-4 py-4 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              className=" bg-gray-700 mb-4 px-4 py-4 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
            />
          </div>
          <div className=" flex justify-center mb-3">
            <button
              className=" bg-orange-400 w-full text-black font-bold  px-4 py-4 rounded-lg"
            >
              <span className="text-blue-200 text-lg">Login</span>
            </button>
          </div>
          <div>
            <h2 className="text-white">
             <span className=" text-blue-200 ml-1">You do not have an account</span>
              <Link className=" text-orange-600 font-bold ml-3 text-xl" to={"/signup"}>
                Signup
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
