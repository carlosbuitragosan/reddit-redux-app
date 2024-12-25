import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPosts } from '../../store/redditSlice';
import { Link } from 'react-router-dom';

export const SubredditPage = () => {
  const { subredditId } = useParams();
  const dispatch = useDispatch();
  const subreddit = useSelector((state) =>
    state.reddit.subreddits.list.find(
      (subreddit) => subreddit.id === subredditId,
    ),
  );
  const posts = useSelector(
    (state) => state.reddit.posts.bySubreddit[subreddit.url] || [],
  );

  useEffect(() => {
    dispatch(fetchPosts(subreddit.url));
  }, [dispatch, subreddit]);

  const renderedPosts = posts.map((post) => (
    <Link key={post.id} to={`/posts/${post.id}`}>
      <div>
        <h2>{post.title}</h2>
        {post.thumbnail && post.thumbnail !== 'self' && (
          <img alt={post.title} src={post.thumbnail}></img>
        )}
        <p>{post.num_comments} comments</p>
      </div>
    </Link>
  ));
  return <div>{renderedPosts}</div>;
};
