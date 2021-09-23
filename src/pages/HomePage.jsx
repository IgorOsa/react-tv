import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { selectTopShows, fetchShowsAsync } from '../features/shows/showsSlice';

function HomePage() {
  const shows = useSelector((state) => selectTopShows(state, 12));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShowsAsync());
  }, []);

  return (
    <Container>
      <Row>
        <Col className="text-center pt-4 pb-2">
          <h2>Top shows</h2>
        </Col>
      </Row>
      <Row className="d-flex flex-row justify-content-between">
        {shows.map(
          (el) => (
            <Col key={el.id} className="m-3 text-center">
              <img src={el.image.medium} alt={el.name} />
            </Col>
          ),
        )}
      </Row>
    </Container>
  );
}

export default HomePage;
