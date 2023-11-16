import React, { useState, useEffect } from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "react-modal";
import { HiPlus, HiMinus } from "react-icons/hi";
import request from "@/lib/request";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import postRequest from "@/lib/postRequest";
import { useStatus } from "@/context/contextStatus";

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
  const router = useRouter();
  const {refreshApi,setrefreshApi}= useStatus()
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cartList, setcartList] = useState([]);
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [singleItem, setsingleItem] = useState(null);
  const [selectedIndex, setselectedIndex] = useState(-1);
  const [totalPrice, settotalPrice] = useState(0);
  const [totalQty, settotalQty] = useState(0);
  const [qtyRangePrice, setqtyRangePrice] = useState(null);
  const [qtyRange, setqtyRange] = useState(0);
  const [variationArr, setvariationArr] = useState([]);
  const [itemsObj, setitemsObj] = useState(null);
  const [renderMe, setrenderMe] = useState(false);
  const [isDeleteButton, setisDeleteButton] = useState(false);
  const [renderMe2, setrenderMe2] = useState(false)
  const [selectedId, setselectedId] = useState([])

  function closeModal() {
    setIsOpen(false);
    setsingleItem(null);
    setselectedIndex(-1);
    setqtyRangePrice(null);
    setqtyRange(0);
    setisDeleteButton(false)
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
          let value1 = res?.data.map((item) => {
            return item?.cartId 
          });
          setselectedId(value1)

          let total = value?.reduce((a, b) => a + b?.totalPrice, 0);
          settotalCartPrice(total);
        } else {
          setcartList([]);
          settotalCartPrice(0);
        }
      }
    };
    cartItems();
  }, [renderMe]);


  const openModal = (val, index, item) => {
    setIsOpen(true);
    setsingleItem(val);
    setselectedIndex(index);
    settotalPrice(val?.totalPrice);
    settotalQty(val?.totalQty);
    setvariationArr(val?.selected);
    setitemsObj(item);
    if (val?.selected.length > 1) {
      setisDeleteButton(true);
    }
  };

  useEffect(() => {
    let getQtyPrice;
    if (singleItem?.QuantityRanges.length > 0) {
      let quantityrange = 0;
      let quantity = singleItem?.QuantityRanges.map((item) => {
        return item.MinQuantity;
      });
      quantity = quantity.sort((a, b) => a - b);
      function small(tot) {
        return tot < quantity[0];
      }

      function big(tot) {
        return tot > quantity[quantity.length - 1];
      }

      if (small(totalQty)) {
        quantityrange = quantity[0];
      } else if (big(totalQty)) {
        quantityrange = quantity[quantity.length - 1];
      } else {
        for (let i = quantity.length - 1; i >= 0; --i) {
          if (totalQty >= quantity[i]) {
            quantityrange = quantity[i];
            break;
          }
        }
      }
      setqtyRange(quantityrange);
      let value = singleItem?.QuantityRanges.filter(
        (a) => a.MinQuantity == quantityrange
      );
      getQtyPrice = Math.ceil(value[0]?.Price + (value[0]?.Price * 10) / 100);
      setqtyRangePrice(getQtyPrice);
    }

    if (variationArr?.length > 0) {
      let totalPrice = variationArr.reduce(
        (a, b) =>
          a +
          (qtyRangePrice == null
            ? Math.ceil(b?.unitPrice) * b?.qty
            : Math.ceil(getQtyPrice) * b?.qty),
        0
      );
      settotalPrice(totalPrice);
    }
  }, [totalQty, singleItem]);

  const addQty = () => {
    let arr = [...variationArr];
    const update = { ...itemsObj, qty: itemsObj.qty + 1 };
    setitemsObj(update);
    const arr1 = arr.map((item, i) =>
      i === selectedIndex ? { ...item, qty: item.qty + 1 } : item
    );
    setvariationArr(arr1);

    let totalP = arr1.reduce((a, b) => a + b?.qty, 0);
    settotalQty(totalP);
  };
  const subQty = () => {
    let arr = [...variationArr];
    const update = { ...itemsObj, qty: itemsObj.qty - 1 };
    setitemsObj(update);
    const arr1 = arr.map((item, i) =>
      i === selectedIndex ? { ...item, qty: item.qty - 1 } : item
    );
    setvariationArr(arr1);

    let totalP = arr1.reduce((a, b) => a + b?.qty, 0);
    settotalQty(totalP);
  };
  const inputQty = (val) => {
    let arr = [...variationArr];
    const update = { ...itemsObj, qty: Number(val) };
    setitemsObj(update);
    const arr1 = arr.map((item, i) =>
      i === selectedIndex ? { ...item, qty: Number(val) } : item
    );
    setvariationArr(arr1);

    let totalP = arr1.reduce((a, b) => a + b?.qty, 0);
    settotalQty(totalP);
  };

  const addToCartUpdate = async () => {
    if (singleItem?.QuantityRanges.length > 0) {
      if (singleItem?.QuantityRanges[0]?.MinQuantity - 1 >= totalQty) {
        toast.warning(
          `Minimum Quantity ${singleItem?.QuantityRanges[0]?.MinQuantity} Piece`
        );
        return;
      }
    } else if (2 >= totalQty) {
      toast.warning("Minimum Quantity 3 Piece");
      return;
    }

    if (1000 >= totalPrice) {
      toast.warning("Minimum Total Price 1000 Taka");
      return;
    }
    let pro;

    if (variationArr.length > 0) {
      pro = variationArr?.map((item) => {
        return {
          Color: item?.Color,
          Size: item?.Size,
          unitPrice:
            qtyRangePrice == null
              ? Math.ceil(item?.unitPrice)
              : Math.ceil(qtyRangePrice),
          qty: item?.qty,
          MiniImageUrl: item?.MiniImageUrl,
        };
      });
    }

    let data = {
      cartId: singleItem?.cartId,
      selected: pro,
      totalQty: totalQty,
      totalPrice: totalPrice,
    };

    let res = await postRequest("cart/update", data);
    if (res?.success) {
      setrenderMe(!renderMe);
      closeModal();
    } else {
      toast.error(res.message);
    }
  };

  const deleteCard = async (id) => {
    let data = {
      cartId: id,
    };
    let res = await postRequest("cart/delete", data);
    console.log("....delete", res);
    if (res?.success) {
      setrenderMe(!renderMe);
      toast.success(res?.message);
      setrefreshApi(!refreshApi)
    }
  };

  const CheckBox = async (index) => {
    let arr = cartList;
    arr[index].isChecked
      ? (arr[index]["isChecked"] = false)
      : (arr[index]["isChecked"] = true);
      setcartList(arr)
      setrenderMe2(!renderMe2)
      const checkedProducts = arr.filter((product) => product.isChecked);
      let value1 = checkedProducts.map((item) => {
        return item?.cartId 
      });
      setselectedId(value1)
      let total = checkedProducts?.reduce((a, b) => a + b?.totalPrice, 0);
      settotalCartPrice(total);

  //  console.log('.......',checkedProducts);
  };

  const deleteItem=async ()=>{
    let arr = [...variationArr];
    let totalPrice1=0;
    arr.splice(selectedIndex,1)
    console.log(arr);
    let newArr = arr

    let totalQty1 = newArr.reduce((a, b) => a + b?.qty, 0);
    
    let getQtyPrice = null;
    if (singleItem?.QuantityRanges.length > 0) {
      let quantityrange = 0;
      let quantity = singleItem?.QuantityRanges.map((item) => {
        return item.MinQuantity;
      });
      quantity = quantity.sort((a, b) => a - b);
      function small(tot) {
        return tot < quantity[0];
      }

      function big(tot) {
        return tot > quantity[quantity.length - 1];
      }

      if (small(totalQty1)) {
        quantityrange = quantity[0];
      } else if (big(totalQty1)) {
        quantityrange = quantity[quantity.length - 1];
      } else {
        for (let i = quantity.length - 1; i >= 0; --i) {
          if (totalQty1 >= quantity[i]) {
            quantityrange = quantity[i];
            break;
          }
        }
      }
      let value = singleItem?.QuantityRanges.filter(
        (a) => a.MinQuantity == quantityrange
      );
      getQtyPrice = Math.ceil(value[0]?.Price + (value[0]?.Price * 10) / 100);
    }

    if (newArr?.length > 0) {
       totalPrice1 = newArr.reduce(
        (a, b) =>
          a +
          (getQtyPrice == null
            ? Math.ceil(b?.unitPrice) * b?.qty
            : Math.ceil(getQtyPrice) * b?.qty),
        0
      );
    }


    if (singleItem?.QuantityRanges.length > 0) {
      if (singleItem?.QuantityRanges[0]?.MinQuantity - 1 >= totalQty1) {
        toast.warning(
          `Minimum Quantity ${singleItem?.QuantityRanges[0]?.MinQuantity} Piece`
        );
        return;
      }
    } else if (2 >= totalQty1) {
      toast.warning("Minimum Quantity 3 Piece");
      return;
    }

    if (1000 >= totalPrice1) {
      toast.warning("Minimum Total Price 1000 Taka");
      return;
    }
    let pro;

    if (newArr.length > 0) {
      pro = newArr?.map((item) => {
        return {
          Color: item?.Color,
          Size: item?.Size,
          unitPrice:
          getQtyPrice == null
              ? Math.ceil(item?.unitPrice)
              : Math.ceil(getQtyPrice),
          qty: item?.qty,
          MiniImageUrl: item?.MiniImageUrl,
        };
      });
    }

    let data = {
      cartId: singleItem?.cartId,
      selected: pro,
      totalQty: totalQty1,
      totalPrice: totalPrice1,
    };

    let res = await postRequest("cart/update", data);
    if (res?.success) {
      toast.success(res?.message)
      setrenderMe(!renderMe);
      closeModal();
    } else {
      toast.error(res.message);
    }

  }


  const gotoCheckout=async ()=>{
   let data={
    cartIds:selectedId
   }
   if(selectedId.length>0){
        let res = await postRequest("customer/checkout/key",data)
        if(res?.success){
          router.push(`/checkout?key=${res?.data?.key}`)
        }
   }else{
    toast.warning('Please Select Cart Item To Go Checkout')
   }
  }





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
                              onChange={() => CheckBox(index)}
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
                            <div
                              onClick={() =>
                                router.push(`/product/${item?.productId}`)
                              }
                              className="cursor-pointer"
                            >
                              {item?.Title}
                            </div>
                          </div>
                        </div>
                        <div>
                          <RiDeleteBin6Line
                            onClick={() => deleteCard(item?.cartId)}
                            size={25}
                            className="text-red-600 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                    {item?.selected?.map((items, indexx) => (
                      <div key={indexx} className="border-b">
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
                              {items?.Color || items?.Size ? null : (
                                <div className="text-[14px] text-red-500  xs:text-[12px] xms:text-[12px] xls:text-[12px]">
                                  No Variation
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-[14px] col-span-1 flex items-center xs:text-[12px] xms:text-[12px] xls:text-[12px]">
                            <span className="font-serifs ">
                              {items?.qty} x{" "}
                            </span>
                            <span className="font-serifs ">
                              {" "}
                              ৳ {items?.unitPrice}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 col-span-1 justify-end xs:gap-1 xms:gap-1 xls:gap-1">
                            <div className="h-[20px] font-serifs xs:text-[12px] ">
                              ৳ {items?.qty * items?.unitPrice}
                            </div>

                            <div
                              onClick={() => openModal(item, indexx, items)}
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
                  <div className="font-semibold font-serifs ">
                    ৳ {totalCartPrice}
                  </div>
                </div>
                <div className="flex items-center justify-between py-1">
                  <div>Pay Now (70%)</div>
                  <div className="font-semibold font-serifs ">
                    ৳ {Math.ceil((totalCartPrice * 70) / 100)}
                  </div>
                </div>
              </div>
              <div className="px-3 py-2">
                <div className="bg-tahiti-300 flex items-center justify-center py-3 rounded-md">
                  <div className="">
                    <div className="text-[18px] font-semibold text-center">
                      Pay after delivery
                    </div>
                    <div className="text-[18px] font-serifs  text-center">
                      <div>
                        ৳{" "}
                        {Math.ceil(
                          totalCartPrice - (totalCartPrice * 70) / 100
                        )}{" "}
                        + Shipping & Courier Charges
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div onClick={()=>gotoCheckout()} className="bg-tahiti-500 py-2 mt-2 rounded-md flex items-center justify-center text-tahiti-50 text-[16px] font-semibold cursor-pointer">
              Go To Checkout
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className=" w-[500px] xs:max-w-[300px] xs:max-h-[400px] xms:max-w-[310px] xms:max-h-[400px] xls:max-w-[370px] xls:max-h-[400px] sm:max-h-[500px]">
          <div className="flex items-center gap-3 mb-5">
            {singleItem?.QuantityRanges?.map((item, index) => (
              <div
              key={index}
                className={`${
                  item?.MinQuantity == qtyRange
                    ? "bg-tahiti-500 text-white"
                    : "bg-[#F4F4F4] text-black"
                } w-[170px] h-[80px] rounded-md flex items-center justify-center`}
              >
                <div className="">
                  <div className="text-[18px] font-semibold text-center">
                    ৳ {Math.ceil(item?.Price + (item?.Price * 10) / 100)}
                  </div>
                  <div className="text-[16px] text-center">
                    {item?.MinQuantity} or more
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              {itemsObj?.Color && (
                <div className="text-[14px] xs:text-[12px] xms:text-[12px] xls:text-[12px]">
                  Color: {itemsObj?.Color}
                </div>
              )}
              {itemsObj?.Size && (
                <div className="text-[14px]  xs:text-[12px] xms:text-[12px] xls:text-[12px]">
                  Size: {itemsObj?.Size}
                </div>
              )}
              {itemsObj?.Color || itemsObj?.Size ? null : (
                <div className="text-[14px]   xs:text-[12px] xms:text-[12px] xls:text-[12px] pr-3">
                  {singleItem?.Title}
                </div>
              )}
            </div>
            <div>
              <div>
                <div className=" flex itemsObjs-center justify-center ">
                  <button
                    disabled={itemsObj?.qty == 1 ? true : false}
                    onClick={() => subQty()}
                    className="bg-tahiti-500 text-[18px] text-tahiti-50 w-[30px] h-[30px] font-extrabold rounded-full mr-[-15px] z-10 flex items-center justify-center"
                  >
                    <HiMinus className="text-[20px]" />
                  </button>
                  <input
                    value={itemsObj?.qty}
                    onChange={(e) => inputQty(e.target.value)}
                    className="outline-none w-[70px] h-[30px] text-center border-t-[2px] border-b-[2px] border-tahiti-500 text-[14px]"
                  />
                  <button
                    onClick={() => addQty()}
                    className="bg-tahiti-500 text-[18px] text-tahiti-50 w-[30px] h-[30px] font-extrabold rounded-full ml-[-15px] z-10 flex items-center justify-center"
                  >
                    <HiPlus className="text-[20px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 py-2 mt-2">
            <div className="bg-[#EEEEEE] text-[14px] px-2 py-1 rounded-md">
              Total Items: <span className="">{totalQty}</span>
            </div>
            <div className="bg-[#EEEEEE] text-[14px] px-2 py-1 rounded-md">
              Subtotal: <span className="">৳ {totalPrice}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            {isDeleteButton ?  
              <div onClick={()=>deleteItem()} className="bg-red-700 text-tahiti-50 text-[14px] py-2 px-4 rounded-md cursor-pointer">
                Delete
              </div>
              :<div className="">
            </div>
            }
            <div className="flex items-end gap-3 justify-end">
              <div
                onClick={() => closeModal()}
                className="bg-[#AAAAAA] text-tahiti-50 text-[14px] py-2 px-4 rounded-md cursor-pointer"
              >
                Cancel
              </div>
              <div
                onClick={() => addToCartUpdate()}
                className="bg-tahiti-500 text-tahiti-50 text-[14px] py-2 px-4 rounded-md cursor-pointer"
              >
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
