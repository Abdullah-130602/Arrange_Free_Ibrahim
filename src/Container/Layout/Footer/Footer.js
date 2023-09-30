import React from "react";
import { Link } from "react-router-dom";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import { useState } from "react";

const Footer = ({ isLogin, setIsLogin, setLoginModal }) => {
  const [showLogin, setShowLogin] = useState(true);
  const whatsAppUrl = "https://www.dorfee.com";
  const WhatsApptitle = "Check out this cool website!";

  return (
    <div className="w-full">
      <div className="bg-black text-white pb-5 lg:pb-0 xl:pb-0">
        <div className="text-white mx-auto max-w-screen-2xl px-4 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 lg:py-5 justify-between">
            <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
                Company
              </h3>
              <ul className="text-sm flex flex-col space-y-3">
                <li className="flex items-baseline">
                  <Link to="/about-us">
                    <p className="text-gray-100 inline-block w-full hover:text-[#FFE342]">
                      About Us
                    </p>
                  </Link>
                </li>
                <li className="flex items-baseline">
                  <Link to="/contact-us">
                    <p className="text-gray-100 inline-block w-full hover:text-[#FFE342]">
                      Contact us
                    </p>
                  </Link>
                </li>
                <li className="flex items-baseline">
                  <Link to="/privacy-policy">
                    <p className="text-gray-100 inline-block w-full hover:text-[#FFE342]">
                      Privacy Policy
                    </p>
                  </Link>
                </li>
                <li className="flex items-baseline">
                  <Link to="/shipping-policy">
                    <p className="text-gray-100 inline-block w-full hover:text-[#FFE342]">
                      Shipping Policy
                    </p>
                  </Link>
                </li>
                <li className="flex items-baseline">
                  <Link to="/terms-and-condition">
                    <p className="text-gray-100 inline-block w-full hover:text-[#FFE342]">
                      Terms & Conditions
                    </p>
                  </Link>
                </li>
                <li className="flex items-baseline">
                  <Link to="/Sales-Service-Task-Force">
                    <p className="inline-block w-full font-semibold tracking-widest text-[#FFE342]">
                      After Sales Service Task Force
                    </p>
                  </Link>
                </li>
                {/* <li className="flex items-baseline">
                  <Link to="/blog">
                  <p className="text-gray-100 inline-block w-full hover:text-[#FFE342]">
                    Blog
                  </p>
                  </Link>
                </li> */}
              </ul>
            </div>
            {/* <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
                Top Category
              </h3>
            </div> */}
            <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
                My Account
              </h3>
              <ul className="text-sm lg:text-15px flex flex-col space-y-3">
                <li className="flex items-baseline">
                  {/* <Link to="/"> */}
                  {isLogin ? (
                    <Link
                      to="/dashboard"
                      className="text-gray-100 inline-block w-full hover:text-[#FFE342]"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <div
                      onClick={() => setLoginModal(true)}
                      className="text-gray-100 inline-block w-full hover:text-[#FFE342] cursor-pointer"
                    >
                      Dashboard
                    </div>
                  )}
                  {/* </Link> */}
                </li>
                <li className="flex items-baseline">
                  {isLogin ? (
                    <Link
                      to="/recent-orders"
                      className="text-gray-100 inline-block w-full hover:text-[#FFE342]"
                    >
                      Recent Orders
                    </Link>
                  ) : (
                    <div
                      onClick={() => setLoginModal(true)}
                      className="text-gray-100 inline-block w-full hover:text-[#FFE342] cursor-pointer"
                    >
                      Recent Orders
                    </div>
                  )}
                </li>
                <li className="flex items-baseline">
                  <Link to="/blogs">
                    <p className="text-gray-100 inline-block w-full hover:text-[#FFE342]">
                      Blogs
                    </p>
                  </Link>
                </li>
                <li className="flex items-baseline">
                  <Link to="/get-quote">
                    <p className="text-gray-100 inline-block w-full hover:text-[#FFE342]">
                      Get Quote
                    </p>
                  </Link>
                </li>
                <li className="flex items-baseline">
                  <Link to="/arrange-free-home+interior+services">
                    <p className="text-gray-100 inline-block w-full hover:text-[#FFE342]">
                      Home Interior Services
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
              <img src={"/logo.png"} alt="logo" className="h-20" />
              <p className="leading-7 text-sm text-gray-100 mt-3">
                <span>
                  724, Clover Hills, <br /> NIBM, Pune - 411048 India
                </span>
                <br />
                <span>Phone: (+91) 98340 09243</span>
                <br />
                {/* <span>Email: ccruidk@test.com</span> */}
              </p>
            </div>
          </div>
          <div className="text-center hidden lg:block md:block">
            <p className="text-white text-base leading-7 font-medium block">
              Call Us :
            </p>
            <h5 className="text-2xl font-bold text-white leading-7">
              (+91) 93718 85000
            </h5>
          </div>
        </div>

        <hr className="hr-line hidden"></hr>

        <div className="mx-auto w-full-2xl px-4 sm:px-10 bg-black">
          <div className="flex py-4 items-center justify-center">
            <div className="col-span-1 pl-2">
              <ul className="text-sm flex">
                {/* <li className="flex items-center mr-3 transition ease-in-out duration-500">
                  <Link to="https://www.facebook.com">
                    <p
                      aria-label="Social Link"
                      rel="noreferrer"
                      target="_blank"
                      className="block text-center mx-auto text-gray-500 hover:text-white"
                    >
                      <FacebookIcon size={34} round />                                                                                                                                                                   
                    </p>
                  </Link>
                </li>
                <li className="flex items-center  mr-3 transition ease-in-out duration-500">
                  <Link to="https://twitter.com">
                    <p
                      aria-label="Social Link"
                      rel="noreferrer"
                      target="_blank"
                      className="block text-center mx-auto text-gray-500 hover:text-white"
                    >
                      <TwitterIcon size={34} round />
                    </p>
                  </Link>
                </li>
                <li className="flex items-center mr-3 transition ease-in-out duration-500">
                  <Link to="https://www.pinterest.com">
                    <p
                      aria-label="Social Link"
                      rel="noreferrer"
                      target="_blank"
                      className="block text-center mx-auto text-gray-500 hover:text-white"
                    >
                      <PinterestIcon size={34} round />
                    </p>
                  </Link>
                </li>
                <li className="flex items-center  mr-3 transition ease-in-out duration-500">
                  <Link to="https://www.linkedin.com">
                    <p
                      aria-label="Social Link"
                      rel="noreferrer"
                      target="_blank"
                      className="block text-center mx-auto text-gray-500 hover:text-white"
                    >
                      <LinkedinIcon size={34} round />
                    </p>
                  </Link>
                </li> */}
                <li className="flex items-center  mr-3 transition ease-in-out duration-500">
                  <WhatsappShareButton url={whatsAppUrl} title={WhatsApptitle}>
                    <p
                      aria-label="Social Link"
                      rel="noreferrer"
                      target="_blank"
                      className="block text-center mx-auto text-gray-500 hover:text-white"
                    >
                      <WhatsappIcon size={34} round />
                    </p>
                  </WhatsappShareButton>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10 flex justify-center pb-0.5">
          <h2 className="text-sm text-gray-100 leading-6">
            Copyright 2023 @
            <Link to="/">
              <span
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFE342]"
              >
                arrangefree
              </span>
            </Link>
            , All rights reserved.
          </h2>
        </div>
        {/* <div className="mx-auto max-w-screen-2xl px-3 sm:px-10 flex justify-center pb-16 md:pb-2">
          <p className="text-sm">
            This website is operated by{" "}
            <span className="text-[#FFE342]">Haps Pro India pvt ltd.</span>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
