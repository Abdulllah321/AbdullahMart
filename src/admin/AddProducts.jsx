import React, { useState } from "react";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import {db, storage} from "../firebase.config";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState("");
  const [loading, setLoading] =useState(false);
  const navigate = useNavigate()

 const addProduct = async (e) => {
   e.preventDefault();

   if (!enterProductImg) {
     toast.error("Please select a product image.");
     return;
   }

   try {
     setLoading(true);
     const storageRef = ref(
       storage,
       `productImages/${Date.now() + enterProductImg.name}`
     );
     const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

     uploadTask.on(
       "state_changed",
       null,
       (error) => {
         toast.error("Error uploading image: " + error.message);
         setLoading(false);
       },
       () => {
         getDownloadURL(uploadTask.snapshot.ref)
           .then(async (downloadURL) => {
              await addDoc(collection(db, "products"), {
               title: enterTitle,
               shortDes: enterShortDesc,
               description: enterDescription,
               category: enterCategory,
               price: enterPrice,
               imgUrl: downloadURL,
             });
             toast.success("Product added successfully");
            //  console.log(docRef);
             setLoading(false);
             navigate("/dashboard/all-products")
           })
           .catch((error) => {
             toast.error("Error getting download URL: " + error.message);
             setLoading(false);
           });
       }
     );
   } catch (error) {
     toast.error("Error adding product: " + error.message);
     setLoading(false);
   }
 };


  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4>Add Products</h4>
            {loading ? (
              <Col lg="12">
                <div className="loader d-flex align-items-center justify-content-center">
                  <div class="spinner"></div>
                </div>
              </Col>
            ) : (
              <>
                <Form className="add_form" onSubmit={addProduct}>
                  <FormGroup className="form-group">
                    <span>Product title</span>
                    <input
                      type="text"
                      placeholder="Watch"
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form-group">
                    <span>Short Description</span>
                    <input
                      type="text"
                      placeholder="lorem....."
                      value={enterShortDesc}
                      onChange={(e) => setEnterShortDesc(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form-group">
                    <span>Description</span>
                    <input
                      type="text"
                      placeholder="Description......"
                      value={enterDescription}
                      onChange={(e) => setEnterDescription(e.target.value)}
                    />
                  </FormGroup>

                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form-group w-50">
                      <span>Price</span>
                      <input
                        type="number"
                        placeholder="$100"
                        className="w-100"
                        value={enterPrice}
                        onChange={(e) => setEnterPrice(e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup className="form-group w-50">
                      <span>Category</span>
                      <select
                        className="w-100 p-2"
                        value={enterCategory}
                        onChange={(e) => setEnterCategory(e.target.value)}
                      >
                        <option value="chair">Chair</option>
                        <option value="sofa">Sofa</option>
                        <option value="mobile">Mobile</option>
                        <option value="watch">Watch</option>
                        <option value="wireless">Wireless</option>
                      </select>
                    </FormGroup>
                  </div>

                  <div>
                    <FormGroup className="form-group">
                      <span>Product Image</span>
                      <input
                        type="file"
                        onChange={(e) => setEnterProductImg(e.target.files[0])}
                      />
                    </FormGroup>
                  </div>

                  <button className="buy-btn" type="submit">
                    Add Product
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
