import React, {useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchContact = ({ products, setProducts }) => {
  const [productName, setProductName] = useState("");
  const [productsQuery, setProductsQuery] = useState([]);

  const fetchProducts = async () => {
    if (!productName.trim()) {
      alert("Please enter a Product name");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8081/product/name?contact_name=${encodeURIComponent(
          productName
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      setProductsQuery(data);
    } catch (err) {
      alert("There was an Error loading one contact " + err);
    }
  };
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
      <h2 className="text-center mt-4">Search Product</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value.toLowerCase())}
        />
        <button className="btn btn-primary" onClick={fetchProducts}>
          Search
        </button>
      </div>
      {/* List the result */}
      <ul className="list-group">
        {productsQuery.map((product) => (
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
              
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SearchContact;
