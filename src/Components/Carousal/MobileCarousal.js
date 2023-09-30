import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Skeleton } from "antd";
import { GiSofa } from "react-icons/gi";

const Carousal = ({ SubCategoryBanners, SwiperClassName, SkeletonLoad }) => {
  const skeletonArray = Array.from({ length: 1 }, (_, index) => index);
  return (
    <div className="flex md:flex lg:flex xl:flex gap-3 px-3 md:px-20 lg:px-20 xl:px-10">
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {SkeletonLoad ? (
            <div className="mt-5">
              {skeletonArray.map((index) => (
                <div key={index}>
                  <Skeleton.Node
                    active={true}
                    style={{ height: "50vh", width: "100vw" }}
                  >
                    <GiSofa style={{ fontSize: 300, color: "#bfbfbf" }} />
                  </Skeleton.Node>
                </div>
              ))}
            </div>
          ) : (
            SubCategoryBanners.map((el, i) => {
              if (el.device === "2") {
                return (
                  <SwiperSlide key={i}>
                    <img
                      src={process.env.REACT_APP_HAPS_MEDIA_BASE_URL + el.path}
                      alt=""
                    />
                  </SwiperSlide>
                );
              } else {
                return null;
              }
            })
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousal;
