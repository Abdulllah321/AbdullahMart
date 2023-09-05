import React, { useState } from "react";
import "../styles/shop.css";

import CommonSection from "../UI/CommonSection";
import Helmet from "../../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { FiSearch } from "react-icons/fi";

import products from "../../assets/data/products";
import ProductList from "../UI/ProductsList";

const Shops = () => {
  const [productsData, setProductsData] = useState(products);
  const [sortOrder, setSortOrder] = useState("ascending");

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "sofa") {
      const filteredProducts = products.filter(
        (item) => item.category === "sofa"
      );
      setProductsData(filteredProducts);
    }

    if (filterValue === "mobile") {
      const filteredProducts = products.filter(
        (item) => item.category === "mobile"
      );
      setProductsData(filteredProducts);
    }

    if (filterValue === "chair") {
      const filteredProducts = products.filter(
        (item) => item.category === "chair"
      );
      setProductsData(filteredProducts);
    }

    if (filterValue === "watch") {
      const filteredProducts = products.filter(
        (item) => item.category === "watch"
      );
      setProductsData(filteredProducts);
    }

    if (filterValue === "wireless") {
      const filteredProducts = products.filter(
        (item) => item.category === "wireless"
      );
      setProductsData(filteredProducts);
    }

    if (filterValue === "") {
      const filteredProducts = products.filter((item) => item);
      setProductsData(filteredProducts);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const searchedProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setProductsData(searchedProducts);
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    setSortOrder(sortValue);

    const sortedProducts = [...productsData].sort((a, b) => {
      if (sortValue === "ascending") {
        return a.price - b.price;
      } else if (sortValue === "descending") {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

    setProductsData(sortedProducts);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products"></CommonSection>

      <section>
        <Container>
          <Row>
            <Col lg="3" md="6" sm="6">
              <div className="filter-widget">
                <select onChange={handleFilter}>
                  <option value="">Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" sm="6" className="text-end">
              <div className="filter-widget">
                <select onChange={handleSort}>
                  <option value="">Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12" sm="12">
              <div className="search-box">
                <input type="text" placeholder="Search..." onChange={handleSearch} />
                <span>
                  <FiSearch />
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center">No products found.</h1>
            ) : (
              <ProductList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shops;