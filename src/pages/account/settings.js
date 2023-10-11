import React from "react";
import Image from "next/image";

const Settings = () => {
  return (
    <div className="mt-[65px] min-h-[50rem] p-2">
      <div className="bg-tahiti-50 rounded-md p-3 shadow-sm">
        <div className="text-[16px] font-semibold py-3 border-b">
          Account Settings
        </div>

        <div>
            <div className="py-2 mt-4">
              <Image src='/assets/logo/user.png' width={170} height={170} alt='user'/>
            </div>
          <div className="grid grid-cols-2 gap-5 py-3">
            <div className="col-span-1">
              <div className="py-1">Name</div>
              <input className="border py-2 rounded-sm outline-tahiti-500 w-full px-2" />
            </div>
            <div className="col-span-1">
              <div className="py-1">Phone</div>
              <input className="border py-2 rounded-sm outline-tahiti-500 w-full px-2" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 py-3">
            <div className="col-span-1">
              <div className="py-1">District</div>
              <select className="border h-[42px] rounded-sm outline-tahiti-500 w-full px-2">
                <option>Dhaka</option>
                <option>Dhaka</option>
                <option>Dhaka</option>
              </select>
            </div>
            <div className="col-span-1">
              <div className="py-1">City</div>
              <input className="border py-2 rounded-sm outline-tahiti-500 w-full px-2" />
            </div>
            <div className="col-span-1">
              <div className="py-1">Emergency Number</div>
              <input className="border py-2 rounded-sm outline-tahiti-500 w-full px-2" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 py-3">
            <div className="col-span-1">
              <div className="py-1">City</div>
              <textarea className="border py-2 rounded-sm outline-tahiti-500 w-full px-2" />
            </div>
          </div>
          <div className="flex items-center ">
            <div className="bg-tahiti-500 px-2 py-1 rounded-md text-tahiti-50">Update</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
