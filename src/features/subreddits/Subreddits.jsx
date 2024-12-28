import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../posts/postsSlice';
import { setCurrentSubreddit, setSubreddits } from './subredditsSlice';
import { useGetSubredditsQuery } from '../api/apiSlice';

export const Subreddits = () => {
  const dispatch = useDispatch();

  const {
    data: subreddits = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubredditsQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSubreddits(subreddits));
    }
  });

  let content = React.ReactNode;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>Error: {error.message || 'something went wrong.'}</div>;
  } else if (isSuccess) {
    const handleSubredditClick = (subreddit) => {
      //set new current subreddit
      dispatch(setCurrentSubreddit(subreddit));
      dispatch(fetchPosts(subreddit.url));
    };

    content = subreddits.map((subreddit) => {
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
  }

  return (
    <div>
      <h2>Topics</h2>
      <div>{content}</div>
    </div>
  );
};
