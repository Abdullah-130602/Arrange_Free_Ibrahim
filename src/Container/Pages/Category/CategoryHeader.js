import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
// import Heading from "../../../Components/Heading/Heading";
// import { Divider } from "antd";
import { RxDotFilled } from "react-icons/rx";
import { Collapse } from "antd";

const CategoryHeader = ({ description, slug }) => {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      setCurrentText((prevText) => prevText + description[currentIndex]);
      currentIndex++;

      if (currentIndex === description.length) {
        clearInterval(typingInterval);
      }
    }, 100); // Adjust typing speed (in milliseconds) as desired

    return () => clearInterval(typingInterval);
  }, [description]);

  const items = [
    {
      key: "1",
      label: "This is panel header 1",
      children: <p>{description}</p>,
    },
  ];

  return (
    <div className="mt-2 error-message">
      <div className="flex justify-start md:justify-start lg:justify-center xl:justify-center">
        <div className="w-full md:w-full flex flex-col gap-1 rounded-2xl">
          <div className="flex font-semibold p-2 text-sm">
            {/* <div className="w-10">
              <RxDotFilled size={25} />
            </div> */}
            <Collapse
              className="w-full bg-white border-none rounded-none"
              accordion
            >
              <Collapse.Panel header={`Get to know more about our ${slug}`}>
                {description
                  ? description.map((el, i) => {
                      return <div key={i}>{el}</div>;
                    })
                  : false}
              </Collapse.Panel>
            </Collapse>
          </div>
          {/* <hr /> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
