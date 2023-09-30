import React, { useEffect } from "react";
import Heading from "../../../Components/Heading/Heading";
// import SectDescription from "../../../Components/Heading/SectDescription";
import Card from "../Card/Card";
import { Skeleton } from "antd";
import { GiSofa } from "react-icons/gi";
import { ImCheckboxChecked } from "react-icons/im";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const CategoryCards = ({
  className,
  data,
  SubCategorySkeletonArray,
  SkeletonLoad,
  SelectedSubCategoryData,
  getAllProducts,
  setSubCategoryName,
}) => {
  return (
    <div className="flex justify-center items-center gap-10 px-0 md:px-40 lg:px-64">
      {SkeletonLoad ? (
        <div className={`${className} my-10`}>
          {SubCategorySkeletonArray.map((index) => (
            <div key={index} className="flex justify-center relative">
              <Skeleton.Avatar
                active={true}
                style={{ height: 160, width: 160 }}
                shape={"circle"}
              />
            </div>
          ))}
        </div>
      ) : (
        <Swiper
          // slidesPerView={3}
          // spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            350: {
              slidesPerView: data.length <= 2 ? data.length : 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: data.length <= 2 ? data.length : 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: data.length <= 3 ? data.length : 3,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: data.length <= 4 ? data.length : 4,
              spaceBetween: 10,
            },
            1804: {
              slidesPerView: data.length <= 5 ? data.length : 5,
              spaceBetween: 10,
            },
          }}
        >
          {data.map((el, i) => (
            <SwiperSlide
              key={i}
              className="w-1/2 bg-[#FFF] rounded-lg my-2 md:my-0 md:mt-7 mx-2"
            >
              <div className="flex flex-col justify-center my-2">
                {/* <Link target="_blank" to={`/category/${el.slug}`} className=""> */}
                <div className="flex flex-col justify-center">
                  <div className={`flex justify-center`}>
                    <div className="relative cursor-pointer">
                      <img
                        src={
                          process.env.REACT_APP_HAPS_MEDIA_BASE_URL + el.image
                        }
                        alt="Not Available"
                        onClick={() => {
                          getAllProducts(el.slug);
                          setSubCategoryName({
                            name: el.title,
                            slug: el.slug,
                          });
                        }}
                        className={`rounded-[100%] transition-transform ease-in-out duration-700 w-[100px] h-[100px] md:w-[120px] md:h-[120px] ${
                          SelectedSubCategoryData === el.slug
                            ? "border-8 border-[#027100] rounded-full transition-all ease-in-out error-message duration-700 flex"
                            : ""
                        }`}
                      />
                      <div
                        className={`absolute top-2 right-2 ${
                          SelectedSubCategoryData === el.slug
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        <ImCheckboxChecked
                          size={24}
                          className="bg-[#027100] text-[#ffe342] rounded-full border-2 border-[#027100]"
                        />
                      </div>
                    </div>
                  </div>
                  <figcaption
                    className={`${
                      SelectedSubCategoryData === el.slug
                        ? "text-[#027100]"
                        : "text-[#000]"
                    } font-bold text-center pt-1 text-xs md:text-sm capitalize`}
                  >
                    {el.title === null
                      ? ""
                      : el.title
                          .toLowerCase()
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                  </figcaption>
                </div>
                {/* </Link> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default CategoryCards;
