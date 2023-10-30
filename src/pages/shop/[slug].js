import React, { useEffect, useState } from "react";
import ProductCard from "@/components/productSection/productCard";
import ReactPaginate from "react-paginate";

const ShopWiseProduct = () => {
    let arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}, {}, {}, {}, ];
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
    <div className="mt-[65px] xs:mt-[108px] xms:mt-[108px] xls:mt-[108px] sm:mt-[108px]">
      <div className="p-2 xs:p-0 xms:p-0 xls:p-0 sm:p-0">
        <div className="bg-tahiti-50 py-4 px-3 flex items-center justify-between xs:flex-col xs:items-start xs:px-1 xms:flex-col xms:items-start xms:px-1 xls:flex-col xls:items-start xls:px-1 sm:flex-col sm:items-start sm:px-1">
          <div className="font-bold text-[14px]">
            SHOWING RESULTS FROM - {"    "}
            <span className="text-tahiti-500">LADIES PURSE</span>
          </div>
          <div className="flex items-center gap-3 xs:mt-2">
            <div className="">
              <input
                className="border py-2 px-1 text-[12px] outline-tahiti-500 rounded-md xs:w-full xms:w-full xls:w-full"
                placeholder="Min Price"
              />
            </div>
            <div className="">-</div>
            <div className="">
              <input
                className="border py-2 px-1 text-[12px] outline-tahiti-500 rounded-md xs:w-full xms:w-full xls:w-full "
                placeholder="Max Price"
              />
            </div>
            <div className="">
              <button className=" rounded-md text-[14px] w-[100px] h-[34px] bg-tahiti-500 text-tahiti-50 ">
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-tahiti-50 p-2">
          <div className="grid grid-cols-7 gap-3 xs:grid-cols-2 xs:gap-1 xs:px-[0px] xms:grid-cols-2 xms:gap-1 xms:px-[0px] xls:grid-cols-2 xls:gap-1 xls:px-[0px] sm:grid-cols-4 sm:gap-1 sm:px-[0px] md:grid-cols-4 lg:grid-cols-5">
            <ProductCard product={currentItems }/>
          </div>
        </div>
        <div className="mt-3 bg-tahiti-50 p-2 py-5 flex items-center justify-center xs:mb-2 xms:mb-2 xls:mb-2 sm:mb-2">
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
            pageClassName="border rounded-sm py-[5px] px-[10px] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopWiseProduct;
