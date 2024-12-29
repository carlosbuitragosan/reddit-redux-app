import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectCurrentSubreddit } from '../subreddits/subredditsSlice';

import {
  useGetPostCommentsQuery,
  useGetSubredditPostsQuery,
} from '../api/apiSlice';

export const PostComments = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const currentSubreddit = useSelector(selectCurrentSubreddit);

  const { data: posts = [] } = useGetSubredditPostsQuery(currentSubreddit.url);
  const post = posts.find((post) => post.id === postId);

  const {
    data: comments = [],
    isLoading,
    isSucceeded,
    isError,
    error,
  } = useGetPostCommentsQuery(post.permalink);

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return <div>Error: {error.messge || 'something went wrong.'}</div>;

  if (!post) return <div>Post not found.</div>;

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
