import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";
import Heading from "../../../Components/Heading/Heading";
import SectDescription from "../../../Components/Heading/SectDescription";

const BestDeal = () => {
  const images = [
    "/images/bed/1.jpg",
    "/images/bed/2.jpg",
    "/images/bed/3.jpg",
    "/images/bed/4.jpg",
    "/images/bed/5.jpg",
    "/images/bed/6.jpg",
  ];

  const swiperConfig = {
    slidesPerView: getSlidesPerView(),
    // Other Swiper configuration options
  };

  // Calculate the number of slides to display based on viewport width
  function getSlidesPerView() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth >= 768) {
      // iPad view or larger
      return 4;
    } else if (viewportWidth <= 768) {
      // Other views
      return 2;
    }
  }

  const [data, setData] = useState([]);

  const getBestDeals = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "general/getBestDeal",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getBestDeals();
  }, []);

  return (
    <div className="my-5 md:my-5 lg:my-10 xl:my-10">
      <Heading Heading="Best Deals" />
      <SectDescription SectDescription="Discover the best offers for your budget and satisfaction." />
      <div className="my-2 md:my-2 lg:my-5 xl:my-5">
        <Swiper
          {...swiperConfig}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          //   slidesPerView={4}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {data.map((el, index) => {
            return (
              <SwiperSlide
                key={index}
                className="my-7 md:my-5 lg:my-10 xl:my-10"
              >
                <div className="relative w-[360px] h-[360px] md:w-[580px] md:h-[580px] lg:w-[580px] lg:h-[580px] xl:w-[580px] xl:h-[580px]">
                  <img
                    src={process.env.REACT_APP_HAPS_MEDIA_BASE_URL + el.image}
                    className="max-w-[360px] max-h-[360px] md:max-w-[580px] md:max-h-[580px] lg:max-w-[580px] lg:max-h-[580px] xl:max-w-[580px] xl:max-h-[580px] absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default BestDeal;
