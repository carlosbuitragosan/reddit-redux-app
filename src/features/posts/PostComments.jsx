import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchComments } from '../../store/redditSlice';

export const PostComments = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const subreddit = useSelector((state) => state.reddit.selectedSubreddit);
  const post = useSelector((state) =>
    state.reddit.posts.bySubreddit[subreddit.url].find(
      (post) => post.id === postId,
    ),
  );

  const comments = useSelector(
    (state) => state.reddit.comments.byPostId[postId] || [],
  );
  const commentsStatus = useSelector((state) => state.reddit.comments.status);
  const commentsError = useSelector((state) => state.reddit.comments.error);

  const permalink = post.permalink;
  useEffect(() => {
    dispatch(fetchComments({ permalink, postId }));
  }, [dispatch, permalink, postId]);

  const renderedComments = comments.map((comment) => (
    <div key={comment.id}>{comment.body}</div>
  ));
  return (
    <div>
      <h1>{post.title}</h1>
      <img alt={post.title} src={post.url} />
      <p>{post.selftext}</p>
      <h2>Comments</h2>
      <div>{renderedComments}</div>
    </div>
  );
};
