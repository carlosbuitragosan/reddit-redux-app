import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../posts/postsSlice';
import {
  fetchSubreddits,
  selectSubreddits,
  selectSubredditsStatus,
  selectSubredditsError,
  setCurrentSubreddit,
} from './subredditsSlice';

export const Subreddits = () => {
  const dispatch = useDispatch();

  // get the subreddits list from the state (which is empty at first)
  const subreddits = useSelector(selectSubreddits);

  // get status and error
  const subredditsStatus = useSelector(selectSubredditsStatus);
  const subredditsError = useSelector(selectSubredditsError);

  useEffect(() => {
    // fetch subreddits when list is empty
    if (subreddits.length === 0) {
      dispatch(fetchSubreddits());
    }
  }, [dispatch, subreddits]);

  if (subredditsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (subredditsStatus === 'failed') {
    return <div>Error: {subredditsError || 'something went wrong.'}</div>;
  }

  const handleSubredditClick = (subreddit) => {
    //set new current subreddit
    dispatch(setCurrentSubreddit(subreddit));
    dispatch(fetchPosts(subreddit.url));
  };

  const renderedSubreddits = subreddits.map((subreddit) => {
    return (
      <Link
        key={subreddit.id}
        to={`/subreddit/${subreddit.id}`}
        onClick={() => handleSubredditClick(subreddit)}
      >
        <div>
          <p>{subreddit.display_name}</p>
        </div>
      </Link>
    );
  });

  return (
    <div>
      <h2>Topics</h2>
      <div>{renderedSubreddits}</div>
    </div>
  );
};
