import React, { useRef } from "react";
import Heading from "../../../Components/Heading/Heading";
import SectDescription from "../../../Components/Heading/SectDescription";
import { useState } from "react";
import { useEffect } from "react";
import Heart from "react-heart";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GiSofa } from "react-icons/gi";
import { Skeleton } from "antd";

const BestDeal2 = ({ slug, bestDealData, skeletonForBestDealArray, SkeletonLoad }) => {
  const BestDealRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    });

    if (BestDealRef.current) {
      observer.observe(BestDealRef.current);
    }

    return () => {
      if (BestDealRef.current) {
        observer.unobserve(BestDealRef.current);
      }
    };
  }, []);

  return (
    <div className="my-5 md:my-5 lg:my-10 xl:my-10" ref={BestDealRef}>
      {isIntersecting && (
        <>
          <Heading spanHeading={`Top Bargains ${slug ? `For ${slug}` : ""}`} />
          <SectDescription SectDescription="Big savings, stylish spaces: explore 'Top Bargains' for your dream home interiors." />
          <div className="py-1 flex justify-center md:justify-start lg:justify-center xl:justify-center flex-wrap gap-2 md:gap-2 xl:gap-3 mt-2">
            {SkeletonLoad ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5 scale-110">
                {skeletonForBestDealArray.map((index) => (
                  <div key={index}>
                    <Skeleton.Node
                      active={true}
                      style={{ height: 298, width: 298 }}
                    >
                      <GiSofa style={{ fontSize: 100, color: "#bfbfbf" }} />
                    </Skeleton.Node>
                    <Skeleton active={true} className="mt-2" />
                  </div>
                ))}
              </div>
            ) : (
              bestDealData &&
              bestDealData.map((el, i) => {
                return (
                  <div
                    to={`/single-product/${el.id}`}
                    target="_blank"
                    className="mobile-listintg-card relative mx-1 flex flex-col p-1 m-0 cursor-pointer shadow-none md:shadow-none lg:shadow-md transition-all ease-in-out duration-500 border-t rounded-lg bg-white"
                    key={i}
                  >
                    <Link
                      to={`/single-product/${el.id}`}
                      target="_blank"
                      className="relative w-[262px] h-[262px] sm:w-[293px] sm:h-[293px] md:w-[298px] md:h-[298px] mobile-listintg-card bg-white"
                    >
                      <img
                        src={
                          process.env.REACT_APP_HAPS_MEDIA_BASE_URL + el.image
                        }
                        alt="Pic Not Found"
                        className="max-w-[262px] max-h-[262px] sm:max-w-[293px] sm:max-h-[293px] md:max-w-[298px] md:max-h-[298px] hover:scale-100 ease-in-out duration-500 hover:overflow-hidden object-cover absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white"
                      />
                    </Link>
                    <div className="px-0.5 py-1 md:px-1 lg:px-1 xl:px-1 flex flex-col gap-1 w-[262px] sm:w-[293px] md:w-[298px] mobile-listintg-card border-t bg-white">
                      <div className="flex justify-between mx-1">
                        <Link
                          to={`/single-product/${el.id}`}
                          target="_blank"
                          className="font-[700] whitespace-nowrap overflow-hidden overflow-ellipsis break-normal text-[13px] w-2/3 capitalize tracking-wider mt-0.5"
                        >
                          {el.name}
                        </Link>
                        {/* <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                            className="mt-0.5"
                          >
                            <Heart
                              isActive={el.is_wishlist === 1 ? true : false}
                              onClick={() =>
                                el.is_wishlist === 1
                                  ? handleDeleteWishlist(el)
                                  : handleHeartClick(el.id)
                              }
                              animationScale={1.25}
                              style={{ width: 20 }}
                            />
                          </div> */}
                      </div>

                      <div className="mx-1">
                        <p className="text-gray-700 text-xs md:text-sm lg:text-sm xl:text-xs font-bold text-start tracking-wide">
                          By {el.brand_name}
                        </p>
                        {/* <div className="w-[85%]">
                    <p className="text-gray-700 text-xs md:text-sm lg:text-sm xl:text-xs whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {el.properties}
                    </p>
                  </div> */}
                      </div>
                      <div className="hidden md:block lg:block xl:block">
                        <div className="flex gap-2 items-center justify-between mx-1">
                          <div className="flex gap-2 items-center">
                            <p className="font-semibold text-xs tracking-wide">
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
                            <div className="flex gap-2 items-center">
                              <span className="flex items-center gap-0.5 p-0.5 text-sm text-gray-800 font-bold text-[12px]">
                                <AiFillStar
                                  size={16}
                                  className="text-green-600"
                                />
                                {el.rating}
                              </span>
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
                          <div className="flex gap-2 items-center">
                            <div className="flex gap-2 items-center bg-white bg-opacity-70 backdrop-filter backdrop-blur-md rounded">
                              <span className="flex items-center gap-0.5 p-0.5 px-1 text-sm text-green-600">
                              {el.rating}
                                <AiFillStar
                                  size={16}
                                  className="mt-0.5 text-green-600"
                                />
                              </span>
                            </div>
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
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BestDeal2;
