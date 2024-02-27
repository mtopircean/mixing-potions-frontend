import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/BodySystemPanel.module.css";
import { Container } from "react-bootstrap";

const BodySystemPanel = () => {
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

  const uniqueSystems = Array.from(
    new Set(products.flatMap(product => product.body_systems))
  );

  return (
    <Container className={styles["system-panel"]}>
      <h3 className="text-center">Available Body Systems</h3>
      <ul>
        {uniqueSystems.map((system, index) => (
          <li key={index}>
            <span>{system}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default BodySystemPanel;
