import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { faHeart, faStar } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchShowByIdAsync, selectCurrentShow } from '../features/shows/showsSlice';

const Show = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const show = useSelector(selectCurrentShow);
  const [isLiked, setIsLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    dispatch(fetchShowByIdAsync(id));
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleStar = () => {
    setIsStarred(!isStarred);
  };

  return (
    <Container className="pb-5">
      <Row>
        <Col className="text-center pt-4 pb-2">
          <h2>
            {show.name}
          </h2>
        </Col>
      </Row>
      <Row>
        <img
          className="col-12 col-md-5 col-lg-4 col-xl-4 align-self-center mb-2"
          src={show.image && show.image.original}
          alt={show.name}
        />
        <Col className="col-12 col-md-7 col-lg-7 col-xl-8">
          <p>{show && show.summary && show.summary.replace(/<\/?[^>]+(>|$)/g, '')}</p>
          <button type="button" onClick={handleLike} className="btn__like me-3">
            { !isLiked
              ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  size="2x"
                  className="d-flex color-red"
                  alt="Like"
                  title="Like"
                />
              )
              : (
                <FontAwesomeIcon
                  icon={faHeartSolid}
                  size="2x"
                  className="d-flex color-red"
                  alt="UnLike"
                  title="UnLike"
                />
              )}
          </button>
          <button type="button" onClick={handleStar} className="btn__star">
            { !isStarred
              ? (
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className="d-flex color-red"
                  alt="Like"
                  title="Add to Favorites"
                />
              )
              : (
                <FontAwesomeIcon
                  icon={faStarSolid}
                  size="2x"
                  className="d-flex color-red"
                  alt="UnLike"
                  title="Remove from Favorites"
                />
              )}
          </button>
        </Col>
      </Row>
    </Container>
  );
};

Show.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Show;
