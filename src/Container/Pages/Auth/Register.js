import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Button from "../../../Components/Button/Button";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";
import { toast } from "react-toastify";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Register = ({ setIsLogin, onLogin, closeModal }) => {
  const [messageApi, contextHolder] = message.useMessage();
  // Data Store Hooks
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [Password, setPassword] = useState("");

  // Input Error Hooks
  const [NameError, setNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [ContactError, setContactError] = useState("");
  const [PasswordError, setPasswordError] = useState("");

  // Loader
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    await setIsLoading(true);
    setNameError("");
    setEmailError("");
    setContactError("");
    setPasswordError("");
    if (Name === "") {
      setNameError("please enter your name");
    } else if (Email === "") {
      setEmailError("please enter your email address");
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      setEmailError("Email is invalid");
    } else if (Contact === "") {
      setContactError("please enter your mobile number");
    } else if (!/^\d{10}$/.test(Contact)) {
      setContactError("Mobile Number is invalid");
    } else if (Password === "") {
      setPasswordError("please set your password");
    } else if (/^[^\s]{7}$/.test(Password)) {
      setPasswordError("Password must have at least 6 characters");
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "ci_session=0g1n78u77acik2rema53dq5ag2qf0t7u");

      var raw = JSON.stringify({
        name: Name,
        email: Email,
        mobile_no: Contact,
        password: Password,
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
            // localStorage.setItem("CID", result.customer_id);
            // localStorage.setItem("CN", result.customer_name);
            // messageApi.success(
            //   `Welcome ${result.customer_name}! You have successfully registered`
            // );
            // setIsLoading(false);
            // closeModal();
            // setIsLogin(true);
            // setName("");
            // setEmail("");
            // setContact("");
            // setPassword("");
            onLogin();
          } else if (result.status === 400) {
            setIsLoading(false);
            setEmailError(result.error.validation.email);
            setContactError(result.error.validation.mobile_no);
          }
        })
        .catch((error) => console.log("error", error));
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row error-message">
      {/* {alert(ContextName)} */}
      {contextHolder}
      <div className="w-full md:2/3 lg:2/3 xl:2/3 hidden md:block lg:block xl:block">
        <img src="/images/login/register.jpg" alt="" className=" rounded-lg" />
      </div>
      <div className="w-full md:2/3 lg:2/3 xl:2/3">
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="">
            <div className="w-full bg-white">
              <div className="px-6 space-y-1 md:space-y-1 py-5 md:py-0 lg:py-0 xl:py-0">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Register
                </h1>
                <p className="font-semibold text-gray-700">
                  Track your order, create wishlist & more
                </p>
                <form className="space-y-1 md:space-y-1" action="/">
                  <div>
                    <label
                      htmlFor="Name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="Enter Your Full Name"
                      id="Name"
                      className={`${
                        NameError
                          ? "border border-red-500 placeholder:text-red-500"
                          : "border border-gray-300"
                      } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Enter Your Full Name"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    {NameError && (
                      <div className="error-message text-xs text-red-500 p-1">
                        {NameError}
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="Email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="Email"
                      id="Email"
                      placeholder="Enter Your Email Address"
                      className={`${
                        EmailError
                          ? "border border-red-500 placeholder:text-red-500"
                          : "border border-gray-300"
                      } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {EmailError && (
                      <div className="error-message text-xs text-red-500 p-1">
                        {EmailError}
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="Mobile"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Mobile
                    </label>
                    <input
                      type="number"
                      name="Mobile"
                      id="Mobile"
                      placeholder="Enter Your Mobile Number"
                      className={`${
                        ContactError
                          ? "border border-red-500 placeholder:text-red-500"
                          : "border border-gray-300"
                      } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      value={Contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                    />
                    {ContactError && (
                      <div className="error-message text-xs text-red-500 p-1">
                        {ContactError}
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="Password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="Password"
                      id="Password"
                      placeholder="Enter Your 6 Digits Password"
                      className={`${
                        PasswordError
                          ? "border border-red-500 placeholder:text-red-500"
                          : "border border-gray-300"
                      } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {PasswordError && (
                      <div className="error-message text-xs text-red-500 p-1">
                        {PasswordError}
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <div className="mt-5 flex flex-col gap-2 px-6">
                <Button
                  type="submit"
                  btnText={
                    isLoading ? (
                      <Spin indicator={antIcon} className="text-white" />
                    ) : (
                      "Register"
                    )
                  }
                  disabled={isLoading}
                  className="w-full p-2 bg-[#FFE342] text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300  border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                  onClick={handleRegister}
                />
                <p className="text-sm font-light text-gray-500">
                  Already have an account..{" "}
                  <button
                    onClick={onLogin}
                    className="font-medium text-primary-600 hover:text-black hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
              {/* <div className="flex flex-col justify-center mt-[65px]">
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
    </div>
  );
};

export default Register;
