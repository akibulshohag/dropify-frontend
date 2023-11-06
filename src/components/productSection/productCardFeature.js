import React, { useState } from "react";
import Image from "next/image";
import Skeleton from 'react-loading-skeleton';


const ProductCard = ({ product }) => {
  const [loading, setloading] = useState(true);

  let arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  return (
    <>
      {product?.map((item, index) => (
        <div  key={index}>
          {loading ? (
            <div
             
              className=" p-2 col-span-1 shadow-md cursor-pointer "
            >
              <div className="">
                <Image
                  priority={true}
                  className="object-cover hover:scale-95 duration-500"
                  src={"/assets/product/product1.jpg"}
                  // fill
                  width={250}
                  height={250}
                  alt="product"
                />
              </div>
              <div className="py-2 truncate ">
                Factory direct selling fresh J
              </div>
              <div className="flex items-center justify-between py-2">
                <div className=" text-red-500 text-[16px] font-semibold xs:text-[12px] xms:text-[12px] xls:text-[12px] sm:text-[12px] md:text-[12px] lg:text-[13px]">
                  ৳ 380
                </div>
                <div className=" text-tahiti-900 text-[14px] xs:text-[12px] xms:text-[12px] xls:text-[12px] sm:text-[12px] md:text-[12px] lg:text-[13px] lg:hidden">
                  Sold: 125845
                </div>
              </div>

              <div className="flex gap-2 py-2 lg:hidden">
                <div className="text-tahiti-900 text-[14px] line-through xs:text-[12px] xms:text-[12px] xls:text-[12px] sm:text-[12px] md:text-[12px] lg:text-[13px]">
                  ৳ 399
                </div>
                <div className="bg-tahiti-300 text-[12px] flex items-center justify-center px-1 rounded-md xs:text-[12px] xms:text-[12px] xls:text-[12px] sm:text-[12px] md:text-[12px] lg:text-[13px]">
                  10% Off
                </div>
              </div>
            </div>
          ) : (
            <div key={index} className="shadow-md p-2">
              <div>
                <Skeleton height={200} />
              </div>
              <Skeleton count={3} />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ProductCard;
