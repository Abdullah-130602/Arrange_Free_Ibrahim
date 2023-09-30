import React from "react";
// import Heart from "react-heart";
import { AiFillStar } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import Loader from "../../../Components/Loader/Loader";
import Container from "../../Container";
import { GiSofa } from "react-icons/gi";
import { Skeleton } from "antd";

const WishListCardData = ({
  contextHolder,
  ProductCardData,
  handleDeleteWishlist,
  skeletonArray,
  SkeletonLoad,
}) => {
  let Navigate = useNavigate();

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-1 md:gap-x-4 gap-y-1 md:gap-y-4 mt-2 my-10 relative">
          {contextHolder}
          {ProductCardData.length > 0 ? (
            ProductCardData.map((el, i) => {
              return (
                <div
                  className="relative shadow-md rounded-lg lg:rounded-2xl flex justify-center mx-1 md:mx-1 xl:mx-0"
                  key={i}
                >
                  <div>
                    <div className="relative showBar">
                      <Link
                        to={`/single-product/${el.product_id}`}
                        className="relative bg-white rounded-xl"
                      >
                        <div className="zoom-hover rounded-xl relative">
                          <img
                            src={
                              process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
                              el.image
                            }
                            alt="Pic Not Found"
                            className={`dorfee-media-res rounded-xl object-cover transition-all ease-in-out duration-1000`}
                          />
                        </div>
                      </Link>
                      <div className="hidden md:hidden lg:block">
                        <div className="absolute bottom-0 z-[100] rounded-xl w-full bg-[rgba(255,255,255,0.7)] visibleProductBar animate-bar">
                          <div className="flex justify-around p-1">
                            <button
                              className="font-semibold text-sm tracking-wide hover:underline hover:text-red-500"
                              onClick={() => handleDeleteWishlist(el.id)}
                            >
                              Remove From Wishlist
                            </button>
                            <button className="font-semibold text-sm tracking-wide hover:text-[#027100]">
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-0.5 py-1.5 md:px-1 lg:px-1 xl:px-1 flex flex-col gap-1 dorfee-media-card">
                      <div className="flex justify-between mx-1">
                        <Link
                          to={`/single-product/${el.product_id}`}
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
                          <div className="">
                            <RiDeleteBin6Line
                              onClick={() => handleDeleteWishlist(el.id)}
                            />
                          </div>
                        </div>
                      </div>
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
            })
          ) : (
            <div className="flex justify-center h-[316px] w-full">
              <div className="text-center flex flex-col gap-5 absolute top-[30%] right-0 md:right-[23%]">
                <p className="font-bold text-[#027100] tracking-wider font-serif text-xl">
                  Your wishlist is empty.....!
                </p>
                <p className="font-semibold text-gray-700 tracking-wider text-center">
                  Fill your wishlist with exciting possibilities and discover
                  the perfect items that inspire and fulfill your desires.
                </p>
                <Button
                  btnText="Continue Shopping"
                  className="p-2 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                  onClick={() => Navigate("/")}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default WishListCardData;
