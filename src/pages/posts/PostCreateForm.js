import React, { useState } from "react";
import ProductsPanel from "../../components/ProductsPanel";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { BsX } from "react-icons/bs"
import BodySytemPanel from "../../components/BodySystemPanel";
import styles from "../../styles/PostCreatForm.module.css";

function PostCreateForm() {
  const [selectedBodySystems, setSelectedBodySystems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    setSelectedProduct(product);
  }

  const handleRemoveProduct = () => {
    setSelectedProduct(null);
  }

  return (
    <Container>
      <Row>
        <Col sm={6}>
          <Form>
            {selectedProduct && (
              <div className={styles["product-post-card"]}>
                <Image src={selectedProduct.image} alt={selectedProduct.name} fluid />
                <h5>{selectedProduct.name}</h5>
                <Button variant="danger" onClick={handleRemoveProduct} className={styles["remove-button"]}><BsX /></Button>
              </div>
              )}
            <Form.Control type="text" placeholder="Add a title for your post" className="mb-3 input-border"/>
            <Form.Control
              as="textarea"
              rows={6}
              className="mb-3 input-border"
              placeholder="Write a description on what this miracle combination of products has done for you."
            />
            <Button variant="primary" type="submit" className={styles["post-create-button"]}>
              Create Post
            </Button>
          </Form>
        </Col>
        <Col sm={6}>
          <BodySytemPanel
            selectedBodySystems={selectedBodySystems}
            toggleBodySystem={toggleBodySystem}
          />
          <ProductsPanel selectedBodySystems={selectedBodySystems} onAddProduct={handleAddProduct} />
        </Col>
      </Row>
    </Container>
  );
}

export default PostCreateForm;
