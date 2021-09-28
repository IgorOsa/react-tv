import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { selectTopShows, fetchShowsAsync } from '../features/shows/showsSlice';

import './Home.scss';
import ShowCard from '../components/ShowCard';
import SearchBar from '../components/SearchBar';

function Home() {
  const shows = useSelector((state) => selectTopShows(state, 12));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShowsAsync());
  }, []);

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <SearchBar />
      </Row>
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
                <ShowCard name={el.name} image={el.image.medium} />
              </Link>
            </Col>
          ),
        )}
      </Row>
    </Container>
  );
}

export default Home;
