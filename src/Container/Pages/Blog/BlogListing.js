import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

const BlogListing = () => {
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

  const [blogData, setBlogData] = useState([]);

  const getAllBlog = async () => {
    setLoading(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      "https://backend.decorajee.com/blog/get-all-blogs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setBlogData(result.data);
          setLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllBlog();
  }, []);

  function truncateText(text, limit) {
    const words = text.split(" ");
    const truncated = words.slice(0, limit).join(" ");

    if (words.length > limit) {
      return `${truncated}...`;
    }

    return truncated;
  }

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
        <main className="mt-10 mx-2 md:mx-10 lg:mx-20 xl:mx-20 error-message">
          <div className="block md:flex md:space-x-2 px-2 lg:p-0">
            <Link
              className="mb-4 md:mb-0 w-full relative rounded inline-block"
              style={{ height: "24em" }}
              to="/blogs"
            >
              <div
                className="absolute left-0 bottom-0 w-full h-full z-10"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
                }}
              />
              <img
                src="/green-logo.png"
                className="absolute left-0 top-0 w-full h-full rounded z-0 object-contain"
              />
              <div className="p-4 absolute bottom-0 left-0 z-20">
                <span className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">
                  Blogs
                </span>
                <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
                  Latest on Arrange Free.
                </h2>
              </div>
            </Link>
            {/* <a
              className="w-full md:w-1/3 relative rounded"
              style={{ height: "24em" }}
              href="./blog.html"
            >
              <div
                className="absolute left-0 top-0 w-full h-full z-10"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
                }}
              />
              <img
                src="/images/bed/6.jpg"
                className="absolute left-0 top-0 w-full h-full rounded z-0 object-cover"
              />
              <div className="p-4 absolute bottom-0 left-0 z-20">
                <span className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">
                  Science
                </span>
                <h2 className="text-3xl font-semibold text-gray-100 leading-tight">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </h2>
                <div className="flex mt-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/97.jpg"
                    className="h-10 w-10 rounded-full mr-2 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-200 text-sm">
                      {" "}
                      Chrishell Staus{" "}
                    </p>
                    <p className="font-semibold text-gray-400 text-xs">
                      {" "}
                      15 Aug{" "}
                    </p>
                  </div>
                </div>
              </div>
            </a> */}
          </div>
          <a
            className="w-full md:w-1/3 relative rounded"
            style={{ height: "24em" }}
            href="./blog.html"
          ></a>
          <div className="block lg:flex justify-center lg:space-x-2 px-2 lg:p-0 mt-10 mb-10">
            {/* post cards */}
            <div className="w-full lg:w-2/3">
              {blogData &&
                blogData.map((el, i) => {
                  return (
                    <div className="block rounded w-full lg:flex gap-2 mb-10" key={i}>
                      <div
                        className="h-48 lg:w-48 flex-none bg-cover text-center overflow-hidden opacity-75"
                        style={{
                          backgroundImage: `url("${
                            "https://backend.decorajee.com/" +
                            el.blog_image
                          }")`,
                        }}
                        title=""
                      ></div>
                      <div className="bg-white rounded py-2 flex flex-col justify-between leading-normal">
                        <div>
                          <Link
                            to={`/blog-detailing-page/${el.id}`}
                            className="mt-3 md:mt-0 text-gray-700 font-bold text-2xl mb-2"
                          >
                            {el.title}
                          </Link>
                          <div className="text-gray-700 text-base">
                            {truncateText(el.description, 25)}{" "}
                            <Link
                              className="text-black font-semibold text-sm underline"
                              to={`/blog-detailing-page/${el.id}`}
                            >
                              read more
                            </Link>
                          </div>
                        </div>
                        {/* <div className="flex mt-3">
                          <img
                            src="https://randomuser.me/api/portraits/men/86.jpg"
                            className="h-10 w-10 rounded-full mr-2 object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-700 text-sm capitalize">
                              {" "}
                              eduard franz{" "}
                            </p>
                            <p className="text-gray-600 text-xs"> 14 Aug </p>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* right sidebar */}
            {/* <div className="w-full lg:w-1/3 px-3">
              <div className="border border-dotted" />

              <div className="p-1 mt-4 mb-4">
                <h5 className="font-bold text-lg uppercase text-gray-700 mb-2">
                  {" "}
                  Subscribe{" "}
                </h5>
                <p className="text-gray-600">
                  Subscribe to our newsletter. We deliver the best health
                  related articles to your inbox
                </p>
                <div className="flex flex-col gap-5">
                  <input
                    placeholder="your email address"
                    className="text-gray-700 bg-gray-100 rounded-t hover:outline-none p-2 w-full mt-4 border placeholder:text-sm"
                  />
                  <button className="px-4 py-2 bg-black text-gray-200 rounded-b w-full capitalize tracking-wide">
                    Subscribe
                  </button>
                </div>
              </div>

              <div className="border border-dotted" />
            </div> */}
          </div>
        </main>
      )}
    </>
  );
};

export default BlogListing;
