import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineRight } from "react-icons/ai";
import { BiLeftArrowAlt } from "react-icons/bi";
import "./sideCategory.module.css";

const SideCategoryWeb = () => {
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
  let arr1 = [
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
  const [categoryName, setcategoryName] = useState("");
  const [childCategoryTab, setchildCategorytab] = useState(0);

  return (
    <div className="w-[250px] min-h-screen max-h-[100vh] mt-[65px] fixed xs:mt-[95px]">
      {childCategoryTab == 0 ? (
        <div className="bg-tahiti-600 max-h-[100vh] overflow-y-auto left-side">
          {arr?.map((item, index) => (
            <div
              onClick={() => {
                setcategoryName("Bag"), setchildCategorytab(1);
              }}
              key={index}
              className="flex items-center  justify-between hover:bg-tahiti-300 h-14 pl-4 group cursor-pointer"
            >
              <div className="flex items-center">
                <img
                  src="/assets/category/handbag.svg"
                  width={25}
                  height={25}
                  alt="logo"
                />
                <span className="text-[14px] font-semibold ml-4 h-[16px]">
                  Bags
                </span>
              </div>
              <div className="group-hover:translate-x-[-8px] transition-transform duration-500">
                <AiOutlineRight className="text-tahiti-800 text-[13px] mr-2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div
            onClick={() => {
              setcategoryName(""), setchildCategorytab(0);
            }}
            className="flex items-center h-14 mb-1 bg-tahiti-600 px-4 cursor-pointer"
          >
            <BiLeftArrowAlt className="text-[25px]" />
            <span className="text-[14px] font-semibold ml-4 h-[20px]">
              {categoryName}
            </span>
          </div>
          <div className="bg-tahiti-600 max-h-[100vh] overflow-y-auto left-side">
            {arr1?.map((item, index) => (
              <div
                onClick={() => {
                  setcategoryName("Bag"), setchildCategorytab(1);
                }}
                key={index}
                className="flex items-center justify-between hover:bg-tahiti-300 h-14 pl-4 group cursor-pointer"
              >
                <div className="flex items-center">
                  <span className="text-[14px] font-medium ml-2 h-[16px]">
                    Children
                  </span>
                </div>
                <div className="group-hover:translate-x-[-8px] transition-transform duration-500">
                  <AiOutlineRight className="text-tahiti-800 text-[13px] mr-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideCategoryWeb;
