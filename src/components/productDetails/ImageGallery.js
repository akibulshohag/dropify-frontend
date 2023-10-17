import React, { useState, useEffect } from "react";
import Image from "next/image";
import Zoom from "react-img-zoom";
import ReactPlayer from "react-player";
import ReactImageZoom from "react-image-zoom";

const ImageGallery = () => {
  const props = {
    width: 450,
    // height: 450,
    img: "/assets/product/2.jpg",
  };

  const [imageSelect, setimageSelect] = useState("/assets/product/2.jpg");
  const [render, setrender] = useState(false);

  let videos = [{}, {}];
  let images = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];

const imageChange =()=>{
  setimageSelect('/assets/product/product1.jpg')
  setrender(!render)
  console.log('...........res',render,imageSelect);
}

  return (
    <div className="col-span-2 ">
      <div className="">
        {/* <Zoom img={imageSelect} zoomScale={3} height={450} width={450} /> */}
        <img
      src={imageSelect}
      alt=""
      style={{ overflow: "hidden" }}
      onMouseOver={(e) => (e.currentTarget.style = { transform: "scale(1.25)", overflow: "hidden" })}
      onMouseOut={(e) => (e.currentTarget.style = { transform: "scale(1)", overflow: "hidden" })}
    />
        {/* <div className="cursor-crosshair">
          <ReactImageZoom {...props} zoomPosition="original" />
        </div> */}
      </div>
      {/* <div className="">
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=4159zHCxywg&ab_channel=NaturalFishingBD`}
                    width="100%"
                    height="450px"
                    volume={1}
                    controls
                  />
                </div> */}
      <div className="py-3 pr-2">
        <div className="grid grid-cols-5 gap-2">
          {videos.map((video, index) => (
            <div
              key={`video-${index}`}
              className="bg-blue-200 p-2 flex items-center justify-center  border border-tahiti-800"
            >
              Video {index + 1}
            </div>
          ))}

          {images.map((image, index) => (
            <div
              key={index}
              className="p-[2px]   border border-tahiti-400 rounded-sm"
            >
              <div
                onClick={() => imageChange()}
                className="w-full h-[60px] relative flex items-center justify-center cursor-pointer"
              >
                <Image
                  className="object-fill"
                  src={"/assets/product/product2.jpg"}
                  fill
                  alt="variation image"
                  priority={true}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
