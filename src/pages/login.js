import postRequest from "@/lib/postRequest";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { setCookie,parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useStatus } from "@/context/contextStatus";


const Login = () => {
  const router = useRouter()
  const{ setToken,setrefreshApi,refreshApi} = useStatus()
  const [phone, setphone] = useState("");
  const [otp, setotp] = useState("");
  const [isOtp, setisOtp] = useState(false);


  const submitOtp =async ()=>{
    var phoneno ='/^[0-9]{11}$/';
     if(!phone){
      toast.warning('Phone no required') 
      return;
     }
     let data ={
      phone:phone
     }
     let res =await postRequest('customer/login-step1',data)
     if(res?.success){
      toast(res?.message)
      setisOtp(true)
     }else{
      toast.warning('Server Error') 
     }
  }
  const submitLogin =async ()=>{
    var phoneno ='/^[0-9]{11}$/';
     if(!phone){
      toast.warning('Phone no is required') 
      return;
     }
     
     if(!otp){
      toast.warning('Otp is required') 
      return;
     }

     let data ={
      phone:phone,
      otp:otp
     }
     let res =await postRequest('customer/login-step2',data)
     if(res?.success){

      console.log('.....res',res);
      toast(res?.message)
      setToken(res?.data)
      setCookie(null, "dropToken", res?.data, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setrefreshApi(!refreshApi)
      router.push('/account')
     }else{
      toast.warning(res?.message) 
     }
  }

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
              <input
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                className="py-2 w-full border px-2 col-span-full rounded-md outline-tahiti-500"
                placeholder="01xxxxxxxxxxx"
              />
            </div>
            {isOtp && (
              <div className="grid grid-cols-6 mt-3">
                <input
                  value={otp}
                  onChange={(e) => setotp(e.target.value)}
                  className="py-2 w-full border px-2 col-span-full rounded-md outline-tahiti-500"
                  placeholder="xxxx"
                />
              </div>
            )}
            <div className="grid grid-cols-6 py-3">
              <button onClick={()=> isOtp ? submitLogin(): submitOtp()} className="bg-tahiti-500 col-span-full py-2 text-white rounded-md">
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
