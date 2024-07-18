// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Import CSS file for NavBar styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/" className="nav-link logo">
            FG FOODIE DELIGHT
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            User
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
