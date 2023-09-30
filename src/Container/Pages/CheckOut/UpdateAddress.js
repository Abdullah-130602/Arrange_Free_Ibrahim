import React, { useEffect, useState } from "react";
import InputArea from "./InputArea";
import { IoReturnUpBackOutline, IoArrowForward } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

const Address = () => {
  let Navigate = useNavigate();

  const [searchParam] = useSearchParams();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", loading);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [loading]);

  let Data = JSON.parse(searchParam.get("data"));

  //   Data Storing Hooks
  const [fName, setFName] = useState(Data.first_name);
  const [lName, setLName] = useState(Data.last_name);
  const [email, setEmail] = useState(Data.email);
  const [mobile, setMobile] = useState(Data.phone);
  const [address, setAdress] = useState(Data.street_address);
  const [city, setCity] = useState(Data.city);
  const [state, setState] = useState(Data.state);
  const [country, setCountry] = useState(Data.country);
  const [pincode, setPincode] = useState(Data.pincode);
  const [label, setLabel] = useState(Data.address_label);

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

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
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
      myHeaders.append("Cookie", "ci_session=0qskm3q5bt17nvjhm90puml6nr2iakt1");

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
        address_label: label ? label : Data.address_label,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        process.env.REACT_APP_HAPS_MEDIA_BASE_URL +
          `product/updateCustomerAddress/${Data.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          //   console.log(result);
          Navigate("/checkout");
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
        <div>
          <div className="bg-white flex justify-center rounded-md" id="fname">
            <div className="flex items-center m-10 p-5 font-bold text-2xl text-gray-800">
              <FaMapMarkerAlt />
              <span className="text-gray-800">Add a new address</span>
            </div>
          </div>
          <div className="mx-2 md:mx-20 lg:mx-72 m-10">
            <div>
              <form className="mt-10">
                <div className="form-group">
                  <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                    01. Recievers Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className="">
                      <InputArea
                        label="First Name"
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
                        maxLength={10}
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
                  <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                    02. Shipping Details
                  </h2>

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
                      value={address || ""}
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
                        value={city || ""}
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
                        value={state || ""}
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
                        value={country || ""}
                        onChange={(e) => setCountry(e.target.value)}
                        autoComplete="off"
                      />
                      {countryError && (
                        <div className="error-message text-xs text-red-500 font-semibold ml-2">
                          {countryError}
                        </div>
                      )}
                    </div>
                    <div>
                      <InputArea
                        label="Pin Code"
                        name="zipCode"
                        type="number"
                        className={`otp-input ${
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
                    </div>
                  </div>
                </div>
                <div className="form-group mt-12">
                  <h2 className="font-semibold font-serif text-base text-gray-700">
                    03. Address Label
                  </h2>
                  <label
                    htmlFor="countries"
                    className="block text-gray-500 font-medium text-sm leading-none mt-5 mb-2"
                  >
                    Select an option
                  </label>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
                    onChange={(e) => setLabel(e.target.value)}
                    autoComplete="off"
                  >
                    <option value="Home" defaultValue>
                      Home
                    </option>
                    <option value="Office">Office</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="flex flex-col md:flex-row lg:flex-row justify-end mt-10">
                  <div className="w-full md:w-60 lg:w-60">
                    <button
                      className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full"
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
                      onClick={handleUpdateAddress}
                      type="submit"
                      className="bg-black border border-black transition-all hover:scale-110 duration-500 rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                    >
                      <span className="flex justify-center text-center">
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
