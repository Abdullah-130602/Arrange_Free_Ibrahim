import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoGridOutline,
  IoListOutline,
  IoLockOpenOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi";
import Loader from "../../../Components/Loader/Loader";
import { UserContext } from "../../../Context/UserContext";

const Dashboard = ({ children }) => {
  const { setIsLogin } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let Navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", loading);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [loading]);

  const handleLogout = () => {
    setLoading(true);
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

  const url = window.location.href;

  return (
    <div>
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
        <div className="max-w-screen-2xl px-3 sm:px-10">
          <div className="py-8 lg:py-10 flex flex-col lg:flex-row w-full">
            <div className="flex-shrink-0 w-full lg:w-80 mr-7 lg:mr-10  xl:mr-10 ">
              <div className="bg-white p-3 sm:p-4 lg:p-6 sticky top-32 border-r h-full border-gray-200">
                {/* <span className="p-2 my-2 flex font-serif items-center rounded-md w-full text-gray-600 hover:text-black">
                  <IoGridOutline
                    className="flex-shrink-0 h-4 w-4"
                    aria-hidden="true"
                  />
                  <Link to="/dashboard">
                    <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full text-gray-600 hover:text-black font-sans">
                      Dashboard
                    </p>
                  </Link>
                </span> */}
                <div
                  className={`${
                    url.includes("orders")
                      ? "bg-[#ffe342] text-[#027100]"
                      : "text-gray-600 hover:text-black"
                  } p-2 my-2 flex items-center rounded-md w-full text-gray-600 hover:text-black`}
                >
                  <IoListOutline
                    className={`${
                      url.includes("orders")
                        ? "text-[#027100]"
                        : "text-gray-600 hover:text-black"
                    } flex-shrink-0 h-4 w-4 md:w-5 md:h-5`}
                    aria-hidden="true"
                  />
                  <Link to="/recent-orders">
                    <p
                      className={`${
                        url.includes("orders")
                          ? "text-[#027100]"
                          : "text-gray-600 hover:text-black"
                      } inline-flex items-center justify-between ml-2 text-sm md:text-base lg:text-lg font-semibold tracking-wide w-full `}
                    >
                      My Orders
                    </p>
                  </Link>
                </div>
                <span
                  className={`${
                    url.includes("profile")
                      ? "bg-[#ffe342] text-[#027100]"
                      : "text-gray-600 hover:text-black"
                  } p-2 my-2 flex items-center rounded-md w-full text-gray-600 hover:text-black`}
                >
                  <IoSettingsOutline
                    className={`${
                      url.includes("profile")
                        ? "text-[#027100]"
                        : "text-gray-600 hover:text-black"
                    } flex-shrink-0 h-4 w-4 md:w-5 md:h-5`}
                    aria-hidden="true"
                  />
                  <Link to="/update-profile">
                    <p
                      className={`${
                        url.includes("profile")
                          ? "text-[#027100]"
                          : "text-gray-600 hover:text-black"
                      } inline-flex items-center justify-between ml-2 text-sm md:text-base lg:text-lg font-semibold tracking-wide w-full `}
                    >
                      Update Profile
                    </p>
                  </Link>
                </span>
                <span className="p-2 flex items-center rounded-md w-full text-gray-600 hover:text-black">
                  <span className="mr-2">
                    <IoLockOpenOutline className="flex-shrink-0 h-4 w-4 md:w-5 md:h-5" />
                  </span>
                  <button
                    className="inline-flex items-center justify-between text-sm md:text-base lg:text-lg font-semibold tracking-wide w-full text-gray-600 hover:text-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </span>
              </div>
            </div>
            <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
