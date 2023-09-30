import React from "react";
import { Link } from "react-router-dom";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { SwiperSlide, Swiper } from "swiper/react";

const RoundedCard = ({ CartegoryCardData }) => {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={15}
      freeMode={true}
      //   pagination={{
      //     clickable: true,
      //   }}
      modules={[FreeMode, Pagination]}
      className="mySwiper"
    >
      {CartegoryCardData.map((el, i) => {
        return (
          <SwiperSlide style={{ width: 100 }} key={i}>
            <Link
              to={`/category/sofa`}
              className="flex flex-col gap-1 items-center"
            >
              <img
                src={el.img}
                alt=""
                className="w-20 rounded-full h-20 object-cover"
              />
              <figcaption className="text-xs font-semibold overflow-ellipsis whitespace-nowrap">
                {el.label}
              </figcaption>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default RoundedCard;
