import React, { useEffect, useState } from "react";
import ProductCard from "@/components/productSection/productCard";
import ReactPaginate from "react-paginate";
import { FaHome } from "react-icons/fa";

const StoreWiseProduct = () => {
  let arr = [
   
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];
  const [itemOffset, setItemOffset] = useState(0);
  let itemsPerPage = 20;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = arr.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(arr.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % arr.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div className="mt-[65px]">
      <div className="p-2">
        <div className="bg-tahiti-50 py-4 px-3 flex items-center justify-between">
          <div className="font-bold text-[14px] flex items-center ">
            <div>
              <FaHome className="text-[50px] text-tahiti-500" />
            </div>
            <div className="pl-2">
              <div>
                <b>SELLER: </b>
                <b className="text-tahiti-500">ABB B2B 2552320535B67VM </b>
              </div>
              <div>
                <b>Seller Name: </b>
                <b className="">迪莱雅女包</b>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <input
                className="border py-2 px-1 text-[12px] outline-tahiti-500 rounded-md"
                placeholder="Min Price"
              />
            </div>
            <div>-</div>
            <div>
              <input
                className="border py-2 px-1 text-[12px] outline-tahiti-500 rounded-md"
                placeholder="Max Price"
              />
            </div>
            <div>
              <button className=" rounded-md text-[14px] w-[100px] h-[34px] bg-tahiti-500 text-tahiti-50">
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-tahiti-50 p-2">
          <div className="grid grid-cols-7 gap-3">
            <ProductCard product={currentItems} />
          </div>
        </div>
        <div className="py-8">
        <div className="mt-3 bg-tahiti-50 p-2 py-5 flex items-center justify-center ">
          <ReactPaginate
            className="flex items-center justify-center gap-5 list-none"
            breakLabel="..."
            nextLabel=" >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< "
            renderOnZeroPageCount={null}
            activeClassName="bg-[#00619a] rounded-md py-[5px] px-[10px] flex item-center justify-center text-[#fff]"
            pageClassName="border rounded-sm py-[5px] px-[10px] w-full h-full cursor-pointer"
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default StoreWiseProduct;
