import React, { useState, useEffect } from "react";
import Image from "next/image";
import ImageGallery from "@/components/productDetails/ImageGallery";
import Campaign from "@/components/productDetails/Campaign";
import SizeChart from "@/components/productDetails/SizeChart";
import PriceTable from "@/components/productDetails/PriceTable";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsBagCheck, BsFillHeartFill, BsHeart, BsDot } from "react-icons/bs";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import ProductCard from "@/components/productSection/productCard";
import Conditions from "@/components/productDetails/condition";
import ShippingCharge from "@/components/productDetails/ShippingCharge";
import { useRouter } from "next/router";
import style from "@/styles/productDetails.module.css";
import request from "@/lib/request";
import Modal from "react-modal";
import postRequest from "@/lib/postRequest";
import { toast } from "react-toastify";
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
    padding: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const SingleProduct = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { refreshApi, setrefreshApi, token, priceInc, offerCampaign } =
    useStatus();
  const [selectedImage, setselectedImage] = useState("");
  const [tabChange, settabChange] = useState(1);
  const [productDetails, setproductDetails] = useState(null);
  const [productVariation, setproductVariation] = useState([]);
  const [variationId, setvariationId] = useState("");
  const [isVideo, setisVideo] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tableVariation, settableVariation] = useState([]);
  const [propertyName, setpropertyName] = useState("");
  const [values, setvalues] = useState("");
  const [renderMe, setrenderMe] = useState(false);
  const [totalQty, settotalQty] = useState(0);
  const [qtyRangePrice, setqtyRangePrice] = useState(null);
  const [qtyRange, setqtyRange] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  const [ModalTab, setModalTab] = useState(0);
  const [nonVariation, setnonVariation] = useState(null);
  const [selectedProduct, setselectedProduct] = useState([]);
  const [wishStatus, setwishStatus] = useState();

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await request(
        `product/single-details?productId=${router.query.slug}`
      );
      if (res?.success) {
        setproductDetails(res?.data);
        setwishStatus(res?.data?.wishStatus);
        if (res?.data) {
          setselectedImage(res?.data?.MainPictureUrl);
        }

        if (res?.data?.Variation2.length > 0) {
        } else if (res?.data?.Variation1.length > 0) {
          setproductVariation(res?.data?.Variation1);
          let value = res?.data?.Variation1.filter(
            (item) => item?.Vid == res?.data?.Variation1[0]?.Vid
          );
          settableVariation([...value]);
          setpropertyName(value[0]?.PropertyName);
          setvalues(value[0]?.Value);
          setvariationId(value[0]?.Vid);
        } else {
          let nonVariation = { Price: res?.data?.Price, qty: 1 };
          setnonVariation(nonVariation);
        }
      }
    };
    fetchData();
  }, [router.query.slug]);

  const selectVariation = (val) => {
    setvariationId(val?.Vid);
    setvalues(val?.Value);
    if (val?.ImageUrl) {
      setselectedImage(val?.ImageUrl);
    }
    if (productDetails?.Variation2.length > 0) {
    } else if (productDetails?.Variation1.length > 0) {
      let value = productDetails?.Variation1.filter(
        (item) => item?.Vid == val?.Vid
      );
      settableVariation(value);
    }
  };

  useEffect(() => {
    let totalQuantity;
    if (productDetails?.Variation1?.length > 0) {
      totalQuantity = productVariation.reduce((a, b) => a + b?.qty, 0);
      settotalQty(totalQuantity);
    } else {
      totalQuantity = nonVariation?.qty;
      settotalQty(totalQuantity);
    }

    let getQtyPrice;
    if (productDetails?.QuantityRanges.length > 0) {
      let quantityrange = 0;
      let quantity = productDetails?.QuantityRanges.map((item) => {
        return item.MinQuantity;
      });
      quantity = quantity.sort((a, b) => a - b);

      function small(tot) {
        return tot < quantity[0];
      }

      function big(tot) {
        return tot > quantity[quantity.length - 1];
      }

      if (small(totalQuantity)) {
        quantityrange = quantity[0];
      } else if (big(totalQuantity)) {
        quantityrange = quantity[quantity.length - 1];
      } else {
        for (let i = quantity.length - 1; i >= 0; --i) {
          if (totalQuantity >= quantity[i]) {
            quantityrange = quantity[i];
            break;
          }
        }
      }
      setqtyRange(quantityrange);
      let value = productDetails?.QuantityRanges.filter(
        (a) => a.MinQuantity == quantityrange
      );
      getQtyPrice = value[0]?.Price + (value[0]?.Price * priceInc) / 100;
      setqtyRangePrice(getQtyPrice);
    }

    if (productDetails?.Variation2.length > 0) {
    } else if (productDetails?.Variation1.length > 0) {
      let fillter = productVariation?.filter((a) => a?.qty > 0);
      setselectedProduct(fillter);
      let totalPrice = fillter.reduce(
        (a, b) =>
          a +
          (qtyRangePrice == null
            ? Math.ceil(b?.Price + (b?.Price * priceInc) / 100) * b?.qty
            : Math.ceil(getQtyPrice) * b?.qty),
        0
      );
      settotalPrice(totalPrice);
    } else {
      let totalPrice =
        qtyRangePrice == null
          ? Math.ceil(
              nonVariation?.Price + (nonVariation?.Price * priceInc) / 100
            ) * nonVariation?.qty
          : Math.ceil(getQtyPrice) * nonVariation?.qty;
      settotalPrice(totalPrice);
    }
  }, [productVariation, renderMe, nonVariation]);

  const subQty = (val, index) => {
    const arr = [...tableVariation];
    const arrP = [...productVariation];
    const arr1 = arr.map((item, i) =>
      i === index ? { ...item, qty: item.qty - 1 } : item
    );
    settableVariation(arr1);
    let findIndex = arrP?.findIndex((item) => item?.Vid == val?.Vid);
    if (findIndex > -1) {
      arrP[findIndex].qty -= 1;
    }
    setproductVariation(arrP);
  };

  const addQty = (val, index) => {
    const arr = [...tableVariation];
    const arrP = [...productVariation];
    const arr1 = arr.map((item, i) =>
      i === index ? { ...item, qty: item.qty + 1 } : item
    );
    settableVariation(arr1);
    let findIndex = arrP?.findIndex((item) => item?.Vid == val?.Vid);
    if (findIndex > -1) {
      arrP[findIndex].qty += 1;
    }
    setproductVariation(arrP);
  };

  const inputQty = (val, index, items) => {
    const arr = [...tableVariation];
    const arrP = [...productVariation];
    const arr1 = arr.map((item, i) =>
      i === index ? { ...item, qty: Number(val) } : item
    );
    settableVariation(arr1);
    let findIndex = arrP?.findIndex((item) => item?.Vid == items?.Vid);
    if (findIndex > -1) {
      arrP[findIndex].qty = Number(val);
    }
    setproductVariation(arrP);
  };

  const addNonQty = async () => {
    let b = nonVariation;
    b.qty += 1;
    setnonVariation(b);
    setrenderMe(!renderMe);
  };
  const subNonQty = async () => {
    let b = nonVariation;
    if (b?.qty > 1) {
      b.qty -= 1;
      setnonVariation(b);
      setrenderMe(!renderMe);
    }
  };
  const inputNonQty = async (val) => {
    if (Number(val) > 0) {
      let b = nonVariation;
      b.qty = Number(val);
      setnonVariation(b);
      setrenderMe(!renderMe);
    }
  };

  const addToCart = async () => {

    if (!token) {
      toast.warning("Login First");
      return;
    }

    if (productDetails?.QuantityRanges.length > 0) {
      if (productDetails?.QuantityRanges[0]?.MinQuantity - 1 >= totalQty) {
        setIsOpen(true);
        setModalTab(0);
        return;
      }
    } else if (2 >= totalQty) {
      setIsOpen(true);
      setModalTab(0);
      return;
    }

    if (1000 >= totalPrice) {
      setIsOpen(true);
      setModalTab(1);
      return;
    }

   

    let pro;

    if (productDetails?.Variation2.length > 0) {
    } else if (productDetails?.Variation1.length > 0) {
      pro = selectedProduct?.map((item) => {
        return {
          key1: item?.PropertyName,
          value1: item?.Value,
          key2: "",
          value2: "",
          unitPrice:
            qtyRangePrice == null
              ? Math.ceil(item?.Price + (item?.Price * priceInc) / 100)
              : Math.ceil(qtyRangePrice),
          qty: item?.qty,
          MiniImageUrl: item?.MiniImageUrl,
        };
      });
    } else {
      pro = [
        {
          key1: "",
          value1: "",
          key2: "",
          value2: "",
          unitPrice:
            qtyRangePrice == null
              ? Math.ceil(nonVariation?.Price)
              : Math.ceil(qtyRangePrice),
          qty: nonVariation?.qty,
          MiniImageUrl: "",
        },
      ];
    }

    let data = {
      productId: productDetails?.productId,
      QuantityRanges:
        productDetails?.QuantityRanges.length > 0
          ? productDetails?.QuantityRanges
          : [],
      selected: pro,
      totalQty: totalQty,
      totalPrice: totalPrice,
    };

    let res = await postRequest("cart/add", data);
    console.log("......res", res);
    if (res?.success) {
      setIsOpen(true);
      setModalTab(3);
      setrefreshApi(!refreshApi);
    } else {
      toast.error(res.message);
    }

    console.log(data);
  };
  const buyNow = async () => {

    if (!token) {
      toast.warning("Login First");
      return;
    }

    if (productDetails?.QuantityRanges.length > 0) {
      if (productDetails?.QuantityRanges[0]?.MinQuantity - 1 >= totalQty) {
        setIsOpen(true);
        setModalTab(0);
        return;
      }
    } else if (2 >= totalQty) {
      setIsOpen(true);
      setModalTab(0);
      return;
    }

    if (1000 >= totalPrice) {
      setIsOpen(true);
      setModalTab(1);
      return;
    }

    

    let pro;

    if (productDetails?.Variation2.length > 0) {
    } else if (productDetails?.Variation1.length > 0) {
      pro = selectedProduct?.map((item) => {
        return {
          key1: item?.PropertyName,
          value1: item?.Value,
          key2: "",
          value2: "",
          unitPrice:
            qtyRangePrice == null
              ? Math.ceil(item?.Price + (item?.Price * priceInc) / 100)
              : Math.ceil(qtyRangePrice),
          qty: item?.qty,
          MiniImageUrl: item?.MiniImageUrl,
        };
      });
    } else {
      pro = [
        {
          key1: "",
          value1: "",
          key2: "",
          value2: "",
          unitPrice:
            qtyRangePrice == null
              ? Math.ceil(nonVariation?.Price)
              : Math.ceil(qtyRangePrice),
          qty: nonVariation?.qty,
          MiniImageUrl: "",
        },
      ];
    }

    let data = {
      productId: productDetails?.productId,
      QuantityRanges:
        productDetails?.QuantityRanges.length > 0
          ? productDetails?.QuantityRanges
          : [],
      selected: pro,
      totalQty: totalQty,
      totalPrice: totalPrice,
    };

    let res = await postRequest("order/buyNow", data);
  
    if (res?.success) {
      router.push(`/checkout?key=${res?.data?.key}`)
      setrefreshApi(!refreshApi);
    } else {
      toast.error(res.message);
    }

    console.log(data);
  };

  const addWish = async () => {
    if (!token) {
      toast.warning("Login First");
      return;
    }

    const data = {
      productId: productDetails?.productId,
    };

    let res = await postRequest("customer/wishlist/add", data);
    if (res.success) {
      setwishStatus(true);
      setrefreshApi(!refreshApi);
    }
  };
  const removeWish = async () => {
    if (!token) {
      toast.warning("Login First");
      return;
    }
    const data = {
      productId: productDetails?.productId,
    };

    let res = await postRequest("customer/wishlist/remove", data);
    if (res.success) {
      setwishStatus(false);
      setrefreshApi(!refreshApi);
    }
  };

  return (
    <div className="flex min-h-screen flex-col mt-[65px] xs:mt-[95px] xms:mt-[95px] xls:mt-[95px]">
      <div className="p-2 xs:p-0 xms:p-0 xls:p-0">
        <div className="grid grid-cols-4 gap-2 xs:grid-cols-1 xs:gap-0 xms:grid-cols-1 xms:gap-0 xls:grid-cols-1 xls:gap-0">
          <div className="col-span-3 ">
            <div className="bg-tahiti-50 rounded-sm">
              <div className=" py-4 pl-4 border-b">
                <h1 className="text-[18px] font-bold xs:text-[14px] xms:text-[14px] xls:text-[14px]">
                  {productDetails?.Title}
                </h1>
              </div>
              <div className="grid grid-cols-5 gap-8 p-4 xs:grid-cols-1 xs:p-1 xs:gap-0 xms:grid-cols-1 xms:p-1 xms:gap-0 xls:grid-cols-1 xls:p-1 xls:gap-0">
                <ImageGallery
                  data={productDetails}
                  setselectedImage={setselectedImage}
                  selectedImage={selectedImage}
                  isVideo={isVideo}
                  setisVideo={setisVideo}
                />
                <div className="col-span-3">
                  {offerCampaign?.isValid && <Campaign />}
                  {productDetails?.QuantityRanges?.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      {productDetails?.QuantityRanges?.map((item, index) => (
                        <div
                          key={index}
                          className={`${
                            item?.MinQuantity == qtyRange
                              ? "bg-tahiti-500 text-white"
                              : "bg-[#F4F4F4] text-black"
                          }  py-2 rounded-md  flex items-center justify-center`}
                        >
                          <div className="">
                            {offerCampaign?.isValid ? (
                              <div className="text-[18px] font-semibold text-center font-serifs xs:text-[12px]">
                                ৳
                                {Math.ceil(
                                  item?.Price + (item?.Price * priceInc) / 100
                                ) -
                                  (Math.ceil(
                                    item?.Price + (item?.Price * priceInc) / 100
                                  ) *
                                    offerCampaign?.percent) /
                                    100}
                              </div>
                            ) : (
                              <div className="text-[18px] font-semibold text-center font-serifs xs:text-[14px]">
                                ৳
                                {Math.ceil(
                                  item?.Price + (item?.Price * priceInc) / 100
                                )}
                              </div>
                            )}
                            {offerCampaign?.isValid && (
                              <div className="text-[14px] line-through text-center font-serifs xs:text-[12px]">
                                ৳
                                {Math.ceil(
                                  item?.Price + (item?.Price * priceInc) / 100
                                )}
                              </div>
                            )}
                            <div className="text-[16px] text-center xs:text-[12px]">
                              {item?.MinQuantity} or more
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {productDetails?.Variation1.length > 0 && (
                    <>
                      <div className="py-2 mt-2">
                        <div className="text-[18px] font-semibold">
                          {propertyName}: {values}
                        </div>
                        <div className="flex items-center flex-wrap gap-2 pr-5 py-2 xs:pr-0">
                          {productVariation?.map((item, index) => (
                            <>
                              {item?.MiniImageUrl ? (
                                <div
                                  onClick={() => selectVariation(item)}
                                  key={index}
                                  className={`${
                                    item?.Vid == variationId
                                      ? "border-[2px] border-tahiti-500"
                                      : "border-[2px] border-gray-300"
                                  } p-[1px]  rounded-md col-span-1 hover:border-tahiti-500 hover:border-[2px] cursor-pointer ${
                                    style.subImages
                                  }`}
                                >
                                  <div className="w-[55px] h-[55px] relative flex items-center justify-center cursor-pointer xs:w-[50px] xs:h-[50px]">
                                    <Image
                                      className="object-fill rounded-md"
                                      src={item?.MiniImageUrl}
                                      fill
                                      alt="variation image"
                                      priority={true}
                                    />
                                  </div>
                                  {item?.qty == 0 ? null : (
                                    <span
                                      className={`text-white ${style.count} ${style.spanSelectedBadge1}`}
                                    >
                                      {item?.qty}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <div
                                  onClick={() => selectVariation(item)}
                                  key={index}
                                >
                                  <div
                                    className={`${style.variationContainer} relative cursor-pointer`}
                                  >
                                    <div
                                      className={`${
                                        item?.Vid == variationId
                                          ? "bg-tahiti-500 text-white"
                                          : "bg-[#F4F4F4] text-black"
                                      } px-2 py-4 rounded-md xs:py-2`}
                                    >
                                      {item?.Value}
                                    </div>
                                    {item?.qty == 0 ? null : (
                                      <span
                                        className={`text-white ${style.count} ${style.spanSelectedBadge}`}
                                      >
                                        {item?.qty}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </>
                          ))}
                        </div>
                      </div>
                      {/* <SizeChart tableVariation={tableVariation} /> */}
                      <div className=" border max-h-[250px] sm:rounded-lg left-side">
                        <table className="w-full text-sm text-center text-gray-500 border">
                          {tableVariation?.length > 0 && (
                            <thead className="text-xs text-gray-700 uppercase bg-[#eee9e9]">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3  md:min-w-[0px] xs:px-2 xs:max-w-[120px]"
                                >
                                  {tableVariation[0]?.PropertyName}
                                </th>
                                <th scope="col" className="px-6 py-3 ">
                                  Price
                                </th>
                                <th scope="col" className="px-6 py-3  ">
                                  Quantity
                                </th>
                              </tr>
                            </thead>
                          )}
                          <tbody>
                            {tableVariation.map((items, index) => (
                              <tr
                                key={index}
                                className="bg-white border-b cursor-pointer hover:bg-[#F0F0F0]"
                              >
                                <th
                                  scope="row"
                                  className="px-6 py-2 text-gray-900 font-semibold whitespace-nowrap  xs:px-2 xs:max-w-[120px] xs:overflow-x-scroll"
                                >
                                  {items?.Value}
                                </th>
                                {offerCampaign?.isValid ? (
                                  <td className="px-6 py-2 border-l border-r text-tahiti-800 font-semibold xs:px-2">
                                    ৳{" "}
                                    {qtyRangePrice == null
                                      ? Math.ceil(
                                          items?.Price +
                                            (items?.Price * priceInc) / 100
                                        ) -
                                        (Math.ceil(
                                          items?.Price +
                                            (items?.Price * priceInc) / 100
                                        ) *
                                          offerCampaign?.percent) /
                                          100
                                      : Math.ceil(qtyRangePrice) -
                                        (Math.ceil(qtyRangePrice) *
                                          offerCampaign?.percent) /
                                          100}{" "}
                                    <br />
                                    <span className="text-[11px] text-gray-400 line-through">
                                      ৳{" "}
                                      {qtyRangePrice == null
                                        ? Math.ceil(
                                            items?.Price +
                                              (items?.Price * priceInc) / 100
                                          )
                                        : Math.ceil(qtyRangePrice)}
                                    </span>
                                  </td>
                                ) : (
                                  <td className="px-6 py-2 border-l border-r text-tahiti-800 font-semibold">
                                    ৳{" "}
                                    {qtyRangePrice == null
                                      ? Math.ceil(
                                          items?.Price +
                                            (items?.Price * priceInc) / 100
                                        )
                                      : Math.ceil(qtyRangePrice)}{" "}
                                  </td>
                                )}
                                <td className="px-4 py-2">
                                  {items?.qty == 0 ? (
                                    <div>
                                      <button
                                        onClick={() => addQty(items, index)}
                                        className="bg-tahiti-500 text-tahiti-50 font-bold px-4 py-1 w-[80px] rounded-md"
                                      >
                                        Add
                                      </button>
                                    </div>
                                  ) : (
                                    <div className=" flex items-center justify-center ">
                                      <button
                                        onClick={() => subQty(items, index)}
                                        className="bg-tahiti-500 rounded-sm text-[18px] text-tahiti-50 w-[30px] h-[30px] font-extrabold "
                                      >
                                        -
                                      </button>
                                      <input
                                        type="number"
                                        pattern="\d*"
                                        inputMode="number"
                                        value={items.qty}
                                        onChange={(e) =>
                                          inputQty(e.target.value, index, items)
                                        }
                                        className="outline-none w-[50px] h-[30px] text-center border-t-[2px] border-b-[2px] border-tahiti-500"
                                      />
                                      <button
                                        onClick={() => addQty(items, index)}
                                        className="bg-tahiti-500 rounded-sm text-[18px] text-tahiti-50 w-[30px] h-[30px] font-extrabold"
                                      >
                                        +
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="py-1 text-center">Scroll More Size</div>
                    </>
                  )}
                  {nonVariation == null ? null : (
                    <div className="relative overflow-x-auto border max-h-[250px] mt-3 sm:rounded-lg left-side">
                      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 border">
                        <thead className="text-xs text-gray-700 uppercase bg-[#F0F0F0] dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3 ">
                              Price
                            </th>
                            <th scope="col" className="px-6 py-3  ">
                              Quantity
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 cursor-pointer hover:bg-[#F0F0F0]">
                            {offerCampaign?.isValid ? (
                              <td className="px-6 py-2 border-l border-r text-tahiti-800 font-semibold">
                                ৳{" "}
                                {qtyRangePrice == null
                                  ? Math.ceil(
                                      nonVariation?.Price +
                                        (nonVariation?.Price * priceInc) / 100
                                    ) -
                                    ( Math.ceil(
                                      nonVariation?.Price +
                                        (nonVariation?.Price * priceInc) / 100
                                    )  * offerCampaign?.percent) /
                                      100
                                  : qtyRangePrice -
                                    (qtyRangePrice * offerCampaign?.percent) /
                                      100}{" "}
                                <br />
                                <span className="text-[11px] text-gray-400 line-through">
                                  ৳{" "}
                                  {qtyRangePrice == null
                                    ? Math.ceil(
                                        nonVariation?.Price +
                                          (nonVariation?.Price * priceInc) / 100
                                      )
                                    : Math.ceil(qtyRangePrice)}
                                </span>
                              </td>
                            ) : (
                              <td className="px-6 py-2 border-l border-r text-tahiti-800 font-semibold">
                                ৳{" "}
                                {qtyRangePrice == null
                                  ? Math.ceil(
                                      nonVariation?.Price +
                                        (nonVariation?.Price * priceInc) / 100
                                    )
                                  : Math.ceil(qtyRangePrice)}{" "}
                              </td>
                            )}
                            <td className="px-4 py-2">
                              {nonVariation?.qty == 0 ? (
                                <div>
                                  <button
                                    onClick={() => addNonQty()}
                                    className="bg-tahiti-500 text-tahiti-50 font-bold px-4 py-1 w-[80px] rounded-md"
                                  >
                                    Add
                                  </button>
                                </div>
                              ) : (
                                <div className=" flex items-center justify-center ">
                                  <button
                                    onClick={() => subNonQty()}
                                    className="bg-tahiti-500 rounded-sm text-[18px] text-tahiti-50 w-[30px] h-[30px] font-extrabold "
                                  >
                                    -
                                  </button>
                                  <input
                                    type="text"
                                    pattern="\d*"
                                    inputMode="numeric"
                                    value={nonVariation?.qty}
                                    onChange={(e) =>
                                      inputNonQty(e.target.value)
                                    }
                                    className="outline-none w-[50px] h-[30px] text-center border-t-[2px] border-b-[2px] border-tahiti-500"
                                  />
                                  <button
                                    onClick={() => addNonQty()}
                                    className="bg-tahiti-500 rounded-sm text-[18px] text-tahiti-50 w-[30px] h-[30px] font-extrabold"
                                  >
                                    +
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  <PriceTable totalQty={totalQty} totalPrice={totalPrice} />
                  <div className="mt-5 grid grid-cols-7 gap-2">
                    <div
                      onClick={() => addToCart()}
                      className="bg-tahiti-500 flex items-center justify-center col-span-3 py-2 rounded-md cursor-pointer"
                    >
                      <AiOutlineShoppingCart className="text-tahiti-50 text-[20px] mr-4" />
                      <div className="text-white font-bold text-[18px] xs:text-[14px]">
                        Add To Cart
                      </div>
                    </div>
                    <div onClick={() => buyNow()}className="bg-tahiti-500 flex items-center justify-center col-span-3 py-2 rounded-md cursor-pointer">
                      <BsBagCheck className="text-tahiti-50 text-[20px] mr-4" />
                      <div className="text-white font-bold text-[18px] xs:text-[14px]">
                        Buy Now
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        wishStatus ? removeWish() : addWish();
                      }}
                      className=" border-[3px] flex items-center justify-center col-span-1 py-2 rounded-md cursor-pointer"
                    >
                      <BsFillHeartFill
                        className={`text-[20px] ${
                          wishStatus ? "text-red-600" : ""
                        }`}
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="text-[16px] font-semibold pb-1">
                      Product Code:{" "}
                      <span className="text-[16px] font-light">
                        {productDetails?.productId}
                      </span>
                    </div>
                    <div className="text-[16px] font-semibold pb-1">
                      Approximate Weight:{" "}
                      <span className="text-[16px] font-light">
                        {productDetails?.PhysicalParameters?.Weight} Kg
                      </span>
                    </div>
                    <div className="text-[16px] font-semibold pb-1">
                      Total Sold:{" "}
                      <span className="text-[16px] font-light">1634541</span>
                    </div>
                    <div className="flex">
                      <div className="cursor-pointer">
                        <Image
                          src={"/assets/footer/facebook.svg"}
                          width={30}
                          height={30}
                          alt="logo"
                        />
                      </div>
                      <div className="pl-2 cursor-pointer">
                        <Image
                          src={"/assets/footer/instagram.svg"}
                          width={30}
                          height={30}
                          alt="logo"
                        />
                      </div>
                      <div className="flex items-center justify-center bg-tahiti-500 rounded-2xl px-2 ml-2 text-tahiti-50 cursor-pointer">
                        <MdOutlineContentCopy className="mr-1" />
                        Copy
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {productDetails?.VendorItems.length > 0 ? (
              <div className="mt-2 bg-tahiti-50">
                <div className="py-3 px-3 text-[18px] font-semibold border-b">
                  From The Same Seller
                </div>
                <div className="py-4">
                  <div className="grid grid-cols-5 gap-3 px-4 xs:grid-cols-2 xs:gap-2 xs:px-1 xms:grid-cols-2 xms:gap-2 xms:px-1 xls:grid-cols-2 xls:gap-2 xls:px-1 md:grid-cols-3">
                    <ProductCard productList={productDetails?.VendorItems} />
                  </div>
                </div>
              </div>
            ) : null}
            <div className="mt-3 bg-tahiti-50 rounded-sm">
              <div className="py-3 flex gap-3 items-center justify-center">
                <div>
                  <button
                    onClick={() => settabChange(1)}
                    className={`py-3 px-4 border ${
                      tabChange == 1
                        ? " bg-tahiti-500 text-white"
                        : " text-black"
                    } border-tahiti-500 rounded-md text-[18px] font-semibold xs:text-[14px] xms:text-[14px] xls:text-[14px]`}
                  >
                    Description
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => settabChange(2)}
                    className={`py-3 px-4 border ${
                      tabChange == 2
                        ? " bg-tahiti-500 text-white"
                        : "text-black"
                    } border-tahiti-500 rounded-md text-[18px] font-semibold xs:text-[14px] xms:text-[14px] xls:text-[14px]`}
                  >
                    Specification
                  </button>
                </div>
                {/* <div>
                  <button
                    className={`py-3 px-4 border ${
                      tabChange == 3
                        ? " bg-tahiti-500 text-white"
                        : "text-black"
                    } border-tahiti-500 rounded-md text-[18px] font-semibold `}
                  >
                    Seller Info
                  </button>
                </div> */}
              </div>
              <div className="px-10 py-2 xs:px-2 xms:px-2 xls:px-2">
                {tabChange == 2 ? (
                  <div className="border ">
                    {productDetails?.specs?.map((item, index) => (
                      <div key={index} className="grid grid-cols-2 rounded-sm xs:grid-cols-1 xms:grid-cols-1 xls:grid-cols-1 ">
                        <div className="col-span-1 flex items-center justify-center py-2 bg-[#E9EFF0] font-semibold border-r px-2">
                          {Object.keys(item)}
                        </div>
                        <div
                          className={`col-span-1 flex items-center justify-center py-2 px-2 text-center hover:bg-[#EEEEEE] border-b overflow-x-auto  ${
                            index % 2 == 0 ? "bg-[#f8f8f8]" : "bg-tahiti-50"
                          }`}
                        >
                          
                          {Object.values(item).toString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : tabChange == 1 ? (
                  <div className="">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: productDetails?.Description,
                      }}
                    ></div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="xs:mt-2">
            <div className="bg-tahiti-50 py-3 rounded-sm">
              <div className="flex items-center justify-center py-1">
                <FaHome className="text-[40px] text-tahiti-500 flex items-center justify-center" />
              </div>
              <div className="text-[16px] font-semibold text-center">
                {productDetails?.VendorName}
              </div>
              <div className="text-[14px] text-center">卖家商店名称和信息</div>
              <div className=" flex justify-center py-1">
                <div className="bg-tahiti-900 rounded-2xl px-2 text-tahiti-50">
                  Seller Score: {productDetails?.VendorScore}
                </div>
              </div>
              <div className="flex  items-center justify-evenly py-1">
                <div className="text-center">
                  4.9
                  <br />
                  Item
                </div>
                <div className="text-center">
                  4.9
                  <br />
                  Delivery
                </div>
                <div className="text-center">
                  4<br />
                  Service
                </div>
              </div>
              <div className=" flex justify-center py-1">
                <div className="bg-tahiti-500 rounded-2xl px-2 text-tahiti-50 py-1 cursor-pointer">
                  Visit Store
                </div>
              </div>
            </div>

            <div className="bg-tahiti-50 rounded-sm mt-2">
              <Conditions />
            </div>
            <div className="bg-tahiti-50 rounded-sm mt-2">
              <ShippingCharge />
            </div>
            <div className="max-h-[120rem] overflow-y-auto left-side mt-2">
              <div className="bg-tahiti-50 rounded-sm">
                <div className="text-center py-3 text-[16px] font-semibold border-b">
                  Similar Products
                </div>
                <div className="py-4">
                  <div className="grid grid-cols-2 gap-3 px-2">
                    <ProductCard />
                  </div>
                </div>
              </div>
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
        <div className=" w-[500px] xs:max-w-[300px] xs:max-h-[400px] xms:max-w-[310px] xms:max-h-[400px] xls:max-w-[370px] xls:max-h-[400px] sm:max-h-[500px]">
          {ModalTab == 0 ? (
            <div>
              <div className="border-b px-3 py-4">
                Minimum Quantity{" "}
                {productDetails?.QuantityRanges.length > 0
                  ? productDetails?.QuantityRanges[0]?.MinQuantity
                  : 3}{" "}
                Piece
              </div>
              <div className="flex items-center justify-end px-3 py-4">
                <div
                  onClick={() => setIsOpen(false)}
                  className="bg-tahiti-500 text-tahiti-50 text-[14px] py-2 px-4 rounded-md cursor-pointer"
                >
                  Ok
                </div>
              </div>
            </div>
          ) : ModalTab == 1 ? (
            <div>
              <div className="border-b px-3 py-4">
                Minimum Total Price 1000 Taka
              </div>
              <div className="flex items-center justify-end px-3 py-4">
                <div
                  onClick={() => setIsOpen(false)}
                  className="bg-tahiti-500 text-tahiti-50 text-[14px] py-2 px-4 rounded-md cursor-pointer"
                >
                  Ok
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="border-b px-3 py-4">Add to cart Successfully</div>
              <div className="flex items-center gap-3 py-4 px-3 justify-end">
                <div
                  onClick={() => setIsOpen(false)}
                  className="bg-[#AAAAAA] text-tahiti-50 text-[14px] py-2 px-4 rounded-md cursor-pointer"
                >
                  Shop More
                </div>
                <div
                  onClick={() => router.push("/cart")}
                  className="bg-tahiti-500 text-tahiti-50 text-[14px] py-2 px-4 rounded-md cursor-pointer"
                >
                  Go To Cart
                </div>
              </div>
            </div>
          )}

        </div>
      </Modal>
    </div>
  );
};

export default SingleProduct;
