import React, { useState } from "react";
import Image from "next/image";
import {BiHomeAlt,BiArchive,BiDollar} from 'react-icons/bi'
import {TbTruckDelivery,TbLogout} from 'react-icons/tb'
import {FiSettings} from 'react-icons/fi'

const SideCategoryWeb = () => {
 
  const [childCategoryTab, setchildCategorytab] = useState(0);

  return (
    <div className="w-[250px] min-h-screen max-h-[100vh] bg-tahiti-50 mt-[65px] fixed xs:mt-[95px]">
       <div className="py-4 mt-[10px] border-b-[3px]">
          <div className="flex items-center justify-center">
            <div className="w-[70px] h-[70px] bg-[#AAAAAA] text-white rounded-full flex items-center justify-center">A</div>
          </div>
          <div className="text-center text-[16px] font-semibold py-3 text-[#AAAAAA]">01789088779</div>
       </div>
       <div className="">
         <div className="flex items-center py-4 border-b border-b-[#f5f2f2] border-r-[3px] border-r-tahiti-500 pl-3 hover:bg-[#F2F2F2] cursor-pointer">
            <div className="text-[20px]">
                <BiHomeAlt/>
            </div>
            <div className="text-[15px] ml-3">
                Dashboard
            </div>
         </div>
         <div className="flex items-center py-4 border-b border-b-[#f5f2f2] border-r-[3px] border-r-tahiti-500 pl-3 hover:bg-[#F2F2F2] cursor-pointer">
            <div className="text-[20px]">
                <BiArchive/>
            </div>
            <div className="text-[15px] ml-3">
                Orders
            </div>
         </div>
         <div className="flex items-center py-4 border-b border-b-[#f5f2f2] border-r-[3px] border-r-tahiti-500 pl-3 hover:bg-[#F2F2F2] cursor-pointer">
            <div className="text-[20px]">
                <BiDollar/>
            </div>
            <div className="text-[15px] ml-3">
                Payments
            </div>
         </div>
         <div className="flex items-center py-4 border-b border-b-[#f5f2f2] border-r-[3px] border-r-tahiti-500 pl-3 hover:bg-[#F2F2F2] cursor-pointer">
            <div className="text-[20px]">
                <TbTruckDelivery/>
            </div>
            <div className="text-[15px] ml-3">
                Delivery
            </div>
         </div>
         <div className="flex items-center py-4 border-b border-b-[#f5f2f2] border-r-[3px] border-r-tahiti-500 pl-3 hover:bg-[#F2F2F2] cursor-pointer">
            <div className="text-[20px]">
                <FiSettings/>
            </div>
            <div className="text-[15px] ml-3">
                Settings
            </div>
         </div>
         <div className="flex items-center py-4 border-b border-b-[#f5f2f2] border-r-[3px] border-r-tahiti-500 pl-3 hover:bg-[#F2F2F2] cursor-pointer">
            <div className="text-[20px]">
                <TbLogout/>
            </div>
            <div className="text-[15px] ml-3">
                Logout
            </div>
         </div>
       </div>
    </div>
  );
};

export default SideCategoryWeb;
