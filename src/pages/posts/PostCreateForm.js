import React, { useState } from "react";
import ProductsPanel from "../../components/ProductsPanel";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { BsX } from "react-icons/bs";
import BodySytemPanel from "../../components/BodySystemPanel";
import styles from "../../styles/PostCreatForm.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function PostCreateForm() {
  const [selectedBodySystems, setSelectedBodySystems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [customImage, setCustomImage] = useState(null);

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
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
      setCustomImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <Container>
      <Row>
        <Col sm={6}>
          <div className={styles["center-div"]}>
            {(selectedImage || customImage) && (
              <Image
                src={customImage || selectedImage}
                alt="Selected product image"
                className="mb-3"
                fluid
              />
            )}
            <Form>
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

              <Form.Group controlId="customImage" className="text-center d-flex flex-column align-items-center">
                <Form.Label></Form.Label>
                <Form.File
                  accept="image/*"
                  onChange={handleCustomImageChange}
                  custom
                  style={{ display: "none" }} // Hide the default file input button
                />
                <label
                  htmlFor="customImage"
                  className={styles["upload-button"]}
                >
                  <FontAwesomeIcon icon={faUpload} /> Upload Image or select a product and use it`s image
                </label>
              </Form.Group>

              <Form.Control
                type="text"
                placeholder="Add a title for your post"
                className="mb-3 input-border"
              />
              <Form.Control
                as="textarea"
                rows={6}
                className="mb-3 input-border"
                placeholder="Write a description on what this miracle combination of products has done for you."
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
            <BodySytemPanel
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
