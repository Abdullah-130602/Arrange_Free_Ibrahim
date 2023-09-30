import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import { FaTruck } from "react-icons/fa";

const MobileFooter = ({
  isLogin,
  setIsLogin,
  cartCount,
  wishlistCount,
  setLoginModal,
}) => {
  const [showLogin, setShowLogin] = useState(true);

  const handleRegister = () => {
    setShowLogin(false);
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  let customerName = localStorage.getItem("CN");

  return (
    <div>
      <div className="flex flex-col h-full justify-between align-middle bg-black rounded cursor-pointer overflow-y-scroll flex-grow scrollbar-hide w-full"></div>
      <div className="lg:hidden bg-black fixed z-30 bottom-0 flex items-center justify-between w-full h-16 px-5 sm:px-10">
        <Link
          to="/track-your-order"
          className="flex flex-col items-center relative"
        >
          <FaTruck className="text-[#fff]" size={25} />
          {/* <figcaption className="text-xs font-semibold text-[#000] tracking-widest text-center">
            Track Order
          </figcaption> */}
        </Link>
        {isLogin ? (
          <div className="relative">
            <Link
              to="/cart"
              aria-label="Bar"
              className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
            >
              <FaShoppingCart className="text-white w-6 h-6 drop-shadow-xl" />
            </Link>
            <GoPrimitiveDot
              className="text-red-600 absolute left-2.5 -top-[9px]"
              size={25}
            />
            <p className="text-[10px] font-semibold absolute text-white right-[0px] -top-1">
              {cartCount}
            </p>
          </div>
        ) : (
          <button
            onClick={() => setLoginModal(true)}
            aria-label="Bar"
            className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
          >
            <FaShoppingCart className="text-white w-6 h-6 drop-shadow-xl" />
          </button>
        )}
        {isLogin ? (
          <Link to="/wishlist" className="relative">
            <p
              className="text-xl text-white"
              rel="noreferrer"
              aria-label="Home"
            >
              <FaHeart className="text-white" size={23} />
            </p>
            <GoPrimitiveDot
              className="text-red-600 absolute left-2.5 -top-[7px]"
              size={25}
            />
            <p className="text-[10px] font-semibold absolute text-white -right-[2px] -top-0.5">
              {wishlistCount}
            </p>
          </Link>
        ) : (
          <button
            onClick={() => setLoginModal(true)}
            aria-label="Bar"
            className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
          >
            <FaHeart className="text-white" size={23} />{" "}
          </button>
        )}

        {/* <Link to="" className="relative">
          <FaShoppingBag className="text-white font-bold" size={30} />
          <div className="absolute bottom-1 left-2.5">
            <GoPrimitiveDot className="text-red-600 font-bold" size={30} />
            <p className="text-white absolute top-[6.5px] left-[11.8px] text-[11px]">
              1
            </p>
          </div>
        </Link> */}
        {isLogin ? (
          <Link
            to="/dashboard"
            className="text-white text-[35px] mb-2 font-bold uppercase"
          >
            {customerName.length > 0 ? customerName.slice(0, 1) : "P"}
          </Link>
        ) : (
          <button
            onClick={() => setLoginModal(true)}
            className="bg-black rounded-full p-2"
          >
            <FaUser className="text-white" size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileFooter;
