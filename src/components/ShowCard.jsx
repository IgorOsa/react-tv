import React from 'react';
import propTypes from 'prop-types';

const IMAGE_PLACEHOLDER = 'https://via.placeholder.com/286x402?text=No+Image+Yet+:(';

const ShowCard = ({ name, image }) => (
  <div className="card bg-dark text-white md-2" style={{ width: '18rem' }}>
    <img src={image || IMAGE_PLACEHOLDER} alt={name} />
    <div className="card-body">
      <h5 className="card-title">{name}</h5>
    </div>
  </div>
);

ShowCard.propTypes = {
  name: propTypes.string.isRequired,
  image: propTypes.string,
};

ShowCard.defaultProps = {
  image: IMAGE_PLACEHOLDER,
};

export default ShowCard;
