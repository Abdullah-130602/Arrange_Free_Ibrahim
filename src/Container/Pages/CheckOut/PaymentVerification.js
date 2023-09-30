import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ClockLoader } from "react-spinners";

const override = {
  display: "flex",
  justifyContent: "center",
  margin: "0 auto",
  borderColor: "red",
};

const PaymentVerification = () => {
  const [SearchParams] = useSearchParams();
  let Navigate = useNavigate();
  const data = JSON.parse(SearchParams.get("data"));

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      razorpay_payment_id: data.razorpay_payment_id,
      razorpay_order_id: data.razorpay_order_id,
      razorpay_signature: data.razorpay_signature,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "payment/verify",
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
  }, []);

  return (
    <div className="bg-slate-100 h-screen relative">
      <div className="pt-[400px]">
        <ClockLoader
          color={"#027100"}
          loading={true}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p className="text-red-600 text-sm font-semibold text-center mt-5">
          Don't press back button!
        </p>
        <p className="text-gray-700 font-semibold text-center">
          Your payment is in verification process..!
        </p>
      </div>
    </div>
  );
};

export default PaymentVerification;
