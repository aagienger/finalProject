import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {

  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
            
            
    <div
      className="d-flex flex-column vh-100 p-3 bg-light"
      style={{ width: "250px" }}
    >
      <h2 className="text-center">Navigation</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link text-dark">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contacts" className="nav-link text-dark">
            View All Products
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/products" className="nav-link text-dark">
            Search
          </Link>
        </li>
        <li className="nav-item">
          <button className="nav-link text-dark" >
            Monitors
          </button>
        </li>
        
          
        
      </ul>
      
    </div>
    </div>
  );
};

export default Sidebar;
