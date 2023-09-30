import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`flex justify-center ${className} bg-white`}>
      <div className="w-full md:w-full lg:w-full xl:w-full 2xl:w-[85%]">
        {children}
      </div>
    </div>
  );
};

export default Container;
