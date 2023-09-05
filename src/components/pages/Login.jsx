import React, { useState } from "react";
import Helmet from "../Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const signin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log(user);
      setLoading(false);
      toast.success("Successfully logged in");

      if (location.state && location.state.prevPath === "/checkout") {
        navigate("/checkout");
      } else {
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/user-not-found") {
        toast.error("Please enter a valid email");
      }
      if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password");
      }
      setLoading(false);
    }
  };

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12">
                <div className="loader d-flex align-items-center justify-content-center  ">
                  <div className="spinner"></div>
                </div>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h1 className="fw-bold mb-4">Login</h1>
                <Form className="auth-form" onSubmit={signin}>
                  <FormGroup className="form-group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form-group">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>

                  <button type="submit" className="buy-btn auth-btn">
                    Login
                  </button>
                  <p>
                    Don't have an account? &nbsp;
                    <Link to="/signup">Create an account</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
