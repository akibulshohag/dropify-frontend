import { Fragment } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SideCategoryWeb from "./SideCategoryWeb";

const Layout = ({ children }) => {
  return (
    <div className="font-body">
      <Navbar />
      <div className="flex">
        <SideCategoryWeb/>
        <div className="flex-1 overflow-auto ml-[250px]">
          <Fragment>{children}</Fragment>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
