import React from 'react'
import request from '@/lib/request'

const Faq = ({data}) => {
  return (
    <div className="flex  flex-col mt-[65px] xs:mt-[108px] xms:mt-[108px] xls:mt-[108px] sm:mt-[108px]">
        <div className="p-2 xs:p-0 xms:p-0 xls:p-0 sm:p-0">
        <div className="bg-tahiti-50 min-h-screen">
          <div className="px-4 py-4 border-b font-semibold text-[18px]">
          Frequently Asked Question
          </div>
            <div className="px-5 py-2">
              <div dangerouslySetInnerHTML={{ __html: `${data?.faq}` }}></div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Faq

export async function getServerSideProps() {
  let res = await request("platform/faq");
  return {
    props: {
      data: res?.data || null,
    },
  };
}