// InspirationCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/InspirationCard.css';

const InspirationCard = ({ src, title, username }) => (
  <div className="inspiration-card">
    <img src={src} alt={title} className="inspiration-image" />
    <div className="inspiration-info">
      <h3>{title}</h3>
      <p>by {username}</p>
    </div>
  </div>
);

InspirationCard.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default InspirationCard;
