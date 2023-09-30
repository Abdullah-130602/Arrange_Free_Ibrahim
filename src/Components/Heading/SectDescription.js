import React from "react";

const SectDescription = ({ SectDescription }) => {
  return (
    <div className="flex justify-center">
      <p className="text-md md:text-xl lg:text-xl xl:text-xl text-center font-[400] mb- w-full md:w-[60%] capitalize tracking-wide my-1">
        {SectDescription}
      </p>
    </div>
  );
};

export default SectDescription;
