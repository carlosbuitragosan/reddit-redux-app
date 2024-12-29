import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
export const Navbar = () => {
  return (
    <>
      <nav>
        <Link to="/">
          <h1 className="navbar-title">Reddit</h1>
        </Link>
      </nav>
    </>
  );
};
