import React, { useEffect } from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";
import MainPageTestimonials from "../../Container/Home/MainPageTestimonials";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="error-message">
      <div>
        <img src="/about1.jpg" alt="" />
      </div>
      <div className="my-5 mt-10 flex flex-col gap-5 md:gap-10">
        <div>
          <h1
            align="center"
            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-wide"
          >
            Our Team
          </h1>
        </div>
        <div className="w-full flex justify-center">
          <img src="/team.png" className="w-1/3 rounded-3xl shadow-2xl" />
        </div>
        <div className="flex justify-center">
          <p className="mt-5 w-[68%] tracking-wider text-lg font-semibold text-gray-700 text-justify">
            Welcome to Our Dedicated and Innovative Team at{" "}
            <Link to="/" className="text-[#027100] hover:underline">
              Arrange Free!
            </Link>{" "}
            Our passion for excellence drives us to tirelessly pursue our
            company's goals and provide you with an unparalleled furniture
            buying experience. With a strong work ethic as our foundation, each
            member of our team is committed to ensuring your satisfaction
            through our hard work, attention to detail, and the highest quality
            of service. At Arrange Free, we take pride in our team's innovative
            spirit, constantly seeking fresh and creative solutions to make
            furniture buying a seamless and exciting journey for you. Our
            dedication goes beyond just delivering furniture; it's about making
            your vision come to life. We understand that your space is a
            reflection of your personality, and our team is dedicated to turning
            your dreams into reality. With a customer-centric approach, we're
            not merely furnishing spaces – we're crafting comfortable and
            inspiring environments that you'll cherish. Join us at Arrange Free and
            experience a team that's truly passionate about making furniture
            buying easy and enjoyable for you.
          </p>
        </div>
        <MainPageTestimonials />
      </div>
    </div>
  );
};

export default AboutUs;
