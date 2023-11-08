import React, { useState, useEffect } from "react";
import Image from "next/image";
import ImageGallery from "@/components/productDetails/ImageGallery";
import Campaign from "@/components/productDetails/Campaign";
import SizeChart from "@/components/productDetails/SizeChart";
import PriceTable from "@/components/productDetails/PriceTable";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsBagCheck, BsFillHeartFill, BsHeart, BsDot } from "react-icons/bs";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import ProductCard from "@/components/productSection/productCard";
import Conditions from "@/components/productDetails/condition";
import ShippingCharge from "@/components/productDetails/ShippingCharge";
import { useRouter } from "next/router";
import style from "@/styles/productDetails.module.css";
import request from "@/lib/request";

const SingleProduct = ({ data }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [selectedImage, setselectedImage] = useState("");
  const [tabChange, settabChange] = useState(1);

  let arr = [
    { name: "akib", image: "/assets/product/product1.jpg" },
    { name: "akib", image: "" },
    { name: "Made according to the requirements of guests", image: "" },
    { name: "akib", image: "/assets/product/product1.jpg" },
    { name: "akib sdfsdf", image: "" },
    { name: "akib", image: "" },
    { name: "akib", image: "/assets/product/product1.jpg" },
  ];

  useEffect(() => {
    if (data) {
      setselectedImage(data?.MainPictureUrl);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col mt-[65px] xs:mt-[95px]">
      <div className="p-2">
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-3 ">
            <div className="bg-tahiti-50 rounded-sm">
              <div className=" py-4 pl-4 border-b">
                <h1 className="text-[18px] font-bold">
                  Shirt, colored long-sleeve, Korean style, for leisure
                </h1>
              </div>
              <div className="grid grid-cols-5 gap-8 p-4">
                <ImageGallery
                  data={data}
                  setselectedImage={setselectedImage}
                  selectedImage={selectedImage}
                />
                <div className="col-span-3">
                  {/* <Campaign /> */}
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div className="bg-tahiti-500  h-[80px] rounded-md text-white flex items-center justify-center">
                      <div className="">
                        <div className="text-[18px] font-semibold text-center">
                          ৳1094
                        </div>
                        <div className="text-[16px] text-center">1 or more</div>
                      </div>
                    </div>
                    <div className="bg-tahiti-500  h-[80px] rounded-md text-white flex items-center justify-center">
                      <div className="">
                        <div className="text-[18px] font-semibold text-center">
                          ৳1094
                        </div>
                        <div className="text-[16px] text-center">1 or more</div>
                      </div>
                    </div>
                    <div className="bg-tahiti-500  h-[80px] rounded-md text-white flex items-center justify-center">
                      <div className="">
                        <div className="text-[18px] font-semibold text-center">
                          ৳1094
                        </div>
                        <div className="text-[16px] text-center">1 or more</div>
                      </div>
                    </div>
                  </div>
                  <div className="py-2 mt-2">
                    <div className="text-[18px] font-semibold">
                      Color: White
                    </div>
                    <div className="flex items-center flex-wrap gap-2 pr-5 py-2">
                      {arr.map((item, index) => (
                        <>
                          {item?.image ? (
                            <div
                              key={index}
                              className={`p-[1px] border-[1px] border-gray-300 rounded-md col-span-1 hover:border-tahiti-500 hover:border-[1px] cursor-pointer ${style.subImages}`}
                            >
                              <div className="w-[55px] h-[55px] relative flex items-center justify-center cursor-pointer ">
                                <Image
                                  className="object-fill rounded-md"
                                  src={item?.image}
                                  fill
                                  alt="variation image"
                                  priority={true}
                                />
                              </div>
                              <span
                                className={`${style.count} ${style.spanSelectedBadge1}`}
                              >
                                1
                              </span>
                            </div>
                          ) : (
                            <div>
                              <div
                                className={`${style.variationContainer} relative cursor-pointer`}
                              >
                                <div
                                  className={`bg-[#F4F4F4] px-2 py-4 rounded-md text-black`}
                                >
                                  {item?.name}
                                </div>
                                <span
                                  className={`${style.count} ${style.spanSelectedBadge}`}
                                >
                                  1
                                </span>
                              </div>
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                  <SizeChart />
                  <div className="py-1 text-center">Scroll More Size</div>
                  <PriceTable />
                  <div className="mt-5 grid grid-cols-7 gap-2">
                    <div className="bg-tahiti-500 flex items-center justify-center col-span-3 py-2 rounded-md cursor-pointer">
                      <AiOutlineShoppingCart className="text-tahiti-50 text-[20px] mr-4" />
                      <div className="text-white font-bold text-[18px]">
                        Add To Cart
                      </div>
                    </div>
                    <div className="bg-tahiti-500 flex items-center justify-center col-span-3 py-2 rounded-md cursor-pointer">
                      <BsBagCheck className="text-tahiti-50 text-[20px] mr-4" />
                      <div className="text-white font-bold text-[18px]">
                        Buy Now
                      </div>
                    </div>
                    <div className=" border-[3px] flex items-center justify-center col-span-1 py-2 rounded-md cursor-pointer">
                      <BsFillHeartFill className=" text-[20px]" />
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="text-[16px] font-semibold pb-1">
                      Product Code:{" "}
                      <span className="text-[16px] font-light">{data?.Id}</span>
                    </div>
                    <div className="text-[16px] font-semibold pb-1">
                      Approximate Weight:{" "}
                      <span className="text-[16px] font-light">
                        {data?.PhysicalParameters?.Weight} Kg
                      </span>
                    </div>
                    <div className="text-[16px] font-semibold pb-1">
                      Total Sold:{" "}
                      <span className="text-[16px] font-light">1634541</span>
                    </div>
                    <div className="flex">
                      <div className="cursor-pointer">
                        <Image
                          src={"/assets/footer/facebook.svg"}
                          width={30}
                          height={30}
                          alt="logo"
                        />
                      </div>
                      <div className="pl-2 cursor-pointer">
                        <Image
                          src={"/assets/footer/instagram.svg"}
                          width={30}
                          height={30}
                          alt="logo"
                        />
                      </div>
                      <div className="flex items-center justify-center bg-tahiti-500 rounded-2xl px-2 ml-2 text-tahiti-50 cursor-pointer">
                        <MdOutlineContentCopy className="mr-1" />
                        Copy
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {data?.VendorItems.length > 0 ? (
              <div className="mt-2 bg-tahiti-50">
                <div className="py-3 px-3 text-[18px] font-semibold border-b">
                  From The Same Seller
                </div>
                <div className="py-4">
                  <div className="grid grid-cols-5 gap-3 px-4">
                    <ProductCard productList={data?.VendorItems} />
                  </div>
                </div>
              </div>
            ) : null}
            <div className="mt-3 bg-tahiti-50 rounded-sm">
              <div className="py-3 flex gap-3 items-center justify-center">
                <div>
                  <button
                    onClick={() => settabChange(1)}
                    className={`py-3 px-4 border ${tabChange == 1? ' bg-tahiti-500 text-white' :' text-black'} border-tahiti-500 rounded-md text-[18px] font-semibold`}
                  >
                    Specification
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => settabChange(2)}
                    className={`py-3 px-4 border ${tabChange == 2? ' bg-tahiti-500 text-white' :'text-black'} border-tahiti-500 rounded-md text-[18px] font-semibold `}
                  >
                    Description
                  </button>
                </div>
                <div>
                  <button className={`py-3 px-4 border ${tabChange == 3? ' bg-tahiti-500 text-white' :'text-black'} border-tahiti-500 rounded-md text-[18px] font-semibold `}>
                    Seller Info
                  </button>
                </div>
              </div>
              <div className="px-10 py-2">
                {tabChange == 1 ? (
                  <div className="border ">
                    {arr.map((item, index) => (
                      <div key={index} className="grid grid-cols-2 rounded-sm ">
                        <div className="flex items-center justify-center py-2 bg-[#E9EFF0] font-bold border-r">
                          Size
                        </div>
                        <div
                          className={`flex items-center justify-center py-2 px-1 text-center hover:bg-[#EEEEEE] border-b ${
                            index % 2 == 0 ? "bg-[#f8f8f8]" : "bg-tahiti-50"
                          }`}
                        >
                          Black, 480 Ml, 480 Ml, 480 Ml, 480 Ml, Fuchsia, 480
                          Ml, 480 Ml, Black, 550 Ml, 550 Ml, 550 Ml, 550 Ml,
                          Fuchsia, 550 Ml, 550 Ml, Transparent, Black, 480 Ml,
                          Transparent, 480 Ml, Transparent, 480 Ml, Transparent,
                          480 Ml, Transparent, Fuchsia, 480 Ml, Transparent,
                          Coffee, 480 Ml
                        </div>
                      </div>
                    ))}
                  </div>
                ) : tabChange == 2 ? (
                  <div className="" >
                    <div dangerouslySetInnerHTML={{ __html: data?.Description }}></div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="">
            <div className="bg-tahiti-50 py-3 rounded-sm">
              <div className="flex items-center justify-center py-1">
                <FaHome className="text-[40px] text-tahiti-500 flex items-center justify-center" />
              </div>
              <div className="text-[16px] font-semibold text-center">
                {data?.VendorName}
              </div>
              <div className="text-[14px] text-center">卖家商店名称和信息</div>
              <div className=" flex justify-center py-1">
                <div className="bg-tahiti-900 rounded-2xl px-2 text-tahiti-50">
                  Seller Score: {data?.VendorScore}
                </div>
              </div>
              <div className="flex  items-center justify-evenly py-1">
                <div className="text-center">
                  4.9
                  <br />
                  Item
                </div>
                <div className="text-center">
                  4.9
                  <br />
                  Delivery
                </div>
                <div className="text-center">
                  4<br />
                  Service
                </div>
              </div>
              <div className=" flex justify-center py-1">
                <div className="bg-tahiti-500 rounded-2xl px-2 text-tahiti-50 py-1 cursor-pointer">
                  Visit Store
                </div>
              </div>
            </div>

            <div className="bg-tahiti-50 rounded-sm mt-2">
              <Conditions />
            </div>
            <div className="bg-tahiti-50 rounded-sm mt-2">
              <ShippingCharge />
            </div>
            <div className="max-h-[120rem] overflow-y-auto left-side mt-2">
              <div className="bg-tahiti-50 rounded-sm">
                <div className="text-center py-3 text-[16px] font-semibold border-b">
                  Similar Products
                </div>
                <div className="py-4">
                  <div className="grid grid-cols-2 gap-3 px-2">
                    <ProductCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

export async function getServerSideProps(context) {
  let products = await request(
    `product/single-details?productId=${context.query.slug}`
  );

  return {
    props: {
      data: products?.data || null,
    },
  };
}
