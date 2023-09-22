import React, { useContext, useState } from "react";
import { ContextData } from "../../context/data/ContextData";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/FireBaseConfig";

const Login = () => {
  const { loading, setLoading } = useContext(ContextData);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const LoginUser = async () => {
    setLoading(true);
    const { email, password } = newUser;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(loading);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Successfully signed in with Google:", user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Ugurla giris oldu");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error(`Google Sign-In Error:, ${error}`);
    }
  };

  return (
    <>
      <div className=" flex justify-center items-center h-screen">
        {loading && <Loader />}
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
              value={newUser.email}
              onChange={handleInputChange}
              className=" bg-gray-700 mb-4 px-4 py-4 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className=" bg-gray-700 mb-4 px-4 py-4 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
            />
          </div>
          <div className=" flex justify-center mb-3">
            <button
              className=" bg-orange-400 w-full text-black font-bold  px-4 py-4 rounded-lg"
              onClick={LoginUser}
            >
              <span className="text-blue-200 text-lg">Login</span>
            </button>
          </div>
          <div>
            <h2 className="text-white">
              <span className=" text-blue-200 ml-1">
                You do not have an account
              </span>
              <button
                className="bg-blue-500 w-full text-white font-bold px-4 py-4 rounded-lg text-xl"
                onClick={handleGoogleSignIn}
              >
                Google
              </button>

              <Link
                className=" text-orange-600 font-bold ml-3 text-xl"
                to={"/signup"}
              >
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
