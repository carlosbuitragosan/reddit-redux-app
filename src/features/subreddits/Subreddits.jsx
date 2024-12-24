import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchPosts,
  fetchSubreddits,
  setSelectedSubreddit,
} from '../../store/redditSlice';

export const Subreddits = () => {
  return;
  // const dispatch = useDispatch();
  // const subreddits = useSelector((state) => state.reddit.subreddits.list);

  // useEffect(() => {
  //   dispatch(fetchSubreddits());
  // }, [dispatch]);

  // const handleSubredditChange = (subreddit) => {
  //   dispatch(setSelectedSubreddit(subreddit));
  //   dispatch(fetchPosts(subreddit));
  // };

  // const renderedSubreddits = subreddits.map((subreddit,) => {
  //   return (
  //     <div key={subreddit.id}>
  //       <Link
  //         to={`/subreddits/${subreddit.id}`}
  //         onClick={() => handleSubredditChange(subreddit.url)}
  //       >
  //         <button>{subreddit.display_name}</button>
  //       </Link>
  //     </div>
  //   );
  // });

  // return (
  //   <div>
  //     <h1>Subreddits</h1>
  //     <div>{renderedSubreddits}</div>
  //   </div>
  // );
};
