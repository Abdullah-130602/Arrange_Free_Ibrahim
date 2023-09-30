import { Skeleton, Tabs, Tooltip, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Heart from "react-heart";
import { AiFillStar } from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { GiSofa } from "react-icons/gi";
import ProductListingCard from "../../../Components/Product/ProductListingCard";
import CategoryCards from "../../Home/CategoryCards/CategoryCards";
import Banner from "../../Home/Banner/Banner";
import MainPageFeatures from "../../Home/MainPageFeatures";
import RecentlyVisited from "../../Home/RecentlyVisited/RecentlyVisited";
import CategoryFooter from "../../Layout/Footer/CategoryFooter";
import LandingCarousal from "../../../Components/Carousal/LandingCarousal";
import Heading from "../../../Components/Heading/Heading";
import { UserContext } from "../../../Context/UserContext";
import Container from "../../Container";
import Catlog from "../../Home/Catlog/Catlog";
import TopBargains from "../../Home/BestDeal/TopBargains";
import CategoryBar from "../../../Components/Category/CategoryBar";

const Store = () => {
  const { isLogin } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [SkeletonLoad, setSkeletonLoad] = useState(true);
  const skeletonArray = Array.from({ length: 8 }, (_, index) => index);

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
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
  }, [isLogin]);

  const [bestDealData, setBestDealDData] = useState([]);
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

  const [OfferBanner, setOfferBanner] = useState();
  const getBanners = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      "https://main-backend.hapspro.com/Offers/getOffersById/16",
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
  }, []);

  return (
    <>
      <Container className="mt-2 md:mt-2 lg:mt-0 error-message">
        <div className="relative">
          <LandingCarousal />
          <div className="absolute bg-white rounded-xl bottom-2 left-2 z-10">
            <div className="flex justify-center items-center gap-10 my-10 mx-2 md:mx-10">
              <div className="">
                <img
                  src="/logo.png"
                  alt=""
                  className="w-40 h-40 object-contain bg-[#027100] rounded-full"
                />
              </div>
              <div>
                <h1 className="text-xl md:text-xl lg:text-3xl text-black tracking-wide font-extrabold">
                  Orient Furniture
                </h1>
                <h1 className="text-base text-gray-800 tracking-wide font-semibold">
                  Orient Furniture{" "}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="my-10">
          <CategoryBar data={data} loading={Loader} />
          <TopBargains
            bestDealData={bestDealData}
            skeletonForBestDealArray={skeletonForBestDealArray}
            SkeletonLoad={SkeletonLoad}
          />
        </div>
        {/* <Banner bannerImage={OfferBanner} className="mx-2 xl:mx-0" /> */}
        <MainPageFeatures />
        {/* <Catlog /> */}
        {/* <RecentlyVisited /> */}
        <CategoryFooter Category={data} />
      </Container>
    </>
  );
};

export default Store;
