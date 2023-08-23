import React, { useState } from "react";
import Image from "next/image";
import { BsFillCameraFill, BsSearch } from "react-icons/bs";
import { convertToBase64 } from "@/components/base64/base64Converter";
import { FiUser, FiShoppingCart, FiHeart } from "react-icons/fi";
import postRequest from "../../../lib/postRequest";

const Navbar = () => {
  const [uploadedImage, setUploadedImage] = useState("");

  const handleCameraClick = async () => {
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.onchange = async (e) => {
      const file = e.target.files[0];
      const base64Image = await convertToBase64(file);
      if(base64Image){
        try {
          let data ={
            image:base64Image,
          }
           let res = await postRequest('file-service/upload-image',data)

        } catch (error) {
          
        }
      }
    };
    imageInput.click();
  };

  return (
    <div className="h-[65px] bg-tahiti-200 fixed inset-0">
      <div className="px-4 flex items-center justify-between h-full">
        {/* <div className="w-32 h-10 relative">
           <Image src="/assets/logo/logo.png" fill priority alt='logo'/>
         </div> */}
        <div className="text-[25px] font-extrabold text-tahiti-600 font-serif">
          Dropify
        </div>
        <div className="flex items-center">
          <button
            onClick={handleCameraClick}
            className="text-[25px] w-12 flex items-center justify-center bg-white h-9 rounded-l-2xl cursor-pointer"
          >
            <BsFillCameraFill className="text-tahiti-400" />
          </button>
          <div className="relative">
            <div>
              <input
                placeholder="Search by keyword link"
                className="h-9 w-[600px] lg:w-[600px] md:w-[400px]  text-black  px-3 bg-white outline-none placeholder:text-black placeholder:text-[14px]"
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center h-9 bg-black rounded-r-2xl py-2 px-6 cursor-pointer z-30">
            <BsSearch className="text-tahiti-700" />
          </div>
        </div>
        <div className="text-[25px] text-tahiti-600 flex mr-5">
          <FiShoppingCart className="mr-4 cursor-pointer"/>
          <FiHeart className="mr-4 cursor-pointer"/>
          <FiUser className="cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
