/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  Col,
  Container, FormControl, InputGroup, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchShowsBySearchQueryAsync, selectSearchQuery, selectSearchResults, setQuery,
} from '../features/search/searchSlice';
import { fetchShowsAsync, setShows } from '../features/shows/showsSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchQuery);
  const results = useSelector(selectSearchResults);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 2) {
        dispatch(fetchShowsBySearchQueryAsync(searchTerm));
      } else {
        dispatch(fetchShowsAsync());
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const shows = results.map((el) => el.show);
    dispatch(setShows(shows));
  }, [results]);

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(setQuery(value));
  };

  return (
    <div className="search-bar">
      <Container>
        <Row className="d-flex justify-content-center p-2 m-3">
          <Col className="col-12">
            <InputGroup size="sm">
              <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
              <FormControl
                type="search"
                role="search"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Type to search"
                onChange={handleChange}
                value={searchTerm}
              />
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchBar;
