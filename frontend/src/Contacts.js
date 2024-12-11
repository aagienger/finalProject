import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Products = ({ products, setProducts }) => {
  const [selectedType, setSelectedType] = useState("all");
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
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value); // Update selected type
  };
  const filteredProducts = selectedType === "all"
  ? products : products.filter(product => product.type === selectedType);
  return (
    <div className="container">
      
      <h2 className="text-center mt-4">Products List</h2>
      <div className="mb-3">
        <label htmlFor="type-select" className="form-label">Filter</label>
        <select
          id="type-select"
          className="form-select"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="all">All Products</option>
          <option value="laptop">Laptops</option>
          <option value="monitor">Monitors</option>
          <option value="console">Consoles</option>
          <option value="desk">Pcs</option>
          {/* Add more options based on your available product types */}
        </select>
      </div>
      <ul className="list-group">
        {filteredProducts.map((product) => (
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
              <p>$<strong>{product.price}</strong></p>
              <button type="button" variant="light" > + </button>
              <button type="button" variant="light" > - </button>{" "}
              
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
