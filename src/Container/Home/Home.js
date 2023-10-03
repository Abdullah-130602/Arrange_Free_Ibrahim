import React, { useContext, useEffect, useState } from "react";
import CategoryCards from "./CategoryCards/CategoryCards";
import RecentlyVisited from "./RecentlyVisited/RecentlyVisited";
import LandingCarousal from "../../Components/Carousal/LandingCarousal";
import TopBargains from "./BestDeal/TopBargains";
import RecentlyVisited2 from "./RecentlyVisited/RecentlyVisited2";
import Heading from "../../Components/Heading/Heading";
import Container from "../Container";
import MainPageFeatures from "./MainPageFeatures";
import CategoryFooter from "../Layout/Footer/CategoryFooter";
import Catlog from "./Catlog/Catlog";
import SectDescription from "../../Components/Heading/SectDescription";
import { CartContext } from "../../Context/CartContext";
import { ConfigProvider, Modal, message } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import { FaArrowRight, FaFileContract } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Home = () => {
  // const { isLogin } = useContext(UserContext);
  // const { setLoginModal } = useContext(LoginContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [SkeletonLoad, setSkeletonLoad] = useState(true);
  const skeletonArray = Array.from({ length: 8 }, (_, index) => index);
  const { wishlistCount, setWishlistCount } = useContext(CartContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [Pincode, setPincode] = useState("");
  const [SubscriptionModal, setSubscriptionModal] = useState(false);
  const [SubscriptionCards, setSubscriptionCards] = useState([]);
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("CID") ? true : false
  );
  const [bestDealData, setBestDealDData] = useState([]);
  const [loginModal, setLoginModal] = useState(false);
  const [OfferBanner, setOfferBanner] = useState();
  const [showLogin, setShowLogin] = useState(true);

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
  const getAllCategory = () => {
    setSkeletonLoad(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "admin/getHomeZoneAppliances",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status === 200) {
          setData(result.data);
          setSkeletonLoad(false);
        }
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getAllCategory();
    GetAllCardData();
    setTimeout(() => {
      if (sessionStorage.getItem("ShowSubsciptionModal")) {
        setSubscriptionModal(false);
      } else {
        // sessionStorage.setItem("ShowSubsciptionModal", true);
        setSubscriptionModal(true);
      }
    }, 5000);
  }, []);
  useEffect(() => {
    window.scroll(0, 0);
  }, [isLogin]);

  // const handleGetMyLocation = async () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         try {
  //           const response = await fetch(
  //             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
  //           );
  //           const data = await response.json();
  //           // console.log(data);
  //           setPincode(data);
  //         } catch (error) {
  //           // console.log(error);
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }
  // };

  // useEffect(() => {
  //   handleGetMyLocation();
  // }, []);
  const skeletonForBestDealArray = Array.from(
    { length: 10 },
    (_, index) => index
  );

  const getBestDeals = async () => {
    setSkeletonLoad(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "general/getBestDeal",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status === 200) {
          setBestDealDData(result.data);
          setSkeletonLoad(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const getBanners = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "Offers/getOffersById/16",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.warn(result);
        if (result.status === 200) {
          setOfferBanner(result.offers);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getBestDeals();
    getBanners();
    setTimeout(() => {
      if (
        isLogin === true ||
        window.location.href.includes("arrange-free-home+interior+services")
      ) {
        setLoginModal(false);
      } else {
        setLoginModal(true);
      }
    }, 8000);
  }, [isLogin]);

  const handleHeartClick = async (id) => {
    if (isLogin === false) {
      setLoginModal(true);
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        product_id: id,
        customer_id: localStorage.getItem("CID"),
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "wishlist/wishlistcreate",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            setWishlistCount(parseInt(wishlistCount + 1));
            getBestDeals();
            success();
          }
        })
        .catch((error) => console.log("error", error));
    }
  };
  const deleted = () => {
    messageApi.error("Removed From Wishlist!");
  };
  const success = () => {
    messageApi.success("Added To Wishlist!");
  };
  const handleDeleteWishlist = async (el) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        `wishlist/deletewishlist/${el.whishlist_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setWishlistCount(parseInt(wishlistCount - 1));
          getBestDeals();
          deleted();
          // setLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleRegister = () => {
    setShowLogin(false);
  };
  const handleLogin = () => {
    setShowLogin(true);
  };

  const GetAllCardData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_HAPS_MEDIA_BASE_URL}SubscriptionCards/get-all-cards`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setSubscriptionCards(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const customTheme = {
    css: {
      token: {
        colorBgBase:
          "linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
      },
    },
  };
  const SubsData = [
    {
      title: "50% credit all the products and services.",
      desc: "At Arrange Free, we're excited to offer a generous 50% credit on all our products and services. Here's how this fantastic offer works",
    },
    {
      title: "Interior designer for your home Design anything any time.",
      desc: "At Arrange Free, we believe in making your experience as convenient as possible, which is why we offer complimentary home visit services. Here's how our free home visit services can benefit you",
    },
    {
      title:
        "Pay 50% and get 50% on EMI base all the products and interior services.",
    },
    {
      title: "Home visit free services.",
    },
    {
      title: "Annual maintenance services on single call.",
    },
    {
      title: "Deep cleaning services.",
    },
    {
      title: "Delivery and assembly free.",
    },
    {
      title: "Curtains Cleaning Services.",
    },
    {
      title: "Customise services.",
    },
    {
      title: "VIP access.",
    },
    {
      title: "Fast delivery.",
    },
  ];
  return (
    <Container className="mt-2 md:mt-2 lg:mt-0 error-message">
      {contextHolder}
      <LandingCarousal />
      <div className="my-10">
        <h1 className="text-xl md:text-2xl text-center text-gray-800 tracking-wider">
          Step Inside a World of Home Interiors{" "}
          <span className="text-xl md:text-2xl font-extrabold text-[#027100]">
            Browse by Categories
          </span>
        </h1>
        <CategoryCards
          linkTo="/sub-category"
          data={data}
          SkeletonLoad={SkeletonLoad}
          skeletonArray={skeletonArray}
          className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-8 gap-x-[10px] md:gap-x-[50px] gap-y-1 md:gap-y-4 cursor-pointer"
        />
      </div>
      {/* <Banner bannerImage={OfferBanner} className="mx-2 xl:mx-0" /> */}
      <hr className="mx-7 md:mx-20" />
      <div className="my-5 md:my-10">
        <Heading spanHeading={`Get your dream furniture and decor item`} />
        <div className="flex justify-center my-5">
          <iframe
            // width="560"
            // height="315"
            src="https://www.youtube.com/embed/dMcip8j_wLg?si=1vIxnjvHx_AjZXA5"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 h-[300px] md:h-[500px]"
          ></iframe>
        </div>
      </div>
      <MainPageFeatures />
      <Catlog />
      {/* <MainPageTestimonials /> */}
      <Heading spanHeading={`Top Bargains`} />
      <SectDescription SectDescription="Big savings, stylish spaces: explore 'Top Bargains' for your dream home interiors." />
      <TopBargains
        bestDealData={bestDealData}
        skeletonForBestDealArray={skeletonForBestDealArray}
        SkeletonLoad={SkeletonLoad}
        handleHeartClick={handleHeartClick}
        handleDeleteWishlist={handleDeleteWishlist}
      />
      <hr />
      <div className="my-5 md:my-10">
        <Heading spanHeading={`What Our Customer Says About Us`} />
        <div className="flex flex-col md:flex-col lg:flex-row items-center gap-5 md:gap-5 lg:gap-5 my-5 md:my-10 lg:mx-2">
          {/* <div className="xl:mx-10 lg:mx-10 sm:mx-1 w-full md:w-full lg:w-1/2 cursor-grab">
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={15}
              breakpoints={{
                350: {
                  slidesPerView: 1.5,
                },
                640: {
                  slidesPerView: 1.5,
                },
                1000: {
                  slidesPerView: 2.7,
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
                      <blockquote class="flex h-auto rounded-lg flex-col justify-between bg-white p-3 shadow-sm border sm:p-8 lg:p-5">
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
          </div> */}
          <div className="w-full md:w-full lg:w-1/2 flex justify-center">
            <iframe
              // width="560"
              // height="315"
              src="https://www.youtube.com/embed/Y3ZiYp_DEBg?si=XiGWi8HRh4aB_dLW"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              className="w-full h-[260px] md:h-[310px] lg:h-[500px] rounded-none md:rounded-lg"
            ></iframe>
            <p></p>
          </div>
          <div className="w-full md:w-full lg:w-1/2 flex justify-center">
            <iframe
              // width="560"
              // height="315"
              src="https://www.youtube.com/embed/Lz64Fq_DFTg?si=lZKgS8bIQDixhtsN"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              className="w-full h-[260px] md:h-[310px] lg:h-[500px] rounded-none md:rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
      <hr />
      <RecentlyVisited />
      <CategoryFooter Category={data} />
      {isLogin === true ? <RecentlyVisited2 ProductsPerView={10} /> : false}
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
      <Modal
        open={loginModal}
        onCancel={() => setLoginModal(false)}
        footer={null}
        maskStyle={
          {
            // backgroundColor: "rgba(255, 255, 255, 0.8)",
          }
        }
        wrapClassName="reservation_modal"
        closable={false}
        width={800}
      >
        <div className="parent-container">
          {showLogin ? (
            <Login
              onRegister={handleRegister}
              closeModal={() => setLoginModal(false)}
              setIsLogin={setIsLogin}
            />
          ) : (
            <Register
              onLogin={handleLogin}
              closeModal={() => setLoginModal(false)}
              setIsLogin={setIsLogin}
            />
          )}
        </div>
      </Modal>
      <ConfigProvider theme={customTheme}>
        <Modal
          open={SubscriptionModal}
          onCancel={() => setSubscriptionModal(false)}
          footer={null}
          wrapClassName="reservation_modal"
          closable={false}
          width={1000}
        >
          <div
            style={{
              background:
                "linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
            }}
            className="pb-5"
          >
            <p
              // style={{
              //   backgroundImage:
              //     "linear-gradient(to right,#462523 0,#cb9b51 22%, #f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#462523 100%)",
              //   color: "transparent",
              //   WebkitBackgroundClip: "text",
              //   webkitTextStroke: "0.80px #B38728",
              // }}
              className="text-[30px] text-white text-center font-serif font-thin "
            >
              Arrange Free Membership
            </p>
            <p
              style={{
                backgroundImage:
                  "linear-gradient(to right,#462523 0,#cb9b51 22%, #f6e27a 45%,#f6f2c0 50%,#f6e27a 55%,#cb9b51 78%,#462523 100%)",
                color: "transparent",
                WebkitBackgroundClip: "text",
              }}
              className="uppercase text-[60px] text-center  font-bold "
            >
              gold
            </p>
            <p className="uppercase text-lg text-center font-bold text-white">
              Gold Benifits
            </p>
            <div className="rounded-xl w-auto mx-5  grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {SubsData &&
                SubsData.map((el, index) => {
                  return (
                    <div
                      className="cursor-pointer bg-white rounded-lg m-3 text-center py-2 px-2 font-semibold hover:scale-[1.5] hover:shadow-2xl transition"
                      key={index}
                    >
                      <span
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, #462523,#e0c94f ,#462523)",
                          color: "transparent",
                          WebkitBackgroundClip: "text",
                        }}
                      >
                        {el.title}
                      </span>
                    </div>
                  );
                })}
            </div>
            <div className="flex justify-center items-center mt-5">
              <button className="py-2 bg-white text-lg rounded-md w-[40%] font-semibold hover:scale-[1.05] hover:shadow-2xl transition">
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #462523,#e0c94f ,#462523)",
                    color: "transparent",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  Buy Now
                </span>
              </button>
            </div>
            <p
              className="text-center text-white mt-2 cursor-pointer text-lg"
              onClick={() => navigate("/subscription-terms-and-condition")}
            >
              Terms & Conditions
            </p>
            {/* <p className="text-[30px] text-center font-serif font-thin">
              MemberShip
            </p> */}
          </div>
          {/* <div>
            <p className="text-center text-3xl font-bold">
              Choose Your Subscription
            </p>
            <div
              className={`mx-5 gap-5 grid mb-10 mt-2 xl:grid-cols-${SubscriptionCards.length} lg:grid-cols-${SubscriptionCards.length} md:grid-cols-2 sm:grid-cols-1 justify-center`}
            >
              {SubscriptionCards &&
                SubscriptionCards.map((el, index) => {
                  return (
                    <div
                      className="bg-white h-auto rounded-sm border border-[#027100] hover:scale-[1.05] hover:shadow-2xl transition"
                      key={index}
                    >
                      <p className="text-center text-lg font-semibold mt-2">
                        {el.title}
                      </p>
                      <p className="text-center text-xs font-bold mt-2 mx-5">
                        {el.description}
                      </p>
                      <p className="font-semibold mt-2 mx-2">Top Features</p>
                      <div className="mx-5  ">
                        {JSON.parse(el.benefits).map((ea) => {
                          return (
                            <li className="list-disc	font-semibold">
                              {ea.title}
                            </li>
                          );
                        })}
                      </div>
                      <div className="flex justify-center items-center my-3 mx-5">
                        <button className="p-2 bg-[#FFE342] w-full text-[#000] font-semibold text-sm md:text-base tracking-widest rounded-full  border-2 border-[#FFE342]">
                          Buy Offer
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div> */}
        </Modal>
      </ConfigProvider>
    </Container>
  );
};

export default Home;
