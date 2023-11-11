import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom hook/useGetData";
import { db } from "../firebase.config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

const Users = () => {
  const { data: userData, loading } = useGetData("users");

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  const toggleAdminStatus = async (id, isAdmin) => {
    // Toggle the 'isAdmin' field in Firestore
    await updateDoc(doc(db, "users", id), {
      isAdmin: !isAdmin,
    });
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Admin</th>
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
                      <div className="spinner"></div>
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
                      <td>{user.isAdmin ? "Admin" : "User"}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(user.uid)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() =>
                            toggleAdminStatus(user.uid, user.isAdmin)
                          }
                        >
                          {user.isAdmin ? "Remove Admin" : "Make Admin"}
                        </button>
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
