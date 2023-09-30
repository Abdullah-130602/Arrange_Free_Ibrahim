import React, { useContext, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { VscEye } from "react-icons/vsc";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import SimilarProducts from "./SimilarProducts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailTabs from "./DetailTabs";
import Review from "../Review/Review";
import { UserContext } from "../../../Context/UserContext";
import Lightbox from "react-spring-lightbox";
import ModalHeader from "./ModalHeader";
import { CartContext } from "../../../Context/CartContext";
import MainPageFeatures from "../../Home/MainPageFeatures";
import { LoginContext } from "../../../Context/LoginContext";
import { FcSalesPerformance } from "react-icons/fc";
import { TbArrowForwardUp } from "react-icons/tb";

const SingleProductPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const key = `${slug}-${location.pathname}`;
  let Navigate = useNavigate();

  const { isLogin } = useContext(UserContext);
  const { cartCount, setCartCount } = useContext(CartContext);
  const { setLoginModal } = useContext(LoginContext);

  const makeStyle = {
    backgroundColor: "#fff",
    boxShadow: "none !important",
    margin: 0,
    width: "100% !important",
    height: "100% !important",
    maxWidth: "100% !important",
    maxHeight: "100% !important",
  };

  const [open, setOpen] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [CategorySlug, setCategorySlug] = useState("");
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", loading);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [loading]);
  const [productDetails, setProductDetails] = useState([]);

  const getProductDetails = async () => {
    const myHeaders = new Headers();

    if (localStorage.getItem("token")) {
      myHeaders.append("token", localStorage.getItem("token"));
    }

    myHeaders.append("Cookie", "ci_session=mnvbss2rsj2t4l0n5bt0ak23huch6719");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        `product/getProductById/${slug}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status === 200) {
          // console.log('images data',result.data[0].images)
          let images = result.data[0].images;
          images.sort(sortImages);
          result.data[0].images = images;
          setProductDetails(result.data);
          setCategorySlug(result.data[0].category_slug);
          // setLoading(false);
        } else {
          // setLoading(false);
        }
      })
      .catch((error) => console.log("error", error));

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // images sort function
  function sortImages(a, b) {
    // console.log('aaaaa',a);
    if (a.image_index > b.image_index) return 1;
    if (a.image_index < b.image_index) return -1;
    return 0;
  }

  useEffect(() => {
    window.scroll(0, 0);
    getProductDetails();
  }, [key]);

  const [number, setNumber] = useState(13);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 20) + 1;
      setNumber(randomNumber);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMainSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const slidesPerView = () => {
    // Calculate slidesPerView based on window width
    const windowWidth = window.innerWidth;
    if (windowWidth >= 768) {
      return 5;
    } else {
      return 4;
    }
  };

  const spaceBetween = () => {
    // Calculate slidesPerView based on window width
    const windowWidth = window.innerWidth;
    if (windowWidth >= 768) {
      return 20;
    } else {
      return 5;
    }
  };

  const handleAddToCart = async () => {
    // await setLoading(true);
    if (isLogin) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        product_id: slug,
        customer_id: localStorage.getItem("CID"),
        quantity: quantity,
      });
      console.log(raw);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "cart/createCart",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          if (result.status === 200) {
            toast.success("Added cart successfully", {
              theme: "light",
              autoClose: "2000",
            });
            setLoading(false);
            setCartCount(parseInt(cartCount) + parseInt(quantity));
          } else {
            toast.error("Something went wrong!", {
              theme: "light",
              autoClose: "2000",
            });
          }
        })
        .catch((error) => console.log("error", error));
      setLoading(false);
    } else {
      setLoginModal(true);
    }
  };

  const handleBuyNow = async () => {
    if (isLogin) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        product_id: slug,
        customer_id: localStorage.getItem("CID"),
        quantity: quantity,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "cart/createCart",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          if (result.status === 200) {
            toast.success("Added cart successfully", {
              theme: "light",
              autoClose: "2000",
            });
            setLoading(false);
            setCartCount(parseInt(cartCount) + parseInt(quantity));
            Navigate("/cart");
          } else {
            toast.error("Something went wrong!", {
              theme: "light",
              autoClose: "2000",
            });
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      setLoginModal(true);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    // if (quantity < 10) {
    setQuantity(quantity + 1);
    // }
  };

  const calculatePrice = (discountedPrice) => {
    const price = parseInt(discountedPrice);
    const totalPrice = price * quantity;
    return totalPrice;
  };

  const [currentImageIndex, setCurrentIndex] = useState(0);
  const [isImagePreviewOpen, setImagePreviewOpen] = useState(false);

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = (images) =>
    currentImageIndex + 1 < images.length &&
    setCurrentIndex(currentImageIndex + 1);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener to update width on window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
        <div className="p-2 mx-0 md:mx-0 lg:mx-10 xl:mx-20">
          {productDetails.map((el, i) => {
            return (
              <div
                key={i}
                className="flex flex-col md:flex-col lg:flex-row justify-start md:justify-start lg:justify-start xl:justify-center gap-5 md:gap-5 lg:gap-10 xl:gap-10 xl:flex-row error-message mt-1 md:mt-2 lg:mt-10 xl:mt-14"
              >
                <div className="p-0 md:p-0 lg:p-4 xl:p-4">
                  <div className="sticky top-12">
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                      }}
                      watchSlidesProgress={true}
                      spaceBetween={0}
                      // navigation={true}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Thumbs]}
                      className="mySwiper2  w-[360px] h-[360px] md:w-[580px] md:h-[580px] lg:w-[580px] lg:h-[580px] xl:w-[580px] xl:h-[580px]"
                      onSlideChange={handleMainSlideChange}
                    >
                      {/* Render your main slides */}
                      {el.images.map((image, i) => (
                        <SwiperSlide
                          key={i}
                          className="relative w-[360px] h-[360px] md:w-[580px] md:h-[580px] lg:w-[580px] lg:h-[580px] xl:w-[580px] xl:h-[580px] rounded"
                        >
                          <img
                            src={`${process.env.REACT_APP_HAPS_MEDIA_BASE_URL}${image.path_580x580}`}
                            alt=""
                            className="object-cover cursor-pointer max-w-[360px] max-h-[360px] md:max-w-[580px] md:max-h-[580px] lg:max-w-[580px] lg:max-h-[580px] xl:max-w-[580px] xl:max-h-[580px] absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]"
                            onClick={() => setImagePreviewOpen(true)}
                          />
                          {/* <div>
                            <iframe
                              width="100%"
                              height="315"
                              src="https://www.youtube.com/embed/onIeIeYRjNU?si=F95pOo0bamnDxuvu"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowfullscreen
                            ></iframe>
                          </div> */}
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <Swiper
                      onSwiper={setThumbsSwiper}
                      slidesPerView={slidesPerView()}
                      spaceBetween={spaceBetween()}
                      className="mySwiper mt-4 w-auto md:w-[580px] lg:w-[580px] xl:w-[580px]"
                    >
                      {/* Render your thumbnail slides */}
                      {el.images.map((image, i) => (
                        <SwiperSlide
                          key={i}
                          className="w-[85px] h-[85px] md:w-[100px] md:h-[100px]"
                        >
                          <div
                            className={`relative w-[85px] h-[85px] md:w-[100px] md:h-[100px] border bg-slate-100 flex justify-center ${
                              activeIndex === i
                                ? "border-2 border-[#027100]"
                                : ""
                            }`}
                          >
                            <img
                              src={`${process.env.REACT_APP_HAPS_MEDIA_BASE_URL}${image.path_360x360}`}
                              alt=""
                              className={`p-0.5 cursor-pointer max-w-[85px] max-h-[85px] md:max-w-[100px] md:max-h-[100px] absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]
                          `}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-3 md:p-3 lg:p-0 xl:p-0">
                  {/* Heading */}
                  <div>
                    <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold tracking-wider">
                      {el.name}
                    </h1>
                    <p className="text-sm text-gray-700 tracking-wider">
                      (by {el.brand_name})
                    </p>
                    <div
                      // target="_blank"
                      // to={`/vendor-store/${el.brand_slug}`}
                      className="text-xs underline text-gray-500 tracking-wider"
                    >
                      View more products by{" "}
                      <span className="text-[#027100] font-semibold text-sm">
                        {el.brand_name}
                      </span>
                    </div>
                  </div>
                  {/* Rating & Wishlist section */}
                  <div className="flex items-center gap-2 md:gap-4 lg:gap-4 xl:gap-4">
                    <p className="text-xs bg-green-600 rounded-full">
                      <span className=" flex items-center gap-0.5 p-0.5 px-2 text-white tracking-wider">
                        {el.rating}
                        <AiFillStar
                          size={12}
                          // color={"#ffd700"}
                          className="mt-0.5 text-white"
                        />
                      </span>
                    </p>
                    <p className="text-sm tracking-wider">
                      1472 Ratings & 909 Reviews
                    </p>
                  </div>
                  {/* Pricing Section */}
                  <div>
                    <div className="flex gap-4 items-center">
                      <h1
                        className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold tracking-wider font-sans"
                        // style={{ fontWeight: 900 }}
                      >
                        Rs {parseInt(el.discounted_price)}/-
                      </h1>
                      <p className="text-md font-semibold text-green-500 tracking-wider">
                        {parseInt(el.discounted_percent)}% OFF
                      </p>
                    </div>
                    <span className="strike-through-red text-sm text-gray-900 tracking-wider">
                      Rs {parseInt(el.actual_price)}/-
                    </span>
                  </div>
                  {/* People Watch */}
                  <div className="flex items-center gap-2 tracking-wider">
                    <VscEye />
                    <p className="text-gray-700 font-semibold text-sm">
                      {number} Peoples are Viewing this product right now
                    </p>
                  </div>
                  <Link
                    to="/Sales-Service-Task-Force"
                    target="_blank"
                    className="flex justify-center items-center gap-2 tracking-wider bg-green-100 hover:bg-yellow-100 border border-[#027100] hover:border-[#ffe342] transition-all duration-500 ease-in-out rounded-full w-full p-0.5 text-[#027100] hover:text-[#027100]"
                  >
                    <FcSalesPerformance size={25} />
                    <p className="font-semibold text-xl flex items-center gap-2 uppercase">
                      after sales service support
                      <span>
                        <TbArrowForwardUp />
                      </span>
                    </p>
                  </Link>
                  {/* Mobile View Buttons */}
                  <div className="block md:hidden lg:hidden xl:hidden">
                    <div className="mt-5 flex flex-col md:flex-row lg:flex-row xl:flex-row gap-4">
                      <h1 className="text-xl font-bold font-serif tracking-wider">
                        Quantity :
                      </h1>
                      <div className="flex items-center gap-4">
                        <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-black w-[50%]">
                          <button
                            onClick={handleDecrease}
                            disabled={quantity === 1}
                            className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-black text-black"
                          >
                            <span className="text-dark text-base">
                              <FiMinus />
                            </span>
                          </button>
                          <p className="font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8  md:w-20 xl:w-24">
                            {quantity}
                          </p>
                          <button
                            onClick={handleIncrease}
                            // disabled={quantity === 10}
                            className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-s border-black text-black"
                          >
                            <span className="text-dark text-base">
                              <FiPlus />
                            </span>
                          </button>
                        </div>
                        <p className="text-gray-700 text-xs font-semibold tracking-wider">
                          Rs {calculatePrice(parseInt(el.discounted_price))}/-
                          (incl. of all taxes)
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      <button
                        className="p-2 bg-[#fff] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-[#FFE342] uppercase flex justify-center items-center gap-3"
                        onClick={handleAddToCart}
                      >
                        Add To Cart
                      </button>
                      <button
                        className="p-2 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                        onClick={handleBuyNow}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                  <hr />
                  {/* Launch Offers */}
                  <div className="flex flex-col gap-2 tracking-wide">
                    <h1 className="text-lg font-bold tracking-wider">
                      Launch Offers
                    </h1>
                    <div className="flex flex-col gap-1">
                      <p className="flex">
                        <BsArrowRightCircleFill className="mt-1" />
                        <span className="font-semibold text-sm ml-2">
                          New to ArrangeFree? Get Rs 2000 Off Your First
                          Purchase!
                          {/* Launch Sale -{" "} */}
                          <br />
                          <span className="text-gray-700">
                            Use code{" "}
                            <span className="font-bold font-sans text-black text-base">
                              WEARRANGE
                            </span>{" "}
                            during checkout and save big
                          </span>
                        </span>
                      </p>
                    </div>
                    <hr />
                  </div>
                  {/* Desktop Button */}
                  <div className="hidden md:block lg:block xl:block w-full">
                    <div className="mt-4 flex flex-col md:flex-row lg:flex-row xl:flex-row gap-5 items-center">
                      <h1 className="text-lg md:text-xl lg:text-2xl font-bold tracking-wider">
                        Quantity
                      </h1>
                      <div className="flex gap-8 items-center">
                        <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-10 border-gray-700">
                          <button
                            onClick={() => setQuantity(quantity - 1)}
                            disabled={quantity === 1}
                            className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none text-heading border-e border-gray-700 text-gray-900 hover:text-black w-8 md:w-20 xl:w-20"
                          >
                            <span className="text-dark text-base font-bold text-[30px]">
                              {/* <FiMinus size={20} /> */} -
                            </span>
                          </button>
                          <p className="font-semibold flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8 md:w-20 xl:w-20">
                            {quantity}
                          </p>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            // disabled={quantity === 10}
                            className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none text-heading border-s border-gray-700 text-gray-900 hover:text-black w-8 md:w-20 xl:w-20"
                          >
                            <span className="text-dark text-base font-bold text-[26px]">
                              {/* <FiPlus size={20} /> */} +
                            </span>
                          </button>
                        </div>
                        <p className="text-black font-bold tracking-wider w-full font-sans text-lg md:text-2xl">
                          Rs {calculatePrice(parseInt(el.discounted_price))}/-
                          <span className="text-xs ml-1 text-gray-700 font-semibold">
                            (incl. of all taxes)
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-8 flex flex-col md:flex-row lg:flex-row xl:flex-row gap-2 items-center">
                      <button
                        className="p-2 bg-[#fff] w-60 text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-[#FFE342] uppercase flex justify-center items-center gap-3"
                        onClick={handleAddToCart}
                      >
                        <AiOutlineShoppingCart className="" size={25} />
                        Add To Cart
                      </button>
                      <button
                        className="p-2 bg-[#FFE342] w-60 text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-[#027100] uppercase flex justify-center items-center gap-2"
                        onClick={handleBuyNow}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                  {/*  */}
                  <div className="hidden md:hidden lg:block xl:block w-[480px] animate-pulse">
                    <h1 className="text-lg text-center font-bold tracking-wide">
                      Same Day Delivery & Assembly
                    </h1>
                  </div>
                  {/* Product Details */}
                  <div className="mt-2">
                    <h1 className="text-xl font-bold py-1">Product Overview</h1>
                    <hr />
                    <div className="p-1">
                      {el.custom_fields.map((field, i) => {
                        return (
                          <div className="flex items-center gap-2 my-2" key={i}>
                            <div className="flex items-center gap-1 w-[35%]">
                              <p className="text-sm font-bold text-black tracking-wider">
                                {field.title}
                              </p>
                            </div>
                            <div className="w-10 font-bold">
                              {/* <IoMdArrowDropright
                                className="text-black"
                                size={15}
                              /> */}{" "}
                              :
                            </div>
                            <div className="text-gray-800 text-start font-semibold text-sm tracking-wider w-full">
                              {field.value}
                            </div>
                            {/*  */}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <Lightbox
                  onPrev={() => gotoPrevious(el.images)}
                  onNext={() => gotoNext(el.images)}
                  currentImageIndex={currentImageIndex}
                  setCurrentIndex={setCurrentIndex}
                  isOpen={isImagePreviewOpen}
                  onClose={() => setOpen(false)}
                  images={el.images.map((image) => ({
                    src:
                      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
                      image.path_1620x1620,
                    loading: "lazy",
                    alt: "Image is not available",
                  }))}
                  currentIndex={currentImageIndex}
                  /* Add your own UI */
                  renderHeader={() => (
                    <ModalHeader
                      name={el.name}
                      closeModal={setImagePreviewOpen}
                    />
                  )}
                  // renderFooter={() => (<CustomFooter />)}
                  // renderPrevButton={() => (<GoArrowLeft />)}
                  // renderNextButton={() => <GoArrowRight />}
                  // renderImageOverlay={() => (<ImageOverlayComponent >)}

                  /* Add styling */
                  // className="cool-class"
                  style={{ background: "white" }}
                  /* Handle closing */
                  // onClose={() => setImagePreviewOpen(false)}
                  /* Use single or double click to zoom */
                  // singleClickToZoom

                  /* react-spring config for open/close animation */
                  // pageTransitionConfig={{
                  //   from: { transform: "scale(0.75)", opacity: 0 },
                  //   enter: { transform: "scale(1)", opacity: 1 },
                  //   leave: { transform: "scale(0.75)", opacity: 0 },
                  //   config: { mass: 1, tension: 320, friction: 32 }
                  // }}
                />
                <Modal
                  centered={true}
                  open={open}
                  width={"100%"}
                  bodyStyle={{
                    // height: "96vh",
                    padding: 0,
                    margin: 0,
                    width: "100%",
                  }}
                  maskStyle={makeStyle}
                  closable={false}
                  footer={null}
                  className="custom-modal"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-gray-700 w-[80%] md:w-[85%] lg:w-full xl:w-full">
                      {el.name}
                    </p>
                    <FiX
                      onClick={() => setOpen(false)}
                      className="text-black text-xl cursor-pointer"
                    />
                  </div>
                  {/* <ModalSlider2 images={el.images} /> */}
                </Modal>
              </div>
            );
          })}
          <DetailTabs productDetails={productDetails} />
          <SimilarProducts slug={CategorySlug} />
          <div className="">
            <Review slug={slug} />
          </div>
          <MainPageFeatures />
        </div>
      )}
      <ToastContainer />
      {/* <Modal
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
      </Modal> */}
    </>
  );
};

export default SingleProductPage;
