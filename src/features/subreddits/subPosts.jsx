// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Subreddits } from './Subreddits';
// import {
//   fetchPosts,
//   selectSubredditById,
//   selectPostsByUrl,
// } from '../../store/redditSlice';

// export const SubredditPage = () => {
//   const { subredditId } = useParams();
//   const dispatch = useDispatch();

//   //select subreddit obj from state with subredditId from useParams
//   const subreddit = useSelector((state) =>
//     selectSubredditById(state, subredditId),
//   );

//   //get the status of the subreddits
//   const subredditsStatus = useSelector(
//     (state) => state.reddit.subreddits.status,
//   );
//   const subredditsError = useSelector((state) => state.reddit.subreddits.error);

//   //get the posts for the selected subreddit (which will be undefiened at first). add the condition 'subreddit ?' to prevent errors and load 'subreddit not found' message
//   const posts = useSelector((state) => selectPostsByUrl(state, subreddit));

//   useEffect(() => {
//     //check if there is a subreddit before fetching posts
//     if (subreddit?.url) {
//       //get posts for the selected subreddit
//       dispatch(fetchPosts(subreddit.url));
//     }
//   }, [dispatch, subreddit]);

//   if (subredditsStatus === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (subredditsStatus === 'failed') {
//     return <div>Error: {subredditsError || 'something went wrong.'}</div>;
//   }

//   if (!subreddit) {
//     return <div>Subreddit not found!</div>;
//   }

//   const renderedPosts = posts.map((post) => (
//     //this section is basically the same as the Posts component
//     <Link key={post.id} to={`/posts/${post.id}`}>
//       <div>
//         <h2>{post.title}</h2>
//         {post.thumbnail && post.thumbnail !== 'self' && (
//           <img alt={post.title} src={post.thumbnail}></img>
//         )}
//         <p>{post.num_comments} comments</p>
//       </div>
//     </Link>
//   ));
//   return (
//     <div>
//       <Subreddits />
//       <div>{renderedPosts}</div>
//     </div>
//   );
// };
