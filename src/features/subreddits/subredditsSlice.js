import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  currentSubreddit: { url: '/r/pics/' },
  status: 'idle',
  error: null,
};

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {
    setSubreddits(state, action) {
      state.list = action.payload;
    },
    setCurrentSubreddit(state, action) {
      state.currentSubreddit = action.payload;
    },
  },
});

export const { setSubreddits, setCurrentSubreddit } = subredditsSlice.actions;

export default subredditsSlice.reducer;

export const selectCurrentSubreddit = (state) =>
  state.subreddits.currentSubreddit;

export const selectSubredditById = (state, subredditId) =>
  state.subreddits.list.find((subreddit) => subreddit.id === subredditId);

export const selectSubreddits = (state) => state.subreddits.list || [];

export const selectSubredditsStatus = (state) => state.subreddits.status;

export const selectSubredditsError = (state) => state.subreddits.error;
