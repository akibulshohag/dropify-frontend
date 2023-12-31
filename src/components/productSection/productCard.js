import React, { useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";
import { useStatus } from "@/context/contextStatus";

const ProductCard = ({ productList }) => {
  const router = useRouter();
  const { priceInc, offerCampaign } = useStatus();

  return (
    <>
      {productList?.map((item, index) => (
        <div key={index}>
          <div
            onClick={() => router.push(`/product/${item?.productId}`)}
            className=" p-2 col-span-1 shadow-md cursor-pointer"
          >
            <div className="">
              <Image
                priority={true}
                className="object-cover w-full h-[220px] hover:scale-95 duration-500"
                src={item?.image}
                // fill
                width={250}
                height={250}
                alt={item?.title}
              />
            </div>
            <div title={item?.title} className="py-2 truncate text-[14px]">
              {item?.title}
            </div>
            <div className="flex items-center justify-between py-2">
              {offerCampaign?.isValid ? 
              <div className=" text-red-500 text-[16px] font-sans font-semibold xs:text-[12px] xms:text-[12px] xls:text-[12px] sm:text-[12px] md:text-[12px] lg:text-[13px]">
                ৳ {Math.ceil(item?.price + (item?.price * priceInc) / 100) - Math.ceil((item?.price * offerCampaign?.percent) / 100) }
              </div>
              :<div className=" text-red-500 text-[16px] font-sans font-semibold xs:text-[12px] xms:text-[12px] xls:text-[12px] sm:text-[12px] md:text-[12px] lg:text-[13px]">
              ৳ {Math.ceil(item?.price + (item?.price * priceInc) / 100)}
            </div>}
              {/* <div className=" text-tahiti-900 text-[14px] xs:text-[12px] xms:text-[12px] xls:text-[12px] sm:text-[12px] md:text-[12px] lg:text-[13px]">
                  Sold: 125845
                </div> */}
            </div>
            {offerCampaign?.isValid && (
              <div className="flex gap-2 py-2">
                <div className="text-tahiti-900 text-[14px] line-through xs:text-[12px] xms:text-[12px] xls:text-[12px] sm:text-[12px] md:text-[12px] lg:text-[13px]">
                  ৳ {Math.ceil(item?.price + (item?.price * priceInc) / 100)}
                </div>
                <div className="bg-tahiti-300 text-[12px] flex items-center justify-center px-1 rounded-md xs:text-[12px] xms:text-[12px] xls:text-[12px] sm:text-[12px] md:text-[12px] lg:text-[13px]">
                  {offerCampaign?.percent}% Off
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
