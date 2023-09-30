import React, { useContext, useEffect } from "react";
import ReactStars from "react-stars";
import { MdOutlineRateReview, MdRateReview } from "react-icons/md";
import { TiUser } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { Divider, Modal } from "antd";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { UserContext } from "../../../Context/UserContext";
import { BsArrowRight } from "react-icons/bs";
import { LoginContext } from "../../../Context/LoginContext";

const Review = ({ slug }) => {
  const { isLogin, setIsLogin } = useContext(UserContext);
  const { loginModal, setLoginModal } = useContext(LoginContext);

  // const [loginModal, setLoginModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  // Review Modal
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openCreateReviewModal, setOpenCreateReviewModal] = useState(false);

  const handleRegister = () => {
    setShowLogin(false);
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  const [ReviewText, setReviewText] = useState("");
  const [RatingStar, setRatingStar] = useState(0);

  const handleRating = (newRating) => {
    setRatingStar(newRating);
  };

  const [customerReviews, setReviews] = useState([]);
  const [AverageRating, setAverageRating] = useState();
  const getAllReviews = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        `product/getRatingReviewById/${slug}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setReviews(result.data);
        setAverageRating(result.avg_data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  const handleAddReview = () => {
    if (isLogin) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        customer_id: localStorage.getItem("CID"),
        product_id: slug,
        rating: RatingStar,
        review: ReviewText,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
          "product/createRatingReview",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            getAllReviews();
            setRatingStar(0);
            setReviewText("");
            setOpenCreateReviewModal(false);
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      setLoginModal(true);
    }
  };

  return (
    <div className="p-2 mx-0 md:mx-10 lg:mx-10 xl:mx-20 my-10">
      <Divider />
      <h1 className="text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold tracking-wider">
        Customer Reviews
      </h1>
      <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row gap-8 mt-5 md:mt-5 lg:mt-10 xl:mt-10">
        <div className="basis-1/2 border-r border-transparent md:border-transparent lg:border-gray-200">
          <div className="sticky top-32 mr-2">
            <div className="w-full bg-white border-none md:border-none lg:border-r">
              <div>
                <h1 className="text-lg text-gray-700">
                  Customer's rating summary
                </h1>
              </div>
              {/* Star Average */}
              <div className="flex items-center justify-center gap-5 md:gap-5 lg:gap-10">
                <div className="flex flex-col gap-1.5 my-7 w-2/3">
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600 font-semibold w-2 text-center">
                      5
                    </p>
                    <div className="relative w-full">
                      <div className="p-2 bg-gray-200 rounded-lg" />
                      <div
                        className={`p-2 bg-[#FABB05] rounded-md absolute top-0 w-[${
                          AverageRating && AverageRating.five
                        }%]`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600 font-semibold w-2 text-center">
                      4
                    </p>
                    <div className="relative w-full">
                      <div className="p-2 bg-gray-200 rounded-lg" />
                      <div
                        className={`p-2 bg-[#FABB05] rounded-md absolute top-0 w-[${
                          AverageRating && AverageRating.four
                        }%]`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600 font-semibold w-2 text-center">
                      3
                    </p>
                    <div className="relative w-full">
                      <div className="p-2 bg-gray-200 rounded-lg" />
                      <div
                        className={`p-2 bg-[#FABB05] rounded-md absolute top-0 w-[${
                          AverageRating && AverageRating.three
                        }%]`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600 font-semibold w-2 text-center">
                      2
                    </p>
                    <div className="relative w-full">
                      <div className="p-2 bg-gray-200 rounded-lg" />
                      <div
                        className={`p-2 bg-[#FABB05] rounded-md absolute top-0 w-[${
                          AverageRating && AverageRating.two
                        }%]`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600 font-semibold w-2 text-center">
                      1
                    </p>
                    <div className="relative w-full">
                      <div className="p-2 bg-gray-200 rounded-lg" />
                      <div
                        className={`p-2 bg-[#FABB05] rounded-md absolute top-0 w-[${
                          AverageRating && AverageRating.one
                        }%]`}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-7xl text-center">
                    {AverageRating ? parseInt(AverageRating.avg) : 0}
                  </h1>
                  <ReactStars
                    value={AverageRating ? parseInt(AverageRating.avg) : 0}
                    half={true}
                    count={5}
                    size={24}
                    edit={false}
                  />
                  <p className="text-gray-700 text-center">
                    {customerReviews ? customerReviews.length : 0} ratings
                  </p>
                </div>
              </div>
            </div>
            <div className="relative my-5">
              <hr />
              <button
                className="bg-gray-200 p-1 px-10 md:px-16 lg:px-16 rounded-full border hover:border-black transition-all ease-in-out duration-500 flex gap-3 items-center absolute -top-[15px] right-[20%] md:right-[25%]"
                onClick={() => setOpenCreateReviewModal(true)}
              >
                <MdOutlineRateReview />
                Write a review
              </button>
            </div>
          </div>
        </div>
        <div className="w-full border-none md:border-none lg:border-l xl:border-l relative">
          <div className="ml-0 md:ml-0 lg:ml-8 xl:ml-8 flex flex-col gap-2">
            {customerReviews ? (
              customerReviews.slice(0, 3).map((el, i) => {
                const isLastReview = i === 3 - 1;
                return (
                  <div key={i}>
                    <div className="flex">
                      <div className="w-10">
                        <FaUser className="mt-2" size={25} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-black">
                          {el.customer_name}
                        </p>
                        <p className="text-xs text-gray-700">a day ago</p>
                      </div>
                    </div>
                    <div>
                      <ReactStars
                        count={5}
                        size={20}
                        value={el.rating}
                        edit={false}
                      />
                    </div>
                    <div>
                      <p className="mr-1 md:mr-5 lg:mr-5">{el.review}</p>
                    </div>
                    {!isLastReview && (
                      <hr className="mr-1 md:mr-5 lg:mr-5 my-2" />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-10 ">
                <div className="flex items-center gap-4 justify-center">
                  <MdRateReview className="text-3xl" />
                  <p className="capitalize font-bold text-xl tracking-wider">
                    No Reviews for this Product
                  </p>
                </div>
              </div>
            )}
          </div>
          {customerReviews && customerReviews.length > 0 ? (
            <div className="relative my-5 mt-5">
              <hr />
              <button
                className="bg-gray-200 p-1.5 px-10 md:px-16 lg:px-16 rounded-full border hover:border-black transition-all ease-in-out duration-500 flex gap-3 items-center absolute -top-[15px] right-[10%] md:right-[25%] text-xs md:text-base"
                onClick={() => setOpenReviewModal(true)}
              >
                <MdOutlineRateReview />
                More customer review (
                {customerReviews ? parseInt(customerReviews.length) : 0})
                <BsArrowRight />
              </button>
            </div>
          ) : (
            false
          )}
        </div>
      </div>
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
      <Modal
        title={
          <div className="flex justify-between items-center mt-8 mx-1 md:mx-5 lg:mx-5">
            <p className="text-sm md:text-lg text-black">
              Luxury 3 seater sofa
            </p>
            <button
              className="p-1 px-2 md:px-10 rounded-full border border-gray-300 text-gray-800 font-medium transition-all ease-in-out duration-500 flex gap-2 items-center text-sm md:text-base"
              onClick={() => setOpenCreateReviewModal(true)}
            >
              <MdOutlineRateReview />
              Write a review
            </button>
          </div>
        }
        centered
        open={openReviewModal}
        onCancel={() => setOpenReviewModal(false)}
        footer={null}
        width={1000}
        maskStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        style={{ border: "0.5px #d3d3d3 solid", borderRadius: 10, zIndex: 100 }}
      >
        <div className="h-[650px] w-full overflow-y-scroll flex flex-col gap-2 mt-5 mx-1 md:mx-5 lg:mx-5">
          {customerReviews ? (
            customerReviews.map((el, i) => {
              return (
                <div key={i}>
                  <div className="flex">
                    <div className="w-10">
                      <FaUser className="mt-2" size={25} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-black">
                        {el.customer_name}
                      </p>
                      <p className="text-xs text-gray-700">a day ago</p>
                    </div>
                  </div>
                  <div>
                    <ReactStars
                      count={5}
                      size={20}
                      value={el.rating}
                      edit={false}
                    />
                  </div>
                  <div>
                    <p className="mr-1 md:mr-5 lg:mr-5">{el.review}</p>
                  </div>
                  <hr className="mr-1 md:mr-5 lg:mr-5 my-2" />
                </div>
              );
            })
          ) : (
            <div className="p-10 ">
              <div className="flex items-center gap-4 justify-center">
                <MdRateReview className="text-3xl" />
                <p className="capitalize font-bold text-xl tracking-wider">
                  No Reviews for this Product
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal>
      <Modal
        title={
          <div className="flex flex-col mx-2">
            <h1 className="text-gray-800 font-medium flex gap-2 items-center text-lg md:text-lg">
              <MdOutlineRateReview />
              Write a review
            </h1>
            <p className="text-sm md:text-sm text-black">
              Luxury 3 seater sofa
            </p>
            <hr className="shadow-lg my-5" />
          </div>
        }
        centered
        open={openCreateReviewModal}
        onCancel={() => setOpenCreateReviewModal(false)}
        footer={null}
        // width={1000}
        maskStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        style={{ border: "0.5px #d3d3d3 solid", borderRadius: 10 }}
      >
        <div className="flex flex-col gap-0">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white tracking-wider">
              Give Us a star
            </label>
            <ReactStars
              value={RatingStar}
              count={5}
              size={40}
              half={false}
              color2={"#FFE342"}
              onChange={handleRating}
              inputMode="numeric"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white tracking-wider"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows={8}
              className="block p-2.5 w-full text-xs font-semibold text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-black focus:border-black"
              placeholder="Write your thoughts here..."
              value={ReviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>
          <div className="my-5 grid grid-cols-2 gap-2">
            <button
              className="bg-gray-200 p-2 text-black w-full rounded-full font-bold font-sans text-sm md:text-base tracking-widest"
              onClick={() => setOpenCreateReviewModal(false)}
            >
              Cancel
            </button>
            <button
              className="p-2 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
              onClick={handleAddReview}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Review;
