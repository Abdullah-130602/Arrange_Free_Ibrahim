import React from "react";
import Heading from "../../../Components/Heading/Heading";
// import SectDescription from "../../../Components/Heading/SectDescription";
import Card from "../Card/Card";
import { Skeleton } from "antd";
import { GiSofa } from "react-icons/gi";

const CategoryCards = ({
  className,
  data,
  skeletonArray,
  SkeletonLoad,
  linkTo,
}) => {
  return (
    <div className="flex justify-center items-center gap-10 my-5 px-2 md:px-3 2xl:px-0">
      <div className={`${className}`}>
        {SkeletonLoad ? (
          <>
            {skeletonArray.map((index) => (
              <div key={index} className="flex justify-center relative">
                <Skeleton.Avatar
                  active={true}
                  style={{ height: 130, width: 130 }}
                  shape={"circle"}
                />
                <GiSofa
                  className="absolute top-6"
                  style={{ fontSize: 80, color: "#bfbfbf" }}
                />
              </div>
            ))}
          </>
        ) : (
          data.map((el, i) => {
            return (
              <div key={i} className="">
                <Card data={el} linkTo={linkTo} ImageClassName="" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategoryCards;
