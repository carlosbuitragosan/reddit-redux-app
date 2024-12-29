import { Subreddits } from '../subreddits/Subreddits';
import { Posts } from './Posts';

import { useGetSubredditPostsQuery } from '../api/apiSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentSubreddit } from '../subreddits/subredditsSlice';

export const HomePosts = () => {
  const dispatch = useDispatch();
  // fetch posts using RTK Query
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubredditPostsQuery('/r/pics/');

  useEffect(() => {
    dispatch(setCurrentSubreddit({ url: '/r/pics' }));
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error: {error.message || 'something went wrong.'}</div>;
  } else if (isSuccess) {
    return (
      <div>
        <Subreddits />
        <Posts posts={posts} />
      </div>
    );
  }
};
