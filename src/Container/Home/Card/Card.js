import React from "react";
import { Link } from "react-router-dom";
// import { CATEGORY_PAGE } from "../../Settings/Constant";

const Card = ({ data, ImageClassName }) => {
  return (
    <Link to={`/sub-category/${data.slug}`} className="">
      <img
        src={process.env.REACT_APP_HAPS_MEDIA_BASE_URL + data.image}
        alt="Not Avialable"
        className={`rounded-xl ${ImageClassName} transition-transform duration-700 hover:scale-105 w-[110px] h-[110px] md:w-[140px] md:h-[140px] object-contain`}
      />
      <figcaption className="font-bold text-center pt-0 md:pt-1 text-xs md:text-md lg:text-md xl:text-md">
        {data.title === null ? "" : data.title}
      </figcaption>
    </Link>
  );
};

export default Card;
