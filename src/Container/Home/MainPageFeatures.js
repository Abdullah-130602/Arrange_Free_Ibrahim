import React from "react";
import { GoRocket } from "react-icons/go";
import Heading from "../../Components/Heading/Heading";
import { BsArrowRepeat, BsGift } from "react-icons/bs";
import { MdPayment } from "react-icons/md";

const MainPageFeatures = () => {
  return (
    <div className="my-10 p-4 md:p-4 lg:p-10 grid grid-cols-1 md:grid-cols-4 gap-y-3 border rounded-2xl mx-2 xl:mx-0">
      <div className="flex justify-start md:justify-center md:border-r">
        <div className="flex items-center gap-4 md:gap-5">
          <GoRocket className="text-[#FCB800] text-[30px] md:text-[50px]" />
          <div>
            <h1 className="text-base md:text-2xl text-start md:text-center text-gray-800 tracking-wider">
              Same Day Delivery
            </h1>
            <p className="text-xs md:text-base text-start md:text-center">
              Within 24 hrs of order
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-start md:justify-center md:border-r">
        <div className="flex items-center gap-4 md:gap-5">
          <BsArrowRepeat className="text-[#FCB800] text-[30px] md:text-[50px]" />
          <div>
            <br />
            <h1 className="text-base md:text-2xl text-start md:text-center text-gray-800 tracking-wider">
              90 Days Return
            </h1>
            <p className="text-xs md:text-base text-center">
              If goods have problems
              <br className="hidden md:block" />
              <span className="text-sm">*(T&C Applied)</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-start md:justify-center md:border-r">
        <div className="flex items-center gap-4 md:gap-5">
          <MdPayment className="text-[#FCB800] text-[30px] md:text-[50px]" />
          <div>
            <h1 className="text-base md:text-2xl text-start md:text-center text-gray-800 tracking-wider">
              Secure Payment
            </h1>
            <p className="text-xs md:text-base text-start md:text-center">
              100% secure payment
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-start md:justify-center">
        <div className="flex items-center gap-4 md:gap-5">
          <BsGift className="text-[#FCB800] text-[30px] md:text-[50px]" />
          <div>
            <h1 className="text-base md:text-2xl text-start md:text-center text-gray-800 tracking-wider">
              Easy EMI
            </h1>
            <p className="text-xs md:text-base text-center">
              Easy EMI options available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageFeatures;
