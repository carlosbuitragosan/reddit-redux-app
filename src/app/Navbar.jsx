import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export const Navbar = () => {
  return (
    <header>
      <nav>
        <Link to="/">
          <h1 className="navbar__title">REDDIT</h1>
        </Link>

        <label className="burger__menu">
          <input type="checkbox" />
        </label>
      </nav>
    </header>
  );
};
