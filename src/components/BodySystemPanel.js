import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/BodySystemPanel.module.css";
import { Container, Button } from "react-bootstrap";
import { MdClear } from "react-icons/md";

const BodySystemPanel = ({ selectedBodySystems, toggleBodySystem }) => {
  const [products, setProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    let source = axios.CancelToken.source();

    const fetchProducts = async () => {
      try {
        const response = await axios.get("products", {
          cancelToken: source.token,
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

  useEffect(() => {
    setSelectedFilters(selectedBodySystems);
  }, [selectedBodySystems]);

  const uniqueSystems = Array.from(
    new Set(products.flatMap((product) => product.body_systems))
  );

  uniqueSystems.sort((a, b) => a.localeCompare(b));

  const handleRemoveFilter = (system) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter((filter) => filter !== system)
    );
    toggleBodySystem(system);
  };

  return (
    <Container className={styles["system-panel"]}>
      <div className={styles["selected-filters-container"]}>
        {selectedFilters.map((filter, index) => (
          <Button
            key={index}
            variant="outline-secondary"
            className={styles["selected-filter"]}
            onClick={() => handleRemoveFilter(filter)}
          >
            {filter} <MdClear color="red" />
          </Button>
        ))}
      </div>
      <div>
        <h5 className="text-center">Select by Body Systems:</h5>
      </div>
      <hr></hr>
      <div className={styles["systems-button-container"]}>
        {uniqueSystems.map((system, index) => (
          <div key={index} className={styles.systemsRow}>
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
