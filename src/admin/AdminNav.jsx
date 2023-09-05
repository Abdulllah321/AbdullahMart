import React from "react";
import { Container } from "reactstrap";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrSettingsOption } from "react-icons/gr";
// import useAuth from "../custom hook/useAuth";
import { motion } from "framer-motion";
import user from "../assets/images/user-icon.png";
import "../components/styles/admin-nav.css";

const AdminNav = () => {
  // const { currentUser } = useAuth();

  return (
    <header className="admin-header">
      <div className="admin-nav-top">
        <Container>
          <div className="admin-nav-wrapper-top">
            <div className="logo">
              <h2>AbdullahMart</h2>
            </div>

            <div className="search-box">
              <input type="text" placeholder="Search..." />
              <span>
                <PiMagnifyingGlassBold />
              </span>
            </div>

            <div className="admin-nav-top-right">
              <span>
                <IoMdNotificationsOutline />
              </span>
              <span>
                <GrSettingsOption />
              </span>
                <motion.img whileTap={{ scale: 1.2 }} src={user} alt="" />
              
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default AdminNav;
