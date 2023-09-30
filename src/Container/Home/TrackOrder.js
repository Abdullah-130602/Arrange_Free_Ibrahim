import React from "react";
import Container from "../Container";
import Heading from "../../Components/Heading/Heading";
import { BsTruck } from "react-icons/bs";
import { useState } from "react";
import { Divider, Skeleton, Steps, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { MdOutlineDangerous } from "react-icons/md";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const TrackOrder = () => {
  const [OrderID, setOrderID] = useState("");
  const [InputError, setInputError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [OrderDetails, setOrderDetails] = useState();
  const [CustomerInvoiceLink, setCustomerInvoiceLink] = useState();
  const [SkeletonLoad, setSkeletonLoad] = useState(true);
  const [orderTimeline, setOrderTimeline] = useState([]);
  const [current, setCurrent] = useState(0);

  const skeletonArray = Array.from({ length: 5 }, (_, index) => index);

  const [WrongOrderID, setWrongOrderID] = useState(false);

  const getAllOrderDetails = async () => {
    setInputError("");
    if (OrderID === "") {
      setInputError(
        "Please provide us your order ID. so we can track your order..."
      );
    } else {
      setIsLoading(true);
      setSkeletonLoad(true);
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(
        process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
          `product/track-order/${OrderID}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          if (result.status === 200) {
            const targetDiv = document.getElementById("scroll-here");
            if (targetDiv) {
              targetDiv.scrollIntoView({ behavior: "smooth" });
            }
            setOrderDetails(result);
            setOrderTimeline(result.order.timeline);
            setCurrent(result.order.timeline.length - 1);
            setCustomerInvoiceLink(result.order.invoice_path);
            setSkeletonLoad(false);
            setIsLoading(false);
          } else if (result.status === 404) {
            setOrderDetails(false);
            setSkeletonLoad(false);
            setIsLoading(false);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  const downloadFile = () => {
    if (CustomerInvoiceLink) {
      const link = document.createElement("a");
      link.href =
        process.env.REACT_APP_HAPS_MEDIA_BASE_URL + CustomerInvoiceLink;
      link.download = CustomerInvoiceLink.split("/"); // Specify the desired filename for the downloaded file
      link.target = "_blank"; // To open in a new tab for browsers that don't support download attribute
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log("No Invoice");
    }
  };

  const steps = [
    {
      title: "Order Confirmed",
    },
    {
      title: "Dispatched",
    },
    {
      title: "Out for Delivery",
    },
    {
      title: "Delivered",
    },
  ];

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }

  return (
    <Container className="my-5 p-2 md:p-4 lg:p-0">
      <div className="mt-5">
        <Heading spanHeading="Track Your Odrer" />
      </div>
      {/* <hr /> */}
      <div className="mt-2 flex flex-col md:flex-col lg:flex-row items-center gap-2 mx-2">
        <div className="w-full md:w-full lg:w-[50%] flex justify-center">
          <img src="/track.jpg" />
        </div>
        <div className="w-full md:w-full lg:w-[50%] flex flex-col gap-10">
          <li className="text-justify text-gray-700 list-disc">
            Stay in the know with our Track Order page! Easily monitor your
            order's progress from shipment to delivery, ensuring you're always
            up-to-date on your much-anticipated purchase.
          </li>
          {InputError && (
            <div className="text-red-600 error-message text-sm font-semibold tracking-wide">
              {InputError}
            </div>
          )}
          <div>
            <label
              htmlFor="input-group-1"
              className="block mb-2 text-sm font-semibold tracking-wider text-gray-900"
            >
              Tarck Your Order
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <BsTruck className="text-[#000]" size={25} />
              </div>
              <input
                type="text"
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-black font-semibold tracking-wider text-sm rounded-lg focus:outline-none focus:ring-[#027100] focus:border-[#027100] block w-full pl-12 p-2.5"
                placeholder="Enter your order id here"
                onChange={(e) => setOrderID(e.target.value)}
              />
            </div>
            <p className="text-xs mt-1 font-[600] text-gray-600 tracking-widest">
              Enter your order ID. So we can track your order details.{" "}
              <span className="text-[#027100]">(e.g - DOR2023...)</span>
            </p>
            <button
              className="p-2 mt-5 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
              onClick={getAllOrderDetails}
            >
              {isLoading ? (
                <Spin indicator={antIcon} className="text-black" /> // Display the spinner when isLoading is true
              ) : (
                <span className="flex justify-center text-center tracking-wider">
                  track Your Order
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 mx-2" id="scroll-here">
        <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 my-5">
          Order Details :
        </h1>
        <hr />
        {OrderDetails ? (
          <>
            {SkeletonLoad ? (
              <div className="">
                {skeletonArray.map((index) => (
                  <div key={index}>
                    <Skeleton active={true} className="mt-2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="error-message my-10">
                {/* Header */}
                <div className="flex flex-col gap-3">
                  <h1 className="text-gray-800 text-lg tracking-wide font-bold">
                    Hi {OrderDetails && OrderDetails.order.customer_name}!
                  </h1>
                  <h1 className="text-xl md:text-xl lg:text-3xl text-black tracking-wide font-extrabold">
                    Your order is{" "}
                    {OrderDetails && OrderDetails.order.status === "1" ? (
                      <span className="text-[#027100]">Confirmed!</span>
                    ) : OrderDetails && OrderDetails.order.status === "1" ? (
                      <span className="text-[#027100]">Dispatched!</span>
                    ) : OrderDetails && OrderDetails.order.status === "2" ? (
                      <span className="text-[#027100]">Out for delivery!</span>
                    ) : OrderDetails && OrderDetails.order.status === "-1" ? (
                      <span className="text-red-600">Canceled!</span>
                    ) : (
                      <span className="text-[#027100]">Delivered!</span>
                    )}
                  </h1>
                  <h1 className="text-gray-700 text-sm md:text-base tracking-wider font-semibold">
                    {OrderDetails && OrderDetails.order.status === "1"
                      ? "Your order has been confirmed and will be delivered soon"
                      : "Your order is being prepared with care. Please stay tuned!"}
                  </h1>
                </div>
                <Divider />
                <div className="flex flex-col md:flex-col lg:flex-row justify-between items-center">
                  <div>
                    <h1 className="text-gray-800 text-base tracking-wide font-bold">
                      Order ID #{" "}
                      <span className="text-[#027100]">
                        {OrderDetails && OrderDetails.order.razorpay_order_id}
                      </span>
                    </h1>
                    <h1 className="text-gray-800 text-base tracking-wide font-bold">
                      Order Date :{" "}
                      <span className="font-medium">
                        {formatDate(
                          OrderDetails && OrderDetails.order.order_date
                        )}
                      </span>
                    </h1>
                  </div>
                  {OrderDetails && OrderDetails.order.status === "-1" ? (
                    false
                  ) : (
                    <div className="flex items-center gap-2">
                      {/* <button
                  onClick={() => setshowTracking(!showTracking)}
                  className="p-2 bg-[#FFE342] w-60 text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                >
                  Cancel Order
                </button> */}
                      <button
                        onClick={() =>
                          downloadFile(
                            OrderDetails && OrderDetails.order.invoice_path
                          )
                        }
                        className="p-2 bg-[#FFE342] w-60 text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                      >
                        View Invoice
                      </button>
                    </div>
                  )}
                </div>
                <Divider />
                {/* Tracking Bar */}
                {OrderDetails && OrderDetails.order.status === "-1" ? (
                  false
                ) : (
                  <div>
                    <li className="text-gray-800 text-lg tracking-wide font-bold list-disc">
                      Track your Order!
                    </li>
                    <Steps
                      progressDot
                      current={current}
                      className="my-8"
                      items={steps.map((step, index) => ({
                        key: index,
                        title: <p className="font-bold">{step.title}</p>,
                        description:
                          index <= current ? orderTimeline[index].timeline : "",
                      }))}
                    />
                  </div>
                )}
                <Divider />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-5 justify-center md:justify-start">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-black text-sm md:text-base tracking-wider font-bold">
                      Delivery Address
                    </h1>
                    <p className="text-xs md:text-sm tracking-wider">
                      {OrderDetails && OrderDetails.order.customer_address}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-black text-sm md:text-base tracking-wider font-bold">
                      Billing Address
                    </h1>
                    <p className="text-xs md:text-sm tracking-wider">
                      {OrderDetails && OrderDetails.order.customer_address}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-black text-sm md:text-base tracking-wider font-bold">
                      Payment Information
                    </h1>
                    <p className="text-xs md:text-sm tracking-wider">
                      Cash on delivery
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-black text-sm md:text-base tracking-wider font-bold">
                      Contact Help
                    </h1>
                    <div className="text-xs md:text-sm tracking-wider flex flex-col">
                      <Link to="tel:+919834009243">(+91) 98340 09243</Link>
                      <Link to="mailto:sales@hapspro.com">
                        sales@hapspro.com
                      </Link>
                    </div>
                  </div>
                </div>
                <Divider />
                {/* Product Overview */}
                <div className="flex flex-col md:flex-col lg:flex-row justify-between gap-10 md:gap-10 lg:gap-0 relative">
                  <div className="flex flex-col gap-5">
                    {OrderDetails && OrderDetails.order.status === "-1" ? (
                      <div className="bg-[rgba(255,255,255,0.7)] h-full w-full absolute cursor-not-allowed" />
                    ) : (
                      false
                    )}
                    {OrderDetails &&
                      OrderDetails.product.map((el, i) => {
                        return (
                          <div className="flex gap-4" key={i}>
                            <Link
                              to={`/single-product/${el.id}`}
                              target="_blank"
                            >
                              <img
                                src={
                                  process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
                                  el.image
                                }
                                alt=""
                                className="w-40 h-40 object-contain bg-slate-50 border"
                              />
                            </Link>
                            <div className="flex flex-col gap-3 relative">
                              <Link
                                to={`/single-product/${el.id}`}
                                target="_blank"
                                className="text-black text-xs md:text-base tracking-wider font-bold"
                              >
                                {el.name}
                              </Link>
                              <p className="text-xs md:text-sm tracking-wider font-semibold">
                                ₹ {parseInt(el.actual_price)} /-
                              </p>
                              <p className="text-xs md:text-base tracking-wider absolute bottom-3">
                                Quantity :
                                <span className="font-semibold text-xs md:text-base">
                                  {el.quantity}
                                </span>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="rounded border px-5 py-2">
                    <h1 className="text-gray-800 text-lg tracking-wide font-bold">
                      Order Summary
                    </h1>
                    <div className="mt-2">
                      <div className="flex gap-16 items-center justify-between py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0 tracking-wider">
                        <p>Subtotal</p>
                        <p className="ml-auto flex-shrink-0 text-gray-500 font-bold">
                          ₹ {OrderDetails && OrderDetails.order.subtotal}
                        </p>
                      </div>
                      <div className="flex gap-16 items-center justify-between py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0 tracking-wider">
                        <p>Shipping Cost</p>
                        <p className="ml-auto flex-shrink-0 text-grey-700 font-bold">
                          Free
                        </p>
                      </div>
                      <div className="flex gap-16 items-center justify-between py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0 tracking-wider">
                        <p>Discount</p>
                        <p className="ml-auto flex-shrink-0 font-bold text-[#027100]">
                          {OrderDetails && OrderDetails.order.discount}
                        </p>
                      </div>
                      <Divider />
                      <div className="flex gap-16 justify-between items-center text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0 tracking-wider">
                        <p>Order Total</p>
                        <p className="ml-auto flex-shrink-0 font-bold text-green-500">
                          ₹ {OrderDetails && OrderDetails.order.total}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="my-10">
            <div className="flex justify-center">
              <div>
                <MdOutlineDangerous className="text-5xl md:text-7xl text-red-600" />
              </div>
            </div>
            <p className="text-center">Please check your order ID. You may have enter incorrect Order Id.</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default TrackOrder;
