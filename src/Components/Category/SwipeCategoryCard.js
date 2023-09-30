import React from "react";
import Container from "../../Container/Container";
import RoundedCard from "../../Container/Home/Card/RoundedCard";

const CartegoryCardData = [
  { img: "8.png", label: "Sofa Sets" },
  { img: "2.png", label: "Beds" },
  { img: "3.png", label: "Dining Table Sets" },
  { img: "2.png", label: "Sofa Cum Beds" },
  { img: "5.png", label: "TV Units" },
  { img: "8.png", label: "Book Shelves" },
  { img: "2.png", label: "Coffee Tables" },
  { img: "8.png", label: "Study Tables" },
  { img: "2.png", label: "Home Decor" },
  { img: "3.png", label: "Home Furninshing" },
];

const SwipeCategoryCard = () => {
  return (
    <Container className="p-5 block md:hidden lg:hidden xl:hidden">
      <RoundedCard CartegoryCardData={CartegoryCardData} />
    </Container>
  );
};

export default SwipeCategoryCard;
