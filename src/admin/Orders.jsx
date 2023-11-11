import React, { useState } from "react";
import useGetData from "../custom hook/useGetData";
import { Col, Container, Row } from "reactstrap";
import "../components/styles/orders.css";
import { motion } from "framer-motion";
import { BiSolidRightArrow } from "react-icons/bi";

const Orders = () => {
  const { data: orders, loading } = useGetData("orders");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <div className="orders-container">
              {loading ? (
                <Col
                  lg="12"
                  className="d-flex align-items-center justify-content-center"
                >
                  <div className="loader d-flex align-items-center justify-content-center">
                    <div className="spinner"></div>
                  </div>
                </Col>
              ) : (
                orders.map((item) => (
                  <div key={item.id} className="order-item">
                    <div>
                      <strong>User Email:</strong> {item.UserEmail}
                    </div>
                    <div>
                      <strong>User Name:</strong> {item.UserName}
                    </div>
                    <div
                      style={{
                        paddingBottom: "8px",
                        textUnderlineOffset: "10px",
                        textDecoration: "underline",
                      }}
                    >
                      <strong>User UID:</strong> {item.UserUid}
                    </div>
                    <div>
                      <strong>Address:</strong> {item.address}
                    </div>
                    <div>
                      <strong>City:</strong> {item.city}
                    </div>
                    <div>
                      <strong>Country:</strong> {item.country}
                    </div>
                    <div>
                      <strong>Email:</strong> {item.email}
                    </div>
                    <div>
                      <strong>Name:</strong> {item.name}
                    </div>
                    <div>
                      <strong>Phone Number:</strong> {item.phoneNumber}
                    </div>
                    <div>
                      <strong>Postal Code:</strong> {item.postalCode}
                    </div>
                    <div
                      style={{
                        paddingBottom: "8px",
                        textUnderlineOffset: "10px",
                        textDecoration: "underline",
                      }}
                    >
                      <strong>Timestamp:</strong>{" "}
                      {item.timestamp.toDate().toLocaleString()}
                    </div>

                    <div className="order-items">
                      <strong onClick={handleClick}>
                        <BiSolidRightArrow />
                        Order Items:
                      </strong>
                      {item.cartItems.map((orderItem, index) => (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          key={index}
                          className={
                            open
                              ? `order-item-detail`
                              : `order-item-detail-open`
                          }
                        >
                          <h6>
                            <b>productName: &nbsp;</b> {orderItem.productName}
                          </h6>
                          <h5>
                            <h6>
                              <b>Product Quantity: &nbsp;</b>
                              {orderItem.quantity}
                            </h6>{" "}
                            <h6>
                              <b>Product Price:&nbsp;</b>${orderItem.price}
                            </h6>{" "}
                          </h5>
                        </motion.div>
                      ))}
                    </div>
                    <div
                      style={{
                        paddingTop: "8px",
                        textUnderlineOffset: "-20px",
                        textDecoration: "underline",
                      }}
                    >
                      <strong>Total Amount:</strong> ${item.totalAmount}
                    </div>
                    <div>
                      <strong>Total Quantity:</strong> {item.totalQty}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Orders;
