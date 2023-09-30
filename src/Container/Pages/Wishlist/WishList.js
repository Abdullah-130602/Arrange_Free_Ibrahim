import React, { useEffect, useState } from "react";
import WishListCardData from "./WishListCardData";
import Heading from "../../../Components/Heading/Heading";
import { message } from "antd";

const WishList = () => {
  const [ProductCardData, setProductCardData] = useState([]);
  const [SkeletonLoad, setSkeletonLoad] = useState(true);
  const skeletonArray = Array.from({ length: 8 }, (_, index) => index);


  const getAllWishlistData = async (status) => {
    setSkeletonLoad(status);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        `wishlist/getwishlistById/${localStorage.getItem("CID")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setProductCardData(result.data);
          setSkeletonLoad(false);
        }
      })
      .catch((error) => console.log("error", error));
    setTimeout(() => {
      setSkeletonLoad(false);
    }, 1000);
  };

  useEffect(() => {
    getAllWishlistData();
  }, []);

  const [messageApi, contextHolder] = message.useMessage();
  const deleted = () => {
    messageApi.error("Removed From Wishlist!");
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleDeleteWishlist = (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        `wishlist/deletewishlist/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          deleted();
          getAllWishlistData(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="mx-2 md:mx-16 lg:mx-20 xl:mx-20 flex flex-col gap-5 md:gap-10">
      <div className="mt-5 md:mt-10">
        <Heading spanHeading="My Wishlist" />
      </div>
      <WishListCardData
        contextHolder={contextHolder}
        ProductCardData={ProductCardData}
        handleDeleteWishlist={handleDeleteWishlist}
        SkeletonLoad={SkeletonLoad}
        skeletonArray={skeletonArray}
      />
    </div>
  );
};

export default WishList;
