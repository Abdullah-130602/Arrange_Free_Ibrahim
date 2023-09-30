import React, { useEffect } from "react";

const ShippingPolicy = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div>
      {/* Shipping Policy */}
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
                Arrange Free's Shipping Policies :
              </p>
            </div>
            <div className="bg-white w-full flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-base text-[#027100] underline">
                  Effective Date: 01/09/2023
                </h1>
                <h1 className="font-bold text-lg">1. Shipping Methods:</h1>
                <p className="text-sm text-gray-700  tracking-wide text-justify">
                  Arrange Free offers a variety of shipping methods to ensure that
                  your furniture reaches you in the most convenient and timely
                  manner. The available shipping options include:
                </p>
                <li className="list-disc text-sm text-black  tracking-wide text-justify">
                  Standard Shipping: Our default shipping method, which provides
                  reliable delivery within a specified timeframe.
                </li>
                <li className="list-disc text-sm text-black  tracking-wide text-justify">
                  Expedited Shipping: For those who need their furniture sooner,
                  we offer expedited shipping at an additional cost.
                </li>
                <li className="list-disc text-sm text-black  tracking-wide text-justify">
                  White Glove Delivery: This premium option includes delivery,
                  assembly, and placement of your furniture in your chosen room.
                </li>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-lg">2. Shipping Regions:</h1>
                <p className="text-sm text-gray-700  tracking-wide text-justify">
                  We currently offer shipping within Pune only. Please note that
                  shipping availability may vary based on your location.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-lg">3. Shipping Costs : </h1>
                <p className="text-sm text-gray-700  tracking-wide text-justify">
                  Shipping costs are calculated based on factors such as the
                  shipping method selected, the destination address, and the
                  size/weight of the furniture items. The exact shipping cost
                  will be displayed at checkout before you complete your
                  purchase.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-lg">
                  4. Estimated Delivery Time:
                </h1>
                <p className="text-sm text-gray-700  tracking-wide text-justify">
                  The estimated delivery time will depend on the shipping method
                  chosen, the availability of the item(s), and the destination.
                  During the checkout process, you will be provided with an
                  estimated delivery range. Please note that unforeseen
                  circumstances, such as weather delays or other logistical
                  issues, may affect the delivery timeframe.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-lg">5. Order Processing Time:</h1>
                <p className="text-sm text-gray-700  tracking-wide text-justify">
                  Once an order is placed, it will undergo processing before
                  shipment. This includes verifying the availability of items,
                  preparing the furniture for shipping, and generating any
                  necessary documentation. Processing times may vary based on
                  the specific items ordered and other factors. You will receive
                  a confirmation email with tracking information once your order
                  has been shipped.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-lg">6. Tracking Your Order:</h1>
                <p className="text-sm text-gray-700  tracking-wide text-justify">
                  For orders that are eligible for shipment, a tracking number
                  will be provided via email once the order has been dispatched.
                  This tracking number will allow you to monitor the progress of
                  your delivery.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-lg">7. Delivery Process:</h1>
                <li className="list-disc text-sm text-black  tracking-wide text-justify">
                  For standard and expedited shipping, your furniture will be
                  delivered to the shipping address provided during checkout.
                </li>
                <li className="list-disc text-sm text-black  tracking-wide text-justify">
                  White Glove Delivery includes assembly and placement of the
                  furniture in the room of your choice. Please ensure that the
                  designated room is ready for assembly and placement.
                </li>
                <li className="list-disc text-sm text-black  tracking-wide text-justify">
                  In-Store Pickup orders can be collected from the specified
                  store location during their operating hours. Please bring a
                  valid ID and your order confirmation email for verification.
                </li>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-lg">
                  8. Damaged or Defective Items:
                </h1>
                <p className="text-sm text-gray-700  tracking-wide text-justify">
                  If you receive furniture that is damaged or defective, please
                  contact our customer service team within 2 days of delivery.
                  We will assist you in arranging a return, replacement, or
                  repair as necessary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
