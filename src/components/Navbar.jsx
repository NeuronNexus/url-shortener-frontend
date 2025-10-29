import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">URL Shortener</Link>
        <Link to="/analytics" className="btn btn-outline-light">Analytics</Link>
      </div>
    </nav>
  );
};

export default Navbar;