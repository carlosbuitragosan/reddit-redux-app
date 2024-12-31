import React from 'react';
import { Link } from 'react-router-dom';
import { useGetSubredditsQuery } from '../api/apiSlice';
import './subreddits.css';

// isMenuOpen was passed down in App component as a prop and then based on that the class name 'open' is added and css can handle it.
export const Subreddits = ({ onToggle, isMenuOpen }) => {
  const {
    data: subreddits = [],
    isSuccess,
    isError,
    error,
  } = useGetSubredditsQuery();

  //sets isMenuOpen to false
  const handleSubredditClick = () => {
    onToggle(false);
  };

  if (isError) {
    return <div>Error: {error.message || 'something went wrong.'}</div>;
  } else if (isSuccess) {
    const renderedSubreddits = subreddits.map((subreddit) => (
      <Link
        key={subreddit.id}
        to={`${subreddit.url}`}
        // pass the state to the Posts component
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
        {renderedSubreddits}
      </div>
    );
  }
};
