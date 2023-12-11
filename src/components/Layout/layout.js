import { Fragment,useEffect,useState } from "react";
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
import Modal from "react-modal";
import Image from "next/image";
import { AiFillCloseCircle } from "react-icons/ai";
import { hostname } from "@/lib/config";

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
    zIndex:99
  },
};
const Layout = ({ children }) => {
  const router = useRouter();
  const {setpriceInc,setofferCampaign} = useStatus()
  const [modalIsOpen, setIsOpen] = useState(false);
  const [popUpImage, setpopUpImage] = useState("")


  const pagesWithoutSideCategory = ["/account", "/account/orders","/account/settings","/account/payments","/account/delivery","/account/orders/[orderId]","/payment/[orderId]"];
  const shouldHideSideCategory = pagesWithoutSideCategory.includes(
    router.pathname
  );
  function closeModal() {
    setIsOpen(false);
  }


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
       let res2 = await request('content/get-popup?device=web')
       if(res2?.success){
         setpopUpImage(res2?.data?.image)
        if(res2?.data?.isActive){
          setIsOpen(true)
        }
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
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        // ariaHideApp={false}
      >
        <div className=" w-[500px] xs:max-w-[300px] xs:max-h-[400px] xms:max-w-[310px] xms:max-h-[400px] xls:max-w-[370px] xls:max-h-[400px] sm:max-h-[500px]">
         
         <div className="relative">
          <Image src={`${hostname}/${popUpImage}`} width={500} height={500} alt="pop"/>
          <div className="absolute top-1 right-1 text-[20px] ">
          <AiFillCloseCircle onClick={closeModal} className="text-tahiti-500 cursor-pointer"/>
          </div>
         </div>
        </div>
      </Modal>
    </div>
  );
};

export default Layout;
