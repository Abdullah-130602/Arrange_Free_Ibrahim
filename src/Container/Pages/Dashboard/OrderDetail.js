import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { Link, useParams } from "react-router-dom";
import { Divider, Modal, Skeleton, Spin, Steps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AiOutlineCloseCircle } from "react-icons/ai";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const OrderDetail = () => {
  let { slug } = useParams();

  const [OrderDetails, setOrderDetails] = useState();
  const [CustomerInvoiceLink, setCustomerInvoiceLink] = useState();
  const [SkeletonLoad, setSkeletonLoad] = useState(true);
  const [orderTimeline, setOrderTimeline] = useState([]);
  const [current, setCurrent] = useState(0);

  const skeletonArray = Array.from({ length: 5 }, (_, index) => index);

  const getAllOrderDetails = async () => {
    setSkeletonLoad(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL + `product/getOrder/${slug}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status === 200) {
          setOrderDetails(result);
          setOrderTimeline(result.order.timeline);
          setCurrent(result.order.timeline.length - 1);
          setCustomerInvoiceLink(result.order.invoice_path);
          setSkeletonLoad(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllOrderDetails();
  }, []);

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

  const [showTracking, setshowTracking] = useState(true);
  const [Message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [MessageError, setMessageError] = useState("");

  const cancelValidate = () => {
    if (Message === "") {
      setMessageError("Please tell us why you are cancelling this order..");
    } else {
      setModalOpen(true);
    }
  };

  const cancelOrder = (id) => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      order_id: id,
      remark: Message,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "customer/cancel-order",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setIsLoading(false);
          setModalOpen(false);
          setshowTracking(!showTracking);
          getAllOrderDetails();
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Dashboard>
      {SkeletonLoad ? (
        <div className="">
          {skeletonArray.map((index) => (
            <div key={index}>
              <Skeleton active={true} className="mt-2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {showTracking ? (
            <div className="error-message">
              {/* Header */}
              <div className="flex flex-col gap-3">
                <h1 className="text-gray-800 text-lg tracking-wide font-bold">
                  Hi {OrderDetails && OrderDetails.order.customer_name}!
                </h1>
                <h1 className="text-xl md:text-xl lg:text-3xl text-black tracking-wide font-extrabold">
                  Your order is{" "}
                  {OrderDetails && OrderDetails.order.status === "1" ? (
                    <span className="text-[#027100]">Confirmed!</span>
                  ) : OrderDetails && OrderDetails.order.status === "2" ? (
                    <span className="text-[#027100]">Dispatched!</span>
                  ) : OrderDetails && OrderDetails.order.status === "3" ? (
                    <span className="text-[#027100]">Out for delivery!</span>
                  ) : OrderDetails && OrderDetails.order.status === "-1" ? (
                    <span className="text-red-600">Canceled!</span>
                  ) : (
                    <span className="text-[#027100]">Delivered!</span>
                  )}
                </h1>
                <h1 className="text-gray-700 text-sm md:text-base tracking-wider font-semibold">
                  {OrderDetails && OrderDetails.order.status === "1" ? (
                    "Your order has been confirmed and will be delivered soon"
                  ) : OrderDetails && OrderDetails.order.status === "-1" ? (
                    <p className="text-red-600">Your Order is cancelled</p>
                  ) : (
                    "Your order is being prepared with care. Please stay tuned!"
                  )}
                </h1>
              </div>
              <Divider />
              <div className="flex flex-col md:flex-col lg:flex-row justify-start md:justify-start lg:justify-between items-center">
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
                {(OrderDetails && OrderDetails.order.status === "-1") ||
                OrderDetails.order.status === "2" ? (
                  false
                ) : (
                  <div className="flex flex-col md:flex-col lg:flex-row items-center gap-2">
                    {(OrderDetails && OrderDetails.order.status === "2") ||
                    (OrderDetails && OrderDetails.order.status === "-1") ? (
                      false
                    ) : (
                      <button
                        onClick={() => setshowTracking(!showTracking)}
                        className="p-2 bg-[#FFE342] w-60 text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                      >
                        Cancel Order
                      </button>
                    )}
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
              {OrderDetails && OrderDetails.order.status === "-1" ? (
                false
              ) : (
                <Divider />
              )}
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
                  {OrderDetails && parseInt(OrderDetails.order.status) < 2 ? (
                    <p className="text-red-500 font-semibold">
                      Note: Please note that once your order has been
                      dispatched, it cannot be cancelled.
                    </p>
                  ) : (
                    false
                  )}
                  {OrderDetails && parseInt(OrderDetails.order.status) >= 2 ? (
                    <p className="text-[#027100] font-semibold">
                      Your order has been dispatched, it is en route to you, and
                      cancellation is no longer possible.
                    </p>
                  ) : (
                    false
                  )}
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
                    <Link to="tel:+919371885000">(+91) 93718 85000</Link>
                    <Link to="mailto:sales@arrangefree.com">sales@arrangefree.com</Link>
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
                          <Link to={`/single-product/${el.id}`} target="_blank">
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
                            <div className="flex gap-3">
                              <p className="text-[#027100] text-sm md:text-base tracking-wider font-semibold">
                                ₹{parseInt(el.discounted_price)}/-
                              </p>
                              <p className="text-xs md:text-sm strike-through-red tracking-wider">
                                ₹{parseInt(el.actual_price)}/-
                              </p>
                            </div>
                            <p className="text-xs md:text-base tracking-wider absolute bottom-3">
                              Quantity :{" "}
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
                        ₹{OrderDetails && OrderDetails.order.subtotal}/-
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
                      ₹{OrderDetails && OrderDetails.order.discount}/-
                      </p>
                    </div>
                    {OrderDetails && OrderDetails.order.coupon_details ? (
                      <div className="flex gap-16 items-center justify-between py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0 tracking-wider">
                        <p>
                          Coupon applied "
                          {OrderDetails &&
                            OrderDetails.order.coupon_details.coupon_code}
                          "
                        </p>
                        <p className="ml-auto flex-shrink-0 font-bold text-[#027100]">
                        ₹{OrderDetails && OrderDetails.order.coupon_details.discount_amount}/-
                        </p>
                      </div>
                    ) : (
                      false
                    )}
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
          ) : (
            <div className="flex flex-col gap-5 error-message">
              <div className="flex flex-col gap-3">
                <h1 className="text-gray-800 text-lg tracking-wide font-bold">
                  Hi {OrderDetails && OrderDetails.order.customer_name}!
                </h1>
                <h1 className="text-xl md:text-xl lg:text-3xl text-black tracking-wide font-extrabold">
                  Cancel Order
                </h1>
              </div>
              <div className="mt-5">
                <li className="text-gray-800 text-lg tracking-wide font-bold list-disc">
                  Terms & Condition!
                </li>
                <div className="flex justify-center">
                  <p className="mt-5 w-full tracking-wider text-sm font-semibold text-gray-700 text-justify">
                    Welcome to Our Dedicated and Innovative Team at Arrange
                    Free! Our passion for excellence drives us to tirelessly
                    pursue our company's goals and provide you with an
                    unparalleled furniture buying experience. With a strong work
                    ethic as our foundation, each member of our team is
                    committed to ensuring your satisfaction through our hard
                    work, attention to detail, and the highest quality of
                    service. At Arrange Free, we take pride in our team's
                    innovative spirit, constantly seeking fresh and creative
                    solutions to make furniture buying a seamless and exciting
                    journey for you. Our dedication goes beyond just delivering
                    furniture; it's about making your vision come to life. We
                    understand that your space is a reflection of your
                    personality, and our team is dedicated to turning your
                    dreams into reality. With a customer-centric approach, we're
                    not merely furnishing spaces – we're crafting comfortable
                    and inspiring environments that you'll cherish. Join us at
                    Arrange Free and experience a team that's truly passionate
                    about making furniture buying easy and enjoyable for you.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-gray-800 text-lg tracking-wide font-bold">
                  Why canceling order?
                </p>
                <div>
                  <textarea
                    id="message"
                    rows={8}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-[#027100] focus:border-[#027100]"
                    placeholder="Write your thoughts here..."
                    defaultValue={""}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  {MessageError && (
                    <div className="font-semibold text-red-600">
                      {MessageError}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={cancelValidate}
                  className="p-2 bg-[#FFE342] w-60 text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                >
                  Cancel Order
                </button>
                <button
                  onClick={() => setshowTracking(!showTracking)}
                  className="p-2 bg-gray-400 w-60 text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-gray-400 uppercase flex justify-center items-center gap-2"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </>
      )}
      <Modal
        // title="Vertically centered modal dialog"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        {/* <div className="flex justify-center items-center"> */}
        {/* <div className="flex flex-col gap-5"> */}
        <div className="flex justify-center items-center">
          <AiOutlineCloseCircle className="text-red-500 text-9xl text-center" />
        </div>
        <p className="text-gray-800 text-center text-lg tracking-wide font-bold">
          Are you sure?
        </p>
        <p className="text-sm text-gray-700 text-center">
          Do you really want to cancel these orders? This process cannot be
          undone.
        </p>
        <div className="flex items-center gap-2 mt-5">
          <button
            onClick={() => cancelOrder(OrderDetails && OrderDetails.order.id)}
            className="p-2 bg-[#FFE342] w-60 text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <Spin indicator={antIcon} className="text-black" /> // Display the spinner when isLoading is true
            ) : (
              <span className="flex justify-center text-center tracking-wider">
                Cancel Order
              </span>
            )}
          </button>
          <button
            onClick={() => setModalOpen(false)}
            className="p-2 bg-gray-400 w-60 text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-gray-400 uppercase flex justify-center items-center gap-2"
          >
            Back
          </button>
        </div>
        {/* </div> */}
        {/* </div> */}
      </Modal>
    </Dashboard>
  );
};

export default OrderDetail;
