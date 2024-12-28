import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api_root = 'https://www.reddit.com';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: api_root }),
  endpoints: (builder) => ({
    //fetch all subreddits
    getSubreddits: builder.query({
      query: () => `/subreddits.json`,
      transformResponse: (response) =>
        response.data.children.map((subreddit) => subreddit.data),
    }),
    //fetch all posts by subreddit
    getPosts: builder.query({
      query: (subreddit) => `${subreddit}.json`,
      transformResponse: (response) =>
        response.data.children.map((post) => post.data),
    }),
  }),
});

export const { useGetSubredditsQuery, useGetPostsQuery } = apiSlice;
