import React from "react";
import { Col, Container, Row } from "reactstrap";
import "../components/styles/dashboard.css"
import useGetData from "../custom hook/useGetData";

const Dashboard = () => {

  const {data: products} = useGetData('products')
  const {data: users} = useGetData('users')

  return (
    <div>
      <Container>
        <Row className="my-5">
          <Col className="lg-3">
            <div className="revenue-box">
              <h5>Total Sales</h5>
              <span>$7890</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="order-box">
              <h5>Orders</h5>
              <span>$7890</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="tp-box">
              <h5>Total Products</h5>
              <span>{products.length}</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="tu-box">
              <h5>Total Users</h5>
              <span>{users.length}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
