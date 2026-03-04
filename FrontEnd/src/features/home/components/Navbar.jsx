import React, { useState, useRef, useEffect } from "react";
import "../styles/navbar.scss";
import { useAuth } from "../../auth/hooks/useAuth";

const Navbar = () => {
    const {user} = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">Feelify</div>

        <div className="profile-section" ref={dropdownRef}>
          <button className="profile-btn" onClick={toggleDropdown}>
            <img
              className="avatar"
              src={user?.avatar || "profile.png"}
              alt="User"
            />
          </button>

          {dropdownOpen && (
            <div className="dropdown">
              <div className="user-info">
                <span className="email">{user?.email || "user@example.com"}</span>
              </div>
              <ul>
                <li>
                  <button>Account</button>
                </li>
                <li>
                  <button>Settings</button>
                </li>
                <li>
                  <button >Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;