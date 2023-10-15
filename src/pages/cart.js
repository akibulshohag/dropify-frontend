import React from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = () => {
  return (
    <div className="flex min-h-screen flex-col mt-[65px] xs:mt-[95px]">
      <div className="p-2">
        <div className="bg-tahiti-50 py-4 px-3 rounded-sm flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-tahiti-500 rounded-full text-tahiti-50 w-6 h-6 flex items-center justify-center">
              4
            </div>
            <div className="text-[18px] font-semibold pl-2">CART</div>
          </div>
          <div>15 October, 2023</div>
        </div>

        <div className="mt-2 grid grid-cols-6 gap-2">
          <div className="col-span-4  rounded-sm ">
            <div className="bg-tahiti-50">
              <div className="border-b py-2">
                <div className="py-2 px-3 flex items-center justify-between pb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-3"
                        type="checkbox"
                        className="w-4 h-4  bg-gray-100 border-gray-300 rounded"
                      />
                      <label for="checkbox-table-3" className="sr-only">
                        checkbox
                      </label>
                    </div>
                    <div>
                      <Image
                        src="/assets/product/product1.jpg"
                        width={60}
                        height={60}
                        alt="cart"
                      />
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold">
                        Order ID: #6527XX
                      </div>
                      <div>Men's expeditionary Pure</div>
                    </div>
                  </div>
                  <div>
                    <RiDeleteBin6Line
                      size={25}
                      className="text-red-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="border-b">
                <div className="px-6  py-3 grid grid-cols-4">
                  <div className="flex items-center gap-3 col-span-2">
                    <div>
                      <Image
                        src="/assets/product/product1.jpg"
                        width={35}
                        height={35}
                        alt="cart"
                      />
                    </div>
                    <div>
                      <div className="text-[14px] h-[15px]">
                        Color: White set, with little bears
                      </div>
                      <div className="text-[14px] h-[15px]">
                        Size: XL(130 catty -145 catty)
                      </div>
                    </div>
                  </div>
                  <div className="text-[14px] col-span-1 flex items-center">
                    <span>3 x</span>
                    <span> ৳955</span>
                  </div>
                  <div className="flex items-center gap-3 col-span-1 justify-end">
                    <div className="bg-tahiti-500 text-tahiti-50 flex items-center justify-center rounded-md px-2 cursor-pointer">
                      Edit
                    </div>
                    <div className="h-[20px]">৳2865</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="px-6  py-3 grid grid-cols-4 ">
                  <div className="flex items-center gap-3 col-span-2">
                    <div>Item details</div>
                  </div>
                  <div className="text-[14px] col-span-1 flex items-center">
                    <span>5 Items</span>
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    ৳2865
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 ">
            <div className="bg-tahiti-50 rounded-sm">
              <div className="py-3 border-b text-[20px] font-semibold flex items-center justify-center">
                Cart Summary
              </div>
              <div className="px-3">
                <div className="flex items-center justify-between py-2">
                  <div>Product Price</div>
                  <div className="font-semibold">৳11759</div>
                </div>
                <div className="flex items-center justify-between py-1">
                  <div>Pay Now (70%)</div>
                  <div className="font-semibold">৳11759</div>
                </div>
              </div>
              <div className="px-3 py-2">
                <div className="bg-tahiti-300 flex items-center justify-center py-3 rounded-md">
                  <div className="">
                    <div className="text-[18px] font-semibold text-center">
                      Pay after delivery
                    </div>
                    <div className="text-[18px] text-center">
                      <div>৳ 3528 + Shipping & Courier Charges</div>
                    </div>
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

export default Cart;
