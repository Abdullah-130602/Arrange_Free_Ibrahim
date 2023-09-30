import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { SwiperSlide, Swiper } from "swiper/react";

const RoundedCategoryCard = ({ data }) => {
  const swiperConfig = {
    slidesPerView: getSlidesPerView(),
    // Other Swiper configuration options
  };

  // Calculate the number of slides to display based on viewport width
  function getSlidesPerView() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth >= 768) {
      // iPad view or larger
      return 5;
    } else if (viewportWidth <= 768) {
      // Other views
      return 4.5;
    }
  }

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const getData = async () => {
  //     var requestOptions = {
  //       method: "GET",
  //       redirect: "follow",
  //     };

  //     await fetch(
  //       process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
  //         "admin/getHomeZoneAppliances",
  //       requestOptions
  //     )
  //       .then((response) => response.json())
  //       .then((result) => {
  //         // console.warn(result);
  //         setData(result.data);
  //       })
  //       .catch((error) => console.log("error", error));
  //   };

  //   getData();
  // }, []);

  return (
    <div className="block md:block lg:hidden xl:hidden">
      <Swiper
        {...swiperConfig}
        // slidesPerView={3.2}
        spaceBetween={10}
        freeMode={true}
        //   pagination={{
        //     clickable: true,
        //   }}
        modules={[FreeMode, Pagination]}
        className="mySwiper mb-1"
      >
        {data.map((el, i) => {
          return (
            <SwiperSlide style={{ width: 100 }} key={i}>
              <Link
                to={{
                  pathname: `/sub-category/${el.slug}`,
                  search: `?description=${JSON.stringify(
                    el.description
                  )}&features=${JSON.stringify(el.features)}`,
                }}
              >
                <div className="flex flex-col items-center py-1">
                  {/* <img
                    src={process.env.REACT_APP_HAPS_MEDIA_BASE_URL + el.image}
                    alt=""
                    className="w-16 rounded-full h-16 object-cover"
                  /> */}
                  <p className="w-24 my-0.5 text-center text-[12px] tracking-wide font-bold">
                    {el.title
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default RoundedCategoryCard;
