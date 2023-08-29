import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className=" bg-tahiti-50 border-l">
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
        <div className="text-[24px] text-center py-3">Explore Dropify Brands... Think to the Buy.</div>
      </div>
      <div className="bg-[#F7F7F7]  py-6 ">
         <div className="grid grid-cols-12 gap-5 max-w-[90rem] mx-auto">
           <div className="col-span-3">
             <div className="text-[18px] font-bold">CONTACT</div>
             <div className="text-[16px]">House#00, Road-30/0, Dhaka, Dhaka-1209, Bangladesh</div>
             <div className="text-[15px]">Email: demo@gmail.com</div>
             <div className="text-[15px]">Phone: 0125478954</div>
             <div className="text-[15px]">Tel: 215478555</div>
           </div>
           <div className="col-span-3">
             <div className="text-[18px] font-bold">CUSTOMER</div>
             <div className="text-[15px]">Account</div>
             <div className="text-[15px]">Cart</div>
             <div className="text-[15px]">Wishlist</div>
             <div className="text-[15px]">Shipping Charge</div>
             <div className="text-[15px]">Retail Purchase</div>
             <div className="text-[15px]">FAQ</div>
           </div>
           <div className="col-span-3">
             <div className="text-[18px] font-bold">INFORMATION</div>
             <div className="text-[15px]">About us</div>
             <div className="text-[15px]">Contact Us</div>
             <div className="text-[15px]">Privacy Policy</div>
             <div className="text-[15px]">Returns & Refund</div>
             <div className="text-[15px]">Terms & Conditions</div>
             <div className="text-[15px]">Secured Payment</div>
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
      <div className="border-t text-center py-4 bg-[#F7F7F7]">
        <div>© 2023 B2GSOFT - All Rights Reserved</div>
      </div>
    </div>
  );
};

export default Footer;
