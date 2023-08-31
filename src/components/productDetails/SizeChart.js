import React from "react";

const SizeChart = () => {
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
  ];
  return (
    <div className="relative overflow-x-auto border max-h-[250px] sm:rounded-lg left-side">
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 border">
        <thead className="text-xs text-gray-700 uppercase bg-[#F0F0F0] dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 min-w-[200px]">
              Size
            </th>
            <th scope="col" className="px-6 py-3 ">
              Price
            </th>
            <th scope="col" className="px-6 py-3  ">
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {arr.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 cursor-pointer hover:bg-[#F0F0F0]"
            >
              <th
                scope="row"
                className="px-6 py-2 text-gray-900 font-semibold whitespace-nowrap dark:text-white"
              >
                M
              </th>
              <td className="px-6 py-2 border-l border-r text-tahiti-800 font-semibold">
                ৳ 683.05 <br />
                <span className="text-[13px] text-gray-400 line-through">
                  ৳ 719
                </span>
              </td>
              <td className="px-4 py-2">
                <div>
                  <button className="bg-tahiti-100 text-tahiti-50 font-bold px-4 py-1 w-[80px] rounded-md">
                    Add
                  </button>
                </div>
                {/* <div className=" flex items-center justify-center ">
                                <button className="bg-tahiti-100 rounded-sm text-[18px] text-tahiti-50 w-[30px] h-[30px] font-extrabold">-</button>
                                <input className='outline-none w-[50px] h-[30px] text-center'/>
                                <button className='bg-tahiti-100 rounded-sm text-[18px] text-tahiti-50 w-[30px] h-[30px] font-extrabold'>+</button>
                            </div> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SizeChart;
