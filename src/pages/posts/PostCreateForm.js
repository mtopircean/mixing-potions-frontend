import React, { useState, useEffect } from "react";
import ProductsPanel from "../../components/ProductsPanel";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { BsX } from "react-icons/bs";
import BodySystemPanel from "../../components/BodySystemPanel";
import styles from "../../styles/PostCreateForm.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import axios from "axios";

function PostCreateForm() {
  const currentUser = useCurrentUser();
  const [selectedBodySystems, setSelectedBodySystems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [customImage, setCustomImage] = useState(null);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const history = useHistory();

  const toggleBodySystem = (system) => {
    if (selectedBodySystems.includes(system)) {
      setSelectedBodySystems(
        selectedBodySystems.filter((item) => item !== system)
      );
    } else {
      setSelectedBodySystems([...selectedBodySystems, system]);
    }
  };

  const handleAddProduct = (product) => {
    const isProductExists = selectedProducts.some((p) => p.id === product.id);
    if (!isProductExists) {
      setSelectedProducts((prevProducts) => [...prevProducts, product]);
    }
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, selectedProducts.length - 2)
    );
  };

  const handleCheckboxChange = (product) => {
    if (selectedImage === product.image) {
      setSelectedImage(null);
    } else {
      setSelectedImage(product.image);
    }
  };

  const handleCustomImageChange = (event) => {
    if (event.target.files.length) {
      const selectedFile = event.target.files[0];
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
      setCustomImage(URL.createObjectURL(selectedFile));
      setImage(selectedFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    selectedProducts.forEach((product) => {
      formData.append("products[]", product.id);
    });

    try {
      const response = await axios.post("/posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      history.push(`/posts/${response.data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };
  useEffect(() => {
    if (!currentUser) {
      history.push("/");
    }
  }, [currentUser, history]);

  return (
    <Container>
      <Row>
        <Col sm={6}>
          <div className={styles["center-div"]}>
            <Form
              onSubmit={handleSubmit}
              action="/posts/"
              method="post"
              enctype="multipart/form-data"
            >
              {(selectedImage || customImage) && (
                <Image
                  src={customImage || selectedImage}
                  alt="Selected product image"
                  className="mb-3"
                  fluid
                />
              )}

              <Row className="align-items-center justify-content-center">
                {selectedProducts.length > 2 && currentIndex > 0 && (
                  <Button
                    onClick={handlePrevClick}
                    className={styles["arrow-button"]}
                  >
                    <FaChevronLeft />
                  </Button>
                )}
                {selectedProducts
                  .slice(currentIndex, currentIndex + 2)
                  .map((product) => (
                    <Col key={product.id} sm={4}>
                      <div
                        key={product.id}
                        className={styles["product-post-card"]}
                      >
                        <Image src={product.image} alt={product.name} fluid />
                        <h5>{product.name}</h5>
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveProduct(product.id)}
                          className={styles["remove-button"]}
                        >
                          <BsX />
                        </Button>
                        <Form.Check
                          type="checkbox"
                          className={styles["form-check-label"]}
                          label="Post image"
                          onChange={() => handleCheckboxChange(product)}
                        />
                      </div>
                    </Col>
                  ))}

                {selectedProducts.length > 2 &&
                  currentIndex + 2 < selectedProducts.length && (
                    <Button
                      onClick={handleNextClick}
                      className={styles["arrow-button"]}
                    >
                      <FaChevronRight />
                    </Button>
                  )}
              </Row>

              <Form.Group controlId="customImage">
                <Form.Label></Form.Label>
                <Form.File
                  accept="image/*"
                  onChange={handleCustomImageChange}
                  custom
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="customImage"
                  className={styles["upload-button"]}
                >
                  <FontAwesomeIcon icon={faUpload} /> Upload Image or select a
                  product and use it`s image
                </label>
              </Form.Group>

              <Form.Control
                type="text"
                placeholder="Add a title for your post"
                className="mb-3 input-border"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Form.Control
                as="textarea"
                rows={6}
                className="mb-3 input-border"
                placeholder="Write a description on what this miracle combination of products has done for you."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                variant="primary"
                type="submit"
                className={styles["post-create-button"]}
              >
                Create Post
              </Button>
            </Form>
          </div>
        </Col>
        <Col sm={6}>
          <div className={styles["center-div"]}>
            <BodySystemPanel
              selectedBodySystems={selectedBodySystems}
              toggleBodySystem={toggleBodySystem}
            />
            <ProductsPanel
              selectedBodySystems={selectedBodySystems}
              onAddProduct={handleAddProduct}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PostCreateForm;
