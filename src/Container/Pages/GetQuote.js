import React from "react";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { LoadingOutlined } from "@ant-design/icons";
import { Divider, Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function GetQuote() {
  const [isLoading, setIsLoading] = useState(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [Message, setMessage] = useState("");
  const [NameError, setNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [ContactError, setContactError] = useState("");
  const [MessageError, setMessageError] = useState("");
  const [successMessage, setsuccessMessage] = useState(false);

  const ReadyProduct = [
    {
      img: "https://images.unsplash.com/photo-1537726235470-8504e3beef77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      name: "Demo Text",
    },
    {
      img: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      name: "Demo Text",
    },
    {
      img: "https://images.unsplash.com/photo-1560185008-b033106af5c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      name: "Demo Text",
    },
  ];
  const OtherProduct = [
    {
      img: "/images/social/int1.jpeg",
    },
    {
      img: "/images/social/int1.jpeg",
    },
    {
      img: "/images/social/int1.jpeg",
    },
    {
      img: "/images/social/int1.jpeg",
    },
  ];
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const sendMessage = async (e) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setContactError("");
    setMessageError("");
    if (Name === "") {
      setNameError("Enter Your Name");
    } else if (Email === "") {
      setEmailError("Enter Your Email Address");
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      setEmailError("Email is invalid");
    } else if (Contact === "") {
      setContactError("Enter Your Contact Number");
    } else if (!/^\d{10}$/.test(Contact)) {
      setContactError("Mobile Number is nvalid");
    } else if (Message === "") {
      setMessageError("Enter Your Querry");
    } else {
      setIsLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: Name,
        contact_number: Contact,
        email_id: Email,
        message: Message,
        status: "1",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        "https://hapspro.com/main-backend/customer/contact-us/query",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            setsuccessMessage(true);
            setName("");
            setEmail("");
            setContact("");
            setMessage("");
            setIsLoading(false);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };
  return (
    <>
      {/* <div className="relative error-message my-10  gap-5 mx-5 md:mx-5 lg:mx-10 xl:mx-10 grid xl:grid-cols-[30%,auto] lg:grid-cols-[30%,auto] md:lg:grid-cols-[30%,auto] sm:lg:grid-cols-[30%,auto]">
        <div className="w-full ">
          <div className="p-5 shadow-3xl rounded-2xl bg-white shadow-2xl">
            {successMessage && (
              <div className="bg-gradient-to-r from-[#e7eff9] to-[#cfd6e6] w-full error-message rounded border flex justify-between items-center">
                <p className="font-semibold text-black p-2 text-sm">
                  <span className="text-green-500">
                    Your Message Has Been Successfully Submitted!
                  </span>
                  <br /> Our Team Will Respond You Shortly.. :)
                </p>
                <div className="mr-3">
                  <RxCross2
                    onClick={() => setsuccessMessage(false)}
                    size={30}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            )}
            <p className="text-lg text-center font-serif font-[500]">
              Contact To Dorfee
            </p>
            <p className="font-semibold text-gray-700 text-sm text-center">
              Get In Touch With Us - We're Here To Help!
            </p>
            <div className="my-3">
              <form>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="floating_email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#027100] peer"
                    placeholder=" "
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#027100] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Enter Your Name
                  </label>
                  {NameError && (
                    <div className="text-xs text-red-500 font-semibold error-message">
                      {NameError}
                    </div>
                  )}
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="email"
                    name="floating_password"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#027100] peer"
                    placeholder=" "
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#027100] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Enter Your Email Address
                  </label>
                  {EmailError && (
                    <div className="text-xs text-red-500 font-semibold error-message">
                      {EmailError}
                    </div>
                  )}
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    name="repeat_password"
                    id="floating_repeat_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#027100] peer otp-input"
                    placeholder=" "
                    value={Contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="floating_repeat_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#027100] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Enter Your Contact Number
                  </label>
                  {ContactError && (
                    <div className="text-xs text-red-500 font-semibold error-message">
                      {ContactError}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-500"
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Leave a comment..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={Message}
                  />
                  {MessageError && (
                    <div className="text-xs text-red-500 font-semibold error-message">
                      {MessageError}
                    </div>
                  )}
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="text-white bg-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center mt-2"
                    disabled={isLoading === true}
                    onClick={sendMessage}
                  >
                    {isLoading ? (
                      <Spin indicator={antIcon} className="text-white" />
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 gap-y-5 md:gap-y-5 lg:gap-y-14 xl:gap-y-14">
          {OtherProduct &&
            OtherProduct.map((e, index) => {
              return <img key={index} src={e.img} className="w-full" />;
            })}
        </div>
      </div> */}
      <section className="bg-white">
        <div className="flex justify-between flex-col md:flex-col lg:flex-row max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16">
          <div className="mr-auto place-self-center lg:col-span-7 flex justify-center">
            <div>
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                Contact To Arrange Free
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
                Feel free to get in touch with us anytime – we're here to help
                you with any questions, suggestions, or inquiries you may have
                about our home interior products. Whether you're seeking design
                inspiration, need assistance with an order, or want to
                collaborate with us, our team is ready to assist you. Contact us
                today, and let's create beautiful spaces together.
              </p>
              <div className="flex items-center gap-5">
                <img
                  src="/images/social/appStore.jpeg"
                  alt=""
                  className="h-[50px] w-[150px] object-contain cursor-pointer transition-all ease-in-out duration-700 hover:scale-105"
                  onClick={() =>
                    window.open(
                      "https://apps.apple.com/in/app/dorfee/id6462861358"
                    )
                  }
                />
                <img
                  src="/images/social/googlePlay.jpeg"
                  alt=""
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.arrange_free"
                    )
                  }
                  className="h-[50px] w-[150px] object-contain cursor-pointer transition-all ease-in-out duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:flex">
            <div className="p-5 shadow-3xl rounded-2xl bg-white  shadow-sm w-[500px]">
              {successMessage && (
                <div className="bg-gradient-to-r from-[#e7eff9] to-[#cfd6e6] w-full error-message rounded border flex justify-between items-center">
                  <p className="font-semibold text-black p-2 text-sm">
                    <span className="text-green-500">
                      Your Message Has Been Successfully Submitted!
                    </span>
                    <br /> Our Team Will Respond You Shortly.. :)
                  </p>
                  <div className="mr-3">
                    <RxCross2
                      onClick={() => setsuccessMessage(false)}
                      size={30}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              )}
              <p className="text-lg text-center font-serif font-[500]">
                Contact To Arrange Free
              </p>
              <p className="font-semibold text-gray-700 text-sm text-center">
                Get In Touch With Us - We're Here To Help!
              </p>
              <div className="my-3">
                <form>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="floating_email"
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#027100] peer"
                      placeholder=" "
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#027100] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Enter Your Name
                    </label>
                    {NameError && (
                      <div className="text-xs text-red-500 font-semibold error-message">
                        {NameError}
                      </div>
                    )}
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="email"
                      name="floating_password"
                      id="floating_password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#027100] peer"
                      placeholder=" "
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label
                      htmlFor="floating_password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#027100] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Enter Your Email Address
                    </label>
                    {EmailError && (
                      <div className="text-xs text-red-500 font-semibold error-message">
                        {EmailError}
                      </div>
                    )}
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="number"
                      name="repeat_password"
                      id="floating_repeat_password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#027100] peer otp-input"
                      placeholder=" "
                      value={Contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                    />
                    <label
                      htmlFor="floating_repeat_password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#027100] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Enter Your Contact Number
                    </label>
                    {ContactError && (
                      <div className="text-xs text-red-500 font-semibold error-message">
                        {ContactError}
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-500"
                    >
                      Your message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline outline-[#027100]"
                      placeholder="Leave a comment..."
                      onChange={(e) => setMessage(e.target.value)}
                      value={Message}
                    />
                    {MessageError && (
                      <div className="text-xs text-red-500 font-semibold error-message">
                        {MessageError}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center items-center mt-4">
                    <button
                      type="submit"
                      className="p-2 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-[#027100] border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                      disabled={isLoading === true}
                      onClick={sendMessage}
                    >
                      {isLoading ? (
                        <Spin indicator={antIcon} className="text-white" />
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-t from-[#e7eff9] to-[#fff] border py-5 mx-5 md:mx-5 lg:mx-10 xl:mx-10 rounded-2xl">
        <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row justify-around items-center">
          <img src="https://dorfee.com/images/contact/truck.png" alt="" />
          <div>
            <p className="text-[20px] md:text-[20px] lg:text-[40px] xl:text-[40px] leading-[48px] font-[500] text-center">
              Let’s get in touch and get your
            </p>
            <p className="text-[25px] md:text-[20px] lg:text-[64px] xl:text-[64px] leading-[77px] font-[700] text-center">
              Same Day Delivery
            </p>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-200 mx-20 my-5" />
      <div className="bg-white rounded-2xl m-5 md:m-8 lg:m-10 xl:m-10 error-message p-10">
        <div className="navName text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-serif font-[500] uppercase text-center">
          Ready Product
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 xl:gap-5 lg:gap-5 sm:gap-3 md:gap-3">
          {ReadyProduct.map((el, index) => {
            return (
              <div key={index} className="flex justify-center my-5">
                <div>
                  <img src={el.img} alt="" />
                  {/* <p className="text-lg text-center font-serif font-[500]">
                    {el.name}
                  </p> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <hr className="border-t border-gray-200 mx-20 my-5" /> */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-12 lg:flex lg:h-1/2 lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Explore our app!
              <strong className="font-extrabold text-red-700 sm:block">
                Download now!
              </strong>
            </h1>
            <p className="mt-4 sm:text-xl/relaxed">
              Discover our mobile app for the best home interior experience!
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex justify-center items-center gap-5">
                <img
                  src="/images/social/appStore.jpeg"
                  alt=""
                  className="h-[50px] w-[150px] object-contain cursor-pointer transition-all ease-in-out duration-700 hover:scale-105"
                  onClick={() =>
                    window.open(
                      "https://apps.apple.com/in/app/dorfee/id6462861358"
                    )
                  }
                />
                <img
                  src="/images/social/googlePlay.jpeg"
                  alt=""
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.arrange_free"
                    )
                  }
                  className="h-[50px] w-[150px] object-contain cursor-pointer transition-all ease-in-out duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GetQuote;
