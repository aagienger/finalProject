import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Checkout = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
        <div className="mb-3">
          <label className="form-label">Contact Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Add Contact
        </button>
      </form>
      <div>
        Cart
          
      </div>
    </div>
  );
};

export default Checkout;
