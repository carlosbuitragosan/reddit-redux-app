import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPosts } from '../../store/redditSlice';
import { Link } from 'react-router-dom';

export const SubredditPage = () => {
  return;
  // const { subredditId } = useParams();
  // const dispatch = useDispatch();
  // const subreddit = useSelector((state) =>
  //   state.reddit.subreddits.find((subreddit) => subreddit.id === subredditId),
  // );
  // const posts = useSelector((state) => state.reddit.posts);
  // useEffect(() => {
  //   dispatch(fetchPosts(subreddit));
  // }, [dispatch, subreddit]);
  // const renderedPosts = posts.map((post) => (
  //   <Link key={post.id} to={`/posts/${post.id}`}>
  //     <div key={post.id}>
  //       <h2>{post.title}</h2>
  //       <p>{post.description}</p>
  //       <img alt={post.title} src={post.thumbnail}></img>
  //     </div>
  //   </Link>
  // ));
  // return <div>{renderedPosts}</div>;
};
