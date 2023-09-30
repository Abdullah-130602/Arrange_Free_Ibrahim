import React from "react";
import Carousal from "./Carousal";
import MobileCarousal from "./MobileCarousal";

const CategoryPageCarousal = ({ SubCategoryBanners, SkeletonLoad }) => {
  return (
    <div className="error-message">
      <div className="hidden md:block lg:block xl:block mt-1">
        <div className="flex justify-center gap-3 px-3 md:px-20 lg:px-20 xl:px-10">
          <Carousal
            SubCategoryBanners={SubCategoryBanners}
            SkeletonLoad={SkeletonLoad}
            SwiperClassName="w-full"
          />
        </div>
      </div>
      <div className="block md:hidden lg:hidden xl:hidden">
        <MobileCarousal
          SubCategoryBanners={SubCategoryBanners}
          SkeletonLoad={SkeletonLoad}
        />
      </div>
    </div>
  );
};

export default CategoryPageCarousal;
