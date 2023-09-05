import React, { useState } from "react";
import Helmet from "../Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { setDoc, doc } from "firebase/firestore";

import { auth } from "../../firebase.config";
import { storage } from "../../firebase.config";
import { db } from "../../firebase.config";

import { toast } from "react-toastify";

import "../styles/login.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(""); // Added state for image preview
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile)); // Create a preview URL for the selected image
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
                // Update user profile
                await updateProfile(user, {
                  displayName: username,
                  photoURL: downloadUrl,
                });

                // Store user data in Firestore database
                await setDoc(doc(db, "users", user.uid), {
                  uid: user.uid,
                  displayName: username,
                  email,
                  photoURL: downloadUrl,
                });
              }
            );

            setLoading(false);
            toast.success("Account Created");
            navigate("/");
          } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error("Error occurred during signup");
          }
        }
      );
    } catch (error) {
      // Handle errors
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
                <div className="loader d-flex align-items-center justify-content-center  ">
                  <div class="spinner"></div>
                </div>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h1 className="fw-bold mb-4">Signup</h1>
                <Form className="auth-form" onSubmit={signup}>
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
                    <input
                      type="file"
                      onChange={handleFileChange} 
                      required
                    />
                    {previewURL && (
                      <img
                        src={previewURL}
                        alt="Preview"
                        style={{ width:'60px', borderRadius:'50%' }}
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
