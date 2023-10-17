import React,{useState} from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "react-modal";
import {HiPlus,HiMinus} from 'react-icons/hi'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 0,
    border:'none,'
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const Cart = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] =useState(false);

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
            <div className="bg-tahiti-500 rounded-full text-tahiti-50 w-6 h-6 flex items-center justify-center">
              4
            </div>
            <div className="text-[18px] font-semibold pl-2">CART</div>
          </div>
          <div>15 October, 2023</div>
        </div>

        <div className="mt-2 grid grid-cols-6 gap-2">
          <div className="col-span-4  rounded-md ">
            <div className="bg-tahiti-50 rounded-md">
              <div className="border-b py-2">
                <div className="py-2 px-3 flex items-center justify-between pb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-3"
                        type="checkbox"
                        className="w-4 h-4  bg-gray-100 border-gray-300 rounded"
                      />
                      <label for="checkbox-table-3" className="sr-only">
                        checkbox
                      </label>
                    </div>
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
                  <div>
                    <RiDeleteBin6Line
                      size={25}
                      className="text-red-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="border-b">
                <div className="px-6  py-3 grid grid-cols-4">
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
                    <div
                      onClick={() => setIsOpen(true)}
                      className="bg-tahiti-500 text-tahiti-50 flex items-center justify-center rounded-md px-2 cursor-pointer"
                    >
                      Edit
                    </div>
                    <div className="h-[20px]">৳2865</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="px-6  py-3 grid grid-cols-4 ">
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
            {/* <div className="col-span-4 bg-white rounded-md py-10 flex items-center justify-center">
               <div>
               <Image
                        src="/assets/account/empty.png"
                        width={120}
                        height={120}
                        alt="cart"
                      />
               </div>
            </div> */}
          </div>
          <div className="col-span-2 ">
            <div className="bg-tahiti-50 rounded-md">
              <div className="py-3 border-b text-[20px] font-semibold flex items-center justify-center">
                Cart Summary
              </div>
              <div className="px-3">
                <div className="flex items-center justify-between py-2">
                  <div>Product Price</div>
                  <div className="font-semibold">৳11759</div>
                </div>
                <div className="flex items-center justify-between py-1">
                  <div>Pay Now (70%)</div>
                  <div className="font-semibold">৳11759</div>
                </div>
              </div>
              <div className="px-3 py-2">
                <div className="bg-tahiti-300 flex items-center justify-center py-3 rounded-md">
                  <div className="">
                    <div className="text-[18px] font-semibold text-center">
                      Pay after delivery
                    </div>
                    <div className="text-[18px] text-center">
                      <div>৳ 3528 + Shipping & Courier Charges</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-tahiti-500 py-2 mt-2 rounded-md flex items-center justify-center text-tahiti-50 text-[16px] font-semibold cursor-pointer">
              Go To Checkout
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
        <div className=" w-[500px]">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-tahiti-100 w-[170px] h-[80px] rounded-md text-white flex items-center justify-center">
              <div className="">
                <div className="text-[18px] font-semibold text-center">
                  ৳1094
                </div>
                <div className="text-[16px] text-center">1 or more</div>
              </div>
            </div>
            <div className="bg-tahiti-100 w-[170px] h-[80px] rounded-md text-white flex items-center justify-center">
              <div className="">
                <div className="text-[18px] font-semibold text-center">
                  ৳1094
                </div>
                <div className="text-[16px] text-center">1 or more</div>
              </div>
            </div>
            <div className="bg-tahiti-100 w-[170px] h-[80px] rounded-md text-white flex items-center justify-center">
              <div className="">
                <div className="text-[18px] font-semibold text-center">
                  ৳1094
                </div>
                <div className="text-[16px] text-center">1 or more</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[15px] h-[17px]">Color: Green</div>
              <div className="text-[15px] h-[17px]">Size: 39</div>
            </div>
            <div>
              <div>
                <div className=" flex items-center justify-center ">
                  <button className="bg-tahiti-100 text-[18px] text-tahiti-50 w-[30px] h-[30px] font-extrabold rounded-full mr-[-15px] z-10 flex items-center justify-center">
                    <HiMinus className="text-[20px]"/>
                  </button>
                  <input className="outline-none w-[70px] h-[30px] text-center border-t-[2px] border-b-[2px] border-tahiti-500 text-[14px]" />
                  <button className="bg-tahiti-100 text-[18px] text-tahiti-50 w-[30px] h-[30px] font-extrabold rounded-full ml-[-15px] z-10 flex items-center justify-center">
                  <HiPlus className="text-[20px]"/>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 py-2 mt-2">
            <div className="bg-[#EEEEEE] text-[14px] px-2 py-1 rounded-md">Total Items: <span className="">40</span></div>
            <div className="bg-[#EEEEEE] text-[14px] px-2 py-1 rounded-md">Subtotal: <span className="">৳ 43760</span></div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="bg-red-700 text-tahiti-50 text-[14px] py-2 px-4 rounded-md">Delete</div>
            <div className="flex items-center gap-3">
            <div onClick={()=>setIsOpen(false)} className="bg-[#AAAAAA] text-tahiti-50 text-[14px] py-2 px-4 rounded-md cursor-pointer">Cancel</div>
            <div className="bg-tahiti-500 text-tahiti-50 text-[14px] py-2 px-4 rounded-md">Update</div>

            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
