import { Link } from 'react-router-dom';

export const Posts = ({ posts, handlePostClick, subredditTitle }) => {
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.created_utc - a.created_utc);

  const renderedPosts = orderedPosts.map((post) => (
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
      {subredditTitle && <h2>{subredditTitle}</h2>}
      <div>{renderedPosts}</div>
    </div>
  );
};
