import React, { useEffect, useState } from "react";
import "./App.css";
import Layout from "./Container/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./Container/Home/Home";
import SingleCategoryPage from "./Container/Pages/Category/SingleCategoryPage";
import SingleProductPage from "./Container/Pages/SingleProductPage/SingleProductPage";
import Cart from "./Container/Pages/Cart/Cart";
import CheckOut from "./Container/Pages/CheckOut/CheckOut";
import Address from "./Container/Pages/CheckOut/Address";
import UpdateAddress from "./Container/Pages/CheckOut/UpdateAddress";
import Success from "./Container/Pages/CheckOut/Success";
import Dashboard from "./Container/Pages/Dashboard/Dashboard";
import Review from "./Container/Pages/Review/Review";
import AboutUs from "./Container/Pages/AboutUs";
import { UserContext } from "./Context/UserContext";
import UpdateProfile from "./Container/Pages/Dashboard/UpdateProfile";
import OrderHistory from "./Container/Pages/Dashboard/OrderHistory";
import PrivacyPolicy from "./Container/Pages/PrivacyPolicy";
import TermsAndConditions from "./Container/Pages/TermsAndConditions";
import WishList from "./Container/Pages/Wishlist/WishList";
import ContactUs from "./Container/Pages/ContactUs";
import SubCategoryPage from "./Container/Pages/Category/SubCategoryPage";
import OrderDetail from "./Container/Pages/Dashboard/OrderDetail";
import { ConfigProvider, Modal } from "antd";
import Store from "./Container/Pages/Vendor/Store";
import { CartContext } from "./Context/CartContext";
import { LoginContext } from "./Context/LoginContext";
import TrackOrder from "./Container/Home/TrackOrder";
import Login from "./Container/Pages/Auth/Login";
import Register from "./Container/Pages/Auth/Register";
import OurCatlogue from "./Container/Home/Catlog/OurCatlogue";
import ShippingPolicy from "./Container/Pages/ShippingPolicy";
import BlogListing from "./Container/Pages/Blog/BlogListing";
import BlogDetailing from "./Container/Pages/Blog/BlogDetailing";
import PaymentVerification from "./Container/Pages/CheckOut/PaymentVerification";
import GetQuote from "./Container/Pages/GetQuote";
import InteriorServices from "./Container/Pages/InteriorServices";
import SalesServiceTaskForce from "./Container/Pages/SalesServiceTaskForce/SalesServiceTaskForce";

function AppRoutes() {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("CID") ? true : false
  );

  const [loginModal, setLoginModal] = useState(false);
  const [SubscriptionModal, setSubscriptionModal] = useState(false);
  const [LoginPopup, setLoginPopup] = useState(0);
  const [showLogin, setShowLogin] = useState(true);
  const handleRegister = () => {
    setShowLogin(false);
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  const [cartCount, setCartCount] = useState("");
  const [wishlistCount, setWishlistCount] = useState("");

  const getCartCount = async () => {
    var myHeaders = new Headers();
    myHeaders.append("token", localStorage.getItem("token"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        "general/getCartAndWhishlistCount",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setCartCount(result.cart_count);
        setWishlistCount(result.wishlistCount);
      })
      .catch((error) => console.log("error", error));
  };

  // useEffect(() => {
  //   setLoginModal(false);
  //   alert(1);
  // }, [window.location.href.includes("arrange-free-home+interior+services")]);

  useEffect(() => {
    getCartCount();
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
    if (loginModal === true) {
      setLoginPopup(1);
    }
  }, [isLogin]);

  useEffect(() => {
    if (sessionStorage.getItem("ShowSubsciptionModal")) {
      setSubscriptionModal(false);
    } else {
      // sessionStorage.setItem("ShowSubsciptionModal", true);
      setSubscriptionModal(true);
    }
  }, []);
  const membershipCards = [
    {
      Title: "Premium",
      desc: "Everything you need to create your website",
      offer: "+2 months FREE",
      benefits: [
        "Standard Performance",
        "100 Websites",
        "100 GB SSD Storage",
        "GB SSD Storage",
        "Unlimited Free SSL",
        "Unlimited Bandwidth",
        "Free Email",
        "Free Domain (₹799.00 value)",
      ],
      Fee: 149.0,
    },
    {
      Title: "Business",
      offer: "+2 months FREE",

      desc: "Level-up with more power and enhanced features",
      benefits: [
        "Increased (Up to 5x) Performance",
        "100 Websites",
        "200 GB NVMe Storage",
        "Daily Backups (₹1,380.00 value)",
        "Unlimited Free SSL",
        "Unlimited Bandwidth",
        "Free Email",
        "Free Domain (₹799.00 value)",
      ],
      Fee: 269.0,
    },
    {
      Title: "Cloud Startup",
      desc: "Enjoy optimised performance & guaranteed resources",
      offer: "+2 months FREE",

      benefits: [
        "Maximum (Up to 10x) Performance",
        "300 Websites",
        "200 GB NVMe Storage",
        "Daily Backups (₹1,380.00 value)",
        "Unlimited Free SSL",
        "Unlimited Bandwidth",
        "Free Email",
        "Free Domain (₹799.00 value)",
      ],
      Fee: 699.0,
    },
  ];
  const CardLenght = membershipCards.length;
  return (
    <>
      {/* <Alert message="Success Tips"  showIcon closable /> */}
      <UserContext.Provider value={{ isLogin, setIsLogin }}>
        <CartContext.Provider
          value={{ cartCount, setCartCount, wishlistCount, setWishlistCount }}
        >
          <LoginContext.Provider value={{ loginModal, setLoginModal }}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#027100",
                },
              }}
            >
              <Layout>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <React.Suspense>
                        <Home />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/arrange-free-catlogue"
                    element={
                      <React.Suspense>
                        <OurCatlogue />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/arrange-free-home+interior+services"
                    element={
                      <React.Suspense>
                        <InteriorServices />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/category/:slug"
                    element={
                      <React.Suspense>
                        <SingleCategoryPage />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/sub-category/:slug"
                    element={
                      <React.Suspense>
                        <SubCategoryPage />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/single-product/:slug"
                    element={
                      <React.Suspense>
                        <SingleProductPage />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/vendor-store/:slug"
                    element={
                      <React.Suspense>
                        <Store />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <React.Suspense>
                        <Cart />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <React.Suspense>
                        <CheckOut />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/payment-verify"
                    element={
                      <React.Suspense>
                        <PaymentVerification />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/address"
                    element={
                      <React.Suspense>
                        <Address />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/update-address"
                    element={
                      <React.Suspense>
                        <UpdateAddress />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/your-payment-is-in-verification"
                    element={
                      <React.Suspense>
                        <PaymentVerification />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/success"
                    element={
                      <React.Suspense>
                        <Success />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <React.Suspense>
                        <Dashboard />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/update-profile"
                    element={
                      <React.Suspense>
                        <UpdateProfile />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/recent-orders"
                    element={
                      <React.Suspense>
                        <OrderHistory />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/get-quote"
                    element={
                      <React.Suspense>
                        <GetQuote />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/orders-detail/:slug"
                    element={
                      <React.Suspense>
                        <OrderDetail />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/review"
                    element={
                      <React.Suspense>
                        <Review />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/about-us"
                    element={
                      <React.Suspense>
                        <AboutUs />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/contact-us"
                    element={
                      <React.Suspense>
                        <ContactUs />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/Sales-Service-Task-Force"
                    element={
                      <React.Suspense>
                        <SalesServiceTaskForce />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/track-your-order"
                    element={
                      <React.Suspense>
                        <TrackOrder />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/privacy-policy"
                    element={
                      <React.Suspense>
                        <PrivacyPolicy />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/terms-and-condition"
                    element={
                      <React.Suspense>
                        <TermsAndConditions />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/shipping-policy"
                    element={
                      <React.Suspense>
                        <ShippingPolicy />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/blogs"
                    element={
                      <React.Suspense>
                        <BlogListing />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/blog-detailing-page/:slug"
                    element={
                      <React.Suspense>
                        <BlogDetailing />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/wishlist"
                    element={
                      <React.Suspense>
                        <WishList />
                      </React.Suspense>
                    }
                  />
                </Routes>
              </Layout>
            </ConfigProvider>
          </LoginContext.Provider>
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
          <Modal
            open={SubscriptionModal}
            onCancel={() => setSubscriptionModal(false)}
            footer={null}
            wrapClassName="reservation_modal"
            closable={false}
            width={membershipCards.length * 350}
          >
            <div>
              <p className="text-center text-3xl font-bold">Choose Your Plan</p>
              <div
                className={`mx-5 gap-5 grid mb-10 mt-2 xl:grid-cols-${membershipCards.length} lg:grid-cols-${membershipCards.length} md:grid-cols-2 sm:grid-cols-1 justify-center`}
              >
                {membershipCards.map((el, index) => {
                  return (
                    <div
                      className="bg-white h-auto rounded-sm border border-[#027100] hover:scale-[1.05] hover:shadow-2xl transition"
                      key={index}
                    >
                      <p className="text-center text-lg font-semibold mt-2">
                        {el.Title}
                      </p>
                      <p className="text-center text-xs font-bold mt-2 mx-5">
                        {el.desc}
                      </p>
                      <p className="font-semibold mt-6 mx-2 text-center text-xl">
                        ₹<span className="text-[40px]">{el.Fee}</span>/mo
                      </p>
                      <p className="text-center text-lg font-bold my-2 text-[#027100]">
                        {el.offer}
                      </p>
                      <p className="font-semibold mt-2 mx-2">Top Features</p>

                      <div className="mx-5  ">
                        {el.benefits.map((ea) => {
                          return (
                            <li className="list-disc	font-semibold">{ea}</li>
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
            </div>
          </Modal>
        </CartContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default AppRoutes;
