import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navbar } from './app/Navbar';
import { Subreddits } from './features/subreddits/Subreddits';
import { Posts } from './features/posts/Posts';
import './App.css';
import './components/menuToggle';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Subreddits />
        <Routes>
          <Route
            path="/"
            element={<Posts defaultSubredditUrl="defaultUrl" />}
          />
          <Route path="/subreddit/*" element={<Posts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
