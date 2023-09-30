import { Image } from "antd";
import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const ModalSlider = ({ images }) => {
  const [changeImage, setChangeImage] = useState(images[0].path_900x500);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectImage = (el, index) => {
    setChangeImage(el.path_900x500);
    setActiveIndex(index);
  };

  const [currentImage, setCurrentImage] = useState(0);
  const [zoomOnChange, setZoomOnChange] = useState(1);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      // Go to the next image
      const nextImageIndex = (currentImage + 1) % images.length;
      setActiveIndex(nextImageIndex);
      setCurrentImage(nextImageIndex);
      setChangeImage(images[nextImageIndex].path_900x500);
      setZoomOnChange(1); // Reset zoom level when changing image
    } else if (event.key === "ArrowLeft") {
      // Go to the previous image
      const prevImageIndex = (currentImage - 1 + images.length) % images.length;
      setActiveIndex(prevImageIndex);
      setCurrentImage(prevImageIndex);
      setChangeImage(images[prevImageIndex].path_900x500);
      setZoomOnChange(1); // Reset zoom level when changing image
    }
  };

  const [flag, setFlag] = useState(0);

  const imageRef = useRef(null);

  const dimensions = {
    height: flag === 0 ? "100%" : "110%",
    width: flag === 0 ? "100%" : "110%",
  };

  const zoomHandler = () => {
    if (flag === 0) {
      imageRef.current.style.transform = "scale(1.3, 1.3)";
      setFlag(1);
    } else {
      imageRef.current.style.transform = "scale(1, 1)";
      setFlag(0);
    }
  };

  const [isZoomed, setIsZoomed] = useState(false);
  const maxZoom = 2;

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const getZoomStyle = () => {
    if (isZoomed) {
      return {
        transform: `scale(${maxZoom})`,
        transition: "transform 0.3s ease",
        cursor: "grab",
      };
    }
    return {
      transform: "scale(1)",
      transition: "transform 0.3s ease",
      cursor: "zoom-in",
    };
  };

  const handleDrag = (e, data) => {
    const { x, y } = data;
    const imageElement = e.target;
    imageElement.style.transform = `translate(${x}px, ${y}px) ${
      getZoomStyle().transform
    }`;
  };

  const handleDragStop = (e) => {
    const imageElement = e.target;
    imageElement.style.transition = getZoomStyle().transition;
  };

  const containerStyle = {
    overflow: "auto",
    position: "relative",
  };

  const draggableStyle = {
    cursor: getZoomStyle().cursor,
  };

  return (
    <div className="">
      <div className="flex justify-center">
        {/* <TransformWrapper
          initialScale={zoomOnChange}
          options={{
            minScale: 1,
            maxScale: 0,
          }}
          maxScale={1.5}
        >
          <TransformComponent> */}
        <div
          style={containerStyle}
          className="image-container w-auto h-auto md:w-[480px] md:h-[720px] lg:w-[480px] lg:h-[720px] xl:w-[480px] xl:h-[720px]"
        >
          <Draggable
            disabled={!isZoomed}
            onDrag={handleDrag}
            onStop={handleDragStop}
            bounds="parent"
            position={{ x: 0, y: 0 }}
          >
            <Image
              src={`${process.env.REACT_APP_HAPS_MEDIA_BASE_URL}${changeImage}`}
              id="myImage"
              style={getZoomStyle()}
              onClick={toggleZoom}
              preview={false}
              // height={dimensions.height}
              // width={dimensions.width}
              // onClick={zoomHandler}
              // ref={imageRef}
              className={`${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"} `}
            />
          </Draggable>
        </div>
        {/* </TransformComponent>
        </TransformWrapper> */}
      </div>
      <hr className="mt-2" />
      <div className="mt-2 flex justify-center bg-slate-100">
        <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-2 xl:gap-2 justify-start md:justify-center lg:justify-center xl:justify-center items-center">
          {images &&
            images.map((el, index) => (
              <div
                key={index}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onClick={() => {
                  selectImage(el, index);
                  setZoomOnChange(1); // Reset zoom level when selecting a new image
                }}
              >
                <img
                  src={process.env.REACT_APP_HAPS_MEDIA_BASE_URL + el.path_900x500}
                  alt=""
                  className={`w-[80px] h-[120px] cursor-pointer rounded-lg`}
                />
                <div
                  className={`${
                    activeIndex === index
                      ? "border-2 rounded-full border-black mt-1"
                      : ""
                  }`}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ModalSlider;
