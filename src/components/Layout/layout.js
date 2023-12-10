import { Fragment,useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SideCategoryWeb from "./SideCategoryWeb";
import { useRouter } from "next/router";
import DashboardMenu from "./DashboardMenu";
import BottomNavbar from "./BottomNavbar/BottomNavbar";
import LeftCategoryPhone from '@/components/Layout/LeftCategoryPhone/RsLeftMenu'
import ProfileMenuPhone from '@/components/Layout/ProfileMenuPhone'
import request from "@/lib/request";
import { useStatus } from "@/context/contextStatus";

const Layout = ({ children }) => {
  const router = useRouter();
  const {setpriceInc,setofferCampaign} = useStatus()

  const pagesWithoutSideCategory = ["/account", "/account/orders","/account/settings","/account/payments","/account/delivery","/account/orders/[orderId]","/payment/[orderId]"];
  const shouldHideSideCategory = pagesWithoutSideCategory.includes(
    router.pathname
  );

  useEffect(() => {
    const priceInc=async()=>{
       let res =await request('platform/get-price-increase')
       if(res?.success){
        setpriceInc(res?.data?.priceInc)
       }
       let res1 = await request('platform/get-offer')
       if(res1?.success){
        setofferCampaign(res1?.data)
       }
    }
    priceInc()
  }, [])
  

  return (
    <div className="font-body">
      <Navbar />
      <div className="flex">
        {!shouldHideSideCategory ? <SideCategoryWeb /> : <DashboardMenu />}
        <div className="flex-1 overflow-auto ml-[250px] xs:ml-0 xms:ml-0 xls:ml-0 sm:ml-0 md:ml-[200px] lg:ml-[200px]">
        {!shouldHideSideCategory ? '' : <ProfileMenuPhone />}

          <Fragment>{children}</Fragment>
          <Footer />
          <LeftCategoryPhone/>
          <BottomNavbar/>
        </div>
      </div>
    </div>
  );
};

export default Layout;
