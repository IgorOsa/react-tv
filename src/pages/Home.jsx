import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { selectFilteredShows } from '../features/shows/showsSlice';
import './Home.scss';
import ShowCard from '../components/ShowCard';
import SearchBar from '../components/SearchBar';

function Home() {
  const shows = useSelector(selectFilteredShows);

  return (
    <>
      <SearchBar />
      <Container>
        <Row>
          <Col className="text-center pt-4 pb-2">
            <h2>Shows</h2>
          </Col>
        </Row>
        <Row>
          {shows && shows.map(
            (el) => (
              <Col key={el.id} className="d-flex flex-row justify-content-center m-2 text-center">
                <Link to={`/show/${el.id}`} className="card__link">
                  <ShowCard name={el.name} image={el && el.image && el.image.medium} />
                </Link>
              </Col>
            ),
          )}
        </Row>
      </Container>
    </>
  );
}

export default Home;
