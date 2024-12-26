import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  selectCommentsById,
  selectCommentsError,
  selectCommentsStatus,
} from './commentsSlice';
import { selectCurrentSubreddit } from '../subreddits/subredditsSlice';
import { selectPostById, selectPostsByUrl } from '../posts/postsSlice';

export const PostComments = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const comments = useSelector((state) => selectCommentsById(state, postId));
  const commentsStatus = useSelector(selectCommentsStatus);
  const commentsError = useSelector(selectCommentsError);

  const currentSubreddit = useSelector(selectCurrentSubreddit);

  const post = useSelector((state) =>
    selectPostById(state, currentSubreddit, postId),
  );
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
