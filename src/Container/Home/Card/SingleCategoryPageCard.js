import React from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const SingleCategoryPageCard = ({ CategoryCardName, onClick }) => {
  return (
    <Link to="/product-list/:slug" className="mt-10 flex flex-wrap justify-center gap-4">
      {CategoryCardName.map((el, i) => {
        return (
          <div
            className="border-black cursor-pointer border md:border-2 lg:border-2 xl:border-2 rounded-lg hover:bg-black hover:text-white transition-all ease-in-out duration-500"
            key={i}
          >
            <p className="p-1 md:p-2 lg:p-2 xl:p-2 text-sm md:text-md lg:text-md xl:text-md font-semibold">
              {el}
            </p>
          </div>
        );
      })}
    </Link>
  );
};

export default SingleCategoryPageCard;
