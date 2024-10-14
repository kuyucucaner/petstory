import React from "react";
import { Link } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'; // JWT'yi çözümlemek için
import "../styles/navbar.css";

const Navbar = () => {
  // localStorage'deki tokeni al
  const token = localStorage.getItem("token"); // localStorage'dan tokeni al
  console.log("Token:", token); // Tokeni konsola yazdır
  let userId;

  if (token) {
    try {
      const decodedToken = jwtDecode(token); // JWT'yi çözümle
      console.log("Decoded Token:", decodedToken); // Token çözümlemesini kontrol et
      userId = decodedToken.user.id; // decodedToken içindeki user id'yi al
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

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
            {userId ? (
              <Link to={`/profile/${userId}`} className="nav-links">
                profile
              </Link>
            ) : (
              <span className="nav-links">profile</span> // Eğer userId yoksa link gösterilmesin
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
