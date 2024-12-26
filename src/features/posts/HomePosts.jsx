import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchComments } from '../comments/commentsSlice';
import { Subreddits } from '../subreddits/Subreddits';
import {
  selectCurrentSubreddit,
  setCurrentSubreddit,
} from '../subreddits/subredditsSlice';
import {
  fetchPosts,
  selectPostsByUrl,
  selecetPostsStatus,
  selectPostsError,
} from './postsSlice';

export const HomePosts = () => {
  const dispatch = useDispatch();

  // get the current subreddit hardcodedfrom the state
  const currentSubreddit = useSelector(selectCurrentSubreddit);

  // find the posts based on the subreddit url (which will be undefined at first)
  const posts = useSelector((state) =>
    selectPostsByUrl(state, currentSubreddit),
  );

  // get posts status and error
  const postsStatus = useSelector(selecetPostsStatus);
  const postsError = useSelector(selectPostsError);

  // fetch posts for current subreddit
  useEffect(() => {
    dispatch(fetchPosts('/r/pics'));
    dispatch(setCurrentSubreddit({ url: '/r/pics' }));
  }, [dispatch]);

  if (postsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (postsStatus === 'failed') {
    return <div>Error: {postsError || 'something went wrong.'}</div>;
  }

  // fetch comments on user click.
  const handlePostClick = (permalink, postId) => {
    dispatch(fetchComments({ permalink, postId }));
  };

  const renderedPosts = posts.map((post) => {
    return (
      <Link
        key={post.id}
        to={`/post/${post.id}`}
        onClick={() => handlePostClick(post.permalink, post.id)}
      >
        <div>
          <h3>{post.title}</h3>
          {post.thumbnail && post.thumbnail !== 'self' && (
            <img alt={post.title} src={post.thumbnail}></img>
          )}
          <p>{post.num_comments} comments</p>
        </div>
      </Link>
    );
  });

  return (
    <div>
      <Subreddits />
      <h2>Posts</h2>
      <div>{renderedPosts}</div>
    </div>
  );
};
