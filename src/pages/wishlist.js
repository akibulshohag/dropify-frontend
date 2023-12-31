import request from "@/lib/request";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/router";
import postRequest from "@/lib/postRequest";
import { useStatus } from "@/context/contextStatus";

const WishList = () => {
  const router = useRouter();
  const { setrefreshApi, refreshApi } = useStatus();
  const [allWishList, setallWishList] = useState([]);
  const [renderMe, setrenderMe] = useState(false);

  useEffect(() => {
    const getWishList = async () => {
      let res = await request("customer/wishlist/fetch");
      if (res?.success) {
        setallWishList(res?.data);
      }
    };
    getWishList();
  }, [renderMe]);

  const removeWish = async (proId) => {
    const data = {
      productId: proId,
    };

    let res = await postRequest("customer/wishlist/remove", data);
    if (res.success) {
      setrefreshApi(!refreshApi);
      setrenderMe(!renderMe);
    }
  };

  return (
    <div className="flex min-h-screen flex-col mt-[65px] xs:mt-[99px] xms:mt-[99px] xls:mt-[99px] sm:mt-[99px] ">
      <div className="p-2">
        <div className="bg-tahiti-50">
          <div className="px-4 py-4 border-b font-semibold text-[18px]">
            Wishlist
          </div>
          {allWishList.length > 0 &&
            allWishList.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-7 gap-5 py-3 px-4 border-b items-center"
              >
                <div className="col-span-5 flex items-center gap-3">
                  <div className="relative w-[70px] h-[70px]">
                    <Image src={item?.image} fill alt="product" />
                  </div>
                  <div
                    onClick={() => router.push(`/product/${item?.productId}`)}
                    className=" cursor-pointer"
                  >
                    {item?.title}
                  </div>
                </div>
                <div className="col-span-1 text-red-800 text-[18px] font-serifs font-semibold">
                  ৳ {Math.ceil(item?.price + (item?.price * 10) / 100)}
                </div>
                <div className="col-span-1 flex items-center gap-3 justify-end">
                  <div
                    onClick={() => router.push(`/product/${item?.productId}`)}
                    className="flex items-center text-white bg-tahiti-500 py-[6px] px-3 gap-2 rounded-md cursor-pointer"
                  >
                    <IoCartOutline className="text-[26px]" />
                    <span className="font-semibold">Buy Now</span>
                  </div>
                  <div
                    onClick={() => removeWish(item?.productId)}
                    className="flex items-center text-white bg-red-600 py-[6px] px-2 gap-2 rounded-md cursor-pointer"
                  >
                    <RiDeleteBin5Line className="text-[26px]" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WishList;
