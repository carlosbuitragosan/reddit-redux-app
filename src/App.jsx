import React, { useEffect } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { Posts } from './features/posts/Posts';
import { Navbar } from './app/Navbar';
import { Subreddits } from './features/subreddits/Subreddits';
import { PostComments } from './features/comments/Comments';
import { SubredditPage } from './features/subreddits/SubredditsPosts';
import './App.css';
import { fetchPosts, selectPostsByUrl } from './features/posts/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { HomePosts } from './features/posts/HomePosts';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePosts />} />
          {/* <Route path="/posts" element={<Posts />} /> */}
          {/* <Route path="/posts/:postId" element={<PostComments />} /> */}
          {/* <Route path="/subreddits/:subredditId" element={<SubredditPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
