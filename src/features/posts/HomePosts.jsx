import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../comments/commentsSlice';
import { Subreddits } from '../subreddits/Subreddits';
import { Posts } from './Posts';
import {
  selectCurrentSubreddit,
  setCurrentSubreddit,
} from '../subreddits/subredditsSlice';

import { useGetPostsQuery } from '../api/apiSlice';

export const HomePosts = () => {
  const dispatch = useDispatch();

  // get the current subreddit hardcodedfrom the state
  const currentSubreddit = useSelector(selectCurrentSubreddit);

  // fetch posts using RTK Query
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = useGetPostsQuery('/r/pics');

  // fetch posts for current subreddit and set it as current
  useEffect(() => {
    // dispatch(fetchPosts('/r/pics'));

    dispatch(setCurrentSubreddit({ url: '/r/pics/' }));
  }, [dispatch, currentSubreddit.url]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError)
    return <div>Error: {error.message || 'something went wrong.'}</div>;

  // fetch comments on user click.
  const handlePostClick = (permalink, postId) => {
    dispatch(fetchComments({ permalink, postId }));
  };

  return (
    <div>
      <Subreddits />
      <Posts posts={posts} handlePostClick={handlePostClick} />
    </div>
  );
};
