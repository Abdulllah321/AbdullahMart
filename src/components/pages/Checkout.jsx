import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../../custom hook/useAuth";
import { toast } from "react-toastify";
import Helmet from "../Helmet/Helmet";
import CommonSection from "../UI/CommonSection";

import "../styles/checkout.css";

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);
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

   const orderItems = cartItems.map((item) => ({
     productName: item.productName,
     price: item.price,
     quantity: item.quantity,
   }));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
     const { name, email, phoneNumber, address, city, postalCode, country } =
       formData;

  const orderData = {
    name,
    email,
    phoneNumber,
    address,
    city,
    postalCode,
    country,
    totalQty,
    totalAmount,
    cartItems: orderItems,
  };

    const res = fetch(
      "https://abdullahmart-94047-default-rtdb.asia-southeast1.firebasedatabase.app/order.json",
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );
 

    // const requiredFields = [
    //   "Name",
    //   "Email",
    //   "Phone number",
    //   "Street address",
    //   "City",
    //   "Postal Code",
    //   "Country",
    // ];
    // const emptyFields = requiredFields.filter(
    //   (field) => formData[field.toLowerCase()].trim() === ""
    // );

    // if (emptyFields.length > 0) {
    //   emptyFields.forEach((field) => {
    //     toast.error(`${field} is required`);
    //   });
    // } else {
      if (currentUser && res) {
        navigate("/shop");
        toast.success("Order placed successfully");
      }
      if (!currentUser) {
        toast.info("Please log in to place an order");
        navigate("/login");
      }
    // }
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
                <h2 className="d-block text-align-center border-bottom border-1 border-white py-2 mb-4">
                  <span>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}{" "}
                  </span>
                </h2>

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

const Tr = ({ item }) => {
  return (
    <div className="d-flex justify-content-between">
      <h6>{item.productName}</h6>
      <h6>$ &nbsp;{item.price}</h6>
      <h5 className="d-none">{item.quantity}</h5>
    </div>
  );
};
