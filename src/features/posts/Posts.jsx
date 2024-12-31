import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useGetSubredditPostsQuery } from '../api/apiSlice';
import { TimeAgo } from '../../components/TimeAgo';
import { Comments } from '../comments/Comments';
import './posts.css';
import { PostsSkeleton } from '../../components/PostsSkeleton';

export const Posts = () => {
  const { subredditUrl } = useParams();
  const url = `/r/${subredditUrl}/`;
  // state is passed from Subreddits component via <Link> and includes the subreddit title
  const { state } = useLocation();

  const {
    data: posts = [],
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubredditPostsQuery(url);

  // selectedPost is used to render comments based on conditional. posts are stored so open comments  will remain open.
  const [selectedPosts, setSelectedPosts] = useState([]);

  const handleCommentsClick = (post) => {
    setSelectedPosts((prevSelected) =>
      // if post is already in the list, remove it with .filter() (hide comments). If not, add it to the list (show comments and keep others open too).
      prevSelected.includes(post.id)
        ? prevSelected.filter((id) => id !== post.id)
        : [...prevSelected, post.id],
    );
  };

  if (isLoading || isFetching) {
    return <PostsSkeleton />;
  } else if (isError) {
    return (
      <div className="post__container">
        Error: {error.message || 'something went wrong.'}
      </div>
    );
  } else if (isSuccess) {
    //sort posts first.
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.created_utc - a.created_utc);

    const renderedPosts = orderedPosts.map((post) => {
      return (
        <div key={post.id} className="post__container">
          <h3 className="post__title">{post.title}</h3>

          {post.thumbnail && post.thumbnail !== 'self' && (
            <img
              alt=""
              src={
                post.url && post.url.includes('reddit.com')
                  ? post.thumbnail
                  : post.url
              }
              loading="lazy"
              className="post__media"
              // hide the img on error
              onError={(e) => (e.target.display = 'none')}
            />
          )}

          {post.is_video && (
            <video controls className="post__media" loading="lazy">
              <source
                src={post.media?.reddit_video?.fallback_url}
                type="video/mp4"
              />
            </video>
          )}
          <div className="post__info">
            <div className="author-date">
              <p className="post__author">{post.author}</p>

              <TimeAgo timeStamp={post.created_utc} />
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
        <h2 className="posts__title">
          {state?.title?.toUpperCase() || 'PICS'}
        </h2>
        <div className="posts__container">{renderedPosts}</div>
      </div>
    );
  }
};
