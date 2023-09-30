import React, { useRef } from "react";
import Heading from "../../../Components/Heading/Heading";
import SectDescription from "../../../Components/Heading/SectDescription";
import { useState } from "react";
import { useEffect } from "react";
import Heart from "react-heart";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const RecentlyVisited2 = () => {
  const RecentlyVisitedRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    });

    if (RecentlyVisitedRef.current) {
      observer.observe(RecentlyVisitedRef.current);
    }

    return () => {
      if (RecentlyVisitedRef.current) {
        observer.unobserve(RecentlyVisitedRef.current);
      }
    };
  }, []);
  const [data, setData] = useState([]);

  const getRecentVisitedProduct = async () => {
    var myHeaders = new Headers();
    myHeaders.append("token", localStorage.getItem("token"));
    myHeaders.append("Cookie", "ci_session=mnvbss2rsj2t4l0n5bt0ak23huch6719");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "customer/getRecentView",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getRecentVisitedProduct();
  }, []);

  const swiperConfig = {
    slidesPerView: getSlidesPerView(),
    // Other Swiper configuration options
  };

  // Calculate the number of slides to display based on viewport width
  function getSlidesPerView() {
    const viewportWidth = window.innerWidth;
    if (viewportWidth >= 390) {
      return 1.1;
    } else if (viewportWidth >= 581) {
      return 1.6;
    }
    // if (viewportWidth >= 768) {
    //   // iPad view or larger
    //   return 5.2;
    // } else if (viewportWidth <= 768) {
    //   // Other views
    //   return 1.1;
    // }
  }

  const slideContainerWidths = {
    mobile: '100%',           // 1 card per slide
    ipad: '49.25%',           // Approximately 2 cards per slide
    desktop: '24.75%',        // Approximately 4 cards per slide
  };

  const itemsPerPage = {
    mobile: 1,
    ipad: 2,
    desktop: 4,
  };

  return (
    <>
      <div
        className="my-5 md:my-5 lg:my-10 xl:my-10 mx-2 md:mx-10 lg:mx-20 xl:mx-20"
        ref={RecentlyVisitedRef}
      >
        {isIntersecting && (
          <>
            <Heading Heading="Recently Visited" />
            <SectDescription SectDescription="Step into the future with our extraordinary new launch: Redefining excellence in design and innovation" />
            <div className="bg-white py-1 flex justify-center md:justify-start lg:justify-center xl:justify-center flex-wrap gap-2 md:gap-2 lg:gap-4 xl:gap-5">
              <Splide
                options={{
                  rewind: true,
                  breakpoints: {
                    390: {
                      perPage: itemsPerPage.mobile,
                    },
                    590: {
                      perPage: itemsPerPage.mobile,
                    },
                    768: {
                      perPage: itemsPerPage.ipad,
                    },
                    1200: {
                      perPage: itemsPerPage.desktop,
                    },
                    1400: {
                      perPage: itemsPerPage.desktop,
                    },
                    2400: {
                      perPage: itemsPerPage.desktop,
                    },
                    3400: {
                      perPage: itemsPerPage.desktop,
                    },
                  },
                }}
              >
                {data &&
                  data.map((el, i) => {
                    return (
                      <SplideSlide className="py-10" key={i}>
                        <div
                          to={`/single-product/${el.id}`}
                          className="mobile-listintg-card relative mx-1 flex flex-col p-1 m-0 cursor-pointer shadow-xl transition-all ease-in-out duration-500 border-t"
                        >
                          <Link
                            to={`/single-product/${el.id}`}
                            className="relative w-[262px] h-[262px] sm:w-[293px] sm:h-[293px] md:w-[298px] md:h-[298px] mobile-listintg-card"
                          >
                            <img
                              src={
                                process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
                                el.image
                              }
                              alt="Pic Not Found"
                              className="max-w-[262px] max-h-[262px] sm:max-w-[293px] sm:max-h-[293px] md:max-w-[298px] md:max-h-[298px] hover:scale-100 ease-in-out duration-500 hover:overflow-hidden object-cover absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]"
                            />
                          </Link>
                          <div className="px-0.5 py-1 md:px-1 lg:px-1 xl:px-1 flex flex-col gap-1 w-[262px] sm:w-[293px] md:w-[298px] mobile-listintg-card border-t">
                            <div className="flex justify-between mx-1">
                              <Link
                                to={`/single-product/${el.id}`}
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
                                <img
                                  src="/percent.png"
                                  alt=""
                                  className="w-[12px]"
                                />
                                <p className="text-black font-bold text-xs">
                                  {parseInt(el.discounted_percent)}% Off
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </SplideSlide>
                    );
                  })}
              </Splide>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RecentlyVisited2;
