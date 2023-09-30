import { Drawer } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { AiTwotoneStar } from "react-icons/ai";
import { TbBrandAbstract, TbShoppingCartDiscount } from "react-icons/tb";

const MobileFilter = ({ BrandName, setBrandMob, BrandMob, getAllProducts }) => {
  const [open, setOpen] = useState(false);

  //   Filters Hooks
  const [Price, setPrice] = useState("");
  const [Rating, setRating] = useState("");
  const [Offer, setOffer] = useState("");

  const onClose = () => {
    setOpen(false);
  };

  const filterBrand = (value) => {
    // Check if the value is already selected
    if (BrandMob.includes(value)) {
      // If it is selected, remove it from the array
      setBrandMob(BrandMob.filter((brand) => brand !== value));
    } else {
      // If it is not selected, add it to the array
      setBrandMob([...BrandMob, value]);
    }
  };

  useEffect(() => {
    if (BrandMob.length === 0) {
      getAllProducts(false);
    }
  }, []);

  return (
    <div>
      <div>
        <button
          className="flex items-center gap-1 mt-1"
          onClick={() => setOpen(true)}
        >
          <p className="text-sm tracking-wider font-semibold italic">Filter</p>
          <span>
            <BsArrowRight size={12} className="mt-1" />
          </span>
        </button>
        <Drawer
          title="Select products by filters"
          placement="bottom"
          onClose={onClose}
          open={open}
          size="large"
        >
          <div className="relative">
            <div className="border-gray-200 px-2 py-3">
              <h3 className="-mx-2 -my-3 flow-root">
                {/* Expand/collapse section button */}
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
              {/* Filter section, show/hide based on section state. */}
              <div
                className="pt-2 error-message transition-all duration-500 ease-in-out"
                id="filter-section-mobile-0"
              >
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="filter-mobile-color-0"
                      name="price"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      value="10k - 30k"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <label
                      htmlFor="filter-mobile-color-0"
                      className="ml-3 min-w-0 flex-1 text-gray-500"
                    >
                      10k - 30k
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="filter-mobile-color-1"
                      name="price"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      value="30k - 50k"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <label
                      htmlFor="filter-mobile-color-1"
                      className="ml-3 min-w-0 flex-1 text-gray-500"
                    >
                      30k - 50k
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="filter-mobile-color-2"
                      name="price"
                      type="checkbox"
                      value="50k - 1 Lakh"
                      onChange={(e) => setPrice(e.target.value)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="filter-mobile-color-2"
                      className="ml-3 min-w-0 flex-1 text-gray-500"
                    >
                      50k - 1 Lakh
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="filter-mobile-color-4"
                      name="price"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      value="1 Lakh - 2 Lakh"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <label
                      htmlFor="filter-mobile-color-4"
                      className="ml-3 min-w-0 flex-1 text-gray-500"
                    >
                      1 Lakh - 2 Lakh
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-2 py-3">
              <h3 className="-mx-2 -my-3 flow-root">
                {/* Expand/collapse section button */}
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
              {/* Filter section, show/hide based on section state. */}
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
            <div className="border-t border-gray-200 px-2 py-3">
              <h3 className="-mx-2 -my-3 flow-root">
                {/* Expand/collapse section button */}
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
              {/* Filter section, show/hide based on section state. */}
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
            </div>
            <div className="border-t border-gray-200 px-2 py-3">
              <h3 className="-mx-2 -my-3 flow-root">
                {/* Expand/collapse section button */}
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
              {/* Filter section, show/hide based on section state. */}
              <div
                className="pt-2 error-message transition-all duration-500 ease-in-out"
                id="filter-section-mobile-2"
              >
                <div className="space-y-2">
                  {BrandName.map((el, i) => {
                    return (
                      <div className="flex items-center" key={i}>
                        <input
                          id="filter-mobile-size-0"
                          name="Brand"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          value={el.id}
                          onChange={(e) =>
                            filterBrand(parseInt(e.target.value))
                          }
                        />
                        <label
                          htmlFor="filter-mobile-size-0"
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
            {/* {BrandMob.length > 0 ? ( */}
              <div className="fixed bottom-[82%] right-2">
                <button
                  className="text-xs p-1.5 px-5 bg-black text-white rounded-xl w-full tracking-wider"
                  onClick={() => {
                    setOpen(false);
                    getAllProducts(false);
                  }}
                >
                  Apply Filter
                </button>
              </div>
            {/* ) : ( */}
              {/* false */}
            {/* )} */}
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default MobileFilter;
