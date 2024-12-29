import React from 'react';
import { Link } from 'react-router-dom';
import { useGetSubredditsQuery } from '../api/apiSlice';
import './subreddits.css';

// isMenuOpen was passed down in App component as a prop and then based on that the class name 'open' is added and css can handle it.
export const Subreddits = ({ onToggle, isMenuOpen }) => {
  const {
    data: subreddits = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubredditsQuery();

  const handleSubredditClick = () => {
    onToggle(false);
  };
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
        onClick={handleSubredditClick}
      >
        <div className="subreddit__container">
          <p className="subreddit__name">{subreddit.display_name}</p>
        </div>
      </Link>
    ));

    return (
      <div className={`subreddits__container ${isMenuOpen ? 'open' : ''}`}>
        <h2 className="subreddits__title">Topics</h2>
        {renderedSubreddits}
      </div>
    );
  }
};
