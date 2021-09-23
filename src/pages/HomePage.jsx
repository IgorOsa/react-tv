import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { selectTopShows, fetchShowsAsync } from '../features/shows/showsSlice';

import './HomePage.scss';

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
      <Row className="d-flex flex-row">
        {shows.map(
          (el) => (
            <Col key={el.id} className="m-2 text-center">
              <Link to={`/show/${el.id}`} className="card__link">
                <div className="card bg-dark text-white md-2" style={{ width: '18rem' }}>
                  <img src={el.image.medium} alt={el.name} />
                  <div className="card-body">
                    <h5 className="card-title">{el.name}</h5>
                    <p className="card-text">
                      {el.summary.replace(/<\/?[^>]+(>|$)/g, '').split(' ').slice(0, 16).join(' ')}
                      ...
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
          ),
        )}
      </Row>
    </Container>
  );
}

export default HomePage;
