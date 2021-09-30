import React, { useEffect } from 'react';
import {
  Col,
  Container, Dropdown, DropdownButton, Form, FormControl, InputGroup, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterGenre, setGenre } from '../features/filters/filtersSlice';
import {
  fetchShowsBySearchQueryAsync, selectSearchQuery, selectSearchResults, setQuery,
} from '../features/search/searchSlice';
import {
  fetchShowsAsync, selectGenres, setShows,
} from '../features/shows/showsSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchQuery);
  const results = useSelector(selectSearchResults);
  const genres = useSelector(selectGenres);
  const selectedGenre = useSelector(selectFilterGenre);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 2) {
        dispatch(fetchShowsBySearchQueryAsync(searchTerm));
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm === '') {
      dispatch(fetchShowsAsync());
    }
  }, []);

  useEffect(() => {
    const shows = results.map((el) => el.show);
    dispatch(setShows(shows));
  }, [results]);

  const handleChange = (e) => {
    const { value } = e.target;
    if (value === '') {
      dispatch(fetchShowsAsync());
    }
    dispatch(setQuery(value));
  };

  const handleGenreSelect = (ek, e) => {
    const { innerText } = e.target;
    let genre = innerText;
    if (innerText === 'Clear filter') {
      genre = '';
    }
    dispatch(setGenre(genre));
  };

  return (
    <div className="search-bar">
      <Container>
        <Row className="d-flex justify-content-center p-2 m-3">
          <Col className="col-12">
            <Form>
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
                <DropdownButton
                  id="dropdown-basic-button"
                  title={selectedGenre || 'Filter by Genre'}
                  variant="secondary"
                  onSelect={handleGenreSelect}
                >
                  {!!selectedGenre && <Dropdown.Item key="all" style={{ color: 'red' }}>Clear filter</Dropdown.Item>}
                  {genres.map((el) => (
                    <Dropdown.Item key={el}>
                      {el}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchBar;
