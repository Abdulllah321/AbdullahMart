import React, { useEffect, useState, useRef } from "react";
import "./Header.css";
import { motion } from "framer-motion";
import { Container, Row } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  RiShoppingBagLine,
  RiHeartLine,
  RiMenuFoldLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import logo from "../../assets/images/eco-logo.png";
import user from "../../assets/images/user-icon.png";
import useAuth from "../../custom hook/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(cartActions.loadCartItems(cartItems));
  }, [dispatch, cartItems]);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const profileActionRef = useRef(null);
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      dispatch(cartActions.loadCartItems(JSON.parse(storedCartItems)));
    }
  }, [dispatch]);

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const toggleBtn = useRef()

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 80) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuRef = useRef(null);

  const menuToggle = () => menuRef.current.classList.toggle("active-menu");

  const nav__links = [
    {
      path: "home",
      display: "Home",
    },
    {
      path: "shop",
      display: "Shop",
    },
    {
      path: "cart",
      display: "Cart",
    },
  ];

  const navigateToCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    const closeOpen = (e) => {
      if(e.target !== toggleBtn.current) {
        setIsOpen(false);
      }
      // console.log(e.target);
    };
    document.body.addEventListener("click", closeOpen);
    
    return ()=>
    document.body.removeEventListener("click", closeOpen);
  });

  return (
    <header className={`header ${scrolled ? "sticky-header" : ""}`}>
      <Container>
        <Row>
          <div className="nav_wrapper">
            <NavLink to="home">
              <div className="logo">
                <img src={logo} alt="" />
                <div className="text">
                  <h1>AbdullahMart</h1>
                </div>
              </div>
            </NavLink>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      activeclassname="active"
                      className="nav-link"
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav-icons">
              <span className="heart-icon">
                <RiHeartLine />
                <span className="badge">1</span>
              </span>
              <span className="cart-icon" onClick={navigateToCart}>
                <RiShoppingBagLine />
                <span className="badge">{totalQuantity}</span>
              </span>

              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser?.photoURL || user}
                  alt=""
                  onClick={() => setIsOpen((prev) => !prev)}
                  ref={toggleBtn}
                />
                <div
                  className={`profile-actions ${
                    isOpen ? "show-profileActions" : ""
                  }`}
                >
                  {currentUser ? (
                    <div>
                      <span>{currentUser.displayName}</span>
                      <span onClick={logout}>
                        <RiLogoutBoxLine /> &nbsp; Logout
                      </span>
                    </div>
                  ) : (
                    <div>
                      <Link to="/dashboard">dashboard</Link>
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile-menu">
                <RiMenuFoldLine onClick={menuToggle} />
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
