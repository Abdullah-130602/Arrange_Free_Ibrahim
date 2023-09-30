import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { Modal } from "antd";

const Navbar = () => {
  let Navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [SearchMenu, setSearchMenu] = useState(false);

  const GoToSearchPage = (e) => {
    e.preventDefault();
    Navigate(`/search/${searchValue}`);
  };

  const handleOnChange = (e) => {
    setSearchValue(e.target.value);
    if (searchValue.length > 0) {
      setSearchMenu(true);
    }
  };

  return (
    <div className="flex justify-center  bg-white p-2">
      <form
        className="w-full md:w-full lg:w-2/3 xl:w-2/3 relative"
        onSubmit={GoToSearchPage}
      >
        <div>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-3 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {searchValue > 0 ? (
              <div className="absolute inset-y-0 right-3 flex items-center pl-3 pointer-events-none">
                <RxCross2
                  onClick={() => setSearchValue(null)}
                  className="text-black"
                />
              </div>
            ) : (
              false
            )}
            <input
              type="text"
              id="default-search"
              className="block w-full p-2 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg md:rounded-lg lg:rounded-2xl xl:rounded-2xl bg-gray-50"
              placeholder="Search Sofa, Rug, Center Table..."
              onChange={handleOnChange}
              onBlur={() => setSearchMenu(false)}
              required
            />
          </div>
        </div>
        {SearchMenu && (
          <div className="absolute z-[999999] top-10 w-full shadow-2xl error-message">
            <div className="bg-white h-96 rounded-2xl border-t border-gray-200" />
          </div>
        )}
      </form>
    </div>
  );
};

export default Navbar;
