import { Fragment } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SideCategoryWeb from "./SideCategoryWeb";
import { useRouter } from "next/router";
import DashboardMenu from "./DashboardMenu";

const Layout = ({ children }) => {
  const router = useRouter();

  const pagesWithoutSideCategory = ["/account", "/account/orders","/account/settings"];
  const shouldHideSideCategory = pagesWithoutSideCategory.includes(
    router.pathname
  );

  return (
    <div className="font-body">
      <Navbar />
      <div className="flex">
        {!shouldHideSideCategory ? <SideCategoryWeb /> : <DashboardMenu />}
        <div className="flex-1 overflow-auto ml-[250px]">
          <Fragment>{children}</Fragment>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
