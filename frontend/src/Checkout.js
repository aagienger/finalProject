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
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCVV] = useState("");

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

  const resetCart = async (product) => {
    const updatedAmount = 0;

    try {
      const response = await fetch(
        `http://localhost:8081/product/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: updatedAmount }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.err}`);
      }
    } catch (err) {
      console.error("Error updating product amount:", err);
      alert("Failed to update the amount");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    products.map((product) => {
      resetCart(product);
    });

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
    setName("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setEmail("");
    setPhoneNumber("");
    setCardNumber("");
    setExpDate("");
    setCVV("");
  };

  const getCost = () => {
    var cost = 0.0;

    products.map((product) => {
      cost += product.price * product.amount;
    });

    return cost;
  };

  return (
    <div className="container mt-4 d-flex">
      <div
        className="d-flex flex-column vh-100 p-3 bg-light"
        style={{ width: "500px" }}
      >
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
            <input
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Zip</label>
            <input
              type="text"
              className="form-control"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Card Number</label>
            <input
              type="text"
              className="form-control"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Expiration Date</label>
            <input
              type="text"
              className="form-control"
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">CVV</label>
            <input
              type="text"
              className="form-control"
              value={cvv}
              onChange={(e) => setCVV(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Place Order
          </button>
        </form>
      </div>
      <div className="flex-grow-1 p-3">
        <h2 className="text-center">Cart</h2>
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
                <strong>{product.name}</strong> - Price -{" "}
                {product.price * product.amount} - Amount - {product.amount}
              </div>
            </li>
          ))}
        </ul>
        <h5>Total Cost : ${getCost()}</h5>
      </div>
    </div>
  );
};

export default Checkout;
