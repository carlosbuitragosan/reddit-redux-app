// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getPostComments, getSubredditPosts, getSubreddits } from '../api/api';

// const initialState = {
//   subreddits: {
//     list: [],
//     status: 'idle',
//     error: null,
//   },
//   posts: {
//     bySubreddit: {},
//     status: 'idle',
//     error: null,
//   },
//   comments: {
//     byPostId: {},
//     status: 'idle',
//     error: null,
//   },
//   selectedSubreddit: { url: '/r/pics/' },
// };

// export const fetchPosts = createAsyncThunk(
//   'reddit/fetchPosts',
//   async (subredditUrl) => {
//     const posts = await getSubredditPosts(subredditUrl);
//     return { subredditUrl, posts };
//   },
// );

// export const fetchSubreddits = createAsyncThunk(
//   'reddit/fetchSubreddits',
//   async () => {
//     return await getSubreddits();
//   },
// );

// export const fetchComments = createAsyncThunk(
//   'reddit/fetchComments',
//   async ({ permalink, postId }) => {
//     const comments = await getPostComments(permalink);
//     return { postId, comments };
//   },
// );

// const redditSlice = createSlice({
//   name: 'reddit',
//   initialState,
//   reducers: {
//     setSelectedSubreddit(state, action) {
//       state.selectedSubreddit = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       //fetch posts
//       .addCase(fetchPosts.pending, (state) => {
//         state.posts.status = 'loading';
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         const { subredditUrl, posts } = action.payload;
//         state.posts.bySubreddit[subredditUrl] = posts;
//         state.posts.status = 'succeeded';
//         state.posts.error = null;
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.posts.status = 'failed';
//         state.posts.error = action.error.message;
//       })
//       //fetch subreddits
//       .addCase(fetchSubreddits.pending, (state) => {
//         state.subreddits.status = 'loading';
//       })
//       .addCase(fetchSubreddits.fulfilled, (state, action) => {
//         state.subreddits.list = action.payload;
//         state.subreddits.status = 'succeeded';
//         state.subreddits.error = null;
//       })
//       .addCase(fetchSubreddits.rejected, (state, action) => {
//         state.subreddits.status = 'failed';
//         state.subreddits.error = action.error.message;
//       })
//       //fetch comments
//       .addCase(fetchComments.pending, (state) => {
//         state.comments.status = 'loading';
//       })
//       .addCase(fetchComments.fulfilled, (state, action) => {
//         const { postId, comments } = action.payload;
//         state.comments.byPostId[postId] = comments;
//         state.comments.status = 'succeeded';
//         state.comments.error = null;
//       })
//       .addCase(fetchComments.rejected, (state, action) => {
//         state.comments.status = 'failed';
//         state.comments.error = action.error.message;
//       });
//   },
// });

// export const { setSelectedSubreddit } = redditSlice.actions;
// export default redditSlice.reducer;

// // selectPostsByUrl
// export const selectPostsByUrl = (state, subreddit) =>
//   subreddit ? state.reddit.posts.bySubreddit[subreddit.url] || [] : [];

// // selectSelectedSubreddit
// export const selectSelectedSubreddit = (state) =>
//   state.reddit.selectedSubreddit;

// // selectSubredditById
// export const selectSubredditById = (state, subredditId) =>
//   state.reddit.subreddits.list.find(
//     (subreddit) => subreddit.id === subredditId,
//   );

// // selectSubreddits
// export const selectSubreddits = (state) => state.reddit.subreddits.list || [];

// // selectCommentsById
// export const selectCommentsById = (state, postId) =>
//   state.reddit.comments.byPostId[postId] || [];

// //find the post by subreddit url and postId. check for subreddit to prevent errors.
// export const selectPostById = (state, subreddit, postId) =>
//   subreddit
//     ? state.reddit.posts.bySubreddit[subreddit.url]?.find(
//         (post) => post.id === postId,
//       )
//     : null;
