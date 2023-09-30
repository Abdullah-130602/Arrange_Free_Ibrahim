import React from "react";

const CarousalCard = ({ CarousalCardData }) => {
  return (
    <img
      src={CarousalCardData.img}
      alt=""
      className="h-[50%]  rounded-2xl object-cover"
    />
  );
};

export default CarousalCard;
