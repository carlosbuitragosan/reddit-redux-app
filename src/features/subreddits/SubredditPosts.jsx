import { useParams } from 'react-router-dom';
import {
  useGetSubredditPostsQuery,
  useGetSubredditsQuery,
} from '../api/apiSlice';
import { Subreddits } from './Subreddits';
import { Posts } from '../posts/Posts';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCurrentSubreddit } from './subredditsSlice';

export const SubredditPosts = () => {
  const dispatch = useDispatch();
  const { subredditId } = useParams();

  const { data: subreddits = [] } = useGetSubredditsQuery();
  const subreddit = subreddits.find(
    (subreddit) => subreddit.id === subredditId,
  );

  useEffect(() => {
    dispatch(setCurrentSubreddit(subreddit));
  }, [dispatch, subreddit]);

  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubredditPostsQuery(subreddit.url);

  if (!posts) return <div>Subreddit not found!</div>;

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
