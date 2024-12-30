import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useGetSubredditPostsQuery } from '../api/apiSlice';
import { Comments } from '../comments/Comments';
import './posts.css';
export const Posts = () => {
  const defaultUrl = '/r/pics/';
  const { state } = useLocation();

  // passing :subredditUrl in Route isn't working so using this method instead.
  const params = useParams();
  const subredditUrl = params['*'];

  // on page load SubredditUrl is undefined which is great because we can load pics subreddit and thereafter each clicked subreddit!
  const activeUrl = subredditUrl || defaultUrl;
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubredditPostsQuery(activeUrl);

  // selectedPost is used to render comments based on conditional. posts are stored so comments open will remain open.
  const [selectedPosts, setSelectedPosts] = useState([]);

  const handleCommentsClick = (post) => {
    setSelectedPosts((prevSelected) =>
      prevSelected.includes(post.id)
        ? prevSelected.filter((id) => id !== post.id)
        : [...prevSelected, post.id],
    );
  };

  if (isLoading) {
    return <div>Loading Posts...</div>;
  } else if (isError) {
    return <div>Error: {error.message || 'something went wrong.'}</div>;
  } else if (isSuccess) {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.created_utc - a.created_utc);

    const renderedPosts = orderedPosts.map((post) => {
      const postDate = new Date(post.created_utc * 1000).toLocaleDateString();

      return (
        <div key={post.id} className="post__container">
          <h3 className="post__title">{post.title}</h3>

          {post.thumbnail && post.thumbnail !== 'self' && (
            <img
              alt=""
              src={post.url || post.thumbnail}
              loading="lazy"
              className="post__media"
            />
          )}

          {post.is_video && (
            <video controls className="post__media">
              <source
                src={post.media?.reddit_video?.fallback_url}
                type="video/mp4"
              />
            </video>
          )}
          <div className="post__info">
            <div className="author-date">
              <p>By {post.author}</p>

              <p>{postDate}</p>
            </div>
            <div>
              <button
                onClick={() => handleCommentsClick(post)}
                className="post__button"
                disabled={post.num_comments === 0}
              >
                {selectedPosts?.includes(post.id)
                  ? 'Hide '
                  : `${post.num_comments} `}
                {post.num_comments === 1 ? 'comment' : 'comments'}
              </button>
            </div>
          </div>
          {selectedPosts?.includes(post.id) && (
            <Comments permalink={post.permalink} />
          )}
        </div>
      );
    });

    return (
      <div className="posts">
        <h2 className="posts__title">{state?.title.toUpperCase() || 'PICS'}</h2>
        <div className="posts__container">{renderedPosts}</div>
      </div>
    );
  }
};
