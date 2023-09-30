import React from "react";
import RingLoader from "react-spinners/RingLoader";

const override = {
  display: "flex",
  justifyContent: "center",
  margin: "0 auto",
  borderColor: "red",
};

const Loader = () => {
  let loading = true;

  return (
    // <RingLoader
    //   color={"#000"}
    //   loading={loading}
    //   cssOverride={override}
    //   size={100}
    //   aria-label="Loading Spinner"
    //   data-testid="loader"
    // />
    <div>
      <img src="/images/loader/Loader.gif" className="w-20 h-20 bg-white" />
    </div>
  );
};

export default Loader;
