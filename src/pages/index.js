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

  let arr = [{}, {}, {}];
  let arr1 = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  return (
    <main className={`flex min-h-screen flex-col mt-[65px] xs:mt-[95px]`}>
      <div className="p-2">
        <Slider />
        <LandingCategory />
        <div className="grid grid-cols-2 mt-3 gap-3">
          <PopularProduct />
          <NewProduct />
        </div>
        {arr.map((item, index) => (
          <div key={index} className="mt-3 bg-tahiti-50">
            <div className="flex items-center justify-between  border-b py-4 px-6">
              <div className="font-bold">BAGS</div>
              <div className="bg-tahiti-100 text-tahiti-50 p-1 text-[14px] rounded-md cursor-pointer">
                See More
              </div>
            </div>
            <div className="py-4">
              <div className="grid grid-cols-7 gap-3 px-4">
                {loading ? (
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
                  <ProductCard product={arr1} />
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="mt-3 bg-tahiti-50 ">
          <div className="flex items-center justify-center p-3 border-b py-4">
            <div className="font-bold text-[20px]">Trending Products</div>
          </div>
          <div className="py-4">
            <div className="grid grid-cols-7 gap-3 px-4">
              {loading ? (
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
                <ProductCard product={arr1} />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-6">
          <button className="bg-tahiti-500 text-tahiti-50 p-2 text-[13px] rounded-md">
            Load More
          </button>
        </div>
      </div>
    </main>
  );
}
