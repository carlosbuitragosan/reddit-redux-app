// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import {
//   fetchPosts,
//   setSelectedSubreddit,
//   selectSubreddits,
// } from '../../store/redditSlice';

// export const Subreddits = () => {
//   const dispatch = useDispatch();

//   // get the subreddits list from the state
//   const subreddits = useSelector(selectSubreddits);

//   // get the status of the subreddits
//   const subredditsStatus = useSelector(
//     (state) => state.reddit.subreddits.status,
//   );
//   const subredditsError = useSelector((state) => state.reddit.subreddits.error);

//   // get the selected subreddit from the state
//   // const subreddit = useSelector((state) => state.reddit.selectedSubreddit);

//   const handleSubredditClick = (subreddit) => {
//     //set new selected subreddit from the list bellow and based on that fetch posts
//     dispatch(setSelectedSubreddit(subreddit));
//     dispatch(fetchPosts(subreddit.url));
//   };

//   if (subredditsStatus === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (subredditsStatus === 'failed') {
//     return <div>Error: {subredditsError || 'something went wrong.'}</div>;
//   }

//   const renderedSubreddits = subreddits.map((subreddit) => {
//     return (
//       <Link
//         to={`/subreddits/${subreddit.id}`}
//         onClick={() => handleSubredditClick(subreddit)}
//         key={subreddit.id}
//       >
//         <div>
//           <p>{subreddit.display_name}</p>
//         </div>
//       </Link>
//     );
//   });

//   return (
//     <div>
//       <div>{renderedSubreddits}</div>
//     </div>
//   );
// };
