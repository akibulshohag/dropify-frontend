import React, { useEffect,useState } from "react";
import Image from "next/image";
import { SubmitHandler, set, useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import request from "@/lib/request";
import { useStatus } from "@/context/contextStatus";
import { setCookie, parseCookies } from "nookies";
import postRequest from "@/lib/postRequest";

const Settings = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const { userPhone, setuserName, userName,setuserPhone } = useStatus();
  const [renderMe, setrenderMe] = useState(false)

  const district = [
    `Dhaka`,
    `Faridpur`,
    `Gazipur`,
    `Gopalganj`,
    `Jamalpur`,
    `Kishoreganj`,
    `Madaripur`,
    `Manikganj`,
    `Munshiganj`,
    `Mymensingh`,
    `Narayanganj`,
    `Narsingdi`,
    `Netrokona`,
    `Rajbari`,
    `Shariatpur`,
    `Sherpur`,
    `Tangail`,
    `Bogra`,
    `Joypurhat`,
    `Naogaon`,
    `Natore`,
    `Nawabganj`,
    `Pabna`,
    `Rajshahi`,
    `Sirajgonj`,
    `Dinajpur`,
    `Gaibandha`,
    `Kurigram`,
    `Lalmonirhat`,
    `Nilphamari`,
    `Panchagarh`,
    `Rangpur`,
    `Thakurgaon`,
    `Barguna`,
    `Barisal`,
    `Bhola`,
    `Jhalokati`,
    `Patuakhali`,
    `Pirojpur`,
    `Bandarban`,
    `Brahmanbaria`,
    `Chandpur`,
    `Chittagong`,
    `Comilla`,
    `Cox's Bazar`,
    `Feni`,
    `Khagrachari`,
    "Lakshmipur",
    "Noakhali",
    "Rangamati",
    "Habiganj",
    "Maulvibazar",
    "Sunamganj",
    "Sylhet",
    "Bagerhat",
    "Chuadanga",
    "Jessore",
    "Jhenaidah",
    "Khulna",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail",
    "Satkhira",
  ];

  useEffect(() => {
    const getUserData = async () => {
      let res = await request("customer/profile-fetch");
      if (res?.success) {
        let encodeName = btoa(res?.data?.name);
        let encodePhone = btoa(res?.data?.phone);
        setValue("name", res?.data?.name);
        setValue("district", res?.data?.district);
        setValue("city", res?.data?.city);
        setValue("address", res?.data?.address);
        setValue("optionalPhone", res?.data?.secondaryPhone);
        setuserName(encodeName);
        setuserPhone(encodePhone)
        setCookie(null, "userName", encodeName, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setCookie(null, "userPhone", encodePhone, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      }
    };
    getUserData();
  }, [renderMe]);

  console.log(userName);

  const onUserUpdateSubmit = async (data) => {
    let payLoad = {
      name: data?.name,
      district:data?.district,
      city: data?.city,
      address: data?.address,
      secondaryPhone: data?.optionalPhone,
    };

    try {
      let res = await postRequest("customer/update-info", payLoad);
      if (res?.success) {
        toast(res?.message);
        setrenderMe(!renderMe)

      }
    } catch (error) {
      toast.warning(error?.message);
    }
  };

  return (
    <div className="mt-[65px] min-h-[50rem] mb-2 p-2 xs:mt-[5px] xms:mt-[5px] xls:mt-[5px] sm:mt-[5px] xs:p-0 xms:p-0 xls:p-0 sm:p-0">
      <div className="bg-tahiti-50 rounded-md p-3 shadow-sm">
        <div className="text-[16px] font-semibold py-3 border-b">
          Account Settings
        </div>

        <form onSubmit={handleSubmit(onUserUpdateSubmit)}>
          <div className="py-2 mt-4">
            <Image
              src="/assets/logo/user.png"
              width={170}
              height={170}
              alt="user"
            />
          </div>
          <div className="grid grid-cols-2 gap-5 py-3 xs:grid-cols-1 xms:grid-cols-1 xls:grid-cols-1">
            <div className="col-span-1">
              <div className="py-1">Name</div>
              <input
                className="border py-2 rounded-sm outline-tahiti-500 w-full px-2"
                {...register("name", { required: true })}
              />
              {errors.name && errors.name.type === "required" && (
                <span className="text-red-300 text-[14px]">
                  This field is required
                </span>
              )}
            </div>
            <div className="col-span-1">
              <div className="py-1">Phone</div>
              <input
                disabled
                defaultValue={atob(userPhone)}
                className="border py-2 rounded-sm outline-tahiti-500 w-full px-2 cursor-not-allowed"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 py-3 xs:grid-cols-1 xms:grid-cols-1 xls:grid-cols-1">
            <div className="col-span-1">
              <div className="py-1">District</div>
              <Controller
                name="district"
                control={control}
                defaultValue=""
                rules={{ required: "District is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="border h-[42px] rounded-sm outline-tahiti-500 w-full px-2"
                  >
                    <option value="">Select District</option>
                    {district.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.district && (
                <span className="text-red-300 text-[14px]">
                  {errors.district.message}
                </span>
              )}
            </div>
            <div className="col-span-1">
              <div className="py-1">City</div>
              <input
                className="border py-2 rounded-sm outline-tahiti-500 w-full px-2"
                {...register("city", { required: true })}
              />
              {errors.city && errors.city.type === "required" && (
                <span className="text-red-300 text-[14px]">
                  This field is required
                </span>
              )}
            </div>
            <div className="col-span-1">
              <div className="py-1">Emergency Number</div>
              <input
                className="border py-2 rounded-sm outline-tahiti-500 w-full px-2"
                {...register("optionalPhone", { required: false })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 py-3">
            <div className="col-span-1">
              <div className="py-1">Address</div>
              <textarea
                className="border py-2 rounded-sm outline-tahiti-500 w-full px-2"
                {...register("address", { required: true })}
              />
              {errors.address && errors.address.type === "required" && (
                <span className="text-red-300 text-[14px]">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center ">
            <button
              type="submit"
              className="bg-tahiti-500 px-2 py-1 rounded-md text-tahiti-50"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
