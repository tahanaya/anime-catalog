// src/components/Header.js
import React from 'react';
import './Header.css'; // <-- Import the CSS

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-container">
        <div className="nav-content">
          <div className="logo">
         Anime 
            <span className="highlight">⚡</span>
          </div>
          
        </div>
      </nav>
    </header>
  );
};

export default Header;
