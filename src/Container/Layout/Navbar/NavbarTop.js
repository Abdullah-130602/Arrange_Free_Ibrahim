import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdArrowDropright } from "react-icons/io";
import { BsTruck } from "react-icons/bs";
import { ConfigProvider, Drawer, Dropdown, Modal } from "antd";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { TbPackage } from "react-icons/tb";
import { RiUserSharedFill } from "react-icons/ri";
import { FiArrowUpLeft, FiPower } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { GoPrimitiveDot } from "react-icons/go";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { FcSalesPerformance } from "react-icons/fc";
import { FaCrown } from "react-icons/fa";

const NavbarTop = ({
  isLogin,
  setIsLogin,
  cartCount,
  wishlistCount,
  setLoginModal,
}) => {
  const [open, setOpen] = useState(false);
  const divRef = useRef(null);
  let Navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState([]);

  const getAllCategory = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "admin/getHomeZoneAppliances",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllCategory();
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        // Handle click outside logic here
        setSearchMenu(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // const [loginModal, setLoginModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleRegister = () => {
    setShowLogin(false);
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  let customerName = localStorage.getItem("CN");

  const handleLogout = () => {
    localStorage.removeItem("CID");
    localStorage.removeItem("CN");
    localStorage.removeItem("token");
    localStorage.removeItem("rzp_device_id");
    localStorage.removeItem("rzp_checkout_anon_id");
    localStorage.removeItem("rzp_checkout_user_id");
    setIsLogin(false);
    setTimeout(() => {
      Navigate("/");
    }, 1000);
  };

  const items = [
    {
      key: "1",
      label: (
        <Link
          to="/update-profile"
          className="p-1 flex items-center gap-3 font-semibold text-black"
        >
          <ImProfile />
          Your Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          to="/recent-orders"
          className="p-1 flex items-center gap-3 font-semibold text-black"
        >
          <TbPackage />
          Your Orders
        </Link>
      ),
    },
    {
      key: "4",
      danger: true,
      label: (
        <button className="p-1 flex items-center gap-3" onClick={handleLogout}>
          <RiUserSharedFill className="text-black" size={20} />
          <p className="text-sm font-semibold text-md">Logout</p>
        </button>
      ),
    },
  ];
  const [searchValue, setSearchValue] = useState("");
  const [SearchMenu, setSearchMenu] = useState(false);

  // const GoToSearchPage = (e) => {
  //   e.preventDefault();
  //   Navigate(`/search/${searchValue}`);
  // };

  const [ProductsResult, setProductsResult] = useState([]);
  const [CategoryResult, setCategoryResult] = useState([]);
  const [SubCategoryResult, setSubCategoryResult] = useState([]);
  const [maxIndex, setMaxIndex] = useState();

  const handleOnChange = async (e) => {
    setSearchValue(e.target.value);
    var value = e.target.value;
    if (value.length > 0) {
      setSearchMenu(true);
    }
    if (value.length === 1) {
      setSearchMenu(false);
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      search: searchValue,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "product/getSearchAll",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setProductsResult(result.products);
        setCategoryResult(result.homeZoneAppliances);
        setSubCategoryResult(result.homeZoneCategory);
        setMaxIndex(result.products.length);
      })
      .catch((error) => console.log("error", error));
  };

  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
      } else if (event.key === "ArrowUp") {
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
      } else if (event.key === "Enter") {
        if (selectedIndex >= 0) {
          // Handle item selection and search here
          const selectedResult = CategoryResult[selectedIndex]; // Update with your data source
          setSearchValue(selectedResult.title);
          // Perform the search or navigation action here
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, maxIndex]);

  const [SubscriptionModal, setSubscriptionModal] = useState(false);

  const customTheme = {
    css: {
      token: {
        colorBgBase:
          "linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
      },
    },
  };
  const SubsData = [
    {
      title: "50% credit all the products and services.",
      desc: "At Arrange Free, we're excited to offer a generous 50% credit on all our products and services. Here's how this fantastic offer works",
    },
    {
      title: "Interior designer for your home Design anything any time.",
      desc: "At Arrange Free, we believe in making your experience as convenient as possible, which is why we offer complimentary home visit services. Here's how our free home visit services can benefit you",
    },
    {
      title:
        "Pay 50% and get 50% on EMI base all the products and interior services.",
    },
    {
      title: "Home visit free services.",
    },
    {
      title: "Annual maintenance services on single call.",
    },
    {
      title: "Deep cleaning services.",
    },
    {
      title: "Delivery and assembly free.",
    },
    {
      title: "Curtains Cleaning Services.",
    },
    {
      title: "Customise services.",
    },
    {
      title: "VIP access.",
    },
    {
      title: "Fast delivery.",
    },
  ];

  return (
    <nav className="relative bg-white">
      <div className="mx-2 md:mx-2 lg:mx-2 xl:mx-4 2xl:mx-14">
        <div className="py-1 md:py-3 grid grid-cols-6 items-center gap-4">
          {/* Logo */}
          <div className="col-start-1 col-span-5 md:col-span-2 lg:col-span-2">
            {/* <Link
              to=""
              className="navName text-2xl md:text-2xl lg:text-2xl xl:lg:text-3xl font-serif font-[500] uppercase mt-2"
              onClick={() => window.scroll(0, 0)}
            >
              arrange free
            </Link> */}
            <Link
              to="/"
              className="relative md:absolute lg:absolute top-1 flex items-start gap-2"
            >
              <img
                src="/green-logo.png"
                className="w-[150px] h-[56px] md:w-40 md:h-[60px]"
              />
              <span className="text-green-700 text-2xl font-semibold">
                आरेंज&nbsp;फ्री
              </span>
            </Link>
          </div>
          {/* Search */}
          <div className="hidden md:hidden lg:block col-start-4 col-span-3">
            <form
              className="w-full relative"
              // onSubmit={GoToSearchPage}
            >
              <div>
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <button className="absolute inset-y-0 right-3 flex items-center pl-3 ">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    id="default-search"
                    className="block w-full p-2 pl-3 text-sm text-[#027100] font-semibold border border-gray-500 rounded-lg md:rounded-lg lg:rounded-2xl xl:rounded-2xl bg-gray-50 focus:outline-none"
                    placeholder="Search Sofa, Rug, Center Table..."
                    value={searchValue}
                    onChange={handleOnChange}
                    // onBlur={() => setSearchMenu(false)}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
              {SearchMenu && (
                <div
                  className="absolute z-[999999] top-10 w-full shadow-2xl error-message"
                  ref={divRef}
                >
                  <div className="bg-white h-96 rounded-2xl border-t border-gray-200 overflow-scroll">
                    <div className="p-2 text-sm flex flex-col gap-0.5">
                      {CategoryResult &&
                        CategoryResult.map((el, i) => {
                          return (
                            <button
                              onClick={() => {
                                setSearchValue(
                                  el.title
                                    .toLowerCase()
                                    .split(" ")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                    )
                                    .join(" ")
                                );
                                Navigate(`/sub-category/${el.slug}`);
                                setSearchMenu(false);
                              }}
                              className={`${
                                selectedIndex === i ? "bg-gray-200" : ""
                              } flex items-center justify-between`}
                              key={i}
                            >
                              <div className="flex items-center gap-2 md:gap-4 rounded-md p-2 hover:bg-gray-200 transition-all ease-in-out duration-500 cursor-pointer w-full">
                                <svg
                                  aria-hidden="true"
                                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                  />
                                </svg>
                                <div>
                                  <p className="font-bold tracking-wide capitalize text-sm text-start">
                                    {el.title
                                      .toLowerCase()
                                      .split(" ")
                                      .map(
                                        (word) =>
                                          word.charAt(0).toUpperCase() +
                                          word.slice(1)
                                      )
                                      .join(" ")}
                                  </p>
                                  <p className="text-xs text-gray-600 font-semibold">
                                    In Category
                                  </p>
                                </div>
                              </div>
                              <button onClick={() => setSearchValue("el.name")}>
                                <FiArrowUpLeft
                                  size={25}
                                  className="text-gray-500 mr-1"
                                />
                              </button>
                            </button>
                          );
                        })}
                      {CategoryResult && <hr className="mx-2" />}
                      {SubCategoryResult &&
                        SubCategoryResult.map((el, i) => {
                          return (
                            <button
                              onClick={() => {
                                setSearchValue(
                                  el.title
                                    .toLowerCase()
                                    .split(" ")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                    )
                                    .join(" ")
                                );
                                Navigate(`/category/${el.slug}`);
                                setSearchMenu(false);
                              }}
                              className="flex items-center justify-between"
                              key={i}
                            >
                              <div className="flex items-center gap-2 md:gap-4 rounded-md p-2 hover:bg-gray-200 transition-all ease-in-out duration-500 cursor-pointer w-full">
                                <svg
                                  aria-hidden="true"
                                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                  />
                                </svg>
                                <div>
                                  <p className="font-bold tracking-wide capitalize text-sm text-start">
                                    {el.title
                                      .toLowerCase()
                                      .split(" ")
                                      .map(
                                        (word) =>
                                          word.charAt(0).toUpperCase() +
                                          word.slice(1)
                                      )
                                      .join(" ")}
                                  </p>
                                  <p className="text-xs text-gray-600 font-semibold text-start">
                                    In{" "}
                                    {el.category_title
                                      .toLowerCase()
                                      .split(" ")
                                      .map(
                                        (word) =>
                                          word.charAt(0).toUpperCase() +
                                          word.slice(1)
                                      )
                                      .join(" ")}
                                  </p>
                                </div>
                              </div>
                              <button onClick={() => setSearchValue("el.name")}>
                                <FiArrowUpLeft
                                  size={25}
                                  className="text-gray-500 mr-1"
                                />
                              </button>
                            </button>
                          );
                        })}
                      {SubCategoryResult && <hr className="mx-2" />}
                      {ProductsResult &&
                        ProductsResult.slice(0, 5).map((el, i) => {
                          return (
                            <button
                              onClick={() => {
                                setSearchValue(el.name);
                                setSearchMenu(false);
                                Navigate(`/single-product/${el.id}`);
                              }}
                              className="flex items-center justify-between"
                              key={i}
                            >
                              <div className="flex items-center gap-2 md:gap-4 rounded-md p-2 hover:bg-gray-200 transition-all ease-in-out duration-500 cursor-pointer w-full">
                                <img
                                  src={
                                    process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
                                    el.image
                                  }
                                  className="w-8 h-8 object-cover rounded-md"
                                  alt="Image Not Found"
                                />
                                <div>
                                  <p className="font-bold tracking-wide">
                                    {el.name}
                                  </p>
                                  <p className="text-xs text-gray-600 font-semibold text-start">
                                    View product
                                  </p>
                                </div>
                              </div>
                              <button>
                                <FiArrowUpLeft
                                  size={25}
                                  className="text-gray-500 mr-1"
                                />
                              </button>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
          {/* Right Links */}
          <div className="hidden md:block lg:block xl:block col col-start-7">
            <div className="flex justify-end gap-2 ml-2 items-center">
              <Link
                to="/arrange-free-gold-membership"
                className="flex gap-1 p-2 items-center relative text-xs font-semibold text-[#000] tracking-widest rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
                }}
              >
                <span>
                  <FaCrown />
                </span>
                Gold Membership
              </Link>
              <Link
                to="/Sales-Service-Task-Force"
                className="flex flex-col items-center relative border-b-2 border-[#ffe342]"
              >
                <FcSalesPerformance size={25} className="text-[#027100]" />
                <p className="text-xs font-semibold text-[#000] tracking-widest">
                  {/* After Sale Services Support */}
                  Services Support
                </p>
              </Link>
              <Link
                to="/arrange-free-home+interior+services"
                className="flex flex-col items-center relative border-b-2 border-[#ffe342]"
              >
                <HiOutlineWrenchScrewdriver
                  size={25}
                  className="text-[#027100]"
                />
                <p className="text-xs font-semibold text-[#000] tracking-widest">
                  Interior Services
                </p>
              </Link>
              <Link
                to="/track-your-order"
                className="flex flex-col items-center relative border-b-2 border-[#ffe342]"
              >
                <BsTruck className="text-[#027100]" size={25} />
                <figcaption className="text-xs font-semibold text-[#000] tracking-widest text-center">
                  Track Order
                </figcaption>
              </Link>
              {isLogin === true ? (
                <Link
                  to="/cart"
                  className="flex flex-col items-center relative border-b-2 border-[#ffe342]"
                >
                  <AiOutlineShoppingCart className="text-gray-600" size={25} />
                  <GoPrimitiveDot
                    className="text-red-600 absolute left-2.5 -top-[7px]"
                    size={25}
                  />
                  <p className="text-[10px] font-semibold absolute text-white right-[3px] -top-0.5">
                    {cartCount}
                  </p>
                  <figcaption className="text-xs font-semibold text-black tracking-widest text-center">
                    cart
                  </figcaption>
                </Link>
              ) : (
                <button
                  onClick={() => setLoginModal(true)}
                  className="flex flex-col items-center"
                >
                  <AiOutlineShoppingCart className="text-gray-600" size={25} />
                  <figcaption className="text-xs font-semibold text-black tracking-widest text-center">
                    cart
                  </figcaption>
                </button>
              )}
              {isLogin === true ? (
                <Link
                  to="/wishlist"
                  className="flex flex-col items-center relative border-b-2 border-[#ffe342]"
                >
                  <AiOutlineHeart className="text-gray-600" size={25} />
                  <GoPrimitiveDot
                    className="text-red-600 absolute right-1 -top-[7px]"
                    size={25}
                  />
                  <p className="text-[10px] font-semibold absolute text-white right-[12.5px] -top-0.5">
                    {wishlistCount}
                  </p>
                  <figcaption className="text-xs font-semibold text-black tracking-widest">
                    wishlist
                  </figcaption>
                </Link>
              ) : (
                <button
                  onClick={() => setLoginModal(true)}
                  className="flex flex-col items-center"
                >
                  <AiOutlineHeart className="text-gray-600" size={25} />
                  <figcaption className="text-xs font-semibold text-black tracking-widest">
                    wishlist
                  </figcaption>
                </button>
              )}
              {isLogin === true ? (
                <div className="flex items-center gap-3">
                  <Dropdown
                    menu={{
                      items,
                    }}
                    className="cursor-pointer border-b-2 border-[#ffe342]"
                    placement="bottom"
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <div className="text-sm flex flex-col items-center relative">
                        <div className="w-7 h-7 rounded-full text-white bg-[#FFE342]" />
                        <p className="text-[20px] font-bold text-center absolute top-1 text-[#027100]">
                          {customerName.length > 0
                            ? customerName.slice(0, 1)
                            : "P"}
                        </p>
                        <figcaption className="text-xs font-semibold text-center text-black tracking-widest">
                          profile
                        </figcaption>
                      </div>
                    </a>
                  </Dropdown>
                  {/* </Link> */}
                </div>
              ) : (
                <button
                  onClick={() => setLoginModal(true)}
                  className="flex flex-col items-center"
                >
                  <CgProfile className="text-gray-600" size={25} />
                  <figcaption className="text-xs font-semibold text-center text-black tracking-widest">
                    profile
                  </figcaption>
                </button>
              )}
            </div>
          </div>
          {/* Hamburger Menu */}
          <div className="block md:block lg:hidden xl:hidden">
            <div className="flex justify-end">
              <button onClick={showDrawer}>
                <GiHamburgerMenu size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        title={<div className="drawer-title">Arrange Free</div>}
        placement="right"
        onClose={onClose}
        open={open}
        width={300}
      >
        <div>
          {data &&
            data.map((el, i) => {
              return (
                <div key={i}>
                  <button
                    onClick={() => {
                      Navigate(`/sub-category/${el.slug}`);
                      setOpen(false);
                    }}
                    className="py-2 flex justify-between items-center cursor-pointer hover:bg-gray-100 w-full"
                  >
                    <img
                      src={process.env.REACT_APP_HAPS_MEDIA_BASE_URL + el.image}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <li className="font-semibold text-sm text-black list-none">
                      {el.title}
                    </li>
                    <IoMdArrowDropright />
                  </button>
                  <hr className="border-t-[0.5px] border-black" />
                </div>
              );
            })}
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <button
            onClick={() => {
              Navigate("/update-profile");
              setOpen(false);
            }}
            className="text-sm text-start flex items-center gap-2 font-semibold text-black tracking-widest"
          >
            <ImProfile size={20} className="text-[#027100]" />
            <p>Profile</p>
          </button>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <button
            onClick={() => {
              Navigate("/recent-orders");
              setOpen(false);
            }}
            className="text-sm text-start flex items-center gap-2 font-semibold text-black tracking-widest"
          >
            <TbPackage size={20} className="text-[#027100]" />
            <p>My Orders</p>
          </button>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <button
            onClick={() => {
              Navigate("/arrange-free-home+interior+services");
              setOpen(false);
            }}
            className="text-sm text-start flex items-center gap-2 font-semibold text-black tracking-widest"
          >
            <HiOutlineWrenchScrewdriver size={20} className="text-[#027100]" />
            <p>Interior Services</p>
          </button>
        </div>
        <div className="mt-5 flex flex-col gap-2 mb-10">
          <button
            onClick={() => {
              Navigate("/Sales-Service-Task-Force");
              setOpen(false);
            }}
            className="text-sm text-start flex items-center gap-2 font-semibold text-black tracking-widest"
          >
            <FcSalesPerformance size={20} />
            <p>After Sales Task Force</p>
          </button>
        </div>
        <div className="fixed bottom-0 w-full">
          <button className="p-2 bg-slate-100 w-[250px] flex justify-center items-center gap-2 text-base font-semibold">
            <FiPower size={20} className="text-red-600" />
            Logout
          </button>
        </div>
      </Drawer>
      {/* <ConfigProvider theme={customTheme}>
        <Modal
          open={SubscriptionModal}
          onCancel={() => setSubscriptionModal(false)}
          footer={null}
          wrapClassName="reservation_modal"
          closable={false}
          width={1000}
        >
          <div
            style={{
              background:
                "linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
            }}
            className="pb-5"
          >
            <p className="text-[30px] text-white text-center font-serif font-thin ">
              Arrange Free Membership
            </p>
            <p
              style={{
                backgroundImage:
                  "linear-gradient(to right,#462523 0,#cb9b51 22%, #f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#462523 100%)",
                color: "transparent",
                WebkitBackgroundClip: "text",
              }}
              className="uppercase text-[60px] text-center  font-bold "
            >
              gold
            </p>
            <p className="uppercase text-lg text-center font-bold text-white">
              Gold Benifits
            </p>
            <div className="rounded-xl w-auto mx-5  grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {SubsData &&
                SubsData.map((el, index) => {
                  return (
                    <div
                      className="cursor-pointer bg-white rounded-lg m-3 text-center py-2 px-2 font-semibold hover:scale-110 ease-in-out duration-500 hover:shadow-2xl transition"
                      key={index}
                    >
                      <span
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, #462523,#e0c94f ,#462523)",
                          color: "transparent",
                          WebkitBackgroundClip: "text",
                        }}
                      >
                        {el.title}
                      </span>
                    </div>
                  );
                })}
            </div>
            <div className="flex justify-center items-center mt-5">
              <button className="py-2 bg-white text-lg rounded-md w-[40%] font-semibold hover:scale-[1.05] hover:shadow-2xl transition">
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #462523,#e0c94f ,#462523)",
                    color: "transparent",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  Buy Now
                </span>
              </button>
            </div>
            <p
              className="text-center text-white mt-2 cursor-pointer text-lg"
              // onClick={() => navigate("/subscription-terms-and-condition")}
            >
              Terms & Conditions
            </p>
          </div>
        </Modal>
      </ConfigProvider> */}
    </nav>
  );
};

export default NavbarTop;
