import React from "react";
import Helmet from "../Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assets/images/hero-img.png";
import { motion } from "framer-motion";
import "../styles/home.css";
import { Link } from "react-router-dom";
import Services from "../Services/Services";
import ProductsList from "../UI/ProductsList";
import { useState, useEffect } from "react";
// import products from "../../assets/data/products";
import counterImg from "../../assets/images/counter-timer-img.png";
import Clock from "../UI/Clock";
import useGetData from "../../custom hook/useGetData";

const Home = () => {
  const { data: products, loading } = useGetData("products");

  const year = new Date().getFullYear();

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProduct, setWirelessProducts] = useState([]);
  const [popularProduct, setPopularProducts] = useState([]);

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "chair"
    );

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "sofa"
    );
    const filteredMobileProducts = products.filter(
      (item) => item.category === "mobile"
    );
    const filteredWirelessProducts = products.filter(
      (item) => item.category === "wireless"
    );
    const filteredPopularProducts = products.filter(
      (item) => item.category === "watch"
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  }, [products]);

  return (
    <>
      <Helmet title={"Home"}>
        <section className="hero-section">
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="hero-content">
                  <p className="hero-subtitle">Trending Product in {year}</p>
                  <h2>Make Your Interior more Minimolistics & Modern</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perferendis fuga vero, blanditiis voluptatibus adipisci
                    commodi temporibus, non consequuntur ad nobis quas natus
                    neque culpa eum ab maiores ipsa voluptatem dolorum.
                  </p>

                  <Link to="/shop" whilehover={{ color: "#ffff" }}>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      className="buy-btn"
                    >
                      SHOP NOW
                    </motion.button>
                  </Link>
                </div>
              </Col>

              <Col lg="6" md="6">
                <div className="hero-img">
                  <img src={heroImg} alt="Hero" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Services />

        <section className="trending-product">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h2 className="section-title">Trending Products</h2>
              </Col>
              {loading ? (
                <Col lg="12">
                  <div className="loader d-flex align-items-center justify-content-center">
                    <div class="spinner"></div>
                  </div>
                </Col>
              ) : (
                <ProductsList data={trendingProducts} />
              )}
            </Row>
          </Container>
        </section>

        <section className="best-sales">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h2 className="section-title">Best Sales</h2>
              </Col>
              {loading ? (
                <Col lg="12">
                  <div className="loader d-flex align-items-center justify-content-center">
                    <div class="spinner"></div>
                  </div>
                </Col>
              ) : (
                <ProductsList data={bestSalesProducts} />
              )}{" "}
            </Row>
          </Container>
        </section>
        <section className="timer-count">
          <Container>
            <Row>
              <Col lg="6" md="6" sm="12" className="count-down-col">
                <div className="clock-top-content">
                  <h4 className="text-white fs-6 mb-3">Limited Offers</h4>
                  <h3 className="text-white fs-5 mb-3">Quality Arm Chair</h3>
                </div>
                <Clock />
                <Link to="/shop" className="buys-btn">
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="store-btn buy-btn"
                  >
                    Visit Store
                  </motion.button>
                </Link>
              </Col>

              <Col lg="6" md="6" sm="12" className="text-end counter-img">
                <img src={counterImg} alt="" />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="new-arrival">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h2 className="section-title">New Arrivals</h2>
              </Col>
              {loading ? (
                <Col lg="12">
                  <div className="loader d-flex align-items-center justify-content-center">
                    <div class="spinner"></div>
                  </div>
                </Col>
              ) : (
                
              <ProductsList data={wirelessProduct} />
              )}
               {loading ? (
                <Col lg="12">
                  <div className="loader d-flex align-items-center justify-content-center">
                    <div class="spinner"></div>
                  </div>
                </Col>
              ) : (
                <ProductsList data={mobileProducts} />
                
              )}
            </Row>
          </Container>
        </section>

        <section className="popular-category">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h2 className="section-title">Popular in Category</h2>
              </Col>
               {loading ? (
                <Col lg="12">
                  <div className="loader d-flex align-items-center justify-content-center">
                    <div class="spinner"></div>
                  </div>
                </Col>
              ) : (
                
              <ProductsList data={popularProduct} />
              )}
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default Home;
