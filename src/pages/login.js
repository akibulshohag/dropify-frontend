import React from "react";

const Login = () => {
  return (
    <div className="mt-[65px] xs:mt-[95px] p-2">
      <div className="flex items-center justify-center min-h-[55rem] p-2 bg-tahiti-50 rounded-sm shadow-md">
        <div className="">
          <div className="text-center">
            এখানে আপনার মোবাইল নাম্বার দিয়ে লগিন করুন
          </div>
          <div className="">
            <div className="py-2 text-[18px] font-semibold">মোবাইল নাম্বার</div>
            <div className="grid grid-cols-6">
              <input className="py-2 w-full border px-2 col-span-full rounded-md outline-tahiti-500" placeholder="01xxxxxxxxxxx" />
            </div>
            <div className="grid grid-cols-6 py-3">
              <button className="bg-tahiti-500 col-span-full py-2 text-white rounded-md">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
