import React, { useEffect, useState, useMemo } from "react";
import "../styles/shop.css";
import CommonSection from "../UI/CommonSection";
import Helmet from "../../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { FiSearch } from "react-icons/fi";
import ProductList from "../UI/ProductsList";
import useGetData from "../../custom hook/useGetData";

const Shops = () => {
  const { data: products } = useGetData("products");
  const [filterValue, setFilterValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (filterValue === "sofa") {
      filtered = filtered.filter((item) => item.category === "sofa");
    } else if (filterValue === "mobile") {
      filtered = filtered.filter((item) => item.category === "mobile");
    } else if (filterValue === "chair") {
      filtered = filtered.filter((item) => item.category === "chair");
    } else if (filterValue === "watch") {
      filtered = filtered.filter((item) => item.category === "watch");
    } else if (filterValue === "wireless") {
      filtered = filtered.filter((item) => item.category === "wireless");
    }

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.productName.toLowerCase().includes(searchTermLower) ||
          item.description.toLowerCase().includes(searchTermLower) ||
          item.category.toLowerCase().includes(searchTermLower)
      );
    }

    if (sortValue === "ascending") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "descending") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, filterValue, searchTerm, sortValue]);

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortValue(e.target.value);
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
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={handleSearch}
                />
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
            {filteredProducts.length === 0 ? (
              <h1 className="text-center">No products found.</h1>
            ) : (
              <ProductList data={filteredProducts} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shops;
