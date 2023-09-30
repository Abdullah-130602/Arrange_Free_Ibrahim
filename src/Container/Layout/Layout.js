import React, { useContext } from "react";
import NavbarTop from "./Navbar/NavbarTop";
import CategoryBar from "../../Components/Category/CategoryBar";
import Footer from "./Footer/Footer";
import MobileFooter from "./Footer/MobileFooter";
import RoundedCategoryCard from "../../Components/Category/RoundedCategoryCard";
import { UserContext } from "../../Context/UserContext";
import { TfiArrowTopRight } from "react-icons/tfi";
import { WhatsappIcon } from "react-share";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import Navbar from "./Navbar/Navbar";
import "./Layout.css";
import { useState } from "react";
import { useEffect } from "react";
import Container from "../Container";
import { LoginContext } from "../../Context/LoginContext";
import { RxCross1 } from "react-icons/rx";

const Layout = ({ children }) => {
  const { isLogin, setIsLogin } = useContext(UserContext);
  const { cartCount, wishlistCount } = useContext(CartContext);
  const { loginModal, setLoginModal } = useContext(LoginContext);

  const [goToTopButton, setgoToTopButton] = useState(false);
  const [categoryAppear, setcategoryAppear] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(
        process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
          `admin/getHomeZoneAppliances`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          // console.warn(result);
          if (result.status === 200) {
            setloading(true);
            setData(result.data);
          }
        })
        .catch((error) => console.log("error", error));
    };

    getData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setgoToTopButton(true);
      } else {
        setgoToTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 130) {
        setcategoryAppear(true);
      } else {
        setcategoryAppear(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentUrl = window.location.href;
  const isVendorStore = currentUrl.includes("vendor-store");

  const [AppLink, setAppLink] = useState(true);
  const [UserPhone, setUserPhone] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.match(/iPhone|iPad|iPod/i)) {
      // User is on an Apple device (iOS)
      setUserPhone("IPhone");
      // console.log("This user is using an Apple device (iOS).");
    } else if (userAgent.match(/Android/i)) {
      // User is on an Android device
      // console.log("This user is using an Android device.");
      setUserPhone("Android");
    } else {
      // User is on another type of device or browser
      // console.log("This user is using a different device or browser.");
      setUserPhone("Desktop");
    }
  }, []);

  return (
    <div>
      {AppLink && (
        <div className="block md:block lg:hidden p-1 bg-[#ffe342] rounded-lg py-2 m-1">
          <div className="flex items-center mx-2">
            <div className="w-[65%]">
              <p className="text-sm font-semibold tracking-widest text-[#027100]">
                Discover More!
              </p>
              <p className="text-xs text-[#000] font-semibold">
                Download Our App From{" "}
                {UserPhone === "IPhone" ? "App Store" : "Play Store"}!
              </p>
            </div>
            <div className="w-[35%] flex justify-between">
              <button
                className="text-xs bg-[#4cc54a] text-white p-1 font-semibold rounded-sm px-5"
                onClick={() =>
                  UserPhone === "Android"
                    ? window.open(
                        "https://play.google.com/store/apps/details?id=com.arrange_free"
                      )
                    : window.open(
                        "https://apps.apple.com/in/app/dorfee/id6462861358"
                      )
                }
              >
                Get App
              </button>
              <button onClick={() => setAppLink(false)}>
                <RxCross1 className="text-[#027100]" />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="absolute bottom-[30%] right-[72px] z-10">
        <div className="fixed flex flex-col gap-4">
          <div className="bg-white p-2 shadow-xl rounded-l-md border-t border-l border-b border-gray-400  flex justify-center">
            <Link
              to="https://wa.me/+919371885000"
              target="_blank"
              className="block text-center mx-auto text-gray-500 hover:text-white"
            >
              <div className="cursor-pointer flex gap-1 items-center">
                <WhatsappIcon
                  size={34}
                  round
                  className="transition-all ease-in-out duration-500 hover:scale-110"
                />
              </div>
            </Link>
          </div>
          <div className="bg-white p-1.5 shadow-xl rounded-l-md border-t border-l border-b border-gray-400">
            <Link to="tel:+919371885000" className="cursor-pointer">
              <div
                // to="tel:+919371885000"
                className="flex justify-center gap-1 items-center"
              >
                <img src="/call-icon.gif" className="w-7 h-7" />
              </div>
              <p className="text-xs text-center text-black">
                Customize <br /> Furniture
              </p>
            </Link>
          </div>
        </div>
      </div>
      {goToTopButton && (
        <div className="fixed bottom-[70px] left-2 md:left-4 lg:bottom-4 lg:left-4 z-10 appearing-animate">
          <button className="btn" onClick={scrollToTop}>
            <span className="icon">
              <TfiArrowTopRight
                className="font-bold hover:-rotate-45"
                size={17}
              />
            </span>
            <span className="text">Top</span>
          </button>
        </div>
      )}
      {window.location.href.includes("interior") ||
      window.location.href.includes("your-payment-is-in-verification") ? (
        false
      ) : (
        <NavbarTop
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          setLoginModal={setLoginModal}
          loginModal={loginModal}
        />
      )}
      {isVendorStore ||
      window.location.href.includes("interior") ||
      window.location.href.includes("your-payment-is-in-verification") ? (
        false
      ) : (
        <Container>
          <CategoryBar data={data} loading={loading} />
        </Container>
      )}
      <hr />
      <div className="sticky top-0 z-[100]">
        {categoryAppear && (
          <div className="appearing-animate">
            {window.location.href.includes("interior") ||
            window.location.href.includes("your-payment-is-in-verification") ? (
              false
            ) : (
              <NavbarTop
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                cartCount={cartCount}
                wishlistCount={wishlistCount}
                setLoginModal={setLoginModal}
                loginModal={loginModal}
              />
            )}
            {isVendorStore ||
            window.location.href.includes("interior") ||
            window.location.href.includes("your-payment-is-in-verification") ? (
              false
            ) : (
              <>
                <Container>
                  <CategoryBar data={data} loading={loading} />
                </Container>
                <hr />
              </>
            )}
          </div>
        )}
        {window.location.href.includes("your-payment-is-in-verification") ? (
          false
        ) : (
          <div className="block md:block lg:hidden appearing-animate">
            <Navbar />
          </div>
        )}
      </div>
      {window.location.href.includes("your-payment-is-in-verification") ? (
        false
      ) : (
        <div className="shadow-md">
          <RoundedCategoryCard data={data} />
        </div>
      )}
      {children}
      {window.location.href.includes("your-payment-is-in-verification") ? (
        false
      ) : (
        <Footer
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setLoginModal={setLoginModal}
        />
      )}
      {window.location.href.includes("your-payment-is-in-verification") ? (
        false
      ) : (
        <MobileFooter
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          setLoginModal={setLoginModal}
        />
      )}
    </div>
  );
};

export default Layout;
