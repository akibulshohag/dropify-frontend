import React, { useEffect, useState } from "react";
import Image from "next/image";
import request from "@/lib/request";
import { useRouter } from "next/router";
import { useStatus } from "@/context/contextStatus";

const OrderDetails = () => {
  const router = useRouter();
  const {userPhone,userName} = useStatus()
  const [orderDetails, setorderDetails] = useState(null);

  const { orderId } = router.query;

  useEffect(() => {
    const getOrderDetails = async () => {
      let res = await request(`order/detail?orderId=${orderId}`);
      if (res?.success) {
        setorderDetails(res?.data);
      }
    };
    getOrderDetails();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col mt-[65px] xs:mt-[99px] xms:mt-[99px] xls:mt-[99px] sm:mt-[99px] ">
      <div className="p-2">
        <div className="grid grid-cols-6 gap-2 xs:grid-cols-1 xs:gap-0 xms:grid-cols-1 xms:gap-0 xls:grid-cols-1 xls:gap-0 sm:grid-cols-1 sm:gap-0 md:grid-cols-1 md:gap-0">
          <div className="col-span-4 ">
            <div className="bg-tahiti-50">
              <div className="font-serifs font-semibold py-4 px-4 border-b">
                ORDER #SKY17831
              </div>
              <div className="py-4 px-4">
                <table>
                  <tbody>
                    <tr>
                      <td className="px-2 py-2 font-semibold text-[14px]">
                        Status
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex">
                          <div className="bg-red-500 text-white text-[13px] px-2 py-1 rounded-sm flex items-center justify-center">
                            {orderDetails?.status}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 font-semibold text-[14px]">
                        Name
                      </td>
                      <td className="px-2 py-2 text-[14px]">{atob(userName)}</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 font-semibold text-[14px]">
                        Phone
                      </td>
                      <td className="px-2 py-2 font-serifs text-[14px]">
                        {atob(userPhone)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 font-semibold text-[14px]">
                        Email
                      </td>
                      <td className="px-2 py-2 font-serifs"></td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 font-semibold text-[14px]">
                        Delivery Address
                      </td>
                      <td className="px-2 py-2 font-serifs text-[14px]">{orderDetails?.deliveryAddress}</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 font-semibold text-[14px]">
                        Delivery method
                      </td>
                      <td className="px-2 py-2 font-serifs text-[14px]"></td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 font-semibold text-[14px]">
                        Advance Payment
                      </td>
                      <td className="px-2 py-2 font-serifs text-[14px]">70%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-2 bg-tahiti-50">
              <div className="font-serifs font-semibold py-4 px-4 border-b">
                PRODUCT & FEES
              </div>
              {orderDetails?.details.map((item, index) => (
                <div key={index} className=" rounded-md mb-2">
                  <div className="border-b py-2">
                    <div className="py-2 px-4 flex items-center justify-between pb-3">
                      <div className="flex items-center gap-4">
                        <div>
                          <Image
                            src={item?.MainPictureUrl}
                            width={60}
                            height={60}
                            alt="cart"
                          />
                        </div>
                        <div>
                          {/* <div className="text-[14px] font-semibold">
                        Order ID: #6527XX
                      </div> */}
                          <div>{item?.Title}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {item?.selected.map((items, indexx) => (
                    <div key={indexx} className="border-b">
                      <div className="px-4  py-3 grid grid-cols-4 xs:grid-cols-5 xs:px-2 xms:grid-cols-5 xms:px-2 xls:grid-cols-5 xls:px-2">
                        <div className="flex items-center gap-3 col-span-2 xs:col-span-3 xms:col-span-3 xls:col-span-3">
                          {items?.MiniImageUrl && (
                            <div>
                              <Image
                                src={items?.MiniImageUrl}
                                width={35}
                                height={35}
                                alt="cart"
                              />
                            </div>
                          )}
                          <div className="">
                            {items?.key1 && (
                              <div className="text-[14px] xs:text-[12px] xms:text-[12px] xls:text-[12px]">
                                {items?.key1}: {items?.value1}
                              </div>
                            )}
                            {items?.key2 && (
                              <div className="text-[14px]  xs:text-[12px] xms:text-[12px] xls:text-[12px]">
                                {items?.key2}: {items?.value2}
                              </div>
                            )}
                            {items?.key1 || items?.key2 ? null : (
                              <div className="text-[14px] text-red-500  xs:text-[12px] xms:text-[12px] xls:text-[12px]">
                                No Variation
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-[14px] col-span-1 font-serifs flex items-center xs:text-[12px] xms:text-[12px] xls:text-[12px]">
                          <span className="font-serifs ">{items?.qty} x </span>
                          <span className="font-serifs ">
                            {" "}
                            ৳ {items?.unitPrice}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 col-span-1 justify-end xs:text-[12px] xms:text-[12px] xls:text-[12px]">
                          <div className="h-[20px] font-serifs">
                            ৳ {items?.qty * items?.unitPrice}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div>
                    <div className="px-4  py-3 grid grid-cols-4 xs:grid-cols-5 xs:px-2 xms:grid-cols-5 xms:px-2 xls:grid-cols-5 xls:px-2">
                      <div className="flex items-center gap-3 col-span-2 xs:col-span-3 xms:col-span-3 xls:col-span-3">
                        <div>Item details</div>
                      </div>
                      <div className="text-[14px] font-serifs col-span-1 flex items-center">
                        <span>{item?.totalQty} Items</span>
                      </div>
                      <div className="col-span-1 font-serifs flex items-center justify-end">
                        ৳ {item?.totalPrice}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="px-4  py-3 border-t mt-4 grid grid-cols-4 xs:grid-cols-5 xs:px-2 xms:grid-cols-5 xms:px-2 xls:grid-cols-5 xls:px-2">
                <div className="flex items-center gap-3 col-span-2 xs:col-span-3 xms:col-span-3 xls:col-span-3">
                  <div></div>
                </div>
                <div className="text-[14px] font-serifs font-semibold col-span-1 flex items-center">
                  <span>Total Price</span>
                </div>
                <div className="col-span-1 font-serifs flex items-center justify-end">
                  ৳ {orderDetails?.total}
                </div>
              </div>
              <div className="px-4  py-1 grid grid-cols-4 xs:grid-cols-5 xs:px-2 xms:grid-cols-5 xms:px-2 xls:grid-cols-5 xls:px-2">
                <div className="flex items-center gap-3 col-span-2 xs:col-span-3 xms:col-span-3 xls:col-span-3">
                  <div></div>
                </div>
                <div className="text-[14px] font-serifs font-semibold col-span-1 flex items-center">
                  <span>Deposited Amount</span>
                </div>
                <div className="col-span-1 font-serifs flex items-center justify-end">
                  ৳ {orderDetails?.deposit}
                </div>
              </div>
              <div className="px-4  py-2 border-t  grid grid-cols-4 xs:grid-cols-5 xs:px-2 xms:grid-cols-5 xms:px-2 xls:grid-cols-5 xls:px-2">
                <div className="flex items-center gap-3 col-span-2 xs:col-span-3 xms:col-span-3 xls:col-span-3">
                  <div></div>
                </div>
                <div className="text-[14px] font-serifs font-semibold col-span-1 flex items-center">
                  <span>Due Amount</span>
                </div>
                <div className="col-span-1 font-serifs flex items-center justify-end">
                  ৳ {orderDetails?.due} + Shipping Charge
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
