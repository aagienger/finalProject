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
  }, [products]);
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value); // Update selected type
  };
  const filteredProducts = selectedType === "all"
  ? products : products.filter(product => product.type === selectedType);

  const handleIncrement = async (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const updatedAmount = product.amount + 1;

    try {
      const response = await fetch(`http://localhost:8081/product/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body:  JSON.stringify({amount : updatedAmount}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.err}`);
        return;
      }

      
    } catch (err) {
      console.error("Error updating product amount:", err);
      alert("Failed to update the amount");
    }
  };
  const handleDecrement = async (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product || product.amount <= 0) return;

    const updatedAmount = product.amount - 1;

    try {
      const response = await fetch(`http://localhost:8081/product/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: updatedAmount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.err}`);
        return;
      }

      // Update local state
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, amount: updatedAmount } : p
        )
      );
    } catch (err) {
      console.error("Error updating product amount:", err);
      alert("Failed to update the amount");
    }
  };
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
              <button type="button" variant="light" onClick={()=>handleIncrement(product.id)}> + </button>
              <button type="button" variant="light" onClick={()=>handleDecrement(product.id)}> - </button>{" "}
              {product.amount} in cart
              
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
