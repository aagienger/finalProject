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
              View ALL Contacts
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/searchContacts" className="nav-link text-dark">
              Search Contacts
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/new_message" className="nav-link text-dark">
              Add New Message
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/checkout" className="nav-link text-dark">
              Checkout
            </Link>
          </li>
          <>
            <li className="nav-item">
              <Link to="/add-contact" className="nav-link text-dark">
                Add Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/deletecontact" className="nav-link text-dark">
                Delete Contact
              </Link>
            </li>
          </>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
