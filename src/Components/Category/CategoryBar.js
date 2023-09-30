import React from "react";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { Link } from "react-router-dom";
import { ConfigProvider, Menu } from "antd";

const CategoryBar = ({ data, loading }) => {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const child = (d) => {
    const newdata = d.map((el, i) =>
      getItem(
        <Link
          to={`/category/${el.slug}`}
          key={i}
          className="capitalize text-sm tracking-wider font-semibold text-black cursor-pointer hover:text-black"
        >
          {el.title
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Link>,
        el.id + 50,
        null
      )
    );
    return newdata;
  };

  const item = (drop) => {
    const newdata = drop.map((el, i) =>
      getItem(
        <Link
          to={`/sub-category/${el.slug}`}
          className="capitalize text-sm tracking-wider font-semibold text-black cursor-pointer hover:text-black"
          key={i}
        >
          <p className="transition-all ease-in-out duration-500 border border-transparent hover:bg-gray-200 p-1 m-1 rounded-md text-black hover:text-[#000]">
            {el.title
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
        </Link>,
        el.id,
        null,
        child(el.category)
      )
    );
    return newdata;
  };

  const onClick = (e) => {
    console.log("click", e);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#027100",
        },
      }}
    >
      {loading && (
        <div className="hidden md:hidden lg:block xl:block bg-white">
          <div className="flex flex-wrap justify-center gap-x-20 gap-y-2 xl:gap-[70px] error-message bg-transparent">
            <Menu
              onClick={onClick}
              style={{
                width: "3200px",
                display: "flex",
                justifyContent: "center",
                gap: 0,
                backgroundColor: "transparent",
                margin: -2,
                overflowY: "scroll",
                msOverflowY: "hidden",
              }}
              mode="horizontal"
              className="error-message"
              items={item(data)}
            />
          </div>
        </div>
      )}
    </ConfigProvider>
  );
};

export default CategoryBar;
