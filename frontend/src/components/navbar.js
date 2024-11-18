import React from "react";
import { Link } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'; // JWT'yi çözümlemek için
import "../styles/navbar.css";
import SearchComponent from "../components/search";
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
        <SearchComponent />

          <li className="nav-item">

            <Link to="/pet" className="nav-links">
              Pet
            </Link>
            <Link to="/item" className="nav-links">
              Item
            </Link>
        
            {userId ? (
  <Link to={`/profile/${userId}`} className="nav-links">
    Profile
  </Link>
) : (
  <>
    <Link to="/login" className="nav-links">
      Login
    </Link>
    <Link to="/register" className="nav-links">
      Register
    </Link>
  </>
)}

          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
