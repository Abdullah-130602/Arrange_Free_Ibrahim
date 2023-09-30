import React from "react";
import Heading from "../../../Components/Heading/Heading";
import SectDescription from "../../../Components/Heading/SectDescription";
import Container from "../../Container";

const RecentlyVisited = () => {
  return (
    <div className="my-10">
      <Heading spanHeading="Products that uplift your home decor." />
      <SectDescription SectDescription="Elevate your home decor with our enchanting accents, adding a touch of magic and allure to every corner." />
      <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row items-center gap-2 my-5">
        <div className="w-full md:w-full lg:w-1/2 flex flex-col gap-1 h-full">
          <div>
            <img src="/01.jpg" className="h-[248px] w-full object-cover rounded-xl"  />
          </div>
          <div>
            <img src="/01.jpg" className="h-[248px] w-full object-cover rounded-xl" />
          </div>
        </div>
        <div className="w-full md:w-full lg:w-1/2 grid grid-cols-1 gap-2 md:gap-2 lg:gap-5 xl:gap-5">
          <img
            src="/01.jpg"
            alt=""
            className="h-[500px] w-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default RecentlyVisited;
