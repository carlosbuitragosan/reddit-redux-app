import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'reddit/fetchPosts',
  async (subreddit) => {
    const response = await fetch(`https://www.reddit.com${subreddit}.json`);
    const data = await response.json();
    return data.data.children.map((post) => post.data);
  },
);

const redditSlice = createSlice({
  name: 'reddit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default redditSlice.reducer;
