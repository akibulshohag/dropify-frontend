import Image from 'next/image'
import React from 'react'

const PageNotFound = () => {
  return (
    <div className="flex min-h-screen flex-col mt-[65px] xs:mt-[95px]">
        <div className="flex items-center justify-center min-h-screen">
            <div className="">
                <Image src="/assets/account/404.gif" width={300} height={300} alt="404"/>
            </div>
        </div>
    </div>
  )
}

export default PageNotFound