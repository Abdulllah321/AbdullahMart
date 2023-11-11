import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import AddProducts from "../../admin/AddProducts";
import AllProducts from "../../admin/AllProducts";
import Dashboard from "../../admin/Dashboard";
import Users from "../../admin/Users";
import useAuth from "../../custom hook/useAuth";
import Orders from "../../admin/Orders";

const Routers = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  // Scroll to the top whenever the URL changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      {currentUser ? (
        <Route path="checkout" element={<Checkout />} />
      ) : (
        <Route path="login" element={<Login />} />
      )}

      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="all-products" element={<AllProducts />} />
        <Route path="add-products" element={<AddProducts />} />
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

export default Routers;
