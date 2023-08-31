import React, { useState, useEffect } from "react";
import Image from "next/image";
import ImageGallery from "@/components/productDetails/ImageGallery";
import Campaign from "@/components/productDetails/Campaign";
import SizeChart from "@/components/productDetails/SizeChart";
import PriceTable from "@/components/productDetails/PriceTable";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsBagCheck ,BsFillHeartFill,BsHeart} from "react-icons/bs";

const SingleProduct = () => {
  let arr = [
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
              <ImageGallery />
              <div className="col-span-3">
                <Campaign />
                <div className="py-2 mt-2">
                  <div className="text-[18px] font-semibold">Color: White</div>
                  <div className="grid grid-cols-10 gap-2 pr-5 py-2">
                    {arr.map((item, index) => (
                      <div
                        key={index}
                        className="p-[2px]   border-[2px] border-gray-300 rounded-md col-span-1 hover:border-tahiti-100 hover:border-[2px]"
                      >
                        <div className="w-full h-[50px] relative flex items-center justify-center cursor-pointer">
                          <Image
                            className="object-fill rounded-md"
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
                <SizeChart />
                <div className="py-1 text-center">Scroll More Size</div>
                <PriceTable />
                <div className="mt-5 grid grid-cols-7 gap-2">
                  <div className="bg-tahiti-500 flex items-center justify-center col-span-3 py-2 rounded-sm">
                    <AiOutlineShoppingCart className="text-tahiti-50 text-[20px] mr-4"/>
                    <div className="text-white font-bold text-[18px]">Add To Cart</div>
                  </div>
                  <div className="bg-tahiti-500 flex items-center justify-center col-span-3 py-2 rounded-sm">
                    <BsBagCheck className="text-tahiti-50 text-[20px] mr-4"/>
                    <div className="text-white font-bold text-[18px]">Buy Now</div>
                  </div>
                  <div className=" border-[3px] flex items-center justify-center col-span-1 py-2 rounded-sm">
                    <BsFillHeartFill className=" text-[20px]"/>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
