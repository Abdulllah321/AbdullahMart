import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import products from "../../assets/data/products";
import Helmet from "../Helmet/Helmet";
import CommonSection from "../UI/CommonSection";
import { ImStarFull, ImStarHalf, ImStarEmpty } from "react-icons/im";
import "../styles/product-detail.css";
import ProductList from "../UI/ProductsList";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";



const localStorageReviews = () => {
  let rev = localStorage.getItem("reviews");

  if (rev) {
    return JSON.parse(localStorage.getItem("reviews"));
  } else {
    return [];
  }
};


const ProductDetails = () => {
  const [hoverRating, setHoverRating] = useState(null);
  const dispatch = useDispatch();
  const reviewForm = useRef(null);

  const [tab, setTab] = useState("desc");
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  const {
    imgUrl,
    productName,
    price,
    description,
    reviews: initialReviews,
    avgRating,
    shortDesc,
    category,
  } = product;

  const relatedProducts = products
    .filter((item) => item.category === category && item.id !== id)
    .slice(0, 4);

  const [reviews, setReviews] = useState(localStorageReviews());
  const reviewUser = useRef();
  const reviewMsg = useRef();

  const [rating, setRating] = useState(null);
  const [clicked, setClicked] = useState(false);

useEffect(()=>{
 localStorage.setItem("reviews", JSON.stringify(reviews));
},[reviews])


  const submitHandler = (e) => {
    e.preventDefault();

    let hasError = false;

    // Check if a rating is selected
    if (rating === null) {
      toast.error("Please select a rating");
      hasError = true;
    }

    // Check if name field is empty
    if (reviewUser.current.value.trim() === "") {
      toast.error("Please enter your name");
      hasError = true;
    }

    // Check if message field is empty
    if (reviewMsg.current.value.trim() === "") {
      toast.error("Please enter your message");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      id: id, // Assign the id of the current product
      name: reviewUserName,
      rating,
      message: reviewUserMsg,
    };

    setReviews((prevReviews) => [...prevReviews, reviewObj]);

    toast.success("Review submitted");

    e.target.reset();

    setRating(null);
    setClicked(false);
  };

  const filteredReviews = reviews.filter((item) => item.id === id);
  const numberOfRatings = filteredReviews.length;

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );
    toast.success("Product added to cart successfully");
  };

  function handleClick(rating) {
    setRating(rating);
    setClicked(true);
  }

  const starElements = Array.from(
    document.querySelectorAll(".form-group span svg")
  );

  starElements.forEach((star, index) => {
    star.addEventListener("click", () => {
      handleClick(starElements.length - index);
    });
  });

  return (
    <Helmet title={productName}>
      <CommonSection />
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg="6">
              <div className="product-detail">
                <h2>{productName}</h2>
                <div className="product-rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    {[1, 2, 3, 4, 5].map((star) =>
                      star <= avgRating ? (
                        <span key={star} onClick={() => setRating(star)}>
                          <ImStarFull />
                        </span>
                      ) : star - 0.5 <= avgRating ? (
                        <span key={star} onClick={() => setRating(star)}>
                          <ImStarHalf />
                        </span>
                      ) : (
                        <span key={star} onClick={() => setRating(star)}>
                          <ImStarEmpty />
                        </span>
                      )
                    )}
                  </div>
                  <p>
                    (<span>{filteredReviews.length}</span> ratings)
                  </p>
                </div>

                <div className="d-flex align-items-start flex-column ">
                  <span className="product-price">$&nbsp;{price}</span>
                  <span>
                    <b>Category</b>:&nbsp; {category}
                  </span>
                </div>
                <p className="mt-3 ">{shortDesc}</p>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy-btn"
                  onClick={addToCart}
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab-wrapper d-flex align-items-center gap-5 mb-4 ">
                <h6
                  className={`${tab === "desc" ? "active-tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>

                <h6
                  className={`${tab === "rev" ? "active-tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews ({filteredReviews.length})
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab-content mt-4">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product-review ">
                  <div className="review-wrapper">
                    <ul>
                      {filteredReviews.map((item, index) => (
                        <li key={index} className="mb-4">
                          <h6 className="mb-1 fw-bold ">{item.name}</h6>
                          <span>{item.rating} (rating)</span>
                          <p>{item.message}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="review-form">
                      <h4>Leave Your Experience</h4>
                      <form onSubmit={submitHandler} ref={reviewForm}>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Enter name"
                            ref={reviewUser}
                          />
                        </div>
                        <div className="form-group rating-group">
                          <span
                            onClick={() => setRating(1)}
                            onMouseEnter={() => setHoverRating(1)}
                            onMouseLeave={() => setHoverRating(null)}
                          >
                            {rating >= 1 || hoverRating >= 1 ? (
                              <ImStarFull />
                            ) : (
                              <ImStarEmpty />
                            )}
                          </span>
                          <span
                            onClick={() => setRating(2)}
                            onMouseEnter={() => setHoverRating(2)}
                            onMouseLeave={() => setHoverRating(null)}
                          >
                            {rating >= 2 || hoverRating >= 2 ? (
                              <ImStarFull />
                            ) : (
                              <ImStarEmpty />
                            )}
                          </span>
                          <span
                            onClick={() => setRating(3)}
                            onMouseEnter={() => setHoverRating(3)}
                            onMouseLeave={() => setHoverRating(null)}
                          >
                            {rating >= 3 || hoverRating >= 3 ? (
                              <ImStarFull />
                            ) : (
                              <ImStarEmpty />
                            )}
                          </span>
                          <span
                            onClick={() => setRating(4)}
                            onMouseEnter={() => setHoverRating(4)}
                            onMouseLeave={() => setHoverRating(null)}
                          >
                            {rating >= 4 || hoverRating >= 4 ? (
                              <ImStarFull />
                            ) : (
                              <ImStarEmpty />
                            )}
                          </span>
                          <span
                            onClick={() => setRating(5)}
                            onMouseEnter={() => setHoverRating(5)}
                            onMouseLeave={() => setHoverRating(null)}
                          >
                            {rating >= 5 || hoverRating >= 5 ? (
                              <ImStarFull />
                            ) : (
                              <ImStarEmpty />
                            )}
                          </span>
                        </div>
                        <div className="form-group  ">
                          <textarea
                            rows={4}
                            type="text"
                            placeholder="Review Message..."
                            ref={reviewMsg}
                          />
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          className="buy-btn"
                          type="submit"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>

            <Col lg="12" className="mt-5">
              <h2 className="related-title">You Might Also Like</h2>
            </Col>
            <ProductList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
