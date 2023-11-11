import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../custom hook/useAuth";
import { toast } from "react-toastify";
import { Col } from "reactstrap";

const ProtectedRoute = () => {
  const { currentUser, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay, replace this with your actual loading logic
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  if (loading) {
    return (
      <Col lg="12">
        <div className="loader d-flex align-items-center justify-content-center">
          <div className="spinner"></div>
        </div>
      </Col>
    );
  }

  if (!currentUser) {
    toast.error("Please log in to access this page.");
    return <Navigate to="/login" />;
  }

  if (isAdmin) {
    return <Outlet />;
  } else {
    toast.error("Only admin can access admin Panel page.");
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
