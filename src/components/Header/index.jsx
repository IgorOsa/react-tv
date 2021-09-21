import React from 'react'
import Logo from './components/Logo';
import NavBar from './components/NavBar';
import { Link } from 'react-router-dom';
import './index.css';

const Header = () => {
    return (
        <header className="header">
            <Link to="/">
                <Logo />
            </Link>
            <NavBar />
        </header>
    );
}

export default Header;
