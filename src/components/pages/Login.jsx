import React, { useState } from "react";
import Helmet from "../Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

import "../styles/login.css";
import { doc, setDoc } from "firebase/firestore";

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

  //google authenticatoin
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const googleResult = await signInWithPopup(auth, provider);
      const googleUser = googleResult.user;

      // Handle the user data or navigate to the next step
      setLoading(false);
      toast.success(
        `You have successfully logged in with Google as ${googleUser.displayName}.`
      );

      if (googleUser) {
        // Handle Google user data
        const userDocRef = doc(db, "users", googleUser.uid);
        await setDoc(userDocRef, {
          uid: googleUser.uid,
          displayName: googleUser.displayName,
          email: googleUser.email,
          photoURL: googleUser.photoURL,
          // Add any other user data you need
        });
      }

      // Redirect the user to the previous URL they came from
      navigate(location.state?.prevPath || "/");
    } catch (error) {
      console.error(error);

      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Google sign-in was canceled by the user.");
      } else if (error.code === "auth/network-request-failed") {
        toast.error(
          "Network error. Please check your internet connection and try again."
        );
      } else if (error.code === "auth/internal-error") {
        toast.error(
          "An internal error occurred during sign-in. Please try again later."
        );
      } else if (error.code === "auth/user-disabled") {
        toast.error(
          "Your account has been disabled. Contact support for assistance."
        );
      } else {
        toast.error(
          "An error occurred during Google sign-in. Please try again later."
        );
      }
    }
  };
  //facebook authenticatoin
  const handlFacebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const facebookResult = await signInWithPopup(auth, provider);
      const facebookUser = facebookResult.user;

      if (facebookUser) {
        // Handle Facebook user data
        const userDocRef = doc(db, "users", facebookUser.uid);
        await setDoc(userDocRef, {
          uid: facebookUser.uid,
          displayName: facebookUser.displayName,
          email: facebookUser.email,
          photoURL: facebookUser.photoURL,
          // Add any other user data you need
        });
      }
      setLoading(false);
      toast.success(
        `You have successfully logged in with Facebook as ${facebookUser.displayName}.`
      );

      navigate(location.state?.prevPath || "/");
    } catch (error) {
      console.error(error);

      if (error.code === "auth/account-exists-with-different-credential") {
        toast.error(
          "An account with the same email address already exists. Try a different sign-in method."
        );
      } else if (error.code === "auth/auth-domain-config-required") {
        toast.error(
          "Your Firebase configuration is missing required authDomain. Please contact the app administrator."
        );
      } else if (error.code === "auth/cancelled-popup-request") {
        toast.error("Facebook sign-in was canceled by the user.");
      } else if (error.code === "auth/operation-not-allowed") {
        toast.error("Facebook sign-in is not allowed for this app.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("The provided email address is not valid.");
      } else {
        toast.error(
          "An error occurred during Facebook sign-in. Please try again later."
        );
      }
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
                  <div className="auth_div">
                    <button onClick={handleGoogleSignIn}>
                      <FcGoogle />
                      Continue with Google
                    </button>
                    <div className="or">or</div>
                    <button onClick={handlFacebookSignIn}>
                      <BsFacebook />
                      Continue with Facebook
                    </button>
                    <div className="or">or</div>
                  </div>
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
