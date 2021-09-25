import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => (
  <nav className="header__nav">
    <ul className="navbar">
      <Link to="/signin" className=""><li className="btn btn-primary btn-red">Sign In</li></Link>
    </ul>
  </nav>
);

export default NavBar;
