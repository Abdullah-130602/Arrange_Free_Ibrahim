import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Button from "../../../Components/Button/Button";
import OTPInput from "react-otp-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Login = ({ setIsLogin, onRegister, closeModal }) => {
  const [otp, setOtp] = useState("");
  const [OtpError, setOtpError] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const [showMobileInput, setshowMobileInput] = useState(true);
  const [showOtpInput, setshowOtpInput] = useState(false);

  // Loader
  const [isLoading, setIsLoading] = useState(false);

  // Data Storing Hooks
  const [mobileNo, setMobileNo] = useState("");
  const [mobileNoError, setMobileNoError] = useState("");
  const [otpNumber, setotpNumber] = useState("");

  // Register
  const [showRegister, setshowRegister] = useState(false);
  const [UserName, setUserName] = useState("");
  const [UserNameError, setUserNameError] = useState("");

  const handleSendOTP = (e) => {
    e.preventDefault();
    setLoginError("");
    const isValidMobileNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobileNo);
    if (mobileNo === "") {
      setMobileNoError("please enter your mobile number");
    } else if (!isValidMobileNumber) {
      setMobileNoError("Mobile number is invalid:", mobileNo);
    } else {
      setIsLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        mobile_no: mobileNo,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "customer/send-otp",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            setshowMobileInput(false);
            setshowOtpInput(true);
            setMobileNoError("");
            setIsLoading(false);
          } else if (result.status === 404) {
            // setLoginError(result.error);
            setIsLoading(false);
            setshowMobileInput(false);
            setshowRegister(true);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  const reverse = (e) => {
    e.preventDefault();
    setotpNumber("");
    setshowMobileInput(true);
    setshowOtpInput(false);
    setOtp("");
    setLoginError("");
  };

  const [LoginError, setLoginError] = useState();

  const handleLogin = async (e) => {
    await setIsLoading(true);
    setOtpError("");
    setLoginError("");
    // e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      mobile_no: mobileNo,
      otp: otp,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "customer/login",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          localStorage.setItem("CID", result.user.id);
          localStorage.setItem("CN", result.user.name);
          localStorage.setItem("token", result.token);
          messageApi.success(`Welcome ${result.user.name}!`);
          setMobileNo("");
          setOtp("");
          setshowMobileInput(true);
          setshowOtpInput(false);
          closeModal();
          setIsLogin(true);
          setIsLoading(false);
        } else if (result.status === 404) {
          setLoginError(result.error);
          setIsLoading(false);
        } else if (result.status === 401) {
          setOtpError(result.error);
          setIsLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
    setIsLoading(false);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (otp.length === 4) {
      handleLogin();
    }
  }, [otp]);

  const handleRegister = async (e) => {
    e.preventDefault();
    await setIsLoading(true);
    setUserNameError("");
    if (UserName === "") {
      setUserNameError("please enter your name");
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "ci_session=0g1n78u77acik2rema53dq5ag2qf0t7u");

      var raw = JSON.stringify({
        name: UserName,
        email: "",
        mobile_no: mobileNo,
        password: "",
        otp: "",
        is_logged_in: "1",
        status: "1",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "customer/register",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            // onLogin();
            setshowRegister(false);
            setshowOtpInput(true);
          } else if (result.status === 400) {
            setIsLoading(false);
          }
        })
        .catch((error) => console.log("error", error));
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row error-message">
      {contextHolder}
      <div className="w-full md:2/3 lg:2/3 xl:2/3 hidden md:block lg:block xl:block">
        <img src="/images/login/login.jpg" alt="" className=" rounded-lg" />
      </div>
      <div className="w-full md:2/3 lg:2/3 xl:2/3">
        <section className="bg-gray-50 dark:bg-gray-900 relative">
          <div className="">
            <div className="w-full bg-white">
              <div className="px-6 space-y-4 md:space-y-6 pt-10">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Login / Register Via OTP {otpNumber}
                </h1>
                <p className="font-semibold text-gray-700">
                  Track your order, create wishlist & more
                </p>
                <form className="space-y-4 md:space-y-6" action="/">
                  {showMobileInput && (
                    <div className="error-message flex flex-col gap-4">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Your Mobile No
                      </label>
                      <input
                        type="number"
                        name="Mobile No"
                        id="Mobile"
                        className={`${
                          mobileNoError
                            ? "border border-red-500 placeholder:text-red-500"
                            : "border border-gray-300"
                        }bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg otp-input focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                        placeholder="Mobile No"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        required
                      />
                      {mobileNoError && (
                        <div className="error-message text-xs text-red-500 font-semibold ml-2">
                          {mobileNoError}
                        </div>
                      )}
                      {LoginError && (
                        <div className="text-xs font-semibold error-message text-red-500">
                          {LoginError}
                        </div>
                      )}
                      <Button
                        type="submit"
                        btnText={
                          isLoading ? (
                            <Spin indicator={antIcon} className="text-black" /> // Display the spinner when isLoading is true
                          ) : (
                            <span className="flex justify-center text-center tracking-wider">
                              Next
                            </span>
                          )
                        }
                        className="p-2 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300  border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                        onClick={handleSendOTP}
                      />
                    </div>
                  )}
                  {showRegister && (
                    <div className="error-message flex flex-col gap-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Enter Full Name
                        </label>
                        <input
                          type="text"
                          name="Mobile No"
                          id="Mobile"
                          className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg otp-input focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                          placeholder="Enter your full name"
                          value={UserName}
                          onChange={(e) => setUserName(e.target.value)}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        btnText={
                          isLoading ? (
                            <Spin indicator={antIcon} className="text-black" /> // Display the spinner when isLoading is true
                          ) : (
                            <span className="flex justify-center text-center tracking-wider">
                              Next
                            </span>
                          )
                        }
                        className="p-2 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300  border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                        onClick={handleRegister}
                      />
                    </div>
                  )}
                  {showOtpInput && (
                    <div className="error-message flex flex-col gap-4">
                      <div className="flex items-center gap-2 hover:underline">
                        <button
                          className="font-semibold text-gray-700 hover:text-black"
                          onClick={reverse}
                        >
                          Change Mobile No :
                        </button>
                        <p className="font-bold cursor-pointer">{mobileNo}</p>
                      </div>
                      <div className="flex justify-center">
                        <OTPInput
                          value={otp}
                          onChange={setOtp}
                          inputType="number"
                          numInputs={4}
                          containerStyle={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 15,
                          }}
                          inputStyle={{
                            border: "1.5px solid black",
                            backgroundColor: "rgb(248 250 252)",
                            fontSize: 12,
                            fontFamily: "serif",
                            fontWeight: "bold",
                            height: 40,
                            width: 40,
                            borderRadius: 10,
                          }}
                          // renderSeparator={<span> </span>}
                          renderInput={(props) => (
                            <input {...props} className="otp-input" />
                          )}
                        />
                      </div>
                      {OtpError && (
                        <div className="error-message text-red-500 text-xs font-semibold">
                          {OtpError}
                        </div>
                      )}
                      {LoginError && (
                        <div className="text-xs font-semibold error-message text-red-500">
                          {LoginError}
                        </div>
                      )}
                      <div className="flex justify-center">
                        <button className="text-[#027100] text-sm font-semibold">
                          Resend otp ({30} sec)
                        </button>
                      </div>
                      <Button
                        type="submit"
                        btnText={
                          isLoading ? (
                            <Spin indicator={antIcon} className="text-black" />
                          ) : (
                            "Login"
                          )
                        }
                        className="w-full p-2 bg-[#FFE342] text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300  border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                        onClick={handleLogin}
                      />
                    </div>
                  )}
                  <div className="flex justify-center my-20">
                    {/* <hr /> */}
                    {/* Don’t have an account yet?{" "}
                    <button
                      onClick={onRegister}
                      className="font-medium text-primary-600 hover:text-black hover:underline"
                    >
                      Sign up
                    </button> */}
                    <img src="/green-logo.png" className="w-40" />
                  </div>
                </form>
              </div>
              {/* <div className="flex flex-col justify-center mt-36">
                <div className="border-b mx-5 border-gray-900" />

                <div className="flex justify-center gap-3 items-center mt-2">
                  <p className="text-gray-800 font-semibold">
                    Or Continue With
                  </p>
                  <button>
                    <FcGoogle size={25} />
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
