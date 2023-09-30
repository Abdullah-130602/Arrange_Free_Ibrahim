import React, { useContext, useEffect, useRef, useState } from "react";
import { Autoplay, FreeMode, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useLocation, useParams } from "react-router-dom";
import ProductListingCard from "../../../Components/Product/ProductListingCard";
import Loader from "../../../Components/Loader/Loader";
import { Empty, Modal, message } from "antd";
import CategoryPaginaton from "./CategoryPaginaton";
import Filter from "./Filter";
import MobileFilter from "./MobileFilter";
import { CartContext } from "../../../Context/CartContext";
import { UserContext } from "../../../Context/UserContext";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
// import CategoryHeader from "./CategoryHeader";

const formatData = (data) => {
  // Split the string by hyphens
  const words = data.split("-");

  // Capitalize the first letter of each word
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join the words with spaces and return the final formatted string
  return formattedWords.join(" ");
};

const SingleCategoryPage = () => {
  const { wishlistCount, setWishlistCount } = useContext(CartContext);
  const { isLogin, setIsLogin } = useContext(UserContext);
  const [loginModal, setLoginModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleRegister = () => {
    setShowLogin(false);
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { slug, param1 } = useParams();
  const location = useLocation();


  const key = `${slug}-${location.pathname}`;
  const [loading, setLoading] = useState(true);
  const [ProductCardData, setProductCardData] = useState([]);
  const [features, setFeatures] = useState([]);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", loading);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [loading]);

  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const containerRef = useRef(null);

  const [SkeletonLoad, setSkeletonLoad] = useState(true);
  const skeletonArray = Array.from({ length: 8 }, (_, index) => index);

  const [Brand, setBrand] = useState([]);
  const [BrandMob, setBrandMob] = useState([]);
  const [Price, setPrice] = useState("");

  const getAllProducts = async (status) => {
    await setLoading(status);
    setSkeletonLoad(status);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      customer_id: localStorage.getItem("CID"),
      page: pageNumber,
      per_page_count: 50,
      ...(Brand.length > 0 ? { brands: Brand } : {}),
      ...(BrandMob.length > 0 ? { brands: BrandMob } : {}),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        `product/getProductByHomeCategoryId/${slug}`,

      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status === 200) {
          // setSkeletonLoad(false);
          setFeatures(result.features);
          setDescription(result.description);
          setProductCardData(result.data);
          setTotalPages(result.total_pages);
        }
      })
      .catch((error) => console.log("error", error));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handlePageChange = async (page) => {
    window.scrollTo(0, 0);
    setPageNumber(page);
  };

  useEffect(() => {
    getAllProducts(true);
  }, [key, pageNumber]);

  useEffect(() => {
    getAllProducts(false);
  }, [Brand]);

  function getSlidesPerView() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth >= 768) {
      // iPad view or larger
      return 4.5;
    } else if (viewportWidth <= 768) {
      // Other views
      return 1.2;
    }
  }

  const swiperConfig = {
    slidesPerView: getSlidesPerView(),
    // Other Swiper configuration options
  };

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.success("Added To Wishlist!");
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

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
            getAllProducts(false);
            success();
          }
        })
        .catch((error) => console.log("error", error));
    }
  };
  const deleted = () => {
    messageApi.error("Removed From Wishlist!");
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
          getAllProducts(false);
          deleted();
          // setLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
  };
 
  const formattedData = formatData(slug);

  const [BrandName, setBrandName] = useState([]);
  const [SubCategoryName, setSubCategoryName] = useState([]);

  const getFilters = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        `general/getFiltersParams?slug=${slug}&`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setBrandName(result.Brands);
        setSubCategoryName(result.Sub_Category);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getFilters();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="relative bg-white h-screen overflow-hidden" />
          {loading && (
            <div className="flex justify-center">
              <div className="absolute top-[50%]">
                <Loader />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex gap-5 mx-1 md:mx-5 lg:mx-10 error-message my-5">
          <div className="hidden md:hidden lg:block w-[20%] my-4">
            <Filter
              BrandName={BrandName}
              SubCategoryName={SubCategoryName}
              setBrand={setBrand}
              Brand={Brand}
              setPrice={setPrice}
            />
          </div>
          <div
            className="relative error-message my-5 w-full md:w-full lg:w-[80%]"
            ref={containerRef}
          >
            {contextHolder}
            {/* <CategoryHeader description={description} slug={slug} /> */}
            <div className="block md:block lg:block xl:block">
              {/* <Swiper
              {...swiperConfig}
              spaceBetween={5}
              freeMode={true}
              // centeredSlides={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              modules={[FreeMode, Autoplay, Pagination]}
              loop={true}
              className="mySwiper mx-20 cursor-pointer"
            >
              {features &&
                features.map((el, i) => {
                  return (
                    <SwiperSlide
                      style={{ width: 100 }}
                      key={i}
                      className="border-black border text-center rounded-lg bg-white shadow-lg"
                    >
                      <p
                        to="/product-list/:slug"
                        className="p-2 text-sm font-bold text-center whitespace-nowrap overflow-hidden"
                      >
                        {el}
                      </p>
                    </SwiperSlide>
                  );
                })}
            </Swiper> */}
              <div className="flex justify-between items-center pt-5 px-2">
                <p className="text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-start font-semibold">
                  {formattedData}
                  {/* <span className="text-sm font-sans text-gray-500">
                    - {ProductCardData && ProductCardData.length} items
                  </span> */}
                </p>
                <div className="block md:block lg:hidden">
                  <MobileFilter
                    BrandName={BrandName}
                    setBrandMob={setBrandMob}
                    BrandMob={BrandMob}
                    getAllProducts={getAllProducts}
                  />
                </div>
              </div>
            </div>
            <hr className="border-t border-gray-500 block my-1 md:my-3 mx-3" />
            {ProductCardData && ProductCardData.length > 0 ? (
              <>
                <ProductListingCard
                  ProductCardData={ProductCardData}
                  handleDeleteWishlist={handleDeleteWishlist}
                  handleHeartClick={handleHeartClick}
                  categorySlug={slug}
                  skeletonArray={skeletonArray}
                  SkeletonLoad={SkeletonLoad}
                />
                <CategoryPaginaton
                  pageNumber={pageNumber}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="flex justify-center my-20 md:my-40 lg:my-80">
                <Empty />
              </div>
            )}
          </div>
          {/* <div className="h-1/2 border-l border-gray-500 my-10" /> */}
        </div>
      )}
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
    </>
  );
};

export default SingleCategoryPage;
