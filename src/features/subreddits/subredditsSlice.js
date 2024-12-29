import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSubreddit: { url: '/r/pics/' },
};

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {
    setCurrentSubreddit(state, action) {
      state.currentSubreddit = action.payload;
    },
  },
});

export const { setCurrentSubreddit } = subredditsSlice.actions;

export default subredditsSlice.reducer;

// Selectors
export const selectCurrentSubreddit = (state) =>
  state.subreddits.currentSubreddit;

export const selectSubredditById = (state, subredditId) =>
  state.subreddits.list.find((subreddit) => subreddit.id === subredditId);
