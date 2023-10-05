import { ConfigProvider, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Membership = () => {
  const [data, setData] = useState();
  const [ModalOpen, setModalOpen] = useState(false);
  const [TransferData, setTransferData] = useState("");
  const getCards = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      "https://main-backend.hapspro.com/SubscriptionCards/get-cards-byId/33",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setData(result.data.benefits);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    window.scroll(0, 0);
    getCards();
  }, []);
  const customTheme = {
    css: {
      token: {
        colorBgBase: "#000",
      },
    },
  };
  const [UserPhone, setUserPhone] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.match(/iPhone|iPad|iPod/i)) {
      // User is on an Apple device (iOS)
      setUserPhone("IPhone");
      // console.log("This user is using an Apple device (iOS).");
    } else if (userAgent.match(/Android/i)) {
      // User is on an Android device
      // console.log("This user is using an Android device.");
      setUserPhone("Android");
    } else {
      // User is on another type of device or browser
      // console.log("This user is using a different device or browser.");
      setUserPhone("Desktop");
    }
  }, []);
  return (
    <div className="bg-black">
      {/* {console.log(JSON.parse(data))} */}
      <div className="flex items-center flex-col md:flex-col lg:flex-row py-5 md:py-10 mx-2 md:mx-5 lg:mx-10">
        <div className="basis-1/2 flex justify-center">
          <h1
            className="mt-2 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text"
            style={{
              backgroundImage:
                "linear-gradient(to right,#f6f2c0 0,#cb9b51 22%, #f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#462523 100%)",
              color: "transparent",
              height: 200,
              WebkitBackgroundClip: "text",
            }}
          >
            Arrange Free Membership <br />
            <span className="">Golden Prestige Card</span>
          </h1>
        </div>
        <div className="basis-1/2 flex justify-center m-5">
          <img src="/goldenCard.png" className="" />
        </div>
      </div>
      <hr className="border-t border-[#cb9b51] mx-2 md:mx-10" />
      {/* Golden Benefits */}
      <div className="text-center py-5 md:py-10 flex flex-col gap-5">
        <h1
          className="mt-2 mb-16 text-5xl font-bold tracking-widest md:text-6xl xl:text-7xl text font-serif"
          style={{
            backgroundImage:
              "linear-gradient(to right,#462523 0,#cb9b51 22%, #f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#462523 100%)",
            color: "transparent",
            WebkitBackgroundClip: "text",
          }}
        >
          GOLDEN BENEFITS
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-2 md:mx-10 gap-2 md:gap-3 lg:gap-5">
          {data &&
            JSON.parse(data).map((el, i) => {
              return (
                <div
                  style={{
                    background:
                      "linear-gradient(to right,#462523 0,#cb9b51 22%, #f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#462523 100%)",
                  }}
                  className="rounded-2xl relative"
                  key={i}
                >
                  <div className="m-0.5 bg-black rounded-2xl h-full">
                    <div className="p-2 flex flex-col gap-4">
                      <h1 className="text-start tracking-wide font-semibold text-sm md:text-lg text-white capitalize">
                        {el.description.slice(0, 70)}...
                      </h1>
                      <hr className="border-t border-[#ffe342]" />
                      {el.fields.slice(0, 2).map((text, i) => {
                        return (
                          <div key={i} className="">
                            <li
                              className="text-justify font-semibold text-sm md:text-lg marker:text-[#ffe342] list-disc"
                              style={{
                                backgroundImage:
                                  "linear-gradient(to right,#cb9b51 0,#cb9b51 22%, #f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#cb9b51 100%)",
                                color: "transparent",
                                WebkitBackgroundClip: "text",
                              }}
                            >
                              {text.subTitle}
                            </li>
                            <p className="text-white text-start text-xs tracking-wider">
                              {text.subDesc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-end my-2 mr-2">
                      <button
                        className="text-[#027100] text-sm font-medium"
                        onClick={() => {
                          setTransferData(el);
                          setModalOpen(true);
                        }}
                      >
                        <h1
                          className="text-justify font-semibold text-sm decoration-[#ffe342] underline"
                          style={{
                            backgroundImage:
                              "linear-gradient(to right,#cb9b51 0,#cb9b51 22%, #f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#cb9b51 100%)",
                            color: "transparent",
                            WebkitBackgroundClip: "text",
                          }}
                        >
                          Read More...
                        </h1>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <hr className="border-t border-[#cb9b51] mx-2 md:mx-10" />
      <div className="mx-2 md:mx-10">
        <div className="my-5 md:my-10">
          <h1
            className="mt-2 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl w-full"
            style={{
              textAlign: "center",
              backgroundImage:
                "linear-gradient(to right,#f6f2c0 0,#cb9b51 22%, #f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#462523 100%)",
              color: "transparent",
              height: 80,
              WebkitBackgroundClip: "text",
            }}
          >
            Arrange Free Gold Membership Plan
          </h1>
          <div className="flex flex-col md:flex-col lg:flex-row items-center gap-5 md:gap-5 lg:gap-5 my-5 md:my-10 lg:mx-2">
            <div className="w-full md:w-full lg:w-1/2 flex justify-center">
              <iframe
                // width="560"
                // height="315"
                src="https://www.youtube.com/embed/o-yb9UF9RiE?si=N4mHywgMlDjxV8bX"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-[260px] md:h-[310px] lg:h-[500px] rounded-none md:rounded-lg"
              ></iframe>
              <p></p>
            </div>
            <div className="w-full md:w-full lg:w-1/2 flex justify-center">
              <iframe
                // width="560"
                // height="315"
                src="https://www.youtube.com/embed/Y3ZiYp_DEBg?si=XiGWi8HRh4aB_dLW"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-[260px] md:h-[310px] lg:h-[500px] rounded-none md:rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      {/* Buy Button */}
      <div className="flex justify-center py-5 md:py-10">
        <div>
          <Link
            to="/subscription-terms-and-condition"
            className="font-semibold text-lg decoration-[#cb9b51] underline flex gap-1 items-center"
            style={{
              backgroundImage:
                "linear-gradient(to right,#cb9b51 0,#cb9b51 22%, #f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#cb9b51 100%)",
              color: "transparent",
              WebkitBackgroundClip: "text",
            }}
          >
            Terms & Condition Apply
            <span>
              <AiOutlineInfoCircle className="text-[#cb9b51]" />
            </span>
          </Link>
          <div className="flex justify-center mt-2">
            <button
              className="p-2 text-lg font-semibold px-20 rounded-full border border-[#cb9b51]"
              style={{
                background:
                  "linear-gradient(to right,#462523 0,#cb9b51 22%, #f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#462523 100%)",
              }}
              onClick={() =>
                UserPhone === "Android"
                  ? window.open(
                      "https://play.google.com/store/apps/details?id=com.arrange_free"
                    )
                  : window.open(
                      "https://apps.apple.com/in/app/dorfee/id6462861358"
                    )
              }
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
      <ConfigProvider theme={customTheme}>
        <Modal
          open={ModalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
          wrapClassName="reservation_modal"
          closable={false}
          width={1000}
          // bodyStyle={{ backgroundColor: "#000", }}
        >
          {/* {TransferData &&
            TransferData.map((el, i) => {
              return ( */}
          <div className="">
            <li
              className="text-justify font-semibold text-base md:text-xl marker:text-[#cb9b51] list-disc"
              style={{
                backgroundImage:
                  "linear-gradient(to right,#cb9b51 0,#cb9b51 22%, #f6e27a 45%,#cb9b51 50%,#f6e27a 55%,#cb9b51 78%,#cb9b51 100%)",
                color: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              {TransferData && TransferData.title}
            </li>
            <hr className="border-t border-[#cb9b51] my-2 md:my-4" />
            <p className="text-black font-semibold indent-10 text-base">
              {TransferData && TransferData.description}
            </p>
            <hr className="border-t border-[#cb9b51] my-2 md:my-4" />
            {TransferData &&
              TransferData.fields.map((el, i) => {
                return (
                  <div className="mt-2 flex flex-col gap-1" key={i}>
                    <li
                      className="text-justify font-semibold text-sm md:text-base marker:text-[#cb9b51] list-disc"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right,#cb9b51 0,#cb9b51 22%, #f6e27a 45%,#cb9b51 50%,#f6e27a 55%,#cb9b51 78%,#cb9b51 100%)",
                        color: "transparent",
                        WebkitBackgroundClip: "text",
                      }}
                    >
                      {el.subTitle}
                    </li>
                    <p className="text-gray-700 text-justify text-sm tracking-wider">
                      {el.subDesc}
                    </p>
                  </div>
                );
              })}
          </div>
          {/* );
            })} */}
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default Membership;
