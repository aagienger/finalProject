import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Checkout = ({ products, setProducts }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:8081/cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        alert("There was an Error loading cart " + error);
      }
    };
    fetchCart();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Input Order Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <textarea
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Place Order
        </button>
      </form>
      <div>
        Cart
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
                <strong>{product.name}</strong> - {product.price} - {product.amount}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Checkout;
