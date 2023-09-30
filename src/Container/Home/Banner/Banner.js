import React from "react";

const Banner = ({ bannerImage, children, className }) => {
  return (
    <div className={`${className} error-message`}>
      <div className="relative hidden md:hidden lg:block xl:block">
        <img
          src={
            bannerImage &&
            process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
              bannerImage.offer_web_path
          }
          alt=""
          className="w-full h-auto rounded-xl"
        />
        {children}
      </div>
      <div className="relative block md:block lg:hidden xl:hidden">
        <img
          src={
            bannerImage &&
            process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
              bannerImage.offer_mobile_path
          }
          alt=""
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Banner;
