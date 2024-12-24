import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments, getSubredditPosts, getSubreddits } from '../api/api';

const initialState = {
  subreddits: {
    list: [],
    status: 'idle',
    error: null,
  },
  posts: {
    bySubreddit: {},
    status: 'idle',
    error: null,
  },
  comments: {
    byPostId: {},
    status: 'idle',
    error: null,
  },
  selectedSubreddit: {},
};

export const fetchPosts = createAsyncThunk(
  'reddit/fetchPosts',
  async (subreddit) => {
    const posts = await getSubredditPosts(subreddit);
    return { subreddit, posts };
  },
);

export const fetchSubreddits = createAsyncThunk(
  'reddit/fetchSubreddits',
  async () => {
    return await getSubreddits();
  },
);

export const fetchComments = createAsyncThunk(
  'reddit/fetchComments',
  async ({ permalink, postId }) => {
    const comments = await getPostComments(permalink);
    return { postId, comments };
  },
);

const redditSlice = createSlice({
  name: 'reddit',
  initialState,
  reducers: {
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const { subreddit, posts } = action.payload;
        state.posts.bySubreddit[subreddit] = posts;
        state.status = 'succeded';
        state.posts.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.posts.status = 'failed';
        state.posts.error = action.error.message;
      })
      //fetch subreddits
      .addCase(fetchSubreddits.pending, (state) => {
        state.subreddits.status = 'loading';
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.subreddits.list = action.payload;
        state.subreddits.status = 'succeded';
        state.subreddits.error = null;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.subreddits.status = 'failed';
        state.subreddits.error = action.error.message;
      })
      //fetch comments
      .addCase(fetchComments.pending, (state) => {
        state.comments.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.comments.byPostId[postId] = comments;
        state.comments.status = 'succeded';
        state.comments.error = null;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.comments.status = 'failed';
        state.comments.error = action.error.message;
      });
  },
});

export const { setSelectedSubreddit } = redditSlice.actions;
export default redditSlice.reducer;
