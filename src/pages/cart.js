import React, { useState, useEffect } from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "react-modal";
import { HiPlus, HiMinus } from "react-icons/hi";
import request from "@/lib/request";
import { useRouter } from "next/router";

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
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const Cart = () => {
  let subtitle;
  const router = useRouter()
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cartList, setcartList] = useState([]);
  const [totalCartPrice, settotalCartPrice] = useState(0)

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const cartItems = async () => {
      let res = await request("cart/fetch");
      if (res?.success) {
        if (res?.data.length > 0) {
          let value = res?.data.map((item) => {
            return { ...item, isChecked: true };
          });
          setcartList(value);
        
          let total = value?.reduce((a,b)=>a + (b?.totalPrice),0)
          settotalCartPrice(total)
        }
      }
    };
    cartItems();
  }, []);

  console.log(totalCartPrice);

  return (
    <div className="flex min-h-screen flex-col mt-[65px] xs:mt-[108px] xms:mt-[108px] xls:mt-[108px] sm:mt-[108px]">
      <div className="p-2 xs:p-0 xms:p-0 xls:p-0 sm:p-0">
        <div className="bg-tahiti-50 py-4 px-3 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-tahiti-500 rounded-full text-tahiti-50 w-6 h-6 flex items-center justify-center">
              {cartList?.length}
            </div>
            <div className="text-[18px] font-semibold pl-2">CART</div>
          </div>
          <div>15 October, 2023</div>
        </div>

        <div className="mt-2 grid grid-cols-6 gap-2 xs:grid-cols-1 xs:gap-0 xms:grid-cols-1 xms:gap-0 xls:grid-cols-1 xls:gap-0 sm:grid-cols-1 sm:gap-0 md:grid-cols-1 md:gap-0">
          <div className="col-span-4  rounded-md ">
            {cartList?.length > 0 ? (
              <>
                {cartList?.map((item, index) => (
                  <div key={index} className="bg-tahiti-50 rounded-md mb-2">
                    <div className="border-b py-2">
                      <div className="py-2 px-3 flex items-center justify-between pb-3">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={item?.isChecked}
                              className="w-4 h-4  bg-gray-100 border-gray-300 rounded"
                            />
                          </div>
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
                            <div onClick={()=>router.push(`/product/${item?.productId}`)} className="cursor-pointer">{item?.Title}</div>
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
                    {item?.selected?.map((items, indexx) => (
                      <div className="border-b">
                        <div className="px-6  py-3 grid grid-cols-4 xs:grid-cols-5 xs:px-2 xms:grid-cols-5 xms:px-2 xls:grid-cols-5 xls:px-2">
                          <div className="flex items-center gap-3 col-span-2 xs:flex-col xs:items-start xs:col-span-3 xms:col-span-3 xls:col-span-3">
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
                              {items?.Color && (
                                <div className="text-[14px] xs:text-[12px] xms:text-[12px] xls:text-[12px]">
                                  Color: {items?.Color}
                                </div>
                              )}
                              {items?.Size && (
                                <div className="text-[14px]  xs:text-[12px] xms:text-[12px] xls:text-[12px]">
                                  Size: {items?.Size}
                                </div>
                              )}
                              {(items?.Color || items?.Size) ? null : (
                                <div className="text-[14px] text-red-500  xs:text-[12px] xms:text-[12px] xls:text-[12px]">
                                 No Variation
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-[14px] col-span-1 flex items-center xs:text-[12px] xms:text-[12px] xls:text-[12px]">
                            <span className="font-serifs ">{items?.qty} x </span>
                            <span className="font-serifs "> ৳ {items?.unitPrice}</span>
                          </div>
                          <div className="flex items-center gap-3 col-span-1 justify-end xs:gap-1 xms:gap-1 xls:gap-1">
                          <div className="h-[20px] font-serifs xs:text-[12px] ">৳ {items?.qty*items?.unitPrice}</div>

                            <div
                              onClick={() => setIsOpen(true)}
                              className="bg-tahiti-500 text-tahiti-50 flex items-center justify-center rounded-md px-2 cursor-pointer xs:text-[12px] xms:text-[12px] xls:text-[12px]"
                            >
                              Edit
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div>
                      <div className="px-6  py-3 grid grid-cols-4 xs:grid-cols-5 xs:px-2 xms:grid-cols-5 xms:px-2 xls:grid-cols-5 xls:px-2">
                        <div className="flex items-center gap-3 col-span-2 xs:col-span-3 xsm:col-span-3 xls:col-span-3">
                          <div>Item details</div>
                        </div>
                        <div className="text-[14px] font-serifs  col-span-1 flex items-center">
                          <span>{item?.totalQty} Items</span>
                        </div>
                        <div className="col-span-1 font-serifs  flex items-center justify-end">
                          ৳ {item?.totalPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="col-span-4 bg-white rounded-md py-10 flex items-center justify-center">
                <div>
                  <Image
                    src="/assets/account/empty.png"
                    width={120}
                    height={120}
                    alt="cart"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="col-span-2 xs:mt-2 xms:mt-2 xls:mt-2 sm:mt-2 md:mt-2">
            <div className="bg-tahiti-50 rounded-md">
              <div className="py-3 border-b text-[20px] font-semibold flex items-center justify-center">
                Cart Summary
              </div>
              <div className="px-3">
                <div className="flex items-center justify-between py-2">
                  <div>Product Price</div>
                  <div className="font-semibold font-serifs ">৳ {totalCartPrice}</div>
                </div>
                <div className="flex items-center justify-between py-1">
                  <div>Pay Now (70%)</div>
                  <div className="font-semibold font-serifs ">৳ {Math.ceil(totalCartPrice*70/100)}</div>
                </div>
              </div>
              <div className="px-3 py-2">
                <div className="bg-tahiti-300 flex items-center justify-center py-3 rounded-md">
                  <div className="">
                    <div className="text-[18px] font-semibold text-center">
                      Pay after delivery
                    </div>
                    <div className="text-[18px] font-serifs  text-center">
                      <div>৳ {Math.ceil(totalCartPrice- totalCartPrice*70/100)} + Shipping & Courier Charges</div>
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
        <div className=" w-[500px] xs:max-w-[300px] xs:max-h-[400px] xms:max-w-[310px] xms:max-h-[400px] xls:max-w-[370px] xls:max-h-[400px] sm:max-h-[500px]">
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
                    <HiMinus className="text-[20px]" />
                  </button>
                  <input className="outline-none w-[70px] h-[30px] text-center border-t-[2px] border-b-[2px] border-tahiti-500 text-[14px]" />
                  <button className="bg-tahiti-100 text-[18px] text-tahiti-50 w-[30px] h-[30px] font-extrabold rounded-full ml-[-15px] z-10 flex items-center justify-center">
                    <HiPlus className="text-[20px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 py-2 mt-2">
            <div className="bg-[#EEEEEE] text-[14px] px-2 py-1 rounded-md">
              Total Items: <span className="">40</span>
            </div>
            <div className="bg-[#EEEEEE] text-[14px] px-2 py-1 rounded-md">
              Subtotal: <span className="">৳ 43760</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="bg-red-700 text-tahiti-50 text-[14px] py-2 px-4 rounded-md">
              Delete
            </div>
            <div className="flex items-center gap-3">
              <div
                onClick={() => setIsOpen(false)}
                className="bg-[#AAAAAA] text-tahiti-50 text-[14px] py-2 px-4 rounded-md cursor-pointer"
              >
                Cancel
              </div>
              <div className="bg-tahiti-500 text-tahiti-50 text-[14px] py-2 px-4 rounded-md">
                Update
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
