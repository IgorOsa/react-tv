import axios from 'axios';

const API_URL = 'https://api.tvmaze.com/';

export default function fetchShows() {
  return axios.get(`${API_URL}shows`);
}

export function fetchShowById(id) {
  return axios.get(`${API_URL}shows/${id}`);
}
