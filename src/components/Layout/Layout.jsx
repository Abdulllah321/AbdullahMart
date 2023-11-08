import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../routers/Routers";

import AdminNav from "../../admin/AdminNav";

import { useLocation } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />}
      <div>
        <Routers />
        <div className="whatsapp-float">
          <a href="https://wa.me/923162050657" target="_blank" rel="noreferrer">
            <IoLogoWhatsapp />
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
