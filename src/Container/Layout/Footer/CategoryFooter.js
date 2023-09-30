import React, { useEffect, useState } from "react";
import Container from "../../Container";
import Heading from "../../../Components/Heading/Heading";
import { Link } from "react-router-dom";

const CategoryFooter = ({ Category }) => {
  // const [Category, setCategory] = useState([]);

  // const getOurProducts = async () => {
  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   await fetch(
  //     "https://main-backend.hapspro.com/admin/getHomeZoneAppliances",
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //       setCategory(result.data);
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  // useEffect(() => {
  //   getOurProducts();
  // }, []);

  return (
    <div className="my-10">
      <h1 className="text-4xl font-bold text-center">Our Products</h1>
      {Category &&
        Category.map((el, i) => {
          return (
            <div key={i}>
              <Link
                to={`/sub-category/${el.slug}`}
                className="text-xl md:text-2xl font-extrabold text-gray-800 hover:underline"
              >
                # {el.title}
              </Link>
              <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-8 gap-x-[10px] md:gap-x-[50px] gap-y-1 md:gap-y-4 cursor-pointer my-4">
                {el.category.map((subCat) => {
                  return (
                    <Link
                      to={`/category/${subCat.slug}`}
                      className=""
                      key={subCat.id}
                    >
                      <img
                        src={
                          process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
                          subCat.image
                        }
                        alt="Not Avialable"
                        className={`rounded-xl transition-transform duration-700 hover:scale-105 w-[110px] h-[110px] md:w-[140px] md:h-[140px] object-contain`}
                      />
                      <p className="font-bold text-center pt-0 md:pt-1 text-xs md:text-md lg:text-md xl:text-md">
                        {subCat.title === null ? "" : subCat.title}
                        Sofa
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CategoryFooter;
