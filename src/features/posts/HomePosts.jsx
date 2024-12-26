import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentSubreddit } from '../subreddits/subredditsSlice';
import { fetchPosts } from './postsSlice';
import { selectPostsByUrl } from './postsSlice';

export const HomePosts = () => {
  const dispatch = useDispatch();

  // get the current subreddit hardcodedfrom the state
  const currentSubreddit = useSelector(selectCurrentSubreddit);

  // find the posts based on the subreddit url (which will be undefined at first)
  const posts = useSelector((state) =>
    selectPostsByUrl(state, currentSubreddit.url),
  );
  useEffect(() => {
    if (currentSubreddit) {
      dispatch(fetchPosts(currentSubreddit.url));
    }
  }, [dispatch, currentSubreddit]);
};
