import { convertToBase64 } from "@/components/base64/base64Converter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillCameraFill, BsSearch } from "react-icons/bs";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import postRequest from "../../../lib/postRequest";
import { useStatus } from "@/context/contextStatus";
import Image from "next/image";
import request from "@/lib/request";

const Navbar = () => {
  const router = useRouter();
  const { token, userName, userPhone, refreshApi } = useStatus();
  const [uploadedImage, setUploadedImage] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartlength, setcartlength] = useState(0);
  const [wishLength, setwishLength] = useState(0);

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

  useEffect(() => {
    function handleScroll() {
      if (window.innerWidth <= 768) {
        if (window.scrollY > 400) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const getCartTotals = async () => {
      let res = await request("customer/wish-cart-count");
      if (res?.success) {
        setcartlength(res?.data?.totalCart);
        setwishLength(res?.data?.totalWish);
      }
    };
    getCartTotals();
  }, [refreshApi]);

  const loginRoute = () => {
    if (token) {
      router.push("/account");
    } else {
      router.push("/login");
    }
  };

  return (
    <div
      className={`h-[65px] bg-tahiti-500 fixed inset-0 z-20   ${
        isScrolled
          ? "xs:h-[65px] xms:h-[65px] xls:h-[65px] sm:h-[65px]"
          : "xs:h-[100px] xms:h-[100px] xls:h-[100px] sm:h-[100px]"
      } `}
    >
      <div
        className={`px-4 grid grid-cols-12 items-center h-full xs:grid-cols-4 xms:grid-cols-4 xls:grid-cols-4 sm:grid-cols-4   ${
          isScrolled
            ? "xs:pt-0 xms:pt-0 xls:pt-0 sm:pt-0"
            : "xs:pt-2 xms:pt-2 xls:pt-2 sm:pt-2"
        }`}
      >
        {/* <div className="w-32 h-10 relative">
           <Image src="/assets/logo/logo.png" fill priority alt='logo'/>
         </div> */}

        <div
          onClick={() => router.push("/")}
          className={`text-[25px] font-extrabold text-tahiti-600 font-serif col-span-4 cursor-pointer xs:col-span-1 xms:col-span-1 xls:col-span-1 sm:col-span-1 ${
            isScrolled ? "xs:hidden xms:hidden xls:hidden sm:hidden" : ""
          }`}
        >
          Dropify
        </div>
        <div className="flex items-center w-full  col-span-5  xs:order-3 xms:order-3 xls:order-3 sm:order-3">
          <button
            onClick={handleCameraClick}
            className="text-[25px] w-14 flex items-center justify-center bg-white h-10 rounded-l-3xl cursor-pointer xs:h-9"
          >
            <BsFillCameraFill className="text-tahiti-800 ml-1" />
          </button>
          <div className="w-full">
            <input
              placeholder="Search by keyword link"
              className="h-10 w-full text-black px-3 bg-white outline-none placeholder:text-black placeholder:text-[14px] xs:h-9"
              type="text"
            />
          </div>

          <div className="flex items-center h-10 bg-black rounded-r-3xl py-2 px-6 cursor-pointer z-30 xs:h-9">
            <BsSearch className="text-tahiti-700" />
          </div>
        </div>
        <div
          className={`text-[25px] text-tahiti-600 flex gap-5 mr-5 col-span-3 items-end justify-end xs:col-span-3 xs:mr-0 xms:col-span-3 xms:mr-0 xls:col-span-3 xls:mr-0 sm:mr-0 ${
            isScrolled ? "xs:hidden xms:hidden xls:hidden sm:hidden" : ""
          }`}
        >
          <div className="relative">
            <FiShoppingCart
              onClick={() => router.push("/cart")}
              className="cursor-pointer"
            />
            <div className="text-[14px] absolute top-[-12px] right-[-7px]">
              {cartlength != 0 ? cartlength : ""}
            </div>
          </div>
          <div className="relative">
            <FiHeart className="cursor-pointer" />
            <div className="text-[14px] absolute top-[-12px] right-[-5px]">
              {wishLength != 0 ? wishLength : ""}
            </div>
          </div>
          {/* <FiHeart className="cursor-pointer" /> */}
          <div>
            {userName != "" ? (
              <div
                onClick={loginRoute}
                className="flex items-center cursor-pointer"
              >
                <div className="border-[2px] p-[1px] rounded-full border-yellow-400">
                  <div className="w-[30px] h-[30px] relative ">
                    <Image src="/assets/logo/user.png" fill alt="user" />
                  </div>
                </div>
                <div className="text-[14px] text-white  ml-2">{atob(userName)}</div>
              </div>
            ) : (
              <div>
                <FiUser onClick={loginRoute} className="cursor-pointer" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
