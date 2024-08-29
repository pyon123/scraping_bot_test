import { ISite } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sitesApi = createApi({
  reducerPath: 'sitesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/sites' }),
  tagTypes: ['Sites'],
  endpoints: (builder) => ({
    getSites: builder.query<ISite[], void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: ['Sites'],
    }),
    getSite: builder.query<ISite, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: ['Sites'],
    }),
    addSite: builder.mutation<void, { site: string; requireSubSearch: boolean; note: string }>({
      query: ({ site, requireSubSearch, note }) => ({
        url: '',
        method: 'POST',
        body: { site, requireSubSearch, note },
      }),
      invalidatesTags: ['Sites'],
    }),
    markWrong: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Sites'],
    }),
  }),
});

export const { useGetSitesQuery, useGetSiteQuery, useAddSiteMutation, useMarkWrongMutation } = sitesApi;
