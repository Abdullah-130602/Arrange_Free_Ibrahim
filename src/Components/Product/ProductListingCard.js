import { Skeleton } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import Heart from "react-heart";
import { AiFillStar } from "react-icons/ai";
import { GiSofa } from "react-icons/gi";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./ProductListingCard.css";

const ProductListingCard = ({
  ProductCardData,
  handleDeleteWishlist,
  handleHeartClick,
  skeletonArray,
  SkeletonLoad,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener to update width on window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [arrow, setArrow] = useState("Show");
  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  const [ImageLoader, setImageLoader] = useState(true);

  const handleImageLoaded = () => {
    setImageLoader(false);
  };
  const handleImageError = () => {
    setImageLoader(false);
  };

  return (
    <>
      {SkeletonLoad ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-1 md:gap-x-1 gap-y-1 md:gap-y-8 mt-2">
          {skeletonArray.map((index) => (
            <div key={index} className="">
              <Skeleton.Node
                active={true}
                style={{ height: "200px", width: "200px" }}
              >
                <GiSofa
                  style={{ fontSize: 100, color: "#bfbfbf" }}
                  className=""
                />
              </Skeleton.Node>
              <Skeleton
                active={true}
                className="mt-2 dorfee-media-listing-card"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-1 md:gap-x-1 gap-y-1 md:gap-y-8 mt-2">
          {ProductCardData &&
            ProductCardData.map((el, i) => {
              return (
                <div
                  className="relative shadow-md rounded-2xl flex justify-center mx-1 md:mx-1 xl:mx-0"
                  key={i}
                >
                  <div>
                    <Link
                      to={`/single-product/${el.id}`}
                      target="_blank"
                      className="relative bg-white rounded-xl"
                    >
                      <div className="zoom-hover rounded-xl relative">
                        <img
                          src={
                            process.env.REACT_APP_HAPS_MEDIA_BASE_URL + el.image
                          }
                          alt="Pic Not Found"
                          // onLoad={handleImageLoaded}
                          // onError={handleImageError}
                          className="dorfee-media-listing-res rounded-xl object-cover transition-all ease-in-out duration-1000"
                        />
                      </div>
                      {/* {ImageLoader && (
                        <div className="absolute right-[45%] top-[45%]">
                          <Loader />
                        </div>
                      )} */}
                    </Link>
                    <div className="px-0.5 py-1.5 md:px-1 lg:px-1 xl:px-1 flex flex-col gap-1 dorfee-media-listing-card">
                      <div className="flex justify-between mx-1">
                        <Link
                          to={`/single-product/${el.id}`}
                          target="_blank"
                          className="font-extrabold whitespace-nowrap overflow-hidden overflow-ellipsis break-normal text-[13px] w-2/3 capitalize tracking-wider mt-0.5"
                        >
                          {el.name}
                        </Link>
                        <div className="flex gap-2 items-center">
                          <span className="flex items-center gap-0.5 p-0.5 text-sm text-gray-800 font-bold text-[12px]">
                            <AiFillStar size={16} className="text-green-600" />
                            {el.rating}
                          </span>
                        </div>
                      </div>
                      <div className="mx-1 flex justify-between items-center">
                        <p className="text-xs md:text-sm lg:text-sm xl:text-xs font-bold text-start tracking-wide">
                          By{" "}
                          <span className="text-[#027100]">
                            {el.brand_name}
                          </span>
                        </p>
                        <div className="hidden md:block lg:block xl:block">
                          <div className="flex gap-2 items-center justify-between mx-1">
                            <div className="flex gap-2 items-center">
                              <p className="font-bold text-base tracking-wide font-sans">
                                ₹ {parseInt(el.discounted_price)}
                              </p>
                              {parseInt(el.discounted_percent) === 0 ? (
                                false
                              ) : (
                                <strike className="text-gray-700 text-xs">
                                  {parseInt(el.actual_price)}/-
                                </strike>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="block md:hidden lg:hidden xl:hidden mb-0">
                        <div className="flex justify-between px-0.5">
                          <div className="flex gap-1 items-center text-xs">
                            <p className="text-xs font-semibold tracking-wide">
                              Rs {parseInt(el.discounted_price)}/-
                            </p>
                            {parseInt(el.discounted_percent) === 0 ? (
                              false
                            ) : (
                              <strike className="text-gray-700 text-xs">
                                {parseInt(el.actual_price)}/-
                              </strike>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-0.5 absolute top-2 right-2 md:right-4">
                      <Heart
                        isActive={el.is_wishlist === 1 ? true : false}
                        onClick={() =>
                          el.is_wishlist === 1
                            ? handleDeleteWishlist(el)
                            : handleHeartClick(el.id)
                        }
                        animationScale={1.25}
                        style={{ width: 20 }}
                        className={`${
                          el.is_wishlist === 1 ? "animate-bounce" : ""
                        }`}
                      />
                    </div>
                    {parseInt(el.discounted_percent) === 0 ? (
                      false
                    ) : (
                      <div className="absolute top-[4.5px] bg-white rounded-br-lg">
                        <div className="p-1 px-1.5 flex items-center">
                          <img src="/percent.png" alt="" className="w-[12px]" />
                          <p className="text-green-500 font-bold text-xs">
                            {parseInt(el.discounted_percent)}% Off
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default ProductListingCard;
