import React, { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { AiTwotoneStar } from "react-icons/ai";
import { TbBrandAbstract, TbShoppingCartDiscount } from "react-icons/tb";
import { Link } from "react-router-dom";

const PriceArray = [
  "10k - 30k",
  "30k - 50k",
  "50k - 1 Lakh",
  "1 Lakh - 2 Lakh",
];

const Filter = ({ BrandName, setBrand, Brand, setPrice, SubCategoryName }) => {
  const [Rating, setRating] = useState("");
  const [Offer, setOffer] = useState("");

  const handleBrandChange = (value) => {
    // Check if the value is already selected
    if (Brand.includes(value)) {
      // If it is selected, remove it from the array
      setBrand(Brand.filter((brand) => brand !== value));
    } else {
      // If it is not selected, add it to the array
      setBrand([...Brand, value]);
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl border relative">
      <p className="text-2xl font-semibold font-serif pt-5 mx-5 flex items-center justify-between bg-white">
        <span>Filters</span>
        <span>
          <BiFilterAlt className="text-gray-500" />
        </span>
      </p>
      <hr className="mt-3 mx-7" />
      <form className="mt-4 border-gray-200 px-3">
        <h3 className="sr-only">Categories</h3>
        <ul role="list" className="px-2 py-3 font-medium text-gray-900">
          {SubCategoryName &&
            SubCategoryName.map((el, i) => {
              return (
                <li key={i}>
                  <Link to={`/category/${el.slug}`} className="block px-2 py-2">
                    {el.title}
                  </Link>
                </li>
              );
            })}
        </ul>
        {/* <div className="border-t border-gray-200 px-4 py-6">
          <h3 className="-mx-2 -my-3 flow-root">
            
            <button
              type="button"
              className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
              aria-controls="filter-section-mobile-0"
              aria-expanded="false"
            >
              <span className="flex items-center gap-2">
                <span className="font-medium text-gray-900">
                  <FaRupeeSign />
                </span>
                <span className="font-medium text-gray-900">Price</span>
              </span>
            </button>
          </h3>
          
          <div
            className="pt-2 error-message transition-all duration-500 ease-in-out"
            id="filter-section-mobile-0"
          >
            <div className="space-y-2">
              {PriceArray.map((el, i) => {
                return (
                  <div className="flex items-center" key={i}>
                    <input
                      id={el}
                      name="price"
                      type="radio"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      value={el}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <label
                      htmlFor={el}
                      className="ml-3 min-w-0 flex-1 text-gray-500"
                    >
                      {el}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-6">
          <h3 className="-mx-2 -my-3 flow-root">
            
            <button
              type="button"
              className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
              aria-controls="filter-section-mobile-1"
              aria-expanded="false"
            >
              <span className="flex items-center gap-2">
                <span className="font-medium text-gray-900">
                  <AiTwotoneStar />
                </span>
                <span className="font-medium text-gray-900">Rating</span>
              </span>
            </button>
          </h3>
          
          <div
            className="pt-2 error-message transition-all duration-500 ease-in-out"
            id="filter-section-mobile-1"
          >
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="filter-mobile-category-0"
                  name="Rating"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  value="5"
                  onChange={(e) => setRating(e.target.value)}
                />
                <label
                  htmlFor="filter-mobile-category-0"
                  className="ml-3 min-w-0 flex-1 text-gray-500"
                >
                  5 Star
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="filter-mobile-category-1"
                  name="Rating"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  value="4"
                  onChange={(e) => setRating(e.target.value)}
                />
                <label
                  htmlFor="filter-mobile-category-1"
                  className="ml-3 min-w-0 flex-1 text-gray-500"
                >
                  4 Star
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="filter-mobile-category-2"
                  name="Rating"
                  type="checkbox"
                  value="3"
                  onChange={(e) => setRating(e.target.value)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="filter-mobile-category-2"
                  className="ml-3 min-w-0 flex-1 text-gray-500"
                >
                  3 Star
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="filter-mobile-category-3"
                  name="Rating"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  value="2"
                  onChange={(e) => setRating(e.target.value)}
                />
                <label
                  htmlFor="filter-mobile-category-3"
                  className="ml-3 min-w-0 flex-1 text-gray-500"
                >
                  2 Star
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="filter-mobile-category-4"
                  name="Rating"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  value="1"
                  onChange={(e) => setRating(e.target.value)}
                />
                <label
                  htmlFor="filter-mobile-category-4"
                  className="ml-3 min-w-0 flex-1 text-gray-500"
                >
                  1 Star
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-6">
          <h3 className="-mx-2 -my-3 flow-root">
            
            <button
              type="button"
              className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
              aria-controls="filter-section-mobile-2"
              aria-expanded="false"
            >
              <span className="flex items-center gap-2">
                <span className="font-medium text-gray-900">
                  <TbShoppingCartDiscount />
                </span>
                <span className="font-medium text-gray-900">Offer</span>
              </span>
            </button>
          </h3>
          
          <div
            className="pt-2 error-message transition-all duration-500 ease-in-out"
            id="filter-section-mobile-2"
          >
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="filter-mobile-size-0"
                  name="offer"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  value="10"
                  onChange={(e) => setOffer(e.target.value)}
                />
                <label
                  htmlFor="filter-mobile-size-0"
                  className="ml-3 min-w-0 flex-1 text-gray-500"
                >
                  10% Off
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="filter-mobile-size-1"
                  name="offer"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  value="20"
                  onChange={(e) => setOffer(e.target.value)}
                />
                <label
                  htmlFor="filter-mobile-size-1"
                  className="ml-3 min-w-0 flex-1 text-gray-500"
                >
                  20% Off
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="filter-mobile-size-2"
                  name="offer"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  value="30"
                  onChange={(e) => setOffer(e.target.value)}
                />
                <label
                  htmlFor="filter-mobile-size-2"
                  className="ml-3 min-w-0 flex-1 text-gray-500"
                >
                  30% Off
                </label>
              </div>
            </div>
          </div>
        </div> */}
        <div className="border-t border-gray-200 px-4 py-6">
          <h3 className="-mx-2 -my-3 flow-root">
            <button
              type="button"
              className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
              aria-controls="filter-section-mobile-2"
              aria-expanded="false"
            >
              <span className="flex items-center gap-2">
                <span className="font-medium text-gray-900">
                  <TbBrandAbstract />
                </span>
                <span className="font-medium text-gray-900">Brand</span>
              </span>
            </button>
          </h3>

          <div
            className="pt-2 error-message transition-all duration-500 ease-in-out"
            id="filter-section-mobile-2"
          >
            <div className="space-y-2">
              {BrandName.map((el, i) => {
                return (
                  <div className="flex items-center" key={i}>
                    <input
                      id={el.name}
                      name="Brand"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                      value={el.id}
                      onChange={(e) =>
                        handleBrandChange(parseInt(e.target.value))
                      }
                    />
                    <label
                      htmlFor={el.name}
                      className="ml-3 min-w-0 flex-1 text-gray-500"
                    >
                      {el.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* {Brand && (
          <div className="w-full p-2">
            <button className="text-lg p-2 bg-black text-white transition-all ease-in-out duration-500 rounded-2xl w-full hover:text-black border border-black hover:bg-white">
              Apply
            </button>
          </div>
        )} */}
      </form>
    </div>
  );
};

export default Filter;
