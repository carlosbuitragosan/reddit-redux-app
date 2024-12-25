import { use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchComments,
  selectPostById,
  selectSelectedSubreddit,
  selectCommentsById,
} from '../../store/redditSlice';

export const PostComments = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // use selectSelectedSubreddit from the function created in redditSlice.
  const subreddit = useSelector(selectSelectedSubreddit);

  //use selectPostById from the function created in redditSlice.
  const post = useSelector((state) => selectPostById(state, subreddit, postId));

  //comments will be undefined at first
  const comments = useSelector((state) => selectCommentsById(state, postId));

  // get the status of the comments
  const commentsStatus = useSelector((state) => state.reddit.comments.status);
  const commentsError = useSelector((state) => state.reddit.comments.error);

  useEffect(() => {
    //add condition in case post is undefined and show 'post not found' message
    if (post?.permalink) {
      dispatch(fetchComments({ permalink: post.permalink, postId }));
    }
  }, [dispatch, post, postId]);

  if (!post) {
    return <div>Post not found!</div>;
  }

  if (commentsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (commentsStatus === 'failed') {
    return <div>Error: {commentsError || 'something went wrong.'}</div>;
  }

  const renderedComments = comments.map((comment) => (
    <div key={comment.id}>{comment.body}</div>
  ));
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back to Posts</button>
      <h1>{post.title}</h1>
      <img alt={post.title} src={post.url} />
      <p>{post.selftext}</p>
      <h2>Comments</h2>
      <div>{renderedComments}</div>
    </div>
  );
};
