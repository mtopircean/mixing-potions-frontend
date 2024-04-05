import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/ProductPanel.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";

const ProductsPanel = ({ selectedBodySystems, onAddProduct }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let source = axios.CancelToken.source();
  
    const fetchProducts = async () => {
      try {
        const response = await axios.get("products", {
          cancelToken: source.token
        });
        setProducts(response.data.results);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching products:", error);
        }
      }
    };
  
    fetchProducts();
    return () => {
      source.cancel("Operation canceled by cleanup");
    };
  }, []);

  const filteredProducts =
    selectedBodySystems && selectedBodySystems.length
      ? products.filter((product) =>
          product.body_systems.some((system) =>
            selectedBodySystems.includes(system)
          )
        )
      : products;

  const handleAddToPost = (product) => {
    onAddProduct(product);
  };

  return (
    <Container className={styles["products-panel"]}>
      <h3 className="text-center">Add product</h3>
      <Row>
        {filteredProducts.map((product) => (
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
                {product.condition.map((condition, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && ", "}
                    {condition}
                  </React.Fragment>
                ))}
              </p>
              <Button
                className={styles["add-post-button"]}
                onClick={() => handleAddToPost(product)}
              >
                Add to post
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductsPanel;
