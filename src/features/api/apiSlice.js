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
    getSubredditPosts: builder.query({
      query: (subredditUrl) => `${subredditUrl}.json`,
      transformResponse: (response) =>
        response.data.children.map((post) => post.data),
    }),
    getPostComments: builder.query({
      query: (permalink) => `${permalink}.json`,
      transformResponse: (response) =>
        response[1].data.children.map((comment) => comment.data),
    }),
  }),
});

export const {
  useGetSubredditsQuery,
  useGetSubredditPostsQuery,
  useGetPostCommentsQuery,
} = apiSlice;
