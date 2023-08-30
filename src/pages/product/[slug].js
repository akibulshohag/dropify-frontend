import React, { useState, useEffect } from "react";
import Image from "next/image";
import Zoom from "react-img-zoom";
import ReactPlayer from "react-player";
import ReactImageZoom from "react-image-zoom";
import ImageGallery from "@/components/productDetails/ImageGallery";

const SingleProduct = () => {
  const props = {
    width: 450,
    height: 450,
    img: "/assets/product/product1.jpg",
  };

  const [imageSelect, setimageSelect] = useState(
    "/assets/product/product1.jpg"
  );
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

  return (
    <div className="flex min-h-screen flex-col mt-[65px] xs:mt-[95px]">
      <div className="p-2">
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-3 bg-tahiti-50 rounded-sm">
            <div className=" py-4 pl-4 border-b">
              <h1 className="text-[18px] font-bold">
                Shirt, colored long-sleeve, Korean style, for leisure
              </h1>
            </div>
            <div className="grid grid-cols-5 gap-8 p-4">
              <ImageGallery/>
              <div className="col-span-3 bg-slate-600">sdf</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
