import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Item, PostPutItemMutationProps, Project, User } from '../types/models';
import { BidPayload } from '../types/openApi/models/Bid.model';
import { buildFileUploadRequest } from './custom-queries';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

// Define a service using a base URL and expected endpoints
export const heirTimeApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
    }
  }),
  tagTypes: ['user', 'projects', 'items'],
  endpoints: (builder) => ({
    // **************************** USER ****************************
    getSelf: builder.query<User, void>({
      query: () => ({
        url: '/user/me',
        method: 'GET'
      }),
      providesTags: ['user']
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/user/logout',
        method: 'GET'
      }),
      invalidatesTags: ['user', 'projects', 'items']
    }),
    login: builder.mutation<User, { emailAddress: string; password: string }>({
      query: ({ emailAddress, password }) => ({
        url: '/user/login',
        method: 'POST',
        body: { emailAddress, password }
      }),
      invalidatesTags: ['user']
    }),
    // **************************** PROJECTS ****************************
    getOwnProjects: builder.query<Project[], void>({
      query: () => ({
        url: '/project',
        method: 'GET'
      }),
      providesTags: ['projects']
    }),
    // **************************** ITEMS ****************************
    getItemById: builder.query<Item, string>({
      query: (id) => ({
        url: `/item/${id}`,
        method: 'GET'
      }),
      providesTags: ['items']
    }),
    getItemsByProjectId: builder.query<Item[], string>({
      query: (projectId) => ({
        url: `/item?projectId=${projectId}`,
        method: 'GET'
      })
    }),
    postItem: builder.mutation<Item, PostPutItemMutationProps>({
      queryFn: async (data: PostPutItemMutationProps) => {
        const requestOptions = buildFileUploadRequest(data, 'POST');
        const response = await fetch(`${API_URL}/item`, requestOptions);

        return await response.json();
      },
      invalidatesTags: ['items']
    }),
    updateItem: builder.mutation<Item, PostPutItemMutationProps>({
      queryFn: async (data: PostPutItemMutationProps) => {
        const requestOptions = buildFileUploadRequest(data, 'PUT');
        const response = await fetch(`${API_URL}/item`, requestOptions);

        return await response.json();
      },
      invalidatesTags: ['items']
    }),
    deleteItem: builder.mutation<number, { itemId: number; projectId: string }>({
      query: ({ itemId, projectId }) => ({
        url: `/item/${itemId}?projectId=${projectId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['items']
    }),
    submitItemBid: builder.mutation<Item, BidPayload>({
      query: (body) => ({
        url: '/item/bid',
        method: 'PUT',
        body
      }),
      invalidatesTags: ['items']
    })
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSelfQuery,
  useLoginMutation,
  useLogoutMutation,
  useGetOwnProjectsQuery,
  useGetItemByIdQuery,
  useGetItemsByProjectIdQuery,
  usePostItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useSubmitItemBidMutation
} = heirTimeApi;
