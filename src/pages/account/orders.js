import request from "@/lib/request";
import axios from "axios";
import React, { useEffect, useState } from "react";


export async function getStaticProps(){
  let res = await axios.get("https://api.publicapis.org/entries");
  return {
    props:{
      list: res?.data?.entries || []
    },
    revalidate: 120,
  }
}

const Orders = ({list}) => {
  // const [list, setlist] = useState([]);

  // useEffect(() => {
  //   const dataList = async () => {
  //     let res = await axios.get("https://api.publicapis.org/entries");
  //     setlist(res?.data?.entries);
  //   };
  //   dataList();
  // }, []);

  return (
    <div className="mt-[65px] min-h-[50rem] p-2">
      {list?.length == 0 ? (
        <div>loading....</div>
      ) : (
        <>
          {list?.map((item, index) => (
            <div key={index}>
              {index + 1} : {item?.Description}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Orders;
