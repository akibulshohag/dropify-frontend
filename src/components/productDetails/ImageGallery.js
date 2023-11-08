import React, { useState, useEffect } from "react";
import Image from "next/image";
import Zoom from "react-img-zoom";
import ReactPlayer from "react-player";
import ReactImageZoom from "react-image-zoom";
import Magnifier from "react-magnifier";

const ImageGallery = ({data,selectedImage,setselectedImage}) => {
  const props = {
    width: 450,
    height: 450,
    img: selectedImage,
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

  const handleImage = (val) => {
    setselectedImage(val?.Large?.Url)
  };

  console.log('............',selectedImage);

  return (
    <div className="col-span-2 ">
      <div className="">
        {/* <Zoom img={selectedImage} zoomScale={3} height={450} width={450} /> */}
         {/* {selectedImage ?
        <div className="cursor-crosshair">
          <ReactImageZoom {...props} zoomPosition="original" />
        </div>
        :null} */}
        <div className="relative w-full h-[500px]">
          <Image src={selectedImage} fill alt="mainImage"/>
        </div>
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
          {data?.videos?.map((video, index) => (
            <div
              key={`video-${index}`}
              className="bg-gray-300 p-2 flex items-center justify-center  border border-tahiti-800 "
            >
              <div
                // onClick={() => imageChange()}
                className="w-full h-[50px] relative flex items-center justify-center cursor-pointer "
              >
                <Image
                  className="object-fill"
                  src={"/assets/product/product2.jpg"}
                  fill
                  alt="variation image"
                  priority={true}
                />
                <div className="w-full h-full z-10 bg-slate-400 opacity-50 flex items-center justify-center">
                  <Image
                    className="object-fill"
                    src={"/assets/product/play.svg"}
                    width={50}
                    height={50}
                    alt="variation image"
                    priority={true}
                  />
                </div>
              </div>
            </div>
          ))}

          {data?.Pictures?.map((item, index) => (
            <div
              key={index}
              className="p-[2px] border-[#a8a5a5] border-[2px] rounded-md hover:border-tahiti-500"
            >
              <div
                onClick={() => handleImage(item)}
                className="w-full h-[60px] relative flex items-center justify-center cursor-pointer"
              >
                <Image
                  className="object-cover"
                  src={item?.Small?.Url}
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
