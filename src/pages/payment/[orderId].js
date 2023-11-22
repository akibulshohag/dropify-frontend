import React, { useEffect, useState } from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import Image from "next/image";
import { useRouter } from "next/router";
import postRequest from "@/lib/postRequest";

const PaymentList = () => {
  const router = useRouter();
  const { orderId } = router?.query;

  const orderIds = orderId ? orderId.split("DABCZXY") : [];
  const [paymentInfoList, setpaymentInfoList] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);

  useEffect(() => {
    const getPaymentInfo = async () => {
      let data = {
        orderId: orderIds,
      };
      let res = await postRequest("customer/payment-info", data);
      if (res?.success) {
        setpaymentInfoList(res?.data);
        let total = res?.data?.reduce((a, b) => a + b?.price, 0);
        settotalPrice(total);
      }
    };
    getPaymentInfo();
  }, [router]);

  return (
    <div className="mt-[65px] min-h-[40rem] xs:mt-[5px] xms:mt-[5px] xls:mt-[5px] sm:mt-[5px]">
      <div className="p-2">
        <div className="bg-tahiti-50 py-4 px-3 rounded-md flex items-center justify-between">
          <div className="text-[18px] font-semibold ">PAYMENT</div>
          <div>15 October, 2023</div>
        </div>

        <div className="grid grid-cols-5 gap-2 mt-2 xs:grid-cols-3 xms:grid-cols-3 xls:grid-cols-3 sm:grid-cols-3">
          <div className="col-span-3">
            <div className=" bg-tahiti-50 rounded-md p-2 ">
              <div className="border rounded-md">
                <div className="grid grid-cols-5 py-2 bg-[#EEEEEE]">
                  <div className="flex items-center justify-center col-span-1 font-semibold text-[13px]">
                    Order Id
                  </div>
                  <div className="flex items-center justify-center col-span-1 font-semibold text-[13px]">
                    Subtotal
                  </div>
                  <div className="flex items-center justify-center col-span-1 font-semibold text-[13px]">
                    Discount
                  </div>
                  <div className="flex items-center justify-center col-span-1 font-semibold text-[13px]">
                    Percentage
                  </div>
                  <div className="flex items-center justify-center col-span-1 font-semibold text-[13px]">
                    Payable
                  </div>
                </div>
                {paymentInfoList?.length > 0 &&
                  paymentInfoList.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-5  bg-tahiti-50 rounded-md border-b hover:bg-[#EEEEEE]"
                    >
                      <div className="flex items-center justify-center font-serifs col-span-1 font-semibold text-[13px] text-tahiti-500 border-r py-2">
                        #{item?.orderId}
                      </div>
                      <div className="flex items-center justify-center font-serifs col-span-1 font-semibold text-[13px] border-r py-2">
                        {item?.price}
                      </div>
                      <div className="flex items-center justify-center font-serifs col-span-1 font-semibold text-[13px] border-r py-2">
                        0
                      </div>
                      <div className="flex items-center justify-center font-serifs col-span-1 font-semibold text-[13px] border-r py-2">
                        70%
                      </div>
                      <div className="flex items-center justify-center font-serifs col-span-1 font-semibold text-[13px]  py-2">
                        {(item?.price * 70) / 100}
                      </div>
                    </div>
                  ))}
                <div className="grid grid-cols-5  bg-tahiti-50 rounded-md border-b hover:bg-[#EEEEEE]">
                  <div className="flex items-center justify-center col-span-1 font-semibold text-[13px] border-r py-2"></div>
                  <div className="flex items-center justify-center col-span-1 font-semibold text-[13px] border-r py-2"></div>
                  <div className="flex items-center justify-center col-span-1 font-semibold text-[13px] border-r py-2"></div>
                  <div className="flex items-center justify-center col-span-1 font-semibold text-[13px] border-r py-2"></div>
                  <div className="flex items-center justify-center font-serifs col-span-1 font-semibold text-[13px]  py-2">
                    {(totalPrice * 70) / 100}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className=" bg-tahiti-50 rounded-md p-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1 border flex items-center py-3 px-2">
                  <div>
                    <RiCheckboxCircleFill className="text-[25px] mr-3" />
                  </div>
                  <div className="">
                    <div className="">
                      <Image
                        src={"/assets/payment/bkash.svg"}
                        width={90}
                        height={70}
                        alt="bkash"
                      />
                    </div>
                    <span>Bkash Payment</span>
                  </div>
                </div>

                <div className="col-span-1 border flex items-center py-3 px-2">
                  <div>
                    <RiCheckboxCircleFill className="text-[25px] mr-3" />
                  </div>
                  <div className="">
                    <div className="py-1">
                      <Image
                        src={"/assets/payment/nagad.svg"}
                        width={90}
                        height={70}
                        alt="bkash"
                      />
                    </div>
                    <span>Nagad Payment</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-tahiti-500 py-2 rounded-md flex items-center justify-center">
                <div className="text-tahiti-50 mr-2 font-semibold">PAY</div>
                <div className="bg-tahiti-50 font-serifs rounded-3xl py-[2px] px-2 text-[13px]">
                  ৳ {(totalPrice * 70) / 100}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
