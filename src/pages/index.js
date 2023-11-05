import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import Slider from "../components/slider";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LandingCategory from "../components/landingCategory";
import PopularProduct from "@/components/productSection/popularProduct";
import NewProduct from "@/components/productSection/newProduct";
import ProductCard from "@/components/productSection/productCard";
import Skeleton from "react-loading-skeleton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setloading] = useState(true);
  const [game, setgame] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])

  let arr = [{}, {}, {}];
  let arr1 = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  const arrUpdate = async () => {
    
      let arr3 = game;
      let arr2 = [{}, {}, {}, {}, {}];
      let data = arr3.concat(arr2);
      setgame(data);
      console.log();
    
  };


  return (
    <main
      className={`flex min-h-screen flex-col mt-[65px] xs:mt-[99px] xms:mt-[99px] xls:mt-[99px] sm:mt-[99px] `}
    >
      <div className="p-2 xs:p-0 xms:p-0 xls:p-0 sm:p-0">
        <Slider />
        <LandingCategory />
        <div className="grid grid-cols-2 xs:grid-cols-1 xms:grid-cols-1 xls:grid-cols-1 sm:grid-cols-1 mt-3 gap-3 md:grid-cols-1 ">
          <PopularProduct />
          <NewProduct />
        </div>
        {arr.map((item, index) => (
          <div key={index} className="mt-3 bg-tahiti-50">
            <div className="flex items-center justify-between  border-b py-4 px-6 xs:px-2 xms:px-2 xls:px-2 sm:px-2">
              <div className="font-bold">BAGS</div>
              <div className="bg-tahiti-100 text-tahiti-50 p-1 text-[14px] rounded-md cursor-pointer">
                See More
              </div>
            </div>
            <div className="py-4">
              <div className="grid grid-cols-7 gap-3 px-4 xs:grid-cols-2 xs:gap-1 xs:px-[0px] xms:grid-cols-2 xms:gap-1 xms:px-[0px] xls:grid-cols-2 xls:gap-1 xls:px-[0px] sm:grid-cols-4 sm:gap-1 sm:px-[0px] md:grid-cols-4 lg:grid-cols-5">
                <ProductCard productList={arr1} />
              </div>
            </div>
          </div>
        ))}
        <div className="mt-3 bg-tahiti-50 ">
          <div className="flex items-center justify-center p-3 border-b py-4">
            <div className="font-bold text-[20px]">Trending Products</div>
          </div>
          <div className="py-4">
            <div className="grid grid-cols-7 gap-3 px-4 xs:grid-cols-2 xs:gap-1 xs:px-[0px] xms:grid-cols-2 xms:gap-1 xms:px-[0px] xls:grid-cols-2 xls:gap-1 xls:px-[0px] sm:grid-cols-4 sm:gap-1 sm:px-[0px] md:grid-cols-4 lg:grid-cols-5">
              {!loading ? (
                <>
                  <div className="shadow-md p-2">
                    <div>
                      <Skeleton height={200} />
                    </div>
                    <Skeleton count={4} />
                  </div>
                  <div className="shadow-md p-2">
                    <div>
                      <Skeleton height={200} />
                    </div>
                    <Skeleton count={4} />
                  </div>
                  <div className="shadow-md p-2">
                    <div>
                      <Skeleton height={200} />
                    </div>
                    <Skeleton count={4} />
                  </div>
                  <div className="shadow-md p-2">
                    <div>
                      <Skeleton height={200} />
                    </div>
                    <Skeleton count={4} />
                  </div>
                  <div className="shadow-md p-2">
                    <div>
                      <Skeleton height={200} />
                    </div>
                    <Skeleton count={4} />
                  </div>
                  <div className="shadow-md p-2">
                    <div>
                      <Skeleton height={200} />
                    </div>
                    <Skeleton count={4} />
                  </div>
                  <div className="shadow-md p-2">
                    <div>
                      <Skeleton height={200} />
                    </div>
                    <Skeleton count={4} />
                  </div>
                </>
              ) : (
                <ProductCard productList={game} />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-6">
          <button onClick={arrUpdate} className="bg-tahiti-500 text-tahiti-50 p-2 text-[13px] rounded-md">
            Load More
          </button>
        </div>
      </div>
    </main>
  );
}
