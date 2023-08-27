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
      if (base64Image) {
        try {
          let data = {
            image: base64Image,
          };
          let res = await postRequest("file-service/upload-image", data);
        } catch (error) {}
      }
    };
    imageInput.click();
  };

  return (
    <div className="h-[65px] bg-tahiti-100 fixed inset-0 xs:h-[95px] z-20">
      <div className="px-4 grid grid-cols-12 items-center h-full xs:grid-cols-4">
        {/* <div className="w-32 h-10 relative">
           <Image src="/assets/logo/logo.png" fill priority alt='logo'/>
         </div> */}
        <div className="text-[25px] font-extrabold text-tahiti-600 font-serif col-span-4 xs:col-span-1">
          Dropify
        </div>
        <div className="flex items-center  col-span-5 xs:order-3">
          <button
            onClick={handleCameraClick}
            className="text-[25px] w-14 flex items-center justify-center bg-white h-10 rounded-l-3xl cursor-pointer xs:h-9"
          >
            <BsFillCameraFill className="text-tahiti-800 ml-1" />
          </button>
          <div className="relative">
            <div>
              <input
                placeholder="Search by keyword link"
                className="h-10 w-[600px] xs:w-[190px] lg:w-[600px] md:w-[400px] text-black px-3 bg-white outline-none placeholder:text-black placeholder:text-[14px] xs:h-9"
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center h-10 bg-black rounded-r-3xl py-2 px-6 cursor-pointer z-30 xs:h-9">
            <BsSearch className="text-tahiti-700" />
          </div>
        </div>
        <div className="text-[25px] text-tahiti-600 flex mr-5 col-span-3 items-end justify-end xs:col-span-3 xs:mr-0">
          <FiShoppingCart className="mr-4 cursor-pointer" />
          <FiHeart className="mr-4 cursor-pointer" />
          <FiUser className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
