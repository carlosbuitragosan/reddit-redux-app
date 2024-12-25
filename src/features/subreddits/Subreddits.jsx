import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  fetchPosts,
  fetchSubreddits,
  setSelectedSubreddit,
} from '../../store/redditSlice';

export const Subreddits = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subreddits = useSelector((state) => state.reddit.subreddits.list);
  const subreddit = useSelector((state) => state.reddit.selectedSubreddit);
  console.log('subreddit: ', subreddit);
  // useEffect(() => {

  // }, [dispatch, subreddit]);

  const handleSubredditChange = (subreddit) => {
    dispatch(setSelectedSubreddit(subreddit));
    dispatch(fetchPosts(subreddit.url));
    navigate(`/subreddits/${subreddit.id}`);
  };

  const renderedSubreddits = subreddits.map((subreddit) => {
    return (
      <Link
        onClick={() => handleSubredditChange(subreddit)}
        key={subreddit.id}
        to={`/subreddits/${subreddit.id}`}
      >
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
