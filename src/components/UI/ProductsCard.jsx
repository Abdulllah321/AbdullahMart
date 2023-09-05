import React from "react";
import { BiSolidCartAdd } from "react-icons/bi";
import { motion } from "framer-motion";
import { Col, Row } from "reactstrap";
import "../styles/product-card.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";

const ProductsCart = ({ item }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );

    toast.success("Product added Successfully");
  };

  return (
    <Col lg="3" md="4" sm="6" xs="10" className="Product">
      <div className="product-item">
        <div className="product-img overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={item.imgUrl}
            alt="Product Image"
          />
        </div>
        <Link to={`/shop/${item.id}`}>
          <div className="p-2 product-info">
            <h3 className="product-name">{item.productName}</h3>
            <span>{item.category}</span>
          </div>
        </Link>
        <div className="product-card-bottom d-flex align-items-center justify-content-between p-2 relative bottom-0">
          <span className="price">$&nbsp;{item.price}</span>
          <motion.span
            whileTap={{ scale: 1.2 }}
            className="add"
            onClick={addToCart}
          >
            <BiSolidCartAdd />
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductsCart;
