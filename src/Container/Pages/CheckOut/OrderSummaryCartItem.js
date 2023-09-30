import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import JSConfetti from "js-confetti";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const OrderSummaryCartItem = ({
  applyCoupon,
  CouponValue,
  CouponNotValid,
  setCoupon,
  isLoading,
  cartData,
  subtotal,
  CartMinusQuantity,
  CartAddQuantity,
}) => {
  return (
    <div className="w-full md:w-full lg:w-1/3 xl:w-1/3">
      <div className="md:w-full lg:w-full flex flex-col h-full md:sticky lg:sticky top-28 md:order-2 lg:order-2">
        <div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white order-1 sm:order-2">
          <h2 className="font-semibold text-lg pb-4 tracking-wider">
            Order Summary
          </h2>
          <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 block">
            {cartData &&
              cartData.map((el, i) => {
                return (
                  <div
                    className="group w-full h-auto flex justify-start gap-2 bg-white py-3 px-4 border-b hover:bg-gray-50 transition-all border-gray-100 relative last:border-b-0"
                    key={i}
                  >
                    <Link
                      to={`/single-product/${el.product_id}`}
                      className="w-[100px]"
                    >
                      <img
                        key=""
                        src={
                          process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
                          el.image_path
                        }
                        className="w-[100px] h-[100px] object-cover rounded-lg"
                        alt=""
                      />
                    </Link>
                    <div className="flex flex-col justify-between w-full overflow-hidden">
                      <div>
                        <Link to={`/single-product/${el.product_id}`}>
                          <p
                            // onClick={closeCartDrawer}
                            className="truncate text-base font-bold text-gray-900 text-heading line-clamp-1 tracking-wider"
                          >
                            {el.name}
                          </p>
                        </Link>
                        <span className="text-xs text-gray-400 mb-1 tracking-wider">
                          By {el.brand}{" "}
                          <span className="text-[#027100] font-semibold">
                            Haps pro
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center flex-row-reverse justify-between">
                        <div className="font-bold flex items-center gap-2 text-sm md:text-base text-heading leading-5">
                          <div className="flex items-center font-bold text-sm">
                            {/* <p className="mr-2 hidden md:block lg:block tracking-wider">
                              Qty{" "}
                            </p> */}
                            <div className="flex items-center border-[0.5px] text-black border-gray-800 rounded-md p-0.5">
                              <button
                                onClick={() => CartMinusQuantity(el)}
                                disabled={el.quantity === 1}
                              >
                                <AiOutlineMinus className="text-lg md:text-2xl lg:text-2xl font-semibold mx-1 text-gray-500 hover:text-black" />
                              </button>
                              <span className="text-center text-black px-3 md:px-5 border border-t-white border-b-white border-x-gray-500">
                                {parseInt(el.quantity)}
                              </span>
                              <button onClick={() => CartAddQuantity(el)}>
                                <AiOutlinePlus className="text-lg md:text-2xl lg:text-2xl font-semibold mx-1 text-gray-500 hover:text-black" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="font-bold flex items-center gap-2 text-xs md:text-base text-heading leading-5 tracking-wider">
                          ₹
                          {parseInt(
                            parseInt(el.actual_price) * parseInt(el.quantity) -
                              (parseInt(el.actual_price) *
                                parseInt(el.quantity) *
                                parseInt(el.discounted_percent)) /
                                100
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex items-center mt-4 py-4 lg:py-4 text-sm w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
            <form className="w-full">
              
              <div className="flex flex-col sm:flex-row items-start justify-end relative">
              {CouponNotValid && (
                <div className="text-red-500 text-xs font-semibold error-message mx-2 absolute left-0 -top-4">
                  {CouponNotValid}
                </div>
              )}
                <input
                  type="text"
                  placeholder="Input your coupon code"
                  onChange={(e) => setCoupon(e.target.value)}
                  className="form-input py-2 px-3 md:px-4 w-full appearance-none transition ease-in-out border text-input text-sm rounded-l-lg rounded-r-full h-12 duration-200 bg-white border-gray-200 focus:ring-0 focus:outline-none focus:border-black placeholder-gray-500 placeholder-opacity-75"
                />
                <button
                  onClick={applyCoupon}
                  className="p-1.5 bg-[#FFE342] w-28 md:w-40 text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-[#027100] border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2 absolute right-1 top-1"
                  disabled={isLoading === true}
                >
                  {isLoading ? (
                    <Spin indicator={antIcon} className="text-[#027100]" />
                  ) : (
                    "Apply"
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0 tracking-wider">
            Subtotal
            <span className="ml-auto flex-shrink-0 text-gray-500 font-bold tracking-wider">
              ₹{parseInt(subtotal)}
            </span>
          </div>
          <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0 tracking-wider">
            Shipping Cost
            <span className="ml-auto flex-shrink-0 text-grey-700 font-bold">
              ₹0
            </span>
          </div>
          <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0 tracking-wider">
            Discount
            <span className="ml-auto flex-shrink-0 font-bold text-red-500">
              {CouponValue ? (
                <p className="text-green-600">
                  {CouponValue.coupon_type === "1"
                    ? CouponValue.coupon_type_name + "%"
                    : CouponValue.coupon_type === "2"
                    ? CouponValue.coupon_type_name + "₹"
                    : CouponValue.coupon_type_name}
                </p>
              ) : (
                "Not Applied"
              )}
            </span>
          </div>
          <div className="border-t border-black mt-4">
            <div className="flex items-center font-bold font-sans justify-between pt-5 text-sm uppercase text-black tracking-wider">
              Total
              <span className="font-bold text-lg">
                ₹{" "}
                {CouponValue.coupon_type === "1"
                  ? parseInt(subtotal) -
                    (parseInt(subtotal) *
                      parseInt(CouponValue.coupon_type_name)) /
                      100
                  : CouponValue.coupon_type === "2"
                  ? parseInt(subtotal) - parseInt(CouponValue.coupon_type_name)
                  : parseInt(subtotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCartItem;
