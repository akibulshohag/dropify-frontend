import Image from "next/image";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { useStatus } from "@/context/contextStatus";

const Footer = () => {

  const router = useRouter()
  const {token} = useStatus()
  const [year,setYear] = useState('')
    useEffect(() => {
        let year = new Date();
        setYear(year.getFullYear())
    },[year])

  return (
    <div className=" bg-tahiti-50 border-l xs:border-none   xms:border-none   xls:border-none   sm:border-none  " >
      <div className=" py-8">
        <div className="flex items-center justify-center py-3">
          <Image
            src={"/assets/logo/logo.png"}
            width={150}
            height={200}
            alt="logo"
          />
        </div>
        <div className="flex items-center justify-center mt-2">
          <div className="px-2">
            <Image
              src={"/assets/footer/facebook.svg"}
              width={30}
              height={30}
              alt="logo"
            />
          </div>
          <div className="px-2">
            <Image
              src={"/assets/footer/instagram.svg"}
              width={30}
              height={30}
              alt="logo"
            />
          </div>
          <div className="px-2">
            <Image
              src={"/assets/footer/youtube.svg"}
              width={30}
              height={30}
              alt="logo"
            />
          </div>
          <div className="px-2">
            <Image
              src={"/assets/footer/linkedin.svg"}
              width={30}
              height={30}
              alt="logo"
            />
          </div>
          <div className="px-2">
            <Image
              src={"/assets/footer/tiktok.svg"}
              width={30}
              height={30}
              alt="logo"
            />
          </div>
        </div>
        <div className="text-[24px] text-center py-3 xs:px-2 xs:text-[18px] xms:px-2 xms:text-[18px] xls:px-2 xls:text-[18px] sm:px-2 sm:text-[18px]">
          Explore Dropify Brands... Think to the Buy.
        </div>
      </div>
      <div className="bg-[#066D53]  py-6 text-white">
        <div className="grid grid-cols-12 gap-5 max-w-[90rem] mx-auto xs:grid-cols-6 xs:px-2 xms:grid-cols-6 xms:px-2 xls:grid-cols-6 xls:px-2 sm:grid-cols-6 sm:px-2 md:px-2 lg:px-2">
          <div className="col-span-3">
            <div className="text-[18px] font-bold">CONTACT</div>
            <div className="text-[16px]">
              House#00, Road-30/0, Dhaka, Dhaka-1209, Bangladesh
            </div>
            <div className="text-[15px]">Email: demo@gmail.com</div>
            <div className="text-[15px]">Phone: 0125478954</div>
            <div className="text-[15px]">Tel: 215478555</div>
          </div>
          <div className="col-span-3">
            <div className="text-[18px] font-bold">CUSTOMER</div>
            <div onClick={()=>token ? router.push('/account') :router.push('/login')} className="text-[15px] cursor-pointer">Account</div>
            <div onClick={()=>token ? router.push('/cart') :router.push('/login')} className="text-[15px] cursor-pointer">Cart</div>
            <div onClick={()=>token ? router.push('/wishlist') :router.push('/login')} className="text-[15px] cursor-pointer">Wishlist</div>
            <div onClick={()=>router.push('/custom-and-shipping-charge')} className="text-[15px] cursor-pointer">Shipping Charge</div>
            <div className="text-[15px]">Retail Purchase</div>
            <div onClick={()=>router.push('/faq')} className="text-[15px] cursor-pointer">FAQ</div>
          </div>
          <div className="col-span-3">
            <div className="text-[18px] font-bold">INFORMATION</div>
            <div onClick={()=>router.push('/about')} className="text-[15px] cursor-pointer">About us</div>
            <div  className="text-[15px] cursor-pointer">Contact Us</div>
            <div onClick={()=>router.push('/privacy-policy')} className="text-[15px] cursor-pointer">Privacy Policy</div>
            <div onClick={()=>router.push('/return-and-refund-policy')} className="text-[15px] cursor-pointer">Returns & Refund</div>
            <div onClick={()=>router.push('/terms-conditions')} className="text-[15px] cursor-pointer">Terms & Conditions</div>
            <div onClick={()=>router.push('/secured-payment')} className="text-[15px] cursor-pointer">Secured Payment</div>
          </div>
          <div className="col-span-3">
            <div className="text-[18px] font-bold">MOBILE APPS</div>
            <div className="">
              <Image
                src={"/assets/footer/playstore.png"}
                width={140}
                height={30}
                alt="logo"
              />
            </div>
            <div className="">
              <Image
                src={"/assets/footer/applestore.png"}
                width={140}
                height={30}
                alt="logo"
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" text-center py-4 bg-[#036149] text-white xs:pb-[65px] xms:pb-[65px] xls:pb-[65px] sm:pb-[65px]">
        <div>&copy; {year} B2GSOFT - All Rights Reserved</div>
      </div>
    </div>
  );
};

export default Footer;
