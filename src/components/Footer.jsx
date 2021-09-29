import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <Container className="d-flex justify-content-center p-2">
      <Row>
        <Col>
          &copy; 2021 React Netflix Clone App
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
