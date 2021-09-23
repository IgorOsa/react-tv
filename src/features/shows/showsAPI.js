// A mock function to mimic making an async request for data
export default function fetchShows() {
  return fetch('https://api.tvmaze.com/shows').then((r) => r.json());
}
