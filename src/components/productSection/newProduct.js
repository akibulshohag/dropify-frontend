import React, {useState} from "react";
import Image from "next/image";
import ProductCard from "./productCard";
import Skeleton from 'react-loading-skeleton';



const NewProduct = () => {
  const [loading, setloading] = useState(true)
  let arr = [{}, {}, {}, {}];
  return (
    <div>
      <div className="col-span-1 bg-tahiti-50 rounded-sm pb-4">
        <div className="px-4 py-4 text-[18px] font-bold xs:px-2 xms:px-2 xls:px-2 sm:px-2">New</div>
        <div className="grid grid-cols-4  gap-3 px-4 xs:grid-cols-2 xs:gap-1 xs:px-[0px] xms:grid-cols-2 xms:gap-1 xms:px-[0px] xls:grid-cols-2 xls:gap-1 xls:px-[0px] sm:grid-cols-4 sm:gap-1 sm:px-[0px]">
       
             <ProductCard product={arr}/>
             
       
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
