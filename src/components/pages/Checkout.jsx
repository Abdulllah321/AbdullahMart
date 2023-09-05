import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../custom hook/useAuth";
import { toast } from "react-toastify";
import Helmet from "../Helmet/Helmet";
import CommonSection from "../UI/CommonSection";

import "../styles/checkout.css";

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

const handlePlaceOrder = () => {
  const { name, email, phoneNumber, address, city, postalCode, country } =
    formData;

  const emptyFields = [];

  if (name.trim() === "") {
    emptyFields.push("Name");
  }

  if (email.trim() === "") {
    emptyFields.push("Email");
  }

  if (phoneNumber.trim() === "") {
    emptyFields.push("Phone number");
  }

  if (address.trim() === "") {
    emptyFields.push("Street address");
  }

  if (city.trim() === "") {
    emptyFields.push("City");
  }

  if (postalCode.trim() === "") {
    emptyFields.push("Postal Code");
  }

  if (country.trim() === "") {
    emptyFields.push("Country");
  }

  if (emptyFields.length > 0) {
    emptyFields.forEach((field) => {
      toast.error(`${field} is required`);
    });
  } else {
    if (currentUser) {
      navigate("/shop");
      toast.success("Order placed successfully");
    } else {
      toast.info("Please log in to place an order");
      navigate("/login");
    }
  }
};

  return (
    <Helmet title="Checkout">
      <CommonSection title={"Checkout"} />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing-form">
                <FormGroup className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="number"
                    name="phoneNumber"
                    placeholder="Phone number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="text"
                    name="address"
                    placeholder="Street address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="number"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout-cart">
                <h6>
                  Total Qty: <span>{totalQty} items</span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    Shipping
                    <br />
                    free shipping
                  </span>
                  <span>$0</span>
                </h6>
                <h4>
                  Total Cost <span>${totalAmount}</span>
                </h4>
                <button
                  className="buy-btn auth-btn w-100"
                  onClick={handlePlaceOrder}
                >
                  Place an order
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
