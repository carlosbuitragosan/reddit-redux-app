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
      state.selectedSubreddit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //fetch subreddits
      .addCase(fetchSubreddits.pending, (state) => {
        state.subreddits.status = 'loading';
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.subreddits.list = action.payload;
        state.subreddits.status = 'succeeded';
        state.subreddits.error = null;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.subreddits.status = 'failed';
        state.subreddits.error = action.error.message;
      });
  },
});

export const { setSelectedSubreddit } = subredditsSlice.actions;
export default subredditsSlice.reducer;

export const selectCurrentSubreddit = (state) =>
  state.subreddits.currentSubreddit;

export const selectSubredditById = (state, subredditId) =>
  state.subreddits.list.find((subreddit) => subreddit.id === subredditId);

export const selectSubreddits = (state) => state.subreddits.list || [];
