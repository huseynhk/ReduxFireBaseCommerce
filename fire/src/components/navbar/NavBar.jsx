import React from "react";
import { useContext, useState, Fragment } from "react";
import { ContextData } from "../../context/data/ContextData";
import { Link } from "react-router-dom";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const NavBar = () => {
  const { mode, toggleMode } = useContext(ContextData);
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user.email)
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.clear("user");
    navigate("/login");
  };
  const cartItems = useSelector((state) => state.persistedReducer.cart.basket);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as={Fragment}
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
              as={Fragment}
            >
              <Dialog.Panel
                className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(40, 44, 52)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-red-800"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only text;2xl">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-red-600 px-4 py-6 flex items-center justify-center flex-col">
           

                  {user && (
                    <a
                      className="text-sm font-medium text-gray-700 ml-6"
                      style={{ color: mode === "dark" ? "white" : "" }}
                      onClick={logoutUser}
                    >
                      LogOut
                    </a>
                  )}

                  {user && (
                    <a
                      to={"/order"}
                      className="text-sm font-medium text-gray-700 ml-6"
                      style={{ color: mode === "dark" ? "white" : "" }}
                      onClick={logoutUser}
                    >
                      Order
                    </a>
                  )}

                  {user?.email === "khuseyn693@gmail.com" && (
                    <Link
                      to={"/dashboard"}
                      className="text-sm font-medium text-gray-700 ml-2"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Admin
                    </Link>
                  )}

                  <Link
                    to={"/signup"}
                    className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer ml-2"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    Signup
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="bg-blue-200 px-4 sm:px-6 lg:px-8 shadow-xl "
          style={{
            backgroundColor: mode === "dark" ? "#282c34" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
                style={{
                  backgroundColor: mode === "dark" ? "rgb(80 85 90)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={"/"} className="flex">
                  <div className="flex ">
                    <h1
                      className=" text-2xl font-bold text-black  px-2 py-1 rounded"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      StoreAz
                    </h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
       

                  {user && (
                    <a
                      className="text-sm font-medium text-gray-700 ml-6"
                      style={{ color: mode === "dark" ? "white" : "" }}
                      onClick={logoutUser}
                    >
                      LogOut
                    </a>
                  )}

                  {user && (
                    <a
                      to={"/order"}
                      className="text-sm font-medium text-gray-700 ml-6"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Order
                    </a>
                  )}

                  {user?.email === "khuseyn693@gmail.com" && (
                    <Link
                      to={"/dashboard"}
                      className="text-sm font-medium text-gray-700 "
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      Admin
                    </Link>
                  )}

                  <Link
                    to={"/signup"}
                    className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    Signup
                  </Link>
                </div>

                <div className="flex lg:ml-8">
                  <button onClick={toggleMode}>
                    {mode === "light" ? (
                      <FiSun size={30} />
                    ) : "dark" ? (
                      <BsFillCloudSunFill size={30} />
                    ) : (
                      ""
                    )}
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link
                    to={"/cart"}
                    className="group -m-2 flex items-center p-2"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>

                    <span
                      className="ml-2 text-sm font-medium text-gray-700 group-"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      {cartItems.length}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
