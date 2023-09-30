import React from "react";
import Heading from "../../../Components/Heading/Heading";

const CategoryFeatures = ({ CartegoryFeature }) => {
  return (
    <div>
      <Heading Heading="Features" />
      <div className="flex flex-wrap justify-center gap-2 mt-3">
        <div className="grid grid-cols-4 gap-1 overflow-scroll">
          {CartegoryFeature.map((el, i) => {
            return (
              <div
                className="border-double border-2 border-black rounded bg-white shadow-lg"
                key={i}
              >
                <p className="p-2 text-center font-serif">{el}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFeatures;
