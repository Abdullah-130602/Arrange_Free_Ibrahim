import React from "react";
import Heading from "../Heading/Heading";
import ProductCard from "./ProductCard";
// import Divider from "../../Components/Divider/Divider";
import Container from "../../Container/Container";

const CardData = [
  {
    img: "/images/topSelling/001.png",
    name: "Elegent Office Sofa",
    price: "50000",
    slug:"sffdsdf3435345&567"
  },
  {
    img: "/images/topSelling/002.png",
    name: "3 Seater Leather Sofa",
    price: "90000",
    slug:"sffdsdf3435345&567"
  },
  {
    img: "/images/topSelling/003.png",
    name: "Gray Modular Sofa",
    price: "69000",
    slug:"sffdsdf3435345&567"
  },
  {
    img: "/images/topSelling/004.png",
    name: "2 seater Fabric Sofa",
    price: "65000",
    slug:"sffdsdf3435345&567"
  },
  {
    img: "/images/topSelling/005.png",
    name: "Off-White Fabric Sofa",
    price: "84000",
    slug:"sffdsdf3435345&567"
  },
  {
    img: "/images/topSelling/006.png",
    name: "Elegent Leather Sofa",
    price: "78000",
    slug:"sffdsdf3435345&567"
  },
];

const TopSellingCard = ({ BreadcrumbTitle }) => {
  return (
    <Container>
      {/* <Divider /> */}
      <Heading Heading="Top Sellings" />
      <div className="mt-5 md:mt-5 lg:mt-5 xl:mt-5 px-0 md:px-5 lg:px-10 xl:px-40 ">
        <ProductCard
          CardData={CardData}
          BreadcrumbTitle={BreadcrumbTitle}
          ImageClassName="w-full object-cover h-[250px] md:h-auto lg:h-auto xl:h-auto transition-transform duration-700 transform-gpu hover:scale-105"
          ComponentClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 md:gap-5 lg:gap-5 xl:gap-5"
        />
      </div>
    </Container>
  );
};

export default TopSellingCard;
