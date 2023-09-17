import React from "react";
import { Link } from "react-router-dom";


const SignUp = () => {
  return (
    <>
      <div className=" flex justify-center items-center h-screen">
        <div className="  bg-gray-900 px-16 py-10 rounded-lg">
          <div className="">
            <h1 className="text-center text-blue-200 text-xl mb-4 font-bold">
              Signup
            </h1>
          </div>
          <div>
            <input
              type="text"
              name="name"
              className=" bg-gray-600 mb-4 px-4 py-4 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Name"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              className=" bg-gray-600 mb-4  px-4 py-4 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              className=" bg-gray-600 mb-4  px-4 py-4 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
            />
          </div>
          <div className=" flex justify-center mb-3">
            <button className=" bg-red-500 w-full text-blue-200 font-bold  px-4 py-4 rounded-lg text-xl">
              Signup
            </button>
          </div>
          <div>
            <h2 className="text-white">
             <span className="text-blue-200 ml-1">You already have an account</span>
              <Link className=" text-red-600 font-bold ml-3 text-xl" to={"/login"}>
                Login
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
