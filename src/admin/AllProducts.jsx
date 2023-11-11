import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom hook/useGetData";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const AllProducts = () => {
  const { data: productData, loading } = useGetData("products");

  const deleteProduct = async(id) => {
    await deleteDoc(doc(db, 'products' , id));
    toast.success("Deleted")
  }
  // console.log(productData);
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Col lg="12" className="d-flex align-items-center justify-content-center">
                    <div className="loader d-flex align-items-center justify-content-center">
                      <div class="spinner"></div>
                    </div>
                  </Col>
                ) : (
                  productData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imgUrl} alt={item.title} />
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {deleteProduct(item.id)}}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
