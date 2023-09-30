import React from "react";
import "./Catlog.css";
import { Link } from "react-router-dom";

const Catlog = () => {
  return (
    <div className="my-5 xl:my-10 bg-[#FFF] rounded-xl flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center">
      {/* First Flex */}
      <div className="w-full md:w-full lg:w-1/2 p-4 flex flex-col gap-2">
        <h1 className="font-extrabold font-sans text-3xl md:text-2xl xl:text-6xl 2xl:text-9xl tracking-wide text-[#392c27]">
          MODERN <br className="hidden md:hidden lg:block" /> FURNITURE <br />
        </h1>
        <span className="your-heading font-extrabold font-sans text-4xl md:text-2xl xl:text-6xl tracking-wide 2xl:text-8xl">
          COLLECTION
        </span>
        <p className="font-semibold p-1">
        Explore our carefully curated modern furniture collection designed to elevate your living spaces. Discover a blend of sleek designs, premium materials, and timeless craftsmanship that perfectly balances aesthetics and functionality.
        </p>
        <div className="flex mt-5">
          <Link to="/arrange-free-catlogue" className="p-2 bg-white text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-[#FFE342] uppercase w-auto px-5 shadow-md">
            Check Now
          </Link>
        </div>
      </div>
      {/* Second Flex */}
      <div className="w-full md:w-full lg:w-1/2">
        <img src="/catlog.jpg" alt="" className="rounded-r-xl" />
      </div>
    </div>
  );
};

export default Catlog;
