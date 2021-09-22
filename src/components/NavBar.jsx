import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => (
  <nav className="header__nav">
    <ul className="navbar">
      <Link to="/sign-up"><li className="btn btn-primary btn-red">Sign Up</li></Link>
    </ul>
  </nav>
);

export default NavBar;
