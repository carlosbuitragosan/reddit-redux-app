import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSubredditById,
  selectSubredditsError,
  selectSubredditsStatus,
  setCurrentSubreddit,
} from './subredditsSlice';
import {
  selecetPostsStatus,
  selectPostsByUrl,
  selectPostsError,
} from '../posts/postsSlice';
import { Subreddits } from './Subreddits';
import { fetchComments } from '../comments/commentsSlice';

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

  useEffect(() => {
    // set the current subreddit
    dispatch(setCurrentSubreddit(subreddit));
  }, [dispatch, subreddit]);

  // get status and error
  const subredditsStatus = useSelector(selectSubredditsStatus);
  const subredditsError = useSelector(selectSubredditsError);

  // get posts status and error
  const postsStatus = useSelector(selecetPostsStatus);
  const postsError = useSelector(selectPostsError);

  if (subredditsStatus === 'loading' || postsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (subredditsStatus === 'failed' || postsStatus === 'failed') {
    return (
      <div>
        Error: {subredditsError || postsError || 'something went wrong.'}
      </div>
    );
  }

  if (!subreddit || !posts) {
    return <div>Subreddit not found!</div>;
  }

  // this is the same part as the HomePosts component. In face the whole component is very similar. Home posts though sets the subreddit from the hardcoded initial state and fetches the posts. this component however gets the subreddit url dinamically from the router in Subreddits component, where the subreddit was set to the currentSubreddit on the state and the posts were fetch on user click.

  // fetch comments on user click.
  const handlePostClick = (permalink, postId) => {
    dispatch(fetchComments({ permalink, postId }));
  };

  const renderedPosts = posts.map((post) => (
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
  ));
  return (
    <div>
      <Subreddits />
      <h2>{subreddit.title}</h2>
      <div>{renderedPosts}</div>
    </div>
  );
};
