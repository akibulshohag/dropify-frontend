import Image from "next/image";
import { Inter } from "next/font/google";
import Slider from "../components/slider";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LandingCategory from "../components/landingCategory";
import PopularProduct from "@/components/productSection/popularProduct";
import NewProduct from "@/components/productSection/newProduct";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  let arr = [{}, {}, {}, {},{}, {}, {}, {},{}, {},{}, {}, {}, {}];
  return (
    <main className={`flex min-h-screen flex-col mt-[65px] xs:mt-[95px]`}>
      <div className="p-2">
        <Slider />
        <LandingCategory />
        <div className="grid grid-cols-2 mt-3 gap-3">
          <PopularProduct />
          <NewProduct />
        </div>
        <div className="mt-3 bg-tahiti-50">
          <div className="flex items-center justify-between p-3 border-b py-4">
            <div className="font-bold">BAGS</div>
            <div className="bg-tahiti-100 text-tahiti-50 p-1 text-[14px] rounded-md cursor-pointer">
              See More
            </div>
          </div>
          <div className="py-4">
            <div className="grid grid-cols-7 gap-3 px-4">
              {arr?.map((item, index) => (
                <div
                  key={index}
                  className=" p-2 col-span-1 shadow-md cursor-pointer"
                >
                  <div className="relative w-full h-[200px]">
                    <Image
                      priority={true}
                      className="object-cover hover:scale-95 duration-500"
                      src={"/assets/product/product1.jpg"}
                      fill
                      alt="product"
                    />
                  </div>
                  <div className="py-2 truncate ">
                    Factory direct selling fresh J
                  </div>
                  <div className='flex items-center justify-between py-2'>
                    <div className=" text-red-500 text-[16px] font-semibold">
                      ৳ 380
                    </div>
                    <div className=" text-tahiti-900 text-[14px]">
                      Sold: 12584555
                    </div>
                  </div>

                  <div className="flex gap-2 py-2">
                    <div className="text-tahiti-900 text-[14px] line-through">
                      ৳ 399
                    </div>
                    <div className="bg-tahiti-300 text-[12px] flex items-center justify-center px-1 rounded-md">
                      10% Off
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
