import React, { useState, useRef, useEffect } from "react";
import "../styles/navbar.scss";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate()

  const {getLogOut} = useAuth()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="title">Feelify</h1>
      </div>
      <div className="navbar-right" ref={profileRef}>
        <div
          className="profile"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img src="profile.png" alt="Profile" className="profile-img" />
          {dropdownOpen && (
            <ul className="dropdown">
              <li><a href="#">Profile</a></li>
              {/* <li><a href="#">Settings</a></li> */}
              <li><a onClick={handleLogout} href="#">Logout</a></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

