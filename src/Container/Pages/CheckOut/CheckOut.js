import React, { useEffect, useState } from "react";
import OrderSummaryCartItem from "./OrderSummaryCartItem";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { TbMapPin } from "react-icons/tb";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import Payment from "./Payment";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import JSConfetti from "js-confetti";
import RecentlyVisited2 from "../../Home/RecentlyVisited/RecentlyVisited2";
import Container from "../../Container";

const CheckOut = () => {
  let Navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", loading);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [loading]);

  const [address, setAddress] = useState([]);
  const getCustomersAddresses = async () => {
    await setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=d7790dova0jiegd7faad8emsllk8k4bn");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        `product/customerAddressById/${localStorage.getItem("CID")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setAddress(result.customer_address);
      })
      .catch((error) => console.log("error", error));
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    getCustomersAddresses();
  }, []);

  const [AddressId, setAddressId] = useState("");
  const [AdressNotSelected, setAdressNotSelected] = useState("");

  const handleDeleteAddress = async (deleteID) => {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ci_session=0qskm3q5bt17nvjhm90puml6nr2iakt1");

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        `product/deleteCustomerAddress/${deleteID}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status === 200) {
          toast.success("Address deleted successfully", {
            theme: "light",
            autoClose: "2000",
          });
        }
      })
      .catch((error) => console.log("error", error));
    await getCustomersAddresses();
  };

  const [showAddress, setShowAddress] = useState(true);
  const [showPayment, setShowPayment] = useState(false);

  const handleNext = () => {
    if (AddressId === "") {
      setAdressNotSelected("please select pickup address");
    } else {
      setShowAddress(false);
      setShowPayment(true);
    }
  };

  // const [updateCart, setUpdateCart] = useState(false);
  const [cartData, setCartData] = useState("");
  const getCartItems = async () => {
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
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCartItems();
  }, []);

  let subtotal = 0;

  if (cartData.length > 0) {
    subtotal = cartData.reduce((acc, el) => {
      const discountedPrice =
        parseFloat(el.actual_price) -
        parseFloat(el.actual_price) * (parseFloat(el.discounted_percent) / 100);
      return acc + discountedPrice * parseInt(el.quantity);
    }, 0);
  }

  const [Coupon, setCoupon] = useState("");
  const [CouponValue, setCouponValue] = useState("");
  const [CouponNotValid, setCouponNotValid] = useState("");
  // Loader
  const [isLoading, setIsLoading] = useState(false);

  const jsConfetti = new JSConfetti();

  // const [CartAmount, setCartAmount] = useState(searchParams.get("CartAmount"));

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
        .then((result) => console.log(result))
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
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    await getCartItems();
  };

  const applyCoupon = async () => {
    setCouponNotValid("");
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem("token"));

    var raw = JSON.stringify({
      coupon_code: Coupon,
      cart_amount: subtotal,
    });
    console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "coupon/apply-coupon",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setCouponValue(result.coupon);
          jsConfetti.addConfetti();
        } else if (result.status === 404) {
          setCouponNotValid("coupon is not valid");
        } else if (result.status === 409) {
          setCouponNotValid(result.error);
        }
      })
      .catch((error) => console.log("error", error));
    setIsLoading(false);
  };

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
        <>
          <div className="p-2 md:p-2 lg:p-8 xl:p-10 flex flex-col-reverse md:flex-col-reverse lg:flex-row xl:flex-row justify-between gap-5">
            {address === undefined ? (
              <div className="w-full md:w-full lg:w-2/3 xl:w-2/3">
                <div className="p-0 md:p-0 lg:p-5 xl:p-5">
                  <div className="bg-white rounded-md">
                    <li className="text-xl font-semibold p-5 tracking-wider list-none">
                      Your Addresses
                    </li>
                    <hr className="border border-black mx-5" />
                    <p className="font-bold text-red-500 font-serif mx-5 text-sm mt-2 tracking-wider">
                      Note:
                      <span className="text-gray-900 font-semibold font-sans tracking-wider">
                        You don't have any saved Address.
                      </span>
                    </p>
                    <div className="flex justify-center items-center mt-10 relative">
                      <button
                        className="mb-10 text-gray-800 border-2 border-dashed border-[#FFE342] bg-[#FFE342] py-12 rounded-full flex justify-center p-5"
                        onClick={() => Navigate("/address")}
                      >
                        <div className="flex flex-col gap-2 items-center">
                          <BsPlusLg size={40} />
                          <p className="text-xl underline hover:text-black tracking-wider">
                            Add Address
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {showAddress && (
                  <div className="w-full md:w-full lg:w-2/3 xl:2/3 error-message">
                    <div className="w-full mt-2">
                      <div className="flex justify-between items-center">
                        <h1 className="mb-5 font-semibold text-2xl tracking-wider">
                          Checkout
                        </h1>
                      </div>
                      <hr className="border border-black" />
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-gray-900 p-3 flex gap-2 items-center tracking-wider">
                          <span>
                            <TbMapPin />
                          </span>
                          Select your address
                        </h3>
                        <div>
                          <button
                            onClick={() => Navigate("/address")}
                            className={`text-sm mr-2 hover:underline hover:text-black flex gap-2 items-center tracking-wider`}
                          >
                            Add another address
                            <AiOutlinePlus className="text-lg font-semibold mx-2 text-gray-500 hover:text-black" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {address &&
                          address.map((el, index) => {
                            return (
                              <div
                                key={index}
                                className="cursor-pointer flex items-center gap-2"
                              >
                                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border-t shadow-sm rounded-lg sm:flex">
                                  <li className="w-full flex justify-between items-center">
                                    <div className="p-2">
                                      <input
                                        id={el.id}
                                        type="radio"
                                        name="list-radio"
                                        value={el.id}
                                        defaultChecked={index === 0}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                        onChange={(e) =>
                                          setAddressId(e.target.value)
                                        }
                                      />
                                      <label
                                        htmlFor={el.id}
                                        className="py-3 ml-2 w-full"
                                      >
                                        <span className="w-full font-bold text-lg text-black cursor-pointer tracking-wider">
                                          {el.address_label}
                                        </span>
                                        <div className="flex justify-between items-center">
                                          <div className="text-gray-700 text-md">
                                            <p className="tracking-wider">
                                              {el.street_address}, {el.city},
                                              {el.country}, {el.state},
                                              {el.pincode},
                                            </p>
                                          </div>
                                        </div>
                                      </label>
                                    </div>
                                    <div className="flex items-center mt-0 md:mt-4 lg:mt-0 mx-0.5 md:mx-2">
                                      <button
                                        className="flex items-center mr-2 hover:text-black hover:underline tracking-wider p-[3px] bg-green-200 rounded-full"
                                        onClick={() =>
                                          Navigate({
                                            pathname: "/update-address",
                                            search: createSearchParams({
                                              data: JSON.stringify(el),
                                            }).toString(),
                                          })
                                        }
                                      >
                                        <RiEdit2Fill
                                          size={17}
                                          className="text-[#027100]"
                                        />
                                        {/* <span>Update</span> */}
                                      </button>
                                      <div className="p-[3px] bg-red-200 rounded-full hover:bg-white transition-all ease-in-out duration-500">
                                        <button
                                          className="flex items-center text-red-500 hover:underline tracking-wider"
                                          onClick={() =>
                                            handleDeleteAddress(el.id)
                                          }
                                        >
                                          <MdDelete size={17} />
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            );
                          })}
                      </div>
                      {AdressNotSelected && (
                        <div className="error-message text-xs p-2 rounded-lg bg-red-50 text-red-500 border border-red-500 my-2">
                          {AdressNotSelected}
                        </div>
                      )}
                      <Payment
                        AddressId={AddressId}
                        address={address}
                        CouponValue={CouponValue.coupon_code}
                      />
                    </div>
                  </div>
                )}

                {/* {showPayment && (
                  <Payment
                    setShowAddress={setShowAddress}
                    setShowPayment={setShowPayment}
                    AddressId={AddressId}
                    
                  />
                )} */}
              </>
            )}
            <OrderSummaryCartItem
              applyCoupon={applyCoupon}
              CouponValue={CouponValue}
              CouponNotValid={CouponNotValid}
              setCoupon={setCoupon}
              isLoading={isLoading}
              cartData={cartData}
              subtotal={subtotal}
              CartMinusQuantity={CartMinusQuantity}
              CartAddQuantity={CartAddQuantity}
            />
          </div>
          <Container>
            <RecentlyVisited2 ProductsPerView={5} />
          </Container>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default CheckOut;
