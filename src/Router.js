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
import SubscriptionTermsAndConditions from "./Container/Pages/Subscription/TermsAndConditions";
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

  const [LoginPopup, setLoginPopup] = useState(0);

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
  }, [isLogin]);

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
                    path="/subscription-terms-and-condition"
                    element={
                      <React.Suspense>
                        <SubscriptionTermsAndConditions />
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
        </CartContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default AppRoutes;
