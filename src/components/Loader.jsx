import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Loader.scss';

const Loader = () => (
  <div className="loader-overlay">
    <Spinner animation="border" role="status" className="loader">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

export default Loader;
