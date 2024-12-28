import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Subreddits } from './Subreddits';
import { fetchComments } from '../comments/commentsSlice';
import { Posts } from '../posts/Posts';
import {
  selectSubredditById,
  selectSubredditsError,
  selectSubredditsStatus,
  setCurrentSubreddit,
} from './subredditsSlice';
import {
  selectPostsStatus,
  selectPostsByUrl,
  selectPostsError,
} from '../posts/postsSlice';
export const SubredditPosts = () => {
  const dispatch = useDispatch();

  // get the id from the router
  const { subredditId } = useParams();

  //find the subreddit object from the state list
  const subreddit = useSelector((state) =>
    selectSubredditById(state, subredditId),
  );

  // posts have been added on user click
  const posts = useSelector((state) => selectPostsByUrl(state, subreddit));

  // get status and error
  const subredditsStatus = useSelector(selectSubredditsStatus);
  const subredditsError = useSelector(selectSubredditsError);

  // get posts status and error
  const postsStatus = useSelector(selectPostsStatus);
  const postsError = useSelector(selectPostsError);

  useEffect(() => {
    // set the current subreddit
    dispatch(setCurrentSubreddit(subreddit));
  }, [dispatch, subreddit]);

  if (subredditsStatus === 'loading' || postsStatus === 'loading')
    return <div>Loading...</div>;

  if (subredditsStatus === 'failed' || postsStatus === 'failed')
    return (
      <div>
        Error: {subredditsError || postsError || 'something went wrong.'}
      </div>
    );

  if (!subreddit || !posts) return <div>Subreddit not found!</div>;

  // fetch comments on user click.
  const handlePostClick = (permalink, postId) => {
    dispatch(fetchComments({ permalink, postId }));
  };

  return (
    <div>
      <Subreddits />
      <Posts
        posts={posts}
        handlePostClick={handlePostClick}
        subredditTitle={subreddit.title}
      />
    </div>
  );
};
