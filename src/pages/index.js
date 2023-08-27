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
  return (
    <main className={`flex min-h-screen flex-col mt-[65px] xs:mt-[95px]`}>
      <div className="p-2">
        <Slider />
        <LandingCategory />
        <div className="grid grid-cols-2 mt-3 gap-3">
           <PopularProduct/>
           <NewProduct/>
        </div>
      </div>
    </main>
  );
}
