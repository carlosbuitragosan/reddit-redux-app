import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/api';

const initialState = {
  byPostId: {},
  status: 'idle',
  error: null,
};

export const fetchComments = createAsyncThunk(
  'reddit/fetchComments',
  async ({ permalink, postId }) => {
    const comments = await getPostComments(permalink);
    return { postId, comments };
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.comments.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.comments.byPostId[postId] = comments;
        state.comments.status = 'succeeded';
        state.comments.error = null;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.comments.status = 'failed';
        state.comments.error = action.error.message;
      });
  },
});

export default commentsSlice.reducer;

export const selectCommentsById = (state, postId) =>
  state.reddit.comments.byPostId[postId] || [];
