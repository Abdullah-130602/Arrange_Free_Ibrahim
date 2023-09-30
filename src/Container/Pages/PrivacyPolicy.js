import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      {/* Privacy Policy */}
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
                Arrange Free Privacy Policy:
              </p>
            </div>
            <div className="bg-white w-full flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  At Arrange Free, we value your privacy and are committed to
                  protecting your personal information. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your
                  data when you access and use our ecommerce website and
                  services. By using Arrange Free, you consent to the practices
                  described in this policy.
                </p>
                <h1 className="font-bold font-serif">
                  1. Information Collection:
                </h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  a. Personal Information: When you create an account or make a
                  purchase on Arrange Free, we may collect personal information such
                  as your name, email address, shipping address, and payment
                  details.
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  b. Usage Data: We automatically collect certain information
                  about your device and how you interact with our website,
                  including IP address, browser type, and pages visited.
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  c. Cookies and Similar Technologies: Arrange Free uses cookies and
                  similar technologies to enhance your browsing experience and
                  analyze usage patterns. You can manage cookie preferences
                  through your browser settings.{" "}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">2. Use of Information:</h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  a. Order Fulfillment: We use your personal information to
                  process and fulfill your orders, deliver products, and provide
                  customer support.
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  b. Website Improvement: Usage data helps us understand how our
                  website is used, enabling us to improve its performance,
                  functionality, and user experience.{" "}
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  c. Marketing Communication: With your consent, we may send you
                  promotional emails or updates about our products, services,
                  and special offers. You can opt-out of marketing
                  communications at any time.{" "}
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  d. Legal Compliance: We may use your information to comply
                  with legal obligations and enforce our terms and conditions.{" "}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">3. Data Sharing : </h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  a. Third-Party Service Providers: We may share your
                  information with trusted third-party service providers to
                  assist us in operating our website and services (e.g., payment
                  processors, shipping companies).
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  b. Business Transfers: In the event of a merger, acquisition,
                  or sale of Arrange Free, your information may be transferred as part
                  of the transaction.{" "}
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  c. Legal Requirements: We may disclose your information if
                  required by law or to protect our rights, safety, or the
                  rights and safety of others.{" "}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">4. Data Security:</h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  a. Arrange Free employs industry-standard security measures to
                  protect your personal information from unauthorized access,
                  alteration, or disclosure.
                </p>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  b. While we take reasonable precautions, no data transmission
                  over the internet is completely secure. We cannot guarantee
                  the absolute security of your information.{" "}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">5. Children's Privacy:</h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  Arrange Free is not intended for use by children under the age of
                  18. We do not knowingly collect personal information from
                  individuals under 18 years old. If you are a parent or
                  guardian and believe your child has provided us with their
                  data, please contact us to have it removed.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">
                  6. Links to Third-Party Websites:
                </h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  Our website may contain links to third-party sites. We are not
                  responsible for the privacy practices or content of these
                  sites. We encourage you to review the privacy policies of any
                  external sites you visit.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">7. Your Rights:</h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  You have the right to access, update, correct, and delete your
                  personal information. You can exercise these rights by logging
                  into your account or contacting us at [Contact Email/Phone].
                  We will respond to your requests within a reasonable
                  timeframe.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">
                  8. Changes to Privacy Policy:
                </h1>
                <p className="text-sm text-gray-700 font-semibold tracking-wide text-justify">
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or for other operational, legal, or
                  regulatory reasons. The revised policy will be effective
                  immediately upon posting on our website.
                </p>
              </div>
              <p className="text-sm text-[#027100] font-semibold">
                If you have any questions or concerns regarding our Privacy
                Policy, please contact us at{" "}
                <Link
                  to="mailto:contact@Arrange Free.com"
                  className="underline italic text-red-900"
                >
                  contact@Arrange Free.com
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Product Warranty Policy */}
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
                Arrange Free Product Warranty Policy:
              </p>
            </div>
            <div className="">
              <div className="bg-white p-5 w-full flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-600 font-semibold">
                    At Arrange Free.com, we are committed to delivering furniture
                    products of the highest quality to our valued customers. We
                    take great pride in the craftsmanship and materials used in
                    our products, and we stand behind their durability and
                    performance. To demonstrate our confidence in the
                    reliability of our furniture, we offer a comprehensive
                    Product Warranty Policy.
                  </p>
                  <h1 className="font-bold font-serif">
                    1. Warranty Coverage:
                  </h1>
                  <p className="text-sm text-gray-600 font-semibold">
                    Our product warranty covers manufacturing defects in
                    materials and workmanship for a specified period from the
                    date of purchase. The duration of the warranty may vary
                    depending on the type of product, and specific details are
                    outlined in the product documentation accompanying your
                    purchase.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-bold font-serif">
                    2. What the Warranty Covers:
                  </h1>
                  <p className="text-sm text-gray-600 font-semibold">
                    The warranty covers any defects that arise during the normal
                    use of the furniture, resulting from faulty materials or
                    workmanship. These defects may include, but are not limited
                    to, structural issues, broken parts, or problems with the
                    product's functionality.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-bold font-serif">
                    3. What the Warranty Does Not Cover:
                  </h1>
                  <p className="text-sm text-gray-600 font-semibold">
                    It is essential to understand that our warranty does not
                    cover damage caused by misuse, abuse, neglect, or accidents.
                    Additionally, normal wear and tear resulting from regular
                    use are not covered under the warranty. Any modifications or
                    alterations made to the product without our authorization
                    may also void the warranty.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-bold font-serif">
                    4. Making a Warranty Claim:
                  </h1>
                  <p className="text-sm text-gray-600 font-semibold">
                    If you believe that your product has a manufacturing defect
                    covered by the warranty, please follow these steps to
                    initiate a warranty claim:.
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    a. Contact Customer Support: Get in touch with our customer
                    support team as soon as you notice the issue. You can reach
                    us through our website, email, or phone, and our
                    representatives will guide you through the claim process.
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    b. Provide Information: To process your claim efficiently,
                    we may request details such as your order number, product
                    serial number (if applicable), a description of the defect,
                    and supporting photographs.
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    c. Evaluation: Once we receive the necessary information, we
                    will evaluate your claim to determine if the issue falls
                    within the scope of the warranty.
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    d. Resolution: If your claim is approved, we will work with
                    you to find an appropriate resolution. This may include
                    repairing the product, providing replacement parts, or
                    offering a replacement product of equal value.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-bold font-serif">
                    5. Limitations and Rights:
                  </h1>
                  <p className="text-sm text-gray-600 font-semibold">
                    Our warranty policy gives you specific legal rights, and you
                    may have additional rights that vary depending on local
                    laws. The warranty is non-transferable and applies only to
                    the original purchaser of the product.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-bold font-serif">6. Exclusions:</h1>
                  <p className="text-sm text-gray-600 font-semibold">
                    To the extent permitted by law, Arrange Free.com disclaims all
                    other warranties, expressed or implied, including any
                    warranty of merchantability or fitness for a particular
                    purpose. Our liability is limited to the repair or
                    replacement of defective products as outlined in this
                    warranty policy..
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-bold font-serif">
                    7. Updates to the Warranty Policy:
                  </h1>
                  <p className="text-sm text-gray-600 font-semibold">
                    We may update our Product Warranty Policy from time to time
                    to reflect changes in our practices or to comply with legal
                    requirements. Any revisions will be posted on our website,
                    and the updated policy will apply to products purchased
                    after the effective date of the changes.
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    If you have any questions or need assistance with a warranty
                    claim, please contact our customer support team. We are
                    dedicated to providing you with outstanding service and
                    ensuring your satisfaction with our products. Your trust in
                    Arrange Free.com is of utmost importance to us, and we are here to
                    support you throughout your ownership of our furniture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Arrange Free Return And Refund Policy */}
      <div className="my-10">
        <div className="flex flex-col max-w-5xl mx-auto overflow-hidden rounded">
          <img
            src="/privacy.jpg"
            alt=""
            className="w-full h-80 sm:h-96 object-cover rounded-xl"
          />
          <div className="p-6 pb-12 m-4 mx-auto -mt-16  sm:px-10 sm:mx-12 lg:rounded-md bg-white rounded-lg shadow-lg">
            <div className="space-y-2">
              <p className="mb-4 text-2xl font-semibold sm:text-3xl">
                Arrange Free Return and Refund Policy:
              </p>
            </div>
            <div className="bg-white p-5 w-full flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-600 font-semibold">
                  At Arrange Free.com, we want you to be completely satisfied with
                  your furniture purchase. We understand that sometimes a
                  product may not meet your expectations or may arrive with an
                  issue. To ensure a hassle-free shopping experience, we have a
                  transparent and customer-friendly Return and Refund Policy.
                </p>
                <h1 className="font-bold font-serif">
                  1. Eligibility for Returns:
                </h1>
                <p className="text-sm text-gray-600 font-semibold">
                  a. Damaged or Defective Products: If your product arrives
                  damaged or has a manufacturing defect, you are eligible for a
                  return or replacement within a specified period from the date
                  of delivery. Please report the issue to our customer support
                  team immediately upon receipt.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">2. Return Process:</h1>
                <p className="text-sm text-gray-600 font-semibold">
                  a. Contact Customer Support: To initiate a return, please get
                  in touch with our customer support team. You can reach us
                  through our website, email, or phone. Our representatives will
                  guide you through the return process and provide you with a
                  return authorization (RA) number.
                </p>
                <p className="text-sm text-gray-600 font-semibold">
                  b. Pack the Product: Carefully pack the product in its
                  original packaging, including all accessories, manuals, and
                  promotional items, if applicable. Please ensure that the item
                  is adequately protected to prevent damage during transit.
                </p>
                <p className="text-sm text-gray-600 font-semibold">
                  c. Ship the Product: Once you have the RA number and have
                  properly packed the product, arrange for its return shipping.
                  The cost of return shipping may be borne by you, or in some
                  cases, we may provide a prepaid shipping label.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">
                  3. Evaluation of Returned Products:
                </h1>
                <p className="text-sm text-gray-600 font-semibold">
                  Upon receiving the returned product, our quality assurance
                  team will inspect it to verify its condition and confirm if it
                  meets the eligibility criteria for a refund or replacement.
                </p>
                <p className="text-sm text-gray-600 font-semibold">
                  a. Damaged or Defective Products: If the product is confirmed
                  to have arrived damaged or to have a manufacturing defect, we
                  will offer a replacement or issue a full refund, including any
                  shipping charges you may have paid.
                </p>
                <p className="text-sm text-gray-600 font-semibold">
                  b. Change of Mind Returns: For products returned due to a
                  change of mind, a restocking fee may apply, and the refund
                  amount will exclude the initial shipping charges (if any).
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">4. Refund Process:</h1>
                <p className="text-sm text-gray-600 font-semibold">
                  a. Timeframe: Once the returned product is evaluated and
                  approved for a refund, we will process the refund within a
                  reasonable timeframe. Please note that the time it takes for
                  the refund to reflect in your account may vary depending on
                  your payment method and financial institution.
                </p>
                <p className="text-sm text-gray-600 font-semibold">
                  b. Refund Method: Refunds will be issued using the same
                  payment method used for the original purchase. If the original
                  payment method is unavailable, we may use an alternate method
                  after obtaining your consent.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">
                  5. Non-Returnable Items:
                </h1>
                <p className="text-sm text-gray-600 font-semibold">
                  Certain items, such as personalized or custom-made products,
                  clearance items, and gift cards, may not be eligible for
                  return or refund. Please check the product details and
                  specifications to determine if a product falls under the
                  non-returnable category.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold font-serif">
                  6. Updates to the Return and Refund Policy:
                </h1>
                <p className="text-sm text-gray-600 font-semibold">
                  We may update our Return and Refund Policy from time to time
                  to reflect changes in our practices or to comply with legal
                  requirements. Any revisions will be posted on our website, and
                  the updated policy will apply to products purchased after the
                  effective date of the changes.
                </p>
                <p className="text-sm text-gray-600 font-semibold">
                  If you have any questions or need assistance with a return or
                  refund, please contact our customer support team. We are
                  committed to ensuring your satisfaction and are here to assist
                  you throughout the process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
