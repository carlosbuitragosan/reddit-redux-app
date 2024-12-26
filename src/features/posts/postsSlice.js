import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubredditPosts } from '../../api/api';

const initialState = {
  bySubreddit: {},
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subredditUrl) => {
    const posts = await getSubredditPosts(subredditUrl);
    return { subredditUrl, posts };
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const { subredditUrl, posts } = action.payload;
        state.bySubreddit[subredditUrl] = posts;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;

export const selectPostsByUrl = (state, subreddit) =>
  subreddit ? state.posts.bySubreddit[subreddit.url] || [] : [];

export const selectPostById = (state, subreddit, postId) =>
  subreddit && postId
    ? state.posts.bySubreddit[subreddit.url]?.find((post) => post.id === postId)
    : null;
