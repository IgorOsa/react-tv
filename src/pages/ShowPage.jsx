import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowByIdAsync, selectCurrentShow } from '../features/shows/showsSlice';

const ShowPage = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const show = useSelector(selectCurrentShow);

  useEffect(() => {
    dispatch(fetchShowByIdAsync(id));
  }, []);

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
          className="col-12 col-md-5 col-lg-5 col-xl-4 align-self-center"
          src={show.image && show.image.original}
          alt={show.name}
        />
        <Col className="col-12 col-md-7 col-lg-7 col-xl-8">
          <p>{show && show.summary && show.summary.replace(/<\/?[^>]+(>|$)/g, '')}</p>
        </Col>
      </Row>
    </Container>
  );
};

ShowPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShowPage;
