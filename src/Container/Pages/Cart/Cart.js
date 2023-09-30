import React, { useEffect, useState } from "react";
// import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Loader from "../../../Components/Loader/Loader";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import RecentlyVisited2 from "../../Home/RecentlyVisited/RecentlyVisited2";
import Container from "../../Container";
import { CartContext } from "../../../Context/CartContext";
import { useContext } from "react";

const Cart = () => {
  const { cartCount, setCartCount } = useContext(CartContext);
  let Navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", loading);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [loading]);

  const getCartItems = async () => {
    // await setLoading(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        `cart/getCartById/${localStorage.getItem("CID")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setCartData(result.data);
      })
      .catch((error) => console.log("error", error));
    await setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCartItems();
  }, []);

  const handleRemoveCartItems = async (el) => {
    await setLoading(true);
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL + `cart/deleteCart/${el.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status === 200) {
          setLoading(false);
          setCartCount(parseInt(cartCount) - parseInt(el.quantity));
        } else {
          setLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
    setLoading(false);
    await getCartItems();
  };

  const CartMinusQuantity = async (el) => {
    if (parseInt(el.quantity) !== 1) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "ci_session=m0mh2v1fdl2946u5p39kd237d8uo47cu");

      var raw = JSON.stringify({
        product_id: el.product_id,
        user_id: localStorage.getItem("CID"),
        quantity: parseInt(el.quantity) - 1,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        process.env.REACT_APP_HAPS_MEDIA_BASE_URL + `cart/updateCart/${el.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            setCartCount(parseInt(cartCount) - 1);
          }
        })
        .catch((error) => console.log("error", error));
      await getCartItems();
    }
  };

  const CartAddQuantity = async (el) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ci_session=m0mh2v1fdl2946u5p39kd237d8uo47cu");

    var raw = JSON.stringify({
      product_id: el.product_id,
      user_id: localStorage.getItem("CID"),
      quantity: parseInt(el.quantity) + 1,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL + `cart/updateCart/${el.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setCartCount(parseInt(cartCount) + 1);
        }
      })
      .catch((error) => console.log("error", error));

    await getCartItems();
  };

  let subtotal = 0;

  if (cartData.length > 0) {
    subtotal = cartData.reduce((acc, el) => {
      const discountedPrice =
        parseFloat(el.actual_price) -
        parseFloat(el.actual_price) * (parseFloat(el.discounted_percent) / 100);
      return acc + discountedPrice * parseInt(el.quantity);
    }, 0);
  }
  let totalItems = 0;

  if (cartData.length > 0) {
    totalItems = cartData.reduce((acc, el) => acc + parseInt(el.quantity), 0);
  }

  const handleGoAddress = () => {
    Navigate({
      pathname: "/checkout",
      // search: createSearchParams({
      // CartAmount: subtotal,
      // }).toString(),
    });
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="relative bg-white h-screen overflow-hidden" />
          {loading && (
            <div className="flex justify-center">
              <div className="absolute top-[50%]">
                <Loader />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white error-message h-auto">
          <div className="p-0 md:p-5 lg:p-5 xl:p-5">
            <div className="w-full p-2 md:py-3 lg:p-0 xl:p-0 mt-2 md:mt-2 lg:mt-0 xl:mt-0 sticky top-10 z-10">
              <div className="p-3 block md:block lg:hidden px-8 bg-white rounded-2xl mt-[0px] shadow-lg">
                <p className="text-md font-semibold mt-2 tracking-wider">
                  Subtotal:{" "}
                  <span>
                    ({totalItems} Items):{" "}
                    <span className="font-bold text-black">
                      ₹ {parseInt(subtotal)} /-
                    </span>
                  </span>
                </p>
                {/* <input className="mt-1" type="checkbox" name="" id="" />
                <span className="mx-2 font-semibold text-sm">
                  This Order Contains a Gift.
                </span> */}
                <div className="mt-2">
                  <button
                    type="submit"
                    className="p-2 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                    onClick={handleGoAddress}
                    disabled={cartData.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-col lg:flex-row w-full p-2 md:p-2 lg:p-5 xl:p-5">
              <div className="bg-white rounded-2xl w-full">
                <div className="p-4 px-8 font-sans font-bold text-xl md:text-xl lg:text-xl xl:text-xl tracking-wider border bg-slate-50 rounded-t-xl capitalize">
                  Your Cart
                </div>
                {/* <hr className="border-[1px] mx-5 border-black" /> */}
                {cartData.length > 0 ? (
                  cartData.map((el, i) => {
                    return (
                      <div className="rounded-lg w-full" key={i}>
                        <div className="justify-between mb-2 rounded-lg bg-white p-6 shadow-sm sm:flex sm:justify-start">
                          <Link to={`/single-product/${el.product_id}`}>
                            <img
                              src={
                                process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
                                `${el.image_path}`
                              }
                              alt="product-image"
                              className="w-full h-[200px] md:w-[170px] md:h-[170px] lg:w-[170px] lg:h-[170px] rounded-lg object-contain bg-gray-100"
                            />
                          </Link>
                          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                            <div className="mt-5 sm:mt-0">
                              <Link
                                t0={`/single-product/${el.product_id}`}
                                className="text-lg font-bold text-gray-900"
                              >
                                {el.name}
                              </Link>
                              <div className="font-semibold text-sm tracking-wider ">
                                <p>
                                  By {el.brand}{" "}
                                  <span className="text-[#227100]">
                                    haps pro
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 flex flex-row-reverse md:flex-row-reverse lg:flex-row justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                              <div className="flex justify-end items-center space-x-2">
                                <div>
                                  <p className="text-[#027100] text-base md:text-lg lg:text-xl font-semibold tracking-wider">
                                    ₹{Math.floor(el.discounted_price)}
                                  </p>
                                  <p className="strike-through-red text-sm text-gray-900 tracking-wider text-center">
                                    Rs {parseInt(el.actual_price)}/-
                                  </p>
                                </div>
                                <button
                                  onClick={() => handleRemoveCartItems(el)}
                                >
                                  <RiDeleteBin6Line
                                    className="text-lg md:text-2xl lg:text-2xl font-semibold mx-1 hover:text-red-500"
                                    size={18}
                                  />
                                </button>
                              </div>
                              <div className="flex items-center font-bold text-sm mt-3">
                                <p className="mr-2 tracking-wider">Qty</p>
                                <div className="flex items-center border text-black border-black rounded-md p-0.5">
                                  {parseInt(el.quantity) === 1 ? (
                                    <button
                                      onClick={() => handleRemoveCartItems(el)}
                                    >
                                      <RiDeleteBin6Line
                                        className="text-lg md:text-2xl lg:text-2xl font-semibold mx-1 hover:text-red-500"
                                        size={18}
                                      />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => CartMinusQuantity(el)}
                                      disabled={
                                        parseInt(el.quantity) === 1
                                          ? true
                                          : false
                                      }
                                    >
                                      <AiOutlineMinus className="text-lg md:text-2xl lg:text-2xl font-semibold mx-1" />
                                    </button>
                                  )}
                                  <span className="text-center text-black px-5 border border-t-white border-b-white border-x-black">
                                    {parseInt(el.quantity)}
                                  </span>
                                  <button onClick={() => CartAddQuantity(el)}>
                                    <AiOutlinePlus className="text-lg md:text-2xl lg:text-2xl font-semibold mx-1" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-white p-5 rounded-2xl w-full md:w-2/3 lg:w-2/3">
                    <div className="flex justify-around items-center">
                      <div>
                        <MdOutlineRemoveShoppingCart className="text-9xl text-gray-500 " />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-700">
                          <span className="font-bold tracking-wider">
                            No..! Items Available
                          </span>
                          <br /> Please Add items to carts...!
                        </p>
                        <div className="flex mt-5 justify-center"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="hidden md:hidden lg:block sticky top-[50px]  p-10 bg-white ml-10 h-56 rounded-2xl shadow-md">
                <p className="text-md font-semibold mt-2 tracking-wider">
                  Subtotal{" "}
                  <span className="font-bold text-black text-lg tracking-wider">
                    {"₹" + parseInt(subtotal)}
                  </span>{" "}
                  <span className="text-xs text-gray-700 ">
                    ({totalItems} Items)
                  </span>
                </p>
                <div className="flex gap-2">
                  <BsFillCheckCircleFill className="text-sm text-[#027100] w-5 mt-2" />
                  <div className="text-sm text-black tracking-wider">
                    Your order is eligible for FREE Delivery. Select this option
                    at checkout. Details.
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    type="submit"
                    className="p-2 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                    onClick={handleGoAddress}
                    disabled={cartData.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Container className="my-5">
            <RecentlyVisited2 ProductsPerView={5} />
          </Container>
        </div>
      )}
    </>
  );
};

export default Cart;
