import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      <h2>Products Panel</h2>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Condition: {product.condition}</p>
          <p>Body Systems: {product.body_systems}</p>
          <img src={product.image} alt={product.name} />
        </div>
      ))}
    </div>
  );
};

export default ProductsPanel;
