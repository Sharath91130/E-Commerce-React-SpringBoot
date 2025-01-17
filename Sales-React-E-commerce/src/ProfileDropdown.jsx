import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './assets/styles.css';

export function ProfileDropdown({ username }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Add your logout functionality here
  };

  return (
      <div className="profile-dropdown">
        <button className="profile-button" onClick={toggleDropdown}>
          <img
              src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
              alt="User Avatar"
              className="user-avatar"
              onError={(e) => { e.target.src = 'fallback-logo.png'; }} // Fallback for image error
          />
          <span className="username">{username || 'Guest'}</span> {/* Display username */}
        </button>
        {isOpen && (
            <div className="dropdown-menu">
              <Link to="/profile">Profile</Link> {/* Navigate to Profile page */}
              <Link to="/orders">Orders</Link> {/* Navigate to Orders page */}
              <button className="profile-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
        )}
      </div>
  );
}
