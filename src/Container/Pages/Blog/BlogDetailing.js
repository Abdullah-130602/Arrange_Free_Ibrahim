import React, { useEffect, useState } from "react";
import Loader from "../../../Components/Loader/Loader";
import { useParams } from "react-router";
import Heading from "../../../Components/Heading/Heading";
import { BsArrowRight } from "react-icons/bs";
import "./Blog.css";
import { Link, Element, animateScroll as scroller } from "react-scroll";
import { Divider } from "antd";

const BlogDetailing = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", loading);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [loading]);

  let { slug } = useParams();

  const [BlogDetails, setBlogDetails] = useState("");

  const getFullBlog = async () => {
    // setLoading(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      `https://backend.decorajee.com/blog/single-blog/${slug}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setBlogDetails(result.data);
          setLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getFullBlog();
    console.log(window.innerWidth);
  }, []);

  function truncateText(text, limit) {
    const words = text.split(" ");
    const truncated = words.slice(0, limit).join(" ");

    if (words.length > limit) {
      return `${truncated}...`;
    }

    return truncated;
  }

  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

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
        <main className="mt-10 mx-2 md:mx-10 lg:mx-20 xl:mx-20 error-message font-for-blog">
          <div className="mb-4 md:mb-0 w-full mx-auto relative flex flex-col gap-5">
            <div className="px-2 lg:px-0">
              <h2 className="text-xl lg:text-4xl font-semibold text-gray-800 leading-tight text-start lg:text-center">
                {BlogDetails.title ? BlogDetails.title : ""}
              </h2>
            </div>
            <div className="flex justify-center">
              <div className="relative w-[390px] h-[260px] sm:w-[390px] sm:h-[260px] md:w-[800px] md:h-[331px] lg:w-[1320px] lg:h-[552px] mobile-listintg-card">
                <img
                  src={
                    BlogDetails.blog_image !== null
                      ? "https://backend.decorajee.com/" +
                        BlogDetails.blog_image
                      : false
                  }
                  className="max-w-full max-h-full sm:max-w-full sm:max-h-full md:max-w-[800px] md:max-h-[331px] lg:max-w-[1320px] lg:max-h-[552px] hover:scale-100 ease-in-out duration-500 hover:overflow-hidden object-cover absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]"
                  // style={{ height: "28em" }}
                />
              </div>
            </div>
            <figcaption className="tracking-wider font-[400] text-sm lg:text-base lg:font-semibold mx-2 md:mx-10 lg:mx-20">
              {BlogDetails.description.split("\n\n").map((el, i) => {
                return <p key={i} className="indent-14">{el}</p>;
              })}
            </figcaption>
          </div>
          <div className="my-10">
            <Heading Heading="Topic covered in this blog" />
            <div className="flex flex-wrap justify-center gap-5">
              {BlogDetails.blog_sections.map((el, i) => {
                return (
                  <div key={i}>
                    <div className="">
                      <div className="card my-5">
                        <img
                          src={
                            "https://backend.decorajee.com/" + el.banner_image
                          }
                          alt="image"
                        />
                        <div className="card__content">
                          <p className="card__title">{el.title}</p>
                          {/* <p className="card__description">
                            {truncateText(el.description, 25)}
                          </p> */}
                          <Link
                            activeClass="active"
                            to={el.title}
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={900}
                            className="absolute bottom-2 flex gap-2 items-center underline"
                          >
                            <p className="text-xs hover:text-black cursor-pointer">
                              Read More...
                            </p>
                            <BsArrowRight className="text-black" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Divider className="border-t border-black" />
          <div className="flex flex-col justify-center mt-5">
            {BlogDetails.blog_sections.map((el, i) => {
              return (
                <Element name={el.title} className="mt-5" key={i}>
                  <div className="flex justify-center">
                    <div className="px-4 lg:px-0 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4 flex flex-col gap-5">
                      <div>
                        <Heading spanHeading={el.title} />
                      </div>
                      <div className="flex flex-col md:flex-col justify-between items-center gap-2 md:gap-5">
                        <div className="relative">
                          <img
                            src={
                              "https://backend.decorajee.com/" + el.banner_image
                            }
                            className="w-full h-full sm:w-full sm:h-full md:w-[820px] md:h-[541px] object-contain bg-gray-100 rounded-md"
                          />
                        </div>
                        <div
                          className={`pb-6 text-sm md:text-[16px] tracking-wide font-[400] w-full sm:w-full md:w-[820px] `}
                        >
                          {el.description.split("\n\n").map((desc, i) => {
                            return (
                              <p
                                key={i}
                                className="my-3 text-[#000] tracking-wider text-lg text-justify blog-font indent-14"
                              >
                                {desc}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                      <p className="pb-6">{el.section_link}</p>
                    </div>
                  </div>
                </Element>
              );
            })}
          </div>
        </main>
      )}
    </>
  );
};

export default BlogDetailing;
