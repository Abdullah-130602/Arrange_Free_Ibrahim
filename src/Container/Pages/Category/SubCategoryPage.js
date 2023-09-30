import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import SubCategoryCards from "../../Home/CategoryCards/SubCategoryCards";
import BestDeal2 from "../../Home/BestDeal/BestDeal2";
import CategoryPageCarousal from "../../../Components/Carousal/CategoryPageCarousal";
import Heading from "../../../Components/Heading/Heading";
import Container from "../../Container";
import TopBargains from "../../Home/BestDeal/TopBargains";
import { Divider, message } from "antd";
import Banner from "../../Home/Banner/Banner";
import { HiArrowNarrowRight } from "react-icons/hi";
import { CartContext } from "../../../Context/CartContext";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import { LoginContext } from "../../../Context/LoginContext";
import {
  Link as ScrollLink,
  Element,
  animateScroll as scroller,
} from "react-scroll";

const SubCategoryPage = () => {
  let { slug } = useParams();
  const location = useLocation();
  const key = `${slug}-${location.pathname}`;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);

  const { wishlistCount, setWishlistCount } = useContext(CartContext);
  const [messageApi, contextHolder] = message.useMessage();
  const { isLogin } = useContext(UserContext);
  const { setLoginModal } = useContext(LoginContext);

  const [SkeletonLoad, setSkeletonLoad] = useState(true);
  const skeletonArray = Array.from({ length: 8 }, (_, index) => index);
  const SubCategorySkeletonArray = Array.from(
    { length: 5 },
    (_, index) => index
  );
  const skeletonForBestDealArray = Array.from(
    { length: 10 },
    (_, index) => index
  );

  const [SubCategoryData, setSubCategoryData] = useState("");
  const [SelectedSubCategoryData, setSelectedSubCategoryData] = useState([]);
  const [Banners, setBanners] = useState([]);

  const getSubCategoryPageData = async () => {
    setSkeletonLoad(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        `admin/getHomeZoneAppliancesById/${slug}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status === 200) {
          setSubCategoryData(result);
          setSubCategoryName({
            name: result.HomeZone_Sub_Category[0].title,
            slug: result.HomeZone_Sub_Category[0].slug,
          });
          // setSelectedSubCategoryData(
          //   SelectedSubCategoryData
          //     ? SelectedSubCategoryData
          //     : result.HomeZone_Sub_Category[0].slug
          // );
          getAllProducts(result.HomeZone_Sub_Category[0].slug);
          setBanners(result.Banners);
          getBestDeals(result.Data.id);
          setSkeletonLoad(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const [BestDealData, setBestDealData] = useState([]);

  const getBestDeals = async (id) => {
    setSkeletonLoad(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        `admin/getBestHomeZoneAppliancesDeals/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status === 200) {
          setBestDealData(result.data);
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
    getSubCategoryPageData();
    getBanners();
  }, [key]);

  // const capitalizedText =
  //   SelectedSubCategoryData &&
  //   SelectedSubCategoryData.split("-")
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //     .join(" ");

  const [ProductCardData, setProductCardData] = useState([]);
  const [SubCategoryName, setSubCategoryName] = useState("");

  const [ProductSkeletonLoad, setProductSkeletonLoad] = useState(true);

  const getAllProducts = async (id) => {
    setProductSkeletonLoad(true);
    setSelectedSubCategoryData(id);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      customer_id: localStorage.getItem("CID"),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        `product/getProductByHomeCategoryId/${id}`,

      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.status === 200) {
          setProductCardData(result.data);
          setProductSkeletonLoad(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

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
            getAllProducts(SelectedSubCategoryData);
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
          getAllProducts(SelectedSubCategoryData);
          deleted();
          // setLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Container>
        {contextHolder}
        <CategoryPageCarousal
          SubCategoryBanners={Banners}
          SkeletonLoad={SkeletonLoad}
        />
        {/* <hr className="border-t-[0.5px] border-gray-200 mx-2 md:mx-10 lg:mx-20 xl:mx-20 mt-5" /> */}
        <div className="mt-4">
          <Heading
            className="prompt-font tracking-widest "
            spanHeading={SubCategoryData && SubCategoryData.Data.slug}
          />
          <div className="flex justify-center">
            <p className="w-full md:w-1/2 text-sm md:text-base text-center">
              Discover a world of elegance and functionality for your home with
              our meticulously crafted interior products, designed to reflect
              your unique taste and elevate your living experience.
            </p>
          </div>
        </div>
        <div className="static md:static lg:sticky top-[110px] md:top-20 z-10 bg-white">
          <ScrollLink
            activeClass="active"
            to="go-to-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={900}
            // className="absolute bottom-2 flex gap-2 items-center underline"
          >
            <SubCategoryCards
              data={SubCategoryData.HomeZone_Sub_Category}
              SelectedSubCategoryData={SelectedSubCategoryData}
              setSelectedSubCategoryData={setSelectedSubCategoryData}
              getAllProducts={(slug) => getAllProducts(slug)}
              SubCategorySkeletonArray={SubCategorySkeletonArray}
              SkeletonLoad={SkeletonLoad}
              setSubCategoryName={setSubCategoryName}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-x-[30px] md:gap-x-[50px] gap-y-4 cursor-pointer"
            />
          </ScrollLink>
          <Element name="go-to-section" />
        </div>
        <div className="p-2">
          <h1 className="text-xl md:text-2xl font-semibold">
            {SubCategoryName.name} :
          </h1>
          <Divider />
          <TopBargains
            bestDealData={ProductCardData}
            skeletonForBestDealArray={skeletonForBestDealArray}
            SkeletonLoad={ProductSkeletonLoad}
            handleDeleteWishlist={handleDeleteWishlist}
            handleHeartClick={handleHeartClick}
          />
          <div className="flex justify-center md:justify-center lg:justify-end ">
            <Link
              to={`/category/${SubCategoryName.slug}`}
              className="hover:underline flex gap-2 items-center text-white bg-[#027100] p-1 md:p-1.5 px-10 md:px-24 rounded-full text-xs md:text-base"
            >
              View more product of {SubCategoryName.name}
              <span>
                <HiArrowNarrowRight />
              </span>
            </Link>
          </div>
        </div>
        <hr className="border-t-[0.5px] border-gray-200 mx-2 md:mx-10 lg:mx-20 xl:mx-20 my-5" />
        <Banner bannerImage={OfferBanner} className="mx-2 xl:mx-0" />
        <BestDeal2
          bestDealData={BestDealData}
          skeletonForBestDealArray={skeletonForBestDealArray}
          SkeletonLoad={SkeletonLoad}
          slug={SubCategoryData && SubCategoryData.Data.slug}
        />
      </Container>
    </>
  );
};

export default SubCategoryPage;
