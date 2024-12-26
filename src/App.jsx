import React from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { Navbar } from './app/Navbar';
import { HomePosts } from './features/posts/HomePosts';
import { SubredditPosts } from './features/subreddits/SubredditPosts';
import { PostComments } from './features/comments/PostComments';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePosts />} />
          <Route path="/subreddit/:subredditId" element={<SubredditPosts />} />
          <Route path="/post/:postId" element={<PostComments />} />
          {/* <Route path="/subreddits/:subredditId" element={<SubredditPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
