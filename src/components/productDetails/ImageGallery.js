import React, { useState, useEffect } from "react";
import Image from "next/image";
import Zoom from "react-img-zoom";
import ReactPlayer from "react-player";
import ReactImageZoom from "react-image-zoom";
import Magnifier from "react-magnifier";

const ImageGallery = ({
  data,
  selectedImage,
  setselectedImage,
  isVideo,
  setisVideo,
}) => {
  const props = {
    width: 450,
    height: 450,
    img: selectedImage,
  };
  const [render, setrender] = useState(false);
  const [video, setvideo] = useState('')



  const handleImage = (val) => {
    setselectedImage(val?.Large?.Url);
    setisVideo(false)
  };

  const selectVideo=(val)=>{
    setisVideo(true)
    setvideo(val)
  }


  return (
    <div className="col-span-2 ">
      {!isVideo ? (
        <div className="">
          {/* <Zoom img={selectedImage} zoomScale={3} height={450} width={450} /> */}
          {/* {selectedImage ?
        <div className="cursor-crosshair">
          <ReactImageZoom {...props} zoomPosition="original" />
        </div>
        :null} */}

          <div className="relative w-full h-[500px] md:h-[300px]">
            <Image src={`${selectedImage}`} fill alt="mainImage" />
          </div>
        </div>
      ) : (
        <div className="">
          <video
            width="100%"
            height="450px"
            controls
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      )}
      <div className="py-3 pr-2">
        <div className="grid grid-cols-5 gap-2 md:grid-cols-3">
          {data?.Videos?.Url ? (
            <div className="bg-gray-300 p-2 flex items-center justify-center  border border-tahiti-800 ">
              <div
                onClick={() => selectVideo(data?.Videos?.Url)}
                className="w-full h-[50px]  relative flex items-center justify-center cursor-pointer "
              >
               
                <Image
                  className="object-fill"
                  src={`${data?.Videos?.PreviewUrl ? data?.Videos?.PreviewUrl : '/assets/product/empty.svg'}`}
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
          ) : null}

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
