import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sitesApi = createApi({
  reducerPath: 'sitesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/sites' }),
  endpoints: (builder) => ({
    getSites: builder.query<void, void>({
      query: () => ({
        url: '',
        method: 'get',
      }),
    }),
  }),
});

export const { useGetSitesQuery } = sitesApi;
