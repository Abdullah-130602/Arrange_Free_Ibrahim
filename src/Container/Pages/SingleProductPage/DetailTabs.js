import React, { useState } from "react";
import { Tabs } from "antd";

const DetailTabs = ({ productDetails }) => {
  const [Hover, setHover] = useState(1);

  const items = [];

  if (productDetails && productDetails[0].properties) {
    items.push({
      key: "1",
      label: (
        <div
          onClick={() => setHover(1)}
          className={`${
            Hover === 1 ? "bg-gray-200" : ""
          } text-black tracking-wider hover:bg-gray-200 rounded p-2 transition-all duration-500 ease-in-out`}
        >
          Channel Partner
        </div>
      ),
      children:
        productDetails &&
        productDetails[0].properties.split("\n").map((text, i) => (
          <p
            className="text-justify font-medium text-gray-700 text-sm py-1"
            key={i}
          >
            <span className="font-semibold text-justify tracking-wider">
              {text.split(":")[0]}
            </span>{" "}
            : {text.split(":")[1]}
          </p>
        )),
    });
  }

  items.push(
    {
      key: "2",
      label: (
        <div
          onClick={() => setHover(2)}
          className={`${
            Hover === 2 ? "bg-gray-200" : ""
          } text-black tracking-wider hover:bg-gray-200 rounded p-2 transition-all duration-500 ease-in-out`}
        >
          Features
        </div>
      ),
      children:
        productDetails &&
        productDetails[0].features.split("\n").map((text, i) => (
          <p
            className="text-justify py-1 font-semibold text-gray-700 tracking-wider"
            key={i}
          >
            {text}
          </p>
        )),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => setHover(3)}
          className={`${
            Hover === 3 ? "bg-gray-200" : ""
          } text-black tracking-wider hover:bg-gray-200 rounded p-2 transition-all duration-500 ease-in-out`}
        >
          Care & Instructions
        </div>
      ),
      children:
        productDetails &&
        productDetails[0].care_n_instructions.split("\n").map((text, i) => (
          <p
            className="text-justify py-1 font-semibold text-gray-700 tracking-wider"
            key={i}
          >
            {text}
          </p>
        )),
    },
    {
      key: "4",
      label: (
        <div
          onClick={() => setHover(4)}
          className={`${
            Hover === 4 ? "bg-gray-200" : ""
          } text-black tracking-wider hover:bg-gray-200 rounded p-2 transition-all duration-500 ease-in-out`}
        >
          Warranty Details
        </div>
      ),
      children:
        productDetails &&
        productDetails[0].warranty_details.split("\n").map((text, i) => (
          <p
            className="text-justify py-1 font-semibold text-gray-700 tracking-wider"
            key={i}
          >
            {text}
          </p>
        )),
    },
    {
      key: "5",
      label: (
        <div
          onClick={() => setHover(5)}
          className={`${
            Hover === 5 ? "bg-gray-200" : ""
          } text-black tracking-wider hover:bg-gray-200 rounded p-2 transition-all duration-500 ease-in-out`}
        >
          Quality Promise
        </div>
      ),
      children:
        productDetails &&
        productDetails[0].quality_promise.split("\n").map((text, i) => (
          <p
            className="text-justify py-1 font-semibold text-gray-700 tracking-wider"
            key={i}
          >
            {text}
          </p>
        )),
    }
  );

  return (
    <div className="p-2 mx-0 md:mx-0 lg:mx-10 xl:mx-20 mt-5">
      <h1 className="text-xl md:text-2xl font-bold text-center py-3">
        More Product Details
      </h1>
      <div className="block md:block lg:block xl:block border p-1 px-2 rounded-lg">
        <Tabs
          defaultActiveKey="1"
          items={items}
          tabBarStyle={{ color: "black" }}
        />
      </div>

      {/* <div className="relative overflow-x-auto hidden md:hidden lg:block xl:block">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3 w-1/5">
                Channel Partner
              </th>
              <th scope="col" className="px-6 py-3 w-1/5">
                Features
              </th>
              <th scope="col" className="px-6 py-3 w-1/5">
                Care & Instructions
              </th>
              <th scope="col" className="px-6 py-3 w-1/5">
                Warranty Details
              </th>
              <th scope="col" className="px-6 py-3 w-1/5">
                Quality Promise
              </th>
            </tr>
          </thead>
          <tbody>
            {productDetails.map((el, i) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={i}
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {el.features.split("\n").map((text, i) => (
                      <p className=" py-1 font-semibold text-gray-700" key={i}>
                        {text}
                      </p>
                    ))}
                  </td>
                  <td className="align-top px-6 py-4">
                    {el.properties.split("\n").map((text, i) => (
                      <p className=" py-1 font-semibold text-gray-700" key={i}>
                        {text}
                      </p>
                    ))}
                  </td>
                  <td className="align-top px-6 py-4 text-start font-semibold text-gray-700">
                    {el.care_n_instructions.split("\n").map((text, i) => (
                      <p className=" py-1 font-semibold text-gray-700" key={i}>
                        {text}
                      </p>
                    ))}
                  </td>
                  <td className="align-top px-6 py-4  font-semibold text-gray-700">
                    {el.warranty_details.split("\n").map((text, i) => (
                      <p className=" py-1 font-semibold text-gray-700" key={i}>
                        {text}
                      </p>
                    ))}
                  </td>
                  <td className="align-top px-6 py-4  font-semibold text-gray-700">
                    {el.quality_promise.split("\n").map((text, i) => (
                      <p className=" py-1 font-semibold text-gray-700" key={i}>
                        {text}
                      </p>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default DetailTabs;
