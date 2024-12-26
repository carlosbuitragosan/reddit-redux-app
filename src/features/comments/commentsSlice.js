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
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.byPostId[postId] = comments;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default commentsSlice.reducer;

export const selectCommentsById = (state, postId) =>
  state.comments.byPostId[postId] || [];

export const selectCommentsStatus = (state) => state.comments.status;

export const selectCommentsError = (state) => state.comments.error;
