import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Terms And Condition */}
      <div className="my-10">
        <div className="flex flex-col max-w-5xl mx-auto overflow-hidden rounded">
          <img
            src="/privacy.jpg"
            alt=""
            className="w-full h-80 sm:h-96 object-cover rounded-xl"
          />
          <div className="p-6 pb-12 m-4 mx-auto -mt-16  sm:px-10 sm:mx-12 lg:rounded-md bg-white rounded-lg shadow-lg">
            <div className="space-y-2">
              <p className="mb-4 text-2xl font-semibold sm:text-3xl text-center">
                Terms and Conditions for Arrange Free Ecommerce Website:{" "}
              </p>
            </div>
            <div className="bg-white w-full flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">1. Introduction:</h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  Welcome to Arrange Free! These terms and conditions govern your use
                  of our ecommerce website and the services we provide. By
                  accessing and using our website, you agree to comply with
                  these terms. If you do not agree with any part of these terms,
                  please refrain from using our services.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">2. User Accounts:</h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  a. You must be at least 18 years old to create an account on
                  Arrange Free.
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  b. You are responsible for maintaining the confidentiality of
                  your account information and password.{" "}
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  c. You agree to provide accurate and up-to-date information
                  during the registration process.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">
                  3. Product Listings and Descriptions :{" "}
                </h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  a. We strive to provide accurate product information,
                  including images and descriptions, but we do not guarantee the
                  complete accuracy of such content.
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  b. Prices of products are subject to change without notice.
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  c. We reserve the right to modify or discontinue any product
                  or service without prior notice.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">
                  4. Orders and Payments:
                </h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  a. By placing an order, you agree to purchase the products or
                  services at the specified prices and abide by our payment
                  terms.
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  b. Payment options will be clearly displayed during the
                  checkout process.
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  c. All payments are processed securely through authorized
                  payment gateways.{" "}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">
                  5. Shipping and Delivery:
                </h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  a. Shipping costs and estimated delivery times will be
                  provided at the time of checkout.
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  b. Delivery times are estimated and may vary due to unforeseen
                  circumstances.{" "}
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  c. We are not liable for any delays or damages caused during
                  shipping.{" "}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">
                  6. Returns and Refunds:
                </h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  a. Our returns and refunds policy can be found on our website
                  and applies to eligible products only.
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  b. Products must be returned in their original condition and
                  packaging to be eligible for a refund.{" "}
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  c. Refund will be processed within 3-5 days after receiving
                  actual product.{" "}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">
                  7. Intellectual Property:
                </h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  a. All content on Arrange Free, including but not limited to logos,
                  images, and text, is the property of Arrange Free or its licensors.
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  b. You may not use, reproduce, or distribute any content from
                  our website without explicit permission.{" "}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">
                  8. Prohibited Activities:
                </h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  a. You agree not to engage in any illegal, unauthorized, or
                  abusive activities on Arrange Free.
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  b. You must not attempt to interfere with the proper
                  functioning of our website or compromise its security.{" "}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">9. Privacy Policy:</h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  a. Your privacy is important to us. Our Privacy Policy
                  outlines how we collect, use, and protect your personal
                  information.{" "}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">
                  10. Limitation of Liability:
                </h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  a. Arrange Free and its affiliates shall not be liable for any
                  direct, indirect, incidental, or consequential damages arising
                  from the use or inability to use our services.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">11. Governing Law:</h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  a. These terms and conditions shall be governed by and
                  construed in accordance with the laws of India.{" "}
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  b. Any disputes arising from the use of our services shall be
                  subject to the exclusive jurisdiction of the courts in India.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">
                  12. Changes to Terms and Conditions:
                </h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  a. We reserve the right to update or modify these terms and
                  conditions at any time.
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  b. Any changes will be effective immediately upon posting on
                  our website.
                </p>
              </div>
              <p className="text-sm text-[#027100] font-semibold">
                By using Arrange Free, you acknowledge that you have read, understood,
                and agreed to these terms and conditions. If you have any
                questions or concerns, please contact us at{" "}
                <Link to="mailto:contact@dorfee.com" className="underline italic text-red-900">contact@dorfee.com</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
