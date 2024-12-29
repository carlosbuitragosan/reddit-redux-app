import React from 'react';
import { Link } from 'react-router-dom';
import { useGetSubredditsQuery } from '../api/apiSlice';
import './subreddits.css';

export const Subreddits = () => {
  const {
    data: subreddits = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubredditsQuery();

  if (isLoading) {
    return <div>Loading Subreddits...</div>;
  } else if (isError) {
    return <div>Error: {error.message || 'something went wrong.'}</div>;
  } else if (isSuccess) {
    const renderedSubreddits = subreddits.map((subreddit) => (
      <Link
        key={subreddit.id}
        to={`/subreddit/${subreddit.url}`}
        state={{ title: subreddit.display_name }}
      >
        <div className="subreddit__container">
          <p className="subreddit__name">{subreddit.display_name}</p>
        </div>
      </Link>
    ));

    return <div className="subreddits__container">{renderedSubreddits}</div>;
  }
};
