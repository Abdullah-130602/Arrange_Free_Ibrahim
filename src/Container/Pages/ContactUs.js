import React from "react";
import Heading from "../../Components/Heading/Heading";
import SectDescription from "../../Components/Heading/SectDescription";
import { useEffect } from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ContactUs = () => {
  const Material = [
    {
      img: "/images/contact/pine.png",
      name: "Pine wood",
      desc: "Pine Wood Frame: A pine frame offers excellent durability and resistance to weather and moisture. Pine wood is a tropical hardwood known for its strength and natural oils that protect it from decay and insect damage. Pine frames are commonly used in outdoor sofas but can also be an excellent choice for indoor furniture, especially in spaces where a touch of rustic elegance is desired.",
    },
    {
      img: "/images/contact/teak.png",
      name: "Teak wood",
      desc: "Teak Wood Frame: A Teak frame adds a touch of luxury and sophistication to a sofa. Teak wood is prized for its rich, dark color and attractive grain patterns. Teak frames are often chosen for high-end or designer sofas, providing both aesthetic appeal and reliable structural integrity.",
    },
    {
      img: "/images/contact/cotton.png",
      name: "Cotton fabric",
      desc: "Cotton fabric is a natural and widely used material known for its softness, breathability, and comfort. It is highly versatile and can be woven into various textures and weights, making it suitable for a wide range of applications, including apparel, bedding, and upholstery. Cotton fabric is hypoallergenic, absorbent, and easy to care for, making it a popular choice for everyday use.",
    },
    {
      img: "/images/contact/rexine.png",
      name: "Rexine fabric",
      desc: "Rexine fabric is known for its durability and resistance to wear and tear. It is less prone to cracking, peeling, and fading compared to natural leather. The fabric is designed to withstand regular use and is suitable for upholstery applications, including sofas, chairs, and automotive interiors. <br> jkEasy Maintenance: One of the advantages of rexine fabric is its low maintenance requirements. It is relatively easy to clean and does not require special conditioning or treatment like genuine leather. Regular wiping with a damp cloth or mild soap and water solution is usually sufficient to keep the fabric clean and looking its best.",
    },
    {
      img: "/images/contact/velvet.png",
      name: "Velvet fabric",
      desc: "Velvet Fabric: Velvet is a luxurious and plush fabric with a dense pile that gives it a soft and smooth feel. It is typically made from silk, cotton, or synthetic fibers. Velvet fabric has a rich appearance and is known for its luxurious drape. It is often used in high-end upholstery, formal clothing, and home decor items.",
    },
    {
      img: "/images/contact/linen.png",
      name: "Linen fabric",
      desc: "Linen Fabric: Linen is a natural fabric made from the fibers of the flax plant. It is highly breathable, lightweight, and known for its crisp texture. Linen fabric is moisture-wicking and offers excellent airflow, making it ideal for warm weather clothing and home textiles. It has a natural luster and is often used for casual and relaxed styles.",
    },
    {
      img: "/images/contact/polyster.png",
      name: "Polyester fabric",
      desc: "Polyester Fabric: Polyester fabric is a synthetic material known for its durability, wrinkle resistance, and quick drying properties. It is a versatile fabric that can be blended with other fibers or used on its own. Polyester fabric is easy to care for and is often used in apparel, home furnishings, and outdoor applications. It provides good color retention and is less prone to shrinking or stretching compared to natural fibers.",
    },
    {
      img: "/images/contact/foam.png",
      name: "High Density Foam",
      desc: "High-density foam is a foam type that offers superior durability and support. It has a higher weight per cubic foot, indicating a denser structure. This foam is known for its ability to withstand heavy use and maintain its shape over time.<br> High-density foam is often used in commercial settings or for individuals seeking firmer and more resilient seating options.<br> Foam is a highly responsive foam material that quickly regains its shape after compression. It offers excellent support, durability, and comfort. Reflex foam is known for its bounce-back properties, making it suitable for individuals who prefer a more resilient and lively seating experience. It is often used in high-end furniture due to its quality and performance.",
    },
  ];

  const ReadyProduct = [
    {
      img: "/images/contact/r1.png",
      name: "L Shape Sofa",
    },
    {
      img: "/images/contact/r2.png",
      name: "3 Seater Sofa",
    },
    {
      img: "/images/contact/r3.png",
      name: "2 Seater Sofa",
    },
  ];

  // Loader
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [Message, setMessage] = useState("");

  //   Error Hooks
  const [NameError, setNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [ContactError, setContactError] = useState("");
  const [MessageError, setMessageError] = useState("");

  //   Success Hook
  const [successMessage, setsuccessMessage] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setContactError("");
    setMessageError("");
    if (Name === "") {
      setNameError("enter your name");
    } else if (Email === "") {
      setEmailError("enter your email address");
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      setEmailError("Email is invalid");
    } else if (Contact === "") {
      setContactError("enter your contact number");
    } else if (!/^\d{10}$/.test(Contact)) {
      setContactError("Mobile Number is invalid");
    } else if (Message === "") {
      setMessageError("enter your Querry");
    } else {
      await setIsLoading(true);
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
        process.env.REACT_APP_HAPS_MEDIA_BASE_URL + "customer/contact-us/query",
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
    <>
      {/* Form */}
      <div className="relative error-message my-10 flex flex-col md:flex-col lg:flex-row xl:flex-row justify-between items-center gap-2 mx-5 md:mx-5 lg:mx-10 xl:mx-10">
        <div className="w-full md:w-full lg:w-1/3 xl:w-1/3">
          <div className="p-5 shadow-3xl rounded-2xl bg-white shadow-2xl">
            {successMessage && (
              <div className="bg-gradient-to-r from-[#e7eff9] to-[#cfd6e6] w-full error-message rounded border flex justify-between items-center">
                <p className="font-semibold text-black p-2 text-sm">
                  <span className="text-green-500">
                    Your message has been successfully submitted!
                  </span>{" "}
                  <br /> Our team will respond you shortly.. :)
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
            <Heading Heading="Contact To ArrangeFree" />
            <p className="font-semibold text-gray-700 text-sm text-center">
              Get in touch with us - we're here to help!
            </p>
            <div className="my-3">
              <form>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="floating_email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"
                    placeholder=" "
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer"
                    placeholder=" "
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer otp-input"
                    placeholder=" "
                    value={Contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="floating_repeat_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
                <button
                  type="submit"
                  className="text-white bg-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2"
                  disabled={isLoading === true}
                  onClick={sendMessage}
                >
                  {isLoading ? (
                    <Spin indicator={antIcon} className="text-white" />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 gap-y-5 md:gap-y-5 lg:gap-y-14 xl:gap-y-14">
          <img src="/images/contact/b1.png" alt="" className="w-full" />
          <img src="/images/contact/b2.png" alt="" className="w-full" />
          <img src="/images/contact/b3.png" alt="" className="w-full" />
          <img src="/images/contact/b4.png" alt="" className="w-full" />
        </div>
      </div>
      {/* Banner2 */}
      {/* <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 px-10">
        <img src="/images/contact/b1.png" alt="" className="w-full" />
        <img src="/images/contact/b2.png" alt="" className="w-full" />
        <img src="/images/contact/b3.png" alt="" className="w-full" />
        <img src="/images/contact/b4.png" alt="" className="w-full" />
      </div> */}
      {/* Banner */}
      <div className="bg-gradient-to-t from-[#dbdbdb] to-[#fff] border py-5 mx-5 md:mx-5 lg:mx-10 xl:mx-10 rounded-2xl">
        <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row justify-around items-center">
          <img src="/images/contact/truck.jpg" alt="" />
          <div>
            <p className="text-[20px] md:text-[20px] lg:text-[40px] xl:text-[40px] leading-[48px] font-[500] text-center">
              Let’s get in touch and get your
            </p>
            <p className="text-[25px] md:text-[20px] lg:text-[64px] xl:text-[64px] leading-[77px] font-[700] text-center">
              Delivery Within 5 Day’s
            </p>
          </div>
        </div>
      </div>
      {/* Material */}
      <div className="bg-white rounded-2xl m-5 md:m-8 lg:m-10 xl:m-10 shadow-2xl error-message p-10">
        <div className="font-[900] text-[40px] md:text-[40px] lg:text-[80px] xl:text-[80px] leading-[120px] tracking-widest text-center">
          MATERIAL
        </div>
        <div className="my-5 flex flex-col gap-20 mt-10">
          {Material.map((el, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex justify-center">
                  <img src={el.img} alt="" className="w-[321px] h-[241px]" />
                </div>
                <div className="flex flex-col gap-2">
                  <Heading Heading={el.name} />
                  <div className="text-gray-700 font-semibold text-start mx-0 md:mx-5 lg:mx-20 xl:mx-20 tracking-wider text-sm">
                    {el.desc.split("<br>").map((desc, i) => {
                      return (
                        <p key={i} className="my-1">
                          {desc}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Ready Product */}
      <div className="bg-white rounded-2xl m-5 md:m-8 lg:m-10 xl:m-10 shadow-2xl error-message p-10">
        <div className="navName text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-serif font-[500] uppercase text-center">
          Ready Product
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {ReadyProduct.map((el, index) => {
            return (
              <div key={index} className="flex justify-center">
                <div>
                  <img src={el.img} alt="" />
                  <Heading Heading={el.name} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ContactUs;
