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
        <div className="px-4 py-4 text-[18px] font-bold">Popular</div>
        <div className="grid grid-cols-4 gap-3 px-4">
        {loading ?<>
                <div className="shadow-md p-2">
                <div>
                  <Skeleton height={200} />
                </div>
                <Skeleton count={3} />
                </div>
                <div className="shadow-md p-2">
                <div>
                  <Skeleton height={200} />
                </div>
                <Skeleton count={3} />
                </div>
                <div className="shadow-md p-2">
                <div>
                  <Skeleton height={200} />
                </div>
                <Skeleton count={3} />
                </div>
                <div className="shadow-md p-2">
                <div>
                  <Skeleton height={200} />
                </div>
                <Skeleton count={3} />
                </div>
                
                </>
              :
             <ProductCard product={arr}/>
              }
       
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
