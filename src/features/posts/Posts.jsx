// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import React, { useEffect } from 'react';
// import { Subreddits } from '../subreddits/Subreddits';
// import {
//   fetchPosts,
//   fetchSubreddits,
//   setSelectedSubreddit,
//   selectSelectedSubreddit,
//   selectSubreddits,
//   selectPostsByUrl,
// } from '../../store/redditSlice';

// export const Posts = () => {
//   const dispatch = useDispatch();

//   // get the subreddit url from the hardoded state
//   const subreddit = useSelector(selectSelectedSubreddit);

//   // get the list of subreddits (which is empty at first)
//   const subreddits = useSelector(selectSubreddits);

//   // get the status of the posts
//   const postsStatus = useSelector((state) => state.reddit.posts.status);
//   const postsError = useSelector((state) => state.reddit.posts.error);

//   //find the post based on the subreddit url (which will be undefined at first)
//   const posts = useSelector((state) => selectPostsByUrl(state, subreddit));

//   // fetch subreddits when list is empty
//   useEffect(() => {
//     if (subreddits.length === 0) {
//       dispatch(fetchSubreddits());
//     }
//   }, [dispatch, subreddits, posts]);

//   // fetch posts when subreddit is selected
//   useEffect(() => {
//     if (subreddit) {
//       dispatch(fetchPosts(subreddit.url));
//       dispatch(setSelectedSubreddit(subreddit));
//     }
//   }, [dispatch, subreddit]);

//   if (postsStatus === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (postsStatus === 'failed') {
//     return <div>Error: {postsError || 'something went wrong.'}</div>;
//   }

//   const renderedPosts = posts.map((post) => {
//     return (
//       <Link key={post.id} to={`/posts/${post.id}`}>
//         <div>
//           <h2>{post.title}</h2>
//           <img alt={post.title} src={post.thumbnail}></img>
//           <p>{post.num_comments} comments</p>
//         </div>
//       </Link>
//     );
//   });

//   return (
//     <div>
//       <Subreddits />
//       <h1>Reddit Posts</h1>
//       <div>{renderedPosts}</div>
//     </div>
//   );
// };
