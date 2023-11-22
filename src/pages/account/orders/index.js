import request from "@/lib/request";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const router = useRouter()
  const [orderList, setorderList] = useState([]);
  const [renderMe, setrenderMe] = useState(false);
  const [selectedId, setselectedId] = useState([]);

  useEffect(() => {
    const orderList = async () => {
      let res = await request("order/list");
      if (res?.success) {
        if (res?.data.length > 0) {
          let value = res?.data?.map((item) => {
            return { ...item, isChecked: false };
          });
          setorderList(value);
        }
      }
    };
    orderList();
  }, []);

  const CheckBox = async (index) => {
    let arr = orderList;
    arr[index].isChecked
      ? (arr[index]["isChecked"] = false)
      : (arr[index]["isChecked"] = true);
    setorderList(arr);
    setrenderMe(!renderMe);
    const checkedProducts = arr.filter((product) => product.isChecked);
    let value1 = checkedProducts.map((item) => {
      return item?.orderId;
    });
    setselectedId(value1);
  };


  const gotoPayment=()=>{
    const queryString = selectedId.join('DABCZXY');
    router.push(`/payment/${queryString}`)
  }

  return (
    <div className="mt-[65px] min-h-[50rem] xs:mt-[99px] xms:mt-[99px] xls:mt-[99px] sm:mt-[99px]">
      <div className="p-2">
        <div className="bg-tahiti-50 rounded-sm">
          {orderList.length > 0 ? (
            <>
              <div className="flex items-center justify-between px-3 py-3 font-serifs">
                <div>MY Orders</div>
                <div>19 November, 2023</div>
              </div>
              <div className="flex items-center justify-between px-3 py-3 mt-1">
                <div className="flex items-center">
                  <div className="">
                    <input
                      className="h-[40px] outline-none border-[2px] border-tahiti-500 px-2 rounded-tl-md rounded-bl-md"
                      placeholder="Order Id"
                    />
                  </div>
                  <div className="bg-tahiti-500 h-[40px] px-3 flex items-center justify-center text-white cursor-pointer rounded-br-md rounded-tr-md">
                    Search
                  </div>
                </div>
                {selectedId?.length > 0 && (
                  <div onClick={()=>gotoPayment()} className="bg-tahiti-500 h-[40px] flex items-center text-[12px] justify-center text-white cursor-pointer rounded-md px-3">
                    Pay Selected Orders
                  </div>
                )}
              </div>
              <div>
                <div className="grid grid-cols-7 py-4 bg-[#e8ebe8]">
                  <div className=" col-span-1 font-semibold text-[13px] pl-3">
                    Order Id
                  </div>
                  <div className=" col-span-1 font-semibold text-[13px]">
                    Date
                  </div>
                  <div className=" col-span-1 font-semibold text-[13px]">
                    Total
                  </div>
                  <div className=" col-span-1 font-semibold text-[13px]">
                    Deposit
                  </div>
                  <div className=" col-span-1 font-semibold text-[13px]">
                    Due
                  </div>
                  <div className=" col-span-1 font-semibold text-[13px]">
                    Status
                  </div>
                  <div className=" col-span-1 font-semibold text-[13px]">
                    Action
                  </div>
                </div>
                {orderList?.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-7 py-5 bg-[#ffffff] border-b"
                  >
                    <div className="flex items-center gap-3 col-span-1 font-semibold text-[13px] pl-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={item?.isChecked}
                          onChange={() => CheckBox(index)}
                        />
                      </div>
                      <div className="font-serifs">#{item?.orderId}</div>
                    </div>
                    <div className=" col-span-1 font-serifs text-[13px]">
                      Date
                    </div>
                    <div className=" col-span-1 font-serifs text-[13px]">
                      {item?.total}
                    </div>
                    <div className=" col-span-1 font-serifs  text-[13px]">
                      {item?.deposit}
                    </div>
                    <div className=" col-span-1 font-serifs text-[13px]">
                      {item?.due}
                    </div>
                    <div className="col-span-1 flex">
                      <div className="  text-[13px] bg-[#535353] text-white py-1 px-2 rounded-sm">
                        {item?.status}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 col-span-1  text-[13px]">
                      <div onClick={()=>router.push(`/account/orders/${item?.orderId}`)} className=" text-[13px] bg-tahiti-500 text-white py-1 px-3 rounded-sm cursor-pointer">
                        View
                      </div>
                      <div onClick={()=>router.push(`/payment/${item?.orderId}`)} className=" text-[13px] bg-tahiti-500 text-white py-1 px-3 rounded-sm cursor-pointer">
                        Pay
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="py-4 flex items-center justify-center">
              No Order yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
