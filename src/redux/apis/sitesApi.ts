import { ISite } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sitesApi = createApi({
  reducerPath: 'sitesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/sites' }),
  endpoints: (builder) => ({
    getSites: builder.query<ISite[], void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
    }),
    getSite: builder.query<ISite, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'GET',
      }),
    }),
    addSite: builder.mutation<void, { site: string }>({
      query: ({ site }) => ({
        url: '',
        method: 'POST',
        body: { site },
      }),
    }),
  }),
});

export const { useGetSitesQuery, useGetSiteQuery, useAddSiteMutation } = sitesApi;
