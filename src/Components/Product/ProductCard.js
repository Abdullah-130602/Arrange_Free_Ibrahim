import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({
  CardData,
  ImageClassName,
  ComponentClassName,
  BreadcrumbTitle,
}) => {
  return (
    <div className={`${ComponentClassName}`}>
      {CardData.map((el, i) => {
        return (
          <Link
            to={{ pathname: `/product-list/:slug`, state: "Sofa Set" }}
            className="flex flex-col"
            key={i}
          >
            <div className="relative">
              <img
                src={el.img}
                alt="Not Avialable"
                className={`rounded-2xl ${ImageClassName}`}
              />
              <div className="absolute top-0">
                <p className="bg-orange-500 text-white text-xs px-1 rounded-md font-semibold">Best Seller</p>
              </div>
            </div>
            <figcaption className="font-bold text-center pt-1 text-xs md:text-md lg:text-md xl:text-md">
              {el.name}
            </figcaption>
            <figcaption className="font-bold text-center pt-1 text-xs md:text-md lg:text-md xl:text-md">
              ${el.price}/-
            </figcaption>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductCard;
