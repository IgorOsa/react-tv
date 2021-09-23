import axios from 'axios';

export default function fetchShows() {
  const API_URL = 'https://api.tvmaze.com/shows';
  return axios.get(API_URL);
}
