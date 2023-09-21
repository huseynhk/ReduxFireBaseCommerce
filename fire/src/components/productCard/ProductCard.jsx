import React, { useContext, useState, useEffect } from "react";
import { ContextData } from "../../context/data/ContextData";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const ProductCard = () => {
  const { mode, product, searchkey, filterType, sortTitle } =
    useContext(ContextData);
  const dispatch = useDispatch();

  // const filteredProduct = product.filter((pr) => {
  //   return (
  //     pr.title.toLowerCase().includes(searchkey) ||
  //     pr.category.toLowerCase().includes(filterType)
  //   );
  // });

  const filteredProduct = product
    .filter((pr) => pr.title.toLowerCase().includes(searchkey))
    .filter((pr) => pr.category.toLowerCase().includes(filterType));
  const [sortedProducts, setSortedProducts] = useState(filteredProduct);

  const sortProducts = () => {
    switch (sortTitle) {
      case "price-low-to-high":
        setSortedProducts(
          [...filteredProduct].sort((a, b) => a.price - b.price)
        );
        break;
      case "price-high-to-low":
        setSortedProducts(
          [...filteredProduct].sort((a, b) => b.price - a.price)
        );
        break;
      case "name-a-to-z":
        setSortedProducts(
          [...filteredProduct].sort((a, b) => a.title.localeCompare(b.title))
        );
        break;
      case "name-z-to-a":
        setSortedProducts(
          [...filteredProduct].sort((a, b) => b.title.localeCompare(a.title))
        );
        break;
      default:
        setSortedProducts([...filteredProduct]);
        break;
    }
  };

  useEffect(() => {
    sortProducts();
  }, [sortTitle, filteredProduct]);

  const addForCart = (product) => {
    dispatch(
      addToCart({ ...product, price: Number(product.price), amount: 1 })
    );
    console.log(product);
    toast.success("Product is adding to cart");
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1
              className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Our Latest Collection
            </h1>
            <div className="h-1 w-20 bg-blue-600 rounded"></div>
          </div>

          <div className="flex flex-wrap -m-4">
            {sortedProducts.map((item, index) => (
              <div className="p-4 md:w-1/4  drop-shadow-lg" key={index}>
                <div
                  className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(45 50 55)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <div className="flex justify-center cursor-pointer">
                    <img
                      className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out"
                      alt="blog"
                      src={item.imageUrl}
                    />
                  </div>
                  <div className="p-5 border-t-2">
                    <h2
                      className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      StoreAz
                    </h2>
                    <h1
                      className="title-font text-lg font-medium text-gray-900 mb-3"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      {item.title}
                    </h1>
                    <p className="leading-relaxed mb-3">{item.description}</p>
                    <p
                      className="leading-relaxed mb-3"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      $ {item.price}
                    </p>
                    <div className=" flex justify-center">
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2"
                        onClick={() => addForCart(item)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCard;
