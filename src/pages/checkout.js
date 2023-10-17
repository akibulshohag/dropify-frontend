import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "react-modal";
import { HiPlus, HiMinus } from "react-icons/hi";
import Condition from "@/components/productDetails/condition";
import ShippingCharge from "@/components/productDetails/ShippingCharge";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 0,
    border: "none,",
    padding: "0px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const Checkout = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="flex min-h-screen flex-col mt-[65px] xs:mt-[95px]">
      <div className="p-2">
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

        <div className="mt-2 grid grid-cols-6 gap-2">
          <div className="col-span-4">
            <div className="bg-tahiti-50 rounded-md mb-2 py-3 px-3">
              <div>
                <div className="grid grid-cols-2 gap-5 py-3">
                  <div className="col-span-1">
                    <div className="py-1">
                      Name <span className="text-red-600"> *</span>
                    </div>
                    <input className="border py-2 rounded-sm outline-tahiti-500 w-full px-2" />
                  </div>
                  <div className="col-span-1">
                    <div className="py-1">
                      Contact Number <span className="text-red-600"> *</span>
                    </div>
                    <input
                      disabled
                      className="border py-2 rounded-sm outline-tahiti-500 w-full px-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 py-3">
                  <div className="col-span-1">
                    <div className="py-1">Emergency Phone (optional)</div>
                    <input className="border py-2 rounded-sm outline-tahiti-500 w-full px-2" />
                  </div>
                  <div className="col-span-1">
                    <div className="py-1">
                      District <span className="text-red-600"> *</span>
                    </div>
                    <select className="border h-[42px] rounded-sm outline-tahiti-500 w-full px-2">
                      <option>Dhaka</option>
                      <option>Dhaka</option>
                      <option>Dhaka</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 py-3">
                  <div className="col-span-1">
                    <div className="py-1">
                      City / Upazila <span className="text-red-600"> *</span>
                    </div>
                    <input className="border py-2 rounded-sm outline-tahiti-500 w-full px-2" />
                  </div>
                  <div className="col-span-1">
                    <div className="py-1">
                      Address <span className="text-red-600"> *</span>
                    </div>
                    <input className="border py-2 rounded-sm outline-tahiti-500 w-full px-2" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 py-3">
                  <div className="col-span-1">
                    <div className="py-1">
                      Delivery Method <span className="text-red-600"> *</span>
                    </div>
                    <select className="border h-[42px] rounded-sm outline-tahiti-500 w-full px-2">
                      <option>Office Collection</option>
                      <option>RedX</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 py-3">
                  <div className="col-span-1">
                    <div className="py-1">
                      Order Note{" "}
                      <span className="text-tahiti-700">
                        (Please leave a note, if you have any special
                        instruction about your order.)
                      </span>
                    </div>
                    <textarea className="border py-2 rounded-sm outline-tahiti-500 w-full px-2" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-tahiti-50 rounded-md mb-2">
              <div className="border-b py-2">
                <div className="py-2 px-4 flex items-center justify-between pb-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <Image
                        src="/assets/product/product1.jpg"
                        width={60}
                        height={60}
                        alt="cart"
                      />
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold">
                        Order ID: #6527XX
                      </div>
                      <div>Men's expeditionary Pure</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b">
                <div className="px-4  py-3 grid grid-cols-4">
                  <div className="flex items-center gap-3 col-span-2">
                    <div>
                      <Image
                        src="/assets/product/product1.jpg"
                        width={35}
                        height={35}
                        alt="cart"
                      />
                    </div>
                    <div>
                      <div className="text-[14px] h-[15px]">
                        Color: White set, with little bears
                      </div>
                      <div className="text-[14px] h-[15px]">
                        Size: XL(130 catty -145 catty)
                      </div>
                    </div>
                  </div>
                  <div className="text-[14px] col-span-1 flex items-center">
                    <span>3 x</span>
                    <span> ৳955</span>
                  </div>
                  <div className="flex items-center gap-3 col-span-1 justify-end">
                    <div className="h-[20px]">৳2865</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="px-4  py-3 grid grid-cols-4 ">
                  <div className="flex items-center gap-3 col-span-2">
                    <div>Item details</div>
                  </div>
                  <div className="text-[14px] col-span-1 flex items-center">
                    <span>5 Items</span>
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    ৳2865
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 ">
            <div className="bg-tahiti-50 rounded-md">
              <div className="px-3">
                <div className="flex items-center justify-between py-2">
                  <div>Product Price</div>
                  <div className="font-semibold">৳11759</div>
                </div>
              </div>
              <div className="px-3 py-2">
                <div className="bg-tahiti-300 flex items-center justify-center py-3 rounded-md">
                  <div className="">
                    <div className="text-[18px] font-semibold text-center">
                      70% Payment -৳65422
                    </div>
                    <div className="text-[16px] text-center">
                      <div>
                        Pay on Delivery ৳28038 + Shipping & Courier Charges
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
      >
        <div className=" max-w-[600px] max-h-[600px] overflow-y-auto left-side">
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
                  <div className="bg-tahiti-500 text-tahiti-50 text-[14px] py-2 px-4 rounded-md flex items-center justify-center w-full cursor-pointer">
                    Accept & Place Order
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Checkout;
