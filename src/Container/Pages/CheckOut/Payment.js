import React, { useEffect, useState } from "react";
import { IoIosCash } from "react-icons/io";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { createSearchParams, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const Payment = ({ AddressId, address, CouponValue }) => {
  const Razorpay = window.Razorpay;

  let Navigate = useNavigate();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleGoBack = () => {
    Navigate(-1);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const getCustomerData = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        `customer/getCustomerById/${localStorage.getItem("CID")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          // setCustomerData(result.data);
          setName(result.data[0]["name"]);
          setEmail(result.data[0]["email"]);
          setContact(result.data[0]["mobile_no"]);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async (response) => {
    await setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      customer_id: localStorage.getItem("CID"),
      address_id: AddressId === null ? AddressId : address[0].id,
      coupon_code: CouponValue,
    });
    console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "payment/razorpay-initiate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          const options = {
            key: process.env.REACT_APP_RAZORPAY_ID,
            amount: "50000",
            currency: "INR",
            name: "Arrange Free",
            description: "Test Transaction",
            image: "/green-logo.png",
            order_id: result.order_id,
            redirect: false,
            callback_url:
              process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "payment/verify",
            handler: function (response) {
              console.log(response);
              if (response) {
                Navigate({
                  pathname: "/your-payment-is-in-verification",
                  search: createSearchParams({
                    data: JSON.stringify(response),
                  }).toString(),
                });
              }
            },
            prefill: {
              name: name,
              email: email,
              contact: contact,
            },
            theme: {
              color: "#027100",
            },
          };
          const rzp = new Razorpay(options);
          rzp.open();
          setIsLoading(false);
        }
      })
      .catch((error) => console.log("error", error));

    console.log(response);
  };

  const handleCreateOrder = async () => {
    await setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      customer_id: localStorage.getItem("CID"),
      address_id: AddressId === null ? AddressId : address[0].id,
      is_cod: 1,
      coupon_code: CouponValue,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "payment/make",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          Navigate(`/success?invoice=${result.invoice_path}`);
        }
      })
      .catch((error) => console.log("error", error));
    setTimeout(() => {
      setIsLoading(false);
    }, 8000);
  };

  return (
    <div className="error-message mt-2 md:mt-5 lg:mt-10 xl:mt-10">
      {/* {console.log(name)}
      {console.log({
        Name: name,
        Email: email,
        Contact: contact,
        
      })} */}
      <h3 className="font-semibold text-gray-700 p-3 tracking-wider">
        Select Payment Method
      </h3>
      <div className="border-t cursor-pointer bg-white rounded-lg shadow-sm">
        <div className="flex items-center py-4 p-2">
          <input
            type="radio"
            name="razorpay"
            id="razorpay"
            defaultValue="Online"
            defaultChecked
            style={{ color: "black" }}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <IoIosCash className="ml-5 text-lg" />
          <label
            htmlFor="razorpay"
            className="ml-2 text-sm font-semibold w-full cursor-pointer tracking-wider"
          >
            Cards & EMIs (Credit/Debit) / UPI
          </label>
          <form>
            <script
              src="https://checkout.razorpay.com/v1/payment-button.js"
              data-payment_button_id="pl_LvSNIFIXtQbRGD"
              async
            ></script>
          </form>
        </div>
      </div>
      <div className="border-t cursor-pointer bg-white rounded-lg shadow-sm mt-5">
        <div className="flex items-center py-4 p-2">
          <input
            type="radio"
            name="razorpay"
            id="COD"
            defaultValue="COD"
            style={{ color: "black" }}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <IoIosCash className="ml-5 text-lg" />
          <label
            htmlFor="COD"
            className="ml-2 text-sm font-semibold w-full cursor-pointer tracking-wider"
          >
            Cash On Delivery
          </label>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2 lg:gap-6 mt-10 md:mt-16">
        <div className="col-span-6 sm:col-span-3">
          <div>
            <button
              onClick={handleGoBack}
              className="bg-indigo-50 border tracking-wider border-indigo-100 rounded-full py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full"
            >
              <span className="text-xl mr-2">
                <IoReturnUpBackOutline />
              </span>
              Continue Shopping
            </button>
          </div>
        </div>
        <div className="col-span-6 sm:col-span-3">
          <button
            id="rzp-button1"
            onClick={
              paymentMethod === "COD" ? handleCreateOrder : handlePayment
            }
            type="submit"
            className="p-2 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-[#027100] border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
            disabled={isLoading === true}
          >
            {isLoading ? (
              <Spin indicator={antIcon} className="text-[#027100]" /> // Display the spinner when isLoading is true
            ) : (
              <span className="flex justify-center text-center tracking-wider">
                {paymentMethod === "COD" ? "Place Your Order" : "Pay"}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
