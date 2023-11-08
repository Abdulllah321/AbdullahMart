import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import Helmet from "../Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth, storage, db } from "../../firebase.config";

import "../styles/login.css";
import useAuth from "../../custom hook/useAuth";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile));
  };
  const location = useLocation();
  const navigate = useNavigate();

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

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const storageRef = ref(storage, `images/4${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        async () => {
          try {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadUrl) => {
                await updateProfile(user, {
                  displayName: username,
                  photoURL: downloadUrl,
                });

                await setDoc(doc(db, "users", user.uid), {
                  uid: user.uid,
                  displayName: username,
                  email,
                  photoURL: downloadUrl,
                });
                setLoading(false);
                toast.success("Account Created");
                navigate("/");
              }
            );
          } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error("Error occurred during signup");
          }
        }
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already registered");
      }
      if (error.code === "auth/weak-password") {
        toast.error("Password is too weak");
      }
      if (error.code === "auth/invalid-username") {
        toast.error("Invalid username");
      }
    }
  };

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12">
                <div className="loader d-flex align-items-center justify-content-center">
                  <div class="spinner"></div>
                </div>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h1 className="fw-bold mb-4">Signup</h1>

                <Form className="auth-form" onSubmit={signup}>
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
                      type="Username"
                      placeholder="Enter your Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form-group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form-group">
                    <input
                      type="password"
                      placeholder="Create your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form-group d-flex align-items-center justify-content-center w-100">
                    <input type="file" onChange={handleFileChange} required />
                    {previewURL && (
                      <img
                        src={previewURL}
                        alt="Preview"
                        style={{ width: "60px", borderRadius: "50%" }}
                      />
                    )}
                  </FormGroup>

                  <button type="submit" className="buy-btn auth-btn">
                    Signup
                  </button>
                  <p>
                    Already have an account? &nbsp;
                    <Link to="/login">Login</Link>
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

export default Signup;
