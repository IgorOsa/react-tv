import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="error-page">
      <h1>
        404: Page
        {' '}
        {location.pathname}
        {' '}
        Not Found!
      </h1>
      <p>
        Back to
        {' '}
        <Link className="link-secondary" to="/">Home page</Link>
      </p>
    </div>
  );
};

export default NotFound;
