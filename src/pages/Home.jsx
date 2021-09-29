/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { selectShows, fetchShowsAsync } from '../features/shows/showsSlice';
import './Home.scss';
import ShowCard from '../components/ShowCard';
import SearchBar from '../components/SearchBar';

function Home() {
  // const shows = useSelector((state) => selectTopShows(state, 12));
  const shows = useSelector(selectShows);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchShowsAsync());
  // }, []);

  // const genres = new Set(shows.reduce((acc, el) => {
  //   acc.push(...el.genres);
  //   return acc;
  // }, []));

  // console.log([...genres].sort());

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
