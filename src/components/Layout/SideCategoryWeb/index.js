import { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useRouter } from "next/router";
import categoryList from "@/components/data/category";
import Image from "next/image";

const SideCategoryWeb = () => {
  const router = useRouter();
  const [categoryName, setcategoryName] = useState("");
  const [subCategoryList, setsubCategoryList] = useState([]);
  const [childCategoryTab, setchildCategorytab] = useState(0);

  const getSubCategory = (val)=>{
     const index = categoryList.findIndex((item)=> item?.categoryId === val?.categoryId)
     setsubCategoryList(categoryList[index]?.subCats)
     setcategoryName(val?.categoryName)
     setchildCategorytab(1)
  }

  return (
    <div className="w-[250px] min-h-screen bg-tahiti-50 max-h-[100vh] mt-[65px] fixed xs:mt-[95px] xs:hidden xms:hidden xls:hidden sm:hidden md:w-[0px] md:hidden lg:hidden ">
      {childCategoryTab == 0 ? (
        <div className="  max-h-[93vh] overflow-y-auto left-side">
          
            <>
              {categoryList?.map((item, index) => (
                <div
                  onClick={() => {
                    getSubCategory(item);
                  }}
                  key={index}
                  className="flex items-center  justify-between hover:bg-tahiti-300 h-14 pl-4 group cursor-pointer"
                >
                  <div className="flex items-center ">
                    <Image
                      src={item?.categoryIamge}
                      width={25}
                      height={25}
                      alt="logo"
                    />
                    <span className="text-[14px] font-medium ml-4  overflow-x-hidden left-side">
                     {item?.categoryName}
                    </span>
                  </div>
                  <div className="group-hover:translate-x-[-8px] transition-transform duration-500">
                    <AiOutlineRight className="text-tahiti-800 text-[13px] mr-2" />
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
            className="flex items-center h-14 mb-1  px-4 cursor-pointer border-b-4"
          >
            <BiLeftArrowAlt className="text-[25px]" />
            <span className="text-[14px] font-semibold ml-4  overflow-x-hidden left-side">
              {categoryName}
            </span>
          </div>
          <div className=" max-h-[85vh] overflow-y-scroll left-side mb-10">
            {subCategoryList?.map((item, index) => (
              <div
                onClick={() => {
                  router.push(`/shop/${item?.subCatSlug}`)
                }}
                key={index}
                className="flex items-center justify-between hover:bg-tahiti-300 h-14 pl-4 group cursor-pointer "
              >
                <div className="flex items-center">
                  <span className="text-[14px] font-medium ml-2  sm:text-[12px] overflow-x-hidden left-side">
                    {item?.subCatName}
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
