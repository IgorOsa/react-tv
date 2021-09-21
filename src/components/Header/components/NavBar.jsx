import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => (
    <nav className="header__nav">
        <ul className="navbar">
            <li><Link to="/sign-up">Sign Up</Link></li>
        </ul>
    </nav>
);

export default NavBar;