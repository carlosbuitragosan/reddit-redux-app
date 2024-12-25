import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo, useEffect } from 'react';
import {
  fetchPosts,
  fetchSubreddits,
  setSelectedSubreddit,
} from '../../store/redditSlice';
import { Link } from 'react-router-dom';
export const Posts = () => {
  const dispatch = useDispatch();

  // select the state from the store
  const subreddits = useSelector((state) => state.reddit.subreddits.list || []);
  const postsStatus = useSelector((state) => state.reddit.posts.status);
  const postsError = useSelector((state) => state.reddit.posts.error);

  const subreddit = useMemo(
    () => subreddits.find((subreddit) => subreddit.url === '/r/pics/'),
    [subreddits],
  );

  const posts = useSelector((state) =>
    subreddit ? state.reddit.posts.bySubreddit[subreddit.url] || [] : [],
  );

  // fetch subreddits when list is empty
  useEffect(() => {
    if (subreddits.length === 0) {
      dispatch(fetchSubreddits());
    }
  }, [dispatch, subreddits, posts]);

  // fetch posts when subreddit is selected
  useEffect(() => {
    if (subreddit) {
      dispatch(fetchPosts(subreddit.url));
      dispatch(setSelectedSubreddit(subreddit));
    }
  }, [dispatch, subreddit]);

  if (postsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (postsStatus === 'failed') {
    return <div>Error: {postsError || 'something went wrong.'}</div>;
  }

  const renderedPosts = posts.map((post) => {
    return (
      <Link key={post.id} to={`/posts/${post.id}`}>
        <div>
          <h2>{post.title}</h2>
          <img alt={post.title} src={post.thumbnail}></img>
          <p>{post.num_comments} comments</p>
        </div>
      </Link>
    );
  });

  return (
    <div>
      <h1>Reddit Posts</h1>
      <div>{renderedPosts}</div>
    </div>
  );
};
