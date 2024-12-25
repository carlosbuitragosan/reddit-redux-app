import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchPosts,
  fetchSubreddits,
  setSelectedSubreddit,
} from '../../store/redditSlice';

export const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector((state) => state.reddit.subreddits.list);

  // useEffect(() => {
  //   dispatch(fetchSubreddits());
  // }, [dispatch]);

  // const handleSubredditChange = (subreddit) => {
  //   dispatch(setSelectedSubreddit(subreddit));
  //   dispatch(fetchPosts(subreddit.url));
  // };

  const renderedSubreddits = subreddits.map((subreddit) => {
    return (
      <Link key={subreddit.id} to={`/subreddits/${subreddit.id}`}>
        <div>
          <p>{subreddit.display_name}</p>
        </div>
      </Link>
    );
  });

  return (
    <div>
      <h1>Subreddits</h1>
      <div>{renderedSubreddits}</div>
    </div>
  );
};
