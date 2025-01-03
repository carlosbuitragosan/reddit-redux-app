import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export const Navbar = ({ onToggle, isMenuOpen }) => {
  const handleCheckboxChange = (e) => {
    const newChecked = e.target.checked; // get the new checked state
    onToggle(newChecked); // inform App component about the new state calling handleMenuToggle
  };

  return (
    <header className="header">
      <nav>
        <Link to="/">
          <h1 className="navbar__title">REDDIT</h1>
        </Link>

        <label className="burger__menu">
          <input
            type="checkbox"
            checked={isMenuOpen}
            onChange={handleCheckboxChange}
          />
        </label>
      </nav>
    </header>
  );
};
