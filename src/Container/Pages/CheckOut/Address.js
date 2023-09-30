import React, { useEffect, useState } from "react";
import InputArea from "./InputArea";
import { IoReturnUpBackOutline, IoArrowForward } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { TbCurrentLocation } from "react-icons/tb";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
      color: "#000",
    }}
    spin
  />
);

const Address = () => {
  let Navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", loading);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [loading]);

  // Pincode Validation
  const [loader, setLoader] = useState(false);

  const [CustomerData, setCustomerData] = useState([]);

  const getCustomerData = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://backend.dorfee.in/customer/getCustomerById/${localStorage.getItem(
        "CID"
      )}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setCustomerData(result.data);
        setFName(result.data[0]["name"]);
        setEmail(result.data[0]["email"]);
        setMobile(result.data[0]["mobile_no"]);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  //   Data Storing Hooks

  const [preLocation, setPreLocation] = useState();

  const handleGetMyLocation = async () => {
    setLoader(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            const data = await response.json();
            console.log(data.address);
            await setPreLocation(data.address);
            setPincode(data.address.postcode);
            setAdress(data.display_name);
            setCity(data.address.city);
            setState(data.address.state);
            setCountry(data.address.country);
          } catch (error) {
            console.log(error);
            alert(error);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  useEffect(() => {
    handleGetMyLocation();
  }, []);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [label, setLabel] = useState("");

  //   Error Hooks
  const [fNameError, setFNameError] = useState(null);
  const [lNameError, setLNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [mobileError, setMobileError] = useState(null);
  const [addressError, setAdressError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [stateError, setStateError] = useState(null);
  const [countryError, setCountryError] = useState(null);
  const [pincodeError, setPincodeError] = useState(null);

  const handleAddAddress = async (e) => {
    var raw = JSON.stringify({
      customer_id: localStorage.getItem("CID"),
      first_name: fName,
      last_name: lName,
      email: email,
      phone: mobile,
      street_address: address,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
      address_label: label === "" ? "Home" : label,
    });
    console.log(JSON.parse(raw));
    e.preventDefault();
    window.scroll(0, 0);
    setFNameError();
    setLNameError();
    setEmailError();
    setMobileError();
    setAdressError();
    setCityError();
    setStateError();
    setCountryError();
    setPincodeError();
    if (fName === "") {
      setFNameError("enter your first name");
    } else if (email === "") {
      setEmailError("enter your email");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email");
    } else if (mobile === "") {
      setMobileError("enter your phone number");
    } else if (!/^\d{10}$/.test(mobile)) {
      setMobileError("Please enter a valid phone number");
    } else if (address === "") {
      setAdressError("enter your address");
    } else if (city === "") {
      setCityError("enter your city");
    } else if (state === "") {
      setStateError("enter your state");
    } else if (country === "") {
      setCountryError("enter your country");
    } else if (pincode === "") {
      setPincodeError("enter your pincode");
    } else {
      await setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "ci_session=d7790dova0jiegd7faad8emsllk8k4bn");

      var raw = JSON.stringify({
        customer_id: localStorage.getItem("CID"),
        first_name: fName,
        last_name: lName,
        email: email,
        phone: mobile,
        street_address: address,
        city: city,
        state: state,
        country: country,
        pincode: pincode,
        address_label: label === "" ? "Home" : label,
      });
      console.log(raw);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
          "product/createCustomerAddress",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            Navigate("/checkout");
          }
        })
        .catch((error) => console.log("error", error));
    }
    await setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="relative bg-[rgba(255,255,255,0.7)] h-screen overflow-hidden" />
          {loading && (
            <div className="flex justify-center">
              <div className="absolute top-[50%]">
                <Loader />
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          <div className="bg-white flex justify-center rounded-md" id="fname">
            <div className="flex items-center gap-2 m-8 p-5 font-bold text-2xl text-gray-800 border-b">
              <FaMapMarkerAlt />
              <span className="text-gray-800 tracking-wider">
                Add a new address
              </span>
            </div>
          </div>
          <div className="mx-2 md:mx-20 lg:mx-72 m-10">
            <button
              className="mx-2 flex gap-2 items-center tracking-wider text-red-600"
              onClick={handleGetMyLocation}
            >
              <TbCurrentLocation className="" />
              Get your current location
            </button>
            <hr className="my-5" />
            <div>
              <form className="">
                <div className="form-group">
                  <h2 className="font-semibold font-serif text-base text-gray-700 pb-3 tracking-wider">
                    01. Recievers Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className="">
                      <InputArea
                        label="Name"
                        name="firstName"
                        type="text"
                        className={`${
                          fNameError
                            ? "border border-red-500 placeholder:text-red-500"
                            : "border border-gray-300"
                        }`}
                        placeholder="first name"
                        value={fName}
                        onChange={(e) => setFName(e.target.value)}
                        autoComplete="off"
                      />
                      {fNameError && (
                        <div className="error-message text-xs text-red-500 font-semibold ml-2">
                          {fNameError}
                        </div>
                      )}
                    </div>

                    {/* <div className="">
                      <InputArea
                        label="Last name"
                        name="lastName"
                        type="text"
                        className={`${
                          lNameError
                            ? "border border-red-500 placeholder:text-red-500"
                            : "border border-gray-300"
                        }`}
                        placeholder="last name"
                        value={lName || ""}
                        onChange={(e) => setLName(e.target.value)}
                        autoComplete="off"
                      />
                      {lNameError && (
                        <div className="error-message text-xs text-red-500 font-semibold ml-2">
                          {lNameError}
                        </div>
                      )}
                    </div> */}

                    <div className="">
                      <InputArea
                        label="Email address"
                        name="email"
                        type="email"
                        className={`${
                          emailError
                            ? "border border-red-500 placeholder:text-red-500"
                            : "border border-gray-300"
                        }`}
                        placeholder="youremail@gmail.com"
                        value={email || ""}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                      />
                      {emailError && (
                        <div className="error-message text-xs text-red-500 font-semibold ml-2">
                          {emailError}
                        </div>
                      )}
                    </div>

                    <div className="">
                      <InputArea
                        label="Phone number"
                        name="contact"
                        type="number"
                        className={`otp-input ${
                          mobileError
                            ? "border border-red-500 placeholder:text-red-500"
                            : "border border-gray-300"
                        }`}
                        placeholder="+062-123456789"
                        value={mobile || ""}
                        onChange={(e) => setMobile(e.target.value)}
                        autoComplete="off"
                      />
                      {mobileError && (
                        <div className="error-message text-xs text-red-500 font-semibold ml-2">
                          {mobileError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group mt-12">
                  <h2 className="font-semibold font-serif text-base text-gray-700 pb-3 tracking-wider">
                    02. Shipping Details
                  </h2>
                  <div className="relative mb-3">
                    <InputArea
                      label="Pin Code"
                      name="zipCode"
                      type="text"
                      className={`${
                        pincodeError
                          ? "border border-red-500 placeholder:text-red-500"
                          : "border border-gray-300"
                      }`}
                      placeholder="123456"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      autoComplete="off"
                    />
                    {pincodeError && (
                      <div className="error-message text-xs text-red-500 font-semibold ml-2">
                        {pincodeError}
                      </div>
                    )}
                    {loader && (
                      <Spin
                        indicator={antIcon}
                        className="absolute right-2 top-8"
                      />
                    )}
                  </div>
                  <div className="col-span-6">
                    <InputArea
                      label="Street address"
                      name="address"
                      type="text"
                      className={`${
                        addressError
                          ? "border border-red-500 placeholder:text-red-500"
                          : "border border-gray-300"
                      }`}
                      placeholder="address"
                      value={address}
                      onChange={(e) => setAdress(e.target.value)}
                      autoComplete="off"
                    />
                    {addressError && (
                      <div className="error-message text-xs text-red-500 font-semibold ml-2">
                        {addressError}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
                    <div>
                      <InputArea
                        label="City"
                        name="city"
                        type="text"
                        className={`${
                          cityError
                            ? "border border-red-500 placeholder:text-red-500"
                            : "border border-gray-300"
                        }`}
                        placeholder="Mumbai"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        autoComplete="off"
                      />
                      {cityError && (
                        <div className="error-message text-xs text-red-500 font-semibold ml-2">
                          {cityError}
                        </div>
                      )}
                    </div>

                    <div>
                      <InputArea
                        label="State"
                        name="country"
                        type="text"
                        className={`${
                          stateError
                            ? "border border-red-500 placeholder:text-red-500"
                            : "border border-gray-300"
                        }`}
                        placeholder="Maharashtra"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        autoComplete="off"
                      />
                      {stateError && (
                        <div className="error-message text-xs text-red-500 font-semibold ml-2">
                          {stateError}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
                    <div>
                      <InputArea
                        label="Country"
                        name="country"
                        type="text"
                        className={`${
                          countryError
                            ? "border border-red-500 placeholder:text-red-500"
                            : "border border-gray-300"
                        }`}
                        placeholder="India"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        autoComplete="off"
                      />
                      {countryError && (
                        <div className="error-message text-xs text-red-500 font-semibold ml-2">
                          {countryError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-group mt-12">
                  <h2 className="font-semibold font-serif text-base text-gray-700 tracking-wider">
                    03. Address Label
                  </h2>
                  <label
                    htmlFor="countries"
                    className="block text-gray-500 font-medium text-sm leading-none mt-5 mb-2 tracking-wider"
                  >
                    Select an option
                  </label>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                    onChange={(e) => setLabel(e.target.value)}
                    autoComplete="off"
                  >
                    <option
                      value="Home"
                      className="tracking-wider"
                      defaultValue
                    >
                      Home
                    </option>
                    <option value="Office" className="tracking-wider">
                      Office
                    </option>
                    <option value="Others" className="tracking-wider">
                      Others
                    </option>
                  </select>
                </div>

                <div className="flex flex-col md:flex-row lg:flex-row justify-end mt-10">
                  <div className="w-full md:w-60 lg:w-60">
                    <button
                      className="bg-indigo-50 border tracking-wider border-indigo-100 rounded-full py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full"
                      //   onClick={handleBack}
                    >
                      <span className="text-xl mr-2">
                        <IoReturnUpBackOutline />
                      </span>
                      Continue Shopping
                    </button>
                  </div>
                  <div className="ml-0 mt-4 md:mt-0 lg:mt-0 md:ml-5 lg:ml-5 w-full md:w-52 lg:w-52">
                    <button
                      onClick={handleAddAddress}
                      type="submit"
                      className="p-2 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-black hover:bg-white border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2" 
                    >
                      <span className="flex justify-center text-center tracking-wider">
                        Confirm
                        <span className="text-xl ml-2">
                          <IoArrowForward />
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Address;
