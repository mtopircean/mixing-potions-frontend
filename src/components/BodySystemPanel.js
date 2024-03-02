import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/BodySystemPanel.module.css";
import { Container, Button } from "react-bootstrap";

const BodySystemPanel = ({ selectedBodySystems, toggleBodySystem }) => {
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
    new Set(products.flatMap((product) => product.body_systems))
  );

  return (
    <Container className={styles["system-panel"]}>
      <h5 className="text-center">Select by Body Systems:</h5>
      <hr></hr>
      <div className={styles["systems-button-container"]}>
        {uniqueSystems.map((system, index) => (
          <div key={index}>
            <Button
              className={styles["systems-button"]}
              variant="primary"
              onClick={() => toggleBodySystem(system)}
            >
              {system}
            </Button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default BodySystemPanel;
