import React from "react";
import Image from "next/image";

const productCard = ({product}) => {
  let arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  return (
    <>
      {product?.map((item, index) => (
        <div key={index} className=" p-2 col-span-1 shadow-md cursor-pointer">
          <div className="relative w-full h-[200px]">
            <Image
              priority={true}
              className="object-cover hover:scale-95 duration-500"
              src={"/assets/product/product1.jpg"}
              fill
              alt="product"
            />
          </div>
          <div className="py-2 truncate ">Factory direct selling fresh J</div>
          <div className="flex items-center justify-between py-2">
            <div className=" text-red-500 text-[16px] font-semibold">৳ 380</div>
            <div className=" text-tahiti-900 text-[14px]">Sold: 12584555</div>
          </div>

          <div className="flex gap-2 py-2">
            <div className="text-tahiti-900 text-[14px] line-through">
              ৳ 399
            </div>
            <div className="bg-tahiti-300 text-[12px] flex items-center justify-center px-1 rounded-md">
              10% Off
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default productCard;
