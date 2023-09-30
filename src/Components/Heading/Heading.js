import React from "react";

const Heading = ({ Heading, spanHeading, className }) => {
  return (
    <p className="text-xl md:text-2xl text-center text-gray-800 tracking-wider">
      {Heading}{" "}
      <span
        className={`text-xl md:text-2xl font-extrabold text-gray-800 ${className}`}
      >
        {spanHeading}
      </span>
    </p>
  );
};

export default Heading;
