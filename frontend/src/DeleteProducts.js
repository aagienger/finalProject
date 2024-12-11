import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteProduct = ({ products, setProducts }) => {
  const [productName, setproductName] = useState("");
  const [productsQuery, setproductsQuery] = useState([]);

  const fetchproducts = async () => {
    if (!productName.trim()) {
      alert("Please enter a product name");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8081/product/name?product_name=${encodeURIComponent(
          productName
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setproductsQuery(data);
    } catch (err) {
      alert("There was an Error loading searched products " + err);
    }
  };

  const deleteOneproduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/product/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      alert("product deleted successfully");
      setproductsQuery(productsQuery.filter((product) => product.id !== id));
    } catch (err) {
      alert("There was an error deleting the product: " + err);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">Delete Product</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Product name"
          value={productName}
          onChange={(e) => setproductName(e.target.value.toLowerCase())}
        />
        <button className="btn btn-primary" onClick={fetchproducts}>
          Search
        </button>
      </div>
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
            
            
            <button
              className="btn btn-outline-secondary btn-sm rounded-pill"
              onClick={() => deleteOneproduct(product.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default DeleteProduct;
