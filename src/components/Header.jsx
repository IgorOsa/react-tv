import React from 'react';
import { Container, Row } from 'react-bootstrap';

import Logo from './Logo';
import NavBar from './NavBar';
import './Header.scss';

const Header = () => (
  <Container>
    <Row>
      <header className="header d-flex flex-row justify-content-between my-4">
        <Logo />
        <NavBar />
      </header>
    </Row>
  </Container>
);

export default Header;
