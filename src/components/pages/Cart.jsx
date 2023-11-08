import React from "react";
import "../styles/cart.css";
import Helmet from "../Helmet/Helmet";
import CommonSection from "../UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch(); 

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      dispatch(cartActions.loadCartItems(JSON.parse(storedCartItems)));
    }
  }, [dispatch]);

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />

      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">No items added To cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>

            <Col lg="3">
              <div>
                <h5 className="d-flex align-items-center justify-content-between">
                  Subtotal
                  <span className="fs-4 fw-bold ">${totalAmount}</span>
                </h5>
                <p className="fs-6 mt-2 ">Taxes and Shopping will calculated</p>
              </div>
              <div>
                <div>
                  <Link to="/checkout">
                    <button className="buy-btn w-100">Checkout</button>
                  </Link>
                </div>
                <div>
                  <Link to="/shop">
                    <button className="buy-btn w-100 mt-3 ">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };

  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>$ &nbsp;{item.price}</td>
      <td>{item.quantity}</td>
      <td>
        <motion.span whileTap={{ scale: 1.2 }}>
          <RiDeleteBin5Line onClick={deleteProduct} />
        </motion.span>
      </td>
    </tr>
  );
};

export default Cart;
