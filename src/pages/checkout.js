import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "react-modal";
import { HiPlus, HiMinus } from "react-icons/hi";
import Condition from "@/components/productDetails/condition";
import ShippingCharge from "@/components/productDetails/ShippingCharge";
import { useRouter } from "next/router";
import request from "@/lib/request";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import { useStatus } from "@/context/contextStatus";
import { toast } from "react-toastify";
import postRequest from "@/lib/postRequest";
import { setCookie, parseCookies } from "nookies";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 5,
    border: "none,",
    padding: "0px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const Checkout = () => {
  let subtitle;
  const router = useRouter();
  const { userPhone,setrefreshApi,refreshApi ,setuserName,offerCampaign} = useStatus();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);
  const [cartList, setcartList] = useState([]);
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [name, setname] = useState("");
  const [district, setdistrict] = useState("");
  const [city, setcity] = useState("");
  const [address, setaddress] = useState("");
  const [optionalPhone, setoptionalPhone] = useState("");
  const [orderNote, setorderNote] = useState("");
  const [deleiveryMethod, setdeleiveryMethod] = useState("");
  const key = router?.query?.key;


  const districtList = [
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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeModal1() {
    setmodalOpen(false);
  }

  useEffect(() => {
    const getCartItems = async () => {
      let res = await request(`customer/checkout/fetch?key=${key}`);
      if (res?.success) {
        if (res?.data.length > 0) {
          setcartList(res?.data);
          let total = res?.data?.reduce((a, b) => a + b?.totalPrice, 0);
          settotalCartPrice(total);
        }
      }
    };
    getCartItems();
  }, [router]);

  useEffect(() => {
    const getUserData = async () => {
      let res = await request("customer/profile-fetch");
      if (res?.success) {
        setname(res?.data?.name);
        setdistrict(res?.data?.district);
        setaddress(res?.data?.address);
        setcity(res?.data?.city);
        setoptionalPhone(res?.data?.secondaryPhone);
      }
    };
    getUserData();
  }, []);

  const confirmOrder = async () => {
    if (name && district && city && address) {
      let value1 = cartList.map((item) => {
        return item?.cartId 
      });
  
      let data = {
        name: name,
        district: district,
        city: city,
        address:address,
        secondaryPhone:optionalPhone,
        cartIds: value1,
        price: totalCartPrice,
        note:orderNote
      };

      let res = await postRequest(`order/place-order`,data);
      if(res?.success){
        closeModal()
        setrefreshApi(!refreshApi)
        let encodeName = btoa(res?.data?.userName);
        setuserName(encodeName)
        setCookie(null, "userName", encodeName, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        const queryString = res?.data?.orderId.join('DABCZXY');
        router.push(`payment/${queryString}`)
      
      }


    }else{
      toast.warning("All field required");
    }

    

  };


  return (
    <div className="flex min-h-screen flex-col mt-[65px] xs:mt-[108px] xms:mt-[108px] xls:mt-[108px] sm:mt-[108px]">
      <div className="p-2 xs:p-0 xms:p-0 xls:p-0 sm:p-0">
        <div className="bg-tahiti-50 py-4 px-3 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <div className=" flex items-center justify-center">
              <FiShoppingCart className="text-[18px]" />
            </div>
            <div className="text-[18px]  pl-2 font-serifs font-medium">
              CHECKOUT
            </div>
          </div>
          <div>15 October, 2023</div>
        </div>

        <div className="mt-2 grid grid-cols-6 gap-2 xs:grid-cols-1 xs:gap-0 xms:grid-cols-1 xms:gap-0 xls:grid-cols-1 xls:gap-0 sm:grid-cols-1 sm:gap-0 md:grid-cols-1 md:gap-0">
          <div className="col-span-4">
            <div className="bg-tahiti-50 rounded-md mb-2 py-3 px-3">
              <div>
                <div className="grid grid-cols-2 gap-5 py-3 xs:grid-cols-1 xms:grid-cols-1 xls:grid-cols-1">
                  <div className="col-span-1">
                    <div className="py-1">
                      Name <span className="text-red-600"> *</span>
                    </div>
                    <input
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      className="border py-2 rounded-sm outline-tahiti-500 w-full px-2"
                    />
                  </div>
                  <div className="col-span-1">
                    <div className="py-1">
                      Contact Number <span className="text-red-600"> *</span>
                    </div>
                    <input
                      disabled
                      defaultValue={atob(userPhone)}
                      className="border py-2 rounded-sm outline-tahiti-500 w-full px-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 py-3 xs:grid-cols-1 xms:grid-cols-1 xls:grid-cols-1">
                  <div className="col-span-1">
                    <div className="py-1">Emergency Phone (optional)</div>
                    <input
                      value={optionalPhone}
                      onChange={(e) => setoptionalPhone(e.target.value)}
                      className="border py-2 rounded-sm outline-tahiti-500 w-full px-2"
                    />
                  </div>
                  <div className="col-span-1">
                    <div className="py-1">
                      District <span className="text-red-600"> *</span>
                    </div>
                    <select
                      value={district}
                      onChange={(e) => setdistrict(e.target.value)}
                      className="border h-[42px] rounded-sm outline-tahiti-500 w-full px-2"
                    >
                      <option value="">Select District</option>
                      {districtList.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 py-3 xs:grid-cols-1 xms:grid-cols-1 xls:grid-cols-1">
                  <div className="col-span-1">
                    <div className="py-1">
                      City / Upazila <span className="text-red-600"> *</span>
                    </div>
                    <input
                      value={city}
                      onChange={(e) => setcity(e.target.value)}
                      className="border py-2 rounded-sm outline-tahiti-500 w-full px-2"
                    />
                  </div>
                  <div className="col-span-1">
                    <div className="py-1">
                      Address <span className="text-red-600"> *</span>
                    </div>
                    <input
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                      className="border py-2 rounded-sm outline-tahiti-500 w-full px-2"
                    />
                  </div>
                </div>
                {/* <div className="grid grid-cols-1 gap-5 py-3">
                  <div className="col-span-1">
                    <div className="py-1">
                      Delivery Method <span className="text-red-600"> *</span>
                    </div>
                    <select value={deleiveryMethod} onChange={(e)=>setdeleiveryMethod(e.target.value)}className="border h-[42px] rounded-sm outline-tahiti-500 w-full px-2">
                      <option value={'officeCollection'}>Office Collection</option>
                      <option value={'redx'}>RedX</option>
                    </select>
                  </div>
                </div> */}
                <div className="grid grid-cols-1 gap-5 py-3">
                  <div className="col-span-1">
                    <div className="py-1">
                      Order Note{" "}
                      <span className="text-tahiti-700">
                        (Please leave a note, if you have any special
                        instruction about your order.)
                      </span>
                    </div>
                    <textarea
                      value={orderNote}
                      onChange={(e) => setorderNote(e.target.value)}
                      className="border py-2 rounded-sm outline-tahiti-500 w-full px-2"
                    />
                  </div>
                </div>
              </div>
            </div>
            {cartList?.length > 0 &&
              cartList?.map((item, index) => (
                <div key={index} className="bg-tahiti-50 rounded-md mb-2">
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
          </div>
          <div className="col-span-2 xs:mb-2 xms:mb-2 xls:mb-2 sm:mb-2">
            <div className="bg-tahiti-50 rounded-md">
              <div className="px-3">
                <div className="flex items-center justify-between py-2">
                  <div>Product Price</div>
                  <div className="font-semibold font-serifs">
                    ৳ {totalCartPrice}
                  </div>
                </div>
                {offerCampaign?.isValid &&
                <div className="flex items-center justify-between py-2">
                  <div>{offerCampaign?.name} {offerCampaign?.percent}%</div>
                  <div className="font-semibold font-serifs ">
                    -৳ {Math.floor(totalCartPrice*offerCampaign?.percent/100)}
                  </div>
                </div>
                 }
                {offerCampaign?.isValid &&
                <div className="flex items-center justify-between py-2">
                  <div>Fianl Price</div>
                  <div className="font-semibold font-serifs ">
                    ৳ {Math.floor(totalCartPrice- (totalCartPrice*offerCampaign?.percent/100))}
                  </div>
                </div>
                 }
              </div>
              <div className="px-3 py-2">
                <div className="bg-tahiti-300 flex items-center justify-center py-3 rounded-md">
                  <div className="">
                    <div className="text-[18px] font-semibold text-center font-serifs">
                      70% Payment -৳ {offerCampaign?.isValid ? Math.ceil(totalCartPrice*70/100 - (totalCartPrice*70/100)*offerCampaign?.percent/100) : Math.ceil((totalCartPrice * 70) / 100)}
                    </div>
                    <div
                      onClick={() => setmodalOpen(true)}
                      className="text-[16px] text-center font-serifs flex items-center cursor-pointer"
                    >
                      <div>
                        Pay on Delivery ৳{" "}
                        {offerCampaign?.isValid ? Math.floor((totalCartPrice -(totalCartPrice*70/100)) - (totalCartPrice -(totalCartPrice*70/100))*offerCampaign?.percent/100 ): Math.ceil(
                          totalCartPrice - (totalCartPrice * 70) / 100
                        )}{" "}
                        + Shipping & Courier Charges
                      </div>
                      <div>
                        <HiOutlineInformationCircle className="ml-2 text-[18px]" />
                      </div>
                    </div>
                    <div className="flex mt-4 sm:hidden xls:hidden xms:hidden xs:hidden">
                      <div className="w-full">
                        <input
                          type="text"
                          className="rounded-l-md h-10 w-full  px-3 bg-gray-200 outline-none placeholder:text-sm placeholder:text-gray-400"
                          placeholder="If you have a Promo Code, Enter Here..."
                          //   onChange={(event) => handleChange(event.target.value)}
                        />
                      </div>
                      <div
                      //    onClick={() => handlePromo()}
                      >
                        <button className="bg-tahiti-500 px-4 h-10 text-white font-semibold tracking-wide text-sm rounded-tr-md rounded-br-md">
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => setIsOpen(true)}
              className="bg-tahiti-500 py-2 mt-2 rounded-md flex items-center justify-center text-tahiti-50 text-[16px] font-serifs font-medium cursor-pointer"
            >
              Place Order & Pay
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className=" max-w-[600px] max-h-[600px] overflow-y-auto left-side  xs:max-w-[300px] xs:max-h-[400px] xms:max-w-[310px] xms:max-h-[400px] xls:max-w-[370px] xls:max-h-[400px] sm:max-h-[500px]">
          <div className="relative overflow-y-auto left-side">
            <div className="border-b">
              <Condition />
            </div>
            <div className="mb-10">
              <ShippingCharge />
            </div>
            <div className="fixed bottom-0 w-full bg-white border-t">
              <div className="pb-2 px-2">
                <div className="flex items-center justify-between mt-2 gap-3">
                  <div
                    onClick={() => setIsOpen(false)}
                    className="bg-red-700 text-tahiti-50 text-[14px] py-2 px-4 rounded-md cursor-pointer"
                  >
                    Deney
                  </div>
                  <div onClick={() => confirmOrder()}className="bg-tahiti-500 text-tahiti-50 text-[14px] py-2 px-4 rounded-md flex items-center justify-center w-full cursor-pointer">
                    Accept & Place Order
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal1}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className=" w-[450px] max-w-[600px] max-h-[600px] overflow-y-auto left-side  xs:max-w-[300px] xs:max-h-[400px] xms:max-w-[310px] xms:max-h-[400px] xls:max-w-[370px] xls:max-h-[400px] sm:max-h-[500px]">
          <div className="px-3 py-3 border-b font-medium">
            Delivery & Courier Charges
          </div>
          <div>
            <div className="py-3 px-3">
              <div className="flex pb-2">
                <BsDot className="text-[20px]" />
                <span className="text-[14px] pl-1 text-justify w-[94%] font-medium">
                  Delivery Charge: ৳ 650 / 850 Per Kg <br />{" "}
                  <span className="text-[12px] text-red-500">
                    পণ্য বাংলাদেশে আসার পর পণ্যের ক্যাটাগরীর উপর নির্ভর করে
                    চূড়ান্ত শিপিং চার্জ নির্ধারণ করা হবে।
                  </span>
                </span>
              </div>
              <div className="flex pb-2">
                <BsDot className="text-[20px]" />
                <span className="text-[14px] pl-1 text-justify w-[94%] font-medium">
                  China Courier Charge.
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-end px-3 py-2">
            <div
              onClick={() => setmodalOpen(false)}
              className="bg-tahiti-500 text-tahiti-50 text-[14px] py-2 px-4 rounded-md cursor-pointer"
            >
              Ok
            </div>
          </div>

          {/* <div className="relative overflow-y-auto left-side">
            <div className="border-b">Delivery & Courier Charges</div>
            <div className="fixed bottom-0 w-full bg-white border-t">
              <div className="pb-2 px-2">
                <div className="flex items-center justify-between mt-2 gap-3">
                  <div
                    onClick={() => setIsOpen(false)}
                    className="bg-red-700 text-tahiti-50 text-[14px] py-2 px-4 rounded-md cursor-pointer"
                  >
                    Deney
                  </div>
                  <div className="bg-tahiti-500 text-tahiti-50 text-[14px] py-2 px-4 rounded-md flex items-center justify-center w-full cursor-pointer">
                    Accept & Place Order
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </Modal>
    </div>
  );
};

export default Checkout;
