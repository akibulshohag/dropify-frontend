import React, { useState } from "react";
import Image from "next/image";
import { BiHomeAlt, BiArchive, BiDollar } from "react-icons/bi";
import { TbTruckDelivery, TbLogout } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { useStatus } from "@/context/contextStatus";
import { useRouter } from "next/router";

const ProfileMenuPhone = () => {
  const router = useRouter();
  const { accountMenu, setaccountMenu } = useStatus();
  const changeRoute = (routeLink) => {
    if (routeLink == "dashboard") {
      setaccountMenu("dashboard");
      router.push("/account");
    } else if (routeLink == "orders") {
      setaccountMenu("orders");
      router.push("/account/orders");
    } else if (routeLink == "payments") {
      setaccountMenu("payments");
      router.push("/account/payments");
    } else if (routeLink == "delivery") {
      setaccountMenu("delivery");
      router.push("/account/delivery");
    } else if (routeLink == "settings") {
      setaccountMenu("settings");
      router.push("/account/settings");
    }
  };
  return (
    <div className="mt-[65px] hidden xs:mt-[99px] xs:block xms:mt-[99px] xms:block xls:mt-[99px] xls:block sm:mt-[99px] sm:block ">
      <div className="py-3 mt-[10px] border-b-[3px] bg-white">
        <div className="flex items-center justify-center">
          <div className="w-[50px] h-[50px] bg-[#AAAAAA] text-white rounded-full flex items-center justify-center">
            A
          </div>
        </div>
        <div className="text-center text-[16px] font-semibold py-3 text-[#AAAAAA]">
          01789088779
        </div>
      </div>

      <div className="grid grid-cols-2 bg-white">
        <div
          onClick={() => changeRoute("dashboard")}
          className={`${
            accountMenu == "dashboard"
              ? "border-r-[3px] border-r-tahiti-500 bg-[#F2F2F2]"
              : ""
          } flex items-center py-4 border-b border-b-[#f5f2f2] pl-3 hover:bg-[#F2F2F2] cursor-pointer`}
        >
          <div className="text-[20px]">
            <BiHomeAlt />
          </div>
          <div className="text-[15px] ml-3">Dashboard</div>
        </div>
        <div
          onClick={() => changeRoute("orders")}
          className={`${
            accountMenu == "orders"
              ? "border-r-[3px] border-r-tahiti-500 bg-[#F2F2F2]"
              : ""
          } flex items-center py-4 border-b border-b-[#f5f2f2] pl-3 hover:bg-[#F2F2F2] cursor-pointer`}
        >
          <div className="text-[20px]">
            <BiArchive />
          </div>
          <div className="text-[15px] ml-3">Orders</div>
        </div>
        <div
          onClick={() => changeRoute("payments")}
          className={`${
            accountMenu == "payments"
              ? "border-r-[3px] border-r-tahiti-500 bg-[#F2F2F2]"
              : ""
          } flex items-center py-4 border-b border-b-[#f5f2f2] pl-3 hover:bg-[#F2F2F2] cursor-pointer`}
        >
          <div className="text-[20px]">
            <BiDollar />
          </div>
          <div className="text-[15px] ml-3">Payments</div>
        </div>
        <div
          onClick={() => changeRoute("delivery")}
          className={`${
            accountMenu == "delivery"
              ? "border-r-[3px] border-r-tahiti-500 bg-[#F2F2F2]"
              : ""
          } flex items-center py-4 border-b border-b-[#f5f2f2] pl-3 hover:bg-[#F2F2F2] cursor-pointer`}
        >
          <div className="text-[20px]">
            <TbTruckDelivery />
          </div>
          <div className="text-[15px] ml-3">Delivery</div>
        </div>
        <div
          onClick={() => changeRoute("settings")}
          className={`${
            accountMenu == "settings"
              ? "border-r-[3px] border-r-tahiti-500 bg-[#F2F2F2]"
              : ""
          } flex items-center py-4 border-b border-b-[#ffffff] pl-3 hover:bg-[#F2F2F2] cursor-pointer`}
        >
          <div className="text-[20px]">
            <FiSettings />
          </div>
          <div className="text-[15px] ml-3">Settings</div>
        </div>
        <div className="flex items-center py-4 border-b border-b-[#ffffff]  pl-3 hover:bg-[#F2F2F2] cursor-pointer">
          <div className="text-[20px]">
            <TbLogout />
          </div>
          <div className="text-[15px] ml-3">Logout</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileMenuPhone 