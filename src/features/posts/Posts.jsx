import { useParams, useLocation } from 'react-router-dom';
import { useGetSubredditPostsQuery } from '../api/apiSlice';
import { Comments } from '../comments/Comments';
import { useState } from 'react';

export const Posts = () => {
  const defaultUrl = '/r/pics/';
  const { state } = useLocation();
  // passing :subredditUrl in Route isn't working!
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

  const [selectedPost, setSelectedPost] = useState(null);

  const handleCommentsClick = (post) => {
    setSelectedPost((prevPost) => (prevPost?.id === post.id ? null : post));
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
        <div key={post.id}>
          <h3>{post.title}</h3>

          {post.thumbnail && post.thumbnail !== 'self' && (
            <img alt="" src={post.url || post.thumbnail} loading="lazy" />
          )}

          {post.is_video && (
            <video controls>
              <source
                src={post.media?.reddit_video?.fallback_url}
                type="video/mp4"
              />
            </video>
          )}
          <p>Posted by {post.author}</p>

          <p>{postDate}</p>

          <button onClick={() => handleCommentsClick(post)}>
            {selectedPost?.id === post.id ? 'Hide ' : `${post.num_comments} `}
            {post.num_comments === 1 ? 'comment' : 'comments'}
          </button>
          {selectedPost?.id === post.id && (
            <Comments permalink={post.permalink} />
          )}
        </div>
      );
    });

    return (
      <div>
        <h2>{state?.title.toUpperCase() || 'PICS'}</h2>
        {renderedPosts}
      </div>
    );
  }
};
