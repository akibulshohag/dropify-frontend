import { hostname } from "@/lib/config";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Slider = ({banner,slider}) => {
  let slider1 = [{}, {}];

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 ">
        <div className="col-span-2 xs:col-span-full xms:col-span-full xls:col-span-full sm:col-span-full group">
          <Swiper
            spaceBetween={5}
            loop
            autoplay={{
              delay: 5000,
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
            modules={[Autoplay, Pagination, Navigation]}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 5,
              },

              375: {
                slidesPerView: 1,
                spaceBetween: 5,
              },

              425: {
                slidesPerView: 1,
                spaceBetween: 7,
              },

              480: {
                slidesPerView: 1,
                spaceBetween: 7,
              },
              530: {
                slidesPerView: 1,
                spaceBetween: 7,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 7,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
              1440: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
            }}
          >
            {slider?.map((item, index) => (
              // <div  className="cursor-pointer">
                <SwiperSlide key={`slider-${index}`}>
                  <div className="relative w-full h-[450px] xs:h-[150px] xms:h-[170px] xls:h-[200px] sm:h-[280px] md:h-[220px] lg:h-[270px] z-0 cursor-pointer">
                    <Image
                    className="rounded-sm"
                      src={`${hostname}/${item?.image}`}
                      fill
                      alt="banner"
                      priority
                    />
                  </div>
                </SwiperSlide>
              // </div>
            ))}
            {/* <div className="hidden group-hover:block">
              <div className="button-prev-slide w-[30px] h-full bg-[#282e326f] grid justify-center place-items-center absolute top-0 z-10 left-[0px] cursor-pointer">
                <BiChevronLeft size={30} className="text-[#8EBB4F]" />
              </div>
            </div>
            <div className="hidden group-hover:block">
              <div className="button-next-slide w-[30px] h-full bg-[#282e326f]  grid justify-center place-items-center absolute top-0  z-10 right-[0px] cursor-pointer">
                <BiChevronRight size={30} className="text-[#8EBB4F]" />
              </div>
            </div> */}
          </Swiper>
        </div>
        <div className="col-span-1 xs:hidden xms:hidden xls:hidden sm:hidden ">
          <Swiper
            spaceBetween={5}
            loop
            autoplay={{
              delay: 8000,
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
            modules={[Autoplay]}
            // breakpoints={{
            //   320: {
            //     slidesPerView: 1,
            //     spaceBetween: 5,
            //   },

            //   375: {
            //     slidesPerView: 1,
            //     spaceBetween: 5,
            //   },

            //   425: {
            //     slidesPerView: 1,
            //     spaceBetween: 7,
            //   },

            //   480: {
            //     slidesPerView: 1,
            //     spaceBetween: 7,
            //   },
            //   530: {
            //     slidesPerView: 1,
            //     spaceBetween: 7,
            //   },
            //   640: {
            //     slidesPerView: 2.4,
            //     spaceBetween: 7,
            //   },
            //   768: {
            //     slidesPerView: 1,
            //     spaceBetween: 5,
            //   },
            //   1024: {
            //     slidesPerView: 1,
            //     spaceBetween: 5,
            //   },
            //   1440: {
            //     slidesPerView: 1,
            //     spaceBetween: 5,
            //   },
            // }}
          >
            {banner?.map((item, index) => (
              // <div className="cursor-pointer" >
                <SwiperSlide key={`banner-${index}`}>
                  <div className="relative w-full h-[450px] col-span-1 z-0 md:h-[220px] lg:h-[270px] cursor-pointer">
                    <Image
                    className="rounded-sm"
                      src={`${hostname}/${item?.image}`}
                      fill
                      alt="banner"
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              // </div>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Slider;
