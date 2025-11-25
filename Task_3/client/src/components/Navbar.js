import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="main-header">
      <div className="logo">CLONE</div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/models">Models</NavLink>
        <NavLink to="/brand">Brand</NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;