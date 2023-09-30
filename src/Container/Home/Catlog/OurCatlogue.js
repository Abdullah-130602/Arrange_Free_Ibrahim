import React, { useContext, useEffect, useState } from "react";
import Heading from "../../../Components/Heading/Heading";
import Container from "../../Container";
import TopBargains from "../BestDeal/TopBargains";
import { Link } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import { Empty, message } from "antd";
import { CartContext } from "../../../Context/CartContext";
import { LoginContext } from "../../../Context/LoginContext";
import { UserContext } from "../../../Context/UserContext";

const OurCatlogue = () => {
  const [data, setData] = useState([]);
  const [SkeletonLoad, setSkeletonLoad] = useState(true);
  const skeletonForBestDealArray = Array.from(
    { length: 10 },
    (_, index) => index
  );

  const GetDorfeesProducts = async () => {
    setSkeletonLoad(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        "Product/get-10-percent-products-of-homeappliances",
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
    GetDorfeesProducts();
  }, []);
  const { isLogin } = useContext(UserContext);
  const { wishlistCount, setWishlistCount } = useContext(CartContext);
  const [messageApi, contextHolder] = message.useMessage();
  const { setLoginModal } = useContext(LoginContext);
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
            GetDorfeesProducts();
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
          GetDorfeesProducts();
          deleted();
          // setLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Container className="my-10">
      {contextHolder}
      <div>
        <Heading
          spanHeading={
            <span>
              Visit{" "}
              <span className="font-extrabold text-3xl text-[#027100] tracking-widest">
                Arrange Free's
              </span>{" "}
              Products
            </span>
          }
        />
      </div>
      {/* Products */}
      {data &&
        data.map((el, i) => {
          return (
            <div key={i} className="">
              <Link
                to={`/sub-category/${el.slug}`}
                className="text-xl md:text-2xl lg:text-4xl font-extrabold text-gray-800 hover:underline tracking-widest"
              >
                # {el.title}
              </Link>
              {/* {el.data.map((bestDealData, index) => {
                return ( */}
              <div>
                {el.data.length > 0 ? (
                  <TopBargains
                    bestDealData={el.data}
                    skeletonForBestDealArray={skeletonForBestDealArray}
                    SkeletonLoad={SkeletonLoad}
                    handleHeartClick={handleHeartClick}
                    handleDeleteWishlist={handleDeleteWishlist}
                  />
                ) : (
                  <Empty className="my-10" />
                )}
              </div>
              {/* );
              })} */}
              <div>
                <Link
                  to={`/sub-category/${el.slug}`}
                  className="p-2 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-[#027100] border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                >
                  View More Products For {el.title}{" "}
                  <span>
                    <HiArrowLongRight className="text-[#027100]" size={30} />
                  </span>
                </Link>
              </div>
              <hr className="my-4" />
            </div>
          );
        })}
    </Container>
  );
};

export default OurCatlogue;
