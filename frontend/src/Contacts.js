import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Products = ({ products, setProducts }) => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8081/product");
        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        alert("There was an Error loading contacts " + error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
      
      <h2 className="text-center mt-4">Products List</h2>
      <ul className="list-group">
        {products.map((product) => (
          <li
            key={product.id}
            className="list-group-item d-flex align-items-center"
          >
            {product.img && (
              <img
                src={`http://localhost:8081${product.img}`}
                alt={product.name}
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "15px",
                  objectFit: "cover",
                }}
              />
            )}
            <div>
              <strong>{product.name}</strong> - {product.description}
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
