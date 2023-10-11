import React, { useState } from "react";
import Image from "next/image";
import { BiHomeAlt, BiArchive, BiDollar } from "react-icons/bi";
import { TbTruckDelivery, TbLogout } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { useStatus } from "@/context/contextStatus";
import { useRouter } from "next/router";

const SideCategoryWeb = () => {
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
    <div className="w-[250px] min-h-screen max-h-[100vh] bg-tahiti-50 mt-[65px] fixed xs:mt-[95px]">
      <div className="py-4 mt-[10px] border-b-[3px]">
        <div className="flex items-center justify-center">
          <div className="w-[70px] h-[70px] bg-[#AAAAAA] text-white rounded-full flex items-center justify-center">
            A
          </div>
        </div>
        <div className="text-center text-[16px] font-semibold py-3 text-[#AAAAAA]">
          01789088779
        </div>
      </div>
      <div className="">
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
          } flex items-center py-4 border-b border-b-[#f5f2f2] pl-3 hover:bg-[#F2F2F2] cursor-pointer`}
        >
          <div className="text-[20px]">
            <FiSettings />
          </div>
          <div className="text-[15px] ml-3">Settings</div>
        </div>
        <div className="flex items-center py-4 border-b border-b-[#f5f2f2]  pl-3 hover:bg-[#F2F2F2] cursor-pointer">
          <div className="text-[20px]">
            <TbLogout />
          </div>
          <div className="text-[15px] ml-3">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default SideCategoryWeb;
