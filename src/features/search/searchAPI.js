import axios from 'axios';

const API_URL = 'https://api.tvmaze.com/search/shows';

export default function fetchShowsBySearchQuery(query) {
  return axios.get(`${API_URL}?q=${query}`);
}
