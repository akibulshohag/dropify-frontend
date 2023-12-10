import React from "react";
import Image from "next/image";
import { useStatus } from "@/context/contextStatus";


const PriceTable = ({totalQty,totalPrice}) => {
  const {offerCampaign } = useStatus();

  
  return (
    <div>
      <div className="relative overflow-x-auto border sm:rounded-lg left-side mt-5">
        <table className="w-full text-sm  text-gray-500 dark:text-gray-400 border">
          <thead className="text-xs text-gray-700 uppercase bg-[#F0F0F0] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 max-w-[120px]">
                <div className="flex items-center justify-start">
                  <div className="font-bold">From China</div>
                  <Image
                    className="ml-4"
                    src={"/assets/product/cn.svg"}
                    width={20}
                    height={20}
                    alt="cn"
                  />
                </div>
              </th>

              <th scope="col" className="px-6 py-3  ">
                <div className="flex items-center justify-start">
                  <div className="font-bold">To Bangladesh</div>
                  <Image
                    className="ml-4"
                    src={"/assets/product/bd.svg"}
                    width={20}
                    height={20}
                    alt="cn"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b text-left dark:bg-gray-900 dark:border-gray-700 cursor-pointer hover:bg-[#F0F0F0]">
              <th
                scope="row"
                className="px-6 py-3 text-gray-900 font-semibold whitespace-nowrap   dark:text-white"
              >
                Product Quantity
              </th>
              <td className="px-6 py-3 border-l border-r text-tahiti-800 font-semibold">
                {totalQty}
              </td>
            </tr>
            <tr className="bg-white border-b text-left dark:bg-gray-900 dark:border-gray-700 cursor-pointer hover:bg-[#F0F0F0]">
              <th
                scope="row"
                className="px-6 py-3 text-gray-900 font-semibold whitespace-nowrap  dark:text-white"
              >
                Product Price
              </th>
              
              <td className="px-6 py-3 border-l border-r text-tahiti-800 font-semibold">
                ৳{offerCampaign?.isValid ?(totalPrice- totalPrice*offerCampaign?.percent/100) :totalPrice}
              </td>
            </tr>
            <tr className="bg-white border-b text-left dark:bg-gray-900 dark:border-gray-700 cursor-pointer hover:bg-[#F0F0F0]">
              <th
                scope="row"
                className="px-6 py-3 text-gray-900 font-semibold whitespace-nowrap  dark:text-white"
              >
                Shipping Charge
              </th>
              <td className="px-6 py-3 border-l border-r text-tahiti-800 font-semibold">
                ৳ 650 / 850 Per Kg
              </td>
            </tr>
            <tr className="bg-white border-b text-left dark:bg-gray-900 dark:border-gray-700 cursor-pointer hover:bg-[#F0F0F0]">
              <th
                scope="row"
                className="px-6 py-3 text-gray-900 font-semibold whitespace-nowrap  dark:text-white"
              >
                Total Cost
              </th>
              <td className="px-6 py-3 border-l border-r text-tahiti-800 font-semibold">
                ৳{offerCampaign?.isValid ?(totalPrice- totalPrice*offerCampaign?.percent/100) :totalPrice} + Shipping & Courier Charges
              </td>
            </tr>
            <tr className="bg-white border-b text-left dark:bg-gray-900 dark:border-gray-700 cursor-pointer hover:bg-[#F0F0F0]">
              <th
                scope="row"
                className="px-6 py-3 text-gray-900 font-semibold whitespace-nowrap  dark:text-white"
              >
                Pay now (70%)
              </th>
              <td className="px-6 py-3 border-l border-r text-tahiti-800 font-semibold">
                ৳{offerCampaign?.isValid? (totalPrice*70/100 - (totalPrice*70/100)*offerCampaign?.percent/100) : Math.ceil(totalPrice*70/100)}
              </td>
            </tr>
            <tr className="bg-white border-b text-left dark:bg-gray-900 dark:border-gray-700 cursor-pointer hover:bg-[#F0F0F0]">
              <th
                scope="row"
                className="px-6 py-3 text-gray-900 font-semibold whitespace-nowrap  dark:text-white"
              >
                Pay on Delivery
              </th>
              <td className="px-6 py-3 border-l border-r text-tahiti-800 font-semibold">
                ৳{offerCampaign?.isValid ? ((totalPrice -(totalPrice*70/100)) - (totalPrice -(totalPrice*70/100))*offerCampaign?.percent/100 ) : Math.ceil(totalPrice -(totalPrice*70/100)) } + Shipping & Courier Charges
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceTable;
