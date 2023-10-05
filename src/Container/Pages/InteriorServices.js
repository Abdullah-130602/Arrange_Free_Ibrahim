import React, { useEffect, useState } from "react";
// import "flickity/css/flickity.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Modal, Spin } from "antd";
import { RxCross2 } from "react-icons/rx";
import { LoadingOutlined } from "@ant-design/icons";
import { FaAngleDoubleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import Heading from "../../Components/Heading/Heading";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function IntriorServices() {
  const [isLoading, setIsLoading] = useState(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [Message, setMessage] = useState("");

  //   Error Hooks
  const [NameError, setNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [ContactError, setContactError] = useState("");
  const [MessageError, setMessageError] = useState("");
  const [visibleImages, setVisibleImages] = useState(4);
  const [OpenModal, setOpenModal] = useState(false);

  const Card = [
    {
      img: "public/uploads/designers/d502e6d68838d30c99f01694497548.jpeg",
      title: "Affordable Prices",
      body: `Affordable Prices: Highlight that your interior design services are budget-friendly without compromising on quality. Use phrases like "Luxury Design, Affordable Prices" or "Elegant Interiors, Wallet-Friendly Rates".`,
    },
    {
      img: "public/uploads/designers/abc257ae23f9f5d8d0ab1694497606.jpeg",
      title: "Fast Turnaround",
      body: `Quick Turnaround: Emphasize your efficiency by stating that you deliver projects in the shortest timeline possible. Use phrases like "Rapid Design Transformation" or "Fast-Track Interiors."`,
    },
    {
      img: "public/uploads/designers/112e33a86433dfc9c7501694497628.jpeg",
      title: "Customized Solutions",
      body: `Customized Solutions: Mention that you offer personalized interior design solutions tailored to each client's unique needs and preferences. Phrases like "Your Vision, Our Expertise" or "Designs as Unique as You" can convey this message.`,
    },
    {
      img: "public/uploads/designers/fe974c33b24e40e018ea1694497646.jpeg",
      title: "Experienced Designers",
      body: `Experienced Designers: Highlight the expertise of your design team. Mention the years of experience and their qualifications to build trust with potential clients. Use phrases like "Experienced Designers Crafting Excellence" or "Masters of Design at Your Service."`,
    },
    {
      img: "public/uploads/designers/de8185c438940eec5bad1694497664.jpeg",
      title: "Attention to Detail",
      body: `Attention to Detail: Express your commitment to perfection and the meticulous attention you give to every detail of the design process. Phrases like "Detail-Oriented Design" or "Perfection in Every Corner" can illustrate this aspect.`,
    },
    {
      img: "public/uploads/designers/add71386e14c469e477f1694497684.jpeg",
      title: "Quality Materials",
      body: `Quality Materials: Mention that you use high-quality materials and furnishings to ensure long-lasting and visually stunning interiors. Phrases like "Premium Materials, Timeless Design" or "Quality Craftsmanship, Lasting Beauty" can convey this message.`,
    },
  ];
  const LowerCard = [
    {
      img: "public/uploads/designers/809d9bef83267c4dc3f71694497710.jpeg",
    },
    {
      img: "public/uploads/designers/ba6c7b68e0a1fee314be1694497735.jpeg",
    },
    {
      img: "public/uploads/designers/4f3e5605f7fc02d2c2681694497753.jpeg",
    },
    {
      img: "public/uploads/designers/249478e16a062cca773e1694497777.jpeg",
    },
    {
      img: "public/uploads/designers/f8580467ab356fb7af901694497802.jpeg",
    },
    {
      img: "public/uploads/designers/771b26af82f87b2de1ae1694497826.jpeg",
    },
    {
      img: "public/uploads/designers/b24447b1afd211ab9f291694497870.jpeg",
    },
    {
      img: "public/uploads/designers/c62c304180b25aabb6331694497991.jpeg",
    },
    {
      img: "public/uploads/designers/dea94128be278a1ff9471694498007.jpeg",
    },
    {
      img: "public/uploads/designers/01d9c5e5efb6e7c3158b1694498020.jpeg",
    },
    {
      img: "public/uploads/designers/85de6efb3af9396059081694498047.jpeg",
    },

    {
      img: "public/uploads/designers/a9f601cc04e0a4a7e1ec1694498059.jpeg",
    },
    {
      img: "public/uploads/designers/8e4bf31830a1afcbd3751694498074.jpeg",
    },
    {
      img: "public/uploads/designers/8992cb03c99a10b063a31694498094.jpeg",
    },
    {
      img: "public/uploads/designers/1f788840592f854108501694498110.jpeg",
    },
  ];
  // const Carusel = [
  //   {
  //     img: banner,
  //   },
  //   // {
  //   //   img: "public/uploads/designers/6dc32a408426d1e8f2591694497889.jpeg",
  //   // },
  //   // {
  //   //   img: "public/uploads/designers/771b26af82f87b2de1ae1694497826.jpeg",
  //   // },
  //   // {
  //   //   img: "public/uploads/designers/654b4291bb5d964a14801694497953.jpeg",
  //   // },
  //   // {
  //   //   img: "public/uploads/designers/baf2abad8ac4b51f876a1694497974.jpeg",
  //   // },
  //   // {
  //   //   img: "public/uploads/designers/1f788840592f854108501694498110.jpeg",
  //   // },
  // ];
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const [successMessage, setsuccessMessage] = useState(false);

  const sendMessage = async () => {
    // e.preventDefault();
    setNameError("");
    setEmailError("");
    setContactError("");
    setMessageError("");
    if (Name === "") {
      setNameError("Enter Your Name");
    } else if (Email === "") {
      setEmailError("Enter Your Email Address");
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      setEmailError("Email Is Invalid");
    } else if (Contact === "") {
      setContactError("Enter Your Contact Number");
    } else if (!/^\d{10}$/.test(Contact)) {
      setContactError("Mobile Number is Invalid");
    } else {
      await setIsLoading(true);
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
        process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "interior/contactUs",
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

  const loadMoreImages = () => {
    setVisibleImages((prevVisibleImages) => prevVisibleImages + 4);
  };

  const Testimonials = [
    {
      name: "Ananya Verma",
      number: 5,
      desc: "The interior designs created by this company are truly exceptional. I was amazed by the level of creativity and attention to detail. They've set a new standard for interior design.",
    },
    {
      name: "Priya Sharma",
      number: 4,
      desc: "I'm thoroughly impressed by the interior design work of this company. They have a unique ability to transform spaces into works of art. I couldn't be happier with the results.",
    },
    {
      name: "Neha Patel",
      number: 5,
      desc: "This company's interior design expertise is remarkable. They have a keen eye for aesthetics and functionality. My home has been beautifully transformed thanks to their talent.",
    },
    {
      name: "Riya Gupta",
      number: 4,
      desc: "I'm so pleased with the interior design services provided by this company. Their designs are both elegant and functional, creating spaces that are both visually stunning and comfortable.",
    },
    {
      name: "Sneha Verma",
      number: 5,
      desc: "The interior design solutions offered by this company are top-notch. Their work speaks for itself, and I'm proud to showcase their designs in my home. Highly recommended!",
    },
    {
      name: "Rahul Kumar",
      number: 5,
      desc: "I have had the pleasure of working with this company, and I must say their interior design solutions are outstanding. Their attention to detail and creativity are truly commendable.",
    },
    {
      name: "Arjun Singh",
      number: 5,
      desc: "I couldn't be more satisfied with the interior design services provided by this company. They have transformed my space into something truly extraordinary, and I'm extremely grateful.",
    },
  ];

  return (
    <div className="bg-white">
      <Modal
        open={OpenModal ? true : false}
        width={1250}
        footer=""
        onCancel={() => setOpenModal(false)}
        className="absolte top-2 "
      >
        <div className="mt-5 flex justify-center items-center">
          <img
            src={`https://main-backend.hapspro.com/` + OpenModal}
            style={{ width: "100%" }}
            alt=""
          />
        </div>
      </Modal>
      <div
        style={{
          position: "relative",
        }}
      >
        <img src="./banner.jpg" className="w-full object-cover" alt="" />
        <Link
          to="/"
          className="absolute top-0 h-[50px] w-[60px] lg:h-[153.5px] lg:w-[280px] md:h-[130px] md:w-[180px] "
        />
        {/* First Form */}
        <div className="hidden md:hidden lg:block w-full xl:px-8 lg:w-[80%] xl:w-[60%] absolute top-[24%] md:top-[24%] lg:top-[20%] 2xl:top-[24%] left-[7%] z-50">
          <div className="bg-white rounded shadow-2xl p-7 sm:p-10 lg:p-4 2xl:p-7 flex justify-between items-center w-full">
            <div className="relative">
              <img
                src={
                  "https://main-backend.hapspro.com/" +
                  "public/uploads/Offers/0ff9780a960e013f134e1694777264.jpeg"
                }
                alt=""
              />
              <div className="flex items-center gap-5 absolute top-0">
                <div className="p-2 py-3 border border-[#027100] bg-yellow-100 font-serif font-bold tracking-wide text-[#027100]">
                  Book before Ganesh Festival end!
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                <p className="text-2xl text-[#027100]">Avail 30% Discount</p>
                <p className="text-gray-700 text-sm text-justify indent-10 mt-3">
                  Take advantage of our exclusive offer! To unlock this
                  fantastic 30% discount, simply fill out the form below. Once
                  submitted, we'll send you a special coupon code via SMS that
                  you can use. Don't miss out on this opportunity to save big!
                </p>
              </h3>
              {successMessage && (
                <div className="bg-gradient-to-r mb-5 from-green-100 to-[#ffe342] w-full error-message rounded border border-[#027100] flex justify-between items-center">
                  <p className="font-semibold text-black p-2 text-sm">
                    <span className="text-green-500">
                      Your request has been successfully submitted!
                    </span>
                    <br /> Your 30% discount coupon code will be sent to you via
                    SMS shortly.
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
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer font-semibold"
                  placeholder=""
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer font-semibold"
                  placeholder=" "
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label
                  htmlFor="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer font-semibold otp-input"
                  placeholder=" "
                  value={Contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
                <label
                  htmlFor="floating_repeat_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Enter Your Contact Number
                </label>
                {ContactError && (
                  <div className="text-xs text-red-500 font-semibold error-message">
                    {ContactError}
                  </div>
                )}
              </div>
              <div className="mt-4 mb-2 sm:mb-4">
                <button
                  type="submit"
                  className="p-2 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-[#027100] border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                  onClick={sendMessage}
                >
                  {isLoading ? (
                    <Spin indicator={antIcon} className="text-white" />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Second Form */}
      <div className="block md:block lg:hidden w-full max-w-xl xl:px-8 xl:w-5/12">
        <div className="bg-white rounded p-7 sm:p-10">
          <div className="relative">
            <img
              src={
                "https://main-backend.hapspro.com/" +
                "public/uploads/Offers/0ff9780a960e013f134e1694777264.jpeg"
              }
              alt=""
            />
            <div className="flex items-center gap-5 absolute bottom-0 left-8">
              <div className="p-2 py-3 border border-[#027100] bg-yellow-100 font-serif font-bold tracking-wide text-[#027100]">
                Book before Ganesh Festival end!
              </div>
            </div>
          </div>
          <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl mt-2">
            <p className="text-2xl text-[#027100]">Avail 30% Discount</p>
            <p className="text-gray-700 text-sm text-justify indent-10 mt-3">
              Take advantage of our exclusive offer! To unlock this fantastic
              30% discount, simply fill out the form below. Once submitted,
              we'll send you a special coupon code via SMS that you can use on
              your next purchase. Don't miss out on this opportunity to save
              big!
            </p>
          </h3>
          <p className="text-[#027100] font-semibold text-xs tracking-widest">
            Fill the form below
          </p>
          {successMessage && (
            <div className="bg-gradient-to-r mb-5 from-green-100 to-[#ffe342] w-full error-message rounded border border-[#027100] flex justify-between items-center">
              <p className="font-semibold text-black p-2 text-sm">
                <span className="text-green-500">
                  Your request has been successfully submitted!
                </span>
                <br /> Your 30% discount coupon code will be sent to you via SMS
                shortly.
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
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer font-semibold"
              placeholder=""
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer font-semibold"
              placeholder=" "
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer font-semibold otp-input"
              placeholder=" "
              value={Contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
            <label
              htmlFor="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Contact Number
            </label>
            {ContactError && (
              <div className="text-xs text-red-500 font-semibold error-message">
                {ContactError}
              </div>
            )}
          </div>
          {/* <div>
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
          </div> */}
          <div className="mt-4 mb-2 sm:mb-4">
            <button
              type="submit"
              className="p-2 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-[#027100] border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
              onClick={sendMessage}
            >
              {isLoading ? (
                <Spin indicator={antIcon} className="text-white" />
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </div>
        <hr className="mx-7" />
      </div>
      <div className="mt-8">
        <div className="text-center text-4xl font-semibold">Why Choose Us</div>
      </div>
      <div className="xl:mx-10 lg:mx-10 sm:mx-1">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={15}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            1000: {
              slidesPerView: 5,
            },
          }}
          scrollbar={{ draggable: true }}
          className="flex justify-center items-center"
        >
          <div className="flex justify-center items-center flex-col xl:mx-10 lg:mx-10 sm:mx-1">
            {Card.map((el, index) => {
              return (
                <SwiperSlide
                  className="my-10"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    key={index}
                    className="w-[350px] h-[350px] bg-white shadow-md rounded-lg"
                  >
                    <div
                      style={{
                        position: "relative",
                        paddingTop: "50%",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={`https://main-backend.hapspro.com/` + el.img}
                        alt=""
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderTopLeftRadius: "8px",
                          borderTopRightRadius: "8px",
                        }}
                      />
                    </div>
                    <div className="px-3 my-2">
                      <p className="text-lg text-justify font-bold text-[#027100]">
                        {el.title}
                      </p>
                      <p className="text-sm text-start tracking-wide text-gray-700">
                        {el.body}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
      <div className="my-5 md:my-10">
        <Heading spanHeading={`what our customer says`} />
        <div className="flex justify-center my-5">
          <iframe
            // width="560"
            // height="315"
            src="https://www.youtube.com/embed/Y3ZiYp_DEBg?si=XiGWi8HRh4aB_dLW"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 h-[300px] md:h-[600px]"
          ></iframe>
        </div>
      </div>
      <hr className="mx-7 md:mx-20" />
      <div className="mt-10 mb-3">
        <div className="text-center text-4xl font-semibold">
          Portfolio Showcase
        </div>
        <p className="text-center xl:mx-24 lg:mx-24 sm:mx-5 md:mx-10 lg:text-xl xl:lg:text-xl md:lg:text-xl sm:text-sm text-gray-600">
          Portfolio Showcase: Display images of some of your completed projects
          to showcase your design style and versatility. Use captions like
          "Diverse Design Portfolio" or "Our Work Speaks for Itself."
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {LowerCard.slice(0, visibleImages).map((el, index) => (
          <div
            key={index}
            className="mb-4"
            onClick={() => setOpenModal(el.img)}
          >
            <img
              className="h-auto max-w-full rounded-lg"
              src={`https://main-backend.hapspro.com/` + el.img}
              alt=""
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {visibleImages < LowerCard.length && (
        <div className="flex justify-center items-center mt-4">
          <div className="">
            <div className="flex justify-center">
              <FaAngleDoubleDown className="text-3xl animate-bounce text-[#027100]" />
            </div>
            <div
              className="text-center text-sm font-semibold cursor-pointer hover:underline"
              onClick={loadMoreImages}
            >
              View More
            </div>
          </div>
        </div>
      )}
      <div className="mt-10 mb-3">
        <div className="text-center text-4xl font-semibold">
          Client Testimonials
        </div>
        <p className="text-center xl:mx-24 lg:mx-24 sm:mx-5 md:mx-10 lg:text-xl xl:lg:text-xl md:lg:text-xl sm:text-sm text-gray-600">
          Client Testimonials: If you have positive feedback from previous
          clients, include a few short testimonials to build credibility. Quotes
          like "Absolutely thrilled with the results!" or "Exceeded our
          expectations!" can be effective
        </p>
        <div className="xl:mx-10 lg:mx-10 sm:mx-1">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={15}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              1000: {
                slidesPerView: 5,
              },
            }}
            scrollbar={{ draggable: true }}
            className="flex justify-center items-center"
          >
            <div className="flex justify-center items-center flex-col xl:mx-10 lg:mx-10 sm:mx-1">
              {Testimonials.map((test, a) => {
                return (
                  <SwiperSlide
                    className="my-10"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={a}
                  >
                    <blockquote class="flex h-auto rounded-lg flex-col justify-between bg-white p-6 shadow-sm border sm:p-8 lg:p-12">
                      <div>
                        <div class="flex gap-0.5 text-green-500">
                          {test.number >= 1 && (
                            <svg
                              class="h-5 w-5"
                              fill="#ffe342"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          )}
                          {test.number >= 2 && (
                            <svg
                              class="h-5 w-5"
                              fill="#ffe342"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          )}
                          {test.number >= 3 && (
                            <svg
                              class="h-5 w-5"
                              fill="#ffe342"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          )}
                          {test.number >= 4 && (
                            <svg
                              class="h-5 w-5"
                              fill="#ffe342"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          )}
                          {test.number >= 5 && (
                            <svg
                              class="h-5 w-5"
                              fill="#ffe342"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          )}
                        </div>

                        <div class="mt-4">
                          <p class="text-2xl font-bold text-[#027100] sm:text-3xl">
                            {test.name}
                          </p>

                          <p class="mt-4 leading-relaxed text-gray-700">
                            {test.desc}
                          </p>
                        </div>
                      </div>
                    </blockquote>
                  </SwiperSlide>
                );
              })}
            </div>
          </Swiper>
        </div>
      </div>
      <div className="relative" id="scrollTarget">
        <img
          src="https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
        <div className="relative bg-gray-900 bg-opacity-75">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col items-center justify-between xl:flex-row">
              <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                  <span className="text-teal-accent-400">Arrange Free</span>
                </h2>
                <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
                  Welcome to Arrange Free Interiors. Transform your living
                  spaces with elegance and style. Our expert interior designers
                  bring creativity and craftsmanship to every project. Discover
                  tailored solutions that reflect your unique personality and
                  lifestyle. Experience the art of interior design with Arrange
                  Free Interiors.
                </p>
              </div>
              {/* Third Form */}
              <div className="w-full max-w-xl xl:px-8 xl:w-[60%]">
                <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                  <div className="relative">
                    <img
                      src={
                        "https://main-backend.hapspro.com/" +
                        "public/uploads/Offers/0ff9780a960e013f134e1694777264.jpeg"
                      }
                      alt=""
                    />
                    <div className="flex items-center gap-5 absolute top-0">
                      <div className="p-2 py-3 border border-[#027100] bg-yellow-100 font-serif font-bold tracking-wide text-[#027100]">
                        Book before Ganesh Festival end!
                      </div>
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    <p className="text-2xl text-[#027100]">
                      Avail 30% Discount
                    </p>
                    <p className="text-gray-700 text-sm text-justify indent-10 mt-3">
                      Take advantage of our exclusive offer! To unlock this
                      fantastic 30% discount, simply fill out the form below.
                      Once submitted, we'll send you a special coupon code via
                      SMS that you can use. Don't miss out on this opportunity
                      to save big!
                    </p>
                  </h3>
                  {successMessage && (
                    <div className="bg-gradient-to-r mb-5 from-green-100 to-[#ffe342] w-full error-message rounded border border-[#027100] flex justify-between items-center">
                      <p className="font-semibold text-black p-2 text-sm">
                        <span className="text-green-500">
                          Your request has been successfully submitted!
                        </span>
                        <br /> Your 30% discount coupon code will be sent to you
                        via SMS shortly.
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
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="floating_email"
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer font-semibold"
                      placeholder=""
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer font-semibold"
                      placeholder=" "
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label
                      htmlFor="floating_password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer font-semibold otp-input"
                      placeholder=" "
                      value={Contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                    />
                    <label
                      htmlFor="floating_repeat_password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Enter Your Contact Number
                    </label>
                    {ContactError && (
                      <div className="text-xs text-red-500 font-semibold error-message">
                        {ContactError}
                      </div>
                    )}
                  </div>
                  {/* <div>
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
                  </div> */}
                  <div className="mt-4 mb-2 sm:mb-4">
                    <button
                      type="submit"
                      className="p-2 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-[#027100] border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                      onClick={sendMessage}
                    >
                      {isLoading ? (
                        <Spin indicator={antIcon} className="text-white" />
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntriorServices;
