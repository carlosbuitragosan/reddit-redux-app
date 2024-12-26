import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubreddits } from '../../api/api';

const initialState = {
  list: [],
  currentSubreddit: { url: '/r/pics/' },
  status: 'idle',
  error: null,
};

export const fetchSubreddits = createAsyncThunk(
  'subreddits/fetchSubreddits',
  async () => {
    return await getSubreddits();
  },
);

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {
    setCurrentSubreddit(state, action) {
      state.currentSubreddit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //fetch subreddits
      .addCase(fetchSubreddits.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCurrentSubreddit } = subredditsSlice.actions;

export default subredditsSlice.reducer;

export const selectCurrentSubreddit = (state) =>
  state.subreddits.currentSubreddit;

export const selectSubredditById = (state, subredditId) =>
  state.subreddits.list.find((subreddit) => subreddit.id === subredditId);

export const selectSubreddits = (state) => state.subreddits.list || [];

export const selectSubredditsStatus = (state) => state.subreddits.status;

export const selectSubredditsError = (state) => state.subreddits.error;
