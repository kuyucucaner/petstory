import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          PETSTORY
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/login" className="nav-links">
              Login
            </Link>
            <Link to="/pet" className="nav-links">
              pet
            </Link>
            <Link to="/item" className="nav-links">
              item
            </Link>
            <Link to="/profile/:userId" className="nav-links">
            profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
