import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const API_URL = 'https://api.tvmaze.com/';

export default function fetchShows() {
  return axios.get(`${API_URL}shows`);
}

export const showsApi = createApi({
  reducerPath: 'showsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  endpoints: (builder) => ({
    getShows: builder.query({
      query: () => 'shows',
    }),
    getShowById: builder.query({
      query: (id) => `shows/${id}`,
    }),
  }),
});

export const { useGetShowsQuery, useGetShowByIdQuery } = showsApi;
