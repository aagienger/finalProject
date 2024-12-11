import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddContact = () => {
  const [productName, setProductName] = useState("");
  const [type,setType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState(null);
  const [amount,setAmount] = useState("");
  const addOneContact = async () => {
    try {
      // Create a FormData object to hold the fields and the file
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("image", image);
      formData.append("description", description);// Add the file to the form data
      formData.append("price", price);
      formData.append("amount",amount);
      formData.append("type", type);
      // Send the FormData object to the backend
      const response = await fetch("http://localhost:8081/product", {
        method: "POST",
        body: formData, // No need to set Content-Type; fetch will handle it
      });
      if (!response.ok) {
        // Handle errors (status code 4xx or 5xx)
        const errorData = await response.json(); // Parse JSON error response
        alert("Error: " + errorData.error);
      } else {
        // Status code 201 indicates success
        const successMessage = await response.text(); // Handle plain text response
        alert(successMessage);
      }
      console.log(response);
    } catch (err) {
      alert("An error occurred :" + err);
      
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Show preview
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call this function to fetch backend with method POST
    addOneContact();
    // Clean hooks to start again
    setProductName("");
    setType("");
    setDescription("");
    setImage(null);
    setPrice("");
    setAmount("0");
    
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <textarea
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <textarea
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <textarea
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Product Image</label>
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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddContact;
