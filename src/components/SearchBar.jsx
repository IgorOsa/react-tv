import React, { useEffect } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
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
    <div className="col-6 pt-4">
      <InputGroup size="sm" className="mb-3">
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
    </div>
  );
};

export default SearchBar;
