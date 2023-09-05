import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import {HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail} from 'react-icons/hi'
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col lg="4" md="12">
            <div> 
            <h1 className="tex-white">AbdullahMart</h1>
            <p className="footer-text mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              quis nisi aspernatur ipsam qui, quam ratione? Mollitia,
              exercitationem. Aliquam dolorum placeat laboriosam assumenda
              nesciunt, asperiores cupiditate eius aperiam ducimus nemo?
            </p>
            </div>
          </Col>
          <Col lg="3" md="6" sm="6" xs="10">
            <div className="footer-quick-links">
              <h4 className="quick-links-title">Top Categories </h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Mobile Phones</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Modern Sofa</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Arm Chair</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Smart Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2" md="6" sm="6" xs="10">
          <div className="footer-quick-links">
              <h4 className="quick-links-title">Useful Links</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/">Home</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shops</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/login">Login</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3" md="12">
          <div className="footer-quick-links footer-contact">
              <h4 className="quick-links-title">Contact</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span><HiOutlineLocationMarker/></span>
                  <p>B 56, Glisten-e-johar, Block 9, Karachi, Pakistan</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span><HiOutlinePhone/></span>
                  <p>+92 323 3297166</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span><HiOutlineMail/></span>
                  <p>abdullahsufyan2007@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="12">
            <p className="footer-copyright"> Copyright {year} Develooped by Abdullah Sufyan . All Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
