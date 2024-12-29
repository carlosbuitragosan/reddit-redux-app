import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navbar } from './app/Navbar';
import { Subreddits } from './features/subreddits/Subreddits';
import { Posts } from './features/posts/Posts';
import './App.css';

function App() {
  // tracks whether subreddits container is open or hidden
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //pass the state to Subreddits component
  const handleMenuToggle = (isChecked) => {
    setIsMenuOpen(isChecked);
  };
  return (
    <Router>
      <Navbar onToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />
      <div className="App">
        <Subreddits isMenuOpen={isMenuOpen} onToggle={handleMenuToggle} />
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
