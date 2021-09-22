import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './components/Logo';
import NavBar from './components/NavBar';
import './index.css';

const Header = () => (
  <header className="header">
    <Link to="/">
      <Logo />
    </Link>
    <NavBar />
  </header>
);

export default Header;
