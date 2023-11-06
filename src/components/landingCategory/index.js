import React from "react";
import Image from "next/image";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiChevronLeft, BiChevronRight, BiInfoCircle } from "react-icons/bi";
import Skeleton from 'react-loading-skeleton';
import homeCategory from "@/components/data/homeCategory";
import { useRouter } from 'next/router'


const LandingCategory = () => {
  const router = useRouter()
  
  return (
    <div>
      <div className="bg-tahiti-50 mt-2 h-[130px] flex group rounded-sm">
        <Swiper
          spaceBetween={5}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: false,
            // el: ".swiper-pagination",
          }}
          navigation={{
            nextEl: ".button-next-slide",
            prevEl: ".button-prev-slide",
          }}
          modules={[ Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 3.4,
              spaceBetween: 5,
            },

            375: {
              slidesPerView: 3.8,
              spaceBetween: 5,
            },

            425: {
              slidesPerView: 4.2,
              spaceBetween: 7,
            },

            480: {
              slidesPerView: 4.8,
              spaceBetween: 7,
            },
            530: {
              slidesPerView: 5,
              spaceBetween: 7,
            },
            640: {
              slidesPerView: 5.3,
              spaceBetween: 7,
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 5,
            },
            1440: {
              slidesPerView: 11.7,
              spaceBetween: 0,
            },
          }}
        >
          {homeCategory?.map((item, index) => (
            <div className="" key={index}>
              <SwiperSlide>
                <div onClick={()=>router.push(`/shop/${item?.categorySlug}`)} className=" border-r border-r-tahiti-600 grid items-center justify-center h-full px-1 cursor-pointer">
                  <div className="flex items-center justify-center">
                    <Image
                      src={item?.categoryImage}
                      width={60}
                      height={60}
                      alt="category"
                    />
                  </div>
                  <div className="text-center text-[13px] font-semibold">
                    {item?.categoryName}
                  </div>
                </div>
              </SwiperSlide>
            </div>
          ))}
          <div className="hidden group-hover:block">
            <div className="button-prev-slide w-[30px] h-[30px] bg-tahiti-500 rounded-full grid justify-center place-items-center absolute top-[40%] z-50 left-[2px] cursor-pointer">
              <BiChevronLeft size={30} className="text-[#8EBB4F]" />
            </div>
          </div>
          <div className="hidden group-hover:block">
            <div className="button-next-slide w-[30px] h-[30px] bg-tahiti-500 rounded-full grid justify-center place-items-center absolute top-[40%] z-50 right-[2px] cursor-pointer">
              <BiChevronRight size={30} className="text-[#8EBB4F]" />
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default LandingCategory;
