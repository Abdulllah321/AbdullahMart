import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom hook/useGetData";
import { db } from "../firebase.config";
import { deleteDoc, doc } from "firebase/firestore";

const Users = () => {
  const { data: userData, loading } = useGetData("users");
const deleteUser = async (id)=> {
    await deleteDoc(doc(db, 'users', id))
}

//   console.log(userData);
  return (
    <section>
      <Container>
        <Row>
          <Col lg1="2">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Col
                    lg="12"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <div className="loader d-flex align-items-center justify-content-center">
                      <div class="spinner"></div>
                    </div>
                  </Col>
                ) : (
                  userData.map((user) => (
                    <tr key={user.uid}>
                      <td>
                        <img src={user.photoURL} alt={user.displayName} />
                      </td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => deleteUser(user.uid)}>Delete</button>
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

export default Users;
