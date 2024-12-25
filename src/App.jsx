import React from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { Posts } from './features/posts/Posts';
import { Navbar } from './app/Navbar';
import { Subreddits } from './features/subreddits/Subreddits';
import { PostComments } from './features/posts/PostComments';
import { SubredditPage } from './features/subreddits/SubredditPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<PostComments />} />
          <Route path="/subreddits/:subredditId" element={<SubredditPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
