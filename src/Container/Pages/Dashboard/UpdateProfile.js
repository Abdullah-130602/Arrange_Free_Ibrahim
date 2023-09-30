import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import InputArea from "../CheckOut/InputArea";
import { message } from "antd";
import SyncLoader from "react-spinners/SyncLoader";

const override = {
  display: "flex",
  justifyContent: "center",
  margin: "0 auto",
  borderColor: "red",
};

const UpdateProfile = () => {
  let Navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Profile Update Succesfully",
    });
  };

  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const [CustomerData, setCustomerData] = useState([]);
  const [loading, setloading] = useState(true);

  const getCustomerData = async () => {
    setloading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
        `customer/getCustomerById/${localStorage.getItem("CID")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setCustomerData(result.data);
          setName(result.data[0]["name"]);
          setEmail(result.data[0]["email"]);
          setContact(result.data[0]["mobile_no"]);
          setloading(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  // Error Hooks
  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [contactError, setContactError] = useState();

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setContactError("");
    if (name === "") {
      setNameError("this feild is required");
    } else if (contact === "") {
      setContactError("this feild is required");
    } else if (email === "") {
      setEmailError("this feild is required");
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );

      var raw = JSON.stringify({
        name: name,
        email: email,
        mobile_no: contact,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
          `customer/updateCustomer/${localStorage.getItem("CID")}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            success();
          } else if (result.status === 400) {
            setContactError(result.error.validation.mobile_no);
            setEmailError(result.error.validation.email);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <Dashboard>
      {contextHolder}
      <div className="max-w-screen-2xl">
        <div className="">
          <div className="">
            <div className="px-4 sm:px-0">
              <h2 className="text-xl font-sans font-bold mb-5">
                Update Profile
              </h2>
            </div>
          </div>
        </div>
        <hr className="border border-black" />
        {loading && (
          <div className="my-5 flex items-center gap-4">
            <SyncLoader
              color={"#027100"}
              loading={true}
              // cssOverride={override}
              size={5}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <p className="text-sm font-semibold tracking-wide text-[#027100]">
              Fetching your details...
            </p>
          </div>
        )}
        <form className="mx-2 md:mx-2 lg:mx-20 xl:mx-20 mt-10">
          <div className="lg:mt-6 mt-4 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              <div className="">
                <InputArea
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {nameError && (
                  <div className="text-xs font-semibold text-red-500 ml-2">
                    {nameError}
                  </div>
                )}
              </div>

              <div className="">
                <InputArea
                  label="Phone/Mobile"
                  name="phone"
                  type="tel"
                  placeholder="Your Mobile Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                {contactError && (
                  <div className="text-xs font-semibold text-red-500 ml-2">
                    {contactError}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full mt-2">
              <InputArea
                label="Email Address"
                name="email"
                type="email"
                placeholder="Your Email"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <div className="text-xs font-semibold text-red-500 ml-2">
                  {emailError}
                </div>
              )}
            </div>
            <div className="mt-5 text-right">
              <button
                onClick={handleUpdateProfile}
                type="submit"
                className="p-2 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-[#027100] border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
              >
                Update Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default UpdateProfile;
