import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/about-us">About Us</Link>
        </li>
        <li>
          <Link to="/tools">Tools</Link>
        </li>
        <li>
          <Link to="/predict-model">Predict Model</Link>
        </li>
        <li>
          <Link to="/complaints">Complaints</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
