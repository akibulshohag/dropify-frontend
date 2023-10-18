import { Fragment } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SideCategoryWeb from "./SideCategoryWeb";
import { useRouter } from "next/router";
import DashboardMenu from "./DashboardMenu";
import BottomNavbar from "./BottomNavbar/BottomNavbar";

const Layout = ({ children }) => {
  const router = useRouter();

  const pagesWithoutSideCategory = ["/account", "/account/orders","/account/settings","/account/payments","/account/delivery"];
  const shouldHideSideCategory = pagesWithoutSideCategory.includes(
    router.pathname
  );

  return (
    <div className="font-body">
      <Navbar />
      <div className="flex">
        {!shouldHideSideCategory ? <SideCategoryWeb /> : <DashboardMenu />}
        <div className="flex-1 overflow-auto ml-[250px] xs:ml-0 xms:ml-0 xls:ml-0 sm:ml-0">
          <Fragment>{children}</Fragment>
          <Footer />
          <BottomNavbar/>
        </div>
      </div>
    </div>
  );
};

export default Layout;
