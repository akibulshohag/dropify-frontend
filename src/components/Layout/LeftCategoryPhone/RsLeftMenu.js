/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from "react";

import styles from "./RsLeftMenu.module.css";

import { useStatus } from "@/context/contextStatus";
import request from "@/lib/request";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineRight } from "react-icons/ai";
import { BiLeftArrowAlt } from "react-icons/bi";

function ResLeftMenu() {
  const { sideCategory, setSideCategory } = useStatus();
  const [categoryItems, setCategoryItems] = useState([]);
  const [loading, setloading] = useState(true);
  const [categoryName, setcategoryName] = useState("");
  const [childCategoryTab, setchildCategorytab] = useState(0);
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

  const router = useRouter();

  // useEffect(() => {
  //   const axiosCategory = async () => {
  //     const res = await request(`category/fetch-all`);
  //     setCategoryItems(res?.data);
  //   };
  //   axiosCategory();
  // }, []);

  const handleRoute = (item) => {
    router.push(`/${item?.slug}`);
  };

  return (
    <div className={`${sideCategory ? styles.main__wrapper : ``}`}>
      <div
        className={`overflow-y-auto
							md:hidden bg-[#a7a7a7] fixed top-0 
							duration-500   sm:p-10 z-50 ${
                sideCategory ? "left-0 w-[60%]" : "left-[-100%]"
              }
        			`}
      >
        <div
          className="flex justify-between items-center py-2 px-2 bg-tahiti-500"
          onClick={() => setSideCategory(false)}
        >
          <h4 className="font-semibold tracking-wider text-white">Category</h4>
          <svg
            className="h-7 w-7 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
          </svg>
        </div>
        <div className="max-h-[100vh] overflow-y-auto left-side">
          {childCategoryTab == 0 ? (
            <div className="bg-tahiti-50  ">
              <>
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
                      <AiOutlineRight className="text-tahiti-800 text-[13px] mr-4" />
                    </div>
                  </div>
                ))}
              </>
            </div>
          ) : (
            <div>
              <div
                onClick={() => {
                  setcategoryName(""), setchildCategorytab(0);
                }}
                className="flex items-center h-12 mb-1 bg-tahiti-50 px-4 cursor-pointer"
              >
                <BiLeftArrowAlt className="text-[25px]" />
                <span className="text-[14px] font-semibold ml-4 h-[20px]">
                  {categoryName}
                </span>
              </div>
              <div className="bg-tahiti-50 max-h-[100vh] overflow-y-auto left-side">
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
                      <AiOutlineRight className="text-tahiti-800 text-[13px] mr-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResLeftMenu;
