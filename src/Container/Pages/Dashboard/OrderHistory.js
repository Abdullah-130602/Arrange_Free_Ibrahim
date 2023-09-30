import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { BsArrowRight } from "react-icons/bs";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { VscPackage } from "react-icons/vsc";
import { Link } from "react-router-dom";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 34,
      color: "#000",
    }}
    spin
  />
);

const OrderHistory = () => {
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", loading);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [loading]);

  const getAllOrders = async () => {
    setLoading(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        `product/orders/getOrderHistorybycustomer/${localStorage.getItem(
          "CID"
        )}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status === 200) {
          setGetData(result.orders);
          setLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const ReversedData = getData.slice().reverse();

  return (
    <Dashboard>
      <>
        <h2 className="text-xl font-serif font-semibold mb-5">Recent Orders</h2>
        {loading ? (
          <>
            <div className="relative bg-white h-screen overflow-hidden" />
            {loading && (
              <div className="flex justify-center">
                <div className="absolute top-[55%]">
                  <Spin indicator={antIcon} />
                </div>
              </div>
            )}
          </>
        ) : (
          <React.Fragment>
            {getData.length > 0 ? (
              getData.map((el, index) => {
                return (
                  <div
                    className="bg-white mt-2 rounded-md shadow-lg relative"
                    key={index}
                  >
                    <div className="p-1 md:p-1 lg:p-2">
                      <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row justify-between mx-2 my-2 md:my-2 lg:mb-0 xl:mb-0">
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-bold md:text-sm ">
                            Order ID :{" "}
                          </p>
                          <p className="text-gray-700 text-xs md:text-sm">
                            {el.id}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="font-bold text-sm md:text-sm">
                            Total :{" "}
                          </p>
                          <p className="text-gray-800 text-xs md:text-sm">
                            ₹{el.total}/-
                          </p>
                        </div>
                      </div>
                      <div className="">
                        {el.products.map((prod, index) => {
                          const isLastProduct =
                            index === el.products.length - 1;
                          return (
                            <React.Fragment key={index}>
                              <div className="relative flex gap-2">
                                <img
                                  src={
                                    process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
                                    prod.image
                                  }
                                  className="my-2 border h-[128px] w-[128px] rounded"
                                />
                                <div className="p-2">
                                  <p className="font-semibold text-xs md:text-sm">
                                    {prod.name}
                                  </p>
                                  <p className="font-semibold  text-xs md:text-sm text-gray-500">
                                    by {prod.brand}
                                  </p>
                                </div>
                                <div className="absolute bottom-3 left-36 flex gap-1">
                                  <p className="font-semibold  text-xs md:text-sm">
                                    Qty:
                                  </p>
                                  <p className="text-gray-500 font-serif text-xs md:text-sm">
                                    {prod.quantity}
                                  </p>
                                </div>
                              </div>
                              {!isLastProduct && <hr />}
                            </React.Fragment>
                          );
                        })}
                      </div>
                      <div className="absolute right-2 bottom-3 mx-5">
                        <Link
                          to={`/orders-detail/${el.id}`}
                          className="text-sm underline text-gray-800 hover:text-black"
                        >
                          Order Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="my-10">
                <div className="flex justify-center">
                  <VscPackage size={30} />
                </div>
                <figcaption className="text-center text-gray-800 font-semibold tracking-wide">
                  You have'nt purchased any product...!
                </figcaption>
              </div>
            )}
          </React.Fragment>
        )}
      </>
    </Dashboard>
  );
};

export default OrderHistory;
