import React, { useContext, useEffect, useState } from "react";
import { ContextData } from "../../context/data/ContextData";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import {
  increament,
  decrement,
  applyDiscountPrice,
} from "../../redux/cartSlice";

const Cart = () => {
  const { mode } = useContext(ContextData);
  const cartItems = useSelector((state) => state.persistedReducer.cart.basket);
  const totalPrice = useSelector(
    (state) => state.persistedReducer.cart.totalPrice
  );
  console.log(totalPrice)
  const dispatch = useDispatch();
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const applyDiscount = () => {
    if (!discountApplied && discountCode === "gs1905") {
      dispatch(applyDiscountPrice(0.2));
      setDiscountApplied(true);
    } else {
      toast.error("Invalid discount code");
    }
  };

  const deleteForCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };

//  useEffect (() => {
//   applyDiscount()
//  },[])


  return (
    <Layout>
      <div
        className="h-screen bg-blue-100 pt-5 mb-[60%] "
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3 ">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="justify-between mb-6 rounded-lg border  drop-shadow-xl
                 bg-white p-6  sm:flex  sm:justify-start"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(30 35 40)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <img
                  alt="product-image"
                  className="w-full rounded-lg  cartImg"
                  src={item.imageUrl}
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2
                      className="text-lg font-bold text-gray-900"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      {item.title}
                    </h2>
                    <h2
                      className="text-sm  text-gray-900"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      {item.description}
                    </h2>
                    <p
                      className="mt-1 text-xs font-semibold text-gray-700"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      $ {item.price}
                    </p>
                  </div>
                  <div
                    className="text-4xl text-red-500 mt-4 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"
                    onClick={() => deleteForCart(item)}
                  >
                    <AiFillDelete />
                  </div>

                  <p className=" text-violet-700 text-xl">
                    {item.amount * item.price}
                  </p>

                  <div>
                    <button
                      className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-800 hover:border-red-500 rounded"
                      onClick={() => dispatch(decrement(item))}
                    >
                      -
                    </button>
                    <p className="text-green-600 text-lg ml-4">{item.amount}</p>
                    <button
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-800 hover:border-blue-500 rounded"
                      onClick={() => dispatch(increament(item))}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-6 h-full rounded-lg border bg-white p-4 shadow-md md:mt-0 md:w-2/4"
            style={{
              backgroundColor: mode === "dark" ? "rgb(30 35 40)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <div className="mb-2 flex justify-between">
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Subtotal: $ {totalPrice}
              </p>
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              ></p>
            </div>
            <div className="flex justify-between">
              <input
                type="text"
                placeholder="Discount Code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="bg-gray-200 rounded-lg p-2"
              />
            </div>
            <button
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 
              border-b-4 border-green-800 mt-2 hover:border-green-500 rounded"
              onClick={applyDiscount}
              disabled={discountApplied} 
            >
              Get Discount
            </button>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p
                className="text-lg font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total
              </p>
            </div>

            <Modal />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
