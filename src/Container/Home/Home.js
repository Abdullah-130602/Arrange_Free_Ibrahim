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
    </Container>
  );
};

export default Home;
