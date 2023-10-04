import React, { useEffect, useState } from "react";

const Membership = () => {
  const [data, setData] = useState();

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

  return (
    <div className="bg-black">
      {/* {console.log(JSON.parse(data))} */}
      <div className="flex items-center flex-col md:flex-col lg:flex-row py-5 md:py-10 mx-2 md:mx-5 lg:mx-10">
        <div className="basis-1/2 flex justify-center">
          <h1
            className="mt-2 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text"
            style={{
              backgroundImage:
                "linear-gradient(to right,#462523 0,#cb9b51 22%, #f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#462523 100%)",
              color: "transparent",
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-2 md:mx-10 gap-2 md:gap-3 lg:gap-5">
          {data &&
            JSON.parse(data).map((el, i) => {
              return (
                <div
                  style={{
                    background:
                      "linear-gradient(to right,#462523 0,#cb9b51 22%, #f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#462523 100%)",
                  }}
                  className="rounded-2xl"
                  key={i}
                >
                  <div className="m-0.5 bg-black rounded-2xl h-[250px]">
                    <div className="p-2">
                      <h1
                        className="text-justify font-semibold text-lg"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right,#cb9b51 0,#cb9b51 22%, #f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#cb9b51 100%)",
                          color: "transparent",
                          WebkitBackgroundClip: "text",
                        }}
                      >
                        {el.description.slice(0, 80)}{" "}
                        <button className="text-[#027100] text-sm font-medium">Read More..</button>
                      </h1>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Membership;
