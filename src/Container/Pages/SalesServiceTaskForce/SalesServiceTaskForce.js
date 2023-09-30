import React, { useEffect, useState } from "react";
import styles from "./SalesServiceTaskForce.module.css";
import Heading from "../../../Components/Heading/Heading";
import { BiSupport } from "react-icons/bi";
import { GiReturnArrow } from "react-icons/gi";
import { BsHandThumbsUp } from "react-icons/bs";
import { FaConnectdevelop } from "react-icons/fa";
import { RiFeedbackFill } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { RxCross2 } from "react-icons/rx";
import { LoadingOutlined } from "@ant-design/icons";
import { ConfigProvider, Spin } from "antd";
import { Steps } from "antd";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SalesServiceTaskForce = () => {
  // useEffect(() => {
  //   window.scroll(0, 0);
  // }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [Message, setMessage] = useState("");
  const [NameError, setNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [ContactError, setContactError] = useState("");
  const [MessageError, setMessageError] = useState("");
  const [successMessage, setsuccessMessage] = useState(false);

  const Team = [
    {
      img: "https://img.freepik.com/free-photo/portrait-teenage-boy_23-2148105583.jpg?size=626&ext=jpg&ga=GA1.1.742400744.1691673140&semt=ais",
      name: "Vaishnavi Hodkar",
      role: "Team Leader Quality Assurance Manager",
      responsibility:
        "Ensures that product quality remains consistent and makes recommendations for improvements.",
    },
    {
      img: "https://img.freepik.com/free-photo/portrait-teenage-boy_23-2148105583.jpg?size=626&ext=jpg&ga=GA1.1.742400744.1691673140&semt=ais",
      name: "Sahil Khatik",
      role: "IT Head",
      responsibility:
        "Reviews and suggests improvements to the IT systems supporting customer support.",
    },
    {
      img: "https://img.freepik.com/free-photo/portrait-teenage-boy_23-2148105583.jpg?size=626&ext=jpg&ga=GA1.1.742400744.1691673140&semt=ais",
      name: "Numair Antule",
      role: "Data Analyst",
      responsibility:
        "Extracts actionable insights from post-purchase feedback data to inform service improvements.",
    },
    {
      img: "https://img.freepik.com/free-photo/portrait-teenage-boy_23-2148105583.jpg?size=626&ext=jpg&ga=GA1.1.742400744.1691673140&semt=ais",
      name: "Vikas Nirmal",
      role: "Customer Communication Manager",
      responsibility:
        "Manages communication strategies for post-sales interactions, including updates and service notifications.",
    },
    {
      img: "https://img.freepik.com/free-photo/portrait-teenage-boy_23-2148105583.jpg?size=626&ext=jpg&ga=GA1.1.742400744.1691673140&semt=ais",
      name: "Misba Banedar",
      role: "Customer Support Manager",
      responsibility:
        "Task force leader responsible for coordinating efforts, overseeing progress, and reporting to company executives.",
    },
    {
      img: "https://img.freepik.com/free-photo/portrait-teenage-boy_23-2148105583.jpg?size=626&ext=jpg&ga=GA1.1.742400744.1691673140&semt=ais",
      name: "Zaid Mujawar",
      role: "Supply Chain Manager",
      responsibility:
        "Focuses on optimizing returns and exchanges processes for quicker and more efficient customer service.",
    },
  ];

  const sendMessage = async (e) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setContactError("");
    setMessageError("");
    if (Name === "") {
      setNameError("Enter Your Name");
    } else if (Email === "") {
      setEmailError("Enter Your Email Address");
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      setEmailError("Email is invalid");
    } else if (Contact === "") {
      setContactError("Enter Your Contact Number");
    } else if (!/^\d{10}$/.test(Contact)) {
      setContactError("Mobile Number is nvalid");
    } else if (Message === "") {
      setMessageError("Enter Your Querry");
    } else {
      setIsLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: Name,
        contact_number: Contact,
        email_id: Email,
        message: Message,
        status: "1",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        "https://hapspro.com/main-backend/customer/contact-us/query",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            setsuccessMessage(true);
            setName("");
            setEmail("");
            setContact("");
            setMessage("");
            setIsLoading(false);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <div className="error-message">
      <div className="h-full" style={{ backgroundImage: "url('/sales.jpg')" }}>
        {/* <img src="/sales.jpg" /> */}
        <div></div>
      </div>
      {/* Hero Section */}
      <div className="my-5 md:my-10">
        <h1
          className={`text-2xl md:text-4xl text-[#027100] md:text-center font-extrabold tracking-wider font-serif mx-2 md:mx-8 lg:mx-20`}
        >
          Arrange Free After-Sales Service Enhancement Task Force.
        </h1>
        <header className=" flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center justify-center px-2 md:px-8 lg:px-20">
          <section className="flex justify-center w-full md:w-1/2 lg:w-1/2">
            <div className="">
              <div
                className={`text-start indent-16 text-base ${styles.serviceFont} md:${styles.p} mx-2 md:mx-8 lg:mx-20 mt-5`}
              >
                The Customer Care Excellence Initiative at Arrange Free is
                dedicated to ensuring unparalleled after-sales service and
                customer support, with a mission to create lasting customer
                relationships by addressing their needs, resolving issues
                efficiently, and fostering a culture of customer-centricity.
                <p
                  className={`indent-16 mt-3 text-justify ${styles.serviceFont}`}
                >
                  This initiative focuses on promptly resolving customer
                  concerns, collecting feedback, streamlining processes,
                  enhancing team skills, integrating advanced technologies,
                  monitoring performance, and improving communication channels.
                  The team consists of a dedicated leader, customer support
                  representatives, data analysts, IT specialists, training
                  experts, and communication specialists, operating on an
                  ongoing basis with regular reporting to continuously elevate
                  the after-sales service experience and foster customer
                  loyalty.
                </p>
              </div>
            </div>
          </section>
          <section className="flex justify-center bg-green-600">
            <div>
              <img
                className="full h-[500px]"
                src="/contact.jpg"
                alt="Hero illustration"
              />
            </div>
          </section>
        </header>
      </div>
      {/* Mid-Heading */}
      <hr className="mx-2 md:mx-8 lg:mx-20" />
      <div className="flex flex-col gap-2 mt-5 my-5 md:my-10">
        <h1 className="text-center text-2xl md:text-4xl text-[#027100] font-serif font-extrabold tracking-wider">
          Purpose and Objectives:
        </h1>
        <div className="flex justify-center">
          <p
            className={`mt-3 text-center text-xl w-full md:w-full lg:w-1/2 ${styles.serviceFont}`}
          >
            The Arrange Free After-Sales Service Enhancement Task Force is
            dedicated to improving and optimizing our post-purchase customer
            service and support processes. Our primary objectives include:
          </p>
        </div>
      </div>
      {/* Points */}
      <div className="flex justify-center my-5 md:my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-10">
          <div className="relative mt-6 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transition-all duration-700 ease-in-out hover:scale-110">
            <div className="p-6">
              <BiSupport size={80} className="text-[#ffe342]" />
              <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-[#027100] mt-2 antialiased">
                Enhanced Support
              </h5>
              <p className="block  text-base font-medium leading-relaxed text-inherit antialiased">
                Review and refine our post-purchase customer support systems to
                ensure quicker response times, efficient query resolution, and
                improved customer satisfaction.
              </p>
            </div>
          </div>
          <div className="relative mt-6 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transition-all duration-700 ease-in-out hover:scale-110">
            <div className="p-6">
              <GiReturnArrow size={80} className="text-[#ffe342]" />
              <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-[#027100] mt-2 antialiased">
                Streamlined Returns and Exchanges:
              </h5>
              <p className="block  text-base font-medium leading-relaxed text-inherit antialiased">
                Develop and implement streamlined processes for product returns,
                exchanges, and refunds to enhance customer convenience and
                reduce turnaround times.
              </p>
            </div>
          </div>
          <div className="relative mt-6 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transition-all duration-700 ease-in-out hover:scale-110">
            <div className="p-6">
              <BsHandThumbsUp size={80} className="text-[#ffe342]" />
              <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-[#027100] mt-2 antialiased">
                Quality Assurance:
              </h5>
              <p className="block  text-base font-medium leading-relaxed text-inherit antialiased">
                Continuously monitor product quality and work closely with our
                suppliers to ensure that products meet or exceed customer
                expectations, especially after the sale.
              </p>
            </div>
          </div>
          <div className="relative mt-6 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transition-all duration-700 ease-in-out hover:scale-110">
            <div className="p-6">
              <RiFeedbackFill size={80} className="text-[#ffe342]" />
              <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-[#027100] mt-2 antialiased">
                Feedback Analysis:
              </h5>
              <p className="block  text-base font-medium leading-relaxed text-inherit antialiased">
                Analyze post-purchase customer feedback and reviews to identify
                areas for improvement and prioritize enhancements accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <hr className="mx-2 md:mx-8 lg:mx-20 md:mt-10 mt-5" />
      {/* Members */}
      <div className="py-10 bg-[#ffe342]">
        <Heading spanHeading="" />
        <h1 className="text-center text-2xl md:text-4xl text-[#027100] font-serif font-extrabold tracking-wider">
          Task Force Members:
        </h1>
        <div className="flex justify-center">
          <p
            className={`mt-3 text-center text-xl w-full md:w-full lg:w-1/2 ${styles.serviceFont}`}
          >
            Our diverse team comprises customer support experts, data analysts,
            IT specialists, training professionals, and communication
            specialists, each contributing their unique skills and perspectives
            to drive the Customer Care Excellence Initiative forward.
          </p>
        </div>
        <div className="flex justify-center my-5 md:my-10">
          <div className="flex flex-wrap justify-center gap-y-5 md:gap-y-10 w-full md:w-full lg:w-full xl:w-[85%]">
            <Swiper
              // slidesPerView={3}
              // spaceBetween={30}
              centeredSlides={true}
              breakpoints={{
                350: {
                  slidesPerView: 1.2,
                  spaceBetween: 10,
                },
                650: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                950: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1300: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {Team.map((el, i) => {
                return (
                  <SwiperSlide className="my-10 md:my-10" key={i}>
                    <div className="relative flex w-80 h-60 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                      {/* <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                        <img
                          src={el.img}
                          alt="profile-picture"
                          className="h-60 object-cover"
                        />
                      </div> */}
                      <div className="p-6 text-center">
                        <h4
                          className={`mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased ${styles.serviceFont}`}
                        >
                          {el.name}
                        </h4>
                        <p className="block mt-2 bg-gradient-to-tr from-[#027100] to-[#027100] bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
                          {el.role}
                        </p>
                        <p className="my-2">{el.responsibility}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
      {/* Timeline */}
      <hr className="mx-2 md:mx-8 lg:mx-20 md:my-10 my-5" />
      <div className="flex flex-col gap-2 p-2 md:p-0">
        <h1 className="text-center text-2xl md:text-4xl text-[#027100] font-serif font-extrabold tracking-wider">
          Timeline:
        </h1>
        <div className="flex justify-start md:justify-center">
          <p
            className={`mt-3 indent-14 text-justify text-xl w-full md:w-full lg:w-1/2 ${styles.serviceFont}`}
          >
            The task force has embarked on an ambitious six-month journey aimed
            at achieving a set of well-defined objectives. This dedicated
            timeframe has been meticulously planned to allow for thorough
            research, strategic planning, and effective execution. Throughout
            this six-month period, the task force will maintain a rigorous
            schedule with regular progress updates provided every two weeks.
          </p>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ffcc00",
            },
          }}
        >
          <div className="flex justify-center">
            <div className="w-full md:w-full lg:w-1/2 my-5 md:my-10">
              <Steps
                direction="vertical"
                style={{ height: "80vh" }}
                items={[
                  {
                    title: (
                      <p className="font-semibold tracking-wide text-xl text-[#027100]">
                        Month 1: Inception and Planning
                      </p>
                    ),
                    description: (
                      <p className="text-gray-700 text-base">
                        During the first month, the task force will lay the
                        foundation for the entire initiative. This includes
                        assembling the team, defining roles and
                        responsibilities, and conducting a comprehensive
                        analysis of the objectives at hand. Detailed project
                        plans and timelines will be established to ensure a
                        smooth progression of tasks over the coming months.
                      </p>
                    ),
                    status: "finish",
                    icon: <UserOutlined />,
                  },
                  {
                    title: (
                      <p className="font-semibold tracking-wide text-xl text-[#027100]">
                        Month 2-3: Research and Data Gathering
                      </p>
                    ),
                    description: (
                      <p className="text-gray-700 text-base">
                        With a solid plan in place, the task force will dedicate
                        the next two months to extensive research and data
                        gathering. This phase will involve collecting relevant
                        information, conducting market research, and analyzing
                        best practices. This data will serve as the basis for
                        informed decision-making in subsequent stages.
                      </p>
                    ),
                    status: "finish",
                    icon: <SolutionOutlined />,
                  },
                  {
                    title: (
                      <p className="font-semibold tracking-wide text-xl text-[#027100]">
                        Month 4-5: Strategy Development and Implementation
                      </p>
                    ),
                    description: (
                      <p className="text-gray-700 text-base">
                        Months four and five will see the task force shift its
                        focus towards strategy development and implementation.
                        Drawing from the insights gained during the research
                        phase, the team will craft a well-rounded strategy
                        tailored to meet the established objectives. Execution
                        will commence during this period, with careful attention
                        paid to monitoring progress and making necessary
                        adjustments along the way.
                      </p>
                    ),
                    status: "finish",
                    icon: <FaConnectdevelop />,
                  },
                  {
                    title: (
                      <p className="font-semibold tracking-wide text-xl text-[#027100]">
                        Month 6: Evaluation and Finalization
                      </p>
                    ),
                    description: (
                      <p className="text-gray-700 text-base">
                        The final month of the initiative will be dedicated to
                        evaluating the outcomes and fine-tuning the strategy as
                        needed. Key performance indicators will be assessed, and
                        the task force will ensure that all objectives have been
                        met or are on track for completion. A comprehensive
                        report summarizing the entire six-month effort will be
                        prepared for presentation.
                      </p>
                    ),
                    status: "finish",
                    icon: <SmileOutlined />,
                  },
                ]}
              />
            </div>
          </div>
        </ConfigProvider>
        <div className="flex justify-start md:justify-center mt-[450px] md:mt-20 lg:mt-10 xl:mt-0">
          <p
            className={`indent-14 text-justify text-xl w-full md:w-full lg:w-1/2 ${styles.serviceFont}`}
          >
            Throughout the entire six-month period, the task force will maintain
            a bi-weekly progress update schedule. These updates will serve as a
            means to track progress, address challenges, and ensure that the
            initiative stays on course. It will also provide stakeholders with
            real-time visibility into the task force's activities and
            achievements. By adhering to this meticulously planned timeline, the
            task force aims to maximize efficiency and effectiveness in
            achieving its objectives while keeping stakeholders informed and
            engaged throughout the process.
          </p>
        </div>
      </div>
      <hr className="mx-2 md:mx-8 lg:mx-20 md:my-10 my-5" />
      {/* Com */}
      <header className="my-5 md:my-10 flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center justify-center mx-2 md:mx-8 lg:mx-20">
        <section className="flex justify-center w-full md:w-1/2 lg:w-1/2">
          <div className="">
            <h1
              className={`text-2xl md:text-4xl text-[#027100] md:text-start font-extrabold tracking-wider font-serif mx-2 md:mx-8 lg:mx-20`}
            >
              Communication and Reporting.
            </h1>
            <div
              className={`text-start indent-16 text-base ${styles.serviceFont} md:${styles.p} mx-2 md:mx-8 lg:mx-20 mt-5`}
            >
              Bi-weekly meetings will be held to discuss progress, findings, and
              action plans. Reports on improvements and initiatives will be
              communicated to the executive team and company stakeholders.
              <p
                className={`indent-16 mt-3 text-justify ${styles.serviceFont}`}
              >
                By establishing the Arrange Free After-Sales Service Enhancement
                Task Force, we are dedicated to ensuring that customer
                satisfaction remains a top priority even after the sale is made.
                Our goal is to provide a seamless, efficient, and exceptional
                post-purchase experience that builds trust and loyalty with our
                customers.
              </p>
            </div>
          </div>
        </section>
        <section className="flex justify-center bg-green-600">
          <div>
            <img
              className="full h-[500px]"
              src="/com.jpg"
              alt="Hero illustration"
            />
          </div>
        </section>
      </header>
      {/*  */}
      <hr className="mx-2 md:mx-8 lg:mx-20 md:my-10 my-5" />
      {/*Contact Form */}
      <section
        className="bg-white"
        style={{
          backgroundImage: "url('/sales.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="flex justify-between flex-col md:flex-col lg:flex-row max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16">
          <div className="mr-auto place-self-center lg:col-span-7 flex justify-center">
            <div>
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-[#FFE342]">
                Contact To Task Force Team
              </h1>
              <p className="max-w-2xl mb-6 font-light text-slate-100 lg:mb-8 md:text-lg lg:text-xl">
                Feel free to get in touch with us anytime – we're here to help
                you with any questions, suggestions, or inquiries you may have
                about our home interior products. Whether you're seeking design
                inspiration, need assistance with an order, or want to
                collaborate with us, our team is ready to assist you. Contact us
                today, and let's create beautiful spaces together.
              </p>
              {/* <div className="flex items-center gap-5">
                <img
                  src="/images/social/appStore.jpeg"
                  alt=""
                  className="h-[50px] w-[150px] object-contain cursor-pointer transition-all ease-in-out duration-700 hover:scale-105"
                  onClick={() =>
                    window.open(
                      "https://apps.apple.com/in/app/dorfee/id6462861358"
                    )
                  }
                />
                <img
                  src="/images/social/googlePlay.jpeg"
                  alt=""
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.arrange_free"
                    )
                  }
                  className="h-[50px] w-[150px] object-contain cursor-pointer transition-all ease-in-out duration-700 hover:scale-105"
                />
              </div> */}
            </div>
          </div>
          <div className="lg:mt-0 lg:flex">
            <div className="p-5 shadow-3xl rounded-2xl bg-white shadow-sm w-auto md:w-[500px]">
              {successMessage && (
                <div className="bg-gradient-to-r from-[#e7eff9] to-[#cfd6e6] w-full error-message rounded border flex justify-between items-center">
                  <p className="font-semibold text-black p-2 text-sm">
                    <span className="text-green-500">
                      Your Message Has Been Successfully Submitted!
                    </span>
                    <br /> Our Team Will Respond You Shortly.. :)
                  </p>
                  <div className="mr-3">
                    <RxCross2
                      onClick={() => setsuccessMessage(false)}
                      size={30}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              )}
              <p className="text-lg text-center font-serif font-[500]">
                Contact To Task Force Team
              </p>
              <p className="font-semibold text-[#027100] text-sm text-center">
                Reply to your message within the next 10 hours.!
              </p>
              <div className="my-3">
                <form>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="floating_email"
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#027100] peer"
                      placeholder=" "
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#027100] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Enter Your Name
                    </label>
                    {NameError && (
                      <div className="text-xs text-red-500 font-semibold error-message">
                        {NameError}
                      </div>
                    )}
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="email"
                      name="floating_password"
                      id="floating_password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#027100] peer"
                      placeholder=" "
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label
                      htmlFor="floating_password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#027100] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Enter Your Email Address
                    </label>
                    {EmailError && (
                      <div className="text-xs text-red-500 font-semibold error-message">
                        {EmailError}
                      </div>
                    )}
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="number"
                      name="repeat_password"
                      id="floating_repeat_password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#027100] peer otp-input"
                      placeholder=" "
                      value={Contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                    />
                    <label
                      htmlFor="floating_repeat_password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#027100] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Enter Your Contact Number
                    </label>
                    {ContactError && (
                      <div className="text-xs text-red-500 font-semibold error-message">
                        {ContactError}
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-500"
                    >
                      Your message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline outline-[#027100]"
                      placeholder="Leave a comment..."
                      onChange={(e) => setMessage(e.target.value)}
                      value={Message}
                    />
                    {MessageError && (
                      <div className="text-xs text-red-500 font-semibold error-message">
                        {MessageError}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center items-center mt-4">
                    <button
                      type="submit"
                      className="p-2 bg-[#FFE342] w-full text-[#000] font-bold font-sans text-sm md:text-base tracking-widest rounded-full transition-all ease-in-out duration-300 hover:text-[#027100] border-2 border-[#FFE342] uppercase flex justify-center items-center gap-2"
                      disabled={isLoading === true}
                      onClick={sendMessage}
                    >
                      {isLoading ? (
                        <Spin indicator={antIcon} className="text-white" />
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalesServiceTaskForce;
