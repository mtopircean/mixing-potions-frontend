import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/ProductPanel.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";

const ProductsPanel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("products");
        setProducts(response.data.results);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container className={styles["products-panel"]}>
      <h3 className="text-center">Add product</h3>
      <Row>
      {products.slice(0, 4).map((product) => (
        <Col key={product.id} sm={6}>
          <div key={product.id} className={styles["product-card"]}>
            <img
              src={product.image}
              alt={product.name}
              className={styles["product-image"]}
            />
            <h5 className={styles["product-span"]}>{product.name}</h5>
            <p>
              <span className={styles["product-span"]}>Condition:</span>{" "}
              {product.condition}
            </p>
            <p>
              <span className={styles["product-span"]}>Body Systems:</span>{" "}
              {product.body_systems}
            </p>
            <Button className={styles["add-post-button"]}>Add to post</Button>
          </div>
        </Col>
      ))}
      </Row>
    </Container>
  );
};

export default ProductsPanel;
