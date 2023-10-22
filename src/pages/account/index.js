import React from "react";
import Image from "next/image";

const Account = () => {
  return (
    <div className="mt-[65px] min-h-[40rem] xs:mt-[5px] xms:mt-[5px] xls:mt-[5px] sm:mt-[5px]">
      <div className="p-2 xs:p-0 xms:p-0 xls:p-0 sm:p-0">
        <div className="grid grid-cols-4 gap-2 xs:grid-cols-3 xms:grid-cols-3 xls:grid-cols-3 sm:grid-cols-3">
          <div className="col-span-3 bg-tahiti-50 rounded-sm">
            <div className="border-b py-3 px-3">
              <div className="text-[16px] font-semibold">Dashboard</div>
              <div className="text-[14px]">Order Statistics</div>
            </div>
            <div className="px-3 py-3">
              <div className="grid grid-cols-4 gap-5 xs:grid-cols-2 xms:grid-cols-2 xls:grid-cols-2">
                <div className="col-span-1 bg-[#DBDFEA] p-3 rounded-md">
                  <div className="">
                    <Image
                      src="/assets/account/pending.png"
                      width={70}
                      height={70}
                      alt="Pending"
                    />
                  </div>
                  <div className="pt-2">
                    <div className="text-[20px] font-bold">0</div>
                    <div className="text-[16px] font-medium">Pending</div>
                  </div>
                </div>
                <div className="col-span-1 bg-[#E5F9DB] p-3 rounded-md">
                  <div className="">
                    <Image
                      src="/assets/account/processing.png"
                      width={70}
                      height={70}
                      alt="Pending"
                    />
                  </div>
                  <div className="pt-2">
                    <div className="text-[20px] font-bold">0</div>
                    <div className="text-[16px] font-medium">Processing</div>
                  </div>
                </div>
                <div className="col-span-1 bg-[#FFF7D4] p-3 rounded-md">
                  <div className="">
                    <Image
                      src="/assets/account/completed.png"
                      width={70}
                      height={70}
                      alt="Pending"
                    />
                  </div>
                  <div className="pt-2">
                    <div className="text-[20px] font-bold">0</div>
                    <div className="text-[16px] font-medium">Completed</div>
                  </div>
                </div>
                <div className="col-span-1 bg-[#F5EAEA] p-3 rounded-md">
                  <div className="">
                    <Image
                      src="/assets/account/Cancelled.png"
                      width={70}
                      height={70}
                      alt="Pending"
                    />
                  </div>
                  <div className="pt-2">
                    <div className="text-[20px] font-bold">0</div>
                    <div className="text-[16px] font-medium">Cancelled</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Account;
