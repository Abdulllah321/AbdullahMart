import React from "react";
import { Container, Row } from "reactstrap";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuSettings } from "react-icons/lu";
// import useAuth from "../custom hook/useAuth";
import { motion } from "framer-motion";
// import user from "../assets/images/user-icon.png";
import "../components/styles/admin-nav.css";
import useAuth from "../custom hook/useAuth";
import { Link, NavLink } from "react-router-dom";

const admin_nav = [
  {
    display: "Dashboard",
    path: "/dashboard",
  },
  {
    display: "Add Products",
    path: "/add-products",
  },
  {
    display: "All Products",
    path: "/all-products",
  },
  {
    display: "Orders",
    path: "/orders",
  },
  {
    display: "Users",
    path: "/users",
  },
];

const AdminNav = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <header className="admin-header">
        <div className="admin-nav-top">
          <Container>
            <div className="admin-nav-wrapper-top">
              <div className="logo">
                <Link to={`/`}>
                 <h2>AbdullahMart</h2>
                </Link>
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
                  <LuSettings />
                </span>
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser && currentUser?.photoURL}
                  alt=""
                />
              </div>
            </div>
          </Container>
        </div>
      </header>
      <section className="admin_menu p-0">
        <Container>
          <Row>
            <div className="admin_navigation ">
              <ul className="admin_menu_list">
                {admin_nav.map((item, index) => (
                  <li className="admin_menu_item" key={index}>
                    <NavLink to={item.path} className={navClass => navClass.isActive ? "active_admin-menu" : ""}>{item.display}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
