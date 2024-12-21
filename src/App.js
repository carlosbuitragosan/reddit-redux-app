import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { fetchPosts } from './store/redditSlice';

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.reddit.posts);
  const status = useSelector((state) => state.reddit.status);
  const error = useSelector((state) => state.reddit.error);

  useEffect(() => {
    dispatch(fetchPosts('/r/pics'));
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const renderedPosts = posts.map((post) => <li>{post.title}</li>);
  return (
    <div className="App">
      <ul>{renderedPosts}</ul>
    </div>
  );
}

export default App;
